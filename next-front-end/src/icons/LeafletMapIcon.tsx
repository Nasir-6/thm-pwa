import React from 'react';
import { DivIcon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import Link from 'next/link';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';

interface Props {
  mosque: MosqueDTO;
}

const LeafletMapIcon: React.FC<Props> = ({ mosque }) => {
  const mosqueIcon = new DivIcon({
    // https://www.svgrepo.com/svg/302636/map-marker
    html: `
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 15 15">
  <path fill="#167789" d="M7 1a3.75 3.75 0 0 0-3.38 5.37L7 13l3.34-6.55A3.75 3.75 0 0 0 7 1Zm0 6a2.25 2.25 0 1 1 0-4.5A2.25 2.25 0 0 1 7 7Z"/>
  <circle cx="7" cy="5" r="3" fill="#167789"/>
  <path fill="#ffa24f" d="m9.95 4.88-.78-.78V3c0-.1-.08-.17-.17-.17H7.9l-.78-.78a.18.18 0 0 0-.24 0l-.78.78H5c-.1 0-.17.08-.17.17v1.1l-.78.78a.18.18 0 0 0 0 .24l.78.78V7c0 .1.08.17.17.17h1.1l.78.78c.06.07.18.07.24 0l.78-.78H9c.1 0 .17-.08.17-.17V5.9l.78-.78a.18.18 0 0 0 0-.24Zm-2 1.94h-.12c-.05 0-.1.02-.13.05l-.7.7-.7-.7a.18.18 0 0 0-.13-.05h-.12v-.9h1.9v.9ZM6.06 5.58c.22-1.03 1.66-1.03 1.88 0H6.06Zm2.81.12a.18.18 0 0 0-.05.13v1h-.51V5.74c0-.66-.5-1.2-1.13-1.29V4.3a.55.55 0 0 0 .21-.13.18.18 0 1 0-.25-.25c-.12.12-.34.03-.34-.14 0-.11.09-.2.2-.2a.18.18 0 0 0 0-.36c-.63.02-.76.87-.18 1.08v.16a1.3 1.3 0 0 0-1.13 1.3v1.06h-.51v-1c0-.04-.02-.08-.05-.12l-.7-.7.7-.7a.18.18 0 0 0 .05-.13v-1h1c.04 0 .08-.01.12-.04l.7-.7.7.7c.04.03.08.05.13.05h1v1c0 .04.01.08.04.12l.7.7-.7.7Z"/>
</svg>
  `,
    className: '',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });

  return (
    <Marker position={{ lat: mosque.latitude, lng: mosque.longitude }} icon={mosqueIcon}>
      <Popup>
        <h2 className="text-lg font-bold">{mosque.name}</h2>
        <p className="">{mosque.address}</p>

        <div className="flex gap-2">
          <button
            type="button"
            className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-400 hover:text-accent-600">
            View Details
          </button>
          <Link href={mosque.googleUrl} target="_blank">
            {/* Make it a button so can adjust the color - without .leaflet-container a {} overwriting it */}
            <button
              type="button"
              className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400 hover:text-primary-600">
              Get Directions
            </button>
          </Link>
        </div>
      </Popup>
    </Marker>
  );
};

export default LeafletMapIcon;
