"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { ReactNode } from "react";

type Props = {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
  children?: ReactNode;
};

const Map = ({ posix, zoom = 19, children }: Props) => {
  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      style={{ height: "100%", width: "100%", zIndex: "0" }}
      zoomControl={false} 
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default Map;
