import { Express } from "express";

const printNum = () => {
	const num = 2;
	console.log(num);
	const name = "Nasir";
	return `How are you, ${name}?`;
};

printNum();
