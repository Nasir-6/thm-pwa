import { Pool } from "pg";
import dotenv from "dotenv";
import { MosqueDAOInterface } from "./mosqueDb";
import MosqueDAOPostgres from "./pg/mosque";

if (process.env.NODE_ENV !== "production") {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	dotenv.config();
}

// TODO: Will need to figure out how to pass in .env values to docker container
// database was undefined as no dot.env file in docker container!!
const pool = new Pool({
	host: "db",
	port: 5432,
	database: "thm",
	user: "docker",
	password: "1234",
});

const mosqueDAO: MosqueDAOInterface = new MosqueDAOPostgres(pool);
export default mosqueDAO;
