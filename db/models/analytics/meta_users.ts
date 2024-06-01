import { T_MetaUser, T_MetaUserBuildShape, T_ModelError } from "@/db/types";
import query_db from "../query_db";

const ipRegex = /^[0-9a-fA-F:.:\[\]]+$/;

function validateMetaUserId(id: string) {
  let error = null;
  if (id.length < 7 || id.length > 40) {
    error = "Invalid id size";
  }

  if (!ipRegex.test(id)) {
    error = "Invalid id characters";
  }
  return { error };
}

const metaUsers = {
  getMetaUsers: async (): Promise<T_MetaUser[]> => {
    const result = await query_db("SELECT * FROM meta_users;");
    return result.rows;
  },
  getMetaUser: async (id: string): Promise<T_MetaUser | T_ModelError> => {
    const err = validateMetaUserId(id);
    if (err.error) return err;

    const result = await query_db(
      "SELECT * FROM meta_users WHERE meta_user_id=$1;",
      [id]
    );
    if (result.rows.length === 0) return { error: "No meta_user found" };
    return result.rows[0];
  },
  createMetaUser: async (
    data: T_MetaUserBuildShape
  ): Promise<T_MetaUser | T_ModelError> => {
    const err = validateMetaUserId(data.meta_user_id);
    if (err.error) return err;

    const result = await query_db(
      "INSERT INTO meta_users(meta_user_id) VALUES($1) RETURNING *;",
      [data.meta_user_id]
    );

    return result.rows[0];
  },
  deleteMetaUser: async (id: string): Promise<T_MetaUser | T_ModelError> => {
    const err = validateMetaUserId(id);
    if (err.error) return err;

    const result = await query_db(
      "DELETE FROM meta_users WHERE meta_user_id=$1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0) return { error: "No meta_user found" };
    return result.rows[0];
  },
};

export default metaUsers;
