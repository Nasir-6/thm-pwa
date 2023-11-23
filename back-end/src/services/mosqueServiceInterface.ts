import { MosqueDTO } from "../db/models/mosques";
import { MosqueTimesDailyDTO, SalahBeginningTimesDailyDTO } from "../db/models/dailyTimes";
import { MosqueJumuahTimes } from "../db/models/jumuahTimes";

export interface MosqueServiceInterface {
	getAllMosques(): Promise<MosqueDTO[]>;
	getMosqueById(id: number): Promise<MosqueDTO>;
	getTimesForAMosqueOnAGivenDate(mosqueId: number, date: Date): Promise<MosqueTimesDailyDTO>;
	getSalahBeginningTimesOnAGivenDate(date: Date): Promise<SalahBeginningTimesDailyDTO | null>;
	getJumuahTimesForAMosque(mosqueId: string): Promise<MosqueJumuahTimes>;
}
