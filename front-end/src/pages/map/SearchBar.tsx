import React from 'react';
import { FaSearchLocation, FaLocationArrow } from 'react-icons/fa';

const SearchBar = () => (
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
);

export default SearchBar;
