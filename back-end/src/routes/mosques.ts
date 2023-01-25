import express from "express";
import { getAllMosques, getMosqueById, getFullTimetable } from "../controllers/mosques";

const router = express.Router();

router.get("/", getAllMosques);

router.get("/:id", getMosqueById);

router.get("/timetable", getFullTimetable);

export default router;
