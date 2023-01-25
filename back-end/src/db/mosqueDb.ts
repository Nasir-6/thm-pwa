import { MosqueDto } from "./models/mosqueDto";
import { DailyTimesMosqueDto } from "./models/dailyTimesDto";

export interface MosqueDAOInterface {
	getAllMosquesDetails(): Promise<MosqueDto[]>;
	getMosqueDetailsById(id: number): Promise<MosqueDto>;
	getTimesForAGivenDateForAllMosques(date: Date): Promise<DailyTimesMosqueDto[]>;
	getTimesForAGivenDateForAMosque(mosqueId: number, date: Date): Promise<DailyTimesMosqueDto>;
}
