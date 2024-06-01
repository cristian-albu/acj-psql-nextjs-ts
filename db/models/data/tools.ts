import { T_Tool } from "@/db/types";
import query_db from "../query_db";

const tools = {
  getTools: async (): Promise<T_Tool[]> => {
    const result = await query_db("SELECT * FROM tools;");
    return result.rows;
  },
  getTool: async (id: number): Promise<T_Tool | null> => {
    const result = await query_db("SELECT * FROM tools WHERE tool_id=$1;", [
      id,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
};

export default tools;
