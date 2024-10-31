"use client";

import { cn } from "@/lib/utils";
import { MarkerType } from "@/modules/home/_types/home.type";
import { useBoolean } from "@/shared/hooks/use-boolean";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  label: string;
  setCategoryList: Dispatch<SetStateAction<string[]>>;
  className?: string;
  mode?: MarkerType;
};

const Select = ({ label, setCategoryList, className, mode }: Props) => {
  const isSelect = useBoolean(false);
  
  // Define background color based on mode
  const bgColor =
    mode === MarkerType.Toilet
      ? isSelect.value
        ? "bg-custom-light-yellow"
        : "bg-custom-light-blue"
      : isSelect.value
      ? "bg-custom-light-blue"
      : "bg-custom-light-yellow";

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
    <div
      className={cn(
        "flex gap-2 text-white justify-center items-center",
        className
      )}
    >
      <p>{label}</p>
      <div
        className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${bgColor}`}
        onClick={handleOnClick}
        aria-pressed={isSelect.value}
        role="button"
      >
        <div
          className={`w-4 h-4 rounded-full transition-transform duration-300 ${
            isSelect.value ? "translate-x-5" : "translate-x-0"
          } ${mode === MarkerType.Toilet ? "bg-custom-yellow" : "bg-custom-yellow"}`}
        ></div>
      </div>
    </div>
  );
};

export default Select;
