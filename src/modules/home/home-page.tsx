import React from "react";
import HomeHeader from "./home-header";
import HomeMap from "./home-map";
import ButtonIcon from "@/shared/components/button/button-icon";
import HomeButton from "./home-button";

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      {/* <ButtonIcon
        width={39}
        height={42}
        alt="rest-icon"
        src="/assets/icon/rest.svg"
        className="bottom-0 right-0 "
      /> */}
      <HomeButton/>
      <HomeMap />
    </>
  );
};

export default HomePage;
