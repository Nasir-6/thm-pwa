import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { getAllMosques } from '../../../api/mosques';
import useStore from '../../../stores/zustand';
import { sortMosquesByDistanceFromLocation } from '../../../util/location';
import MosqueCard from './MosqueCard';
import Pagination from './Pagination';

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

  const { data: mosques, isSuccess } = useQuery({
    queryKey: ['mosques'],
    queryFn: () => getAllMosques(),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  const sortedMosquesArr = useMemo(() => {
    if (!mosques) return;
    // eslint-disable-next-line consistent-return
    return sortMosquesByDistanceFromLocation(mosques, chosenLocation);
  }, [mosques, chosenLocation]);

  // TODO: slice according to selection
  const [currentPage, setCurrentPage] = useState(6);
  const [mosquesPerPage, setMosquesPerPage] = useState(5);
  const indexOfLastMosque = currentPage * mosquesPerPage;
  const indexOfFirstMosque = indexOfLastMosque - mosquesPerPage;

  const createMosqueCards = sortedMosquesArr
    ?.slice(indexOfFirstMosque, indexOfLastMosque)
    .map((mosque) => <MosqueCard key={mosque.id} mosque={mosque} />);

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
            <select id="numOfMosques" onChange={(event) => setMosquesPerPage(Number(event.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </form>
      </div>
      {createMosqueCards}
      {isSuccess && (
        <Pagination
          mosquesPerPage={mosquesPerPage}
          totalMosques={mosques.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default MosqueCardsContainer;
