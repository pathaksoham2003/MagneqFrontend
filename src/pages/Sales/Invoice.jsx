import React from "react";
import logo from "../../../public/logoBased.js"; 
const Invoice = ({ customerDetails, orderDetails }) => {
  if (!orderDetails?.items) return <div>No order data</div>;

  const { customer_name, customer_address, customer_phone } = customerDetails || {};
  const { salesOrderId, date, items, totalAmount } = orderDetails;

  return (
    <div className="p-6 max-w-3xl mx-auto text-sm text-black bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <img src={logo} alt="Company Logo" className="w-24 h-auto" />
        <div className="text-right">
          <h2 className="text-xl font-bold">INVOICE</h2>
          <p><strong>Invoice #:</strong> {salesOrderId}</p>
          <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Company Details */}
      <div className="mb-6">
        <p><strong>Company Name:</strong> MyCompany Pvt Ltd</p>
        <p><strong>Address:</strong> 123, Industrial Area, Mumbai, India</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>GST No:</strong> 27AABCU9603R1ZV</p>
      </div>

      {/* Customer Info */}
      <div className="mb-6">
        <h3 className="font-semibold mb-1">Bill To:</h3>
        <p><strong>Name:</strong> {customer_name}</p>
        <p><strong>Address:</strong> {customer_address}</p>
        <p><strong>Phone:</strong> {customer_phone}</p>
      </div>

      {/* Item Table */}
      <table className="w-full border border-gray-300 mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Product</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Rate</th>
            <th className="border px-2 py-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{idx + 1}</td>
              <td className="border px-2 py-1">{item.finished_good || item.product_name}</td>
              <td className="border px-2 py-1">{item.quantity}</td>
              <td className="border px-2 py-1">₹{Number(item.rate_per_unit).toFixed(2)}</td>
              <td className="border px-2 py-1">
                ₹{(item.quantity * item.rate_per_unit).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="text-right font-semibold text-lg">
        Total: ₹{Number(totalAmount).toFixed(2)}
      </div>
    </div>
  );
};

export default Invoice;
