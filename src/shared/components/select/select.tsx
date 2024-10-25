"use client";

import { cn } from "@/lib/utils";
import { useBoolean } from "@/shared/hooks/use-boolean";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  label: string;
  setCategoryList: Dispatch<SetStateAction<string[]>>;
};

const Select = ({ label, setCategoryList }: Props) => {
  const isSelect = useBoolean(false);
  const handleOnClick = () => {
    setCategoryList((prevList) => {
      if (isSelect.value) {
        return prevList.filter((item) => item !== label);
      } else {
        return [...prevList, label];
      }
    });
    isSelect.onToggle();
  };
  return (
    <div className="flex gap-2 text-white justify-center items-center">
      <p>{label}</p>
      <div
        className={`w-10 h-5 bg-custom-light-blue rounded-full flex items-center px-1 ${
          isSelect.value ? "bg-custom-light-yellow justify-end" : ""
        }`}
        onClick={handleOnClick}
      >
        <div
          className={`w-4 h-4 rounded-full ${
            isSelect.value ? "bg-custom-yellow" : "bg-custom-blue"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Select;
