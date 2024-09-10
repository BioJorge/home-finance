"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";

const languageConverter = {
  en: {
    logout: "Are you sure you want to log out?",
    yes: "Yes",
    no: "No",
  },
  pt: {
    logout: "Tem certeza que deseja deslogar?",
    yes: "Sim",
    no: "Não",
  },
};

export default function LogoutConfirmationPage() {
  const { language, setUser } = useAppContext();
  const router = useRouter();

  const handleYesSubmit = () => {
    setUser(null);
    // Assuming you have a login page at '/login'
    router.push("/login");
  };

  const handleNoSubmit = () => {
    router.push("/");
  };

  return (
    <section className="flex flex-col h-full justify-center gap-10">
      <h1 className="text-3xl">{languageConverter[language].logout}</h1>
      <div className="flex flex-row justify-evenly items-center">
        <Button
          className="bg-primary hover:bg-foreground"
          onClick={handleYesSubmit}
        >
          {languageConverter[language].yes}
          <span className="sr-only">{languageConverter[language].yes}</span>
        </Button>
        <Button
          className="bg-foreground hover:bg-primary"
          onClick={handleNoSubmit}
        >
          {languageConverter[language].no}
          <span className="sr-only">{languageConverter[language].no}</span>
        </Button>
      </div>
    </section>
  );
}
