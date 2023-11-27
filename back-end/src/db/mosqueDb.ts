import { MosqueDTO } from "./models/mosques";
import { MosqueTimesDailyDTO, SalahBeginningTimesDailyDTO } from "./models/dailyTimes";
import { MosqueJumuahTimes } from "./models/jumuahTimes";

export interface MosqueDAOInterface {
	getAllMosques(): Promise<MosqueDTO[]>;
	getMosqueById(id: number): Promise<MosqueDTO>;
	getTimesForAMosqueOnAGivenDate(mosqueId: number, date: Date): Promise<MosqueTimesDailyDTO>;
	getSalahBeginningTimesOnAGivenDate(date: Date): Promise<SalahBeginningTimesDailyDTO | null>;
	getJumuahTimesForAMosque(mosqueId: number): Promise<MosqueJumuahTimes>;
}
