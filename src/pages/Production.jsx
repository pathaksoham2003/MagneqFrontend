import React from "react";
import {HiOutlineArchiveBox} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";
import Button from "../components/buttons/Button";
import SearchBar from "../components/common/Searchbar";
import {PiCubeDuotone} from "react-icons/pi";
import ProductionTable from "../components/dashboard/ProductionTable";

const Production = () => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-4 md:gap-6 bg-background text-text ">
      <SearchBar placeholder={"Search using Order Id"} />
      <div className="col-span-12 ">
        <ProductionTable />
      </div>
    </div>
  );
};

export default Production;
