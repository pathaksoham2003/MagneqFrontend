import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../table/Table';

const DaynamicTable = ({
  header = [],
  tableData = { item: [] },
  formatCell: customFormatCell,
}) => {
  const { item = [] } = tableData;

  const defaultFormatCell = (cell) => {
    if (typeof cell === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(cell)) {
      return new Date(cell).toLocaleDateString();
    }

    if (Array.isArray(cell)) {
      return (
        <div className="flex flex-wrap gap-2">
          {cell.map((entry, idx) => (
            <div
              key={idx}
              className="bg-background text-text text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
            >
              {entry.split('/').join(' | ')}
            </div>
          ))}
        </div>
      );
    }

    return cell ?? '—';
  };

  const formatCell = customFormatCell ?? defaultFormatCell;

  if (!header.length || !item.length) {
    return <p className="text-center py-4">No data available</p>;
  }

  return (
    <div className="rounded-2xl p-1 border border-gray-100 dark:border-white/[0.05] transition-colors">
      <div className="max-w-full max-h-[500px] overflow-x-auto overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 backdrop-blur-3xl bg-white dark:bg-background  border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {header.map((col, idx) => (
                <TableCell
                  key={idx}
                  isHeader
                  className="px-5 py-3 font-medium text-text text-start text-theme-xs"
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {item.map((row) => (
              <TableRow key={row.id}>
                {row.data.map((cell, idx) => (
                  <TableCell key={idx} className="px-5 py-3 text-start text-theme-sm">
                    {formatCell(cell, idx)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DaynamicTable;