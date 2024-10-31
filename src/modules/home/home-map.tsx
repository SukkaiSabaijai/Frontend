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
import { useBoolean, UseBooleanReturn } from "@/shared/hooks/use-boolean";
import Image from "next/image";
import {
  AllMarkerResp,
  FilterRadiusLatlngType,
  MarkerDetailResp,
  MarkerType,
} from "./_types/home.type";
import { getMarkerDetail } from "./_services/home.service";

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

/** **********************************
 * default location is ecc
 ********************************** */
const defaultPosition: LatLngTuple = [13.729049855504648, 100.7756144956521];

type Props = {
  searchBound: L.LatLngBounds | null;
  setLocation: Dispatch<SetStateAction<LatLng | null>>;
  selectLocation: boolean;
  filterRadius: number | null;
  setFilterRadiusLatlng: Dispatch<SetStateAction<FilterRadiusLatlngType>>;
  flyToCurrentLocation: UseBooleanReturn;
  allMarker: AllMarkerResp[] | undefined;
  mode:MarkerType
};

export default function HomeMap({
  searchBound,
  setLocation,
  selectLocation,
  filterRadius,
  setFilterRadiusLatlng,
  flyToCurrentLocation,
  allMarker,
  mode
}: Props) {
  const [userLocation, setUserLocation] =
    useState<LatLngTuple>(defaultPosition);
  const [zoomLevel, setZoomLevel] = useState<number>(19);
  const openDrawer = useBoolean(false);
  const [clickId, setClickId] = useState<number | null>(null);
  const previousBoundsRef = useRef<L.LatLngBounds | null>(null);
  const [markerDetail, setMarkerDetail] = useState<MarkerDetailResp | null>(
    null
  );

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
          // setPosition([latitude, longitude]);
          setUserLocation([latitude, longitude]);
        },
        (err) => {
          setUserLocation(defaultPosition);
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

    useEffect(() => {
      if (flyToCurrentLocation.value && userLocation) {
        map.flyTo(userLocation, 18, {
          duration: 1.5,
        });

        flyToCurrentLocation.onFalse();
      }
    }, [flyToCurrentLocation, map]);

    useEffect(() => {
      if (filterRadius && map) {
        const center = map.getCenter();
        const circle = L.circle(center, { radius: filterRadius }).addTo(map);
        const bounds = circle.getBounds();

        const southWest = bounds.getSouthWest();
        const northEast = bounds.getNorthEast();

        /** *********************************
         * check ค่าไม่งั้นจะ rerenderซ้ำๆ
         ********************************* */
        setFilterRadiusLatlng((prev) => {
          if (
            prev.min_lat !== southWest.lat ||
            prev.max_lat !== northEast.lat ||
            prev.min_lng !== southWest.lng ||
            prev.max_lng !== northEast.lng
          ) {
            return {
              min_lat: southWest.lat,
              max_lat: northEast.lat,
              min_lng: southWest.lng,
              max_lng: northEast.lng,
            };
          }
          return prev;
        });
        map.removeLayer(circle);
      }
    }, [map, filterRadius]);

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
        fetchMarkerDetail(id);
        openDrawer.onTrue();
        setClickId(id);
      },
    } as LeafletEventHandlerFnMap);

  const fetchMarkerDetail = async (id: number) => {
    const markerDetail = await getMarkerDetail(id);

    setMarkerDetail(markerDetail);
  };

  const handleBackIconOnClick = () => {
    openDrawer.onFalse();
    setClickId(null);
  };

  return (
    <>
      <Map posix={userLocation} zoom={zoomLevel}>
        <MapEvents />

        {zoomLevel >= 11 && allMarker && (
          <>
            <UserMarker position={userLocation} />
            <MarkerClusterGroup maxClusterRadius={50}>
              {allMarker.map((marker) => (
                <Marker
                  key={marker.id}
                  position={[marker.latitude, marker.longitude] as LatLngTuple}
                  icon={marker.id == clickId ? clickPinIcon : pinIcon}
                  eventHandlers={handleMarkerClicked(
                    [marker.latitude, marker.longitude] as LatLngTuple,
                    marker.id
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
        markerDetail={markerDetail}
        mode={mode}
        fetchMarkerDetail = {fetchMarkerDetail}
      />
    </>
  );
}
