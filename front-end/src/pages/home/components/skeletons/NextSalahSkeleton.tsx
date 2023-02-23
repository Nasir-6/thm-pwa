import React from 'react';
import Skeleton from '../../../../components/skeletons/Skeleton';

const NextSalahSkeleton = () => (
  <div className="next-salah py-1 flex flex-col items-center justify-center w-14">
    <Skeleton type="text-xs" lines={2} width={3.25} />
  </div>
);

export default NextSalahSkeleton;
