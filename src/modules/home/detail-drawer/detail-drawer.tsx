"use client";

import ButtonIcon from "@/shared/components/button/button-icon";
import { useBoolean, UseBooleanReturn } from "@/shared/hooks/use-boolean";
import Drawer from "@mui/material/Drawer";
import Img from "@/shared/components/detail-drawer/detail_picture";
import DetailCard from "@/shared/components/detail-drawer/detail_card";
import ReviewDrawer from "../review/review";
import { FaStar } from 'react-icons/fa';

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


const review = {
  rating: 4,
};

const DetailDrawer = ({ openDrawer, handleBackIconOnClick }: Props) => {
  const openReviewDrawer = useBoolean(false);

  const handleReviewClick = () => {
    openReviewDrawer.onTrue();
    openDrawer.onFalse();
  };

  return (
    <>
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
        <Img images={images} className="w-full h-auto" />
        <DetailCard
          description="ecc building 1 ถ. ฉลองกรุง แขวงลำปลาทิว เขตลาดกระบัง กรุงเทพมหานคร 10520"
          latitude={37.7749}
          longitude={-122.4194}
        />
        <div className="flex flex-col items-center justify-center h-screen mt-0">
          <div className="flex text-yellow-500 mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={`${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                size={21}
              />
            ))}
          </div>
          <button
            className="mt-0 px-3 py-1 bg-custom-blue text-white text-sm rounded-lg hover:bg-custom-yellow w-1/2"
            onClick={handleReviewClick}
          >
            Review
          </button>
        </div>
        <ButtonIcon
          onClick={handleBackIconOnClick}
          width={30}
          height={41}
          alt="rest-icon"
          src="/assets/icon/back.svg"
          className="bg-custom-light-yellow"
        />
      </Drawer>
      <ReviewDrawer openDrawer={openReviewDrawer} />
    </>
  );
};

export default DetailDrawer;

