import { PoolClient } from "pg";
import pool from "../client";

type T_Value = string | number | boolean | null;
class Model {
        public async queryDb(query: string, args?: Array<T_Value>) {
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

        public createUpdateQuery(
                table: string,
                table_id: string,
                id: number | string,
                updates: Record<string, T_Value>
        ) {
                const keys = Object.keys(updates);
                const setClauses = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
                const values = keys.map((key) => updates[key]);

                const query = `UPDATE ${table} SET ${setClauses} WHERE ${table_id} = $${keys.length + 1}`;
                values.push(id);

                return { query, values };
        }
}

export default Model;
