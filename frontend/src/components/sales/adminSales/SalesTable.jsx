import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalesOrders } from '../../../features/salesSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../common/Table';
import Badge from '../../common/Badge';

const SalesTable = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.sales);

  useEffect(() => {
      dispatch(fetchSalesOrders());
  }, [dispatch]);

  const getStatusColor = (statusText) => {
    if (!statusText) return 'light';
    const lower = statusText.toLowerCase();
    if (lower.includes('dispatched') || lower.includes('approved')) return 'success';
    if (lower.includes('in process')|| lower.includes('pending') ) return 'warning';
    if (lower.includes('fg')|| lower.includes('cancelled')) return 'info';
    return 'primary';
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-white/[0.05] transition-colors">
      <div className="max-w-full max-h-[500px] overflow-x-auto overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {[
                'Order ID',
                'Date of Creation',
                'Customer Name',
                'Model',
                'Type',
                'Ratio',
                'Qty',
                'Status',
              ].map((col) => (
                <TableCell
                  key={col}
                  isHeader
                  className="px-5 py-3 font-medium text-text text-start text-theme-xs"
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-5 py-3 text-start text-theme-sm">
                  {order.id ?? '—'}
                </TableCell>
                <TableCell className="px-5 py-3 text-start text-theme-sm">
                  {order.createdAt ?? '—'}
                </TableCell>
                <TableCell className="px-5 py-3 text-start text-theme-sm">
                  {order.customerName ?? '—'}
                </TableCell>
                <TableCell className="px-5 py-3 text-start text-theme-sm">
                  {order.model ?? '—'}
                </TableCell>
                <TableCell className="px-5 py-3 text-start text-theme-sm">
                  {order.type ?? '—'}
                </TableCell>
                <TableCell className="px-5 py-3 text-start text-theme-sm">
                  {order.ratio ?? '—'}
                </TableCell>
                <TableCell className="px-5 py-3 text-start text-theme-sm">
                  {order.quantity ?? '—'}
                </TableCell>
                <TableCell className="px-5 py-3 text-start text-theme-sm">
                  <Badge size="sm" color={getStatusColor(order.status)}>
                    {order.status ?? '—'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SalesTable;