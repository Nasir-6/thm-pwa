import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("MOSQUES SUCCESSFUL");
});

router.get("/timetable", (req, res) => {
	res.send("MOSQUES Timetable SUCCESSFUL");
});

export default router;
