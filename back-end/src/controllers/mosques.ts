import { Request, Response } from "express";
import mosqueDAO from "../db";
// TODO: Add service layer - currently using the pg implementation of it!

export const getAllMosques = async (req: Request, res: Response) => {
	const results = await mosqueDAO.getAllMosquesDetails();
	res.json(results);
};

export const getMosqueByUid = async (req: Request, res: Response) => {
	const results = await mosqueDAO.getMosqueDetailsByUid(req.params.uid);
	res.json(results);
};

export const getFullTimetable = (req: Request, res: Response) => {
	res.send("MOSQUES Timetable SUCCESSFUL");
};
