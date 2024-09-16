"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";

export default function HomeMap() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/shared/components/map/map-container"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <Map posix={[13.736717, 100.523186]}>
        <Marker position={[13.736717, 100.523186]}>
          <Popup>toilet detail</Popup>
        </Marker>
      </Map>
    </>
  );
}
