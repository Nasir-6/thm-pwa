import React from 'react';
import { DivIcon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

interface Props {
  position: {
    lat: number;
    lng: number;
  };
}

const MosqueIcon: React.FC<Props> = ({ position }) => {
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
    <Marker position={position} icon={mosqueIcon}>
      <Popup>
        Can insert some info about redcoat mosque here. Can insert pictures or
        text or even links here
      </Popup>
    </Marker>
  );
};

export default MosqueIcon;
