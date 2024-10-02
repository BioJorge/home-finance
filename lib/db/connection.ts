//lib/db/connection.ts
import sql from "mssql";
import db_config from "./config";
import { handleError } from "../utils";

// Define a type for SQL parameters
type SqlParameter = string | number | boolean | Date | null;

let pool: sql.ConnectionPool | null = null;

async function connectWithRetry(maxRetries = 5, initialDelay = 5000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`Tentativa ${i + 1} de conexão ao banco de dados...`);
      if (!pool) {
        pool = await new sql.ConnectionPool(db_config).connect();
      } else {
        await pool.connect();
      }
      console.log("Conectado ao banco de dados MSSQL");
      return pool;
    } catch (error: unknown) {
      const errorMessage = handleError(error);
      console.error(`Tentativa ${i + 1} falhou. Erro:`, errorMessage);
      if (i === maxRetries - 1) throw errorMessage;

      const delay = initialDelay * Math.pow(2, i);
      console.log(
        `Aguardando ${delay / 1000} segundos antes da próxima tentativa...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

export async function getPool() {
  if (!pool || !pool.connected) {
    await connectWithRetry();
  }
  return pool;
}

// Update the query function signature
export async function query<T>(
  sqlQuery: string,
  params: Record<string, SqlParameter> = {}
): Promise<T> {
  console.log("Executando query:", sqlQuery);
  const pool = await getPool();
  if (!pool) throw new Error("Pool não definido");
  const request = pool.request();

  Object.entries(params).forEach(([key, value]) => {
    request.input(key, value);
  });

  try {
    const result = await request.query(sqlQuery);
    console.log("Query executada com sucesso");
    return result.recordset as T;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error("Erro ao executar query:", errorMessage);
    throw errorMessage;
  }
}

export async function closePool() {
  if (pool) {
    await pool.close();
    pool = null;
  }
}
