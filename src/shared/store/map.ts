import { Map } from "leaflet";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type MapState = {
  map: Map | null;
  setMap: (map: Map) => void;
  selectedLocationId: string;
  setSelectedLocationId: (selectedLocationId: string) => void;
};

export const useMapStore = create<MapState>()(
  devtools((set) => ({
    map: null,
    setMap: (map: Map) => set({ map }),
    selectedLocationId: "",
    setSelectedLocationId: (selectedLocationId: string) =>
      set({ selectedLocationId }),
  }))
);
