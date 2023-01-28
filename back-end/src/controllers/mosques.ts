import { Request, Response } from "express";
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
		try {
			if (Number.isNaN(Number(req.params.id))) {
				res.status(404).send("The id parameter is not a number");
			} else {
				const results = await this.mosqueService.getMosqueById(Number(req.params.id));
				res.json(results);
			}
		} catch (err) {
			console.log("MYerr", err);
			res.status(500).send("Some Error occured");
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
