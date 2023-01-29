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
import mosqueDAO from "../db";
import MosqueService from "../services/mosqueService";
import MosqueController from "../controllers/mosques";

const mosqueService = new MosqueService(mosqueDAO);
const mosqueController = new MosqueController(mosqueService);

const router = express.Router();

router.get("/", (req, res) => {
	mosqueController.getAllMosques(req, res).catch((err) => console.log("err", err));
});

router.get("/:id", (req, res) => {
	mosqueController.getMosqueById(req, res).catch((err) => console.log("err", err));
});

router.get("/:mosqueId/timetable/:date", (req, res) => {
	mosqueController.getTimesForAMosqueOnAGivenDate(req, res).catch((err) => console.log("err", err));
});

export default router;
