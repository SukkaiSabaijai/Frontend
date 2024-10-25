"use client";

import React, { useEffect, useState } from "react";
import HomeHeader from "./home-header";
import ButtonIcon from "@/shared/components/button/button-icon";
import HomeButton from "./home-button";
import dynamic from "next/dynamic";
import { useBoolean } from "@/shared/hooks/use-boolean";
// import SearchDrawer from "./search-drawer/search-drawer";
import L, { LatLng } from "leaflet";
import { test } from "./_services/home.service";
import CreateDrawer from "./create-drawer/create-drawer";
import SelectLocation from "./create-drawer/select-location";
// import { test } from "./_services/home.service";

const HomeMap = dynamic(() => import("./home-map"), {
  ssr: false,
});

const SearchDrawer = dynamic(() => import("./search-drawer/search-drawer"), {
  ssr: false,
});

const HomePage = () => {
  const openSearchDrawer = useBoolean(false);
  const openCreateDrawer = useBoolean(false);
  const selectLocation = useBoolean(false);
  const [searchBound, setSearchBound] = useState<L.LatLngBounds | null>(null);
  const [location, setLocation] = useState<LatLng | null>(null);
  const [formValues, setFormValues] = useState({});

  const handleClickSearch = () => {
    openSearchDrawer.onTrue();
  };

  const handleClickCreate = () => {
    openCreateDrawer.onTrue();
  };

  const handleClickSelectLocation = () => {
    openCreateDrawer.onTrue();
  };

  const handleBackIconOnClick = () => {
    openCreateDrawer.onFalse();
    selectLocation.onFalse();
    setLocation(null);
  };

  return (
    <>
      <HomeHeader />
      <HomeMap
        searchBound={searchBound}
        setLocation={setLocation}
        selectLocation={selectLocation.value}
      />
      {selectLocation.value ? (
        <>
          <SelectLocation
            location={location}
            handleClickSelectLocation={handleClickSelectLocation}
          />
        </>
      ) : (
        <>
          <HomeButton
            handleClickSearch={handleClickSearch}
            handleClickCreate={handleClickCreate}
          />
        </>
      )}
      <CreateDrawer
        openDrawer={openCreateDrawer}
        handleBackIconOnClick={handleBackIconOnClick}
        selectLocation={selectLocation}
        location={location}
        formValues={formValues}
        setFormValues={setFormValues}
      />
      <SearchDrawer
        openDrawer={openSearchDrawer}
        setSearchBound={setSearchBound}
      />
    </>
  );
};

export default HomePage;
