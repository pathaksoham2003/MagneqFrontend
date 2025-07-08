import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DaynamicTable from "../common/Table";
import { useSelector, useDispatch } from "react-redux";
import usePurchase from "../../services/usePurchase";
import Pagination from "../common/Pagination";


const PurchaseOrder = () => {
  const { getAllPurchaseOrders } = usePurchase();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["purchaseOrders", page, search],
    queryFn: () => getAllPurchaseOrders(page, search),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
    const headers = [
        "Production Id",
        "Vendor Name",
        "Date of purchase",
        "Order Details",
        "Status"
    ];

    return (
        <div>
            <h1 className="text-3xl ml-2 mb-3">Purchase Orders</h1>
            <DaynamicTable
                header={headers}
                tableData={data}
            /> 
        </div>
    );
};
export default PurchaseOrder