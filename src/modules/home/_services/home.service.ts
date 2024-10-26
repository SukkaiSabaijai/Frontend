import { endpoints } from "@/shared/configs/endpoints.config";
import Axios from "@/shared/utils/axios";
import { CreateMarkerType } from "../_types/home.type";

export const test = async () => {
  const { data } = await Axios.get("/");

  console.log(data);
  return data;
};

export const createMarker = async (formData: FormData) => {
  const { data } = await Axios.post(endpoints.marker.create, formData);
  console.log("data resp : ", data);

  return data;
};
