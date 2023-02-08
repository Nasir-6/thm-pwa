import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import ControlPanel from './components/ControlPanel';
// import DateTimeTest from './components/DateTimeTest';
import Map from './components/Map';
import { getAllMosques } from '../../api/mosques';
// import DataProcessor from '../data/DataProcessor';
import './Home.css';
import MosqueCardsContainer from './components/MosqueCardsContainer';

const Home = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const screenBreakPoint = 1024;
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth > screenBreakPoint);

  const { data: mosques } = useQuery({
    queryKey: ['mosques'],
    queryFn: () => getAllMosques(),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

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
            <MosqueCardsContainer mosques={mosques} />
            {/* <DateTimeTest /> */}
          </div>
          <Map isMapVisible={isMapVisible} mosques={mosques} />
        </>
      ) : (
        <>
          <ControlPanel isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
          <Map isMapVisible={isMapVisible} mosques={mosques} />
          <MosqueCardsContainer mosques={mosques} />
          {/* <DateTimeTest /> */}
        </>
      )}
    </div>
  );
};

export default Home;
