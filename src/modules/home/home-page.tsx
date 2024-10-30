"use client";

import React, { useEffect, useState } from "react";
import HomeHeader from "./home-header";
import ButtonIcon from "@/shared/components/button/button-icon";
import HomeButton from "./home-button";
import dynamic from "next/dynamic";
import { useBoolean } from "@/shared/hooks/use-boolean";
// import SearchDrawer from "./search-drawer/search-drawer";
import L, { LatLng } from "leaflet";
import { getAllMarkers, test } from "./_services/home.service";
import CreateDrawer from "./create-drawer/create-drawer";
import SelectLocation from "./create-drawer/select-location";
import {
  AllMarkerResp,
  FilterRadiusLatlngType,
  MarkerType,
} from "./_types/home.type";
import HomeMap from "./home-map";
import SearchDrawer from "./search-drawer/search-drawer";

const HomePage = () => {
  const [allMarker, setAllMarker] = useState<AllMarkerResp[]>();
  const [mode, setMode] = useState<MarkerType>(MarkerType.Toilet);
  const openSearchDrawer = useBoolean(false);
  const openCreateDrawer = useBoolean(false);
  const selectLocation = useBoolean(false);
  const [searchBound, setSearchBound] = useState<L.LatLngBounds | null>(null);
  const [filterRadius, setFilterRadius] = useState<number | null>(null);
  const flyToCurrentLocation = useBoolean(false);

  const [location, setLocation] = useState<LatLng | null>(null);
  const [formValues, setFormValues] = useState({});

  const [filterRadiusLatlng, setFilterRadiusLatLng] =
    useState<FilterRadiusLatlngType>({
      min_lat: 0,
      max_lat: 0,
      min_lng: 0,
      max_lng: 0,
    });

  const fetchAllMarkerParams = {
    max_latitude: "20.4644",
    min_latitude: "5.6130",
    max_longitude: "105.6368",
    min_longitude: "97.3453",
    type: mode,
  };

  const fetchAllMarker = async () => {
    const getAll = await getAllMarkers(fetchAllMarkerParams);

    setAllMarker(getAll);
  };

  /** ******************
   * home button func
   ****************** */

  const handleClickSearch = () => {
    openSearchDrawer.onTrue();
  };

  const handleClickCreate = () => {
    openCreateDrawer.onTrue();
  };

  const handleClickCurrentLocation = () => {
    flyToCurrentLocation.onTrue();
  };

  const handleClickSelectMode = () => {
    if (mode == MarkerType.Toilet) {
      setMode(MarkerType.REST_AREA);
    } else {
      setMode(MarkerType.Toilet);
    }
  };

  //------------------------------------------

  const handleClickSelectLocation = () => {
    openCreateDrawer.onTrue();
  };

  const handleBackIconOnClick = () => {
    openCreateDrawer.onFalse();
    selectLocation.onFalse();
    setLocation(null);
  };

  const handleFilter = () => {};

  useEffect(() => {
    fetchAllMarker();
  }, [mode]);

  return (
    <>
      <HomeHeader mode={mode} />
      <HomeMap
        searchBound={searchBound}
        setLocation={setLocation}
        selectLocation={selectLocation.value}
        filterRadius={filterRadius}
        setFilterRadiusLatlng={setFilterRadiusLatLng}
        flyToCurrentLocation={flyToCurrentLocation}
        allMarker={allMarker}
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
            handleClickCurrentLocation={handleClickCurrentLocation}
            handleClickSelectMode={handleClickSelectMode}
            mode={mode}
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
        mode={mode}
      />
      <SearchDrawer
        openDrawer={openSearchDrawer}
        setSearchBound={setSearchBound}
        setRadius={setFilterRadius}
        filterRadiusLatlng={filterRadiusLatlng}
        mode={mode}
      />
    </>
  );
};

export default HomePage;
