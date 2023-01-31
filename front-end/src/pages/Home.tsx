import React from 'react';
import DateTimeTest from './map/DateTimeTest';
import Map from './map/Map';
import SearchBar from './map/SearchBar';
// import DataProcessor from '../data/DataProcessor';

const Home = () => (
  <div className="home-container p-4 flex flex-col justify-center items-center">
    <SearchBar />
    <Map />
    {/* <DataProcessor/> */}
    <DateTimeTest />
  </div>
);

export default Home;
