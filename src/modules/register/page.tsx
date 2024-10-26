"use client";

import Button from "@/shared/components/button/button";
import React from "react";
import { RegisterPageState } from "./types/registerPage";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <h1 className="text-4xl font-bold text-center bg-custom-blue text-white w-full py-20 mb-8 rounded-b-[15px]">
        Toilet Near Me🚽
      </h1>

      <div className="flex-grow flex flex-col items-center w-full max-w-md mx-auto px-4">
        <h2 className="text-3xl font-bold mb-5 w-full mt-20">Sign Up</h2>

        <div className="mb-8 w-full">
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md"
            placeholder="Email"
          />
        </div>

        <div className="mb-8 w-full">
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md"
            placeholder="Password"
          />
        </div>

        <div className="mb-8 w-full">
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md"
            placeholder="Confirm Password"
          />
        </div>

        <div className="text-center mb-16 w-full">
          <p className="underline text-gray-500">
            Already have an account?{" "}
          </p>
        </div>

        <div className="flex justify-center w-full">
          <Button>
            <h1>Sign Up</h1>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
