import Link from 'next/link';
import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import SearchBar from './SearchBar';
// import UseLocationBtn from './UseLocationBtn';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';

type Props = {
  mosques: MosqueDTO[];
  isMapVisible: boolean;
  setIsMapVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ControlPanel = ({ mosques, isMapVisible, setIsMapVisible }: Props) => (
  // TODO: Split component

  <div className="control-panel w-full py-2 px-3 flex flex-col items-center">
    <SearchBar mosques={mosques} />
    <div className="bottom-options flex w-full max-w-xl justify-between py-1 px-2">
      {/* TODO: Replace UseLocationBtn with arrow and findNearestMosque Link */}
      <Link
        href="/findnearestmosque"
        className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-400 hover:text-accent-600">
        Find Nearest Mosque
      </Link>
      {/* <UseLocationBtn /> */}
      <button
        type="button"
        onClick={() => setIsMapVisible(!isMapVisible)}
        className="show-map flex gap-1 items-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-400 hover:text-accent-600">
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
    </div>
  </div>
);

export default ControlPanel;
