import React, {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import StoreHeader from "./StoreHeader";
import DaynamicTable from "../../components/common/Table";
import useRawMaterials from "../../services/useRawMaterials";
import Button from "../../components/buttons/Button";

const RawItemList = ({classType = "A"}) => {
  const navigate = useNavigate();
  const {getRawMaterialsByClass} = useRawMaterials();

  const {
    data: rawMaterialData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["rawMaterials", classType],
    queryFn: () => getRawMaterialsByClass(classType),
  });

  useEffect(() => {
    refetch();
  }, [classType]);

  console.log(rawMaterialData);

  const tableData = rawMaterialData ?? {
    header: [],
    item: [],
    page_no: 1,
    total_pages: 1,
    total_items: 0,
  };

  const handleRowClick = (row) => {
    navigate(`/raw_material/${classType}/${row.item_id}`);
  };

  return (
    <div>
      <div className="mt-8 px-2 sm:px-4 md:px-6 lg:px-8">
        {isLoading ? (
          <p className="text-center py-6">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-500 py-6">
            Error: {error.message || "Something went wrong"}
          </p>
        ) : (
          <DaynamicTable
            header={tableData.header}
            tableData={tableData}
            onRowClick={handleRowClick}
            formatCell={(cell, idx, rowId) => {
              // Handle arrays as badge groups
              if (Array.isArray(cell)) {
                return (
                  <div className="flex flex-wrap gap-2">
                    {cell.map((entry, i) => (
                      <div
                        key={i}
                        className="bg-background text-text text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
                      >
                        {entry}
                      </div>
                    ))}
                  </div>
                );
              }

              // If Status column (idx === 3) and value is empty
              if (idx === 3 && !cell) {
                return (
                  <span className="text-xs text-gray-400 italic">Unknown</span>
                );
              }

              return cell ?? "—";
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RawItemList;
