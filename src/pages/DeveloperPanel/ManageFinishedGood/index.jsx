import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import useManage from "../../../services/useManage";
import useFinishedGoods from "../../../services/useFinishedGoods";
import DaynamicTable from "../../../components/common/Table";
import FilterBar from "./FilterBar";
import Button from "../../../components/buttons/Button";
import {useNavigate} from "react-router-dom";
import Pagination from "../../../components/common/Pagination";

const ManageFinishedGood = () => {
  const {getFinishedGoods} = useManage();
  const {getModalConfig} = useFinishedGoods();

  const [filters, setFilters] = useState({
    model: "",
    power: "",
    ratio: "",
    type: "",
  });
  const [page,setPage] = useState(1);
  const {data: modalConfig} = useQuery({
    queryKey: ["modalConfig"],
    queryFn: getModalConfig,
  });
  const handlePageChange = (newPage) => {
    console.log(newPage);
    setPage(parseInt(newPage));
  };
  const {data: finishedGoodsData, isLoading} = useQuery({
    queryKey: ["finishedGoods", filters,page],
    queryFn: () => getFinishedGoods({...filters,page}),
  });
  console.log(finishedGoodsData);
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <div className="flex justify-between p-2 pb-5">
        <h2 className="text-3xl">Finished Goods</h2>
        <Button onClick={() => navigate("/finished_good/create")}>
          Create FG
        </Button>
      </div>
      <FilterBar
        modalConfig={modalConfig || {}}
        filters={filters}
        setFilters={setFilters}
      />
      <DaynamicTable
        header={finishedGoodsData?.header}
        tableData={finishedGoodsData}
        onRowClick={(item) => navigate("/finished_good/" + item.item_id)}
      />
      {!isLoading &&
        <Pagination
        currentPage={page}
        totalPages={finishedGoodsData.total_pages}
        onPageChange={handlePageChange}
        />
    }
    </div>
  );
};

export default ManageFinishedGood;
