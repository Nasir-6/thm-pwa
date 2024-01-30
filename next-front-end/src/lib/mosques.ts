/* eslint-disable import/no-relative-packages */
// import axios from 'axios';
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
import { MosqueTimesDailyDTO, SalahBeginningTimesDailyDTO } from '../../../back-end/src/db/models/dailyTimes';
import { formatDateIntoISOFormat, format_date_as_dd_MMM_yy_str, parse_dd_MMM_yy_str_into_date } from '../util/datesfns';
import { MosqueJumuahTimes } from '../../../back-end/src/db/models/jumuahTimes';

let DOMAIN: string;
if (process.env.NODE_ENV === 'production') {
  DOMAIN = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:8000';
} else {
  DOMAIN = 'http://localhost:8000';
}

const fetcher = async <T>(url: string): Promise<T> =>
  fetch(`${DOMAIN}/api/${url}/`).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });

export const getAllMosques = async (): Promise<MosqueDTO[]> => fetcher<MosqueDTO[]>('v1/mosques/');

export const getMosqueBySlug = async (url_slug: string): Promise<MosqueDTO> => fetcher<MosqueDTO>(`v1/mosques/${url_slug}`);

const createDateObjFromDateObjAndTimeString = (date: Date, time: string) => {
  const ISODate = formatDateIntoISOFormat(date);
  const newDateObj = new Date(`${ISODate}T${time}`);
  return newDateObj;
};

export const getTimesForAMosqueOnAGivenDate = async (mosqueId: number, date: Date): Promise<MosqueTimesDaily> => {
  const dateUrlFormat = format_date_as_dd_MMM_yy_str(date);
  const res: MosqueTimesDailyDTO = await fetcher<MosqueTimesDailyDTO>(`v1/mosques/${mosqueId}/timetables/${dateUrlFormat}`);
  // First parse date string into real Date obj - to use
  const dateObj = parse_dd_MMM_yy_str_into_date(res.date);
  if (dateObj === null) throw new Error(`Invalid date string from DB: ${res.date}`);

  return {
    id: res.id,
    mosqueId: res.mosqueId,
    mosqueName: res.mosqueName,
    date: dateObj,
    fajr: createDateObjFromDateObjAndTimeString(dateObj, res.fajr),
    zuhr: createDateObjFromDateObjAndTimeString(dateObj, res.zuhr),
    asr: createDateObjFromDateObjAndTimeString(dateObj, res.asr),
    maghrib: createDateObjFromDateObjAndTimeString(dateObj, res.maghrib),
    isha: createDateObjFromDateObjAndTimeString(dateObj, res.isha),
  };
};

export const getSalahBeginningTimesOnAGivenDate = async (date: Date): Promise<SalahTimesDaily | null> => {
  const dateUrlFormat = format_date_as_dd_MMM_yy_str(date);
  const res = await fetcher<SalahBeginningTimesDailyDTO | null>(`v1/salah/${dateUrlFormat}`);
  if (res === null) return null;

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

export const getJumuahTimesForAMosque = async (id: number): Promise<MosqueJumuahTimes | null> =>
  fetcher<MosqueJumuahTimes | null>(`v1/jumuah/mosque/${id}`);

export const getAllJumuahTimes = async (): Promise<MosqueJumuahTimes[] | null> => fetcher<MosqueJumuahTimes[] | null>('v1/jumuah');
