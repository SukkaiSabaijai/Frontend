import axios from 'axios';
import { LoginResponse, LoginCredentials } from '../types/loginPage';

const API_URL = 'http://localhost:3001/auth/signin';

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(API_URL, credentials);
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred during login.');
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};
