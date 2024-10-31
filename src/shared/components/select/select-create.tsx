"use client";

import { cn } from "@/lib/utils";
import { MarkerType } from "@/modules/home/_types/home.type";
import { useBoolean } from "@/shared/hooks/use-boolean";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";

type Props = {
  label: string;
  setCategoryList: Dispatch<SetStateAction<string[]>>;
  className?: string;
  mode?: MarkerType;
};

const CreateSelect = ({ label, setCategoryList, className, mode }: Props) => {
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
    <div
      className={cn(
        "flex gap-2 text-white justify-center items-center",
        className
      )}
    >
      <p>{label}</p>
      <div
        className={`w-10 h-5 rounded-full flex items-center px-1 ${
          mode == MarkerType.Toilet
            ? isSelect.value
              ? "bg-custom-light-yellow justify-end"
              : "bg-custom-light-blue"
            : isSelect.value
            ? "bg-custom-light-blue justify-end"
            : "bg-custom-light-yellow"
        }`}
        onClick={handleOnClick}
      >
        <div
          className={`w-4 h-4 rounded-full ${
            mode == MarkerType.Toilet
              ? isSelect.value
                ? "bg-custom-yellow"
                : "bg-custom-blue"
              : isSelect.value
              ? "bg-custom-blue"
              : "bg-custom-yellow"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default CreateSelect;
