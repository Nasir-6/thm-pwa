/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/httpExceptions";

const ErrorHandler = (err: HttpException | any, req: Request, res: Response, next: NextFunction) => {
	console.log("Handling Error via MiddleWare...");
	// console.log("err.stack", err.stack);
	const errStatus: number = err.status || err.statusCode || 500;
	const errMsg = err.message || "Something went wrong";
	res.status(errStatus).json({
		success: false,
		status: errStatus,
		message: errMsg,
		stack: process.env.NODE_ENV === "development" ? err.stack : {},
	});
};

export default ErrorHandler;
