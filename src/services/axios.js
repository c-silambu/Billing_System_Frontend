import axios from "axios";

const localApiUrl = import.meta.env.VITE_LOCAL_API_URL || "http://localhost:3000";
const hostedApiUrl = import.meta.env.VITE_API_URL || "";

const API = axios.create({
  // Vite chooses localhost during development and the hosted API in production.
  baseURL: (import.meta.env.DEV ? localApiUrl : hostedApiUrl).replace(/\/$/, ""),
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
