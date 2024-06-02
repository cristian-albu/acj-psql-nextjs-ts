import { T_MetaUser, T_MetaUserBuildShape, T_ModelError } from "@/db/types";
import Model from "../model";

class MetaUsers extends Model {
        private readonly SQL_SELECT_ALL = "SELECT * FROM meta_users;";
        private readonly SQL_SELECT_BY_ID = "SELECT * FROM meta_users WHERE meta_user_id=$1;";
        private readonly SQL_INSERT = "INSERT INTO meta_users(meta_user_id) VALUES($1) RETURNING *;";
        private readonly SQL_DELETE_BY_ID = "DELETE FROM meta_users WHERE meta_user_id=$1 RETURNING *;";

        private validateMetaUserId(id: string) {
                let error = null;
                if (id.length < 7 || id.length > 40) error = "Invalid id size";
                if (!/^[0-9a-fA-F:.:\[\]]+$/.test(id)) error = "Invalid id characters";
                return { error };
        }

        public async getMetaUsers(): Promise<T_MetaUser[]> {
                const result = await this.query_db(this.SQL_SELECT_ALL);
                return result.rows;
        }

        public async getMetaUser(id: string): Promise<T_MetaUser | T_ModelError> {
                const err = this.validateMetaUserId(id);
                if (err.error) return err;

                const result = await this.query_db(this.SQL_SELECT_BY_ID, [id]);
                if (result.rows.length === 0) return { error: "No meta_user found" };
                return result.rows[0];
        }

        public async createMetaUser(data: T_MetaUserBuildShape): Promise<T_MetaUser | T_ModelError> {
                const err = this.validateMetaUserId(data.meta_user_id);
                if (err.error) return err;

                const result = await this.query_db(this.SQL_INSERT, [data.meta_user_id]);

                return result.rows[0];
        }

        public async deleteMetaUser(id: string): Promise<T_MetaUser | T_ModelError> {
                const err = this.validateMetaUserId(id);
                if (err.error) return err;

                const result = await this.query_db(this.SQL_DELETE_BY_ID, [id]);
                if (result.rows.length === 0) return { error: "No meta_user found" };
                return result.rows[0];
        }
}

export default MetaUsers;
