import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk to fetch sales orders
export const fetchSalesOrders = createAsyncThunk(
  'sales/fetchSalesOrders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/sales-orders') // Replace with your actual endpoint
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

// Dummy fallback data
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
  },{
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
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // this is reset the slice after logout
      resetSales: (state) => {
    state.data = [];
    state.status = 'idle';
    state.error = null;
  }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSalesOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = 
        Array.isArray(action.payload) && action.payload.length
          ? action.payload:dummyData
           
      })
      .addCase(fetchSalesOrders.rejected, (state) => {
        state.status = 'failed' 
        state.data = dummyData
      })
  },
})

export default salesSlice.reducer