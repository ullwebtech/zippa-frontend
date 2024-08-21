import { createSlice } from "@reduxjs/toolkit";
import { LOGOUT } from "../asyncActions/logout";

const initialState = {
  lockState: [],
  lockSavings: [],
  lockSaving: [],
  lockTotal: 0,
  benefitSavings: [],
  benefitSaving: [],
  benefitTotal: 0,
  kidSavings: [],
  kidSaving: [],
  kidTotal: 0,
  message: "",
  error: "",
  loading: false,
};
export const lockSlice = createSlice({
  name: "lock",
  initialState,
  reducers: {
    updateLockSavings: (state, action) => {
      state.lockSavings = action.payload;
      state.loading = false;
    },
    updateLockSaving: (state, action) => {
      state.lockSaving = action.payload;
      state.loading = false;
    },
    updateLockState: (state, action) => {
      state.lockState = action.payload;
      state.loading = false;
    },
    updateLockTotal: (state, action) => {
      state.lockTotal = action.payload;
      state.loading = false;
    },
    updateBenefitSavings: (state, action) => {
      state.benefitSavings = action.payload;
      state.loading = false;
    },
    updateBenefitSaving: (state, action) => {
      state.benefitSaving = action.payload;
      state.loading = false;
    },
    updateBenefitTotal: (state, action) => {
      state.benefitTotal = action.payload;
      state.loading = false;
    },
    updateKidSavings: (state, action) => {
      state.kidSavings = action.payload;
      state.loading = false;
    },
    updateKidSaving: (state, action) => {
      state.kidSaving = action.payload;
      state.loading = false;
    },
    updateKidTotal: (state, action) => {
      state.kidTotal = action.payload;
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
  updateLockSavings,
  updateLockSaving,
  updateLockState,
  updateLockTotal,
  updateBenefitSavings,
  updateBenefitSaving,
  updateBenefitTotal,
  updateKidSavings,
  updateKidSaving,
  updateKidTotal,
  updateMessage,
  isError,
  isLoading,
  reset,
} = lockSlice.actions;

export default lockSlice.reducer;
