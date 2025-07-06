import React from 'react'
import StoresCard from '../../components/card/StoresCard'
import { HiOutlineArchiveBox } from 'react-icons/hi2'
import { PiCubeDuotone } from 'react-icons/pi'
import { MdErrorOutline, MdOutlineMail } from 'react-icons/md'
import { Outlet } from 'react-router-dom'

const StoreCard = () => {
  return (
    <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full mt-8 ">
        <StoresCard
          title="A Class"
          icon={HiOutlineArchiveBox}
          percent="in Stock"
        />
        <StoresCard
          title="B Class"
          icon={PiCubeDuotone}
          percent="not in Stock"
          borderColor="#22C55E"
        />
        <StoresCard
          title="C Class"
          icon={MdOutlineMail}
          percent="not in Stock"
        />
      </div>
      <div className="flex items-center gap-3 mt-8">
      <span className="font-bold text-2xl" style={{ color: "rgba(var(--text))" }}>C Class items</span>
      <span className="inline-flex items-center text-xs font-medium rounded px-2 py-0.5"
        style={{ color: "#15803d", background: "#dcfce7" }}>
        in stock
      </span>
    </div>
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
    <Outlet/>
    </div>

  )
}

export default StoreCard