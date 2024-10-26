"use client";

import React, { useState } from "react";
// import { useRouter } from "next/router"; 
import ButtonIcon from "@/shared/components/button/button-icon";

const EditProfilePage = ({ onClose }: { onClose: () => void }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");

  // const router = useRouter() 

  // if (!router) {
  //   return null; 
  // }

  
  const handleDobBlur = () => {
    const dobPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/; 
    if (!dobPattern.test(dob)) {
      setDobError("Please enter a valid date in the format dd/mm/yy.");
    } else {
      setDobError("");
    }
  };

  // const handleChangePasswordClick = () => {
  //   router.push("/modules/change-password"); 
  // };

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

        {/* Gender and DOB */}
        <div className="w-80 flex gap-4">
          <div className="w-1/2">
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-4 text-lg border rounded-lg text-center appearance-none bg-white cursor-pointer"
                style={{
                  background: 'url(/assets/icon/arrow-down-icon.svg) no-repeat right 1rem center',
                  backgroundSize: '1.5rem',
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
              </select>
            </div>
          </div>

          {/* DOB with validation */}
          <div className="w-1/2">
            <input
              type="text"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              onBlur={handleDobBlur}
              className={`w-full p-4 text-lg border rounded-lg text-center ${dobError ? 'border-red-500' : ''}`}
              placeholder="DD/MM/YY"
            />
            {dobError && (
              <p className="text-red-500 text-sm mt-1">{dobError}</p>
            )}
          </div>
        </div>

        {/* Change Password */}
        <div
          className="text-gray-500 underline cursor-pointer"
          // onClick={handleChangePasswordClick} 
        >
          Change Password?
        </div>

        {/* Update Button */}
        <button className="w-80 p-4 text-lg bg-custom-blue text-white rounded-lg">
          Update
        </button>

        {/* Delete Account Button */}
        <button className="w-80 p-4 text-lg bg-red-400 text-white rounded-lg">
          Delete Account
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

export default EditProfilePage;
