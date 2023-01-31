import React from 'react';
import { useQuery } from 'react-query';
import { isFuture } from 'date-fns';
import { getTimesForAMosqueOnAGivenDate } from '../../api/mosques';

const DateTimeTest = () => {
  const { data: mosqueDailyTimes, isSuccess } = useQuery({
    queryKey: ['mosquesTimes'],
    queryFn: () => getTimesForAMosqueOnAGivenDate(39, new Date()),
    // staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });

  let nextSalah = {
    name: 'Fajr - Test',
    time: new Date(),
  };
  if (isSuccess) {
    const { id, mosqueId, mosqueName, date, ...salahTimesObj } = mosqueDailyTimes;
    Object.entries(salahTimesObj).forEach(([name, time]) => {
      if (isFuture(time)) {
        nextSalah = {
          name: name[0].toUpperCase() + name.slice(1),
          time,
        };
      }
    });
  }

  return (
    <div>
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
          <p>{`Closest Time to current time is: ${nextSalah.time.toLocaleTimeString()} `}</p>
        </div>
      ) : (
        <p>Failed to fetch</p>
      )}
    </div>
  );
};

export default DateTimeTest;
