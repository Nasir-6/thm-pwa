import React from 'react';
import Skeleton from './Skeleton';

const SalahTimesRowsSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
      <div key={i} className="flex justify-between px-4 py-5 border-t">
        <div className="lhs flex gap-2">
          <Skeleton type="text" lines={1} width={1.5} />
          <Skeleton type="text" lines={1} width={3.25} />
        </div>
        <Skeleton type="text" lines={1} width={2.75} />
      </div>
    ))}
  </>
);

export default SalahTimesRowsSkeleton;
