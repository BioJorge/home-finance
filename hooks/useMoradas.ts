// app/hooks/useMoradas.ts
import { Moradas } from "@/types/Moradas";
import { useState, useEffect } from "react";

export function useMoradas() {
  const [moradas, setMoradas] = useState<Moradas[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMoradasByID() {
      try {
        const response = await fetch("/api/moradas");
        if (!response.ok) {
          throw new Error("Falha ao buscar moradas");
        }
        const data = await response.json();
        setMoradas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoradasByID();
  }, []);

  return { moradas, isLoading, error };
}
