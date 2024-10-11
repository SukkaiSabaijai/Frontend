"use client";

import { Library } from "@googlemaps/js-api-loader";
import { Input } from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";

const libs: Library[] = ["places"];

const RegisterPage = () => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libs,
  });
  const placeAutocompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoaded) {
      const gAutocomplete = new google.maps.places.Autocomplete(
        placeAutocompleteRef.current as HTMLInputElement
      );
      setAutocomplete(gAutocomplete);
      window.google.maps.event.addListener(
        gAutocomplete,
        "place_changed",
        () => {
          const pacContainer = document.querySelector(".pac-container");
          if (pacContainer) {
            (pacContainer as HTMLElement).style.zIndex = "2000"; // Set z-index higher than Drawer
          }
        }
      );
    }
  }, [isLoaded]);

  useEffect(() => {
    console.log("auto : ", autocomplete?.getPlace);
  }, [autocomplete]);
  return (
    <div>
      <input
        ref={placeAutocompleteRef}
        type="text"
        placeholder="Search for a place"
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          zIndex: "2000", // Ensure input also has high z-index
        }}
      />
    </div>
  );
};

export default RegisterPage;
