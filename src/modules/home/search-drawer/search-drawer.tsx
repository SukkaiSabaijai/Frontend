"use client";

import ButtonIcon from "@/shared/components/button/button-icon";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import React from "react";
import SearchInput from "./search-input";

type Props = {
  openDrawer: UseBooleanReturn;
};

const SearchDrawer = ({ openDrawer }: Props) => {
  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          height: "30%",
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
      <div className="flex flex-col">
        <SearchInput label="Search by location" onChange={(e)=>console.log(e.target.value)}/>
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
