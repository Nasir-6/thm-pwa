import Skeleton from './Skeleton';
import MosqueCardSkeleton from './MosqueCardSkeleton';

const MosqueResultsContainerSkeleton = () => (
  <div className="mosque-results-container flex flex-col items-center w-full">
    <div className="list-info w-full max-w-xl flex justify-between p-2 text-left items-baseline">
      <Skeleton type="text-sm" width={15} />
      <Skeleton type="text-sm" width={4} />
    </div>
    <div className="mosque-cards-container w-full flex flex-col justify-center">
      {[1, 2, 3, 4, 5].map((num) => (
        <MosqueCardSkeleton key={num} />
      ))}
    </div>
    <Skeleton type="text-sm" width={20} lines={2} />
  </div>
);

export default MosqueResultsContainerSkeleton;
