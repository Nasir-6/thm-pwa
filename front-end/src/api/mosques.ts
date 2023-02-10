/* eslint-disable import/no-relative-packages */
import axios from 'axios';
import { format, parse } from 'date-fns'; // TODO: Parse function takes up 100k - so maybe worth making own Util Functions
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
import { MosqueTimesDailyDTO } from '../../../back-end/src/db/models/dailyTimes';

// NOTE: Why did I return res.data rather than just the axiosResponse?
// I wanted the data from useQuery to be the MosqueDTO[] not the axios response
// It also solved all the ts/eslint issues so must be the way
// But how will useQuery deal with errors?
// since this is all in a promise here - any errors thrown by axios (i.e any status != 2xx will throw)
// This will get thrown to useQuery and dealt with there - otherwise will return the MosquesDTO[]!
// eslint-disable-next-line import/prefer-default-export
const URL = process.env.SERVER_URL || 'http://localhost';
export const getAllMosques = async (): Promise<MosqueDTO[]> => {
  console.log('URL', URL);
  const res = await axios.get<MosqueDTO[]>(`${URL}:8000/api/v1/mosques/`);
  return res.data;
};

const createDateObjFromDateObjAndTimeString = (date: Date, time: string) => {
  const ISODate = format(date, 'yyyy-MM-dd');
  const newDateObj = new Date(`${ISODate}T${time}`);
  return newDateObj;
};

// Note: All date/time strings are converted into DateObj here -
// as calculations on DateObj are more frequent than static presentation of the strings
export const getTimesForAMosqueOnAGivenDate = async (mosqueId: number, date: Date): Promise<MosqueTimesDaily> => {
  const dateUrlFormat = format(date, 'dd-MMM-yy');
  const res = await axios.get<MosqueTimesDailyDTO>(`${URL}:8000/api/v1/mosques/${mosqueId}/timetables/${dateUrlFormat}`);

  // First parse date string into real Date obj - to use
  const dateObj = parse(res.data.date, 'dd-MMM-yy', new Date());
  return {
    id: res.data.id,
    mosqueId: res.data.mosqueId,
    mosqueName: res.data.mosqueName,
    date: dateObj,
    fajr: createDateObjFromDateObjAndTimeString(dateObj, res.data.fajr),
    zuhr: createDateObjFromDateObjAndTimeString(dateObj, res.data.zuhr),
    asr: createDateObjFromDateObjAndTimeString(dateObj, res.data.asr),
    maghrib: createDateObjFromDateObjAndTimeString(dateObj, res.data.maghrib),
    isha: createDateObjFromDateObjAndTimeString(dateObj, res.data.isha),
  };
};
