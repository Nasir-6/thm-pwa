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

  type SalahName = 'Fajr' | 'Sunrise' | 'Zuhr' | 'Asr 1st Mithl' | 'Asr 2nd Mithl' | 'Maghrib' | 'Isha';
  type SalahObject = {
    name: SalahName;
    time: Date;
  };

  const [currentSalah, setCurrentSalah] = useState<SalahObject | null>(null);
  const [chosenDate, setChosenDate] = useState(new Date());

  useEffect(() => {
    if ((!isYesterdayLoaded && !isTodayLoaded) || salahBeginningTimesYesterday === undefined || salahBeginningTimesToday === undefined)
      return;

    let currentSalahObj: SalahObject = {
      name: 'Isha',
      time: salahBeginningTimesYesterday?.isha,
    };

    const { id, date, ...salahBeginningTimesObj } = salahBeginningTimesToday;
    const salahInfoArr = Object.entries(salahBeginningTimesObj);
    for (let i = 0; i < salahInfoArr.length; i++) {
      const [name, time] = salahInfoArr[i];
      const salahName = (name[0].toUpperCase() + name.slice(1)) as SalahName;
      if (isFuture(time)) {
        break;
      }
      currentSalahObj = {
        name: salahName,
        time,
      };
    }

    setCurrentSalah(currentSalahObj);
  }, [salahBeginningTimesToday]);

  setIsModalShown(true);

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
        {salahBeginningTimesToday && <SalahTimesRows salahTimes={salahBeginningTimesToday} currentSalah={currentSalah} />}
      </div>
    </div>,
    document.body
  );
};

export default SalahBeginningModal;
