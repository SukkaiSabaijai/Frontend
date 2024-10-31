"use client";

import ButtonIcon from "@/shared/components/button/button-icon";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import Drawer from "@mui/material/Drawer";
import ReviewForm from "@/shared/components/review-drawer/review-form";
import { AllMarkerResp, AllReviewResp, MarkerType } from "../_types/home.type";
import { Handlee } from "next/font/google";

type Props = {
    openDrawer: UseBooleanReturn;
    markerReview: AllReviewResp;
    updateReview: UseBooleanReturn;
    mode:MarkerType
    handleBackOnClick:()=>void
    locationName:string
  };

  const ReviewDrawer = ({ openDrawer, markerReview, updateReview,mode,handleBackOnClick,locationName}: Props) => {
    const bgDrawer = mode == MarkerType.Toilet ? "#F1F7FF" : "#FFE4AE";

    return (
      <Drawer
        open={openDrawer.value}
        anchor="bottom"
        sx={{
          "& .MuiDrawer-paper": {
            height: "60%",
            width: "100%",
            zIndex: "1500",
            position: "fixed",
            borderRadius: "20px 20px 0 0",
            backgroundColor: bgDrawer,
            overflowY: "auto",
          },
        }}
      >
        <ReviewForm markerReview={markerReview} updateReview={updateReview} mode={mode} locationName={locationName}/>
        <ButtonIcon
          onClick={handleBackOnClick}
          width={30}
          height={41}
          alt="rest-icon"
          mode={mode}
          src={mode == MarkerType.Toilet ? "/assets/icon/back-to-toilet-real.svg"  :"/assets/icon/back.svg"}
          className = {`fixed bottom-5 left-5 z-50`}
        ></ButtonIcon>
    </Drawer>
  );
};

export default ReviewDrawer;
