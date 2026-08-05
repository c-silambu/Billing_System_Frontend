import axios from "axios";

const API = axios.create({
  // Empty in production means same-origin; set VITE_API_URL for a separate API host.
  baseURL: (import.meta.env.VITE_API_URL || "").replace(/\/$/, ""),
  timeout: 15000,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
