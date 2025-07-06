import React from 'react'
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/common/Table";

const StoreList = () => {
  const stockData = [
    {
      name: "abc",
      vendor: "Mohan Kumar",
      date: "22/6/2025",
      quantity: 100,
      size: 100,
      status: "in stock",
    },{
      name: "abc",
      vendor: "Mohan Kumar",
      date: "22/6/2025",
      quantity: 100,
      size: 100,
      status: "in stock",
    },{
      name: "abc",
      vendor: "Mohan Kumar",
      date: "22/6/2025",
      quantity: 100,
      size: 100,
      status: "in stock",
    },{
      name: "abc",
      vendor: "Mohan Kumar",
      date: "22/6/2025",
      quantity: 100,
      size: 100,
      status: "in stock",
    },{
      name: "abc",
      vendor: "Mohan Kumar",
      date: "22/6/2025",
      quantity: 100,
      size: 100,
      status: "in stock",
    },{
      name: "abc",
      vendor: "Mohan Kumar",
      date: "22/6/2025",
      quantity: 100,
      size: 100,
      status: "in stock",
    },{
      name: "abc",
      vendor: "Mohan Kumar",
      date: "22/6/2025",
      quantity: 100,
      size: 100,
      status: "in stock",
    },{
      name: "abc",
      vendor: "Mohan Kumar",
      date: "22/6/2025",
      quantity: 100,
      size: 100,
      status: "in stock",
    },{
      name: "abc",
      vendor: "Mohan Kumar",
      date: "22/6/2025",
      quantity: 100,
      size: 100,
      status: "in stock",
    },{
      name: "abc",
      vendor: "Mohan Kumar",
      date: "22/6/2025",
      quantity: 100,
      size: 100,
      status: "in stock",
    },{
      name: "abc",
      vendor: "Mohan Kumar",
      date: "22/6/2025",
      quantity: 100,
      size: 100,
      status: "in stock",
    },{
      name: "abc",
      vendor: "Mohan Kumar",
      date: "22/6/2025",
      quantity: 100,
      size: 100,
      status: "in stock",
    },

  ];

  return (
    <div>
            <div className="mt-8 rounded-xl shadow-sm w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6"
        style={{
          background: "rgba(var(--background))",
          color: "rgba(var(--text))",
          borderColor: "rgba(var(--border))",
        }}
      >
        <div className="overflow-x-auto">
          <Table className="text-sm">
            <TableHeader>
              <TableRow>
                <TableCell isHeader className="px-6 py-3 text-left font-semibold"
                  style={{ color: "rgba(var(--text))" }}>Name</TableCell>
                <TableCell isHeader className="px-6 py-3 text-left font-semibold"
                  style={{ color: "rgba(var(--text))" }}>Vendor name</TableCell>
                <TableCell isHeader className="px-6 py-3 text-left font-semibold"
                  style={{ color: "rgba(var(--text))" }}>Date of Purchasing</TableCell>
                <TableCell isHeader className="px-6 py-3 text-left font-semibold"
                  style={{ color: "rgba(var(--text))" }}>Quantity</TableCell>
                <TableCell isHeader className="px-6 py-3 text-left font-semibold"
                  style={{ color: "rgba(var(--text))" }}>Size</TableCell>
                <TableCell isHeader className="px-6 py-3 text-left font-semibold"
                  style={{ color: "rgba(var(--text))" }}>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockData.map((row, idx) => (
                <TableRow key={idx} className="border-t" style={{ borderColor: "rgba(var(--border))" }}>
                  <TableCell className="px-6 py-4">{row.name}</TableCell>
                  <TableCell className="px-6 py-4">{row.vendor}</TableCell>
                  <TableCell className="px-6 py-4">{row.date}</TableCell>
                  <TableCell className="px-6 py-4">{row.quantity}</TableCell>
                  <TableCell className="px-6 py-4">{row.size}</TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-green-600 bg-green-50 rounded px-2 py-1 text-xs font-medium"
                      style={{ color: "#15803d", background: "#dcfce7" }}>
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-wrap justify-center mt-6 gap-1">
          <nav className="inline-flex items-center space-x-1">
            <button className="px-3 py-1 text-gray-400 bg-transparent rounded cursor-not-allowed flex items-center" disabled>
              &larr; Previous
            </button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white font-semibold">1</button>
            <button className="px-3 py-1 rounded text-[rgba(var(--text))] hover:bg-[rgba(var(--hover))]">2</button>
            <button className="px-3 py-1 rounded text-[rgba(var(--text))] hover:bg-[rgba(var(--hover))]">3</button>
            <span className="px-2 py-1 text-gray-400">...</span>
            <button className="px-3 py-1 rounded text-[rgba(var(--text))] hover:bg-[rgba(var(--hover))]">67</button>
            <button className="px-3 py-1 rounded text-[rgba(var(--text))] hover:bg-[rgba(var(--hover))]">68</button>
            <button className="px-3 py-1 text-[rgba(var(--text))] bg-transparent rounded flex items-center hover:bg-[rgba(var(--hover))]">
              Next &rarr;
            </button>
          </nav>
        </div>
      </div>


    </div>
  )
}

export default StoreList