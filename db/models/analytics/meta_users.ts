import { T_MetaUser, T_MetaUserBuildShape, T_ModelError } from "@/db/types";
import Model from "../model";

class MetaUsers extends Model {
        private readonly tableName = "meta_users";
        private readonly tableId = "meta_user_id";

        private validateMetaUserId(id: string) {
                let error = null;
                if (id.length < 7 || id.length > 40) error = "Invalid id size";
                if (!/^[0-9a-fA-F:.:\[\]]+$/.test(id)) error = "Invalid id characters";
                return { error };
        }

        public async getMetaUsers() {
                return this.getList(this.tableName);
        }

        public async getMetaUser(id: string) {
                return this.getSingle(this.tableName, this.tableId, id);
        }

        public async createMetaUser(data: T_MetaUserBuildShape) {
                return this.createSingle(this.tableName, data);
        }

        public async deleteMetaUser(id: string) {
                return this.deleteSingle(this.tableName, this.tableId, id);
        }
}

export default MetaUsers;
