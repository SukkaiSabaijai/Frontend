"use client";

import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";

type Props = {
  src: string;
  fileImage: File;
  setImage: Dispatch<SetStateAction<File[]>>;
};

const PreviewImage = ({ src, setImage, fileImage }: Props) => {
  const handleRemoveImage = (file: File) => {
    setImage((prev: File[]) => prev.filter((img) => img !== file));
  };
  return (
    <div className="h-[60px] w-20 relative">
      <button
        className="w-6 h-6 rounded-full bg-custom-blue text-white flex justify-center items-center absolute -left-2 -top-2 cursor-pointer"
        onClick={() => handleRemoveImage(fileImage)}
        type="button"
      >
        <span className="text-sm">x</span>
      </button>
      <div className="h-full w-full overflow-hidden">
        <Image
          width={0}
          height={0}
          style={{ width: "100%", height: "100%" }}
          src={src}
          alt="pic"
        />
      </div>
    </div>
  );
};

export default PreviewImage;
