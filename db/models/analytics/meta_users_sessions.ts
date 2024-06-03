import { T_MetaUserSession, T_ModelError } from "@/db/types";
import Model from "../model";

class MetaUsersSessions extends Model {
        private readonly SQL_SELECT_ALL = "SELECT * FROM meta_users_sessions;";
        private readonly SQL_SELECT_BY_ID = "SELECT * FROM meta_users_sessions WHERE meta_user_session_id=$1";
        private readonly SQL_DELTE_BY_ID = "DELETE FROM meta_users_sessions WHERE meta_user_session_id=$1";

        public async getSessions(): Promise<T_MetaUserSession[]> {
                const results = await this.queryDb(this.SQL_SELECT_ALL);

                return results.rows;
        }

        public async getSession(): Promise<T_MetaUserSession | T_ModelError> {
                const result = await this.queryDb(this.SQL_SELECT_BY_ID);

                if (result.rows.length === 0) return { error: "No meta user session found" };

                return result.rows[0];
        }

        public async createSession(): Promise<T_MetaUserSession | T_ModelError> {
                const result = await this.queryDb("");

                return result.rows[0];
        }

        public async updateSession(id: number, updates: T_MetaUserSession): Promise<T_MetaUserSession | T_ModelError> {
                const { query, values } = this.createUpdateQuery(
                        "meta_users_sessions",
                        "meta_user_session_id",
                        id,
                        updates
                );
                const result = await this.queryDb(query, values);

                return result.rows[0];
        }

        public async deleteSession(id: number): Promise<T_MetaUserSession | T_ModelError> {
                const result = await this.queryDb(this.SQL_DELTE_BY_ID, [id]);

                return result.rows[0];
        }
}

export default MetaUsersSessions;
