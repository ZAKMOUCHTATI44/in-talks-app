import axios from "axios";
import { logout } from "./authHelper";

const api = axios.create({
  baseURL: "https://api.inflauditor.ma",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(JSON.stringify(error));
    if (error.response?.status === 401) {
      logout();
      window.location.href = "/login";
      // return Promise.reject(new Error("Unauthorized - Please login again."));
    }
  }
);

export default api;
