import React, { useEffect } from "react";
import UploadImage from "./upload-image/upload-image";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import { LatLng } from "leaflet";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { RHFTextField } from "@/shared/components/hook-form/rhf-text-field";
import RHFSelect from "@/shared/components/hook-form/rhf-select";
import Image from "next/image";
import { MarkerType } from "../_types/home.type";

type Props = {
  openDrawer: UseBooleanReturn;
  selectLocation: UseBooleanReturn;
  location: LatLng | null;
  formValues: any;
  setFormValues: (values: any) => void;
  mode: MarkerType;
};

const CreateForm = ({
  openDrawer,
  selectLocation,
  location,
  setFormValues,
  mode,
}: Props) => {
  const title =
    mode == MarkerType.Toilet ? "ลงทะเบียนห้องสุขา" : "ลงทะเบียนจุดนั่งพัก";
  const imgTitle =
    mode == MarkerType.Toilet
      ? "รูปภาพห้องสุขา (ไม่เกิน 5 รูปภาพ)"
      : "รูปภาพจุดนั่งพัก (ไม่เกิน 5 รูปภาพ)";
  const { getValues, setValue } = useFormContext();
  const locationTitle = location
    ? `${location?.lat.toFixed(4)},${location?.lng.toFixed(4)}`
    : "";

  const handleOnClick = () => {
    selectLocation.onTrue();
    openDrawer.onFalse();
    setFormValues(getValues());
  };

  useEffect(() => {
    console.log("image : ", getValues("image"));
  }, [getValues("image")]);

  useEffect(() => {
    if (location) {
      setValue("location", {
        latitude: location?.lat,
        longitude: location?.lng,
      });
    }
  }, [location]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">{title}</h1>
        <RHFTextField
          label="ชื่อสถานที่"
          placeholder="เช่น ตึกecc"
          name="location_name"
        />
        <RHFTextField
          label={`รายละเอียด${
            mode == MarkerType.Toilet ? "ห้องสุขา" : "จุดนั่งพัก"
          }`}
          placeholder={`เช่น ${
            mode == MarkerType.Toilet ? "ห้องน้ำแสงสวย" : "จุดนี้ร่มรื่น"
          }`}
          name="detail"
        />

        <div className="w-full flex gap-4">
          <RHFTextField
            name="price"
            label="ค่าเข้า"
            placeholder="ใส่เฉพาะจำนวนเงิน"
            type="number"
            sx={{ width: "50%" }}
          />

          <RHFTextField
            name="location"
            label="เลือกตำแหน่งบนแผนที่"
            type="button"
            sx={{ width: "50%" }}
            onClick={handleOnClick}
            value={locationTitle}
          />
        </div>

        <RHFSelect name="category" mode={mode} />

        <div className="flex flex-col gap-3 ">
          <h1 className="text-[14px] font-semibold">
            {imgTitle }
          </h1>
          <UploadImage mode={mode} />
        </div>
      </div>
    </>
  );
};

export default CreateForm;
