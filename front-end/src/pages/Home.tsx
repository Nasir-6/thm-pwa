import React from 'react';
import { FaSearchLocation, FaLocationArrow } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {};

const Home = (props: Props) => {
  const position = {lat:51.51669455487648, lng: -0.04810539546076163};

  return (
    <div className="home-container p-4 flex flex-col">
      <div className="searchBox relative border-2 rounded-full flex gap-1 items-center">
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
      <MapContainer style={{width:"500px", height:"500px"}} center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Home;
