export interface UserProfileData {
  id: number;
  username: string;
  email: string;
  gender: string;
  date_of_birth: string;
  user_pic: string;
}

export interface UpdateProfileData {
  username?: string;
  email?: string;
  gender?: string;
  date_of_birth?: string;
  user_pic?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data?: UserProfileData;
}

export interface UpdatePasswordData {
  old_password: string;
  new_password: string;
  confirm_password: string;
}