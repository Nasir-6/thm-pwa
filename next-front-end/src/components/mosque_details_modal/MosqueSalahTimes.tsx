import LeftChevronIcon from '@/icons/salah_times_icons/LeftChevronIcon';
import RightChevronIcon from '@/icons/salah_times_icons/RightChevronIcon';
import { getTimesForAMosqueOnAGivenDate } from '@/lib/mosques';
import { useQuery } from '@tanstack/react-query';
import { addDays, isFuture, subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DatePickerBtn from '../salah_beginning_modal/DatePickerBtn';
import SalahTimesRowsEmptyState from '../salah_beginning_modal/SalahTimesRowsEmptyState';
import SalahTimesRowsSkeleton from '../skeletons/SalahTimesRowsSkeleton';
import MosqueSalahTimesRows from './MosqueSalahTimesRows';

type Props = {
  mosqueId: number;
};

const MosqueSalahTimes = ({ mosqueId }: Props) => {
  const { data: salahTimesToday, isSuccess: isTodayLoaded } = useQuery({
    queryKey: ['salahTimes', 'today', mosqueId], // Give Date give e.g 15/02/23 - Now the time! - as time changes but date is const
    queryFn: () => getTimesForAMosqueOnAGivenDate(mosqueId, new Date()),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  const { data: salahTimesTomorrow, isSuccess: isTomorrowLoaded } = useQuery({
    queryKey: ['salahTimes', 'tomorrow', mosqueId], // Give Date give e.g 15/02/23 - Now the time! - as time changes but date is const
    queryFn: () => getTimesForAMosqueOnAGivenDate(mosqueId, addDays(new Date(), 1)),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  const [currentSalahTime, setCurrentSalahTime] = useState<Date | null>(null);
  const [chosenDate, setChosenDate] = useState(new Date());

  const { data: salahTimesOnChosenDate, isLoading: isLoadingSalahTimesOnChosenDate } = useQuery({
    queryKey: ['salahTimes', chosenDate, mosqueId], // Give Date give e.g 15/02/23 - Now the time! - as time changes but date is const
    queryFn: () => getTimesForAMosqueOnAGivenDate(mosqueId, chosenDate),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  useEffect(() => {
    if (!isTodayLoaded || !isTomorrowLoaded || !salahTimesToday || !salahTimesTomorrow) return;

    setCurrentSalahTime(salahTimesTomorrow.fajr);

    const { id, date, mosqueId, mosqueName, ...salahTimesObj } = salahTimesToday;
    const salahTimesArr = Object.values(salahTimesObj);
    for (let i = 0; i < salahTimesArr.length; i++) {
      if (isFuture(salahTimesArr[i])) {
        setCurrentSalahTime(salahTimesArr[i]);
        break;
      }
    }
  }, [salahTimesToday, isTodayLoaded, salahTimesTomorrow, isTomorrowLoaded]);

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date();
      const minutesHaveChanged = newTime.getMinutes() !== currentTime.getMinutes();
      if (minutesHaveChanged) setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
    // put currentTime as a dependency so it clears and updates  setInterval
  }, [currentTime]);

  return (
    <div className="mosque-salah-times">
      <div className="current-info flex justify-between px-4 py-5 ">
        <button
          type="button"
          className="w-8 stroke-primary-500 hover:stroke-primary-600"
          onClick={() => setChosenDate(subDays(chosenDate, 1))}>
          <LeftChevronIcon />
        </button>
        <div className="center flex flex-col justify-center items-center">
          {/* TODO: use time html element - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time */}
          {/* TODO: Allow for 12/24 hrs changes */}
          <p className="time text-3xl">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              // hour12: true,
            })}
          </p>
          <DatePickerBtn chosenDate={chosenDate} setChosenDate={setChosenDate} />
        </div>
        <button
          type="button"
          className="w-8 stroke-primary-500 hover:stroke-primary-600"
          onClick={() => setChosenDate(addDays(chosenDate, 1))}>
          <RightChevronIcon />
        </button>
      </div>
      {isLoadingSalahTimesOnChosenDate && <SalahTimesRowsSkeleton />}
      {salahTimesOnChosenDate === null && <SalahTimesRowsEmptyState />}
      {salahTimesOnChosenDate && <MosqueSalahTimesRows salahTimes={salahTimesOnChosenDate} currentSalahTime={currentSalahTime} />}
    </div>
  );
};

export default MosqueSalahTimes;
