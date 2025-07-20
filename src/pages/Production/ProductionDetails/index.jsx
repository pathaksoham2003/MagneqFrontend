import React from "react";
import SearchBar from "../../../components/common/Searchbar";
import useProduction from "../../../services/useProduction";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import Button from "../../../components/buttons/Button";
import {HiOutlineArchiveBox} from "react-icons/hi2";
import DaynamicTable from "../../../components/common/Table";
import ItemNotInStock from "./ItemNotInStock";

// Helper to structure raw data
const formatClassData = (classItems,status) => {
  const isUnprocessed = status === "UN_PROCESSED"
  return {
    item: classItems.map((item) => ({
      id: item._id,
      data: isUnprocessed
        ? [
            item.name || "Unnamed",
            `${item.available} / ${item.required}`,
            item.in_stock ? "In Stock" : "Not in Stock",
          ]
        : [`${item.name}` , `${item.required}`],
    })),
  };
};

// Custom cell formatter for capsules
const formatCellWithCapsules = (cell, idx) => {
  if (idx === 1 && typeof cell === "string") {
    const [available, required] = cell.split(" / ");
    return (
      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
        {available} / {required}
      </span>
    );
  }

  if (idx === 2 && typeof cell === "string") {
    const isInStock = cell === "In Stock";
    return (
      <span
        className={`inline-block px-2 py-1 text-xs text-nowrap font-semibold rounded-full ${
          isInStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {cell}
      </span>
    );
  }

  return cell;
};

const ProductionDetails = () => {
  const {getProductionById} = useProduction();
  const {id: production_id} = useParams();

  const {isLoading, data} = useQuery({
    queryKey: ["productionId", production_id],
    queryFn: () => getProductionById(production_id),
  });

  if (isLoading) return <p>Loading production details...</p>;
  const dynamicHeader = data?.status === "UN_PROCESSED"? ["Name | Type", "Ava/Req", "Stock Status"] : ["Name | Type" , "Req"];

  return (
    <div className="grid gap-4 md:gap-6 bg-background text-text">
      <SearchBar className={"max-w-xs"} placeholder={"Search using Order Id"} />

      <div className="flex justify-between items-center pt-5">
        <h2 className="font-semibold text-text text-2xl">Detailed View</h2>
        <Button
          size="lg"
          type="button"
          startIcon={<HiOutlineArchiveBox size={18} />}
          onClick={()=>{}}
        >
          Notify To Purchase
        </Button>
      </div>

      <div>
        <DaynamicTable
          header={["Order ID", "Model", "Type", "Ratio", "Quantity", "Status"]}
          tableData={{
            item: [
              {
                id: data?.production_id || "prod-id",
                data: [
                  data?.order_id,
                  data?.finished_good?.model,
                  data?.finished_good?.type,
                  data?.finished_good?.ratio,
                  data?.quantity,
                  data?.status,
                ],
              },
            ],
          }}
        />
      </div>
    { (!data?.all_in_stock && data?.status === "UN_PROCESSED") &&  <ItemNotInStock />}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-xl font-semibold py-2">Class A</h2>
          <DaynamicTable
            header={dynamicHeader}
            tableData={formatClassData(data?.class_a || [],data?.status)}
            formatCell={formatCellWithCapsules}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold py-2">Class B</h2>
          <DaynamicTable
            header={dynamicHeader}
            tableData={formatClassData(data?.class_b || [],data?.status)}
            formatCell={formatCellWithCapsules}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold py-2">Class C</h2>
          <DaynamicTable
            header={dynamicHeader}
            tableData={formatClassData(data?.class_c || [],data?.status)}
            formatCell={formatCellWithCapsules}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductionDetails;
