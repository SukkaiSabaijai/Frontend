type createdBy = {
  id: number;
  username: string;
  email: string;
  password: string;
  date_of_birth: string;
  gender: string;
  user_pic: string;
  refreshToken: string;
}

type toiletCategory = {
  id: number;
  disable: boolean;
  hose: boolean;
  flush: boolean;
}

type markerPic = {
  id: number;
  path: string
}

export type MarkerHistory = {
  id: number;
  latitude: number;
  longitude: number;
  location_name: string;
  type: string;
  detail: string;
  review_total_score: number;
  review_count: number;
  price: number;
  created_by: createdBy;
  toiletcategory: toiletCategory;
  restAreaCategory: any;
  marker_pics: markerPic[];
};