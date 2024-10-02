import { query } from "@/lib/db/connection";
import { handleError } from "@/lib/utils";
import { CentroCustoDB } from "@/types/CentroCusto";

export async function getCentrosCusto(): Promise<CentroCustoDB[]> {
  try {
    console.log("Iniciando query para buscar centrosCusto");
    const centrosCusto = await query<CentroCustoDB[]>(
      "SELECT * FROM [Ref].[Centro_custo]"
    );
    console.log("Query executada com sucesso");
    return centrosCusto;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error("Erro ao executar query:", error);
    throw new Error("Falha ao buscar centrosCusto: " + errorMessage);
  }
}

export async function getCentrosCustoByID(
  ID_Morada: number
): Promise<CentroCustoDB[]> {
  try {
    console.log("Iniciando query para buscar centrosCusto");
    const sqlQuery = `SELECT * FROM [Ref].[Centro_custo] WHERE ID_Morada = @ID_Morada`;
    const params = { ID_Morada: ID_Morada };
    const centrosCusto = await query<CentroCustoDB[]>(sqlQuery, params);
    console.log("Query executada com sucesso");
    return centrosCusto;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error("Erro ao executar query:", error);
    throw new Error("Falha ao buscar centrosCusto: " + errorMessage);
  }
}
