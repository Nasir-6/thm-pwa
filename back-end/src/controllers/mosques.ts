// TODO: Collapse all logic here into service class
// And call the service from the routes!!
import { Request, Response } from "express";
import HttpException from "../exceptions/httpExceptions";
import { MosqueServiceInterface } from "../services/mosqueServiceInterface";

class MosqueController {
	// Defining property types
	mosqueService: MosqueServiceInterface;

	constructor(mosqueServiceInstance: MosqueServiceInterface) {
		this.mosqueService = mosqueServiceInstance;
	}

	// async getAllMosques(req: Request, res: Response): Promise<void> {
	// 	const results = await this.mosqueService.getAllMosques();
	// 	res.json(results);
	// }

	// async getMosqueById(req: Request, res: Response): Promise<void> {
	// 	if (Number.isNaN(Number(req.params.id))) throw new HttpException(400, `Mosque Id parameter "${req.params.id}" is not a number`);
	// 	const results = await this.mosqueService.getMosqueById(Number(req.params.id));
	// 	res.json(results);
	// }

	// async getTimesForAMosqueOnAGivenDate(req: Request, res: Response): Promise<void> {
	// 	const date = new Date(req.params.date);
	// 	if (date.toDateString() === "Invalid Date") throw new HttpException(400, `Date parameter ${req.params.date} is not a valid date`);
	// 	const results = await this.mosqueService.getTimesForAMosqueOnAGivenDate(mosqueId, date);
	// 	res.json(results);
	// }

	async getSalahBeginningTimesOnAGivenDate(req: Request, res: Response): Promise<void> {
		const date = new Date(req.params.date);
		if (date.toDateString() === "Invalid Date") throw new HttpException(400, `Date parameter ${req.params.date} is not a valid date`);
		const results = await this.mosqueService.getSalahBeginningTimesOnAGivenDate(date);
		res.json(results);
	}

	// async getJumuahTimesForAMosque(mosqueId: string): Promise<MosqueJumuahTimes> {
	// 	const res = await this.mosqueService.getJumuahTimesForAMosque(mosqueId);
	// 	return res;
	// }
}

export default MosqueController;
