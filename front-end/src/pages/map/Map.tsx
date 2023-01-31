import React from 'react';
import { MapContainer, TileLayer, AttributionControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../back-end/src/db/models/mosques';
import MosqueIcon from './MosqueIcon';
import useMosqueApi from '../../api/mosque';

// import mosqueData from '../../data/thm_mosques.json';
const { getAllMosques } = useMosqueApi();

const position = { lat: 51.51669455487648, lng: -0.04810539546076163 };

const Map = () => {
  const { data: mosques, isSuccess } = useQuery({ queryKey: ['mosques'], queryFn: () => getAllMosques(), staleTime: 1000 * 60 * 10 });

  console.log('mosques', mosques);

  const createMosqueIcons = mosques?.map((mosque: MosqueDTO) => {
    console.log('typeof mosque.latitude', typeof mosque.latitude);
    const mosqueDetails = {
      name: mosque.name,
      position: {
        lat: Number(mosque.latitude),
        lng: Number(mosque.longitude),
      },
      address: mosque.address,
      url: mosque.googleUrl,
    };
    return <MosqueIcon key={mosque.id} mosque={mosqueDetails} />;
  });

  return (
    <MapContainer
      style={{ width: '100%', height: '500px', zIndex: 0 }}
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      attributionControl={false}>
      <TileLayer
        attribution=' <a href="https://leafletjs.com/">Leaflet</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://www.hotosm.org/" target="_blank">HOT</a> | <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap Fr</a>'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {isSuccess && createMosqueIcons}
      <AttributionControl position="bottomright" prefix={false} />
    </MapContainer>
  );
};

export default Map;
