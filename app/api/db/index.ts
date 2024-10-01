import sql from "mssql";
import db_config from "@/lib/db/config";

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
    } catch (err) {
      console.error(`Tentativa ${i + 1} falhou. Erro:`, err);
      if (i === maxRetries - 1) throw err;

      const delay = initialDelay * Math.pow(2, i);
      console.log(
        `Aguardando ${delay / 1000} segundos antes da próxima tentativa...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

export async function getPool() {
  if (!pool) {
    await connectWithRetry();
  } else if (!pool.connected) {
    try {
      await pool.connect();
    } catch (error) {
      console.log("Conexão perdida, tentando reconectar...");
      await connectWithRetry();
    }
  }
  return pool;
}

export async function query<T>(sql: string, params: any = {}): Promise<T> {
  const pool = await getPool();
  if (!pool) throw new Error("Pool não definido");
  const request = pool.request();

  Object.entries(params).forEach(([key, value]) => {
    request.input(key, value);
  });

  const result = await request.query(sql);
  return result.recordset as T;
}

export async function closePool() {
  if (pool) {
    await pool.close();
    pool = null;
  }
}
