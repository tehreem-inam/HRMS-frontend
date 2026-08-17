import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";

    const token = rememberMe
      ? localStorage.getItem("accessToken")
      : sessionStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      // Later we'll implement refresh token logic here
      console.warn("Unauthorized");
    }

    return Promise.reject(error);
  }
);

export default api;