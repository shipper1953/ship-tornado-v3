import axios from "axios";

// Base public API instance (no token)
const API = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

// Private API instance (token injected)
export const privateAPI = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

// Automatically add JWT token to private requests
privateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
