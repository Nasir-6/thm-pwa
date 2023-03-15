import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from 'react-query';
import { isFuture, addDays, subDays } from 'date-fns'; // TODO: Improvements - Make own util functions and get rid of date-fns if not used a lot!
import { getSalahBeginningTimesOnAGivenDate } from '../../../api/mosques';

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

  console.log('salahBeginningTimesToday', salahBeginningTimesToday);
  console.log('salahBeginningTimesTomorrow', salahBeginningTimesTomorrow);

  type SalahName = 'Fajr' | 'Sunrise' | 'Zuhr' | 'Asr1stMithl' | 'Asr2ndMithl' | 'Maghrib' | 'Isha';
  type SalahObj = {
    name: SalahName;
    time: Date;
  };

  const [currentSalah, setCurrentSalah] = useState<SalahObj | undefined>();
  const [nextSalah, setNextSalah] = useState<SalahObj | undefined>();

  useEffect(() => {
    if (
      (!isYesterdayLoaded && !isTodayLoaded && !isTomorrowLoaded) ||
      salahBeginningTimesYesterday === undefined ||
      salahBeginningTimesToday === undefined ||
      salahBeginningTimesTomorrow === undefined
    )
      return;

    let nextSalahObj: SalahObj = {
      name: 'Fajr',
      time: salahBeginningTimesTomorrow?.fajr,
    };
    let currentSalahObj: SalahObj = {
      name: 'Isha',
      time: salahBeginningTimesYesterday?.isha,
    };

    const { id, date, ...salahBeginningTimesObj } = salahBeginningTimesToday;
    const salahInfoArr = Object.entries(salahBeginningTimesObj);
    console.log('salahInfoArr', salahInfoArr);
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

  console.log('currentSalah', currentSalah);
  console.log('nextSalah', nextSalah);
  setIsModalShown(true);

  const salahTimesRows = salahBeginningTimesToday
    ? Object.entries(salahBeginningTimesToday)?.map((row) => {
        if (row[0] === 'id' || row[0] === 'date' || row === null || row === undefined) {
          console.log('NOT A SALAH', row);
          // eslint-disable-next-line react/jsx-no-useless-fragment
          return <></>;
        }

        const salahName = (row[0][0].toUpperCase() +
          row[0]
            .slice(1)
            .split(/(?=[A-Z]|[0-9])/)
            .join(' ')) as SalahName;
        const salahTimeObj: SalahObj = {
          name: salahName,
          time: row[1] as Date,
        };
        console.log('row', row);
        return (
          <div>
            <p>Icon</p>
            <p>{salahTimeObj.name}</p>
            <p>
              {salahTimeObj.time?.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        );
      })
    : null;

  console.log('salahTimesRows', salahTimesRows);
  //   TODO: Use ReactDom.createPortal instead - https://www.youtube.com/watch?v=LyLa7dU5tp8&ab_channel=WebDevSimplified
  return ReactDOM.createPortal(
    <div
      onClick={() => setIsModalShown(false)}
      aria-hidden="true"
      role="button"
      className="dark-overlay bg-slate-900 bg-opacity-25 fixed w-full h-full top-0 z-20 flex justify-center items-center overflow-hidden">
      <div className="salah-beginning-modal absolute bg-white max-w-lg w-full">
        <div className="header flex">
          <h2 className="">Salah Beginning Times</h2>
          <p>X</p>
        </div>
        <div className="current-info">
          <div className="next-salah">
            <p>Icon</p>
            <p>Time Now</p>
            <p>Time to Next Salaah</p>
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
