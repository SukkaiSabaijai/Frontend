"use client";

import React, { useEffect } from "react";
import Button from "@/shared/components/button/button";
import ButtonIcon from "@/shared/components/button/button-icon";
import { useBoolean } from "@/shared/hooks/use-boolean";
import SearchDrawer from "./search-drawer/search-drawer";
import { MarkerType } from "./_types/home.type";

type Props = {
  handleClickSearch: () => void;
  handleClickCreate: () => void;
  handleClickSelectMode: () => void;
  handleClickCurrentLocation: () => void;
  mode: MarkerType;
};

const HomeButton = ({
  handleClickSearch,
  handleClickCreate,
  handleClickSelectMode,
  handleClickCurrentLocation,
  mode,
}: Props) => {
  const openSearchDrawer = useBoolean(false);
  const modeSrc =
    mode == MarkerType.Toilet
      ? "/assets/icon/rest.svg"
      : "/assets/icon/back-to-toilet.svg";
  const createMarkerSrc =
    mode == MarkerType.Toilet
      ? "/assets/icon/create-marker.svg"
      : "/assets/icon/create-marker-yellow.svg";
  const userLocationSrc =
    mode == MarkerType.Toilet
      ? "/assets/icon/pin.svg"
      : "/assets/icon/pin-yellow.svg";
  const profileSrc =
    mode == MarkerType.Toilet
      ? "/assets/icon/profile.svg"
      : "/assets/icon/profile-yellow.svg";

  const searchTitle =
    mode == MarkerType.Toilet ? "Search For Toilet" : "Search For Seat";

  useEffect(() => {
    console.log(openSearchDrawer.value);
  }, [openSearchDrawer.value]);
  return (
    <>
      <div
        className="bottom-0 right-0 absolute z-[1000] flex flex-col w-full p-8 gap-6"
        style={{ pointerEvents: "none" }}
      >
        <div className="flex gap-6 items-end justify-between w-full">
          <ButtonIcon
            width={28}
            height={31}
            alt="profile-icon"
            src={profileSrc}
            mode={mode}
          />

          <div className="flex flex-col gap-6">
            <ButtonIcon
              width={30}
              height={41}
              alt="rest-icon"
              src={modeSrc}
              mode={mode}
              onClick={handleClickSelectMode}
            />
            <ButtonIcon
              width={41}
              height={41}
              alt="create-icon"
              src={createMarkerSrc}
              mode={mode}
              onClick={handleClickCreate}
            />
            <ButtonIcon
              width={30}
              height={41}
              alt="pin-icon"
              src={userLocationSrc}
              mode={mode}
              onClick={handleClickCurrentLocation}
            />
          </div>
        </div>

        <Button
          className={`rounded-xl w-full ${
            mode == MarkerType.REST_AREA && "bg-custom-yellow"
          }`}
          onClick={handleClickSearch}
        >
          {searchTitle}
        </Button>
      </div>
    </>
  );
};

export default HomeButton;
