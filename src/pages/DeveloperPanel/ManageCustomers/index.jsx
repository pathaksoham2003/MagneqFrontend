import React, { useState } from "react";
import useManage from "../../../services/useManage";
import { useQuery } from "@tanstack/react-query";
import DaynamicTable from "../../../components/common/Table";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/common/Searchbar";
import Button from "../../../components/buttons/Button";
import BasicSearchBar from "../../../components/common/BasicSearchBar";

const ManageCustomers = () => {
  const { getUsersByRole } = useManage();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["CUSTOMER",search],
    queryFn: () => getUsersByRole({ role: "CUSTOMER" , search}),
    staleTime: 1000 * 60 * 5,
  });

  const transformedData = userData?.item?.map((user, idx) => ({
    id: user.user_name || idx,
    data: [
      user.name || "—",
      user.user_name || "—",
      user.role || "—",
      user.created_at || "—",
    ],
  }));

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between">
        <BasicSearchBar
          placeholder="Search users by name, role or username"
          className="max-w-md"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Button onClick={() => navigate("/manage_customers/create")}>
          Create Customer
        </Button>
      </div>
      <h2 className="text-xl font-semibold mt-4">Customers</h2>

      {isLoading && <p>Loading customers...</p>}
      {isError && <p className="text-red-500">Failed to load customers.</p>}

      {userData && (
        <DaynamicTable
          header={userData.header}
          tableData={{ item: transformedData }}
        />
      )}
    </div>
  );
};

export default ManageCustomers;
