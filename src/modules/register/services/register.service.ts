// services/register.service.ts

import axios from "axios";
import { RegisterCredentials, RegisterResponse } from "../types/registerPage";
import Axios from "@/shared/utils/axios";
import { endpoints } from "@/shared/configs/endpoints.config";

export const registerUser = async (
  credentials: RegisterCredentials
): Promise<RegisterResponse> => {
  try {
    const response = await Axios.post<RegisterResponse>(
      endpoints.user.register,
      credentials
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An error occurred during registration."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
