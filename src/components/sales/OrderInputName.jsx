import React from "react";
import Input from "../forms/Input";
import Label from "../forms/Label";
import { useSelector } from "react-redux";

const OrderNameInput = ({ repName, setRepName, customerName, setCustomerName }) => {
//   const user = useSelector((state) => state.auth.user);
  const role = "ADMN";

  return role === "ADMIN" ? (
    <div className="space-y-2">
      <Label htmlFor="customerName" className="text-xl font-medium">Customer Name</Label>
      <Input
        id="customerName"
        name="customerName"
        placeholder="Mohan Kumar"
        type="text"
        value={customerName}
        className="max-w-150 border-0 border-gray-600"
        onChange={(e) => setCustomerName(e.target.value)}
      />
    </div>
  ) : (
    <div className="space-y-4 flex gap-15">
      <div>
        <Label htmlFor="repName" className="text-md font-medium mb-2">Executive Name</Label>
        <Input
          id="repName"
          name="repName"
          placeholder="Raj Sharma"
          type="text"
          value={repName}
          className="max-w-150 border-0 border-gray-600"
          onChange={(e) => setRepName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="customerName" className="text-md font-medium mb-2">Customer Name</Label>
        <Input
          id="customerName"
          name="customerName"
          placeholder="Mohan Kumar"
          type="text"
          value={customerName}
          className="max-w-150 border-0 border-gray-600"
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OrderNameInput;
