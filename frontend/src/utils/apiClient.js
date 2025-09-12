import axios from "axios";
import { BASE_URL } from "@/utils/apiEndpoints";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
      }
    } else {
      console.error("Server error:", error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
