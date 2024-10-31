"use client";

import React, { useState, useEffect } from "react";
import ButtonIcon from "@/shared/components/button/button-icon";
import Cookies from "js-cookie";
import { updateUserProfile, fetchUserProfile, updateUserPassword } from "./services/profile.service";
import { UpdateProfileData, UpdatePasswordData } from "./types/profilePage";
import { enqueueSnackbar } from "notistack";
import {useRouter} from "next/navigation";

const EditProfileWithPasswordPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState("https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleBackIcon = () => {
    router.push("/user");
  };

  useEffect(() => {
    fetchProfile()
  }, []);

  const fetchProfile = () => {
    const token = Cookies.get("accessToken");
    setIsLoggedIn(!!token);

    if (token) {
      fetchUserProfile()
        .then((profile) => {
          setUsername(profile.username);
          if(profile.user_pic){
            setProfileImage("https://api.toiletnearme.org/image/"+profile.user_pic);
            
          }

        })
        .catch((error) => console.error(error));
    }
  }

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("FNew password and confirm password do not match.", {
        variant: "error",
        autoHideDuration: 3000
      });
      return;
    }

    const passwordData: UpdatePasswordData = {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    try {
      const response = await updateUserPassword(passwordData);
      enqueueSnackbar("Password updated successfully.", {
        variant: "success",
        autoHideDuration: 3000
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to update password.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="h-[100vh] w-full relative overflow-hidden">
      <div className="flex items-center justify-between bg-custom-light-green text-white w-full py-16 px-8 rounded-b-[15px]">
        <h1 className="text-4xl font-bold">Hello, {username}!</h1>
        <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mt-12">
        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden relative ">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-80">
          <input
            type="text"
            readOnly
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 text-lg border rounded-lg text-center"
            placeholder="Username"
          />
        </div>

        <div className="w-80">
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-4 text-lg border rounded-lg text-center"
            placeholder="Old Password"
          />
        </div>

        <div className="w-80">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-4 text-lg border rounded-lg text-center"
            placeholder="New Password"
          />
        </div>

        <div className="w-80">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 text-lg border rounded-lg text-center"
            placeholder="Confirm Password"
          />
        </div>

        <button
          className="w-80 p-4 text-lg bg-custom-light-green text-white rounded-lg"
          onClick={handlePasswordUpdate}
        >
          Update
        </button>
      </div>

      <div className="absolute bottom-16 left-0 mb-4 ml-4">
        <ButtonIcon
          onClick={handleBackIcon}
          width={30}
          height={41}
          alt="rest-icon"
          src="/assets/icon/back-icon-yellow.svg"
          className="bg-custom-light-green"
        />
      </div>
    </div>
  );
};

export default EditProfileWithPasswordPage;
