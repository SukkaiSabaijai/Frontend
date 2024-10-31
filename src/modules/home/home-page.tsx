"use client";

import React, { useEffect, useState } from "react";
import HomeHeader from "./home-header";
import ButtonIcon from "@/shared/components/button/button-icon";
import HomeButton from "./home-button";
import dynamic from "next/dynamic";
import { useBoolean } from "@/shared/hooks/use-boolean";
// import SearchDrawer from "./search-drawer/search-drawer";
import L, { LatLng } from "leaflet";
import { getAllMarkers, getFilterMarker, test } from "./_services/home.service";
import CreateDrawer from "./create-drawer/create-drawer";
import SelectLocation from "./create-drawer/select-location";
import {
  AllMarkerResp,
  AllMarkerType,
  FilterParam,
  FilterRadiusLatlngType,
  MarkerType,
} from "./_types/home.type";
import HomeMap from "./home-map";
import SearchDrawer from "./search-drawer/search-drawer";
import { getAccessToken } from "@/lib/getAccessToken";
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";
import { useRouter } from "next/navigation";
// import { test } from "./_services/home.service";
import ProfileDrawer from "../profile/profilePage";
import { checkAuthen } from "../../shared/utils/auth";

const HomePage = () => {
  const router = useRouter();
  const [allMarker, setAllMarker] = useState<AllMarkerResp[]>();
  const [mode, setMode] = useState<MarkerType>(MarkerType.Toilet);
  const openSearchDrawer = useBoolean(false);
  const openProfileDrawer = useBoolean(false);
  const openCreateDrawer = useBoolean(false);
  const selectLocation = useBoolean(false);
  const [searchBound, setSearchBound] = useState<L.LatLngBounds | null>(null);

  const [filterRadius, setFilterRadius] = useState<number | null>(null);
  const flyToCurrentLocation = useBoolean(false);

  const [location, setLocation] = useState<LatLng | null>(null);
  const [formValues, setFormValues] = useState({});

  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [filterPrice, setFilterPrice] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState<number>(0);
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
    console.log(fetchAllMarkerParams);
    const getAll = await getAllMarkers(fetchAllMarkerParams);

    setAllMarker(getAll);
  };

  const fetchMarkerFilter = async () => {
    const fetchAllMarkeFilterParams: FilterParam = {
      max_latitude: "20.4644",
      min_latitude: "5.6130",
      max_longitude: "105.6368",
      min_longitude: "97.3453",
      type: mode,
    };

    if (filterRadius) {
      fetchAllMarkeFilterParams.max_latitude = String(
        filterRadiusLatlng.max_lat
      );
      fetchAllMarkeFilterParams.min_latitude = String(
        filterRadiusLatlng.min_lat
      );
      fetchAllMarkeFilterParams.max_longitude = String(
        filterRadiusLatlng.max_lng
      );
      fetchAllMarkeFilterParams.min_longitude = String(
        filterRadiusLatlng.min_lng
      );
    }

    if (mode == MarkerType.REST_AREA) {
      if (filterCategory.includes("charger"))
        fetchAllMarkeFilterParams.charger = true;
      if (filterCategory.includes("wifi"))
        fetchAllMarkeFilterParams.wifi = true;
      if (filterCategory.includes("table"))
        fetchAllMarkeFilterParams.table = true;
    } else if (mode == MarkerType.Toilet) {
      if (filterCategory.includes("disable"))
        fetchAllMarkeFilterParams.disable = true;
      if (filterCategory.includes("hose"))
        fetchAllMarkeFilterParams.hose = true;
      if (filterCategory.includes("flush"))
        fetchAllMarkeFilterParams.flush = true;
    }

    if (filterPrice) {
      console.log("hi");
      fetchAllMarkeFilterParams.price = Number(filterPrice);
    }

    if (filterRating != 0) {
      fetchAllMarkeFilterParams.rating = filterRating;
    }
    console.log("filter : ", fetchAllMarkeFilterParams);

    const markerFilter = await getFilterMarker(fetchAllMarkeFilterParams);

    setAllMarker(markerFilter);
  };

  const handleSearchOnClick = () => {
    fetchMarkerFilter();
    openSearchDrawer.onFalse();
  };

  /** ******************
   * home button func
   ****************** */

  const handleClickSearch = () => {
    openSearchDrawer.onTrue();
  };

  const HandleProfileDrawer = () => {
    openProfileDrawer.onTrue();
  };

  const handleClickCreate = async () => {
    const isAuthen = await checkAuthen()
    if (isAuthen) {
      openCreateDrawer.onTrue();
    } else {
      enqueueSnackbar("กรุณาเข้าสู่ระบบ", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "left" },
        action: notiStackAction,
      });
    }
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
    openProfileDrawer.onFalse();
    selectLocation.onFalse();
    setLocation(null);
    fetchAllMarker();
  };

  const notiStackAction = (key: SnackbarKey) => (
    <button onClick={() => notiStackOnClick(key)}>ไปหน้า login</button>
  );
  const notiStackOnClick = (key: SnackbarKey) => {
    router.replace("/login");
    closeSnackbar(key);
  };

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
        mode={mode}
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
        setFilterCategory={setFilterCategory}
        setFilterPrice={setFilterPrice}
        setFilterRating={setFilterRating}
        filterRating={filterRating}
        filterRadiusLatlng={filterRadiusLatlng}
        mode={mode}
        handleSearchOnClick={handleSearchOnClick}
        categoryList={filterCategory}
        filterRadius={filterRadius}
        filterPrice={filterPrice}
      />
      <ProfileDrawer
        openDrawer={openProfileDrawer}
        handleBackIconOnClick={handleBackIconOnClick}
        mode={mode}
      />
    </>
  );
};

export default HomePage;
