export enum MarkerType {
  Toilet = "toilet",
  REST_AREA = "rest_area",
}

type MarkerPic = {
  id: number;
  path: string
}

export type BookmarkDetailResp = {
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
  marker_pics: MarkerPic[]
};
;
export type BookmarkResp = {
  id: number;
  short_name: string;
  marker: BookmarkDetailResp;
}
