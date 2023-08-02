'use client';

import { FiEye, FiEyeOff } from 'react-icons/fi';

type Props = {
  isMapVisible: boolean;
  setIsMapVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowMapBtn = ({ isMapVisible, setIsMapVisible }: Props) => (
  <button
    type="button"
    onClick={() => setIsMapVisible(!isMapVisible)}
    className="map-btn flex gap-1 items-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-400 hover:text-accent-600">
    {isMapVisible ? (
      <>
        <FiEyeOff className=" text-accent-600" />
        <p>Hide Map</p>
      </>
    ) : (
      <>
        <FiEye className="text-accent-600" />
        <p>Show Map</p>
      </>
    )}
  </button>
);

export default ShowMapBtn;
