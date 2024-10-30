import axios from "axios";
import { LoginResponse, LoginCredentials } from "../types/loginPage";
import Axios from "@/shared/utils/axios";
import Cookies from "js-cookie";
import { endpoints } from "@/shared/configs/endpoints.config";

// const API_URL = 'http://localhost:3001/auth/signin';

const saveTokensToCookies = (response: LoginResponse) => {
  const { accessToken, refreshToken } = response;
  Cookies.set("accessToken", accessToken, { expires: 1 });
  Cookies.set("refreshToken", refreshToken, { expires: 7 });
};

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await Axios.post<LoginResponse>(
      endpoints.user.login,
      credentials
    );
    saveTokensToCookies(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An error occurred during login."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
