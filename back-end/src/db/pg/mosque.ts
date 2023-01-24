import { Pool, QueryResult } from "pg";
import { MosqueDto } from "../models/mosqueDto";
import { DailyTimesDto } from "../models/dailyTimesDto";

class Mosque {
	// Defining property types - # = private property
	#pool: Pool;

	constructor(poolInstance: Pool) {
		this.#pool = poolInstance;
	}

	// All the methods
	async getAllMosquesDetails(): Promise<MosqueDto[]> {
		// try {
		const res = await this.#pool.query("SELECT * FROM mosques");
		return Mosque.mapMosqueResult(res);
		// } catch (err: unknown) {
		// return err;
		// } finally {
		// console.log("Tried to get all mosques");
		// }
		// return [];
	}

	async getMosqueDetailsByUid(uid: string): Promise<MosqueDto> {
		return {
			uid,
			name: "name",
			address: "address",
			latitude: 22,
			longitude: 22,
			googleUrl: "gUrl",
		};
	}

	async getTimesForAGivenDateForAllMosques(date: Date): Promise<DailyTimesDto[]> {
		return [];
	}

	async getTimesForAGivenDateForAMosque(mosqueUid: string, date: Date): Promise<DailyTimesDto> {
		return {
			uid: "timetableUID",
			mosqueUid,
			mosqueName: "mosqueName",
			date,
			fajr: new Date("2015-03-25"),
			zuhr: new Date("2015-03-25"),
			asr: new Date("2015-03-25"),
			maghrib: new Date("2015-03-25"),
			isha: new Date("2015-03-25"),
		};
	}

	private static mapMosqueResult = (
		res: QueryResult
	): MosqueDto[] => // projection
		res.rows.map((r) => ({
			uid: r.uid,
			name: r.name,
			address: r.address,
			latitude: r.latitude,
			longitude: r.longitude,
			googleUrl: r.google_url,
		}));
}

export default Mosque;
