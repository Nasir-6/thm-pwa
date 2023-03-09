import Skeleton from '../../../../components/skeletons/Skeleton';
// import NextSalahSkeleton from './NextSalahSkeleton';

const MosqueCardSkeleton = () => (
  <div className="mosque-card flex gap-3 justify-center px-2 py-3 border-t w-full max-w-xl self-center">
    <div className="map-details flex flex-col items-center justify-center py-2 text-xs text-slate-400">
      <Skeleton type="map-icon" />
      <Skeleton type="text-xs" lines={2} />
    </div>

    <div className="mosque-details flex flex-col text-left py-1 gap-0.5 items-start w-full">
      <Skeleton type="text" width={10} />
      <Skeleton type="text-sm" width={13} />
      <Skeleton type="text-sm" width={5} />
    </div>

    {/* <NextSalahSkeleton /> */}
  </div>
);

export default MosqueCardSkeleton;
