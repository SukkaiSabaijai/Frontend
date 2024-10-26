export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    accessToken: string;
    refreshToken?: string; 
    user: {
      id: string;
      email: string;
      name: string;
    };
  }