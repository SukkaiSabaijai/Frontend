export type FilterRadiusLatlngType = {
  min_lat: number;
  max_lat: number;
  min_lng: number;
  max_lng: number;
};

export type CreateMarkerType = {
  location_name: string;
  detail: string;
  type: string;
  longitude: string;
  latitude: string;
  price: string;
  img: File[];
  category: string[]; 
};
