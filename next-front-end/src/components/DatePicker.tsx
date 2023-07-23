import React from 'react';
import { createPortal } from 'react-dom';
// import {
//     add,
//     eachDayOfInterval,
//     endOfMonth,
//     format,
//     getDay,
//     isEqual,
//     isSameMonth,
//     isToday,
//     parse,
//     startOfToday,
//   } from 'date-fns'

type Props = {
  setDatePickerShown: React.Dispatch<React.SetStateAction<boolean>>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DatePicker = ({ setDatePickerShown }: Props) => {
  console.log('Date picker made');
  return createPortal(
    <div className="flex justify-center items-center">
      <div
        onClick={() => setDatePickerShown(false)}
        aria-hidden="true"
        role="button"
        className="date-picker-overlay dark-overlay bg-slate-900 bg-opacity-25 fixed w-full h-full top-0 z-30 flex justify-center items-center"
      />
      <div className="fixed p-10 bg-red-500 z-30">Calendar</div>
    </div>,
    document.body
  );
};

export default DatePicker;
