import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MarkerDetailResp } from "@/modules/home/_types/home.type";
import Img from "./detail_picture";

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
  description,
  latitude,
  longitude,
  markerDetail,
}) => {
  const [isMen, setIsMen] = useState<boolean | null>(null);
  const [isWomen, setIsWomen] = useState<boolean | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean | null>(null);
  const location = `Latitude : ${markerDetail.latitude.toFixed(
    4
  )}, Longitude : ${markerDetail.longitude.toFixed(4)}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/your-endpoint");
      const data = await response.json();

      setIsMen(data.isMen);
      setIsWomen(data.isWomen);
      setIsDisabled(data.isDisabled);
    };

    // fetchData();
  }, []);

  const menEmoji = isMen ? "👨" : "⚪";
  const womenEmoji = isWomen ? "👩" : "⚪";
  const disabledEmoji = isDisabled ? "♿" : "⚪";

  const images = markerDetail.img.map((path) => ({
    src: "http://localhost:5000/image/" + path,
    text: markerDetail.location_name,
  }));

  const handleReviewClick = () => {};
  return (
    <>
      <Img images={images} className="w-full h-auto"></Img>

      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className={cn("mt-2 mb-2 p-2 border rounded")}>
            <p className={cn("text-sm", "text-gray-700")}>{location}</p>
          </div>

          <div
            className={cn(
              "max-w-sm",
              "bg-white",
              "border",
              "border-gray-200",
              "rounded-xl",
              "shadow-md",
              "overflow-hidden"
            )}
          >
            <div className={cn("p-4")}>
              <p className={cn("text-sm", "text-gray-500", "mt-2")}>
                {markerDetail.detail}
              </p>
            </div>
          </div>

          <div
            className={cn(
              "max-w-sm",
              "bg-white",
              "border",
              "border-gray-200",
              "rounded-2xl",
              "shadow-md",
              "overflow-hidden",
              "mt-2"
            )}
          >
            <div className={cn("p-4")}>
              <div className={cn("text-sm text-gray-500 mt-2 flex gap-2")}>
                {markerDetail.category.map((cate, index) => (
                  <div key={index}>
                    {disabledEmoji} {cate}
                  </div>
                ))}
                {/* {menEmoji} Men, {womenEmoji} Women, {disabledEmoji} Disabled */}
              </div>
            </div>
          </div>
          <div>
            <button
              className={cn(
                "mt-4 p-2 bg-blue-500 text-white rounded-2xl hover:bg-white-600"
              )}
              // onClick={handleReviewClick}
            >
              Review
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCard;
