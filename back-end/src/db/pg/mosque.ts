import { Pool, QueryResult } from "pg";
import { MosqueDB, MosqueDto } from "../models/mosqueDto";
import { DailyTimesDto } from "../models/dailyTimesDto";

class MosqueDAOPostgres {
	// Defining property types - # = private property
	#pool: Pool;

	constructor(poolInstance: Pool) {
		this.#pool = poolInstance;
	}

	// All the methods
	async getAllMosquesDetails(): Promise<MosqueDto[]> {
		// try {
		const res = await this.#pool.query("SELECT * FROM mosques");
		return MosqueDAOPostgres.mapMosqueResult(res);
		// } catch (err: unknown) {
		// return err;
		// } finally {
		// console.log("Tried to get all mosques");
		// }
		// return [];
	}

	async getMosqueDetailsByUid(uid: string): Promise<MosqueDto> {
		const res = await this.#pool.query("SELECT * FROM mosques WHERE uid = $1", [uid]);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const mosque: MosqueDB = res.rows[0];
		return {
			uid: mosque.uid,
			name: mosque.name,
			address: mosque.address,
			latitude: mosque.latitude,
			longitude: mosque.longitude,
			googleUrl: mosque.google_url,
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
		res.rows.map((r: MosqueDB) => ({
			uid: r.uid,
			name: r.name,
			address: r.address,
			latitude: r.latitude,
			longitude: r.longitude,
			googleUrl: r.google_url,
		}));
}

export default MosqueDAOPostgres;
