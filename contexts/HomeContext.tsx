"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Entidade } from "@/types/Entidades";
import { Moradas } from "@/types/Moradas";

type HomeContextType = {
  entidades: Entidade[];
  isLoadingEntidades: boolean;
  errorEntidades: string | null;
  currentClient: Entidade | null;
  setCurrentClient: (client: Entidade | null) => void;
  moradas: Moradas[];
  isLoadingMoradas: boolean;
  errorMoradas: string | null;
  currentMorada: Moradas | null;
  setCurrentMorada: (morada: Moradas | null) => void;
  fetchMoradasByID: (id: string) => Promise<void>;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [entidades, setEntidades] = useState<Entidade[]>([]);
  const [isLoadingEntidades, setIsLoadingEntidades] = useState(true);
  const [errorEntidades, setErrorEntidades] = useState<string | null>(null);
  const [currentClient, setCurrentClient] = useState<Entidade | null>(null);

  const [moradas, setMoradas] = useState<Moradas[]>([]);
  const [isLoadingMoradas, setIsLoadingMoradas] = useState(false);
  const [errorMoradas, setErrorMoradas] = useState<string | null>(null);
  const [currentMorada, setCurrentMorada] = useState<Moradas | null>(null);

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
        setErrorEntidades(
          err instanceof Error ? err.message : "Erro desconhecido"
        );
      } finally {
        setIsLoadingEntidades(false);
      }
    }

    fetchEntidades();
  }, []);

  const fetchMoradasByID = async (id: string) => {
    setIsLoadingMoradas(true);
    setErrorMoradas(null);
    try {
      const response = await fetch(`/api/moradas/${id}`);
      if (!response.ok) {
        throw new Error("Falha ao buscar moradas");
      }
      const data = await response.json();
      setMoradas(data);
    } catch (err) {
      setErrorMoradas(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoadingMoradas(false);
    }
  };

  return (
    <HomeContext.Provider
      value={{
        entidades,
        isLoadingEntidades,
        errorEntidades,
        currentClient,
        setCurrentClient,
        moradas,
        isLoadingMoradas,
        errorMoradas,
        currentMorada,
        setCurrentMorada,
        fetchMoradasByID,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
}
