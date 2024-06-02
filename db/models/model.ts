import { PoolClient } from "pg";
import pool from "../client";

class Model {
        public async query_db(query: string, args?: Array<string | number | boolean | null>) {
                let client: undefined | PoolClient;

                try {
                        client = await pool.connect();
                        await client.query("BEGIN");
                        const result = await client.query(query, args);
                        await client.query("COMMIT");
                        return result;
                } catch (error) {
                        if (client) await client.query("ROLLBACK");
                        console.error("Database query error:", error);
                        throw error;
                } finally {
                        if (client) client.release();
                }
        }
}

export default Model;
