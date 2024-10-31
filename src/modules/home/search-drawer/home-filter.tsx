"use client";

import Button from "@/shared/components/button/button";
import Select from "@/shared/components/select/select";
import { TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaStar } from "react-icons/fa";
import { categoriesMap, MarkerType } from "../_types/home.type";

type Props = {
  setRadius: Dispatch<SetStateAction<number | null>>;
  setFilterCategory: Dispatch<SetStateAction<string[]>>;
  setFilterPrice: Dispatch<SetStateAction<string | null>>;
  setFilterRating: Dispatch<SetStateAction<number>>;
  filterRating: number;
  categoryList: string[];
  filterRadius: number | null;
  filterPrice: string | null;
  mode: MarkerType;
};

const HomeFilter = ({
  setRadius,
  setFilterCategory,
  setFilterPrice,
  setFilterRating,
  filterRating,
  categoryList,
  filterRadius,
  filterPrice,
  mode,
}: Props) => {
  const categories = categoriesMap[mode];
  const ratings = [1, 2, 3, 4, 5];
  const ranges = [
    { label: "within 1 km", value: 1000 },
    { label: "within 2 km", value: 2000 },
    { label: "within 5 km", value: 5000 },
  ];
  const style =
    mode == MarkerType.Toilet ? "bg-custom-blue" : "bg-custom-yellow";

  const handleRating = (value: number) => {
    setFilterRating((prevRating) => (prevRating === value ? 0 : value));
  };

  const handleRange = (value: number) => {
    setRadius((prevRadius) => (prevRadius === value ? null : value));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    // Only set the price if it's 0 or greater
    if (value >= 0 || e.target.value === "") {
      setFilterPrice(e.target.value);
    }
  };

  return (
    <div className={`w-full rounded-3xl flex text-white p-3 ${style}`}>
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
                mode={mode}
                categoryList={categoryList}
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
                    : mode === MarkerType.Toilet
                    ? "text-custom-light-yellow"
                    : "text-custom-blue"
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
                className={`text-sm py-1 px-5 bg-white text-black ${
                  filterRadius === range.value
                    ? mode === MarkerType.Toilet
                      ? "bg-custom-yellow hover:bg-custom-yellow"
                      : "bg-custom-blue hover:bg-custom-blue"
                    : mode === MarkerType.Toilet
                    ? "bg-custom-light-yellow hover:bg-custom-light-yellow"
                    : "bg-custom-light-blue hover:bg-custom-light-blue"
                }`}
                onClick={() => handleRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h1 className="text-xl font-bold">Filter by Price</h1>
          <TextField
            variant="standard"
            sx={{ width: "60%" }}
            value={filterPrice ? filterPrice : ""}
            type="number"
            onChange={handlePriceChange}
            inputProps={{ min: 0 }} // HTML5 validation to prevent negative input
          />
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;
