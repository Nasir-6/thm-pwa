import { MosqueDTO } from "../db/models/mosques";
import { MosqueTimesDailyDTO } from "../db/models/dailyTimes";

export interface MosqueServiceInterface {
	getAllMosques(): Promise<MosqueDTO[]>;
	getMosqueById(id: number): Promise<MosqueDTO>;
	getTimesForAMosqueOnAGivenDate(mosqueId: number, date: Date): Promise<MosqueTimesDailyDTO>;
}
