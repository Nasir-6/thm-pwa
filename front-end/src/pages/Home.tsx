import React from 'react';
import { FaSearchLocation, FaLocationArrow } from 'react-icons/fa';
import { MapContainer, TileLayer, AttributionControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MosqueIcon from './map/MosqueIcon';
import DataProcessor from '../data/DataProcessor';

type Props = {};

const Home = (props: Props) => {
  const position = { lat: 51.51669455487648, lng: -0.04810539546076163 };

  return (
    <div className="home-container p-4 flex flex-col justify-center items-center">
      <div className="searchBox relative border-2 rounded-full flex gap-1 items-center w-full max-w-xl mb-3">
        <FaSearchLocation className=" absolute left-2 " />
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Search by Mosque or Postcode"
          className=" pl-8 pr-8 py-2 w-full rounded-full"
        />
        <FaLocationArrow className=" absolute right-2" />
      </div>
      <MapContainer
        style={{ width: '100%', height: '500px', zIndex: 0 }}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <TileLayer
          attribution=' <a href="https://leafletjs.com/">Leaflet</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://www.hotosm.org/" target="_blank">HOT</a> | <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap Fr</a>'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <MosqueIcon position={position} />
        <AttributionControl position="bottomright" prefix={false} />
      </MapContainer>
      <DataProcessor/>
    </div>
  );
};

export default Home;
