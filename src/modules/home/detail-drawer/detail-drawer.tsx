"use client";

import ButtonIcon from "@/shared/components/button/button-icon";
import { useBoolean, UseBooleanReturn } from "@/shared/hooks/use-boolean";
import Drawer from "@mui/material/Drawer";
import Img from "@/shared/components/detail-drawer/detail_picture";
import DetailCard from "@/shared/components/detail-drawer/detail_card";
import {
  AllReviewResp,
  MarkerDetailResp,
  MarkerType,
} from "../_types/home.type";
import ReviewDrawer from "../review/review";
import { useEffect, useState } from "react";
import { getMarkerReview } from "../_services/home.service";
import { FaStar } from "react-icons/fa";
import review from "../review/review";

type Props = {
  openDrawer: UseBooleanReturn;
  handleBackIconOnClick: () => void;
  markerDetail: MarkerDetailResp | null;
  mode: MarkerType;
  fetchMarkerDetail: (id: number) => void;
};

// const images = [
//   {
//     src: "https://f.ptcdn.info/892/034/000/1440753623-72-o.jpg",
//     text: "12 Level Building",
//   },
//   {
//     src: "https://f.ptcdn.info/893/034/000/1440754319-73-o.jpg",
//     text: "12 Level Building",
//   },
//   {
//     src: "https://www.horonumber.com/upload/uppic/1414671588.jpg",
//     text: "12 Level Building",
//   },
// ];

const DetailDrawer = ({
  openDrawer,
  handleBackIconOnClick,
  markerDetail,
  mode,
  fetchMarkerDetail,
}: Props) => {
  const openReviewDrawer = useBoolean(false);
  const [markerReview, setMarkerReview] = useState<AllReviewResp>();
  const updateReview = useBoolean(false);
  const ratingStar = markerDetail?.avg_rating
    ? Number(markerDetail.avg_rating.toFixed(0))
    : 0;
  const handleReviewClick = () => {
    fetchAllReview();
    openReviewDrawer.onTrue();
    openDrawer.onFalse();
  };
  const fetchAllReview = async () => {
    if (markerDetail) {
      const allReview = await getMarkerReview(markerDetail.id);
      setMarkerReview(allReview);
    }
    updateReview.onFalse();
  };

  const handleBackOnclick = () => {
    if (markerDetail) {
      fetchMarkerDetail(markerDetail.id);
    }
    openDrawer.onTrue();
    openReviewDrawer.onFalse();
  };

  const bgDrawer = mode == MarkerType.Toilet ? "#F1F7FF" : "#FFE4AE";
  const bgBackDrawer =
    mode == MarkerType.Toilet ? "bg-custom-light-yellow" : "bg-custom-yellow ";
  const backSrc =
    mode == MarkerType.Toilet
      ? "/assets/icon/back.svg"
      : "/assets/icon/back-icon-yellow.svg";

  useEffect(() => {
    fetchAllReview();
  }, [updateReview]);
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
            backgroundColor: bgDrawer,
            overflowY: "auto",
          },
        }}
      >
        {/* <Img images={images} className="w-full h-auto"></Img> */}
        {markerDetail && (
          <DetailCard
            description="ecc building 1 ถ. ฉลองกรุง แขวงลำปลาทิว เขตลาดกระบัง กรุงเทพมหานคร 10520"
            latitude={37.7749}
            longitude={-122.4194}
            markerDetail={markerDetail}
          ></DetailCard>
        )}
        <div className="flex flex-col items-center justify-center h-screen mt-0 mb-10">
          <div className="flex text-yellow-500 mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={`${
                  index < ratingStar ? "text-yellow-500" : "text-gray-300"
                }`}
                size={21}
              />
            ))}
          </div>
          <button
            className="px-3 py-1 bg-custom-blue text-white text-sm rounded-lg hover:bg-custom-yellow w-1/4 text-xl font-bold"
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
          mode={mode}
          src={mode == MarkerType.Toilet ? "/assets/icon/back-to-toilet-real.svg"  :"/assets/icon/back.svg"}
          className = {`fixed bottom-5 left-5 z-50`}
        ></ButtonIcon>
      </Drawer>
      {markerReview && (
        <ReviewDrawer
          openDrawer={openReviewDrawer}
          markerReview={markerReview}
          updateReview={updateReview}
          mode={mode}
          handleBackOnClick={handleBackOnclick}
          locationName={markerDetail ? markerDetail.location_name : ""}
        />
      )}
    </>
  );
};

export default DetailDrawer;
