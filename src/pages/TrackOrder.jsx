import React, {useState, useEffect} from "react";
import SearchBar from "../components/common/Searchbar";
import SalesTable from "../components/sales/adminSales/SalesTable";
const TrackOrder = () => {
  return (
    <div className="p-10 grid gap-4 bg-background text-text rounded-lg shadow-sm">
      <div className="flex justify-between mx-3">
        <h1 className="font-semibold text-3xl text-text">Track Order</h1>
        <SearchBar placeholder={"Search using Order Id"} />
      </div>
      <SalesTable />
    </div>
  );
};

export default TrackOrder;
