"use client";

import React, { useEffect, useState } from "react";
import HomeHeader from "./home-header";
import ButtonIcon from "@/shared/components/button/button-icon";
import HomeButton from "./home-button";
import dynamic from "next/dynamic";
import { useBoolean } from "@/shared/hooks/use-boolean";
import SearchDrawer from "./search-drawer/search-drawer";
import L from "leaflet";
import { test } from "./_services/home.service";
// import { test } from "./_services/home.service";

const HomeMap = dynamic(() => import("./home-map"), {
  ssr: false,
});

const HomePage = () => {
  const openSearchDrawer = useBoolean(false);
  const [searchBound, setSearchBound] = useState<L.LatLngBounds | null>(null);

  const handleClickSearch = () => {
    openSearchDrawer.onTrue();
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <>
      <HomeHeader />
      <HomeButton handleClickSearch={handleClickSearch} />
      <HomeMap searchBound={searchBound} />

      <SearchDrawer
        openDrawer={openSearchDrawer}
        setSearchBound={setSearchBound}
      />
    </>
  );
};

export default HomePage;
