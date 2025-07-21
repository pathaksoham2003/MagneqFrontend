import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSalesOrders from "../../services/useSales";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DaynamicTable from "../../components/common/Table";
import { useSelector } from "react-redux";
import Button from "../../components/buttons/Button";
import Input from "../../components/forms/Input";
import { selectAuth } from "../../features/authSlice";

const formatStatus = (status) => {
  if (typeof status === 'boolean') {
    return status ? (
      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Completed</span>
    ) : (
      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">Pending</span>
    );
  }
  if (typeof status === 'string') {
    return status.replace(/_/g, ' ');
  }
  return status;
};

const ViewSalesOrder = () => {
  const { id } = useParams();
  const { getSaleById, approaveSale, rejectSale, getSaleStatus } = useSalesOrders();
  const { data, isLoading } = useQuery({
    queryKey: ["salesOrderById", id],
    queryFn: () => getSaleById(id),
  });
  const queryClient = useQueryClient();
  const user = useSelector(selectAuth);
  const userRole = user?.route?.role;

  // Approval state for editing prices
  const [editPrices, setEditPrices] = useState(null);
  const [isApproving, setIsApproving] = useState(false);

  React.useEffect(() => {
    if (data && data.itemLevelData?.items) {
      setEditPrices(data.itemLevelData.items.map(item => ({
        ...item,
        rate_per_unit: item.rate_per_unit,
        fg_id: item.fg_id, // ensure fg_id is present
      })));
    }
  }, [data]);

  if (isLoading) return <p>Loading sales order details...</p>;
  if (!data) return <p>No sales order found.</p>;

  const status = data.headerLevelData?.Status;
  const isUnapproved = status === "UN_APPROVED";
  const canApprove = (userRole === "SALES_EXEC" || userRole === "ADMIN") && isUnapproved;

  // Header-level data
  const headerData = data.headerLevelData || {};
  const headerTable = {
    header: Object.keys(headerData),
    item: [
      {
        id: headerData["Order Id"] || "order-id",
        data: Object.entries(headerData).map(([key, val]) => {
          if (key === "Date of Creation") {
            return new Date(val).toLocaleDateString();
          }
          if (key === "Status") {
            return formatStatus(val);
          }
          if (Array.isArray(val)) {
            return val.join(", ");
          }
          return val;
        }),
      },
    ],
  };

  // Item-level data for display
  const itemLevel = data.itemLevelData || {};
  const itemTable = {
    header: itemLevel.header || [],
    item: (itemLevel.items || []).map((row, idx) => ({
      id: idx,
      data: [
        row.quantity,
        row.finished_good,
        row.rate_per_unit,
        row.item_total_price,
        formatStatus(row.status),
      ],
    })),
  };

  // Editable table for approval
  const approvalTable = {
    header: itemLevel.header || [],
    item: (editPrices || []).map((row, idx) => ({
      id: idx,
      data: [
        row.quantity,
        row.finished_good,
        <Input
          type="number"
          min={0}
          className="w-24"
          value={row.rate_per_unit}
          onChange={e => {
            const val = e.target.value;
            setEditPrices(prices => prices.map((r, i) => i === idx ? { ...r, rate_per_unit: val } : r));
          }}
        />,
        (row.quantity * row.rate_per_unit).toFixed(2),
        formatStatus(row.status),
      ],
    })),
  };

  // Approve handler
  const handleApprove = async () => {
    setIsApproving(true);
    try {
      // Prevent approval if any rate_per_unit is 0 or empty
      const hasZero = (editPrices || []).some(item => !item.rate_per_unit || Number(item.rate_per_unit) === 0);
      if (hasZero) {
        alert("All items must have a non-zero price before approval.");
        setIsApproving(false);
        return;
      }
      // Prepare updated items with new prices
      const updatedItems = (editPrices || []).map(item => ({
        fg_id: item.fg_id, // send fg_id to backend
        rate_per_unit: Number(item.rate_per_unit),
        quantity: item.quantity,
        item_total_price: Number(item.rate_per_unit) * Number(item.quantity),
      }));
      await approaveSale(id, { finished_goods: updatedItems });
      await queryClient.invalidateQueries(["salesOrderById", id]);
      setIsApproving(false);
    } catch {
      setIsApproving(false);
      alert("Approval failed");
    }
  };

  // Reject handler
  const handleReject = async () => {
    setIsApproving(true);
    try {
      await rejectSale(id);
      await queryClient.invalidateQueries(["salesOrderById", id]);
      setIsApproving(false);
    } catch {
      setIsApproving(false);
      alert("Rejection failed");
    }
  };

  const handleStatusUpdate = async () => {
    const nextStatus = status === "PROCESSED" ? "DISPATCHED" : "DELIVERED";
    try {
      await getSaleStatus(id, { status: nextStatus }); // Assuming getSaleStatus is your update function
      await queryClient.invalidateQueries(["salesOrderById", id]);
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  }; 
  const canUpdateStatus = status === "PROCESSED" || status === "DISPATCHED";
  const nextStatus = status === "PROCESSED" ? "DISPATCHED" : "DELIVERED";
  return (
    <div className="grid gap-4 md:gap-6 bg-background text-text p-6">
      <h2 className="font-semibold text-text text-2xl mb-4">Sales Order Details</h2>
      <DaynamicTable header={headerTable.header} tableData={headerTable} />
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Order Items</h3>
        {canApprove ? (
          <>
            <DaynamicTable header={approvalTable.header} tableData={approvalTable} />
            <div className="flex gap-4 mt-4">
              <Button onClick={handleApprove} disabled={isApproving}>
                {isApproving ? "Approving..." : "Approve"}
              </Button>
              <Button onClick={handleReject} variant="danger" disabled={isApproving}>
                {isApproving ? "Rejecting..." : "Reject"}
              </Button>
            </div>
          </>
        ) : (
          <DaynamicTable header={itemTable.header} tableData={itemTable} />
        )}
        {canUpdateStatus && (
          <div className="mt-4">
            <Button onClick={handleStatusUpdate}>
              Mark as {nextStatus}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSalesOrder;
