import React, { useState, useEffect } from "react"; 
import { IoSearchOutline, IoFilterOutline, IoCloseOutline } from "react-icons/io5";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import SearchBar from "../../components/common/Searchbar";
import Button from "../../components/buttons/Button";
import { MdErrorOutline, MdOutlineMail } from "react-icons/md";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { PiCubeDuotone } from "react-icons/pi";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/common/Table";
import StoresCard from '../../components/card/StoresCard';
import { Outlet } from "react-router-dom";
import StoreCard from "./StoreCard";


const Store = () => {
  const [search, setSearch] = useState("");
 
  return(
    <div
      className="min-h-screen"
      style={{
        background: "rgba(var(--background))",
        color: "rgba(var(--text))",
      }}
    >
      <div className="flex flex-row  gap-4 md:gap-6 bg-transparent mx-auto">
        <div className="w-72">
          <SearchBar placeholder="Search using Name" />
        </div>
        <Button
          type="button"
          size="md"
          variant="primary"
          startIcon={<HiOutlineArchiveBox />}
          className="min-w-[160px] shadow-theme-xs"
        >
          Add Stock
        </Button>
        <Button
          type="button"
          size="md"
          variant="primary"
          startIcon={<HiOutlineArchiveBox />}
          className="min-w-[160px] shadow-theme-xs"
        >
          Edit Stock
        </Button>
        <Button
          type="button"
          size="md"
          variant="primary"
          startIcon={<HiOutlineArchiveBox />}
          className="min-w-[160px] shadow-theme-xs"
        >
          Purchase Goods
        </Button>
      </div>
     
    
      <Outlet/>
      
     
    

    </div>
  );
};

export default Store;