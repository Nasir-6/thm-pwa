import pg from "pg";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	dotenv.config();
}

const { Pool } = pg;

const pool = new Pool({
	host: "localhost",
	port: 5432,
	database: process.env.DB_NAME,
	// user: decideOnUser,
	// password: decideOnPswd,
});

export default pool;
