/* eslint-disable import/no-relative-packages */
// import axios from 'axios';
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
import {
  // MosqueTimesDailyDTO,
  SalahBeginningTimesDailyDTO,
} from '../../../back-end/src/db/models/dailyTimes';
import { formatDateIntoISOFormat, format_date_as_dd_MMM_yy_str, parse_dd_MMM_yy_str_into_date } from '../util/datesfns';

// NOTE: Why did I return res.data rather than just the axiosResponse?
// I wanted the data from useQuery to be the MosqueDTO[] not the axios response
// It also solved all the ts/eslint issues so must be the way
// But how will useQuery deal with errors?
// since this is all in a promise here - any errors thrown by axios (i.e any status != 2xx will throw)
// This will get thrown to useQuery and dealt with there - otherwise will return the MosquesDTO[]!
// eslint-disable-next-line import/prefer-default-export

let URL: string;
if (process.env.NODE_ENV === 'production') {
  URL = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL : 'http://localhost:8000';
} else {
  URL = 'http://localhost:8000';
}
// eslint-disable-next-line import/prefer-default-export
export const getAllMosques = async (): Promise<MosqueDTO[]> => {
  // eslint-disable-next-line no-console
  console.log('URL', URL);
  //   const res = await axios.get<MosqueDTO[]>(`${URL}/api/v1/mosques/`);
  const res = await fetch(`${URL}/api/v1/mosques/`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to All Mosques');
  }
  //   console.log('res', res);
  //   console.log('res.json()', res.json());
  return res.json();
  //   return res.data;
};

const createDateObjFromDateObjAndTimeString = (date: Date, time: string) => {
  const ISODate = formatDateIntoISOFormat(date);
  const newDateObj = new Date(`${ISODate}T${time}`);
  return newDateObj;
};

// // Note: All date/time strings are converted into DateObj here -
// // as calculations on DateObj are more frequent than static presentation of the strings
// export const getTimesForAMosqueOnAGivenDate = async (mosqueId: number, date: Date): Promise<MosqueTimesDaily> => {
//   const dateUrlFormat = format_date_as_dd_MMM_yy_str(date);
//   const res = await axios.get<MosqueTimesDailyDTO>(`${URL}/api/v1/mosques/${mosqueId}/timetables/${dateUrlFormat}`);

//   // First parse date string into real Date obj - to use
//   const dateObj = parse_dd_MMM_yy_str_into_date(res.data.date);
//   if (dateObj === null) throw new Error(`Invalid date string from DB: ${res.data.date}`);

//   return {
//     id: res.data.id,
//     mosqueId: res.data.mosqueId,
//     mosqueName: res.data.mosqueName,
//     date: dateObj,
//     fajr: createDateObjFromDateObjAndTimeString(dateObj, res.data.fajr),
//     zuhr: createDateObjFromDateObjAndTimeString(dateObj, res.data.zuhr),
//     asr: createDateObjFromDateObjAndTimeString(dateObj, res.data.asr),
//     maghrib: createDateObjFromDateObjAndTimeString(dateObj, res.data.maghrib),
//     isha: createDateObjFromDateObjAndTimeString(dateObj, res.data.isha),
//   };
// };

// // TODO: In future turn this into seperate API File?
export const getSalahBeginningTimesOnAGivenDate = async (date: Date): Promise<SalahTimesDaily | null> => {
  const dateUrlFormat = format_date_as_dd_MMM_yy_str(date);
  // const res = await axios.get<SalahBeginningTimesDailyDTO>(`${URL}/api/v1/salah/${dateUrlFormat}`);
  const res = await fetch(`${URL}/api/v1/salah/${dateUrlFormat}`).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<SalahBeginningTimesDailyDTO | null>;
  });

  if (res === null) return null;
  //   // First parse date string into real Date obj - to use
  const dateObj = parse_dd_MMM_yy_str_into_date(res.date);
  if (dateObj === null) throw new Error(`Invalid date string from DB: ${res.date}`);

  return {
    id: res.id,
    date: dateObj,
    fajr: createDateObjFromDateObjAndTimeString(dateObj, res.fajr),
    sunrise: createDateObjFromDateObjAndTimeString(dateObj, res.sunrise),
    zuhr: createDateObjFromDateObjAndTimeString(dateObj, res.zuhr),
    asr1stMithl: createDateObjFromDateObjAndTimeString(dateObj, res.asr1stMithl),
    asr2ndMithl: createDateObjFromDateObjAndTimeString(dateObj, res.asr2ndMithl),
    maghrib: createDateObjFromDateObjAndTimeString(dateObj, res.maghrib),
    isha: createDateObjFromDateObjAndTimeString(dateObj, res.isha),
  };
};
