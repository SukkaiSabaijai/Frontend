"use client";

import { cn } from "@/lib/utils";
import { MarkerType } from "@/modules/home/_types/home.type";
import React, { Dispatch, SetStateAction, useMemo } from "react";

type Props = {
  label: string;
  setCategoryList: Dispatch<SetStateAction<string[]>>;
  className?: string;
  mode?: MarkerType;
  categoryList: string[];
};

const Select = ({
  label,
  setCategoryList,
  className,
  mode,
  categoryList,
}: Props) => {
  const isSelected = useMemo(
    () => categoryList.includes(label),
    [categoryList, label]
  );

  const handleOnClick = () => {
    setCategoryList((prevList) => {
      if (isSelected) {
        return prevList.filter((item) => item !== label);
      } else {
        return [...prevList, label];
      }
    });
  };

  return (
    <div
      className={cn(
        "flex gap-2 text-white justify-center items-center cursor-pointer transition-transform duration-200 ease-in-out",
        className
      )}
      role="button"
      tabIndex={0}
      onClick={handleOnClick}
      onKeyPress={(e) => e.key === 'Enter' && handleOnClick()}
      aria-pressed={isSelected}
      aria-label={`Select ${label}`}
    >
      <p>{label}</p>
      <div
        className={`w-10 h-5 rounded-full flex items-center px-1 transition-all duration-200 ${
          mode === MarkerType.Toilet
            ? isSelected
              ? "bg-custom-light-yellow justify-end"
              : "bg-custom-light-blue"
            : isSelected
            ? "bg-custom-light-blue justify-end"
            : "bg-custom-light-yellow"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full transition-colors duration-200 ${
            mode === MarkerType.Toilet
              ? isSelected
                ? "bg-custom-yellow"
                : "bg-custom-blue"
              : isSelected
              ? "bg-custom-blue"
              : "bg-custom-yellow"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Select;
