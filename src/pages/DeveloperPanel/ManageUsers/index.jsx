import React, { useState } from "react";
import Button from "../../../components/buttons/Button";
import useManage from "../../../services/useManage";
import { useQuery } from "@tanstack/react-query";
import BasicSearchBar from "../../../components/common/BasicSearchBar";
import DaynamicTable from "../../../components/common/Table";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/common/Pagination";

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();
  const { getUsersByRole } = useManage();

  const {
    data: usersQuery,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["users", "OTHERS", currentPage, limit, search],
    queryFn: () =>
      getUsersByRole({ role: "OTHERS", page: currentPage, limit, search }),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

  const transformedData = usersQuery?.item?.map((user, idx) => ({
    id: user.user_name ?? idx,
    data: [user.name, user.user_name, user.role, user.created_at || "—"],
  }));

  const totalPages = usersQuery?.total_pages || 1;

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between">
        <BasicSearchBar
          placeholder="Search users by name, role or username"
          className="max-w-md"
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); 
          }}
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
        <>
          <DaynamicTable
            header={usersQuery.header}
            tableData={{ item: transformedData }}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default ManageUsers;
