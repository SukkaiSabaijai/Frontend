"use client";

import React, { Dispatch, SetStateAction, useRef } from "react";
import dynamic from "next/dynamic";
import { useState, useEffect, useMemo } from "react";
import L, { LatLng, LatLngTuple, LeafletEventHandlerFnMap } from "leaflet";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "./home-map.css";
import UserMarker from "@/shared/components/map/user-marker";
import DetailDrawer from "./detail-drawer/detail-drawer";
import { useBoolean } from "@/shared/hooks/use-boolean";
import Image from "next/image";

const pinIconUrl = "/assets/icon/location-pin.svg";
const clickPinIconUrl = "/assets/icon/click-pin.svg";

const pinIcon = new L.Icon({
  iconUrl: pinIconUrl,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});
const clickPinIcon = new L.Icon({
  iconUrl: clickPinIconUrl,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const locations = [
  { id: 1, name: "Cafe 1", position: [13.7291, 100.7757] },
  { id: 2, name: "Restaurant 2", position: [13.7289, 100.7752] },
  { id: 3, name: "Shop 3", position: [13.7295, 100.7759] },
  { id: 4, name: "Park 4", position: [13.7292, 100.7754] },
  { id: 5, name: "Library 5", position: [13.7287, 100.7755] },
  { id: 6, name: "Museum 6", position: [13.7305, 100.774] },
  { id: 7, name: "Hotel 7", position: [13.731, 100.7735] },
  { id: 8, name: "Station 8", position: [13.732, 100.775] },
  { id: 9, name: "Mall 9", position: [13.733, 100.776] },
  { id: 10, name: "Office 10", position: [13.734, 100.777] },
  { id: 11, name: "Theater 11", position: [13.735, 100.778] },
  { id: 12, name: "School 12", position: [13.7355, 100.7765] },
  { id: 13, name: "Clinic 13", position: [13.736, 100.7755] },
  { id: 14, name: "Hospital 14", position: [13.7365, 100.7745] },
  { id: 15, name: "Pharmacy 15", position: [13.737, 100.7735] },
  { id: 16, name: "Supermarket 16", position: [13.738, 100.775] },
  { id: 17, name: "Bank 17", position: [13.739, 100.776] },
  { id: 18, name: "Market 18", position: [13.74, 100.777] },
  { id: 19, name: "Temple 19", position: [13.741, 100.778] },
  { id: 20, name: "Cafe 20", position: [13.742, 100.779] },
  { id: 21, name: "Bar 21", position: [13.743, 100.78] },
  { id: 22, name: "Bakery 22", position: [13.744, 100.781] },
  { id: 23, name: "Gym 23", position: [13.745, 100.782] },
  { id: 24, name: "Hotel 24", position: [13.746, 100.783] },
  { id: 25, name: "Supermarket 25", position: [13.747, 100.784] },
  { id: 26, name: "Pharmacy 26", position: [13.748, 100.785] },
  { id: 27, name: "Clinic 27", position: [13.749, 100.786] },
  { id: 28, name: "Office 28", position: [13.75, 100.787] },
  { id: 29, name: "Shop 29", position: [13.751, 100.788] },
  { id: 30, name: "Bank 30", position: [13.752, 100.789] },
  { id: 31, name: "Library 31", position: [13.753, 100.79] },
  { id: 32, name: "Restaurant 32", position: [13.754, 100.791] },
  { id: 33, name: "Gym 33", position: [13.755, 100.792] },
  { id: 34, name: "Park 34", position: [13.756, 100.793] },
  { id: 35, name: "Cafe 35", position: [13.757, 100.794] },
  { id: 36, name: "Bar 36", position: [13.758, 100.795] },
  { id: 37, name: "Hospital 37", position: [13.759, 100.796] },
  { id: 38, name: "Supermarket 38", position: [13.76, 100.797] },
  { id: 39, name: "School 39", position: [13.761, 100.798] },
  { id: 40, name: "Clinic 40", position: [13.762, 100.799] },
  { id: 41, name: "Theater 41", position: [13.763, 100.8] },
  { id: 42, name: "Hotel 42", position: [13.764, 100.801] },
  { id: 43, name: "Mall 43", position: [13.765, 100.802] },
  { id: 44, name: "Museum 44", position: [13.766, 100.803] },
  { id: 45, name: "Cafe 45", position: [13.767, 100.804] },
  { id: 46, name: "Restaurant 46", position: [13.768, 100.805] },
  { id: 47, name: "Shop 47", position: [13.769, 100.806] },
  { id: 48, name: "Park 48", position: [13.77, 100.807] },
  { id: 49, name: "Library 49", position: [13.771, 100.808] },
  { id: 50, name: "Cafe 50", position: [13.772, 100.809] },
  {
    id: 51,
    name: "ฟหดำดกหด",
    position: [13.770990092912811, 100.55617921355451],
  },
];

/** **********************************
 * default location is ecc
 ********************************** */
const defaultPosition: LatLngTuple = [13.729049855504648, 100.7756144956521];

type Props = {
  searchBound: L.LatLngBounds | null;
  setLocation: Dispatch<SetStateAction<LatLng | null>>;
  selectLocation: boolean;
};

export default function HomeMap({
  searchBound,
  setLocation,
  selectLocation,
}: Props) {
  const [position, setPosition] = useState<LatLngTuple>(defaultPosition);
  const [zoomLevel, setZoomLevel] = useState<number>(19);
  const openDrawer = useBoolean(false);
  const [clickId, setClickId] = useState<number | null>(null);
  const previousBoundsRef = useRef<L.LatLngBounds | null>(null);

  const Map = useMemo(
    () =>
      dynamic(() => import("@/shared/components/map/map-container"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  /** **********************************
   * get current location
   ********************************** */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log(latitude);
          console.log(longitude);
          setPosition([latitude, longitude]);
        },
        (err) => {
          setPosition(defaultPosition);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  const MapEvents = () => {
    const map = useMap();
    useEffect(() => {
      if (searchBound) {
        if (
          !previousBoundsRef.current ||
          !searchBound.equals(previousBoundsRef.current)
        ) {
          map.flyToBounds(searchBound, { duration: 1.5 });
          previousBoundsRef.current = searchBound;
        }
      }
    }, [searchBound, map]);

    useMapEvents({
      zoomend: (e) => {
        const map = e.target;
        setZoomLevel(map.getZoom());
      },
      moveend: (e) => {
        if (selectLocation) {
          const map = e.target;
          const center = map.getCenter();
          setLocation(center);
          console.log("center : ", center);
        }
      },
    });
    return null;
  };

  const handleMarkerClicked = (position: LatLngTuple, id: number) =>
    ({
      click: (e) => {
        const map = e.target._map;
        const mapCenter = map.getCenter();
        const distance = mapCenter.distanceTo(position);

        /** ****************************************
         * check ตอนกดปุ่มซ้ำ ไม่งั้นแมพจะสั่นนิดหน่อย
         **************************************** */
        if (distance > 5) {
          map.flyTo(position, 18, {
            duration: 1.5,
          });
        }
        openDrawer.onTrue();
        setClickId(id);
      },
    } as LeafletEventHandlerFnMap);

  const handleBackIconOnClick = () => {
    openDrawer.onFalse();
    setClickId(null);
  };

  return (
    <>
      <Map posix={position} zoom={zoomLevel}>
        <MapEvents />

        {zoomLevel >= 11 && (
          <>
            <UserMarker position={position} />
            <MarkerClusterGroup maxClusterRadius={50}>
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.position as LatLngTuple}
                  icon={location.id == clickId ? clickPinIcon : pinIcon}
                  eventHandlers={handleMarkerClicked(
                    location.position as LatLngTuple,
                    location.id
                  )}
                ></Marker>
              ))}
            </MarkerClusterGroup>

            {selectLocation && (
              <>
                <Image
                  src="/assets/icon/click-pin.svg"
                  alt="select icon"
                  height={35}
                  width={35}
                  className="z-[2000] absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-12"
                />
              </>
            )}
          </>
        )}
      </Map>

      <DetailDrawer
        openDrawer={openDrawer}
        handleBackIconOnClick={handleBackIconOnClick}
      />
    </>
  );
}
