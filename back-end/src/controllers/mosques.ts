import { Request, Response } from "express";
import HttpException from "../exceptions/httpExceptions";
import { MosqueServiceInterface } from "../services/mosqueServiceInterface";

class MosqueController {
	// Defining property types
	mosqueService: MosqueServiceInterface;

	constructor(mosqueServiceInstance: MosqueServiceInterface) {
		this.mosqueService = mosqueServiceInstance;
	}

	async getAllMosques(req: Request, res: Response): Promise<void> {
		const results = await this.mosqueService.getAllMosques();
		res.json(results);
	}

	async getMosqueById(req: Request, res: Response): Promise<void> {
		if (Number.isNaN(Number(req.params.id))) throw new HttpException(400, `Mosque Id parameter "${req.params.id}" is not a number`);
		const results = await this.mosqueService.getMosqueById(Number(req.params.id));
		res.json(results);
	}

	async getTimesForAMosqueOnAGivenDate(req: Request, res: Response): Promise<void> {
		const mosqueId = Number(req.params.mosqueId);
		const date = new Date(req.params.date);
		if (Number.isNaN(mosqueId)) throw new HttpException(400, `Mosque Id parameter "${req.params.mosqueId}" is not a number`);
		if (date.toDateString() === "Invalid Date") throw new HttpException(400, `Date parameter ${req.params.date} is not a valid date`);
		const results = await this.mosqueService.getTimesForAMosqueOnAGivenDate(mosqueId, date);
		res.json(results);
	}

	async getSalahBeginningTimesOnAGivenDate(req: Request, res: Response): Promise<void> {
		const date = new Date(req.params.date);
		if (date.toDateString() === "Invalid Date") throw new HttpException(400, `Date parameter ${req.params.date} is not a valid date`);
		const results = await this.mosqueService.getSalahBeginningTimesOnAGivenDate(date);
		res.json(results);
	}
}

export default MosqueController;
