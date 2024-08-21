import toast from "react-hot-toast";
import { logout } from "../store/asyncActions/logout";
import { store } from "../store/store";
import storage from "redux-persist/lib/storage";

export function Logout(msg, route) {
  store.dispatch(logout());
  toast.success(msg);
  const keysToRemove = [
    'persist:root',
    'persist:user',
    'persist:customer',
    'persist:bills',
    'persist:target',
    'persist:thrift',
    'persist:lock',
    'persist:wallet',
    'persist:analytics',
  ];
  
  keysToRemove.forEach(key => storage.removeItem(key));

  window.history.replaceState(null, "", route);

  window.location.href = route;
  return;
}