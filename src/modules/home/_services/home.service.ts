import { endpoints } from "@/shared/configs/endpoints.config";
import Axios from "@/shared/utils/axios";
import {
  AllMarkerResp,
  AllMarkerType,
  AllReviewResp,
  CreateReviewParams,
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

  return data.status;
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

export const getMarkerReview = async (id: number): Promise<AllReviewResp> => {
  const { data } = await Axios.get(endpoints.reviews.get(id));
  console.log(data);

  return data;
};

export const getMarkerFilter = async () => {
  // const {data} = await Axios.
}
export const createReview = async (createReviewParams:CreateReviewParams) => {
  const { data } = await Axios.post(endpoints.reviews.create, createReviewParams);
  console.log("data resp : ", data);

  return data;
};

export const createBookmark = async (markerId: number, nickname: string) => {

  const requestBody = new URLSearchParams();
  requestBody.append("markerId", JSON.stringify(markerId));
  requestBody.append("nickname", nickname);

  const { data } = await Axios.post(endpoints.bookmark.create, requestBody, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return data
};
