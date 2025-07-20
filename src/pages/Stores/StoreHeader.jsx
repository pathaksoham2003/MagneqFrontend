import React from "react";
import { useQuery } from "@tanstack/react-query";
import StoresCard from "../../components/card/StoresCard";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { PiCubeDuotone } from "react-icons/pi";
import { MdErrorOutline, MdOutlineMail } from "react-icons/md";
import useRawMaterials from "../../services/useRawMaterials";

const StoreHeader = ({ activeClass, onClassChange }) => {
  const { getRawMaterialStockStats } = useRawMaterials();

  const { data: stockStats, isLoading } = useQuery({
    queryKey: ["rawMaterialStockStats"],
    queryFn: getRawMaterialStockStats,
  });

  const getStockStatus = (classType) => {
    if (isLoading || !stockStats) return "Loading...";
    
    const stats = stockStats[classType];
    if (!stats) return "No Data";
    
    if (stats.outOfStock === 0) {
      return "In Stock";
    } else if (stats.inStock === 0) {
      return "Not in Stock";
    } else {
      return `${stats.inStock} In Stock, ${stats.outOfStock} Out`;
    }
  };

  const getBorderColor = (classType) => {
    if (isLoading || !stockStats) return undefined;
    
    const stats = stockStats[classType];
    if (!stats) return undefined;
    
    if (stats.outOfStock === 0) {
      return "#22C55E"; // Green for all in stock
    } else if (stats.inStock === 0) {
      return "#EF4444"; // Red for all out of stock
    } else {
      return "#F59E0B"; // Yellow for mixed status
    }
  };

  const cards = [
    {
      title: "A Class",
      icon: HiOutlineArchiveBox,
      class: "A",
      percent: getStockStatus("A"),
      borderColor: getBorderColor("A"),
    },
    {
      title: "B Class",
      icon: PiCubeDuotone,
      class: "B",
      percent: getStockStatus("B"),
      borderColor: getBorderColor("B"),
    },
    {
      title: "C Class",
      icon: MdOutlineMail,
      class: "C",
      percent: getStockStatus("C"),
      borderColor: getBorderColor("C"),
    },
  ];

  return (
    <div>
      {/* Tab Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full mt-8">
        {cards.map(({ title, icon, percent, borderColor, class: cls }) => (
          <div
            key={cls}
            onClick={() => onClassChange(cls)}
            className={`cursor-pointer rounded-xl transition-transform ${
              activeClass === cls ? "scale-[1.02]" : "opacity-80"
            }`}
          >
            <StoresCard
              title={title}
              icon={icon}
              percent={percent}
              borderColor={activeClass === cls ? "#3b82f6" : borderColor}
            />
          </div>
        ))}
      </div>

      {/* Dynamic Section Title */}
      <div className="flex items-center gap-3 mt-8">
        <span
          className="font-bold text-2xl capitalize"
          style={{ color: "rgba(var(--text))" }}
        >
          {activeClass} Class Items
        </span>
        {!isLoading && stockStats && (
          <span
            className="inline-flex items-center text-xs font-medium rounded px-2 py-0.5"
            style={{ 
              color: stockStats[activeClass]?.outOfStock === 0 ? "#15803d" : "#DC2626",
              background: stockStats[activeClass]?.outOfStock === 0 ? "#dcfce7" : "#FEE2E2"
            }}
          >
            {stockStats[activeClass]?.outOfStock === 0 ? "In Stock" : "Items Out of Stock"}
          </span>
        )}
      </div>

      {/* Warning Bar - Only show if there are out of stock items */}
      {!isLoading && stockStats && stockStats[activeClass]?.outOfStock > 0 && (
        <div
          className="flex items-center gap-2 rounded-lg px-4 py-3 mt-6 w-full border"
          style={{
            borderColor: "rgba(255, 0, 0, 0.3)",
            background: "rgba(255, 0, 0, 0.05)",
          }}
        >
          <MdErrorOutline className="text-xl" style={{ color: "#f87171" }} />
          <span className="font-semibold">
            {stockStats[activeClass]?.outOfStock} Items not in Stock
          </span>
        </div>
      )}
    </div>
  );
};

export default StoreHeader;
