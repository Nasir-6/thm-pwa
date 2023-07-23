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

type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DatePicker = (props: Props) => {
  console.log('Date picker made');
  return createPortal(<div>DatePicker</div>, document.body);
};

export default DatePicker;
