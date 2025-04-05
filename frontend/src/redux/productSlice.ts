import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductType } from '../types/Product';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedType: ProductType | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  selectedType: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = state.selectedType 
        ? action.payload.filter(product => product.type === state.selectedType)
        : action.payload;
    },
    setSelectedType: (state, action: PayloadAction<ProductType | null>) => {
      state.selectedType = action.payload;
      state.filteredProducts = action.payload 
        ? state.products.filter(product => product.type === action.payload)
        : state.products;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      state.filteredProducts = state.filteredProducts.filter(product => product.id !== action.payload);
    },
  },
});

export const { setProducts, setSelectedType, setLoading, setError, deleteProduct } = productSlice.actions;
export default productSlice.reducer;