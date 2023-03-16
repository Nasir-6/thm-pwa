import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from 'react-query';
import { isFuture, addDays, subDays } from 'date-fns'; // TODO: Improvements - Make own util functions and get rid of date-fns if not used a lot!
import { getSalahBeginningTimesOnAGivenDate } from '../../../api/mosques';
import './SalahBeginningModal.css';

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

  const { data: salahBeginningTimesTomorrow, isSuccess: isTomorrowLoaded } = useQuery({
    queryKey: ['salahBeginningTimes', 'tomorrow'], // Give Date give e.g 15/02/23 - Now the time! - as time changes but date is const
    queryFn: () => getSalahBeginningTimesOnAGivenDate(addDays(new Date(), 1)),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  type SalahName = 'Fajr' | 'Sunrise' | 'Zuhr' | 'Asr1stMithl' | 'Asr2ndMithl' | 'Maghrib' | 'Isha';
  type SalahObject = {
    name: SalahName;
    time: Date;
  };

  const [currentSalah, setCurrentSalah] = useState<SalahObject | undefined>();
  const [nextSalah, setNextSalah] = useState<SalahObject | undefined>();

  useEffect(() => {
    if (
      (!isYesterdayLoaded && !isTodayLoaded && !isTomorrowLoaded) ||
      salahBeginningTimesYesterday === undefined ||
      salahBeginningTimesToday === undefined ||
      salahBeginningTimesTomorrow === undefined
    )
      return;

    let nextSalahObj: SalahObject = {
      name: 'Fajr',
      time: salahBeginningTimesTomorrow?.fajr,
    };
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
        nextSalahObj = {
          name: salahName,
          time,
        };
        break;
      }
      currentSalahObj = {
        name: salahName,
        time,
      };
    }

    setCurrentSalah(currentSalahObj);
    setNextSalah(nextSalahObj);
  }, [salahBeginningTimesToday, salahBeginningTimesTomorrow]);

  setIsModalShown(true);

  // TODO: Convert the below into a component that returns all the divs as rows - with designs
  const salahTimesRows = salahBeginningTimesToday
    ? Object.entries(salahBeginningTimesToday)?.map((row) => {
        if (row[0] === 'id' || row[0] === 'date' || row === null || row === undefined) {
          //   console.log('NOT A SALAH', row);
          // eslint-disable-next-line react/jsx-no-useless-fragment
          return <></>;
        }
        const salahName = (row[0][0].toUpperCase() +
          row[0]
            .slice(1)
            .split(/(?=[A-Z]|[0-9])/)
            .join(' ')) as SalahName;
        const salahTimeObj: SalahObject = {
          name: salahName,
          time: row[1] as Date,
        };
        return (
          <div className={`${currentSalah?.time === salahTimeObj.time ? 'current' : ''} flex justify-between px-4 py-5 border-t`}>
            <div className="lhs flex gap-2">
              <p>Icon</p>
              <p>{salahTimeObj.name}</p>
            </div>
            <p>
              {salahTimeObj.time
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
      })
    : null;

  const getTimeToNextSalahString = (): string => {
    if (!nextSalah) return '';
    const date1: Date = new Date();
    const date2: Date = nextSalah?.time;

    const diffInMilliSeconds = Math.abs(date2.valueOf() - date1.valueOf());
    let milliSecondsLeft = diffInMilliSeconds;

    const diffInHours = Math.floor(milliSecondsLeft / (1000 * 60 * 60));
    const diffInHoursStr = diffInHours < 10 ? `0${diffInHours}` : `${diffInHours}`;
    milliSecondsLeft -= diffInHours * (1000 * 60 * 60);

    const diffInMinutes = Math.floor(milliSecondsLeft / (1000 * 60));
    const diffInMinutesStr = diffInMinutes < 10 ? `0${diffInMinutes}` : `${diffInMinutes}`;
    milliSecondsLeft -= diffInMinutes * (1000 * 60);

    const diffInSeconds = Math.floor(milliSecondsLeft / 1000);
    const diffInSecondsStr = diffInSeconds < 10 ? `0${diffInSeconds}` : `${diffInSeconds}`;
    milliSecondsLeft -= diffInSeconds * 1000;

    let nextSalahNameStr = nextSalah?.name as string;
    // eslint-disable-next-line no-unsafe-optional-chaining
    nextSalahNameStr =
      nextSalahNameStr[0].toUpperCase() +
      nextSalahNameStr
        .slice(1)
        .split(/(?=[A-Z]|[0-9])/)
        .join(' ');

    const str = `${diffInHoursStr}h ${diffInMinutesStr}m ${diffInSecondsStr}s left until ${nextSalahNameStr}`;
    return str;
  };

  //   TODO: Use ReactDom.createPortal instead - https://www.youtube.com/watch?v=LyLa7dU5tp8&ab_channel=WebDevSimplified
  return ReactDOM.createPortal(
    <div className="flex justify-center items-center">
      <div
        onClick={() => setIsModalShown(false)}
        aria-hidden="true"
        role="button"
        className="dark-overlay bg-slate-900 bg-opacity-25 fixed w-full h-full top-0 z-20 flex justify-center items-center overflow-hidden"
      />
      <div className="salah-beginning-modal fixed top-4 bg-white max-w-lg w-11/12 z-30 rounded-t-md">
        <div className="header flex justify-between px-4 py-5 text-lg font-extrabold">
          <h2 className=" text-lg font-bold">Salah Beginning Times</h2>
          <p>X</p>
        </div>
        <div className="current-info flex justify-between px-4 py-5 bg-primary-700 text-white">
          <div className="next-salah">
            <p>Icon {new Date().toLocaleTimeString()}</p>
            <p>{getTimeToNextSalahString()}</p>
          </div>
          <div className="date-picker">Date Picker Here</div>
        </div>
        {salahBeginningTimesToday && salahTimesRows}
      </div>
    </div>,
    document.body
  );
};

export default SalahBeginningModal;
