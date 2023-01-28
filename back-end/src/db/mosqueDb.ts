import { MosqueDTO } from "./models/mosques";
import { DailyTimesMosqueDTO } from "./models/dailyTimes";

export interface MosqueDAOInterface {
	getAllMosques(): Promise<MosqueDTO[]>;
	getMosqueById(id: number): Promise<MosqueDTO>;
	getTimesForAMosqueOnAGivenDate(mosqueId: number, date: Date): Promise<DailyTimesMosqueDTO>;
}
