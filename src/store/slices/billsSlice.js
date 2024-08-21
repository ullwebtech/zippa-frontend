import { createSlice } from "@reduxjs/toolkit";
import { LOGOUT } from "../asyncActions/logout";

const initialState = {
  cableVariations: [],
  dataVariations: [],
  meter: [],
  decoder: [],
  token: "",
  message: "",
  error: "",
  loading: false,
};

export const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    updateCableVariations: (state, action) => {
      state.cableVariations = action.payload;
      state.loading = false;
    },
    updateDataVariations: (state, action) => {
      state.dataVariations = action.payload;
      state.loading = false;
    },
    updateMeter: (state, action) => {
      state.meter = action.payload;
      state.loading = false;
    },
    updateDecoder: (state, action) => {
      state.decoder = action.payload;
      state.loading = false;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
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
  updateCableVariations,
  updateDataVariations,
  updateMeter,
  updateDecoder,
  updateToken,
  updateMessage,
  isError,
  isLoading,
  reset,
} = billsSlice.actions;

export default billsSlice.reducer;
