import { MosqueDto } from "./models/mosqueDto";
import { DailyTimesDto } from "./models/dailyTimesDto";

export interface MosqueDb {
	getAllMosques(): Promise<MosqueDto[]>;
	getMosqueByUid(uid: string): Promise<MosqueDto>;
	getTimesForAGivenDateForAllMosques(date: Date): Promise<DailyTimesDto[]>;
	getTimesForAGivenDateForAMosque(mosqueUid: string, date: Date): Promise<DailyTimesDto>;
}
