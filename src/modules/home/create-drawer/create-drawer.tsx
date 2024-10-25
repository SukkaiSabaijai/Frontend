"use client";

import ButtonIcon from "@/shared/components/button/button-icon";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import { Drawer, Input, TextField } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UploadImage from "./upload-image/upload-image";
import { LatLng } from "leaflet";
import TextFieldCustom from "@/shared/components/input/text-field";
import CreateForm from "./create-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { defaultValue, formSchema, FormValues } from "./form-validators";
import { Form } from "@/shared/components/hook-form/form-provider";

type Props = {
  openDrawer: UseBooleanReturn;
  handleBackIconOnClick: () => void;
  selectLocation: UseBooleanReturn;
  location: LatLng | null;
  formValues: any;
  setFormValues: (values: any) => void;
};

const CreateDrawer = ({
  openDrawer,
  handleBackIconOnClick,
  selectLocation,
  location,
  formValues,
  setFormValues,
}: Props) => {
  const methods = useForm({
    defaultValues: defaultValue,
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const {
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    Object.keys(formValues).forEach((key: any) => {
      setValue(key, formValues[key]);
    });
  }, [formValues, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("data : ", data);
  };

  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          height: "80%",
          width: "100%",
          zIndex: "2500",
          position: "fixed",
          borderRadius: "20px 20px 0 0",
          backgroundColor: "rgb(255 255 255)",
          padding: "20px",
        },
      }}
      anchor="bottom"
      open={openDrawer.value}
    >
      <Form methods={methods}>
        <CreateForm
          openDrawer={openDrawer}
          selectLocation={selectLocation}
          location={location}
          formValues={formValues}
          setFormValues={setFormValues}
        />
        <div className="w-full flex justify-between mt-5">
          <ButtonIcon
            type="button"
            onClick={handleBackIconOnClick}
            width={30}
            height={41}
            alt="rest-icon"
            src="/assets/icon/back.svg"
            className="bg-custom-light-yellow"
          ></ButtonIcon>

          <button
            className="bg-custom-blue
        rounded-full p-1 w-14 h-14 flex justify-center items-center"
            style={{ pointerEvents: "auto" }}
            onClick={methods.handleSubmit(onSubmit)}
          >
            <Image
              src="/assets/icon/confirm-select.svg"
              height={30}
              width={30}
              alt="confirm marker"
            />
          </button>
        </div>
      </Form>
    </Drawer>
  );
};

export default CreateDrawer;
