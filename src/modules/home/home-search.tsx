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
import ButtonIcon from "@/shared/components/button/button-icon";

type Props = {
  setSearchBound: Dispatch<SetStateAction<L.LatLngBounds | null>>;
  handleSearchOnClick:()=>void
};

const libs: Library[] = ["places"];

const HomeSearch = ({ setSearchBound,handleSearchOnClick }: Props) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libs,
  });
  const placeAutocompleteRef = useRef<HTMLInputElement>(null);

  const handlePlaceChanged = () => {
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
        placeAutocompleteRef.current as HTMLInputElement,
        {
          componentRestrictions: { country: "TH" },
        }
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
    <div className="flex gap-8 items-center">
      <input
        ref={placeAutocompleteRef}
        type="text"
        placeholder="Search for a place"
        className="shadow-md shadow-slate-400 h-12 w-full p-2 text-[16px] z-[2000]"
      />
      <ButtonIcon
        src="/assets/icon/search.svg"
        alt="search-icon"
        width={25}
        height={25}
        className="rounded-full h-14"
        onClick={handleSearchOnClick}
      />
    </div>
  );
};

export default HomeSearch;
