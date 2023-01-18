import React from 'react';
import Map from './map/Map';
import SearchBar from './map/SearchBar';
// import DataProcessor from '../data/DataProcessor';

const Home = () => (
  <div className="home-container p-4 flex flex-col justify-center items-center">
    <SearchBar />
    <Map />
    {/* <DataProcessor/> */}
  </div>
);

export default Home;
