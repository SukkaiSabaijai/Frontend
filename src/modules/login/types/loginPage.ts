export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    accessToken: string;
    refreshToken: string; 
    user: {
      id: string;
      email: string;
      name: string;
    };
  }