import { Pool } from "pg";
import dotenv from "dotenv";
import { MosqueDb } from "./mosqueDb";
import Mosque from "./pg/mosque";

if (process.env.NODE_ENV !== "production") {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	dotenv.config();
}

const pool = new Pool({
	host: "localhost",
	port: 5432,
	database: process.env.DB_NAME,
	// user: decideOnUser,
	// password: decideOnPswd,
});

const mosque: MosqueDb = new Mosque(pool);
export default mosque;
