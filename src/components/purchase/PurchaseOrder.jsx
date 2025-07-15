import React , {useState} from "react";
import DaynamicTable from "../common/Table";
import {useQuery} from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import usePurchase from "../../services/usePurchase";
import Pagination from "../common/Pagination";

const PurchaseOrder = () => {
        const headers = [
    "Production Id",
    "Vendor Name",
    "Date of purchase",
    "Order Details",
    "Status"
    ];
  const {getAllPurchaseOrders} =
    usePurchase();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
//   const data = useSelector((state) => state.purchase);
    const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ["Purchases", page, search],
    queryFn: () => getAllPurchaseOrders(page, search),
    staleTime: 5 * 60 * 1000,
  });
    if (isLoading)
    return <p className="text-center">Loading production data...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">Error loading production data.</p>
    );
    return (
        <div>
            <h1 className="text-3xl ml-2 mb-3">Purchase Orders</h1>
            <DaynamicTable
                header={headers}
                tableData={{
                    item: data?.item || [],
                    page_no: data?.page_no,
                    total_pages: data?.total_pages,
                    total_items: data?.total_items,
                }}
            /> 
            <Pagination
                currentPage={page}
                totalPages={data.total_pages}
                onPageChange={(page) => setPage(page)}
            />
        </div>
    );
};
export default PurchaseOrder