import { MosqueDTO } from "./models/mosques";
import { DailyTimesMosqueDTO } from "./models/dailyTimes";

export interface MosqueDAOInterface {
	getAllMosquesDetails(): Promise<MosqueDTO[]>;
	getMosqueDetailsById(id: number): Promise<MosqueDTO>;
	getTimesForAGivenDateForAllMosques(date: Date): Promise<DailyTimesMosqueDTO[]>;
	getTimesForAGivenDateForAMosque(mosqueId: number, date: Date): Promise<DailyTimesMosqueDTO>;
}
