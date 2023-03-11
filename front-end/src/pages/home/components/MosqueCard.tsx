import React from 'react';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../../back-end/src/db/models/mosques';
import { ReactComponent as MapIcon } from '../../../assets/mapIcon.svg';

type Props = {
  mosque: MosqueDTO;
};

const MosqueCard: React.FC<Props> = ({ mosque }) => (
  <div className="mosque-card flex gap-3 justify-center px-2 py-3 border-t w-full max-w-xl self-center">
    <div className="map-details flex flex-col items-center justify-center text-xs text-slate-400">
      <MapIcon width="25px" height="30px" />
      {/* <p className="distance">{mosque.distanceToLocationInMiles}</p>
      <p className="distance">Miles</p> */}
    </div>

    <div className="mosque-details flex flex-col text-left py-1 gap-0.5 items-start w-full">
      <h3 className="mosque-name font-semibold">{mosque.name}</h3>
      <p className="address text-sm text-slate-400">{mosque.address}</p>
      <button type="button" className="view-details-btn font-semibold text-accent-700 hover:text-accent-800 text-sm">
        View Details
      </button>
    </div>

    <div className="map-details flex items-start text-xs text-slate-400 min-w-fit py-1">
      <p className="distance">{mosque.distanceToLocationInMiles} Miles</p>
    </div>
  </div>
);

export default MosqueCard;
