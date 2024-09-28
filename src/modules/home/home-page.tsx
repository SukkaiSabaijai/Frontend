import React from "react";
import HomeHeader from "./home-header";
import HomeMap from "./home-map";
import ButtonIcon from "@/shared/components/button/button-icon";
import HomeButton from "./home-button";

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <HomeButton/>
      <HomeMap />
    </>
  );
};

export default HomePage;
