import { LatLng } from "leaflet";
import Image from "next/image";
import React from "react";

type Props = {
  location: LatLng | null;
  handleClickSelectLocation: () => void;
};

const SelectLocation = ({ location, handleClickSelectLocation }: Props) => {
  const title = location
    ? `${location.lat.toFixed(4)},${location.lng.toFixed(4)}`
    : "เลื่อนเพื่อเลือกตำแหน่ง";
  return (
    <div
      className="w-full z-[1000] absolute bottom-0 right-0 flex flex-col items-center gap-6 pb-16"
      style={{ pointerEvents: "none" }}
    >
      <div className="w-3/4 h-16 bg-custom-blue shadow-md shadow-slate-400 rounded-3xl text-white flex justify-center items-center text-xl">
        {title}
      </div>

      <button
        className={`${
          location ? "bg-custom-blue" : "bg-gray-400"
        } rounded-full p-1`}
        style={{ pointerEvents: "auto" }}
        onClick={handleClickSelectLocation}
        disabled={location ? false : true}
      >
        <Image
          src="/assets/icon/confirm-select.svg"
          height={30}
          width={30}
          alt="confirm marker"
        />
      </button>
    </div>
  );
};

export default SelectLocation;
