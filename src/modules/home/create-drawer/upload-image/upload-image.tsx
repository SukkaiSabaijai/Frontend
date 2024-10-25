"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import PreviewImage from "./preview-image";

const UploadImage = () => {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();
  const [image, setImage] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const currentImg = watch("image");

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
      <div className="flex flex-col">
        <label
          className="w-full h-36 rounded-lg border-2 border-dashed border-custom-blue flex flex-col items-center justify-center gap-2"
          id="upload-label"
          htmlFor="upload-image"
        >
          <Image
            src="/assets/image/upload_image.png"
            alt="camera"
            width={48}
            height={48}
          />
          <h1 className="font-semibold text-xl text-custom-blue">
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
