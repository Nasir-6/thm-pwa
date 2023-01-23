/* eslint-disable @typescript-eslint/no-misused-promises */
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pool from "./db";

if (process.env.NODE_ENV !== "production") {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	dotenv.config();
}

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
	res.json({ test: "success" });
});

app.get("/pg", async (req, res) => {
	try {
		const testList = await pool.query("SELECT * FROM pokedex;");
		res.json(testList.rows);
	} catch (err) {
		console.log("err", err);
	}
});

const PORT = process.env.PORT || 8080;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
