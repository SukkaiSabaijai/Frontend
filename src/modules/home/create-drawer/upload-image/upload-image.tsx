"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import PreviewImage from "./preview-image";
import { MarkerType } from "../../_types/home.type";

type Props = {
  mode: MarkerType;
};

const UploadImage = ({ mode }: Props) => {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();
  const [image, setImage] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const currentImg = watch("image");
  const imgSrc =
    mode == MarkerType.Toilet
      ? "/assets/image/upload-image.png"
      : "/assets/image/upload-image-yellow.png";

  const handleImageUpload = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files?.length) {
      return;
    }

    const files = Array.from(target.files);

    files.forEach((file) => {
      setImage((prev: File[]) => [...prev, file]);
    });

    target.value = "";
  };

  const updatePreview = async () => {
    const previewList: string[] = [];

    currentImg.forEach((img: File) => {
      previewList.push(URL.createObjectURL(img));
    });

    setPreview(previewList);
  };

  const upDateImg = async () => {
    setValue("image", image);
    // await trigger("image");
  };

  useEffect(() => {
    // console.log("img : ", image);
    updatePreview();
  }, [currentImg]);

  useEffect(() => {
    upDateImg();
  }, [image]);

  useEffect(() => {
    console.log("preview : ", preview);
  }, [preview]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <label
          className={`w-full h-36 rounded-lg border-2 border-dashed ${
            mode == MarkerType.Toilet
              ? "border-custom-blue"
              : "border-custom-yellow"
          } flex flex-col items-center justify-center gap-2`}
          id="upload-label"
          htmlFor="upload-image"
        >
          <Image src={imgSrc} alt="camera" width={48} height={48} />
          <h1
            className={`font-semibold text-xl ${
              mode == MarkerType.Toilet
                ? "text-custom-blue"
                : "text-custom-yellow"
            }`}
          >
            เพิ่มรูปภาพ
          </h1>
        </label>

        <input
          id="upload-image"
          multiple
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        {errors["image"] && (
          <p className="mt-2 text-[12px] text-red-500">
            {errors["image"]?.message as string}
          </p>
        )}
        <div className="flex gap-3">
          {preview &&
            preview.map((src: string, index: number) => (
              <PreviewImage
                key={index}
                src={src}
                fileImage={image[index]}
                setImage={setImage}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
