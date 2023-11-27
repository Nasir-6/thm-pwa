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

	async getMosqueById(idStr: string): Promise<MosqueDTO> {
		const id = Number(idStr);
		if (Number.isNaN(id)) throw new HttpException(400, `Mosque Id parameter "${idStr}" is not a number`);
		const res = await this.mosqueDAO.getMosqueById(id);
		return res;
	}

	async getTimesForAMosqueOnAGivenDate(mosqueIdStr: string, dateStr: string): Promise<MosqueTimesDailyDTO> {
		const mosqueId = Number(mosqueIdStr);
		if (Number.isNaN(mosqueId)) throw new HttpException(400, `Mosque Id parameter "${mosqueIdStr}" is not a number`);

		const date = new Date(dateStr);
		if (date.toDateString() === "Invalid Date") throw new HttpException(400, `Date parameter ${dateStr} is not a valid date`);
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

	async getJumuahTimesForAMosque(mosqueIdStr: string): Promise<MosqueJumuahTimes> {
		const mosqueId = Number(mosqueIdStr);
		if (Number.isNaN(mosqueId)) throw new HttpException(400, `Mosque Id parameter "${mosqueIdStr}" is not a number`);
		const res = await this.mosqueDAO.getJumuahTimesForAMosque(mosqueId);
		return res;
	}
}

export default MosqueService;
