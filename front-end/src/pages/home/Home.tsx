import React, { useState, useEffect } from 'react';
import ControlPanel from './components/ControlPanel';
import DateTimeTest from './components/DateTimeTest';
import Map from './components/Map';
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

  return (
    <div className={`home-page-container ${isDesktopView ? 'flex-row' : 'flex-col'}`}>
      {isDesktopView ? (
        <>
          <div className="flex-grow min-w-max p-1">
            <ControlPanel isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
            <DateTimeTest />
          </div>
          <Map isMapVisible={isMapVisible} />
        </>
      ) : (
        <>
          <ControlPanel isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
          <Map isMapVisible={isMapVisible} />
          <DateTimeTest />
        </>
      )}
    </div>
  );
};

export default Home;
