import { useState } from 'react';
import dynamic from 'next/dynamic';
import CalendarIcon from '@/icons/salah_times_icons/CalendarIcon';

const DatePicker = dynamic(() => import('./DatePicker'), {
  // loading: () => <p>Loading...</p>, // TODO: Update loading state
});

type Props = {
  chosenDate: Date;
  setChosenDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DatePickerBtn = ({ chosenDate, setChosenDate }: Props) => {
  const [datePickerShown, setDatePickerShown] = useState(false);
  return (
    <>
      <button
        type="button"
        className="date flex items-center gap-1 font-semibold bg-gradient-to-r from-primary-600 to-primary-300 hover:to-accent-600 bg-clip-text text-transparent fill-primary-600"
        onClick={() => setDatePickerShown(true)}>
        <CalendarIcon />
        {chosenDate?.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </button>
      {datePickerShown && <DatePicker setDatePickerShown={setDatePickerShown} chosenDate={chosenDate} setChosenDate={setChosenDate} />}
    </>
  );
};

export default DatePickerBtn;
