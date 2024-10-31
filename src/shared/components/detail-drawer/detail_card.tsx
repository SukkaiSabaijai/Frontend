import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MarkerDetailResp } from "@/modules/home/_types/home.type";
import Img from "./detail_picture";
import { createBookmark } from "@/modules/home/_services/home.service";

type DetailCardProps = {
  description: string;
  latitude: number;
  longitude: number;
  markerDetail: MarkerDetailResp;
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

const DetailCard: React.FC<DetailCardProps> = ({
  markerDetail,
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean | null>(null);
  const location = `Latitude : ${markerDetail.latitude.toFixed(
    4
  )}, Longitude : ${markerDetail.longitude.toFixed(4)}`;
  
  const disabledEmoji = isDisabled ? (
    "♿"
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1003_266)">
        <path
          d="M13.9331 7.76867V8.34367C13.9323 9.69143 13.4959 11.0028 12.6889 12.0823C11.882 13.1618 10.7477 13.9515 9.4552 14.3336C8.16275 14.7157 6.78139 14.6699 5.51715 14.2028C4.25291 13.7357 3.17351 12.8725 2.43996 11.7418C1.7064 10.6112 1.35797 9.27371 1.44665 7.92886C1.53533 6.58402 2.05636 5.30387 2.93203 4.27934C3.8077 3.2548 4.9911 2.54078 6.30572 2.24376C7.62035 1.94673 8.99577 2.08263 10.2269 2.63117"
          stroke="#F1F7FF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.9331 3.34375L7.68311 9.6L5.80811 7.725"
          stroke="#F1F7FF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1003_266">
          <rect
            width="15"
            height="15"
            fill="white"
            transform="translate(0.183105 0.84375)"
          />
        </clipPath>
      </defs>
    </svg>
  );
  const images = markerDetail.img.map((path) => ({
    src: "https://api.toiletnearme.org/image/" + path,
    text: markerDetail.location_name,
  }));
  const addBookmark = async () => {
    const resp = await createBookmark(
      markerDetail.id,
      markerDetail.location_name
    );
  };



  return (
    <>
      <Img
        addBookmark={addBookmark}
        images={images}
        className="w-full h-[300px]"
      ></Img>

      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className={cn("mt-2 mb-2 p-2 border rounded")}>
            <p className={cn("text-sm", "text-gray-700")}>{location}</p>
          </div>

          <div
            className={cn(
              "text-xs",
              "max-w-sm",
              "bg-custom-blue",
              "border",
              "border-gray-200",
              "rounded-xl",
              "shadow-md",
              "overflow-hidden"
            )}
          >
            <div className={cn("p-3")}>
              <p className={cn("text-l", "text-white", "mt-2")}>
                {markerDetail.detail}
              </p>
            </div>
          </div>

          <div
            className={cn(
              "max-w-sm",
              "bg-custom-blue",
              "border",
              "border-gray-200",
              "rounded-2xl",
              "shadow-md",
              "overflow-hidden",
              "mt-2"
            )}
          >
            <div className={cn("p-3")}>
              <div
                className={cn(
                  "text-xl",
                  "font-bold",
                  "text-gray-500",
                  "mt-2",
                  "text-white",
                  "flex",
                  "space-x-4"
                )}
              >
                {markerDetail.category.map((cate, index) => (
                  <div key={index} className="flex items-center">
                    {disabledEmoji} {cate}
                  </div>
                ))}
                {/* {menEmoji} Men, {womenEmoji} Women, {disabledEmoji} Disabled */}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default DetailCard;
