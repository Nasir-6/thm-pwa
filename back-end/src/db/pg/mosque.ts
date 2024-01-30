import { Pool, QueryResult } from "pg";
import { format } from "date-fns";
import { MosqueDB, MosqueDTO } from "../models/mosques";
import { MosqueTimesDailyDTO, MosqueTimesDailyDB, SalahBeginningTimesDailyDTO, SalahBeginningTimesDailyDB } from "../models/dailyTimes";
import HttpException from "../../exceptions/httpExceptions";
import { MosqueJumuahTimes, MosqueJumuahTimesDB, mosqueJumuahTimesDBSchema } from "../models/jumuahTimes";

class MosqueDAOPostgres {
	// Defining property types - # = private property
	#pool: Pool;

	constructor(poolInstance: Pool) {
		this.#pool = poolInstance;
	}

	// All the methods
	async getAllMosques(): Promise<MosqueDTO[]> {
		const res = await this.#pool.query("SELECT * FROM mosques");
		if (res.rowCount === 0) throw new HttpException(404, "Could not retrieve any mosques from the DB");
		return MosqueDAOPostgres.mapMosqueResult(res);
	}

	async getMosqueById(id: number): Promise<MosqueDTO> {
		const res = await this.#pool.query("SELECT * FROM mosques WHERE id = $1", [id]);
		if (res.rowCount === 0) throw new HttpException(404, `Mosque with id=${id} could not be found`);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const mosque: MosqueDB = res.rows[0];
		return {
			id: mosque.id,
			name: mosque.name,
			borough: mosque.borough,
			area: mosque.area,
			address: mosque.address,
			latitude: Number(mosque.latitude),
			longitude: Number(mosque.longitude),
			hasFemaleFacilities: Boolean(mosque.has_female_facilities),
			hasWheelchairAccess: Boolean(mosque.has_wheelchair_access),
			urlSlug: mosque.url_slug,
			googleUrl: mosque.google_url,
		};
	}

	async getMosqueBySlug(slug: string): Promise<MosqueDTO> {
		const res = await this.#pool.query("SELECT * FROM mosques WHERE url_slug = $1", [slug]);
		if (res.rowCount === 0) throw new HttpException(404, `Mosque with url_slug=${slug} could not be found`);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const mosque: MosqueDB = res.rows[0];
		return {
			id: mosque.id,
			name: mosque.name,
			borough: mosque.borough,
			area: mosque.area,
			address: mosque.address,
			latitude: Number(mosque.latitude),
			longitude: Number(mosque.longitude),
			hasFemaleFacilities: Boolean(mosque.has_female_facilities),
			hasWheelchairAccess: Boolean(mosque.has_wheelchair_access),
			urlSlug: mosque.url_slug,
			googleUrl: mosque.google_url,
		};
	}

	async getTimesForAMosqueOnAGivenDate(mosqueId: number, date: Date): Promise<MosqueTimesDailyDTO> {
		const DD_MMM_YY = format(date, "dd-MMM-yy");
		const query = "SELECT id, mosque_id, mosque_name, date, fajr, zuhr, asr, maghrib, isha FROM mosque_times WHERE mosque_id = $1 AND date = $2";
		const res = await this.#pool.query(query, [mosqueId, DD_MMM_YY]);
		// FIXME: What about when you want to show that we don't have this data? - Then should we throw error or give an empty array?
		if (res.rowCount === 0) throw new HttpException(404, `Mosque with id=${mosqueId} and date=${DD_MMM_YY} could not be found`);
		if (res.rowCount !== 1) throw new HttpException(500, `Found more than one time for mosque_id=${mosqueId} and date=${DD_MMM_YY}`);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const mosqueTimes: MosqueTimesDailyDB = res.rows[0];
		return {
			id: mosqueTimes.id,
			mosqueId: mosqueTimes.mosque_id,
			mosqueName: mosqueTimes.mosque_name,
			date: mosqueTimes.date,
			fajr: mosqueTimes.fajr,
			zuhr: mosqueTimes.zuhr,
			asr: mosqueTimes.asr,
			maghrib: mosqueTimes.maghrib,
			isha: mosqueTimes.isha,
		};
	}

	async getSalahBeginningTimesOnAGivenDate(date: Date): Promise<SalahBeginningTimesDailyDTO | null> {
		const DD_MMM_YY = format(date, "dd-MMM-yy");
		const query = "SELECT id, date, fajr, sunrise, zuhr, asr_1st_mithl, asr_2nd_mithl, maghrib, isha FROM salah_beginning_times WHERE date = $1";
		const res = await this.#pool.query(query, [DD_MMM_YY]);
		// FIXME: What about when you want to show that we don't have this data? - Then should we throw error or give an empty array?
		if (res.rowCount === 0) return null;
		// throw new HttpException(404, `Salah Beginning Times with date=${DD_MMM_YY} could not be found`);
		// if (res.rowCount !== 1) throw new HttpException(500, `Found more than one time for mosque_id=${mosqueId} and date=${DD_MMM_YY}`);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const salahBeginningTimes: SalahBeginningTimesDailyDB = res.rows[0];
		return {
			id: salahBeginningTimes.id,
			date: salahBeginningTimes.date,
			fajr: salahBeginningTimes.fajr,
			sunrise: salahBeginningTimes.sunrise,
			zuhr: salahBeginningTimes.zuhr,
			asr1stMithl: salahBeginningTimes.asr_1st_mithl,
			asr2ndMithl: salahBeginningTimes.asr_2nd_mithl,
			maghrib: salahBeginningTimes.maghrib,
			isha: salahBeginningTimes.isha,
		};
	}

	// private static getISODateString = (date: Date): string => {
	// 	const YYYY = date.getFullYear();
	// 	const MM = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`; // Month starts at 0 = Jan
	// 	const DD = date.getDate() < 9 ? `0${date.getDate()}` : `${date.getDate()}`; // Date starts at 1 for 1st of month
	// 	return `${YYYY}-${MM}-${DD}`;
	// };

	private static mapMosqueResult = (res: QueryResult): MosqueDTO[] =>
		res.rows.map((r: MosqueDB) => ({
			id: r.id,
			name: r.name,
			borough: r.borough,
			area: r.area,
			address: r.address,
			latitude: Number(r.latitude), // NOTE: Numeric values in DB are strings in JS
			longitude: Number(r.longitude),
			hasFemaleFacilities: Boolean(r.has_female_facilities),
			hasWheelchairAccess: Boolean(r.has_wheelchair_access),
			urlSlug: r.url_slug,
			googleUrl: r.google_url,
		}));

	async getJumuahTimesForAMosque(mosqueId: number): Promise<MosqueJumuahTimes> {
		const query = "SELECT id, mosque_name, mosque_id, first_time, second_time, area, borough FROM jumuah_times WHERE mosque_id = $1";
		const res = await this.#pool.query(query, [mosqueId]);
		if (res.rowCount === 0) throw new HttpException(404, `Jumuah times for Mosque with id=${mosqueId} could not be found`);
		const jumuahTimes = mosqueJumuahTimesDBSchema.parse(res.rows[0]);
		return {
			id: jumuahTimes.id,
			mosqueName: jumuahTimes.mosque_name,
			mosqueId: jumuahTimes.mosque_id,
			firstTime: jumuahTimes.first_time,
			secondTime: jumuahTimes.second_time,
			area: jumuahTimes.area,
			borough: jumuahTimes.borough,
		};
	}

	async getAllJumuahTimes(): Promise<MosqueJumuahTimes[]> {
		const query = "SELECT id, mosque_name, mosque_id, first_time, second_time, area, borough FROM jumuah_times";
		const res = await this.#pool.query(query);
		if (res.rowCount === 0) throw new HttpException(404, `Jumuah times could not be found`);
		return MosqueDAOPostgres.mapJumuahResult(res);
	}

	private static mapJumuahResult = (res: QueryResult): MosqueJumuahTimes[] => {
		const jumuahTimes = mosqueJumuahTimesDBSchema.array().parse(res.rows);
		return jumuahTimes.map((r: MosqueJumuahTimesDB) => ({
			id: r.id,
			mosqueName: r.mosque_name,
			mosqueId: r.mosque_id,
			firstTime: r.first_time,
			secondTime: r.second_time,
			area: r.area,
			borough: r.borough,
		}));
	};
}

export default MosqueDAOPostgres;
