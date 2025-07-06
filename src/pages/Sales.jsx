import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Metrics from "../components/sales/adminSales/Metrics";
import SalesTable from "../components/sales/adminSales/SalesTable";
import SearchBar from "../components/common/Searchbar";
import Button from "../components/buttons/Button";
import {HiOutlineArchiveBox} from "react-icons/hi2"; //sales box
import {PiCubeDuotone} from "react-icons/pi";
import Pagination from "../components/common/Pagination";

const Sales = () => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-4 md:gap-6 bg-background text-text ">
      <SearchBar placeholder={"Search using Order Id"} />
      <Button
        type="button"
        size="md"
        variant="primary"
        startIcon={<HiOutlineArchiveBox />}
        onClick={() => {
          navigate("/create_order");
        }}
      >
        Create Order
      </Button>
      <Button
        type="button"
        size="md"
        variant="primary"
        startIcon={<PiCubeDuotone />}
        onClick={() => {
          navigate("/track_order");
        }}
      >
        Track Orders
      </Button>
      <div className="col-span-12 space-y-4 ">
        <Metrics />
      </div>
      <div className="col-span-12 ">
        <SalesTable />
      </div>
    </div>
  );
};

export default Sales;
