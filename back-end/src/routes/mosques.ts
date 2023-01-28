import express from "express";
import MosqueController from "../controllers/mosques";
// import { getAllMosques, getMosqueById, getFullTimetable } from "../controllers/mosques";
import mosqueDAO from "../db";
import MosqueService from "../services/mosqueService";

const mosqueService = new MosqueService(mosqueDAO);
const mosqueController = new MosqueController(mosqueService);

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/unbound-method
router.get("/", (req, res) => {
	mosqueController.getAllMosques(req, res).catch((err) => console.log("err", err));
});

router.get("/:id", (req, res) => {
	mosqueController.getMosqueById(req, res).catch((err) => console.log("err", err));
});

router.get("/timetable", (req, res) => {
	mosqueController.getTimesForAGivenDateForAMosque(req, res).catch((err) => console.log("err", err));
});

export default router;
