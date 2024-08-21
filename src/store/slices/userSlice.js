import { createSlice } from "@reduxjs/toolkit";
import { LOGOUT } from "../asyncActions/logout";

const initialState = {
  userDetails: [],
  pin: null,
  verified: false,
  message: "",
  error: "",
  loading: false,
  address: null,
  role: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.userDetails = action.payload;
      state.loading = false;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
      state.loading = false;
    },
    updatePin: (state, action) => {
      state.pin = action.payload;
      state.loading = false;
    },
    updateMessage: (state, action) => {
      state.message = action.payload;
      state.loading = false;
    },
    updateRole: (state, action) => {
      state.role = action.payload;
      state.loading = false;
    },
    isError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    isLoading: (state) => {
      state.loading = true;
    },
    isVerified: (state) => {
      state.verified = true;
      state.loading = false;
    },
    reset: (state) => {
      state.userDetails = [];
      state.verified = false;
      state.message = "";
      state.error = "";
      state.loading = false;
      state.address = null;
      state.role = "";
    },
    purge: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LOGOUT, () => initialState);
  },
});

export const {
  updateUser,
  updateAddress,
  updatePin,
  updateMessage,
  updateRole,
  isError,
  isLoading,
  isVerified,
  reset,
} = userSlice.actions;

export default userSlice.reducer;
