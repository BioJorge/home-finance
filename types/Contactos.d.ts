// Interface for Ref.Contatos table
export interface ContactosDB {
  ID_Contacto: number;
  ID_Entidade: number | null;
  ID_Morada: number | null;
  Nome_contacto: string | null;
  Funcao: string | null;
  Departamento_responsavel: string | null;
  Data_funcao: Date | null;
  Indicativo_1: string | null;
  Contacto_telefonico: number | null;
  Indicativo_2: string | null;
  Contacto_telefonico_alternativo: number | null;
  Data_nascimento: string | null;
  Estado: string | null;
  Email: string | null;
  Criado_Por: number | null;
  Criado_Data: Date | null;
  Modificado_por: number | null;
  Modificado_Data: Date | null;
  Isfrompowerapps: string | null;
}
