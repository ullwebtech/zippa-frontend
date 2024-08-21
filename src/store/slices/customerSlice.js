import { createSlice } from '@reduxjs/toolkit';
import { LOGOUT } from "../asyncActions/logout";

const initialState = {
  customers: [],
  customer: [],
  message: '',
  error: '',
  loading: false,
};
export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    updateCustomers: (state, action) => {
      state.customers = action.payload;
      state.loading = false;
    },
    updateCustomer: (state, action) => {
      state.customer = action.payload;
      state.loading = false;
    },
    updateMessage: (state, action) => {
      state.message = action.payload;
      state.loading = false;
    },
    isError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    isLoading: (state) => {
      state.loading = true;
    },
    reset: (state) => {
      state.customers = [];
      state.customer = [];
      state.message = '';
      state.error = '';
      state.loading = false;
    },
    purge: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LOGOUT, () => initialState);
  },
});

export const {
  updateCustomers,
  updateCustomer,
  updateMessage,
  isError,
  isLoading,
  reset,
} = customerSlice.actions;

export default customerSlice.reducer;
