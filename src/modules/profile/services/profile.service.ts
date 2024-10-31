import axios from "axios";
import Axios from "@/shared/utils/axios";
import { endpoints } from "@/shared/configs/endpoints.config";
import { UserProfileData, UpdateProfileData, UpdateProfileResponse , UpdatePasswordData} from "../types/profilePage";

export const updateUserProfile = async (
  credentials: FormData
): Promise<UpdateProfileResponse> => {
  try {
    const response = await Axios.patch<UpdateProfileResponse>(
      endpoints.user.editProfile,  
      credentials
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An error occurred while updating profile."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const fetchUserProfile = async (): Promise<UserProfileData> => {
  try {
    const response = await Axios.get<UserProfileData>(endpoints.user.editProfile);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An error occurred while fetching user profile."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const updateUserPassword = async (
  passwordData: UpdatePasswordData
): Promise<UpdateProfileResponse> => {
  try {
    const response = await Axios.put<UpdateProfileResponse>(
      endpoints.user.changePass,
      passwordData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An error occurred while updating password."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};