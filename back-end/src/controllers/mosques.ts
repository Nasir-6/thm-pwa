import { Request, Response } from "express";
import mosque from "../db";

export const getAllMosques = async (req: Request, res: Response) => {
	const results = await mosque.getAllMosquesDetails();
	res.json(results);
};

export const getMosqueByUid = async (req: Request, res: Response) => {
	const results = await mosque.getMosqueDetailsByUid(req.params.uid);
	res.json(results);
};

export const getFullTimetable = (req: Request, res: Response) => {
	res.send("MOSQUES Timetable SUCCESSFUL");
};
