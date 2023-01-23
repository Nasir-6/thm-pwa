import { Request, Response } from "express";

export const getAllMosques = (req: Request, res: Response) => {
	res.send("MOSQUES SUCCESSFUL");
};

export const getFullTimetable = (req: Request, res: Response) => {
	res.send("MOSQUES Timetable SUCCESSFUL");
};
