"use client";

import ButtonIcon from "@/shared/components/button/button-icon";
import Drawer from "@mui/material/Drawer";
import { Dispatch, SetStateAction } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DetailDrawer = ({ open, setOpen }: Props) => {
  return (
    <Drawer
      open={open}
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
        onClick={() => setOpen(false)}
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
