import { Request, Response } from "express";
import mosque from "../db";

export const getAllMosques = async (req: Request, res: Response) => {
	const results = await mosque.getAllMosquesDetails();
	res.json(results);
};

export const getMosqueByUid = (req: Request, res: Response) => {
	console.log("UID", req.params.uid);
	res.send("getting mosque by uid");
};

export const getFullTimetable = (req: Request, res: Response) => {
	res.send("MOSQUES Timetable SUCCESSFUL");
};
