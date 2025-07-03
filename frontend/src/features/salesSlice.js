import { createSlice } from '@reduxjs/toolkit'

const dummyData = [
  {
    id: 'SO-001',
    createdAt: '2024-11-05',
    customerName: 'Acme Corp',
    model: 'X100',
    type: 'Retail',
    ratio: '60:40',
    quantity: 120,
    status: 'Approved',
  },
  {
    id: 'SO-002',
    createdAt: '2024-11-06',
    customerName: 'Globex Ltd',
    model: 'Z200',
    type: 'Wholesale',
    ratio: '70:30',
    quantity: 85,
    status: 'Pending',
  },
  {
    id: 'SO-003',
    createdAt: '2024-11-07',
    customerName: 'Initech',
    model: 'M300',
    type: 'Retail',
    ratio: '50:50',
    quantity: 60,
    status: 'Cancelled',
  },
  {
    id: 'SO-004',
    createdAt: '2024-11-05',
    customerName: 'Acme Corp',
    model: 'X100',
    type: 'Retail',
    ratio: '60:40',
    quantity: 120,
    status: 'Approved',
  },
  {
    id: 'SO-005',
    createdAt: '2024-11-06',
    customerName: 'Globex Ltd',
    model: 'Z200',
    type: 'Wholesale',
    ratio: '70:30',
    quantity: 85,
    status: 'Pending',
  },
  {
    id: 'SO-006',
    createdAt: '2024-11-07',
    customerName: 'Initech',
    model: 'M300',
    type: 'Retail',
    ratio: '50:50',
    quantity: 60,
    status: 'Cancelled',
  },
  {
    id: 'SO-007',
    createdAt: '2024-11-05',
    customerName: 'Acme Corp',
    model: 'X100',
    type: 'Retail',
    ratio: '60:40',
    quantity: 120,
    status: 'Approved',
  },
  {
    id: 'SO-008',
    createdAt: '2024-11-06',
    customerName: 'Globex Ltd',
    model: 'Z200',
    type: 'Wholesale',
    ratio: '70:30',
    quantity: 85,
    status: 'Pending',
  },
  {
    id: 'SO-009',
    createdAt: '2024-11-07',
    customerName: 'Initech',
    model: 'M300',
    type: 'Retail',
    ratio: '50:50',
    quantity: 60,
    status: 'Cancelled',
  },
]

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    data: dummyData,
    status: 'succeeded',
    error: null,
  },
  reducers: {
    resetSales: (state) => {
      state.data = dummyData
      state.status = 'succeeded'
      state.error = null
    },
  },
})

export const { resetSales } = salesSlice.actions
export default salesSlice.reducer
