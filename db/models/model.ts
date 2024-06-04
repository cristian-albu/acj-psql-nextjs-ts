import { PoolClient } from "pg";
import pool from "../client";

type T_Value = string | number | boolean | null;

type T_QueryDb<T> =
        | {
                  data: T[];
                  error: null;
          }
        | {
                  data: null;
                  error: string;
          };

class Model {
        public async queryDb<T>(query: string, args?: Array<T_Value>): Promise<T_QueryDb<T>> {
                let client: undefined | PoolClient;

                try {
                        client = await pool.connect();
                        await client.query("BEGIN");
                        const result = await client.query(query, args);

                        if (result.rows && result.rows.length > 0) {
                                await client.query("COMMIT");
                                return { error: null, data: result.rows };
                        } else {
                                return { error: "No results found", data: null };
                        }
                } catch (error) {
                        if (client) await client.query("ROLLBACK");

                        return { error: `Database query error: ${error}`, data: null };
                } finally {
                        if (client) client.release();
                }
        }

        public async getList<T>(tableName: string) {
                const query = `SELECT * FROM ${tableName};`;
                const results = await this.queryDb<T>(query);
                return results;
        }

        public async getSingle<T>(tableName: string, tableId: string, id: string | number) {
                const query = `SELECT * FROM ${tableName} WHERE ${tableId}=$1;`;
                const results = await this.queryDb<T>(query, [id]);
                return results;
        }

        public async createSingle<T>(tableName: string, data: Record<string, T_Value>) {
                const keys = Object.keys(data);
                const columns = keys.join(", ");
                const valueMarkers = keys.map((_, index) => `$${index + 1}`).join(", ");
                const values = keys.map((key) => data[key]);

                const query = `INSERT INTO ${tableName}(${columns}) VALUES(${valueMarkers}) RETURNING *;`;
                const results = await this.queryDb<T>(query, [...values]);

                return results;
        }

        public async updateSingle<T>(
                tableName: string,
                tableId: string,
                id: string | number,
                updates: Record<string, T_Value>
        ) {
                const keys = Object.keys(updates);
                const setClauses = keys.map((key, index) => `${key}=$${index + 1}`).join(", ");
                const values = keys.map((key) => updates[key]);

                const query = `UPDATE ${tableName} SET ${setClauses} WHERE ${tableId}=$${keys.length + 1} RETURNING *;`;
                values.push(id);

                const results = await this.queryDb<T>(query, [...values]);

                return results;
        }

        public async deleteSingle<T>(tableName: string, tableId: string, id: string | number) {
                const query = `DELETE FROM ${tableName} WHERE ${tableId}=$1 RETURNING *;`;
                const results = await this.queryDb<T>(query, [id]);

                return results;
        }
}

export default Model;
