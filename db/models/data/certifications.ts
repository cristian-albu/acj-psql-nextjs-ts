import { T_Certification } from "@/db/types";
import query_db from "../query_db";

const certifications = {
  getCertifications: async (): Promise<T_Certification[]> => {
    const result = await query_db("SELECT * FROM certifications;");
    return result.rows;
  },
  getCertification: async (id: number): Promise<T_Certification | null> => {
    const result = await query_db(
      "SELECT * FROM certifications WHERE certification_id=$1;",
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
};

export default certifications;
