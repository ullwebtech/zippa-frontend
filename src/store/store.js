import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import userSlice from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import billsSlice from "./slices/billsSlice";
import targetSlice from "./slices/targetSlice";
import thriftSlice from "./slices/thriftSlice";
import lockSlice from "./slices/lockSlice";
import walletSlice from "./slices/walletSlice";
import { LOGOUT } from "./asyncActions/logout";

const rootReducer = combineReducers({
  user: userSlice,
  bills: billsSlice,
  target: targetSlice,
  thrift: thriftSlice,
  lock: lockSlice,
  wallet: walletSlice,
});

const appReducer = (state, action) => {
  if (action.type === LOGOUT) {
    Object.keys(state).forEach((key) => {
      storage.removeItem(`persist:${key}`);
    });
    state = undefined;
  }
  return rootReducer(state, action);
};

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "bills", "target", "thrift", "lock", "wallet"],
};

const persistedReducer = persistReducer(rootPersistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
