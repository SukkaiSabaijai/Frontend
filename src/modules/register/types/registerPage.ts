export interface RegisterCredentials {
  email: string;
  username: string;
  gender?: string;
  date_of_birth?: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  message: string; 
}
