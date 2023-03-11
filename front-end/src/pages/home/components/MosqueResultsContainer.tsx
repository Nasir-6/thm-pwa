import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { getAllMosques } from '../../../api/mosques';
// import Skeleton from '../../../components/skeletons/Skeleton';
import useStore from '../../../stores/zustand';
import { sortMosquesByDistanceFromLocation } from '../../../util/location';
import MosqueCard from './MosqueCard';
import Pagination from './Pagination';
import SalahBeginningBtn from './SalahBeginningBtn';
import MosqueResultsContainerSkeleton from './skeletons/MosqueResultsContainerSkeleton';

// interface MosqueCardsContainerProps {
// }

const MosqueResultsContainer = () => {
  const userLocation = useStore((state) => state.userLocation);
  const defaultLocation: Position = {
    name: 'Redcoat Community Centre & Mosque',
    latitude: 51.51676049,
    longitude: -0.04810487669,
  };
  const [chosenLocation, setChosenLocation] = useState<Position>(defaultLocation);

  useEffect(() => {
    if (userLocation === undefined) return;
    setChosenLocation(userLocation);
  }, [userLocation]);

  const {
    data: mosques,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['mosques'],
    queryFn: () => getAllMosques(),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  const sortedMosquesArr = useMemo(() => {
    if (!mosques) return;
    // eslint-disable-next-line consistent-return
    return sortMosquesByDistanceFromLocation(mosques, chosenLocation);
  }, [mosques, chosenLocation]);

  const [currentPage, setCurrentPage] = useState(1);
  const [mosquesPerPage, setMosquesPerPage] = useState(5);
  const indexOfLastMosque = currentPage * mosquesPerPage;
  const indexOfFirstMosque = indexOfLastMosque - mosquesPerPage;

  const createMosqueCards = sortedMosquesArr
    ?.slice(indexOfFirstMosque, indexOfLastMosque)
    .map((mosque) => <MosqueCard key={mosque.id} mosque={mosque} />);

  if (isLoading) return <MosqueResultsContainerSkeleton />;

  return (
    <div className="mosque-results-container flex flex-col items-center w-full">
      <div className="list-info w-full max-w-xl flex justify-between p-2 text-left items-baseline">
        {mosques === undefined ? (
          <p>No mosques</p>
        ) : (
          <p className="location-identifier text-sm text-slate-500">{`${mosques?.length} Mosques Near "${chosenLocation.name}"`}</p>
        )}
        <form className="dropdown w-fit">
          <label htmlFor="numOfMosques" className="text-sm">
            Show
            <select id="numOfMosques" onChange={(event) => setMosquesPerPage(Number(event.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </form>
      </div>
      <SalahBeginningBtn />
      <div className="mosque-cards-container w-full flex flex-col justify-center">{createMosqueCards}</div>
      {isSuccess && (
        <Pagination
          mosquesPerPage={mosquesPerPage}
          totalMosques={mosques.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MosqueResultsContainer;
