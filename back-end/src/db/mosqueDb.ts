import { MosqueDto } from "./models/mosqueDto";
import { DailyTimesDto } from "./models/dailyTimesDto";

export interface MosqueDAOInterface {
	getAllMosquesDetails(): Promise<MosqueDto[]>;
	getMosqueDetailsById(id: number): Promise<MosqueDto>;
	getTimesForAGivenDateForAllMosques(date: Date): Promise<DailyTimesDto[]>;
	getTimesForAGivenDateForAMosque(mosqueId: number, date: Date): Promise<DailyTimesDto>;
}
