import { MosqueDTO } from "../db/models/mosques";
import { MosqueTimesDailyDTO, SalahBeginningTimesDailyDTO } from "../db/models/dailyTimes";
import { MosqueDAOInterface } from "../db/mosqueDb";
import HttpException from "../exceptions/httpExceptions";
import { MosqueJumuahTimes } from "../db/models/jumuahTimes";

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

	async getMosqueById(id: string): Promise<MosqueDTO> {
		const idNum = Number(id);
		if (Number.isNaN(idNum)) throw new HttpException(400, `Mosque Id parameter "${id}" is not a number`);
		const res = await this.mosqueDAO.getMosqueById(idNum);
		return res;
	}

	async getTimesForAMosqueOnAGivenDate(mosqueId: number, date: Date): Promise<MosqueTimesDailyDTO> {
		// Check if mosque exists - will throw if not
		const mosque = await this.mosqueDAO.getMosqueById(mosqueId);
		if (mosque.id !== mosqueId) throw new HttpException(500, `returned mosque id ${mosque.id} did not match the id ${mosqueId}!`);

		const res = await this.mosqueDAO.getTimesForAMosqueOnAGivenDate(mosqueId, date);
		return res;
	}

	async getSalahBeginningTimesOnAGivenDate(date: Date): Promise<SalahBeginningTimesDailyDTO | null> {
		const res = await this.mosqueDAO.getSalahBeginningTimesOnAGivenDate(date);
		return res;
	}

	async getJumuahTimesForAMosque(mosqueId: string): Promise<MosqueJumuahTimes> {
		const res = await this.mosqueDAO.getJumuahTimesForAMosque(mosqueId);
		return res;
	}
}

export default MosqueService;
