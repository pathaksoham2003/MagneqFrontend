import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import html2pdf from "html2pdf.js";
import { toast } from "react-hot-toast";

import useSalesOrders from "../../services/useSales";
import { selectAuth } from "../../features/authSlice";
import useManage from "../../services/useManage";
import DaynamicTable from "../../components/common/Table";
import Button from "../../components/buttons/Button";
import Input from "../../components/forms/Input";
import Invoice from "./Invoice";

const formatStatus = (status) => {
  if (typeof status === "boolean") {
    return status ? (
      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Completed</span>
    ) : (
      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">Pending</span>
    );
  }
  if (typeof status === "string") return status.replace(/_/g, " ");
  return status;
};

const ViewSalesOrder = () => {
  const { id } = useParams();
  const invoiceRef = useRef();
  const queryClient = useQueryClient();

  const [receivedInput, setReceivedInput] = useState("");
  const [editPrices, setEditPrices] = useState(null);
  const [isApproving, setIsApproving] = useState(false);

  const { getAllCustomers } = useManage();
  const { getSaleById, approaveSale, rejectSale, getSaleStatus, saleRecievedAmt } = useSalesOrders();
  const user = useSelector(selectAuth);
  const userRole = user?.route?.role;

  const { data, isLoading } = useQuery({
    queryKey: ["salesOrderById", id],
    queryFn: () => getSaleById(id),
  });

  const customerName = data?.headerLevelData?.["Customer Name"] || "";

  const { data: customerData } = useQuery({
    queryKey: ["customerByName", customerName],
    queryFn: () => getAllCustomers({ page: 1, limit: 20, search: customerName }),
    enabled: !!customerName,
  });

  useEffect(() => {
    if (data?.itemLevelData?.items) {
      setEditPrices(data.itemLevelData.items.map(item => ({
        ...item,
        rate_per_unit: item.rate_per_unit,
        fg_id: item.fg_id,
      })));
    }
  }, [data]);

  if (isLoading) return <p>Loading sales order details...</p>;
  if (!data) return <p>No sales order found.</p>;

  const status = data.headerLevelData?.Status;
  const isUnapproved = status === "UN_APPROVED";
  const canApprove = (["SALES_EXEC", "ADMIN"].includes(userRole)) && isUnapproved;

  const headerData = data.headerLevelData || {};
  const itemLevel = data.itemLevelData || {};

  const headerTable = {
    header: Object.keys(headerData),
    item: [{
      id: headerData["Order Id"] || "order-id",
      data: Object.entries(headerData).map(([key, val]) => {
        if (key === "Date of Creation") return new Date(val).toLocaleDateString();
        if (key === "Status") return formatStatus(val);
        if (Array.isArray(val)) return val.join(", ");
        if (["Total Price", "Recieved Amount"].includes(key)) {
          return Number(val).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
          });
        }
        return val;
      }),
    }],
  };

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
          onChange={e =>
            setEditPrices(prices =>
              prices.map((r, i) =>
                i === idx ? { ...r, rate_per_unit: e.target.value } : r
              )
            )
          }
        />,
        (row.quantity * row.rate_per_unit).toFixed(2),
        formatStatus(row.status),
      ],
    })),
  };

  const handleApprove = async () => {
    setIsApproving(true);
    const hasZero = editPrices?.some(item => !item.rate_per_unit || Number(item.rate_per_unit) === 0);
    if (hasZero) {
      toast.error("All items must have a non-zero price before approval.");
      setIsApproving(false);
      return;
    }
    try {
      const updatedItems = editPrices.map(item => ({
        fg_id: item.fg_id,
        rate_per_unit: Number(item.rate_per_unit),
        quantity: item.quantity,
        item_total_price: Number(item.rate_per_unit) * Number(item.quantity),
      }));
      await approaveSale(id, { finished_goods: updatedItems });
      await queryClient.invalidateQueries(["salesOrderById", id]);
      toast.success("Sales order approved successfully!");
    } catch (error) {
      console.error("Approval failed:", error);
      toast.error("Approval failed");
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    setIsApproving(true);
    try {
      await rejectSale(id);
      await queryClient.invalidateQueries(["salesOrderById", id]);
      toast.success("Sales order rejected successfully!");
    } catch (error) {
      console.error("Rejection failed:", error);
      toast.error("Rejection failed");
    } finally {
      setIsApproving(false);
    }
  };

  const handleStatusUpdate = async () => {
    const nextStatus = status === "PROCESSED" ? "DISPATCHED" : "DELIVERED";
    try {
      await getSaleStatus(id, { status: nextStatus });
      await queryClient.invalidateQueries(["salesOrderById", id]);
      toast.success("Sales order status updated successfully!");
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleAmountSubmit = async () => {
    await saleRecievedAmt(id, { recieved_amt: Number(receivedInput) });
    await queryClient.invalidateQueries(["salesOrderById", id]);
    setReceivedInput("");
  };

  const canUpdateStatus = ["PROCESSED", "DISPATCHED"].includes(status);
  const nextStatus = status === "PROCESSED" ? "DISPATCHED" : "DELIVERED";

  const handleDownloadInvoice = () => {
    const element = invoiceRef.current;
    if (!element) return;

    setTimeout(() => {
      html2pdf()
        .set({
          margin: 0.5,
          filename: `Invoice_${headerData["Order Id"]}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save();
    }, 500);
  };

  return (
    <div className="grid gap-4 md:gap-6 bg-background text-text p-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl">Sales Order Details</h2>
        {status !== "UN_APPROVED" && (
          <Button onClick={handleDownloadInvoice}>
            Download Invoice
          </Button>
        )}
      </div>

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

        {headerData["Recieved Amount"] < headerData["Total Price"] && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Add Received Amount</h3>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                min={1}
                max={headerData["Total Price"] - headerData["Recieved Amount"]}
                placeholder={`Due Amount: ₹${headerData["Total Price"] - headerData["Recieved Amount"]}`}
                className="w-28"
                value={receivedInput}
                onChange={(e) => setReceivedInput(e.target.value)}
              />
              <Button onClick={handleAmountSubmit} disabled={!receivedInput}>
                Submit Amount
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Invoice for PDF */}
      <div className="hidden">
        <div ref={invoiceRef}>
          <Invoice
            orderDetails={{
              items: data.itemLevelData.items || [],
              totalAmount: data.headerLevelData["Total Price"],
              salesOrderId: data.headerLevelData["Order Id"],
              date: data.headerLevelData["Date of Creation"],
            }}
            customerDetails={{
              customer_name: customerData?.["item"][0]["data"][0] || "N/A",
              customer_address: customerData?.["item"][0]["data"][1] || "N/A",
              customer_gst: customerData?.["item"][0]["data"][2] || "N/A",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewSalesOrder;
