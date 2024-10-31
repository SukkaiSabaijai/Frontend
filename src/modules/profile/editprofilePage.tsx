"use client";

import React, { useState, useEffect } from "react";
import ButtonIcon from "@/shared/components/button/button-icon";
import Cookies from "js-cookie";
import { updateUserProfile, fetchUserProfile } from "./services/profile.service";
import { UpdateProfileData } from "./types/profilePage";

const EditProfilePage = ({ onClose }: { onClose: () => void }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setDob] = useState("");
  const [user_pic, setProfilePic] = useState("https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg");
  const [preview_pic, setPreviewPic] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchProfile()
  }, []);

  useEffect(() => {
    console.log(preview_pic);
  }, [preview_pic])

  useEffect(() => {
    console.log("user : ", user_pic);
  }, [user_pic])

  const fetchProfile = ()=>{
    const token = Cookies.get("accessToken");
    setIsLoggedIn(!!token);

    if (token) {
      fetchUserProfile()
        .then((profile) => {
          setUsername(profile.username);
          if(profile.user_pic){
            setProfilePic("http://localhost:5001/image/"+profile.user_pic);
          }

          setEmail(profile.email);
          setGender(profile.gender);
          setDob(profile.date_of_birth);
        })
        .catch((error) => console.error(error));
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // console.log('file : ', file)
      const previewUrl = URL.createObjectURL(file);
      // console.log('pre url : ', previewUrl)
      setPreviewPic(previewUrl);
    }
  };

  // const handleUpdate = async () => {
  //   // console.log('pre : ',preview_pic)
  //   const image = preview_pic || user_pic;
  //   console.log("Using image for update:", image);
  //   // console.log('image : ',image)
  //   const data: UpdateProfileData = {
  //     username,
  //     email,
  //     gender,
  //     date_of_birth,
  //     user_pic : image, 
  //   };
  //   try {
  //     console.log("Data to be sent:", data); 
  //     const response = await updateUserProfile(data);
  //     console.log("Profile updated successfully:", response);
  //   } catch (error) {
  //     console.error("Failed to update profile:", error);
  //   }
  // };
  const handleUpdate = async () => {
    const imageFile = preview_pic ? await fetch(preview_pic).then(r => r.blob()) : null;
  
    const formData = new FormData();
    formData.append("gender", gender);
    formData.append("date_of_birth", date_of_birth);
    if (imageFile) {
      formData.append("profile_pic", imageFile, "profile.jpg"); // ตั้งชื่อไฟล์ตามต้องการ
    } else {
      formData.append("profile_pic", user_pic); // หรือส่ง user_pic ที่มีอยู่แล้ว
    }
  
    try {
      const response = await updateUserProfile(formData);
      console.log("Profile updated successfully:", response);

      fetchProfile()
      setPreviewPic("")
    } catch (error) {
      console.error("Failed to update profile:", error);
    }

  };


  return (
    <div className="h-[100vh] w-full relative overflow-hidden">
      <div className="flex items-center justify-between bg-custom-light-green text-white w-full py-16 px-8 rounded-b-[15px]">
        <h1 className="text-4xl font-bold">Hello, {username}!</h1>
        <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
          <img src={user_pic} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mt-12">
        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden relative">
          <img
            src={preview_pic ? preview_pic : user_pic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <label className="absolute bottom-2 right-2 p-2 bg-white rounded-full cursor-pointer z-50">
            <img src="/assets/icon/camera.svg" alt="Upload" className="w-6 h-6" />
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
          </label>
        </div>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-80 p-4 text-lg border rounded-lg text-center"
          placeholder="Username"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-80 p-4 text-lg border rounded-lg text-center"
          placeholder="Email"
        />

        <div className="w-80 flex gap-4">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-4 text-lg border rounded-lg text-center appearance-none bg-white cursor-pointer"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="date"
            value={date_of_birth}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />
        </div>

        <button className="w-80 p-4 text-lg bg-custom-light-green text-white rounded-lg" onClick={handleUpdate}>
          Update
        </button>

        <button className="w-80 p-4 text-lg bg-red-400 text-white rounded-lg">
          Delete Account
        </button>
      </div>

      <div className="absolute bottom-0 left-0 mb-4 ml-4">
        <ButtonIcon onClick={onClose} width={30} height={41} alt="rest-icon" src="/assets/icon/back.svg" className="bg-custom-light-yellow" />
      </div>
    </div>
  );
};

export default EditProfilePage;
