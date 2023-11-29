import HttpException from "../exceptions/httpExceptions";

export const parseDate = (date: string) => {
	const dateRegex = /\b\d{2}-[a-zA-Z]{3}-\d{4}\b/; // DD-MMM-YYYY TODO: Should it be same as DB which returns DD-MMM-YY?
	if (!dateRegex.test(date)) throw new HttpException(400, `Date parameter ${date} is not a valid date`);
	return new Date(date);
};

export const parseMosqueId = (id: string) => {
	const parsedId = Number(id);
	if (Number.isNaN(parsedId)) throw new HttpException(400, `Mosque Id parameter "${id}" is not a number`);
	return parsedId;
};
