import React from 'react';
import { MapContainer, TileLayer, AttributionControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../../back-end/src/db/models/mosques';
import MosqueIcon from './MosqueIcon';
import { getAllMosques } from '../../../api/mosques';

const position = { lat: 51.5167, lng: -0.0481 };

interface Props {
  isMapVisible: boolean;
}

const Map: React.FC<Props> = ({ isMapVisible }) => {
  const { data: mosques, isSuccess } = useQuery({
    queryKey: ['mosques'],
    queryFn: () => getAllMosques(),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  const createMosqueIcons = mosques?.map((mosque: MosqueDTO) => {
    const mosqueDetails = {
      name: mosque.name,
      position: {
        lat: mosque.latitude,
        lng: mosque.longitude,
      },
      address: mosque.address,
      url: mosque.googleUrl,
    };
    return <MosqueIcon key={mosque.id} mosque={mosqueDetails} />;
  });

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isMapVisible && (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} attributionControl={false} className="map-container">
          <TileLayer
            attribution=' <a href="https://leafletjs.com/">Leaflet</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://www.hotosm.org/" target="_blank">HOT</a> | <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap Fr</a>'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {isSuccess && createMosqueIcons}
          <AttributionControl position="bottomright" prefix={false} />
        </MapContainer>
      )}
    </>
  );
};

export default Map;
