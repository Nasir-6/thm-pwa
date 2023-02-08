import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../../back-end/src/db/models/mosques';
import useStore from '../../../stores/zustand';
import getDistanceToMosqueFromUserLocation from '../../../util/location';
import MosqueCard from './MosqueCard';

interface MosqueCardsContainerProps {
  mosques: MosqueDTO[] | undefined;
}

const MosqueCardsContainer: React.FC<MosqueCardsContainerProps> = ({ mosques }) => {
  const userLocation = useStore((state) => state.userLocation);
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
    setSortedMosquesArr(sortedMosques);
  }, [location, mosques]);

  const createMosqueCards = sortedMosquesArr?.map((mosque) => <MosqueCard mosque={mosque} />);

  return (
    <>
      <p>Mosque Card Container</p>
      {createMosqueCards}
    </>
  );
};

export default MosqueCardsContainer;
