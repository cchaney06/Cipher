import "dotenv/config";

import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT ?? 5432),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,

    connectionTimeoutMillis: 5000,
});

export async function checkDatabaseConnection() {
    const result = await pool.query(
        "SELECT NOW() AS current_time"
    );

    return result.rows[0];
}