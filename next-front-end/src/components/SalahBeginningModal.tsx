import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import { isFuture, subDays, addDays } from 'date-fns'; // TODO: Improvements - Make own util functions and get rid of date-fns if not used a lot!
import { getSalahBeginningTimesOnAGivenDate } from '../lib/mosques';
import './SalahBeginningModal.css';
import SalahTimesRows from './SalahTimesRows';

interface SalahBeginningModalProps {
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const SalahBeginningModal: React.FC<SalahBeginningModalProps> = ({ setIsModalShown }) => {
  const { data: salahBeginningTimesYesterday, isSuccess: isYesterdayLoaded } = useQuery({
    queryKey: ['salahBeginningTimes', 'yesterday'], // Give Date give e.g 15/02/23 - Now the time! - as time changes but date is const
    queryFn: () => getSalahBeginningTimesOnAGivenDate(subDays(new Date(), 1)),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });
  const { data: salahBeginningTimesToday, isSuccess: isTodayLoaded } = useQuery({
    queryKey: ['salahBeginningTimes', 'today'], // Give Date give e.g 15/02/23 - Now the time! - as time changes but date is const
    queryFn: () => getSalahBeginningTimesOnAGivenDate(new Date()),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  const [currentSalahTime, setCurrentSalahTime] = useState<Date | null>(null);
  const [chosenDate, setChosenDate] = useState(new Date());

  const { data: salahBeginningTimesOnChosenDate, isSuccess: isChosenDateLoaded } = useQuery({
    queryKey: ['salahBeginningTimes', chosenDate], // Give Date give e.g 15/02/23 - Now the time! - as time changes but date is const
    queryFn: () => getSalahBeginningTimesOnAGivenDate(chosenDate),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  useEffect(() => {
    if ((!isYesterdayLoaded && !isTodayLoaded) || salahBeginningTimesYesterday === undefined || salahBeginningTimesToday === undefined)
      return;

    let currentSalahTimeHolder = salahBeginningTimesYesterday.isha;

    const { id, date, ...salahBeginningTimesObj } = salahBeginningTimesToday;
    const salahTimesArr = Object.values(salahBeginningTimesObj);
    for (let i = 0; i < salahTimesArr.length; i++) {
      const time = salahTimesArr[i];
      if (isFuture(time)) break;
      currentSalahTimeHolder = time;
    }

    setCurrentSalahTime(currentSalahTimeHolder);
  }, [salahBeginningTimesToday, salahBeginningTimesYesterday, isTodayLoaded, isYesterdayLoaded]);

  //   TODO: Use ReactDom.createPortal instead - https://www.youtube.com/watch?v=LyLa7dU5tp8&ab_channel=WebDevSimplified
  return ReactDOM.createPortal(
    <div className="flex justify-center items-center">
      <div
        onClick={() => setIsModalShown(false)}
        aria-hidden="true"
        role="button"
        className="dark-overlay bg-slate-900 bg-opacity-25 fixed w-full h-full top-0 z-20 flex justify-center items-center"
      />
      <div className="salah-beginning-modal fixed top-4 bg-white max-w-lg w-11/12 z-30 rounded-t-md">
        <div className="header flex justify-between px-4 py-4 text-lg font-extrabold">
          <h2 className=" text-xl font-bold">Salah Beginning Times</h2>
          <button type="button" onClick={() => setIsModalShown(false)}>
            X
          </button>
        </div>
        <div className="current-info flex justify-between px-4 py-5 bg-primary-700 text-white">
          <button type="button" onClick={() => setChosenDate(subDays(chosenDate, 1))}>
            {'<'}
          </button>
          <div className="center flex flex-col justify-center items-center">
            <p className="time text-3xl">
              {new Date()?.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                // hour12: true,
              })}
            </p>
            <div className="date">
              {chosenDate?.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
          <button type="button" onClick={() => setChosenDate(addDays(chosenDate, 1))}>
            {'>'}
          </button>
        </div>
        {salahBeginningTimesOnChosenDate && (
          <SalahTimesRows salahTimes={salahBeginningTimesOnChosenDate} currentSalahTime={currentSalahTime} />
        )}
      </div>
    </div>,
    document.body
  );
};

export default SalahBeginningModal;
