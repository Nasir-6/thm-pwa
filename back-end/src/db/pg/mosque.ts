import { Pool, QueryResult } from "pg";
import { format } from "date-fns";
import { MosqueDB, MosqueDTO } from "../models/mosques";
import { MosqueTimesDailyDTO, MosqueTimesDailyDB, SalahBeginningTimesDailyDTO, SalahBeginningTimesDailyDB } from "../models/dailyTimes";
import HttpException from "../../exceptions/httpExceptions";

class MosqueDAOPostgres {
	// Defining property types - # = private property
	#pool: Pool;

	constructor(poolInstance: Pool) {
		this.#pool = poolInstance;
	}

	// All the methods
	async getAllMosques(): Promise<MosqueDTO[]> {
		// console.log("process.env.NODE_ENV", process.env.NODE_ENV);
		// console.log("IM GETTING MOSQUES FROM DB");
		// console.log("#pool", this.#pool);
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
			area: mosque.area,
			address: mosque.address,
			latitude: Number(mosque.latitude),
			longitude: Number(mosque.longitude),
			urlSlug: mosque.url_slug,
			googleUrl: mosque.google_url,
			distanceToLocationInMiles: mosque.id,
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

	async getSalahBeginningTimesOnAGivenDate(date: Date): Promise<SalahBeginningTimesDailyDTO> {
		const DD_MMM_YY = format(date, "dd-MMM-yy");
		const query = "SELECT id, date, fajr, sunrise, zuhr, asr_1st_mithl, asr_2nd_mithl, maghrib, isha FROM salah_beginning_times WHERE date = $1";
		const res = await this.#pool.query(query, [DD_MMM_YY]);
		// FIXME: What about when you want to show that we don't have this data? - Then should we throw error or give an empty array?
		if (res.rowCount === 0) throw new HttpException(404, `Salah Beginning Times with date=${DD_MMM_YY} could not be found`);
		// if (res.rowCount !== 1) throw new HttpException(500, `Found more than one time for mosque_id=${mosqueId} and date=${DD_MMM_YY}`);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const salahBeginningTimes: SalahBeginningTimesDailyDB = res.rows[0];
		console.log("salahBeginningTimes", salahBeginningTimes);
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
			area: r.area,
			address: r.address,
			latitude: Number(r.latitude), // NOTE: Numeric values in DB are strings in JS
			longitude: Number(r.longitude),
			urlSlug: r.url_slug,
			googleUrl: r.google_url,
			distanceToLocationInMiles: r.id,
		}));
}

export default MosqueDAOPostgres;
