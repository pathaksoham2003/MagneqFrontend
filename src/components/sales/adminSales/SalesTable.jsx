import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DaynamicTable from "../../common/Table";
import Badge from "../../common/Badge";

const SalesTable = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.sales);

  const headers = [
    "Order ID",
    "Date of Creation",
    "Customer Name",
    "Model",
    "Type",
    "Ratio",
    "Qty",
    "Status",
  ];

  const formatCell = (cell, idx) => {
    // Format date
    if (idx === 1 && typeof cell === "string" && /^\d{4}-\d{2}-\d{2}T/.test(cell)) {
      return new Date(cell).toLocaleDateString();
    }

    // Format status with badge
    if (idx === 7) {
      const getStatusColor = (statusText) => {
        if (!statusText) return "light";
        const lower = statusText.toLowerCase();
        if (lower.includes("dispatched") || lower.includes("approved")) return "success";
        if (lower.includes("in process") || lower.includes("pending")) return "warning";
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

  // Transform raw data into row format expected by DaynamicTable
  const tableData = {
  item: data?.map((order) => ({
    id: order.id,
    data: [
      order.id,
      order.createdAt,
      order.customerName,
      order.model,
      order.type,
      order.ratio,
      order.quantity,
      order.status,
    ],
  })) ?? [],
  page_no: 1,
  total_pages: 1,
  total_items: data?.length ?? 0,
};

  return (
    <DaynamicTable
      header={headers}
      tableData={tableData}
      formatCell={formatCell}
    />
  );
};

export default SalesTable;