'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SunIcon from '@/icons/salah_times_icons/SunIcon';
import { getJumuahTimesForAMosque } from '@/lib/mosques';
import { formatJumuahTime } from '@/util/datesfns';

// type Props = {}

const MosqueJumuahTimes = ({ mosqueId }: { mosqueId: number }) => {
  const { data: jumuahTimes } = useQuery({
    queryKey: ['jumuahTimes', mosqueId],
    queryFn: () => getJumuahTimesForAMosque(mosqueId),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });
  const jumuahRows = [jumuahTimes?.firstTime, jumuahTimes?.secondTime].map((timeString, index) => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (!timeString) return <></>;
    return (
      // eslint-disable-next-line react/no-array-index-key
      <div key={index} className="flex justify-between px-4 py-5 border-t">
        <div className="lhs flex gap-2">
          <SunIcon isCurrentSalahTime={false} />
          <p>{index === 0 ? "1st Jumu'ah" : "2nd Jumu'ah"}</p>
        </div>
        <p>{formatJumuahTime(timeString)}</p>
      </div>
    );
  });

  return (
    <>
      {jumuahRows}
      <div className="p-3 border-t">
        <p>
          *Please note the times stated are <strong>Khutbah times</strong>.
        </p>
        <p>
          If you notice any changes please contact us at:{' '}
          <a className=" font-semibold text-gradient-gold" href="mailto:towerhamletsmosques@gmail.com">
            towerhamletsmosques@gmail.com
          </a>
        </p>
      </div>
    </>
  );
};

export default MosqueJumuahTimes;
