import React, {useState} from "react";
import useManage from "../../../services/useManage";
import {useQuery} from "@tanstack/react-query";
import DaynamicTable from "../../../components/common/Table";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/common/Searchbar";
import Button from "../../../components/buttons/Button";
import BasicSearchBar from "../../../components/common/BasicSearchBar";

const ManageSuppliers = () => {
  const {getUsersByRole} = useManage();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const {
    data: usersQuery,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["SUPPLIER",search],
    queryFn: () => getUsersByRole({role: "SUPPLIER",search}),
    staleTime: 1000 * 60 * 5,
  });

  const transformedData = usersQuery?.item?.map((user, idx) => ({
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
      <h2 className="text-xl font-semibold mt-4">Suppliers</h2>
      <div className="flex justify-between">
        <BasicSearchBar
          placeholder="Search users by name, role or username"
          className="max-w-md"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Button onClick={() => navigate("/manage_suppliers/create")}>
          Create Supplier
        </Button>
      </div>

      {isLoading && <p>Loading suppliers...</p>}
      {isError && <p className="text-red-500">Failed to load suppliers.</p>}

      {usersQuery && (
        <DaynamicTable
          header={usersQuery.header}
          tableData={{item: transformedData}}
        />
      )}
    </div>
  );
};

export default ManageSuppliers;
