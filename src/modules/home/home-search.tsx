"use client";

import { Library } from "@googlemaps/js-api-loader";
import { useLoadScript } from "@react-google-maps/api";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import L from "leaflet";

type Props = {
  setSearchBound: Dispatch<SetStateAction<L.LatLngBounds | null>>;
};

const libs: Library[] = ["places"];

const HomeSearch = ({ setSearchBound }: Props) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libs,
  });
  const placeAutocompleteRef = useRef<HTMLInputElement>(null);

  const handlePlaceChanged = () => {
    console.log("hi");
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        const bounds = place.geometry.viewport;
        if (bounds) {
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();

          setSearchBound(
            L.latLngBounds([sw.lat(), sw.lng()], [ne.lat(), ne.lng()])
          );
        }
      } else {
        console.log("No geometry details available for the selected place.");
      }
    }
  };

  useEffect(() => {
    if (isLoaded) {
      const gAutocomplete = new google.maps.places.Autocomplete(
        placeAutocompleteRef.current as HTMLInputElement
      );
      setAutocomplete(gAutocomplete);
    }
  }, [isLoaded]);

  useEffect(() => {
    console.log("auto : ", autocomplete?.getPlace());
    if (autocomplete) {
      autocomplete.addListener("place_changed", handlePlaceChanged);
    }
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
          zIndex: "2000",
        }}
      />
    </div>
  );
};

export default HomeSearch;
