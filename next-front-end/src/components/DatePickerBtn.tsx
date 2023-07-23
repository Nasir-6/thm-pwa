import { useState } from 'react';
import dynamic from 'next/dynamic';
import CalendarIcon from '@/icons/salah_times_icons/CalendarIcon';

const DatePicker = dynamic(() => import('./DatePicker'), {
  loading: () => <p>Loading...</p>, // TODO: Update loading state
});

type Props = {
  chosenDate: Date;
};

const DatePickerBtn = ({ chosenDate }: Props) => {
  const [datePickerShown, setDatePickerShown] = useState(false);
  console.log('Date picker Btn rerendered');
  return (
    <>
      <button type="button" className="date flex items-center gap-1" onClick={() => setDatePickerShown(true)}>
        <CalendarIcon />
        {chosenDate?.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </button>
      {datePickerShown && <DatePicker setDatePickerShown={setDatePickerShown} />}
    </>
  );
};

export default DatePickerBtn;
