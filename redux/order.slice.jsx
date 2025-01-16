import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Platform} from 'react-native';

// Axios instance with base URL for API calls
const axiosInstance = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:5000'
      : 'http://localhost:5000', // Update for local dev
});

// Action to place an order
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post('/api/order', orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Action to get orders by user ID
export const getOrdersByUserId = createAsyncThunk(
  'order/getOrdersByUserId',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `/api/order/orderbyuser/${userId}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Action to get an order by its ID
export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async (orderId, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `/api/order/orderbyid/${orderId}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Action to get all orders
export const getAllOrders = createAsyncThunk(
  'order/getAllOrders',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get('/api/order');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    placeOrderLoading: false,
    placeOrderSuccess: false,
    placeOrderError: false,
    getOrdersByUserIdLoading: false,
    getOrdersByUserIdError: false,
    getOrderByIdLoading: false,
    getOrderByIdError: false,
    getAllOrdersLoading: false,
    getAllOrdersError: false,
    orders: [],
    order: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(placeOrder.pending, state => {
        state.placeOrderLoading = true;
        state.placeOrderSuccess = false;
        state.placeOrderError = false;
      })
      .addCase(placeOrder.fulfilled, state => {
        state.placeOrderLoading = false;
        state.placeOrderSuccess = true;
        state.placeOrderError = false;
      })
      .addCase(placeOrder.rejected, state => {
        state.placeOrderLoading = false;
        state.placeOrderSuccess = false;
        state.placeOrderError = true;
      })
      .addCase(getOrdersByUserId.pending, state => {
        state.getOrdersByUserIdLoading = true;
        state.getOrdersByUserIdError = false;
      })
      .addCase(getOrdersByUserId.fulfilled, (state, action) => {
        state.getOrdersByUserIdLoading = false;
        state.getOrdersByUserIdError = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersByUserId.rejected, state => {
        state.getOrdersByUserIdLoading = false;
        state.getOrdersByUserIdError = true;
      })
      .addCase(getOrderById.pending, state => {
        state.getOrderByIdLoading = true;
        state.getOrderByIdError = false;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.getOrderByIdLoading = false;
        state.getOrderByIdError = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, state => {
        state.getOrderByIdLoading = false;
        state.getOrderByIdError = true;
      })
      .addCase(getAllOrders.pending, state => {
        state.getAllOrdersLoading = true;
        state.getAllOrdersError = false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.getAllOrdersLoading = false;
        state.getAllOrdersError = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, state => {
        state.getAllOrdersLoading = false;
        state.getAllOrdersError = true;
      });
  },
});

export default orderSlice.reducer;
