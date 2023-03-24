import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from 'react-query';
import { isFuture, subDays } from 'date-fns'; // TODO: Improvements - Make own util functions and get rid of date-fns if not used a lot!
import { getSalahBeginningTimesOnAGivenDate } from '../../../api/mosques';
import { ReactComponent as FajrIcon } from '../../../assets/sunrise.svg';
import { ReactComponent as ZuhrIcon } from '../../../assets/sun.svg';
import { ReactComponent as AsrIcon } from '../../../assets/cloudy_sun.svg';
import { ReactComponent as MaghribIcon } from '../../../assets/cloudy_moon.svg';
import { ReactComponent as IshaIcon } from '../../../assets/moon.svg';
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

  type SalahName = 'Fajr' | 'Sunrise' | 'Zuhr' | 'Asr 1st Mithl' | 'Asr 2nd Mithl' | 'Maghrib' | 'Isha';
  type SalahObject = {
    name: SalahName;
    time: Date;
  };

  const [currentSalah, setCurrentSalah] = useState<SalahObject | undefined>();

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
        let icon;
        if (salahName === 'Fajr' || salahName === 'Sunrise')
          icon = <FajrIcon className={`${currentSalah?.time === salahTimeObj.time ? 'active-svg' : ''}`} />;
        if (salahName === 'Zuhr') icon = <ZuhrIcon className={`${currentSalah?.time === salahTimeObj.time ? 'active-svg' : ''}`} />;
        if (salahName === 'Asr 1st Mithl' || salahName === 'Asr 2nd Mithl')
          icon = <AsrIcon className={`${currentSalah?.time === salahTimeObj.time ? 'active-svg' : ''}`} />;
        if (salahName === 'Maghrib') icon = <MaghribIcon className={`${currentSalah?.time === salahTimeObj.time ? 'active-svg' : ''}`} />;
        if (salahName === 'Isha') icon = <IshaIcon className={`${currentSalah?.time === salahTimeObj.time ? 'active-svg' : ''}`} />;
        return (
          <div className={`${currentSalah?.time === salahTimeObj.time ? 'current' : ''} flex justify-between px-4 py-5 border-t`}>
            <div className="lhs flex gap-2">
              {icon}
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
          <div className="next-salah">
            <p>Icon {new Date().toLocaleTimeString()}</p>
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
