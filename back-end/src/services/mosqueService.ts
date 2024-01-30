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

	async getMosqueBySlug(slug: string): Promise<MosqueDTO> {
		const res = await this.mosqueDAO.getMosqueBySlug(slug);
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

	async getJumuahTimesForAMosque(mosqueId: number): Promise<MosqueJumuahTimes> {
		const res = await this.mosqueDAO.getJumuahTimesForAMosque(mosqueId);
		return res;
	}

	async getAllJumuahTimes(): Promise<MosqueJumuahTimes[]> {
		const res = await this.mosqueDAO.getAllJumuahTimes();
		return res;
	}
}

export default MosqueService;
