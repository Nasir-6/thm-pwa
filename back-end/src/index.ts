/* eslint-disable @typescript-eslint/no-misused-promises */
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pool from "./db";
import mosques from "./routes/mosques";

if (process.env.NODE_ENV !== "production") {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	dotenv.config();
}

const app = express();
app.use(cors());

app.use("/api/mosques", mosques);

app.get("/", async (req, res) => {
	res.json({ test: "success" });
});

app.get("/pg", async (req, res) => {
	try {
		// console.log("pool", pool);
		const testList = await pool.query("SELECT * FROM mosques;");
		res.json(testList.rows);
	} catch (err) {
		console.log("err", err);
	}
});

app.all("*", (req, res) => {
	res.status(404).send("Resource not found");
});

const PORT = process.env.PORT || 8080;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
