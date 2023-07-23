import { useState } from 'react';
import CalendarIcon from '@/icons/salah_times_icons/CalendarIcon';
import DatePicker from './DatePicker';

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
          weekday: 'long',
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
