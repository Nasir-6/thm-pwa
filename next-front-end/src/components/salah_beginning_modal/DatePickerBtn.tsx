import { useState } from 'react';
import dynamic from 'next/dynamic';
import CalendarIcon from '@/icons/salah_times_icons/CalendarIcon';

const DatePicker = dynamic(() => import('./DatePicker'), {
  // loading: () => <p>Loading...</p>, // TODO: Update loading state
});

type Props = {
  chosenDate: Date;
  setChosenDate: React.Dispatch<React.SetStateAction<Date>>;
  isWhiteBackground: boolean;
};

const DatePickerBtn = ({ chosenDate, setChosenDate, isWhiteBackground }: Props) => {
  const [datePickerShown, setDatePickerShown] = useState(false);
  return (
    <>
      <button
        type="button"
        className={`date flex items-center gap-1 font-semibold ${
          isWhiteBackground
            ? 'text-primary-500 hover:text-primary-600 fill-primary-500'
            : 'bg-gradient-to-r bg-clip-text text-transparent from-accent-600 to-accent-300 hover:to-accent-600  fill-accent-600'
        }`}
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
