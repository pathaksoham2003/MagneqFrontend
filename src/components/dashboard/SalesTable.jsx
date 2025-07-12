import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DaynamicTable from '../common/Table';
import Badge from '../common/Badge';
// this component is not being used anywhere

const SalesTable = () => {
  const dispatch = useDispatch();
  const { data: salesData } = useSelector((state) => state.sales);

  const headers = [
    'Order ID',
    'Date of Creation',
    'Customer Name',
    'Model',
    'Type',
    'Ratio',
    'Qty',
    'Status',
  ];

  const getStatusColor = (statusText) => {
    if (!statusText) return 'light';
    const lower = statusText.toLowerCase();
    if (lower.includes('approved') || lower.includes('active')) return 'success';
    if (lower.includes('pending')) return 'warning';
    if (lower.includes('cancel') || lower.includes('rejected')) return 'error';
    return 'primary';
  };

  const formatCell = (cell, idx) => {
    // Format date
    if (idx === 1 && typeof cell === 'string' && /^\d{4}-\d{2}-\d{2}T?/.test(cell)) {
      return new Date(cell).toLocaleDateString();
    }

    // Format status with badge
    if (idx === 7) {
      return (
        <Badge size="sm" color={getStatusColor(cell)}>
          {cell ?? '—'}
        </Badge>
      );
    }

    return cell ?? '—';
  };

  // Transform sales data into DaynamicTable format
  const tableData = {
    item: salesData.map((order) => ({
      id: order.id,
      data: [
        order.id,
        order.createdAt,
        order.customerName,
        order.model,
        order.type,
        order.ratio,
        order.quantity,
        order.status,
      ],
    })),
  };

  return (
    <DaynamicTable
      header={headers}
      tableData={tableData}
      formatCell={formatCell}
    />
  );
};

export default SalesTable;