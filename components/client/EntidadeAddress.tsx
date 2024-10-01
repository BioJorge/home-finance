import React from "react";
import { Entidade } from "@/types/Entidades";
import { Moradas } from "@/types/Moradas";

interface ClientDetailsProps {
  ID_Entidade: Entidade["ID_Entidade"];
}

const EntidadeAddress: React.FC<ClientDetailsProps> = ({ ID_Entidade }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [moradas, setMoradas] = React.useState<Moradas[]>([]);

  React.useEffect(() => {
    async function fetchMoradasByID() {
      try {
        const response = await fetch("/api/moradas/" + ID_Entidade);
        if (!response.ok) {
          throw new Error("Falha ao buscar entidades");
        }
        const data = await response.json();
        console.log(data);
        setMoradas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoradasByID();
  }, [ID_Entidade]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }
  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <table className="min-w-full bg-white border shadow rounded-md">
      <thead>
        <tr className="bg-secondary">
          <th className="py-2 px-4 border">ID Morada</th>
          <th className="py-2 px-4 border">Localidade</th>
          <th className="py-2 px-4 border">Andar</th>
          <th className="py-2 px-4 border">Coordenadas</th>
          <th className="py-2 px-4 border">Cod Primavera</th>
        </tr>
      </thead>
      <tbody>
        {moradas.map((morada) => (
          <tr key={morada.ID_Morada} className="hover:bg-gray-100">
            <td className="py-2 px-4 border">{morada.ID_Morada}</td>
            <td className="py-2 px-4 border">{morada.Localidade || "-"}</td>
            <td className="py-2 px-4 border">{morada.Andar || "-"}</td>
            <td className="py-2 px-4 border">{morada.Coordenadas || "-"}</td>
            <td className="py-2 px-4 border">{morada.Cod_Primavera || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EntidadeAddress;
