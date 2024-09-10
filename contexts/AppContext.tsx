import React, { createContext, useContext, useState, ReactNode } from "react";
import { IUser } from "@/@types/User";

// Interface para o contexto da aplicação
interface AppContextType {
  theme: "light" | "dark";
  user: IUser | null;
  language: "pt" | "en";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setLanguage: React.Dispatch<React.SetStateAction<"pt" | "en">>;
}

// Crie o contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Propriedades para o AppWrapper
interface AppWrapperProps {
  children: ReactNode;
}

// Componente wrapper do provedor
export function AppWrapper({ children }: AppWrapperProps) {
  // Defina o estado inicial
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<IUser | null>(null);
  const [language, setLanguage] = useState<"pt" | "en">("pt");

  return (
    <AppContext.Provider
      value={{
        theme,
        user,
        language,
        setUser,
        setTheme,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext deve ser usado dentro de um AppWrapper");
  }
  return context;
}
