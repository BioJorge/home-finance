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
interface EntidadeDB {
  ID_Entidade: number;
  ID_Segmento: number | null;
  Nome_fiscal: string | null;
  NUIT: number | null;
  Estado: string | null;
  Nome_interlocutor: string | null;
  ID_Contrato_entidade: string | null;
  Gestor_comercial: string | null;
  Tipo_entidade: string | null;
  Fase_entidade: string | null;
  Nivel_risco: string | null;
  Dimensao_financeira: string | null;
  Consumo_med_360_dias: string | null;
  Faturacao_med_360_dias: string | null;
  Ultima_Fatura: Date | null;
  Consumo_ultimos_360_dias: string | null;
  Consumo_ultimos_180_dias: string | null;
  Consumo_ultimos_90_dias: string | null;
  Consumo_ultimos_30_dias: string | null;
  Sem_Consumo_ultimos_90_dias: string | null;
  Reducao_Consumo_50_percento_90_dias: string | null;
  Reducao_Consumo_70_percento_90_dias: string | null;
  Origem: string | null;
  Desconto_fisico: string | null;
  Preferencias: string | null;
  Limite_credito: number | null;
  Periodo_contacto: number | null;
  Criado_Por: number | null;
  Criado_Data: Date | null;
  Modificado_por: number | null;
  Modificado_data: Date | null;
  OBS: string | null;
  Contactado: string | null;
  Designacao_GES20: string | null;
  Aprovacao_primavera: string | null;
  Isfrompowerapps: string | null;
}
