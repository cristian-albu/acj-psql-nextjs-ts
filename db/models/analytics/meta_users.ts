import Model from "../model";

export type T_MetaUser = {
        meta_user_id: string;
        created_at: string; // Using string to represent TIMESTAMP
};

export type T_MetaUserBuildShape = Omit<T_MetaUser, "created_at">;

class MetaUsers extends Model {
        private readonly tableName = "meta_users";
        private readonly tableId = "meta_user_id";

        private validateMetaUserId(id: string) {
                let error = null;
                if (id.length < 7 || id.length > 40) error = "Invalid id size";
                if (!/^[0-9a-fA-F:.:\[\]]+$/.test(id)) error = "Invalid id characters";
                return { data: null, error };
        }

        public async getMetaUsers() {
                const results = await this.getList<T_MetaUser>(this.tableName);
                return results;
        }

        public async getMetaUser(id: string) {
                const validation = this.validateMetaUserId(id);
                if (validation.error) return validation;

                const results = await this.getSingle<T_MetaUser>(this.tableName, this.tableId, id);
                return results;
        }

        public async createMetaUser(data: T_MetaUserBuildShape) {
                const validation = this.validateMetaUserId(data.meta_user_id);
                if (validation.error) return validation;

                const results = await this.createSingle<T_MetaUser>(this.tableName, data);
                return results;
        }

        public async deleteMetaUser(id: string) {
                const validation = this.validateMetaUserId(id);
                if (validation.error) return validation;

                const results = await this.deleteSingle<T_MetaUser>(this.tableName, this.tableId, id);
                return results;
        }
}

export default MetaUsers;
