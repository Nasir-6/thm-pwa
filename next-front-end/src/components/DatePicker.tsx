import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import LeftChevronIcon from '@/icons/salah_times_icons/LeftChevronIcon';
import RightChevronIcon from '@/icons/salah_times_icons/RightChevronIcon';

import { add, eachDayOfInterval, endOfMonth, endOfWeek, getDay, isEqual, isSameMonth, isToday, startOfToday, startOfWeek } from 'date-fns';

const colStartClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7'];

function classNames(...classes: (string | boolean)[]) {
  console.log('classes', classes);
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
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DatePicker = ({ setDatePickerShown }: Props) => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(`${months[selectedDay.getMonth()]}-${selectedDay.getFullYear()}`);
  const firstDayCurrentMonth = parseDateInMMMMyyyyFormat(currentMonth);

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
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
      <div className="fixed top-32 p-10 bg-white z-30 px-4 ">
        <div className="flex items-center">
          <h2 className="flex-auto font-semibold text-gray-900">
            {`${months[firstDayCurrentMonth.getMonth()]} ${firstDayCurrentMonth.getFullYear()}`}
          </h2>
          <button
            type="button"
            onClick={previousMonth}
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 stroke-black w-8">
            <span className="sr-only">Previous month</span>
            <LeftChevronIcon />
            {/* <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" /> */}
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 stroke-black w-8">
            <span className="sr-only">Next month</span>
            <RightChevronIcon />
            {/* <ChevronRightIcon className="w-5 h-5" aria-hidden="true" /> */}
          </button>
        </div>
        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="grid grid-cols-7 mt-2 text-sm">
          {days.map((day, dayIdx) => (
            <div key={day.toString()} className={classNames(dayIdx === 0 && colStartClasses[getDay(day)], 'py-1.5')}>
              <button
                type="button"
                onClick={() => setSelectedDay(day)}
                className={classNames(
                  isEqual(day, selectedDay) && 'text-white',
                  !isEqual(day, selectedDay) && isToday(day) && 'text-red-500',
                  !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                  !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
                  isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                  isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
                  !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                  (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                  'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                )}>
                <time dateTime={`${day.getFullYear()}-${`0${day.getMonth() + 1}`.slice(-2)}-${day.getDate()}`}>{day.getDate()}</time>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DatePicker;
