import React from 'react';
import { FaSearchLocation, FaLocationArrow } from 'react-icons/fa';
import Map from './map/Map';
// import DataProcessor from '../data/DataProcessor';

type Props = {};

const Home = (props: Props) => {

  return (
    <div className="home-container p-4 flex flex-col justify-center items-center">
      <div className="searchBox relative border-2 rounded-full flex gap-1 items-center w-full max-w-xl mb-3">
        <FaSearchLocation className=" absolute left-2 " />
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Search by Mosque or Postcode"
          className=" pl-8 pr-8 py-2 w-full rounded-full"
        />
        <FaLocationArrow className=" absolute right-2" />
      </div>
      <Map/>
      {/* <DataProcessor/> */}
    </div>
  );
};

export default Home;
