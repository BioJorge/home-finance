import { query } from "@/lib/db/connection";
import { Moradas } from "@/types/Moradas";

export async function getMoradas(): Promise<Moradas[]> {
  try {
    console.log("Iniciando query para buscar entidades");
    const moradas = await query<Moradas[]>("SELECT * FROM Ref.Moradas");
    console.log("Query executada com sucesso");
    return moradas;
  } catch (error: any) {
    console.error("Erro ao executar query:", error);
    throw new Error("Falha ao buscar entidades: " + error.message);
  }
}

export async function getMoradasByID(ID_Entidade: number): Promise<Moradas[]> {
  try {
    console.log("Iniciando query para buscar entidades");
    const moradas = await query<Moradas[]>(
      `SELECT * FROM Ref.Moradas where ID_Entidade = ${ID_Entidade}`
    );
    console.log("Query executada com sucesso");
    return moradas;
  } catch (error: any) {
    console.error("Erro ao executar query:", error);
    throw new Error("Falha ao buscar entidades: " + error.message);
  }
}
