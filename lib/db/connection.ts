import sql from "mssql";
import db_config from "./config";

let pool: sql.ConnectionPool | null = null;

export async function getPool() {
  if (!pool) {
    console.log("Criando nova pool de conexão");
    pool = new sql.ConnectionPool(db_config);
    await pool.connect();
    console.log("Pool de conexão criada e conectada");
  }
  return pool;
}

export async function query<T>(sqlQuery: string, params: any = {}): Promise<T> {
  console.log("Executando query:", sqlQuery);
  const pool = await getPool();
  const request = pool.request();

  Object.entries(params).forEach(([key, value]) => {
    request.input(key, value);
  });

  try {
    const result = await request.query(sqlQuery);
    console.log("Query executada com sucesso");
    return result.recordset as T;
  } catch (error) {
    console.error("Erro ao executar query:", error);
    throw error;
  }
}
