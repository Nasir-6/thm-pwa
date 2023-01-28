import { MosqueDTO } from "../db/models/mosques";
import { DailyTimesMosqueDTO } from "../db/models/dailyTimes";
import { MosqueDAOInterface } from "../db/mosqueDb";

class MosqueService {
	// Defining property types - # = private property
	mosqueDAO: MosqueDAOInterface;

	constructor(mosqueDAOInstance: MosqueDAOInterface) {
		this.mosqueDAO = mosqueDAOInstance;
	}

	// All the methods
	async getAllMosques(): Promise<MosqueDTO[]> {
		const res = await this.mosqueDAO.getAllMosques();
		return res;
	}

	async getMosqueById(id: number): Promise<MosqueDTO> {
		const res = await this.mosqueDAO.getMosqueById(id);
		// Maybe a check here??
		return res;
	}

	async getTimesForAGivenDateForAMosque(mosqueId: number, date: Date): Promise<DailyTimesMosqueDTO> {
		const res = await this.mosqueDAO.getTimesForAGivenDateForAMosque(mosqueId, date);
		return res;
	}
}

export default MosqueService;
