export interface Moradas {
  ID_Morada: number;
  ID_Morada_TEMP_Limpeza: string | null;
  ID_Entidade: number | null;
  Tipo_morada: string | null;
  ID_Zona: number | null;
  Designacao_GES20: string | null;
  Entrega_programada: string | null;
  Entrega_programada_periodo: string | null;
  Pais: string | null;
  Distrito: string | null;
  Cep: string | null;
  Localidade: string | null;
  Rua_avenida: string | null;
  Numero: string | null;
  Andar: string | null;
  Flat_sala: string | null;
  Estado: string | null;
  Coordenada_GPS_Latitude: string | null;
  Coordenada_GPS_Longitude: string | null;
  Designacao_morada: string | null;
  Horario_Funcionamento_Abertura: string | null;
  Horario_Funcionamento_Intervalo_inicio: string | null;
  Horario_Funcionamento_Intervalo_fim: string | null;
  Horario_Funcionamento_Fecho: string | null;
  Criado_Por: number | null;
  Criado_Data: Date | null;
  Modificado_Por: number | null;
  Modificado_Data: Date | null;
  Cod_Primavera: string | null;
  Isfrompowerapps: string | null;
  Coordenadas: string | null;
  Desconto_cliente: number | null;
}
