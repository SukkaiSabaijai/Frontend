"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Select from "../select/select";
import { categoriesMap, MarkerType } from "@/modules/home/_types/home.type";
import CreateSelect from "../select/select-create";

type Props = {
  name: string;
  mode: MarkerType;
  //   label: string;
};

const RHFSelect = ({ name, mode }: Props) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const categories = categoriesMap[mode];
  const title =
    mode == MarkerType.Toilet ? "หมวดหมู่ห้องสุขา" : "หมวดหมู่จุดนั่งพัก";

  useEffect(() => {
    console.log("cate : ", categoryList);
    setValue("category", categoryList);
  }, [categoryList]);

  return (
    <div className="flex flex-col">
      <h1 className="text-[14px] font-semibold mb-2">{title}</h1>
      <div
        className={`w-full h-14 ${
          mode == MarkerType.Toilet ? "bg-custom-blue" : "bg-custom-yellow"
        } flex justify-center items-center rounded-3xl gap-6`}
      >
        {categories.map((category, index) => (
          <CreateSelect
            key={index}
            label={category}
            setCategoryList={setCategoryList}
            mode={mode}
          />
        ))}
      </div>
      {errors["category"] && (
        <p className="mt-2 text-[12px] text-red-500">
          {errors["category"]?.message as string}
        </p>
      )}
    </div>
  );
};

export default RHFSelect;
