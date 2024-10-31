"use client";

import ButtonIcon from "@/shared/components/button/button-icon";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import Drawer from "@mui/material/Drawer";
import ReviewForm from "@/shared/components/review-drawer/review-form";


type Props = {
    openDrawer: UseBooleanReturn;
  };

  const ReviewDrawer = ({ openDrawer }: Props) => {
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
            backgroundColor: "#DFECFF",
            overflowY: "auto",
          },
        }}
      >
        <ReviewForm>
        </ReviewForm>  
        <ButtonIcon
        onClick={openDrawer.onFalse}
        width={30}
        height={41}
        alt="rest-icon"
        src="/assets/icon/back.svg"
        className="bg-custom-light-yellow mt-2"
      ></ButtonIcon>
      </Drawer>
    );
  };
  
  export default ReviewDrawer;