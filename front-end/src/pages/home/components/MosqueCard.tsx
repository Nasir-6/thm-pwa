import React from 'react';
import { ReactComponent as MapIcon } from '../../../assets/mapIcon.svg';
// type Props = {}

const MosqueCard = () => {
  console.log('Hello');
  return (
    <div className="mosque-card flex gap-3 justify-center px-2 py-3 border-t w-fit self-center">
      <div className="map-details flex flex-col items-center justify-center py-2 text-xs text-slate-400">
        <MapIcon width="25px" height="30px" />
        <p className="distance">0.79</p>
        <p className="distance">Miles</p>
      </div>

      <div className="mosque-details flex flex-col text-left py-1 gap-0.5 items-start">
        <h3 className="mosque-name font-semibold">Redcoat Community Center & Mosque</h3>
        <p className="address text-sm text-slate-400">256 Stepney Way, London, E1 3DW</p>
        <button type="button" className="view-details-btn font-semibold text-accent-700 hover:text-accent-800 text-sm">
          View Details
        </button>
      </div>

      <div className="next-salah py-1 flex flex-col items-center justify-center min-w-fit">
        <p className="font-bold text-xs text-primary-700">Isha</p>
        <p className="font-bold text-xs text-primary-700">07:30 PM</p>
      </div>
    </div>
  );
};

export default MosqueCard;
