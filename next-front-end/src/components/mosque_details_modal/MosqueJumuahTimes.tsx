'use client';
import SunIcon from '@/icons/salah_times_icons/SunIcon';
import { getJumuahTimesForAMosque } from '@/lib/mosques';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

// type Props = {}

const MosqueJumuahTimes = ({ mosqueId }: { mosqueId: number }) => {
  const { data: jumuahTimes, isSuccess } = useQuery({
    queryKey: ['jumuahTimes', mosqueId],
    queryFn: () => getJumuahTimesForAMosque(mosqueId),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });
  const jumuahRows = [jumuahTimes?.firstTime, jumuahTimes?.secondTime].map((timeString, index) => {
    if (!timeString) return;
    const [hrs, mins, secs] = timeString.split(':').map(Number);
    const dateTimeObj = new Date();
    dateTimeObj.setUTCHours(hrs, mins, secs);
    return (
      <div key={index} className={`flex justify-between px-4 py-5 border-t`}>
        <div className="lhs flex gap-2">
          <SunIcon isCurrentSalahTime={false} />
          <p>{index === 0 ? "1st Jumu'ah" : "2nd Jumu'ah"}</p>
        </div>
        <p>
          {dateTimeObj
            ?.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              // hour12: true,
            })
            .replace(/\s?[AP]M/, '')}
          {/* Remove AM/PM with replace function! */}
        </p>
      </div>
    );
  });

  return (
    <>
      {jumuahRows}
      <div className="p-2">
        *Please note the times stated are Khutbah times. If you notice any changes please contact us at: towerhamletsmosques@gmail.com
      </div>
    </>
  );
};

export default MosqueJumuahTimes;
