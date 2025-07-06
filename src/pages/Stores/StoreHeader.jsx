import React from "react";
import StoresCard from "../../components/card/StoresCard";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { PiCubeDuotone } from "react-icons/pi";
import { MdErrorOutline, MdOutlineMail } from "react-icons/md";

const StoreHeader = ({ activeClass, onClassChange }) => {
  const cards = [
    {
      title: "A Class",
      icon: HiOutlineArchiveBox,
      class: "A",
      percent: "In Stock",
    },
    {
      title: "B Class",
      icon: PiCubeDuotone,
      class: "B",
      percent: "Not in Stock",
      borderColor: "#22C55E",
    },
    {
      title: "C Class",
      icon: MdOutlineMail,
      class: "C",
      percent: "Not in Stock",
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
        <span
          className="inline-flex items-center text-xs font-medium rounded px-2 py-0.5"
          style={{ color: "#15803d", background: "#dcfce7" }}
        >
          In Stock
        </span>
      </div>

      {/* Warning Bar */}
      <div
        className="flex items-center gap-2 rounded-lg px-4 py-3 mt-6 w-full border"
        style={{
          borderColor: "rgba(255, 0, 0, 0.3)",
          background: "rgba(255, 0, 0, 0.05)",
        }}
      >
        <MdErrorOutline className="text-xl" style={{ color: "#f87171" }} />
        <span className="font-semibold">Items not in Stock</span>
      </div>
    </div>
  );
};

export default StoreHeader;
