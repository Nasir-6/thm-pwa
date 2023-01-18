/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";

const app = express();

app.get("/", async (req, res) => {
	res.json({ status: true, message: "Our node.js app works" });
});

const PORT = process.env.PORT || 8080;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
