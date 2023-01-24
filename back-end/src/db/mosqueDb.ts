import { MosqueDto } from "./models/mosqueDto";
import { DailyTimesDto } from "./models/dailyTimesDto";

export interface MosqueDAOInterface {
	getAllMosquesDetails(): Promise<MosqueDto[]>;
	getMosqueDetailsByUid(uid: string): Promise<MosqueDto>;
	getTimesForAGivenDateForAllMosques(date: Date): Promise<DailyTimesDto[]>;
	getTimesForAGivenDateForAMosque(mosqueUid: string, date: Date): Promise<DailyTimesDto>;
}
