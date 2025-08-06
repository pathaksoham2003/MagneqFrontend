import React from "react";
import {HiOutlineArchiveBox} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";
import Button from "../components/buttons/Button";
import SearchBar from "../components/common/Searchbar";
import {PiCubeDuotone} from "react-icons/pi";
import ProductionTable from "../components/dashboard/ProductionTable";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";


const Production = () => {
  const navigate = useNavigate();
  const user = useSelector(selectAuth);
  const userRole = user?.route?.role;
  const userRoleProduction = (userRole === "PRODUCTION" || userRole === "ADMIN")
  return (
    <div className="grid gap-4 md:gap-6 bg-background text-text ">
      <SearchBar placeholder={"Search using Order Id"} />
        <Button
          type="button"
          size="md"
          variant="primary"
          startIcon={<PiCubeDuotone />}
          className="shadow-theme-xs px-3"
          onClick={()=>{navigate("/create_pro")}}
          hidden = {!userRoleProduction}
        >
          Create PRO
      </Button>
      <div className="col-span-12 ">
        <ProductionTable />
      </div>
    </div>
  );
};

export default Production;
