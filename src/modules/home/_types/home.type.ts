export type FilterRadiusLatlngType = {
  min_lat: number;
  max_lat: number;
  min_lng: number;
  max_lng: number;
};

export type FilterParam = {
  min_lat: string;
  max_lat: string;
  min_lng: string;
  max_lng: string;
  type: MarkerType;
  disable?: string;
  flush?: string;
  hose?: string;
  price?: string;
  rating?: string;
};

export type AllMarkerType = {
  max_latitude: string;
  min_latitude: string;
  max_longitude: string;
  min_longitude: string;
  type: MarkerType;
};

export type MarkerDetailResp = {
  latitude: number;
  longitude: number;
  avg_rating: number;
  location_name: string;
  detail: string;
  img: string[];
  type: MarkerType;
  category: string[];
  created_by: string;
};

export type AllMarkerResp = {
  id: number;
  latitude: number;
  longitude: number;
  rating: number;
};

export enum MarkerType {
  Toilet = "toilet",
  REST_AREA = "reat_area",
}

export const categoriesMap: Record<MarkerType, string[]> = {
  [MarkerType.Toilet]: ["disable", "flush", "hose"],
  [MarkerType.REST_AREA]: ["charger", "table", "wifi"],
};
