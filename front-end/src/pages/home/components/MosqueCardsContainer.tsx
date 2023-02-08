import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../../back-end/src/db/models/mosques';
import { getAllMosques } from '../../../api/mosques';
import useStore from '../../../stores/zustand';
import { sortMosquesByDistanceFromLocation } from '../../../util/location';
import MosqueCard from './MosqueCard';

// interface MosqueCardsContainerProps {
// }

const MosqueCardsContainer = () => {
  const userLocation = useStore((state) => state.userLocation);
  const defaultLocation: Position = {
    name: 'East London Mosque',
    latitude: 51.51757166,
    longitude: -0.06548708235,
  };
  const [chosenLocation, setChosenLocation] = useState<Position>(defaultLocation);

  useEffect(() => {
    if (userLocation === undefined) return;
    setChosenLocation(userLocation);
  }, [userLocation]);

  const { data: mosques } = useQuery({
    queryKey: ['mosques'],
    queryFn: () => getAllMosques(),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  const [sortedMosquesArr, setSortedMosquesArr] = useState<MosqueDTO[] | undefined>();
  useEffect(() => {
    if (mosques === undefined) return;
    setSortedMosquesArr(sortMosquesByDistanceFromLocation(mosques, chosenLocation));
  }, [chosenLocation, mosques]);

  const createMosqueCards = sortedMosquesArr?.map((mosque) => <MosqueCard mosque={mosque} />);

  return (
    <>
      <div className="list-info w-full max-w-xl flex justify-between p-3">
        {/* Need to sort out loading and empty states!! */}
        {mosques === undefined ? (
          <p>No mosques</p>
        ) : (
          <p className="location-identifier text-slate-500">{`${mosques?.length} Mosques Near "${chosenLocation.name}"`}</p>
        )}
        <form>
          <label htmlFor="numOfMosques">
            Showing
            <select id="numOfMosques">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </form>
      </div>
      {createMosqueCards}
    </>
  );
};

export default MosqueCardsContainer;
