import { useState, useEffect, lazy, Suspense } from 'react';
import ControlPanel from './components/ControlPanel';
// import DateTimeTest from './components/DateTimeTest';
// import Map from './components/Map';
// import DataProcessor from '../data/DataProcessor';
import './Home.css';
import MosqueResultsContainer from './components/MosqueResultsContainer';

const Map = lazy(() => import('./components/Map'));

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
    <div className={`home-page-container flex ${isDesktopView ? 'flex-row' : 'flex-col'}`}>
      {isDesktopView ? (
        <>
          <div className="flex-grow min-w-max p-1 flex flex-col items-center">
            <ControlPanel isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
            <MosqueResultsContainer />
            {/* <DateTimeTest /> */}
          </div>
          <div className={`map-div ${isMapVisible ? '' : 'map-div-hide'}`}>
            <Suspense fallback={<h1>Loading...</h1>}>{isMapVisible && <Map isMapVisible={isMapVisible} />}</Suspense>
          </div>
        </>
      ) : (
        <>
          <ControlPanel isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
          <div className={`map-div ${isMapVisible ? '' : 'map-div-hide'}`}>
            <Suspense fallback={<h1>Loading...</h1>}>{isMapVisible && <Map isMapVisible={isMapVisible} />}</Suspense>
          </div>
          <MosqueResultsContainer />
          {/* <DateTimeTest /> */}
        </>
      )}
    </div>
  );
};

export default Home;
