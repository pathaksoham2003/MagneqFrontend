import React from 'react'
import useManage from '../../../services/useManage';
import { useQuery } from '@tanstack/react-query';
import DaynamicTable from '../../../components/common/Table';

const ManageSuppliers = () => {
  const { getUsersByRole } = useManage();
  const {data:usersQuery,isLoading,isError} = useQuery({
    queryKey: ['users', 'SUPPLIER'],
    queryFn: () => getUsersByRole('SUPPLIER'),
    staleTime: 1000 * 60 * 5,
  });

  const headers = ['Name', 'Username', 'Role'];
  const tableData = usersQuery;

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold mt-4">Suppliers</h2>
      {isLoading && <p>Loading suppliers...</p>}
      {isError && <p className="text-red-500">Failed to load suppliers.</p>}
      <DaynamicTable header={headers} tableData={tableData} />
    </div>
  );
};

export default ManageSuppliers;