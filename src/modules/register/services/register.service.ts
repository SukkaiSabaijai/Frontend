import axios from "axios";
import { RegisterCredentials, RegisterResponse } from "../types/registerPage";
import Axios from "@/shared/utils/axios";
import { endpoints } from "@/shared/configs/endpoints.config";

export const registerUser = async (
  credentials: RegisterCredentials
): Promise<RegisterResponse> => {
  try {
    // Create a new object to send, omitting optional fields if they are not present
    const { gender, date_of_birth, ...rest } = credentials;
    const payload: Partial<RegisterCredentials> = {
      ...rest,
      ...(gender && { gender }),
      ...(date_of_birth && { date_of_birth }),
    };

    const response = await Axios.post<RegisterResponse>(
      endpoints.user.register,
      payload
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
