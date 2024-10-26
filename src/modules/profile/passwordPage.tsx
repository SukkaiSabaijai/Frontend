"use client";

import React, { useState } from "react";
import ButtonIcon from "@/shared/components/button/button-icon";

const EditProfileWithPasswordPage = ({ onClose }: { onClose: () => void }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="h-[100vh] w-full relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-custom-blue text-white w-full py-16 px-8 rounded-b-[15px]">
        <h1 className="text-4xl font-bold">Hello, Sam!</h1>

        <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
          <img
            src="https://avatarfiles.alphacoders.com/210/210992.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Profile Form */}
      <div className="flex flex-col items-center gap-6 mt-12">
        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden relative">
          <img
            src="https://avatarfiles.alphacoders.com/210/210992.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 p-2 bg-white rounded-full cursor-pointer">
            <img src="/assets/icon/camera-icon.svg" alt="Upload" />
          </div>
        </div>

        {/* Username */}
        <div className="w-80">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 text-lg border rounded-lg text-center"
            placeholder="Username"
          />
        </div>

        {/* Email */}
        <div className="w-80">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 text-lg border rounded-lg text-center"
            placeholder="Email"
          />
        </div>

        {/* Password */}
        <div className="w-80">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 text-lg border rounded-lg text-center"
            placeholder="Password"
          />
        </div>

        {/* Confirm Password */}
        <div className="w-80">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 text-lg border rounded-lg text-center"
            placeholder="Confirm password"
          />
        </div>

        {/* Update Button */}
        <button className="w-80 p-4 text-lg bg-custom-blue  text-white rounded-lg">
          Update
        </button>
      </div>

      {/* Back Button */}
      <div className="absolute bottom-0 left-0 mb-4 ml-4">
        <ButtonIcon
          onClick={onClose}
          width={30}
          height={41}
          alt="rest-icon"
          src="/assets/icon/back.svg"
          className="bg-custom-light-yellow"
        />
      </div>
    </div>
  );
};

export default EditProfileWithPasswordPage;
