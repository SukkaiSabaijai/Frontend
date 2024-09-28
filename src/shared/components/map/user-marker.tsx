import { LatLngTuple, divIcon } from "leaflet";
import { Marker } from "react-leaflet";

type Props = {
  position: LatLngTuple;
};

const UserMarker = ({ position }: Props) => {
  const userLocationIcon = divIcon({
    className: "custom-pulse-icon",
    html: `
      <div class="pointer"></div>
    `,
  });

  return <Marker position={position} icon={userLocationIcon}></Marker>;
};

export default UserMarker;
