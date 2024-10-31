import React from "react";
import Image from "next/image";
import Button from "@/shared/components/button/button";
import Drawer from "@mui/material/Drawer";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import { MarkerType } from "../_types/home.type";

type Props = {
  openDrawer: UseBooleanReturn;
  mode: MarkerType;
};

const CreateSuccessDrawer = ({ openDrawer, mode }: Props) => {
  const imgSrc =
    mode == MarkerType.Toilet
      ? "/assets/image/create-success.png"
      : "/assets/image/create-success-rest.png";
  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          height: "40%",
          width: "100%",
          zIndex: "2500",
          position: "fixed",
          borderRadius: "20px 20px 0 0",
          backgroundColor: "rgb(255 255 255)",
          padding: "20px",
        },
      }}
      anchor="bottom"
      open={openDrawer.value}
    >
      <div className="flex flex-col items-center justify-center h-full gap-14">
        <div className="flex flex-col items-center justify-center gap-8">
          <Image src={imgSrc} alt="create-success" width={128} height={128} />
          <h1 className="text-2xl font-bold">แบ่งปันความสุขสำเร็จ</h1>
        </div>
        <Button className="text-lg px-14" onClick={openDrawer.onFalse}>
          กลับสู่หน้าหลัก
        </Button>
      </div>
    </Drawer>
  );
};

export default CreateSuccessDrawer;
