import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import DaynamicTable from "../../common/Table";
import Badge from "../../common/Badge";
import useSales from "../../../services/useSales";
import Button from "../../buttons/Button";
import Pagination from "../../common/Pagination";

const SalesTable = ({isDashboard}) => {
  const {getAllSales, approaveSale} = useSales();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ["sales", page, search],
    queryFn: () => getAllSales(page, search),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!isDashboard) return;
    setPage(0);
    setSearch("");
  }, [isDashboard]);

  const formatCell = (cell, idx, item_id) => {
    if (
      idx === 1 &&
      typeof cell === "string" &&
      /^\d{4}-\d{2}-\d{2}T/.test(cell)
    ) {
      return new Date(cell).toLocaleDateString();
    }

    if (idx === 3 && Array.isArray(cell)) {
      return (
        <div className="flex flex-wrap gap-2">
          {cell.map((entry, i) => (
            <div
              key={i}
              className="bg-background text-text text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
            >
              {entry.split("/").join(" | ")}
            </div>
          ))}
        </div>
      );
    }

    if (idx === 4) {
      if (cell === "UN_APPROVED") {
        return (
          <div className="flex gap-2">
            <Button
              className="px-2"
              onClick={async () => {
                await approaveSale(item_id);
                await refetch();
              }}
            >
              Approve
            </Button>
            <Button className="px-2 bg-red-200" onClick={() => refetch()}>
              Reject
            </Button>
          </div>
        );
      }

      const getStatusColor = (statusText) => {
        if (!statusText) return "light";
        const lower = statusText.toLowerCase();
        if (lower.includes("dispatched") || lower.includes("approved"))
          return "success";
        if (lower.includes("inprocess") || lower.includes("pending"))
          return "warning";
        if (lower.includes("fg") || lower.includes("cancelled")) return "info";
        return "primary";
      };

      return (
        <Badge size="sm" color={getStatusColor(cell)}>
          {cell ?? "—"}
        </Badge>
      );
    }

    return cell ?? "—";
  };

  const handlePageChange = (newPage) => {
    console.log(newPage);
    setPage(parseInt(newPage));
  };

  if (isLoading) return <p className="text-center py-4">Loading sales...</p>;
  if (isError)
    return <p className="text-center py-4 text-red-500">Error loading sales</p>;

  return (
    <div>
      <DaynamicTable
        header={data.header}
        tableData={{item: data.item}}
        formatCell={formatCell}
      />
      {/* Remove the hardcoded h2 click */}
      {isDashboard && (
        <Pagination
          currentPage={page}
          totalPages={data.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SalesTable;
