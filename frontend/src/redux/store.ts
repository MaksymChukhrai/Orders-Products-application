import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import productReducer from './productSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    products: productReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;