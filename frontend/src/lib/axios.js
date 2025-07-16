import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? `http://localhost:${import.meta.env.VITE_BACKEND_PORT || 5001}/api` : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
