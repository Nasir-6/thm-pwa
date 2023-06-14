import React from 'react';
import { DivIcon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';

interface Props {
  mosque: MosqueDTO;
}

const MosqueIcon: React.FC<Props> = ({ mosque }) => {
  const mosqueIcon = new DivIcon({
    // https://www.svgrepo.com/svg/302636/map-marker
    html: `
    <svg viewBox="0 0 30 45" width="30px" height="45px">
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"
      id="Shape"
      fill="#ea7200"
    ></path>
    <circle
      xmlns="http://www.w3.org/2000/svg"
      id="Oval"
      fill="#163037"
      fill-rule="nonzero"
      cx="14"
      cy="14"
      r="7"
    ></circle>
  </svg>`,
    className: '',
    // iconSize: [12, 10],
    iconAnchor: [12, 40],
  });

  return (
    <Marker position={{ lat: mosque.latitude, lng: mosque.longitude }} icon={mosqueIcon}>
      <Popup>
        <p>{mosque.name}</p>
        <a href={mosque.googleUrl} target="_blank" rel="noreferrer">
          Get Directions
        </a>
      </Popup>
    </Marker>
  );
};

export default MosqueIcon;
