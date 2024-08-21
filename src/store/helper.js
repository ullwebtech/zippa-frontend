import axios from "axios";
import { Logout } from "../utils/Logout";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://zippa-a9fcc81062b0.herokuapp.com/api",
});

api.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("zippa::auth"));
    if (auth) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const base = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://zippa-a9fcc81062b0.herokuapp.com/api",
});

export function cleanUpResponse(res) {
  const response = res.data;
  return response;
}

export function cleanUpErr(res) {
  let response;
  if (
    res?.response?.status === 401 &&
    res?.response?.data?.message === "Authentication invalid"
  ) {
    Logout("Session Expired, Login to continue", "/login");
  }
  if (res?.code === "ERR_NETWORK") {
    response = res?.message;
  } else {
    response = res?.response?.data;
  }
  return response;
}

export default api;
