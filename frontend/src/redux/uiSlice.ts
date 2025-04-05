import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  activeSessions: number;
  isDeleteModalOpen: boolean;
  itemToDelete: {
    id: string;
    type: 'order' | 'product';
    title: string;
  } | null;
}

const initialState: UiState = {
  activeSessions: 0,
  isDeleteModalOpen: false,
  itemToDelete: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveSessions: (state, action: PayloadAction<number>) => {
      state.activeSessions = action.payload;
    },
    openDeleteModal: (state, action: PayloadAction<{ id: string; type: 'order' | 'product'; title: string }>) => {
      state.isDeleteModalOpen = true;
      state.itemToDelete = action.payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.itemToDelete = null;
    },
  },
});

export const { setActiveSessions, openDeleteModal, closeDeleteModal } = uiSlice.actions;
export default uiSlice.reducer;