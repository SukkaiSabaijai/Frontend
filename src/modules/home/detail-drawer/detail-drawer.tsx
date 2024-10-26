"use client";

import ButtonIcon from "@/shared/components/button/button-icon";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import Drawer from "@mui/material/Drawer";

type Props = {
  openDrawer: UseBooleanReturn;
  handleBackIconOnClick:()=>void
};

const DetailDrawer = ({ openDrawer,handleBackIconOnClick }: Props) => {
  return (
    <Drawer
      open={openDrawer.value}
      anchor="bottom"
      sx={{
        "& .MuiDrawer-paper": {
          height: "40%",
          width: "100%",
          zIndex: "1500",
          position: "fixed",
          borderRadius: "20px 20px 0 0",
          backgroundColor: "#DFECFF",
        },
      }}
    >
      hi
      <ButtonIcon
        onClick={handleBackIconOnClick}
        width={30}
        height={41}
        alt="rest-icon"
        src="/assets/icon/back.svg"
        className="bg-custom-light-yellow"
      ></ButtonIcon>
    </Drawer>
  );
};

export default DetailDrawer;
