import { createSlice } from "@reduxjs/toolkit";
import { LOGOUT } from "../asyncActions/logout";

const initialState = {
  thriftState: [],
  thriftSavings: [],
  thriftSaving: [],
  thriftTotal: 0,
  message: "",
  error: "",
  loading: false,
};
export const thriftSlice = createSlice({
  name: "thrift",
  initialState,
  reducers: {
    updateThriftSavings: (state, action) => {
      state.thriftSavings = action.payload;
      state.loading = false;
    },
    updateThriftSaving: (state, action) => {
      state.thriftSaving = action.payload;
      state.loading = false;
    },
    updateThriftState: (state, action) => {
      state.thriftState = action.payload;
      state.loading = false;
    },
    updateThriftTotal: (state, action) => { 
      state.thriftTotal = action.payload;
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
      state.cableVariations = [];
      state.dataVariations = [];
      state.message = "";
      state.error = "";
      state.loading = false;
    },
    purge: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LOGOUT, () => initialState);
  },
});

export const {
  updateThriftSavings,
  updateThriftSaving,
  updateThriftState,
  updateThriftTotal,
  updateMessage,
  isError,
  isLoading,
  reset,
} = thriftSlice.actions;

export default thriftSlice.reducer;
