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
  setFilterCategory:Dispatch<SetStateAction<string[]>>
  setFilterPrice:Dispatch<SetStateAction<string|null>>
  setFilterRating:Dispatch<SetStateAction<number>>
  filterRadiusLatlng: FilterRadiusLatlngType;
  filterRating:number
  filterRadius:number | null
  mode: MarkerType;
  handleSearchOnClick:()=>void
  categoryList:string[]
  filterPrice:string | null
};

const SearchDrawer = ({
  openDrawer,
  setSearchBound,
  setRadius,
  filterRadiusLatlng,
  setFilterCategory,
  setFilterPrice,
  setFilterRating,
  filterRating,
  filterRadius,
  mode,
  categoryList,
  handleSearchOnClick,
  filterPrice
}: Props) => {
  // const [filterCategory, setFilterCategory] = useState<string[]>([]);
  // const [filterPrice, setFilterPrice] = useState<string | null>(null);
  // const [filterRating, setFilterRating] = useState<number>(0);


  const handleBackButton = () => {
    /**
     * reset value เดะมาทพต่อ จะตายละ
     */
  };
  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          height: "45%",
          width: "100%",
          zIndex: "1500",
          position: "fixed",
          borderRadius: "20px 20px 0 0",
          backgroundColor: "#DFECFF",
          padding: "20px",
        },
      }}
      anchor="bottom"
      open={openDrawer.value}
    >
      <div className="flex flex-col gap-6">
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
          categoryList={categoryList}
          filterRadius={filterRadius}
          filterPrice={filterPrice}
        />
        <ButtonIcon
          onClick={openDrawer.onFalse}
          width={30}
          height={41}
          alt="rest-icon"
          src="/assets/icon/back.svg"
          className="bg-custom-light-yellow"
        ></ButtonIcon>
      </div>
    </Drawer>
  );
};

export default SearchDrawer;
