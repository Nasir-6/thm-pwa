import { Pool, QueryClient } from "pg";
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
		return [];
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
}

export default Mosque;
