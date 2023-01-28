import { Pool, QueryResult } from "pg";
import { MosqueDB, MosqueDTO } from "../models/mosques";
import { DailyTimesMosqueDTO } from "../models/dailyTimes";
import HttpException from "../../exceptions/httpExceptions";

class MosqueDAOPostgres {
	// Defining property types - # = private property
	#pool: Pool;

	constructor(poolInstance: Pool) {
		this.#pool = poolInstance;
	}

	// All the methods
	async getAllMosques(): Promise<MosqueDTO[]> {
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

	async getMosqueById(id: number): Promise<MosqueDTO> {
		const res = await this.#pool.query("SELECT * FROM mosques WHERE id = $1", [id]);
		if (res.rowCount === 0) throw new HttpException(404, "Mosque could not be found");
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

	async getTimesForAGivenDateForAMosque(mosqueId: number, date: Date): Promise<DailyTimesMosqueDTO> {
		return {
			id: 1,
			mosqueId,
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
