"use client";

import ButtonIcon from "@/shared/components/button/button-icon";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import Drawer from "@mui/material/Drawer";
import Img from "@/shared/components/detail-drawer/detail_picture";
import DetailCard from "@/shared/components/detail-drawer/detail_card";

type Props = {
  openDrawer: UseBooleanReturn;
  handleBackIconOnClick: () => void;
};

const images = [
  {
    src: "https://f.ptcdn.info/892/034/000/1440753623-72-o.jpg",
    text: "12 Level Building",
  },
  {
    src: "https://f.ptcdn.info/893/034/000/1440754319-73-o.jpg",
    text: "12 Level Building",
  },
  {
    src: "https://www.horonumber.com/upload/uppic/1414671588.jpg",
    text: "12 Level Building",
  },
];

const DetailDrawer = ({ openDrawer, handleBackIconOnClick }: Props) => {
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
      <Img images={images} className="w-full h-auto"></Img>
      <DetailCard
        description="ecc building 1 ถ. ฉลองกรุง แขวงลำปลาทิว เขตลาดกระบัง กรุงเทพมหานคร 10520"
        latitude={37.7749}
        longitude={-122.4194}
      ></DetailCard>
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
