import { T_MetaUserSession, T_MetaUserSessionBuildShape } from "@/db/types";
import Model from "../model";

class MetaUsersSessions extends Model {
        private readonly tableName = "meta_users_sessions";
        private readonly tableId = "meta_user_session_id";

        public async getSessions() {
                return this.getList<T_MetaUserSession>(this.tableName);
        }

        public async getSession(id: number) {
                return this.getSingle<T_MetaUserSession>(this.tableName, this.tableId, id);
        }

        public async createSession(data: T_MetaUserSessionBuildShape) {
                return this.createSingle<T_MetaUserSession>(this.tableName, data);
        }

        public async updateSession(id: number, updates: T_MetaUserSession) {
                return this.updateSingle<T_MetaUserSession>(this.tableName, this.tableId, id, updates);
        }

        public async deleteSession(id: number) {
                return this.deleteSingle<T_MetaUserSession>(this.tableName, this.tableId, id);
        }
}

export default MetaUsersSessions;
