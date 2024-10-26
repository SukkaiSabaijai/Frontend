"use client";

import React, { useState } from "react";
import ButtonIcon from "@/shared/components/button/button-icon";

const ProfilePage = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const menuItems = [
    { name: "Profile" },
    { name: "History" },
    { name: "Bookmark" },
    { name: "Log out" },
  ];

  const historyItems = [
    { name: "view" },
    { name: "like" },
    { name: "add" },
    { name: "review" },
  ];

  return (
    <div className="h-[100vh] w-full relative overflow-hidden"> 
      <div className="flex items-center justify-between bg-custom-blue text-white w-full py-16 px-8 rounded-b-[15px]">
        <h1 className="text-4xl font-bold">Hello, Sam</h1>

        <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
          <img
            src="https://avatarfiles.alphacoders.com/210/210992.jpg"
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
                  activeTab === item.name
                    ? "bg-custom-blue text-white"
                    : item.name === "Log out"
                    ? "text-[#E55E5E]"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  if (item.name === "History") {
                    setIsHistoryOpen(!isHistoryOpen);
                  } else {
                    setActiveTab(item.name);
                    setIsHistoryOpen(false); 
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

      <div className="absolute bottom-32 left-4">
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

export default ProfilePage;
