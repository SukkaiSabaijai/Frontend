'use client'

import React, { useEffect } from "react";
import Button from "@/shared/components/button/button";
import ButtonIcon from "@/shared/components/button/button-icon";
import { useBoolean } from "@/shared/hooks/use-boolean";
import SearchDrawer from "./search-drawer/search-drawer";

const HomeButton = () => {
  const openSearchDrawer = useBoolean(false);

  useEffect(()=>{
    console.log(openSearchDrawer.value)
  },[openSearchDrawer.value])
  return (
    <>
      <div
        className="bottom-0 right-0 absolute z-[1000] flex flex-col w-full p-8 gap-6"
        style={{ pointerEvents: "none" }}
      >
        <div className="flex gap-6 items-end justify-between w-full ">
          <ButtonIcon
            width={28}
            height={31}
            alt="profile-icon"
            src="/assets/icon/profile.svg"
          />

          <div className="flex flex-col gap-6">
            <ButtonIcon
              width={30}
              height={41}
              alt="rest-icon"
              src="/assets/icon/rest.svg"
            />
            <ButtonIcon
              width={30}
              height={41}
              alt="pin-icon"
              src="/assets/icon/pin.svg"
            />
          </div>
        </div>

        <Button className="rounded-xl w-full" onClick={openSearchDrawer.onTrue}>
          Search For Toilet
        </Button>
      </div>

      <SearchDrawer openDrawer={openSearchDrawer} />
    </>
  );
};

export default HomeButton;
