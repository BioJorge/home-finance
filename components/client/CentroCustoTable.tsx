import { useHomeContext } from "@/contexts/HomeContext";
import { CentroCustoDB } from "@/types/CentroCusto";
import React, { useState, useEffect, useCallback } from "react";

const CentroCustoTable: React.FC = () => {
  const { currentMorada } = useHomeContext();
  const [isLoadingCentrosCusto, setIsLoadingCentrosCusto] = useState(true);
  const [errorCentrosCusto, setErrorCentrosCusto] = useState<string | null>(
    null
  );
  const [centrosCusto, setCentrosCusto] = useState<CentroCustoDB[]>([]);

  // Envolvemos a função com useCallback
  const fetchCentrosCustoByID = useCallback(async () => {
    if (!currentMorada) return;
    try {
      const response = await fetch(
        `/api/centroscusto/${currentMorada.ID_Morada}`
      );
      if (!response.ok) {
        throw new Error("Falha ao buscar centros de custo");
      }
      const data = await response.json();
      setCentrosCusto(data);
      setIsLoadingCentrosCusto(false);
    } catch (err) {
      console.error(err);
      setErrorCentrosCusto(
        err instanceof Error ? err.message : "Erro desconhecido"
      );
      setIsLoadingCentrosCusto(false);
    }
  }, [currentMorada]); // Adicionamos currentMorada como dependência

  useEffect(() => {
    if (currentMorada) {
      console.log("Morada atual: ", currentMorada);
      fetchCentrosCustoByID();
    }
  }, [currentMorada, fetchCentrosCustoByID]); // Adicionamos fetchCentrosCustoByID como dependência

  if (!currentMorada) return null;
  if (isLoadingCentrosCusto) return <p>Carregando...</p>;
  if (errorCentrosCusto) return <p>Erro: {errorCentrosCusto}</p>;
  if (centrosCusto.length === 0)
    return <p>Esta morada não possui centros de custo cadastrados</p>;

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="font-bold text-primary">Centros de Custo</h3>
      <table className="min-w-full border shadow rounded-md">
        <thead>
          <tr className="bg-secondary">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {centrosCusto.map((cc) => (
            <tr key={cc.ID_Centro_Custo}>
              <td className="border px-4 py-2">{cc.ID_Centro_Custo}</td>
              <td className="border px-4 py-2">{cc.Nome_centro_custos}</td>
              <td className="border px-4 py-2">{cc.Emissor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CentroCustoTable;
