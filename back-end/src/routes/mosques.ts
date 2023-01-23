import express from "express";
import {
	getAllMosques,
	getMosqueByUid,
	getFullTimetable,
} from "../controllers/mosques";

const router = express.Router();

router.get("/", getAllMosques);

router.get("/:uid", getMosqueByUid);

router.get("/timetable", getFullTimetable);

export default router;
