import React from "react";
import useManage from "../../../services/useManage";
import {useQuery} from "@tanstack/react-query";
import DaynamicTable from "../../../components/common/Table";

const ManageCustomers = () => {
  const {getUsersByRole} = useManage();
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", "CUSTOMER"],
    queryFn: () => getUsersByRole("CUSTOMER"),
    staleTime: 1000 * 60 * 5,
  });

  const headers = ["Name", "Username", "Role"];
  const tableData = userData;
  return (
  <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold mt-4">Customers</h2>
      {isLoading && <p>Loading customers...</p>}
      {isError && <p className="text-red-500">Failed to load customers.</p>}
      <DaynamicTable header={headers} tableData={tableData} />
    </div>
  );
};

export default ManageCustomers;
