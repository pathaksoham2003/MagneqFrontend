import React, {useState} from "react";
import Button from "../../../components/buttons/Button";
import useManage from "../../../services/useManage";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import SearchBar from "../../../components/common/Searchbar";
import DaynamicTable from "../../../components/common/Table";
import CreateUserModal from "./CreateUserPage";
import {useNavigate} from "react-router-dom";
const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {getUsers, createUser} = useManage();

  const usersQuery = useQuery({
    queryKey: ["users", {search, page}],
    queryFn: () => getUsers({search, page, limit: 10}),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]});
      setIsModalOpen(false);
    },
  });

  const onUserCreated = async (userData) => {
    await createUserMutation.mutateAsync(userData);
  };

  const headers = ["Name", "Username", "Role"];

  const tableData = usersQuery.data
    ? {
        item: usersQuery.data.item.map((row) => ({
          id: row.id,
          data: row.data,
        })),
      }
    : {item: []};

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
