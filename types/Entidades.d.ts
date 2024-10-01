// @/types/Entidade.d.ts
export interface Entidade {
  ID_Entidade: number;
  ID_Segmento: number | null;
  Nome_fiscal: string | null;
  NUIT: number | null;
  Estado: string | null;
  Tipo_entidade: string | null;
  // Contacto: string | null;
  // Codigo_primavera: string | null;
}
