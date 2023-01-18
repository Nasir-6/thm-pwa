/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import cors from "cors";
import pool from "./db";

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
