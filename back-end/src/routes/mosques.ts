/* eslint-disable no-console */
// Note on why an additional arrow function was used:
// First - Had to use dependency injection for controller and service to make them testable!
// But doing so - meant somehow had to pass in the req and res params into controller
// Also issue with undefined service when using just mosqueController.getAllMosques - this just gave back the function
// Wanted to call it - also came across this github issue below which gave the idea of passing in the res and req params into controller
// https://github.com/graphql/express-graphql/issues/757
// Did not use next() as the controller middleware is the last so by defualt its fine - also Express 5 uses next() when rejecting promises
// Just used .catch here in case any other errors fall through - maybe can use logger later on!

import express from "express";
import { Response } from "express-serve-static-core";
import mosqueDAO from "../db";
import MosqueService from "../services/mosqueService";
import MosqueController from "../controllers/mosques";
import HttpException from "../exceptions/httpExceptions";

const mosqueService = new MosqueService(mosqueDAO);
const mosqueController = new MosqueController(mosqueService);

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (res: Response<any, Record<string, any>, number>, err: any) => {
	if (err instanceof HttpException) {
		res.status(err.status).send(err.message);
	} else {
		// eslint-disable-next-line no-console
		console.log("THE err", err);
		res.status(500).send("Some Unknown Error occured");
	}
};
router.get("/", (req, res) => {
	mosqueController.getAllMosques(req, res).catch((err) => errorHandler(res, err));
});

router.get("/:id", (req, res) => {
	mosqueController.getMosqueById(req, res).catch((err) => errorHandler(res, err));
});

router.get("/:mosqueId/timetable/:date", (req, res) => {
	mosqueController.getTimesForAMosqueOnAGivenDate(req, res).catch((err) => errorHandler(res, err));
});

export default router;
