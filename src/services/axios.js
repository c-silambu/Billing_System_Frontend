import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const API = axios.create({
  // Local .env points to localhost; the hosting environment supplies its API URL.
  baseURL: apiUrl.replace(/\/$/, ""),
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
