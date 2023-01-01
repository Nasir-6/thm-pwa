import React from 'react';
import { FaSearchLocation, FaLocationArrow } from 'react-icons/fa';

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="home-container p-4 flex flex-col">
      <div className="searchBox relative border-2 rounded-full flex gap-1 items-center">
        <FaSearchLocation className=" absolute left-2 " />
        <input type="text" name="location" id="location" placeholder='Search by Mosque or Postcode' className=' pl-8 pr-8 py-2 w-full rounded-full' />
        <FaLocationArrow className=' absolute right-2' />
      </div>
    </div>
  );
};

export default Home;
