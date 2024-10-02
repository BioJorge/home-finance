import { query } from "@/lib/db/connection";
import { handleError } from "@/lib/utils";
import { ContactosDB } from "@/types/Contactos";

export async function getContactos(): Promise<ContactosDB[]> {
  try {
    console.log("Iniciando query para buscar contactos");
    const contactos = await query<ContactosDB[]>(
      "SELECT * FROM [Ref].[Contactos]"
    );
    console.log("Query executada com sucesso");
    return contactos;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error("Erro ao executar query:", error);
    throw new Error("Falha ao buscar contactos: " + errorMessage);
  }
}

export async function getContactosByID(
  ID_Morada: number
): Promise<ContactosDB[]> {
  try {
    console.log("Iniciando query para buscar contactos");
    const sqlQuery = `SELECT * FROM [Ref].[Contactos] WHERE ID_Morada = @ID_Morada`;
    const params = { ID_Morada: ID_Morada };
    const contactos = await query<ContactosDB[]>(sqlQuery, params);
    console.log("Query executada com sucesso");
    return contactos;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error("Erro ao executar query:", error);
    throw new Error("Falha ao buscar contactos: " + errorMessage);
  }
}
