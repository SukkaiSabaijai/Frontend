import { LatLngTuple, divIcon } from "leaflet";
import { Marker } from "react-leaflet";
import L from "leaflet";

type Props = {
  position: LatLngTuple;
};

const UserMarker = ({ position }: Props) => {
  // const userLocationIcon = L.divIcon({
  //   className: "custom-pulse-icon",
  //   html: `
  //     <div class="pointer"></div>
  //   `,
  // });

  return (
    <Marker
      position={position}
      icon={L.divIcon({
        className: "custom-pulse-icon",
        html: `
      <div class="pointer"></div>
    `,
      })}
    ></Marker>
  );
};

export default UserMarker;
