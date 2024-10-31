"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import Cookies from "js-cookie";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import ButtonIcon from "@/shared/components/button/button-icon";
import { logoutUser } from "../login/services/login.service";
import { fetchUserProfile } from "./services/profile.service";
import { MarkerType } from "../home/_types/home.type";
import { getAccessToken } from "@/lib/getAccessToken";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";

type Props = {
  openDrawer: UseBooleanReturn;
  handleBackIconOnClick: () => void;
  mode: MarkerType;
};

const ProfileDrawer = ({ openDrawer, handleBackIconOnClick, mode }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Profile");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState("Guest"); 
  const [profilePicture, setProfilePic] = useState("https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg")

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!token);

    if (token) {
      fetchUserProfile()
        .then((profile) => {
          setUsername(profile.username);
          if (profile.user_pic) {
            setProfilePic("https://api.toiletnearme.org/image/" + profile.user_pic);
          }
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const handleProfileOnClick = () => {
    if (isLoggedIn) {
      console.log("hi");
      router.replace("/user");
    } else {
      console.log("no");
      enqueueSnackbar("กรุณาเข้าสู่ระบบ", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "left" },
        action: notiStackAction,
      });
    }
  };
  const handleHistoryOnClick = () => {
    if (isLoggedIn) {
      console.log("hi");
      router.replace("/user");
    } else {
      console.log("no");
      enqueueSnackbar("กรุณาเข้าสู่ระบบ", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "left" },
        action: notiStackAction,
      });
    }
  };
  const handleBookmarkOnClick = () => {
    if (isLoggedIn) {
      router.replace("/bookmark");
    } else {
      enqueueSnackbar("กรุณาเข้าสู่ระบบ", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "left" },
        action: notiStackAction,
      });
    }
  };

  const notiStackAction = (key: SnackbarKey) => (
    <button onClick={() => notiStackOnClick(key)}>ไปหน้า login</button>
  );
  const notiStackOnClick = (key: SnackbarKey) => {
    router.replace("/login");
    closeSnackbar(key);
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  const menuItems = [
    { name: "Profile" },
    { name: "History" },
    { name: "Bookmark" },
    isLoggedIn ? { name: "Log out" } : { name: "Sign In / Sign Up" },
  ];

  const historyItems = [{ name: "add" }, { name: "review" }];

  const bgDrawer =
    mode == MarkerType.Toilet ? "bg-custom-blue" : "bg-custom-yellow";

  return (
    <Drawer
      open={openDrawer.value}
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          height: "100%",
          width: "100%",
          zIndex: 1500,
          position: "fixed",
          backgroundColor: bgDrawer,
          overflowY: "auto",
        },
      }}
    >
      <div className="h-full w-full relative overflow-hidden">
        <div
          className={`flex items-center justify-between ${bgDrawer} text-white w-full py-16 px-8 rounded-b-[15px]`}
        >
          <h1 className="text-4xl font-bold">Hello, {username}</h1>
          <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex w-full bg-gray-100 h-[calc(100%-8rem)] shadow-md">
          <ul className="flex flex-col p-4 gap-4 w-full">
            {menuItems.map((item) => (
              <React.Fragment key={item.name}>
                <li
                  className={`p-4 text-xl font-semibold cursor-pointer text-center ${
                    activeTab === item.name ||
                    (item.name === "History" && isHistoryOpen)
                      ? `${bgDrawer} text-white`
                      : item.name === "Log out" ||
                        item.name === "Sign In / Sign Up"
                      ? "text-[#E55E5E]"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    if (item.name === "Profile") {
                      handleProfileOnClick();
                    } else if (item.name === "History") {
                      setIsHistoryOpen(!isHistoryOpen);
                      setActiveTab("History");
                    } else if (item.name === "Log out") {
                      handleLogout();
                    } else if (item.name === "Sign In / Sign Up") {
                      router.push("/login");
                    } else if (item.name == "Bookmark") {
                      handleBookmarkOnClick();
                    }
                  }}
                >
                  {item.name}
                </li>

                {item.name === "History" && isHistoryOpen && (
                  <ul className="pl-8">
                    {historyItems.map((subItem) => (
                      <li
                        key={subItem.name}
                        className="p-2 text-lg text-gray-500 cursor-pointer hover:bg-gray-200 rounded"
                        onClick={() => setActiveTab(subItem.name)}
                      >
                        - {subItem.name}
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
        
        <div className="absolute bottom-16 left-0 mb-4 ml-4">
          <ButtonIcon
            type="button"
            onClick={handleBackIconOnClick}
            width={30}
            height={41}
            alt="rest-icon"
            mode={mode}
            src={mode == MarkerType.Toilet ? "/assets/icon/back-to-toilet-real.svg"  :"/assets/icon/back.svg"}
          ></ButtonIcon>
        </div>
      </div>
    </Drawer>
  );
};

export default ProfileDrawer;
