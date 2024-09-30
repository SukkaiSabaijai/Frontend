import React from "react";
import HomeHeader from "./home-header";
import ButtonIcon from "@/shared/components/button/button-icon";
import HomeButton from "./home-button";
import dynamic from "next/dynamic";
const HomeMap = dynamic(() => import('./home-map'), {
  ssr: false, 
});

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
