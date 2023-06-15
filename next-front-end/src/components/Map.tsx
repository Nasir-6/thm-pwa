import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, AttributionControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Map as LeafletMap } from 'leaflet'; // Need to alias so no issues with Duplicate Map Definition!
// import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
import MosqueIcon from './MosqueIcon';
// import { getAllMosques } from '../../../api/mosques';

const position = { lat: 51.5167, lng: -0.0481 };

interface Props {
  mosques: MosqueDTO[];
  isMapVisible: boolean;
}

const Map: React.FC<Props> = ({ mosques, isMapVisible }) => {
  // const { data: mosques } = useQuery({
  //   queryKey: ['mosques'],
  //   queryFn: () => getAllMosques(),
  //   staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  // });

  const createMosqueIcons = mosques?.map((mosque: MosqueDTO) => <MosqueIcon key={mosque.id} mosque={mosque} />);

  const [hasBeenRenderedOnce, setHasBeenRenderedOnce] = useState(false);

  useEffect(() => {
    if (!hasBeenRenderedOnce && isMapVisible) setHasBeenRenderedOnce(true);
  }, [isMapVisible]);

  const mapRef = useRef<LeafletMap>(null);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {hasBeenRenderedOnce && (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          attributionControl={false}
          className="leaflet-map-container"
          whenReady={() => {
            setTimeout(() => {
              if (mapRef.current) mapRef.current.invalidateSize();
            }, 200);
          }}
          ref={mapRef}>
          <TileLayer
            attribution=' <a href="https://leafletjs.com/">Leaflet</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://www.hotosm.org/" target="_blank">HOT</a> | <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap Fr</a>'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {mosques !== undefined ? createMosqueIcons : null}
          <AttributionControl position="bottomright" prefix={false} />
        </MapContainer>
      )}
    </>
  );
};

export default Map;
