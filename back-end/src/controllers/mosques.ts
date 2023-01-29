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

	async getTimesForAMosqueOnAGivenDate(req: Request, res: Response): Promise<void> {
		// TODO: Grab mosqueId and date from Request Body/Params
		try {
			const mosqueId = Number(req.params.mosqueId);
			const date = new Date(req.params.date);
			if (Number.isNaN(mosqueId)) throw new HttpException(400, `Mosque Id parameter "${req.params.mosqueId}" is not a number`);
			// Check if it is a date
			if (date.toDateString() === "Invalid Date") throw new HttpException(400, `Date parameter ${req.params.date} is not a valid date`);
			const results = await this.mosqueService.getTimesForAMosqueOnAGivenDate(mosqueId, date);
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
}

export default MosqueController;
