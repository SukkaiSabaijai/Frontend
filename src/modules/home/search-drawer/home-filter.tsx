"use client";

import Button from "@/shared/components/button/button";
import Select from "@/shared/components/select/select";
import { TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaStar } from "react-icons/fa";

type Props = {
  setRadius: Dispatch<SetStateAction<number | null>>;
};

const HomeFilter = ({ setRadius }: Props) => {
  const categories = ["disable", "flush", "hose"];
  const ratings = [1, 2, 3, 4, 5];
  const ranges = [
    { label: "within 1 km", value: 1000 },
    { label: "within 2 km", value: 2000 },
    { label: "within 5 km", value: 5000 },
  ];
  const [range, setRange] = useState<number>();

  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [filterPrice, setFilterPrice] = useState<number>();
  const [filterRating, setFilterRating] = useState<number>(0);

  const handleRating = (value: number) => {
    setFilterRating(value);
  };

  const handleRange = (value: number) => {
    setRadius(value);
  };

  return (
    <div className="w-full bg-custom-blue rounded-3xl flex text-white p-3">
      <div className="w-[55%] flex flex-col gap-4">
        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-xl font-bold">Filter by Category</h1>
          <div className="flex flex-col w-2/3 gap-3">
            {categories.map((type, index) => (
              <Select
                key={index}
                setCategoryList={setFilterCategory}
                label={type}
                className="justify-between"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold">Filter by Rating</h1>
          <div className="flex gap-1">
            {ratings.map((value, index) => (
              <FaStar
                key={index}
                className={`${
                  value > filterRating
                    ? "text-white"
                    : "text-custom-light-yellow"
                }`}
                onClick={() => handleRating(value)}
                size={21}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="h-full w-[1px] bg-white"></div>

      <div className="w-1/2 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold">Filter by Range</h1>
          <div className="flex flex-col gap-2">
            {ranges.map((range, index) => (
              <Button
                key={index}
                className="text-sm py-1 px-5 bg-white text-black hover:bg-custom-light-yellow"
                onClick={() => handleRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h1 className="text-xl font-bold">Filter by Price</h1>
          <TextField variant="standard" sx={{width:"60%"}} type="number"/>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;
