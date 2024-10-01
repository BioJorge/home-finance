// app/components/EntidadesList.tsx

"use client";

import { useEntidades } from "@/hooks/useEntidades";

export default function EntidadesList() {
  const { entidades, isLoading, error } = useEntidades();

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Lista de Entidades - {entidades.length} resultados</h2>
      {/* <ul>
        {entidades.map((entidade) => (
          <li key={entidade.ID_Entidade}>
            {entidade.Nome_fiscal || "Nome não disponível"} - NUIT:{" "}
            {entidade.NUIT || "N/A"}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
