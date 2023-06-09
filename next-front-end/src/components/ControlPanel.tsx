import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import SearchBar from './SearchBar';
import UseLocationBtn from './UseLocationBtn';

type Props = {
  isMapVisible: boolean;
  setIsMapVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ControlPanel: React.FC<Props> = ({ isMapVisible, setIsMapVisible }) => (
  <div className="control-panel w-full py-2 px-3 flex flex-col items-center">
    <SearchBar />
    <div className="bottom-options flex w-full max-w-xl justify-between py-1 px-2">
      <UseLocationBtn />
      <button
        type="button"
        onClick={() => setIsMapVisible(!isMapVisible)}
        className="show-map flex gap-1 items-center font-semibold text-accent-700 hover:text-accent-800">
        {isMapVisible ? (
          <>
            <FiEyeOff className="" />
            <p>Hide Map</p>
          </>
        ) : (
          <>
            <FiEye className="" />
            <p>Show Map</p>
          </>
        )}
      </button>
    </div>
  </div>
);

export default ControlPanel;
