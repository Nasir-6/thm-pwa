import React from 'react';
import Map from './map/Map';
import SearchBar from './map/SearchBar';
// import DataProcessor from '../data/DataProcessor';

type Props = {};

const Home = (props: Props) => {

  return (
    <div className="home-container p-4 flex flex-col justify-center items-center">
      <SearchBar/>
      <Map/>
      {/* <DataProcessor/> */}
    </div>
  );
};

export default Home;
