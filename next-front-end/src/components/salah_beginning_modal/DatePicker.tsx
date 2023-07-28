// Based off of video - https://www.youtube.com/watch?v=9ySmMd5Cjc0&ab_channel=SamSelikoff
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import LeftChevronIcon from '@/icons/salah_times_icons/LeftChevronIcon';
import RightChevronIcon from '@/icons/salah_times_icons/RightChevronIcon';

import { add, eachDayOfInterval, endOfWeek, getDay, isSameDay, isSameMonth, isToday, startOfWeek } from 'date-fns';

const colStartClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7'];

function classNames(...classes: (string | boolean)[]) {
  // console.log('classes', classes);
  return classes.filter(Boolean).join(' ');
}

function parseDateInMMMMyyyyFormat(dateString: String) {
  const monthsObj: { [key: string]: number } = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  const [monthName, year] = dateString.split('-');
  const monthIndex = monthsObj[monthName];

  if (monthIndex !== undefined) {
    const dateObj = new Date(Number(year), monthIndex, 1);
    return dateObj;
  }
  throw new Error('Invalid month name provided.');
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type Props = {
  setDatePickerShown: React.Dispatch<React.SetStateAction<boolean>>;
  chosenDate: Date;
  setChosenDate: React.Dispatch<React.SetStateAction<Date>>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DatePicker = ({ setDatePickerShown, chosenDate, setChosenDate }: Props) => {
  const [selectedDay, setSelectedDay] = useState(chosenDate);
  const [currentMonth, setCurrentMonth] = useState(`${months[selectedDay.getMonth()]}-${selectedDay.getFullYear()}`);
  const firstDayCurrentMonth = parseDateInMMMMyyyyFormat(currentMonth);

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(add(firstDayCurrentMonth, { weeks: 5 })),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(`${months[firstDayNextMonth.getMonth()]}-${firstDayNextMonth.getFullYear()}`);
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(`${months[firstDayNextMonth.getMonth()]}-${firstDayNextMonth.getFullYear()}`);
  }

  useEffect(() => {
    setCurrentMonth(`${months[selectedDay.getMonth()]}-${selectedDay.getFullYear()}`);
  }, [selectedDay]);

  return createPortal(
    <div className="flex justify-center items-center">
      <div
        onClick={() => setDatePickerShown(false)}
        aria-hidden="true"
        role="button"
        className="date-picker-overlay dark-overlay bg-slate-900 bg-opacity-25 fixed w-full h-full top-0 z-30 flex justify-center items-center"
      />
      <div className="fixed top-32 p-5 bg-white z-30  rounded-md">
        <div className="flex items-center text-center">
          <button type="button" onClick={previousMonth} className="p-1.5 stroke-gray-400 hover:stroke-gray-500 w-8">
            <span className="sr-only">Previous month</span>
            <LeftChevronIcon />
            {/* <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" /> */}
          </button>
          <h2 className="flex-auto font-semibold text-gray-900">
            {`${months[firstDayCurrentMonth.getMonth()]} ${firstDayCurrentMonth.getFullYear()}`}
          </h2>
          <button onClick={nextMonth} type="button" className="p-1.5 stroke-gray-400 hover:stroke-gray-500 w-8">
            <span className="sr-only">Next month</span>
            <RightChevronIcon />
            {/* <ChevronRightIcon className="w-5 h-5" aria-hidden="true" /> */}
          </button>
        </div>
        <div className="grid grid-cols-7 mt-5 leading-6 text-center font-bold">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>
        <div className="grid grid-cols-7 mt-2">
          {days.map((day, dayIdx) => (
            <div key={day.toString()} className={classNames(dayIdx === 0 && colStartClasses[getDay(day)], 'p-1')}>
              <button
                type="button"
                onClick={() => setSelectedDay(day)}
                className={classNames(
                  isSameDay(day, selectedDay) && 'text-white',
                  !isSameDay(day, selectedDay) && isToday(day) && 'text-accent-500',
                  !isSameDay(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                  !isSameDay(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
                  isSameDay(day, selectedDay) && isToday(day) && 'bg-gradient-to-r from-accent-600 to-accent-400',
                  isSameDay(day, selectedDay) && !isToday(day) && 'bg-gradient-to-r from-primary-600 to-primary-400',
                  !isSameDay(day, selectedDay) && 'hover:bg-gray-200',
                  (isSameDay(day, selectedDay) || isToday(day)) && 'font-semibold',
                  'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                )}>
                <time dateTime={`${day.getFullYear()}-${`0${day.getMonth() + 1}`.slice(-2)}-${day.getDate()}`}>{day.getDate()}</time>
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={() => {
              setChosenDate(new Date());
              setSelectedDay(new Date());
            }}
            className="bg-gradient-to-r from-gray-600 to-gray-400 hover:to-gray-600 px-4 py-1 rounded-full text-white font-semibold shadow">
            Reset
          </button>
          <button
            type="button"
            onClick={() => {
              setChosenDate(selectedDay);
              setDatePickerShown(false);
            }}
            className="bg-gradient-to-r from-accent-600 to-accent-400 hover:to-accent-600 px-4 py-1 rounded-full text-white font-semibold shadow">
            Set Date
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DatePicker;
