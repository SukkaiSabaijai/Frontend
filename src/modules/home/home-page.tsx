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
import { FilterRadiusLatlngType } from "./_types/home.type";
import HomeMap from "./home-map";
import SearchDrawer from "./search-drawer/search-drawer";
// import { test } from "./_services/home.service";
import ProfileDrawer from "../profile/profilePage"

const HomePage = () => {
  const openSearchDrawer = useBoolean(false);
  const openProfileDrawer = useBoolean(false);
  const openCreateDrawer = useBoolean(false);
  const selectLocation = useBoolean(false);
  const [searchBound, setSearchBound] = useState<L.LatLngBounds | null>(null);
  const [filterRadius, setFilterRadius] = useState<number | null>(null);
  const flyToCurrentLocation = useBoolean(false)

  const [location, setLocation] = useState<LatLng | null>(null);
  const [formValues, setFormValues] = useState({});

  const [filterRadiusLatlng, setFilterRadiusLatLng] =
    useState<FilterRadiusLatlngType>({
      min_lat: 0,
      max_lat: 0,
      min_lng: 0,
      max_lng: 0,
    });

    /** ******************
     * home button func
     ****************** */

  const handleClickSearch = () => {
    openSearchDrawer.onTrue();
  };

  const HandleProfileDrawer = () => {
    openProfileDrawer.onTrue();
  }

  const handleClickCreate = () => {
    openCreateDrawer.onTrue();
  };

  const handleClickCurrentLocation = () => {
    flyToCurrentLocation.onTrue()
  }

  //------------------------------------------

  const handleClickSelectLocation = () => {
    openCreateDrawer.onTrue();
  };


  const handleBackIconOnClick = () => {
    openCreateDrawer.onFalse();
    openProfileDrawer.onFalse();
    selectLocation.onFalse();
    setLocation(null);
  };

  const handleFilter = () => {

  }

  useEffect(()=>{
    // console.log(filterRadiusLatlng)
    test();
  },[])

  return (
    <>
      <HomeHeader />
      <HomeMap
        searchBound={searchBound}
        setLocation={setLocation}
        selectLocation={selectLocation.value}
        filterRadius={filterRadius}
        setFilterRadiusLatlng={setFilterRadiusLatLng}
        flyToCurrentLocation={flyToCurrentLocation}
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
            handleClickProfile={HandleProfileDrawer}
            handleClickCreate={handleClickCreate}
            handleClickCurrentLocation={handleClickCurrentLocation}
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
        setRadius={setFilterRadius}
      />
      <ProfileDrawer
        openDrawer={openProfileDrawer}
        handleBackIconOnClick={handleBackIconOnClick}
      />
    </>
  );
};

export default HomePage;
