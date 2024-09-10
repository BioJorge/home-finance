"use client";
import { useAppContext } from "@/contexts/AppContext";

export default function LanguageToggler({
  acessibilityText,
}: {
  acessibilityText: string;
}) {
  const { language, setLanguage } = useAppContext();
  return (
    <button
      className="text-foreground w-fit p-0 text-xl hover:text-primary"
      onClick={() => setLanguage(language === "en" ? "pt" : "en")}
    >
      {language === "en" ? "PT" : "EN"}
      <span className="sr-only">{acessibilityText}</span>
    </button>
  );
}
