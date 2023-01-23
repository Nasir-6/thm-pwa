import express from "express";
import { getAllMosques, getFullTimetable } from "../controllers/mosques";

const router = express.Router();

router.get("/", getAllMosques);

router.get("/timetable", getFullTimetable);

export default router;
