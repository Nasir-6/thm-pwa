import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isFuture, addDays } from 'date-fns'; // TODO: Improvements - Make own util functions and get rid of date-fns if not used a lot!
import { getTimesForAMosqueOnAGivenDate } from '@/lib/mosques';
import NextSalahSkeleton from '@/components/skeletons/NextSalahSkeleton';
import MosqueIcon from '@/icons/salah_times_icons/MosqueIcon';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../back-end/src/db/models/mosques';
// import { ReactComponent as MapIcon } from '../../../assets/mapIcon.svg';

type Props = {
  mosque: MosqueDTO;
};

type SalahName = 'Fajr' | 'Zuhr' | 'Asr' | 'Maghrib' | 'Isha';
type NextSalah = {
  name: SalahName;
  time: Date;
};

const MosqueCard: React.FC<Props> = ({ mosque }) => {
  const { data: mosqueTimesToday, isSuccess: isTodayLoaded } = useQuery({
    queryKey: ['mosquesTimes', mosque.id, 'today'], // Give Date give e.g 15/02/23 - Now the time! - as time changes but date is const
    queryFn: () => getTimesForAMosqueOnAGivenDate(mosque.id, new Date()),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  const { data: mosqueTimesTomorrow, isSuccess: isTomorrowLoaded } = useQuery({
    queryKey: ['mosquesTimes', mosque.id, 'tomorrow'], // Give Date give e.g 15/02/23 - Now the time! - as time changes but date is const
    queryFn: () => getTimesForAMosqueOnAGivenDate(mosque.id, addDays(new Date(), 1)),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  const [nextSalah, setNextSalah] = useState<NextSalah | undefined>();

  useEffect(() => {
    if ((!isTodayLoaded && !isTomorrowLoaded) || mosqueTimesToday === undefined || mosqueTimesTomorrow === undefined) return;

    let nextSalahObj: NextSalah = {
      name: 'Fajr',
      time: mosqueTimesTomorrow?.fajr,
    };

    const { id, mosqueId, mosqueName, date, ...salahTimesObj } = mosqueTimesToday;
    const salahInfoArr = Object.entries(salahTimesObj);
    for (let i = 0; i < salahInfoArr.length; i++) {
      const [name, time] = salahInfoArr[i];
      const salahName = (name[0].toUpperCase() + name.slice(1)) as SalahName;
      if (isFuture(time)) {
        nextSalahObj = {
          name: salahName,
          time,
        };
        break;
      }
    }

    setNextSalah(nextSalahObj);
  }, [mosqueTimesToday, mosqueTimesTomorrow]);

  return (
    <div className="mosque-card flex gap-3 justify-center px-2 py-3 border-t w-full max-w-xl self-center">
      <div className="map-details flex flex-col items-center justify-center py-2 text-xs text-slate-400">
        {/* <MapIcon width="25px" height="30px" /> */}
        <div className="w-6">
          <MosqueIcon />
        </div>
        <p className="distance">{mosque.distanceToLocationInMiles}</p>
        <p className="distance">Miles</p>
      </div>

      <div className="mosque-details flex flex-col text-left py-1 gap-0.5 items-start w-full">
        <h3 className="mosque-name font-semibold">{mosque.name}</h3>
        <p className="address text-sm text-slate-400">{mosque.address}</p>
        <button type="button" className="view-details-btn font-semibold text-accent-700 hover:text-accent-800 text-sm">
          View Details
        </button>
      </div>

      {isTodayLoaded && isTomorrowLoaded ? (
        <div className="next-salah py-1 flex flex-col items-center justify-center min-w-fit">
          <p className="font-bold text-xs text-primary-700">{nextSalah?.name}</p>
          <p className="font-bold text-xs text-primary-700">
            {nextSalah?.time.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
        </div>
      ) : (
        <NextSalahSkeleton />
      )}
    </div>
  );
};

export default MosqueCard;
