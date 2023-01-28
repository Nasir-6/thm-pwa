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
		try {
			const results = await this.mosqueService.getAllMosques();
			res.json(results);
		} catch (err) {
			if (err instanceof HttpException) {
				res.status(err.status).send(err.message);
			} else {
				// eslint-disable-next-line no-console
				console.log("THE err", err);
				res.status(500).send("Some Unknown Error occured");
			}
		}
	}

	async getMosqueById(req: Request, res: Response): Promise<void> {
		try {
			if (Number.isNaN(Number(req.params.id))) throw new HttpException(400, `Mosque Id parameter "${req.params.id}" is not a number`);
			const results = await this.mosqueService.getMosqueById(Number(req.params.id));
			res.json(results);
		} catch (err) {
			if (err instanceof HttpException) {
				res.status(err.status).send(err.message);
			} else {
				// eslint-disable-next-line no-console
				console.log("THE err", err);
				res.status(500).send("Some Unknown Error occured");
			}
		}
	}

	async getTimesForAGivenDateForAMosque(req: Request, res: Response): Promise<void> {
		// TODO: Grab mosqueId and date from Request Body/Params
		const mosqueId = 1;
		const date = new Date("2015-03-25");
		const result = await this.mosqueService.getTimesForAGivenDateForAMosque(mosqueId, date);
		res.json(result);
	}
}

export default MosqueController;
