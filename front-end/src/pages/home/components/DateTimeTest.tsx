import { useQuery } from 'react-query';
import { isFuture, addDays, intlFormatDistance } from 'date-fns'; // TODO: Improvements - Make own util functions and get rid of date-fns if not used a lot!
import { getTimesForAMosqueOnAGivenDate } from '../../../api/mosques';

const DateTimeTest = () => {
  const { data: mosqueDailyTimes, isSuccess } = useQuery({
    queryKey: ['mosquesTimes'], // TODO: Add keys for mosque ID and Date so can cache across app - so next day is cached aswell!!
    queryFn: () => getTimesForAMosqueOnAGivenDate(39, new Date()),
    // staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  // TODO: Setup API to get Fajr salah for next day only!
  // ? Maybe just get the next day's full day - so can cache and not make a request?
  let nextSalah = {
    name: 'Fajr - Test - Just tomorrow',
    time: addDays(new Date(), 1),
    timeLeft: 'Tomorrow',
  };

  if (isSuccess) {
    const { id, mosqueId, mosqueName, date, ...salahTimesObj } = mosqueDailyTimes;

    const salahInfoArr = Object.entries(salahTimesObj);
    for (let i = 0; i < salahInfoArr.length; i++) {
      const [name, time] = salahInfoArr[i];
      if (isFuture(time)) {
        nextSalah = {
          name: name[0].toUpperCase() + name.slice(1),
          time,
          timeLeft: intlFormatDistance(time, new Date(), { style: 'short' }),
        }; // TODO: Make a custom util function to format the date! - Don't like the seconds just say < 1min
        break;
      }
    }
  }

  return (
    <div className="mosque-results">
      <h1>DateTimeTest</h1>
      {isSuccess ? (
        <div>
          <p>{`Name: ${mosqueDailyTimes.mosqueName}`}</p>
          <p>{`Date: ${mosqueDailyTimes.date.toLocaleDateString()}`}</p>
          <p>{`Fajr: ${mosqueDailyTimes.fajr.toLocaleTimeString()}`}</p>
          <p>{`Zuhr: ${mosqueDailyTimes.zuhr.toLocaleTimeString()}`}</p>
          <p>{`Asr: ${mosqueDailyTimes.asr.toLocaleTimeString()}`}</p>
          <p>{`Maghrib: ${mosqueDailyTimes.maghrib.toLocaleTimeString()}`}</p>
          <p>{`Isha: ${mosqueDailyTimes.isha.toLocaleTimeString()}`}</p>
          <p>{new Date().toLocaleString()}</p>
          <p>{`Closest Salah to current time is: ${nextSalah.name} `}</p>
          <p>{`Closest Time to current time is: ${nextSalah.time.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })} `}</p>
          <p>{`${nextSalah.timeLeft} `}</p>
        </div>
      ) : (
        <p>Failed to fetch</p>
      )}
    </div>
  );
};

export default DateTimeTest;
