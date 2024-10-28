import { getAccessToken } from "@/lib/getAccessToken";
import axios, { AxiosInstance } from "axios";
import { enqueueSnackbar } from "notistack";

// Create the Axios instance
const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken(); 

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
