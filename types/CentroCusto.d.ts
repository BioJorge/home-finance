// Interface for Ref.Centro_custo table
export interface CentroCustoDB {
  ID_Centro_Custo: number;
  ID_Entidade: number | null;
  ID_Morada: number | null;
  Nome_centro_custos: string | null;
  Estado: string | null;
  Tem_faturacao: string | null;
  Tipo_faturacao: string | null;
  Documento_faturacao: string | null;
  Periodicidade_faturacao: string | null;
  Dia_mes_limite_faturacao: string | null;
  Credito_pagamento_dias: string | null;
  Criado_Por: number | null;
  Criado_Data: Date | null;
  Emissor: string | null;
  Codigo: string | null;
  Modificado_por: number | null;
  Modificado_Data: Date | null;
  Cod_Primavera: string | null;
  Isfrompowerapps: string | null;
}
