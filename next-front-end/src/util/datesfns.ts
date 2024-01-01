/* eslint-disable @typescript-eslint/naming-convention */
interface MonthAbbreviations {
  [key: string]: number;
}
const monthAbbreviations: MonthAbbreviations = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

type MonthStr = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
// DateString can only be in the form of "dd-MMM-yy"
type DateString = `${number}-${MonthStr}-${number}`;
const DATE_REGEX = /^\d{2}-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2}$/;

export const parse_dd_MMM_yy_str_into_date = (dateStr: string) => {
  if (!DATE_REGEX.test(dateStr)) return null;

  const castedDateStr = dateStr as DateString;
  const dateParts = castedDateStr.split('-');
  const day = parseInt(dateParts[0], 10);
  const monthStr = dateParts[1];
  const year = parseInt(dateParts[2], 10) + 2000; // as in yy so need to convert to yyyy - 23 -> 2023

  // Map month abbreviation to numeric month
  const month: number = monthAbbreviations[monthStr];

  // Create a new date object with the parsed date components
  return new Date(year, month, day);
};

// Add tests

export const formatDateIntoISOFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const format_date_as_dd_MMM_yy_str = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
};

export const formatJumuahTime = (jumuahTime: string): string => {
  const [hrs, mins, secs] = jumuahTime.split(':').map(Number);
  const dateTimeObj = new Date();
  dateTimeObj.setUTCHours(hrs, mins, secs);
  return dateTimeObj
    ?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      // hour12: true,
    })
    .replace(/\s?[AP]M/, '');
};
