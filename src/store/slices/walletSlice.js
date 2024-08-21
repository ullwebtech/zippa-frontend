import { createSlice } from "@reduxjs/toolkit";
import { LOGOUT } from "../asyncActions/logout";

const initialState = {
  wallet: [],
  savings: 0,
  cards: [],
  banks: [],
  transferState: {},
  transferDetails: {},
  transactions: [],
  message: "",
  error: "",
  loading: false,
};
export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateWallet: (state, action) => {
      state.wallet = action.payload;
      state.loading = false;
    },
    updateTransactions: (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
    },
    updateSavings: (state, action) => {
      state.savings = action.payload;
      state.loading = false;
    },
    updateCards: (state, action) => {
      state.cards = action.payload;
      state.loading = false;
    },
    updateBanks: (state, action) => {
      state.banks = action.payload;
      state.loading = false;
    },
    updateTransferDetails: (state, action) => {
      state.transferDetails = action.payload;
      state.loading = false;
    },
    updateTransferState: (state, action) => {
      state.transferState = action.payload;
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
  updateWallet,
  updateTransactions,
  updateSavings,
  updateCards,
  updateBanks,
  updateTransferDetails,
  updateTransferState,
  updateMessage,
  isError,
  isLoading,
  reset,
} = walletSlice.actions;

export default walletSlice.reducer;
