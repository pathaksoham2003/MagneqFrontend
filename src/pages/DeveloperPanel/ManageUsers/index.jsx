import React, {useState} from "react";
import Button from "../../../components/buttons/Button";
import useManage from "../../../services/useManage";
import {useQuery} from "@tanstack/react-query";
import SearchBar from "../../../components/common/Searchbar";
import DaynamicTable from "../../../components/common/Table";
import CreateUserModal from "./CreateUserPage";
import {useNavigate} from "react-router-dom";
const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {getUsersByRole} = useManage();

  const usersQuery = useQuery({
    queryKey: ["users", "OTHERS"],
    queryFn: () => getUsersByRole("OTHERS"),
    staleTime: 1000 * 60 * 5,
  });

  const headers = ["Name", "Username", "Role"];

  const tableData = usersQuery;

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between">
        <SearchBar
          placeholder="Search users by name, role or username"
          className="max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button onClick={() => navigate("/manage_users/create")}>
          Create User
        </Button>
      </div>

      <h2 className="text-xl font-semibold mt-4">Users</h2>

      {usersQuery.isLoading && <p>Loading users...</p>}
      {usersQuery.isError && (
        <p className="text-red-500">Failed to load users.</p>
      )}

      <DaynamicTable header={headers} tableData={tableData} />
    </div>
  );
};

export default ManageUsers;
