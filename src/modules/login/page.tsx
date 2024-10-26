"use client";

import React, { useState } from "react";
import Button from "@/shared/components/button/button";
import { loginUser } from "./services/login.service";
import { LoginCredentials, LoginResponse } from "./types/loginPage"; 

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 

  const handleLogin = async () => {
    setError(null); 
    setLoading(true); 

    try {
      const credentials: LoginCredentials = { email, password }; 
      const response = await loginUser(credentials);
      console.log('Login successful:', response);
    } catch (error: any) {
      setError(error.message); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <h1 className="text-4xl font-bold text-center bg-custom-blue text-white w-full py-20 mb-8 rounded-b-[15px]">
        Toilet Near Me🚽
      </h1>

      <div className="flex-grow flex flex-col items-center w-full max-w-md mx-auto px-4">
        <h2 className="text-3xl font-bold mb-5 w-full mt-20">Log in</h2>

        <div className="mb-8 w-full ">
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-8 w-full">
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="text-center mb-16 w-full">
          <p className="underline text-gray-500">
            Register?
          </p>
        </div>

        <div className="flex justify-center w-full">
          <Button onClick={handleLogin}>
            <h1>Log in</h1>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
