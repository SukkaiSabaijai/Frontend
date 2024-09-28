import L, { LatLngTuple } from "leaflet";
import { Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

type data = {
  id: number;
  name: string;
  position: LatLngTuple;
};

type Props = {
  locations: { id: number; name: string; position: number[]; }[]
  icon: L.Icon;
  handleMarkerClicked: (position: LatLngTuple) => L.LeafletEventHandlerFnMap;
};

const ClusterGroupMarker = ({
  locations,
  icon,
  handleMarkerClicked,
}: Props) => {
  return (
    <MarkerClusterGroup maxClusterRadius={50}>
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={location.position as LatLngTuple}
          icon={icon}
          eventHandlers={handleMarkerClicked(location.position as LatLngTuple)}
        ></Marker>
      ))}
    </MarkerClusterGroup>
  );
};

export default ClusterGroupMarker;
