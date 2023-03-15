/* eslint-disable @typescript-eslint/no-misused-promises */
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mosques from "./routes/mosques";
import salah from "./routes/salah";
import ErrorHandler from "./middlewares/ErrorHandler";

if (process.env.NODE_ENV !== "production") {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	dotenv.config();
}

const app = express();
const corsOptions = {
	origin: process.env.NODE_ENV === "production" ? "https://app-thm.netlify.app" : "http://localhost:3000",
	credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v1/mosques", mosques);
app.use("/api/v1/salah", salah);

app.get("/", async (req, res) => {
	res.json({ test: "success" });
});

// Place ErrorHandler middleware last so can pass in next(err)
app.use(ErrorHandler);

app.all("*", (req, res) => {
	res.status(404).send("Resource not found");
});

const PORT = process.env.PORT || 8000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
