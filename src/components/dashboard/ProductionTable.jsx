import React, {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import DaynamicTable from "../common/Table";
import Badge from "../common/Badge";
import useProduction from "../../services/useProduction";
import Button from "../buttons/Button";
import Pagination from "../common/Pagination";
import {useNavigate} from "react-router-dom";
import { useSearch } from "../../context/SearchbarContext";
import useNotification from "../../services/useNotification";

const ProductionTable = () => {
  const {getPendingProductions, startProductionById, markAsReady} =
    useProduction();
  const {createNotification}=useNotification();
  const [page, setPage] = useState(1);
  const { searchQuery } = useSearch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ["pendingProductions", page, searchQuery],
    queryFn: () => getPendingProductions(page, searchQuery),
    staleTime: 5 * 60 * 1000,
  });

  const formatCell = (cell, idx, item_id) => {
    // Format date
    if (
      idx === 2 &&
      typeof cell === "string" &&
      /^\d{4}-\d{2}-\d{2}T/.test(cell)
    ) {
      return new Date(cell).toLocaleDateString();
    }

    // Order Details (array)
    if (idx === 3 && Array.isArray(cell)) {
      return (
        <div className="flex flex-wrap gap-2">
          {cell.map((entry, idx) => (
            <div
              key={idx}
              className="bg-background text-text text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
            >
              {entry.split("/").join(" | ")}
            </div>
          ))}
        </div>
      );
    }

    // Status Action Buttons
    if (idx === 5 && typeof cell === "string") {
      const status = cell;
      let color = "primary";
      let label = status;
      if (cell ==="NOT_IN_STOCK"){
        color = "danger";
        label = "Not In Stock";
        return (
        <Badge size="sm" color={color}>
          {label}
        </Badge>
        );
      } else 
      if (cell === "IN_STOCK") {
        return (
          <Button
            onClick={async () => {
              await startProductionById(item_id);
              await refetch();
              queryClient.invalidateQueries({ queryKey:["sales"]});
            }}
            className="bg-blue-500 text-white px-3 py-1 text-xs rounded-md hover:bg-blue-600 transition"
          >
            Start
          </Button>
        );
      } else if (cell === "IN_PROCESSES") {
          const productionIdCell = data?.item.find(item => item.id === item_id)?.data?.[0];
          const productionNumber = productionIdCell?.match(/\d+/)?.[0]; // This gives "38"
        return (
          <Button
            onClick={async () => {
              const message = `Sales #${productionNumber} is ready to be Dispatched.`;
              await markAsReady(item_id);
              await createNotification({type:"sales",payload:{message}})
              await refetch();
              queryClient.invalidateQueries({ queryKey:["sales"]});
            }}
          >
            Ready
          </Button>
        );
      } else {
        <h2>{cell}</h2>;
      }
    }

    return cell ?? "—";
  };

  const handleRowClick = (obj) => {
    navigate(`/production/${obj.item_id}`);
  };

  if (isLoading)
    return <p className="text-center">Loading production data...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">Error loading production data.</p>
    );

  return (
    <div>
      <DaynamicTable
        header={data?.header || []}
        tableData={{
          item: data?.item || [],
          page_no: data?.page_no,
          total_pages: data?.total_pages,
          total_items: data?.total_items,
        }}
        formatCell={formatCell}
        onRowClick={handleRowClick}
      />

      <Pagination
        currentPage={page}
        totalPages={data.total_pages}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
};

export default ProductionTable;
