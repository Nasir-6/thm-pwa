/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
	res.json({ test: "success" });
});

const PORT = process.env.PORT || 8080;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
