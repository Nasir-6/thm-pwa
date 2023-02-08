import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import ControlPanel from './components/ControlPanel';
// import DateTimeTest from './components/DateTimeTest';
import Map from './components/Map';
import MosqueCard from './components/MosqueCard';
import { getAllMosques } from '../../api/mosques';
import getDistanceToMosqueFromUserLocation from '../../util/location';
// import DataProcessor from '../data/DataProcessor';
import './Home.css';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../back-end/src/db/models/mosques';
import useStore from '../../stores/zustand';

const Home = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const screenBreakPoint = 1024;
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth > screenBreakPoint);
  const userLocation = useStore((state) => state.userLocation);

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
  // Code for locations - but haven't calculated distances
  const [location, setLocation] = useState<Position>({
    name: 'East London Mosque',
    latitude: 51.51757166,
    longitude: -0.06548708235,
  });
  useEffect(() => {
    if (userLocation === undefined) return;
    setLocation(userLocation);
  }, [userLocation]); // Change this to the useLocation button

  const [sortedMosquesArr, setSortedMosquesArr] = useState<MosqueDTO[] | undefined>();
  useEffect(() => {
    if (mosques === undefined) return;
    const updatedLocationMosques = mosques.map((mosque) => ({
      ...mosque,
      distanceToLocationInMiles: getDistanceToMosqueFromUserLocation(location, mosque.latitude, mosque.longitude),
    }));
    const sortedMosques = updatedLocationMosques.sort((a, b) => (a.distanceToLocationInMiles > b.distanceToLocationInMiles ? 1 : -1));
    console.log('sortedMosques', sortedMosques);
    setSortedMosquesArr(sortedMosques);
  }, [location, mosques]);

  const createMosqueCards = sortedMosquesArr?.map((mosque) => <MosqueCard mosque={mosque} />);

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
