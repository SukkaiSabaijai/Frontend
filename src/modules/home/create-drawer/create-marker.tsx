import { LatLng } from "leaflet";
import React from "react";
import SelectLocation from "./select-location";
import CreateDrawer from "./create-drawer";
import { useBoolean, UseBooleanReturn } from "@/shared/hooks/use-boolean";

type Props = {
  location: LatLng | null;
  createMarker: UseBooleanReturn;
  openCreateDrawer:UseBooleanReturn
};

const CreateMarker = ({ location, createMarker,openCreateDrawer }: Props) => {
//   const openCreateDrawer = useBoolean(false);

  const handleClickSelectLocation = () => {
    openCreateDrawer.onTrue();
    // createMarker.onFalse();
  };

  const handleBackIconOnClick = () => {
    openCreateDrawer.onFalse()
    createMarker.onFalse();
  };
  return (
    <>
      <SelectLocation
        location={location}
        handleClickSelectLocation={handleClickSelectLocation}
      />
      <CreateDrawer
        openDrawer={openCreateDrawer}
        handleBackIconOnClick={handleBackIconOnClick}
      />
    </>
  );
};

export default CreateMarker;
