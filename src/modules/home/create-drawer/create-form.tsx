import React, { useEffect } from "react";
import UploadImage from "./upload-image/upload-image";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import { LatLng } from "leaflet";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { RHFTextField } from "@/shared/components/hook-form/rhf-text-field";
import RHFSelect from "@/shared/components/hook-form/rhf-select";
import Image from "next/image";

type Props = {
  openDrawer: UseBooleanReturn;
  selectLocation: UseBooleanReturn;
  location: LatLng | null;
  formValues: any;
  setFormValues: (values: any) => void;
};

const CreateForm = ({
  openDrawer,
  selectLocation,
  location,
  setFormValues,
}: Props) => {
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
        <h1 className="font-bold text-2xl">ลงทะเบียนห้องสุขา</h1>
        <RHFTextField
          label="ชื่อสถานที่"
          placeholder="เช่น ตึกecc"
          name="location_name"
        />
        <RHFTextField
          label="รายละเอียดห้องสุขา"
          placeholder="เช่น ห้องน้ำแสงสวย"
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

        <RHFSelect name="category" />

        <div className="flex flex-col gap-3 ">
          <h1 className="text-[14px] font-semibold">
            รูปภาพห้องสุขา (ไม่เกิน 5 รูปภาพ)
          </h1>
          <UploadImage />
        </div>
      </div>

      
    </>
  );
};

export default CreateForm;
