import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types/Order';

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
      if (state.selectedOrder && state.selectedOrder.id === action.payload) {
        state.selectedOrder = null;
      }
    },
  },
});

export const { setOrders, setSelectedOrder, setLoading, setError, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;