import React, {useState} from "react";
import Button from "../../../components/buttons/Button";
import useManage from "../../../services/useManage";
import {useQuery} from "@tanstack/react-query";
import SearchBar from "../../../components/common/Searchbar";
import DaynamicTable from "../../../components/common/Table";
import {useNavigate} from "react-router-dom";
import BasicSearchBar from "../../../components/common/BasicSearchBar";

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {getUsersByRole} = useManage();

  const page = 1;
  const limit = 10;

  const {
    data: usersQuery,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["users", "OTHERS", page, limit, search],
    queryFn: () => getUsersByRole({role: "OTHERS", page, limit, search}),
    staleTime: 1000 * 60 * 5,
  });

  const transformedData = usersQuery?.item?.map((user, idx) => ({
    id: user.user_name ?? idx, // Use user_name or fallback to index
    data: [user.name, user.user_name, user.role, user.created_at || "—"],
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
        <Button onClick={() => navigate("/manage_users/create")}>
          Create User
        </Button>
      </div>

      <h2 className="text-xl font-semibold mt-4">Users</h2>

      {isLoading && <p>Loading users...</p>}
      {isError && <p className="text-red-500">Failed to load users.</p>}

      {usersQuery && (
        <DaynamicTable
          header={usersQuery.header}
          tableData={{item: transformedData}}
        />
      )}
    </div>
  );
};

export default ManageUsers;
