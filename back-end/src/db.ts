import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
	host: "localhost",
	port: 5432,
	database: "pokemon",
});

export default pool;
