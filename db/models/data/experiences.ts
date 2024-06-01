import { T_Experience } from "@/db/types";
import query_db from "../query_db";

const experiences = {
  getExperiences: async (): Promise<T_Experience[]> => {
    const result = await query_db("SELECT * FROM experiences;");
    return result.rows;
  },
  getExperience: async (id: number): Promise<T_Experience | null> => {
    const result = await query_db(
      "SELECT * FROM experiences WHERE experience_id=$1;",
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
};

export default experiences;
