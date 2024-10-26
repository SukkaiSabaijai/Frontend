import axios from 'axios';
import { RegisterPageState } from '../types/registerPage'; 

const API_URL = 'https://your-api-endpoint.com/register';

export const registerUser = async (registerData: RegisterPageState): Promise<void> => {
  try {
    await axios.post('https://www.melivecode.com/api/users/create', registerData);
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Registration failed. Please try again.');
  }
};
