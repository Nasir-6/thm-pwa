import { Request, Response } from "express";
import mosqueDAO from "../db";
// TODO: Add service layer - currently using the pg implementation of it!

export const getAllMosques = async (req: Request, res: Response) => {
	const results = await mosqueDAO.getAllMosquesDetails();
	res.json(results);
};

export const getMosqueById = async (req: Request, res: Response) => {
	const results = await mosqueDAO.getMosqueDetailsById(Number(req.params.id));
	res.json(results);
};

export const getFullTimetable = (req: Request, res: Response) => {
	res.send("MOSQUES Timetable SUCCESSFUL");
};
