"use client";

import ButtonIcon from "@/shared/components/button/button-icon";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import React, { Dispatch, SetStateAction } from "react";
import SearchInput from "./search-input";
import HomeSearch from "../home-search";
import L from "leaflet";
import HomeFilter from "./home-filter";


type Props = {
  openDrawer: UseBooleanReturn;
  setSearchBound: Dispatch<SetStateAction<L.LatLngBounds | null>>;
  setRadius:Dispatch<SetStateAction<number | null>>
};

const SearchDrawer = ({ openDrawer, setSearchBound,setRadius }: Props) => {
  const handleSearchOnClick = ()=>{
    
  }
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
        <HomeSearch setSearchBound={setSearchBound} />
        <HomeFilter setRadius={setRadius}/>
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
