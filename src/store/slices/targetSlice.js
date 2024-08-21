import { createSlice } from "@reduxjs/toolkit";
import { LOGOUT } from "../asyncActions/logout";

const initialState = {
  autoState: [],
  autoSavings: [],
  autoSaving: [],
  autosaveTotal: 0,
  flexState: [],
  flexTotal: 0,
  flexTrans: [],
  withdrawDate: "",
  message: "",
  error: "",
  loading: false,
};
export const targetSlice = createSlice({
  name: "target",
  initialState,
  reducers: {
    updateAutoSavings: (state, action) => {
      state.autoSavings = action.payload;
      state.loading = false;
    },
    updateAutoSaving: (state, action) => {
      state.autoSaving = action.payload;
      state.loading = false;
    },
    updateAutoState: (state, action) => {
      state.autoState = action.payload;
      state.loading = false;
    },
    updateAutosaveTotal: (state, action) => {
      state.autosaveTotal = action.payload;
      state.loading = false;
    },
    updateFlexState: (state, action) => {
      state.flexState = action.payload;
      state.loading = false;
    },
    updateFlexTotal: (state, action) => {
      state.flexTotal = action.payload;
      state.loading = false;
    },
    updateFlexTrans: (state, action) => {
      state.flexTrans = action.payload;
      state.loading = false;
    },
    updateWithdrawDate: (state, action) => {
      state.withdrawDate = action.payload;
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
  updateAutoSaving,
  updateAutoSavings,
  updateAutoState,
  updateAutosaveTotal,
  updateFlexState,
  updateFlexTotal,
  updateFlexTrans,
  updateWithdrawDate,
  updateMessage,
  isError,
  isLoading,
  reset,
} = targetSlice.actions;

export default targetSlice.reducer;
