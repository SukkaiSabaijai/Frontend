import axios, { AxiosInstance } from "axios";
import { enqueueSnackbar } from "notistack";
import { clearTokens, getAccessToken, getRefreshToken, setAccessToken } from "../../lib/getAccessToken";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) return null;

  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/auth/refresh", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const newAccessToken = response.data.accessToken;
    setAccessToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    clearTokens();
    return null;
  }
}

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;