import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DaynamicTable from '../common/Table';
import Badge from '../common/Badge';

const ProductionTable = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.production);

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
    if (idx === 1 && typeof cell === 'string' && /^\d{4}-\d{2}-\d{2}T?/.test(cell)) {
      return new Date(cell).toLocaleDateString();
    }

    if (idx === 7) {
      return (
        <Badge size="sm" color={getStatusColor(cell)}>
          {cell ?? '—'}
        </Badge>
      );
    }

    return cell ?? '—';
  };

  const tableData = {
    item: data.map((order) => ({
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
    page_no: 1,
    total_pages: 1,
    total_items: data.length,
  };

  return (
    <DaynamicTable
      header={headers}
      tableData={tableData}
      formatCell={formatCell}
    />
  );
};

export default ProductionTable;