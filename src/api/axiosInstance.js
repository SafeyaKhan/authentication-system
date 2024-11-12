import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-dev.dudiapp.com", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or use another method to store/get token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
