import React,{useState} from "react";
import Input from "../forms/Input";
import Label from "../forms/Label";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import useManage from "../../services/useManage";
import Select from "../forms/Select";
import { useSearch } from "../../context/SearchbarContext";

const OrderNameInput = ({ repName, setRepName, customerName, setCustomerName }) => {
  const user = useSelector((state) => state.auth.route);
  const role = user?.role || "default";
  const [page, setPage] = useState(1);
  const { searchQuery, setSearchQuery} = useSearch();
  const {getAllCustomers} = useManage();

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers", page, searchQuery], 
    queryFn: () => getAllCustomers({ page, limit: 20, search: searchQuery }),
    staleTime: 5 * 60 * 1000,
  });

  
  if (isLoading) return <div>Loading customers...</div>;
  if (error) return <div>Failed to load customers.</div>;

  return role === "ADMIN" ? (
    <div className="space-y-2">
      <Label htmlFor="customerName" className="text-xl font-medium">
        Customer Name
      </Label>
      <Select
        id="customerName"
        name="customerName"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      >
        <option value="">Select a customer</option>
        {data["item"].map((customer) => (
          <option key={customer["id"]} value={customer["data"][0]}>
            {customer["data"][0]}
          </option>
        ))}
      </Select>
    </div>
  ) : (
    <div className="space-y-4 flex gap-15">
      <div>
        <Label htmlFor="repName" className="text-md font-medium mb-2">
          Executive Name
        </Label>
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
        <Label htmlFor="customerName" className="text-md font-medium mb-2">
          Customer Name
        </Label>
        <Input
          id="customerName"
          name="customerName"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OrderNameInput;
