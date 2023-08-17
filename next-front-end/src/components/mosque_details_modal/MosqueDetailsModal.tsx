'use client';

import CrossIcon from '@/icons/CrossIcon';
import LeftChevronIcon from '@/icons/salah_times_icons/LeftChevronIcon';
import RightChevronIcon from '@/icons/salah_times_icons/RightChevronIcon';
import { addDays } from 'date-fns';
// import { subDays } from 'date-fns';
import subDays from 'date-fns/subDays';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../back-end/src/db/models/mosques';
import DatePickerBtn from '../salah_beginning_modal/DatePickerBtn';

type Props = {
  mosque: MosqueDTO;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const MosqueDetailsModal = ({ mosque, setIsModalShown }: Props) => {
  const [chosenDate, setChosenDate] = useState(new Date());

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

  return createPortal(
    <div className="flex justify-center items-center">
      <div
        onClick={() => setIsModalShown(false)}
        aria-hidden="true"
        role="button"
        className="dark-overlay bg-slate-900 bg-opacity-25 fixed w-full h-full top-0 z-20 flex justify-center items-center"
      />
      <div className="salah-beginning-modal fixed top-4 bg-white max-w-lg w-11/12 z-30 rounded-t-md">
        <div className="flex items-start p-3">
          <div className="mosque-img">Place Image here</div>
          <div className="mosque-details">
            <h2 className=" text-xl font-bold">{mosque.name}</h2>
            <p>{mosque.address}</p>
            <Link href={mosque.googleUrl} target="_blank" className="text-gradient-gold font-bold">
              Get Directions
            </Link>
          </div>
          <button type="button" className="w-5 stroke-black hover:stroke-accent-600 ml-auto" onClick={() => setIsModalShown(false)}>
            <CrossIcon />
          </button>
        </div>
        <div className="current-info flex justify-between px-4 py-5 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
          <button type="button" className="w-8 stroke-white hover:stroke-accent-500" onClick={() => setChosenDate(subDays(chosenDate, 1))}>
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
          <button type="button" className="w-8 stroke-white hover:stroke-accent-500" onClick={() => setChosenDate(addDays(chosenDate, 1))}>
            <RightChevronIcon />
          </button>
        </div>
        {/* {isLoadingSalahBeginningTimesOnChosenDate && <SalahTimesRowsSkeleton />}
        {salahBeginningTimesOnChosenDate === null && <SalahTimesRowsEmptyState />}
        {salahBeginningTimesOnChosenDate && (
          <SalahTimesRows salahTimes={salahBeginningTimesOnChosenDate} currentSalahTime={currentSalahTime} />
        )} */}
      </div>
    </div>,
    document.body
  );
};

export default MosqueDetailsModal;
