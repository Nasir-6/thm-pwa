import { MosqueDTO } from "./models/mosques";
import { DailyTimesMosqueDTO } from "./models/dailyTimes";

export interface MosqueDAOInterface {
	getAllMosques(): Promise<MosqueDTO[]>;
	getMosqueById(id: number): Promise<MosqueDTO>;
	getTimesForAGivenDateForAMosque(mosqueId: number, date: Date): Promise<DailyTimesMosqueDTO>;
}
