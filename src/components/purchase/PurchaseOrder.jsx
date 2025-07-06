import React from "react";
import DaynamicTable from "../common/Table";
import { useSelector, useDispatch } from "react-redux";

const PurchaseOrder = () => {
        const headers = [
    "Production Id",
    "Vendor Name",
    "Date of purchase",
    "Order Details",
    "Status"
    ];
  const data = useSelector((state) => state.purchase);
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