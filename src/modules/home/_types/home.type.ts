import { boolean } from "zod";

export type FilterRadiusLatlngType = {
  min_lat: number;
  max_lat: number;
  min_lng: number;
  max_lng: number;
};

export type FilterParam = {
  max_latitude: string;
  min_latitude: string;
  max_longitude: string;
  min_longitude: string;
  type: MarkerType;
  disable?: boolean;
  flush?: boolean;
  hose?: boolean;
  price?: number;
  rating?: number;
  charger?: boolean;
  table?: boolean;
  wifi?: boolean;
};

export type AllMarkerType = {
  max_latitude: string;
  min_latitude: string;
  max_longitude: string;
  min_longitude: string;
  type: MarkerType;
  price?: number;
  rating?: number;
  disable?: boolean;
  flush?: boolean;
  hose?: boolean;
  charger?: boolean;
  table?: boolean;
  wifi?: boolean;
};

export type MarkerDetailResp = {
  id: number;
  latitude: number;
  longitude: number;
  avg_rating: number;
  location_name: string;
  detail: string;
  img: string[];
  type: MarkerType;
  category: string[];
  created_by: string;
  isBookMark:boolean
};

export type AllMarkerResp = {
  id: number;
  latitude: number;
  longitude: number;
  rating: number;
};

export enum MarkerType {
  Toilet = "toilet",
  REST_AREA = "rest_area",
}

export const categoriesMap: Record<MarkerType, string[]> = {
  [MarkerType.Toilet]: ["disable", "flush", "hose"],
  [MarkerType.REST_AREA]: ["charger", "table", "wifi"],
};

export type AllReviewResp = {
  markerId: number
  avgRating: number
  reviewCount: number
  reviews: ReviewDetail[]
}

type ReviewDetail = {
  username: string
  userPic: string
  rating: number
  review: string
}
export type CreateReviewParams = {
  markerId: string;
  rating: string;
  review: string;
}
