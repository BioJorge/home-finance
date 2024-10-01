import { query } from "@/lib/db/connection";
import { Entidade } from "@/types/Entidades";

export async function getEntidades(): Promise<Entidade[]> {
  try {
    console.log("Iniciando query para buscar entidades");
    const entidades = await query<Entidade[]>("SELECT * FROM Ref.Entidades");
    console.log("Query executada com sucesso");
    return entidades;
  } catch (error: any) {
    console.error("Erro ao executar query:", error);
    throw new Error("Falha ao buscar entidades: " + error.message);
  }
}
