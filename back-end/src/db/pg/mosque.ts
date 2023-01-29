import { Pool, QueryResult } from "pg";
import { MosqueDB, MosqueDTO } from "../models/mosques";
import { DailyTimesMosqueDTO, DailyTimesMosqueDB } from "../models/dailyTimes";
import HttpException from "../../exceptions/httpExceptions";

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
			address: mosque.address,
			latitude: mosque.latitude,
			longitude: mosque.longitude,
			googleUrl: mosque.google_url,
		};
	}

	async getTimesForAMosqueOnAGivenDate(mosqueId: number, date: Date): Promise<DailyTimesMosqueDTO> {
		console.log("dateINDB", date);
		console.log(date.getMonth());
		const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
		console.log("formattedDate", formattedDate);

		const query = "SELECT * FROM mosque_times WHERE mosque_id = $1 AND date = to_date($2, 'YYYY-MM-DD')";
		const res = await this.#pool.query(query, [mosqueId, formattedDate]);

		if (res.rowCount === 0) throw new HttpException(404, `Mosque with id=${mosqueId} and date=${formattedDate} could not be found`);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const mosqueTimes: DailyTimesMosqueDB = res.rows[0];
		console.log("mosqueTimes.date", mosqueTimes.date);
		// const dateStr = `${formattedDate}T${mosqueTimes.fajr}`;
		// console.log("dateStr", dateStr);
		// const formattedFajr = new Date(dateStr);
		// console.log("formattedFajr", formattedFajr);

		return {
			id: mosqueTimes.id,
			mosqueId: mosqueTimes.mosque_id,
			mosqueName: mosqueTimes.mosque_name,
			date: mosqueTimes.date,
			fajr: new Date(),
			zuhr: new Date("2015-03-25"),
			asr: new Date("2015-03-25"),
			maghrib: new Date("2015-03-25"),
			isha: new Date("2015-03-25"),
		};
	}

	private static mapMosqueResult = (
		res: QueryResult
	): MosqueDTO[] => // projection
		res.rows.map((r: MosqueDB) => ({
			id: r.id,
			name: r.name,
			address: r.address,
			latitude: r.latitude,
			longitude: r.longitude,
			googleUrl: r.google_url,
		}));
}

export default MosqueDAOPostgres;
