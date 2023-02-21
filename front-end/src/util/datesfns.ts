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

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/naming-convention
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
