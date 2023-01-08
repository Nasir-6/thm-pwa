import React from 'react';
import { DivIcon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

interface Props {
  mosque: {
    name: string;
    position: {
      lat: number;
      lng: number;
    };
    address: string;
    url: string;
  }
}

const MosqueIcon: React.FC<Props> = ({ mosque }) => {
  const mosqueIcon = new DivIcon({
    // https://www.svgrepo.com/svg/302636/map-marker
    html: `
    <svg>
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"
      id="Shape"
      fill="#FF6E6E"
    ></path>
    <circle
      xmlns="http://www.w3.org/2000/svg"
      id="Oval"
      fill="#0C0058"
      fill-rule="nonzero"
      cx="14"
      cy="14"
      r="7"
    ></circle>
  </svg>`,
    className: '',
    iconSize: [24, 40],
    iconAnchor: [12, 40],
  });

  return (
    <Marker position={mosque.position} icon={mosqueIcon}>
      <Popup>
        <p>{mosque.name}</p>
        <p>{mosque.address}</p>
        <a href={mosque.url} target="_blank" >Get Directions</a>
      </Popup>
    </Marker>
  );
};

export default MosqueIcon;
