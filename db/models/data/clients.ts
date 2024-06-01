import { T_Client } from "@/db/types";
import query_db from "../query_db";

const clients = {
  getClients: async (): Promise<T_Client[]> => {
    const result = await query_db("SELECT * FROM clients;");
    return result.rows;
  },
  getClient: async (id: number): Promise<T_Client | null> => {
    const result = await query_db("SELECT * FROM clients WHERE client_id=$1;", [
      id,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
};

export default clients;
