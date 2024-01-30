import { MosqueDTO } from "../db/models/mosques";
import { MosqueTimesDailyDTO, SalahBeginningTimesDailyDTO } from "../db/models/dailyTimes";
import { MosqueJumuahTimes } from "../db/models/jumuahTimes";

export interface MosqueServiceInterface {
	getAllMosques(): Promise<MosqueDTO[]>;
	getMosqueBySlug(slug: string): Promise<MosqueDTO>;
	getTimesForAMosqueOnAGivenDate(mosqueId: number, date: Date): Promise<MosqueTimesDailyDTO>;
	getSalahBeginningTimesOnAGivenDate(date: Date): Promise<SalahBeginningTimesDailyDTO | null>;
	getJumuahTimesForAMosque(mosqueId: number): Promise<MosqueJumuahTimes>;
	getAllJumuahTimes(): Promise<MosqueJumuahTimes[]>;
}
