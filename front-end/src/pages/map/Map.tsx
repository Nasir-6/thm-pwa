import React from 'react';
import { MapContainer, TileLayer, AttributionControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MosqueIcon from './MosqueIcon';

import mosqueData from '../../data/thm_mosques.json';

const position = { lat: 51.51669455487648, lng: -0.04810539546076163 };

const Map = () => {
  // console.log('mosqueData', mosqueData);
  const createMosqueIcons = mosqueData.map((mosque) => {
    // console.log('mosque', mosque);

    const mosqueDetails = {
      name: mosque['Masjid Name'],
      position: {
        lat: Number(mosque.Latitude),
        lng: Number(mosque.Longitude),
      },
      address: mosque.Address,
      url: mosque.url,
    };
    return <MosqueIcon mosque={mosqueDetails} />;
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
      {createMosqueIcons}
      <AttributionControl position="bottomright" prefix={false} />
    </MapContainer>
  );
};

export default Map;
