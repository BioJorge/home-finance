import { query } from "@/lib/db/connection";
import { handleError } from "@/lib/utils";
import { Moradas } from "@/types/Moradas";

export async function getMoradas(): Promise<Moradas[]> {
  try {
    console.log("Iniciando query para buscar moradas");
    const moradas = await query<Moradas[]>("SELECT * FROM Ref.Moradas");
    console.log("Query executada com sucesso");
    return moradas;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error("Erro ao executar query:", error);
    throw new Error("Falha ao buscar moradas: " + errorMessage);
  }
}

export async function getMoradasByID(ID_Entidade: number): Promise<Moradas[]> {
  try {
    console.log("Iniciando query para buscar moradas");
    console.log("Iniciando query para buscar moradas por ID de entidade");
    const sqlQuery = `SELECT * FROM Ref.Moradas WHERE ID_Entidade = @ID_Entidade`;
    const params = { ID_Entidade: ID_Entidade }; // Usando o objeto params para evitar SQL Injection
    const moradas = await query<Moradas[]>(sqlQuery, params);
    console.log("Query executada com sucesso");
    return moradas;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error("Erro ao executar query:", error);
    throw new Error("Falha ao buscar moradas: " + errorMessage);
  }
}
