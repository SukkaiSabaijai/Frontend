"use client";

import Button from "@/shared/components/button/button";
import React, { useState } from "react";
import Link from "next/link";
import { RegisterCredentials } from "./types/registerPage";
import { registerUser } from "./services/register.service"; 
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const credentials: RegisterCredentials = {
      email,
      username,
      gender,
      date_of_birth: dateOfBirth,
      password,
      confirmPassword,
    };

    try {
      const response = await registerUser(credentials);
      setSuccessMessage(response.message);
      setError(null); 

      router.push("/login");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <h1 className="text-4xl font-bold text-center bg-custom-blue text-white w-full py-20 mb-8 rounded-b-[15px]  cursor-pointer" onClick={() => (window.location.href = "/")}>
        Toilet Near Me🚽
      </h1>

      <div className="flex-grow flex flex-col items-center w-full max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold mb-5 w-full mt-10 text-[#2a2e43]">Sign up</h2>

        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="mb-4 w-full">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Email"
          />
        </div>

        <div className="mb-4 w-full">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Username"
          />
        </div>

        <div className="mb-4 w-full flex space-x-4">
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="date"
            id="dob"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Date of birth"
          />
        </div>

        <div className="mb-4 w-full">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Password"
          />
        </div>

        <div className="mb-6 w-full">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Confirm Password"
          />
        </div>

        <div className="text-center mb-10 w-full">
          <Link href="/login">
            <p className="underline text-gray-500 cursor-pointer">
              Already have an account?
            </p>
          </Link>
        </div>

        <div className="flex justify-center w-full">
          <Button onClick={handleRegister}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
