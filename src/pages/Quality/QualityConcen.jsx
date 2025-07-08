import React from 'react'
import DaynamicTable from '../../components/common/Table'

const tableHeaders = [
  'Ticket ID',
  'Vendor name',
  'Date',
  'Issue',
  'Action Taken',
];

const tableData = {
  item: [
    { id: 1, data: ['001', 'Mohan Kumar', '22/6/2025', 'Product', 'NO'] },
    { id: 2, data: ['001', 'Mohan Kumar', '22/6/2025', '1000', 'NO'] },
    { id: 3, data: ['001', 'Mohan Kumar', '22/6/2025', '10', 'NO'] },
    { id: 4, data: ['001', 'Mohan Kumar', '22/6/2025', '1000', 'YES'] },
    { id: 5, data: ['001', 'Mohan Kumar', '22/6/2025', '1000', 'NO'] },
    { id: 6, data: ['001', 'Mohan Kumar', '22/6/2025', '1000', 'YES'] },
    { id: 7, data: ['001', 'Mohan Kumar', '22/6/2025', '1000', 'YES'] },
    { id: 8, data: ['001', 'Mohan Kumar', '22/6/2025', '1000', 'YES'] },
    { id: 9, data: ['001', 'Mohan Kumar', '22/6/2025', '1000', 'YES'] },
    { id: 10, data: ['001', 'Mohan Kumar', '22/6/2025', '1000', 'YES'] },
    { id: 11, data: ['001', 'Mohan Kumar', '22/6/2025', '1000', 'YES'] },
    { id: 12, data: ['001', 'Mohan Kumar', '22/6/2025', '1000', 'YES'] },
    { id: 13, data: ['001', 'Mohan Kumar', '22/6/2025', '1000', 'YES'] },
  ],
};

const formatCell = (cell, idx) => {
  if (idx === 4) {
    // Action Taken column
    const isYes = cell === 'YES';
    return (
      <span
        style={{
          color: isYes ? '#34C759' : '#FFA500',
          background: isYes ? 'rgba(52,199,89,0.08)' : 'rgba(255,165,0,0.08)',
          padding: '2px 12px',
          borderRadius: '12px',
          fontWeight: 500,
          fontSize: '14px',
        }}
      >
        {cell}
      </span>
    );
  }
  return cell;
};

const QualityConcen = () => {
  return (
    <div className='mt-4' >
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--color-text)' }}>Quality Concerns</h2>
      <DaynamicTable header={tableHeaders} tableData={tableData} formatCell={formatCell} />
    </div>
  );
}

export default QualityConcen