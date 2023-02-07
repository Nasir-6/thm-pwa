import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import ControlPanel from './components/ControlPanel';
// import DateTimeTest from './components/DateTimeTest';
import Map from './components/Map';
import MosqueCard from './components/MosqueCard';
import { getAllMosques } from '../../api/mosques';
// import DataProcessor from '../data/DataProcessor';
import './Home.css';

const Home = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const screenBreakPoint = 1024;
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth > screenBreakPoint);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    mediaQuery.addEventListener('change', () => setIsDesktopView(mediaQuery.matches));
    // this is the cleanup function to remove the listener
    return () => mediaQuery.removeEventListener('change', () => setIsDesktopView(mediaQuery.matches));
  }, []);

  const { data: mosques, isSuccess } = useQuery({
    queryKey: ['mosques'],
    queryFn: () => getAllMosques(),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  const createMosqueCards = mosques?.map((mosque) => <MosqueCard mosque={mosque} />);

  return (
    <div className={`home-page-container flex ${isDesktopView ? 'flex-row' : 'flex-col'}`}>
      {isDesktopView ? (
        <>
          <div className="flex-grow min-w-max p-1 flex flex-col items-center">
            <ControlPanel isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
            {isSuccess && createMosqueCards}
            {/* <DateTimeTest /> */}
          </div>
          <Map isMapVisible={isMapVisible} mosques={mosques} />
        </>
      ) : (
        <>
          <ControlPanel isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
          <Map isMapVisible={isMapVisible} mosques={mosques} />
          {isSuccess && createMosqueCards}
          {/* <DateTimeTest /> */}
        </>
      )}
    </div>
  );
};

export default Home;
