"use client";

import ButtonIcon from "@/shared/components/button/button-icon";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import React, { Dispatch, SetStateAction, useState } from "react";
import SearchInput from "./search-input";
import HomeSearch from "../home-search";
import L from "leaflet";
import HomeFilter from "./home-filter";
import {
  FilterParam,
  FilterRadiusLatlngType,
  MarkerType,
} from "../_types/home.type";

type Props = {
  openDrawer: UseBooleanReturn;
  setSearchBound: Dispatch<SetStateAction<L.LatLngBounds | null>>;
  setRadius: Dispatch<SetStateAction<number | null>>;
  filterRadiusLatlng: FilterRadiusLatlngType;
  mode: MarkerType;
};

const SearchDrawer = ({
  openDrawer,
  setSearchBound,
  setRadius,
  filterRadiusLatlng,
  mode,
}: Props) => {
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [filterPrice, setFilterPrice] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState<number>(0);
  const handleSearchOnClick = () => {
    console.log("cate : ", filterCategory);
    console.log("price : ", filterPrice);
    console.log("rating : ", filterRating);
    console.log("radius : ", filterRadiusLatlng);
    if (
      filterCategory.length != 0 &&
      filterPrice != null &&
      filterRating != null
    ) {
    }
  };

  const handleBackButton = () => {
    /**
     * reset value เดะมาทพต่อ จะตายละ
     */
  };
  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          height: { xs: "55%", sm: "45%" }, // More height on extra small screens
          width: "100%",
          zIndex: "10",
          position: "fixed", // Keep Drawer fixed at the bottom
          bottom: 0, // Position it at the bottom
          borderRadius: "20px 20px 0 0",
          backgroundColor: "#DFECFF",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden", // Prevent overflow of content outside the Drawer
        },
      }}
      anchor="bottom"
      open={openDrawer.value}
    >
      <div className="flex-1 flex flex-col gap-6 overflow-auto z-20">
        <HomeSearch
          setSearchBound={setSearchBound}
          handleSearchOnClick={handleSearchOnClick}
        />
        <HomeFilter
          setRadius={setRadius}
          setFilterCategory={setFilterCategory}
          setFilterPrice={setFilterPrice}
          setFilterRating={setFilterRating}
          filterRating={filterRating}
          mode={mode}
        />
      </div>
      {/* Place ButtonIcon outside the flex container to align to the bottom */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "auto",
        }}
      >
        <ButtonIcon
          onClick={openDrawer.onFalse}
          width={30}
          height={41}
          alt="rest-icon"
          src="/assets/icon/back.svg"
          className="bg-custom-light-yellow"
        />
      </div>
    </Drawer>
  );
};

export default SearchDrawer;
