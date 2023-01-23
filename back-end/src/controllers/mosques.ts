import { Request, Response } from "express";

export const getAllMosques = (req: Request, res: Response) => {
	res.send("MOSQUES SUCCESSFUL");
};

export const getMosqueByUid = (req: Request, res: Response) => {
	console.log("UID", req.params.uid);
	res.send("getting mosque by uid");
};

export const getFullTimetable = (req: Request, res: Response) => {
	res.send("MOSQUES Timetable SUCCESSFUL");
};
