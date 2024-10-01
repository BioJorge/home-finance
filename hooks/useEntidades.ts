// app/hooks/useEntidades.ts
import { useState, useEffect } from "react";
import { Entidade } from "@/types/Entidades";

export function useEntidades() {
  const [entidades, setEntidades] = useState<Entidade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEntidades() {
      try {
        const response = await fetch("/api/entidades");
        if (!response.ok) {
          throw new Error("Falha ao buscar entidades");
        }
        const data = await response.json();
        setEntidades(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    }

    fetchEntidades();
  }, []);

  return { entidades, isLoading, error };
}
