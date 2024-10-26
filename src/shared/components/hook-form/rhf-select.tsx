"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Select from "../select/select";

type Props = {
  name: string;
  //   label: string;
};

const RHFSelect = ({ name }: Props) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const [categoryList, setCategoryList] = useState<string[]>([]);

  useEffect(() => {
    console.log("cate : ", categoryList);
    setValue("category", categoryList);
  }, [categoryList]);

  return (
    <div className="flex flex-col">
      <h1 className="text-[14px] font-semibold mb-2">หมวดหมู่ห้องสุขา</h1>
      <div className="w-full h-14 bg-custom-blue flex justify-center items-center rounded-3xl gap-6">
        <Select label="disable" setCategoryList={setCategoryList} />
        <Select label="flush" setCategoryList={setCategoryList} />
        <Select label="hose" setCategoryList={setCategoryList} />
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
