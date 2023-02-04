import React, { useState } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import DateTimeTest from './components/DateTimeTest';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
// import DataProcessor from '../data/DataProcessor';
import './Home.css';

const Home = () => {
  const [isUsingLocation, setIsUsingLocation] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  return (
    <div className={`home-page-container ${isMapVisible ? '' : 'home-page-container--hide-map'}`}>
      <div className="control-panel w-full py-2 px-3 flex flex-col items-center">
        <SearchBar />
        <div className="bottom-options flex w-full max-w-xl justify-between py-1 px-2">
          <button
            type="button"
            onClick={() => setIsUsingLocation(!isUsingLocation)}
            className={`use-location flex gap-1 items-center font-semibold ${isUsingLocation ? 'text-primary-500' : 'text-accent-700'} ${
              isUsingLocation ? 'hover:text-primary-700' : 'hover:text-accent-800'
            }`}>
            <MdOutlineMyLocation className="" />
            {isUsingLocation ? 'Using Location' : 'Use Location'}
          </button>
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
      <Map isMapVisible={isMapVisible} />
      {/* <DataProcessor/> */}
      <DateTimeTest />
    </div>
  );
};

export default Home;
