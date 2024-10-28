import { endpoints } from "@/shared/configs/endpoints.config";
import Axios from "@/shared/utils/axios";
import {
  AllMarkerResp,
  AllMarkerType,
  FilterParam,
  MarkerDetailResp,
} from "../_types/home.type";

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

export const getFilterMarker = async (params: FilterParam) => {
  const { data } = await Axios.get(endpoints.marker.get, { params });
  console.log(data);

  return data;
};

export const getAllMarkers = async (
  params: AllMarkerType
): Promise<AllMarkerResp[]> => {
  const { data } = await Axios.get(endpoints.marker.get, { params });
  console.log(data);

  return data;
};

export const getMarkerDetail = async (
  id: number
): Promise<MarkerDetailResp> => {
  const { data } = await Axios.get(endpoints.marker.getId(id));
  console.log(data);

  return data;
};

export const getMarkerReview = async (id: number) => {
  const { data } = await Axios.get(endpoints.reviews.get(id));
  console.log(data);

  return data;
};
