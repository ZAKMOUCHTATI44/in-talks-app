import axios from "axios";
import { signOut } from "next-auth/react";

const api = axios.create({
  // baseURL: "http://localhost:8080/api/v1",
  baseURL: "https://maroc-influence.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAuthToken(token: string) {
  if (token) {
    // Set the token in the default Authorization header for all requests
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Remove the token from the header if it's not provided
    delete api.defaults.headers.common["Authorization"];
  }
}

// Usage

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(JSON.stringify(error));
    if (error.response?.status === 403) {
      signOut();
      // return Promise.reject(new Error("Unauthorized - Please login again."));
    }
  }
);

export default api;
