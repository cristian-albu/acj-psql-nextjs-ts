import { T_Project } from "@/db/types";
import query_db from "../query_db";

const projects = {
  getProjects: async (): Promise<T_Project[]> => {
    const result = await query_db("SELECT * FROM projects;");
    return result.rows;
  },
  getProject: async (id: number): Promise<T_Project | null> => {
    const result = await query_db(
      "SELECT * FROM projects WHERE project_id=$1;",
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
};

export default projects;
