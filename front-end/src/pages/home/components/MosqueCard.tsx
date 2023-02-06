import React from 'react';
import { ReactComponent as MapIcon } from '../../../assets/mapIcon.svg';
// type Props = {}

const MosqueCard = () => {
  console.log('Hello');
  return (
    <div className="mosque-card flex gap-2 justify-center px-1 py-3 border-t w-fit self-center">
      <div className="map-details flex flex-col items-center justify-center px-1 py-2">
        <MapIcon width="25px" height="30px" />
        <p className="distance text-xs text-slate-500 ">0.79</p>
        <p className="distance text-xs text-slate-500">Miles</p>
      </div>

      <div className="mosque-details flex flex-col text-left p-1 gap-1 items-start">
        <h3 className="mosque-name font-semibold text-ellipsis">Redcoat Community Center & Mosque</h3>
        <p className="address text-sm text-slate-500">256 Stepney Way, London, E1 3DW</p>
        <button type="button" className="view-details-btn font-semibold text-accent-700 hover:text-accent-800 text-sm">
          View Details
        </button>
      </div>

      <div className="next-salah p-1 flex flex-col items-center justify-center min-w-fit">
        <p className="font-bold text-xs text-primary-700">Isha</p>
        <p className="font-bold text-xs text-primary-700">07:30 PM</p>
      </div>
    </div>
  );
};

export default MosqueCard;
