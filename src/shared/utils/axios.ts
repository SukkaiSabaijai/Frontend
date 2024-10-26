import { getAccessToken } from "@/lib/getAccessToken";
import axios, { AxiosInstance } from "axios";
import { enqueueSnackbar } from "notistack";

// Create the Axios instance
const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  // Do not include withCredentials to prevent sending cookies
});

// Add a request interceptor to add the access token to the Authorization header
instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken(); // Fetch token from cookies or storage

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      enqueueSnackbar("Unauthorized access. Please log in again.", {
        variant: "error",
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
