"use client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartColumnIncreasing,
//   DollarSign,
//   LucideIcon,
//   EuroIcon,
// } from "lucide-react";
import { redirect } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import { userPlaceholder } from "@/public/placeholders";
import { Euro } from "lucide-react";
import { useState } from "react";
import SearchForm from "@/components/client/SearchForm";
import EntidadesList from "@/components/client/EntidadesList";
import { Entidade } from "@/types/Entidades";
import ClientDetails from "@/components/client/EntidadeInfoBox";
import { useEntidades } from "@/hooks/useEntidades";
import EntidadeAddress from "@/components/client/EntidadeAddress";
// Formatação do saldo de acordo com a moeda do usuário
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const languageConverter = {
  en: {
    balance: "balance",
    profile: "profile",
    transactions: "transactions",
    analytics: "analytics",
    settings: "settings",
    logout: "logout",
  },
  pt: {
    balance: "saldo",
    profile: "perfil",
    transactions: "transações",
    analytics: "análises",
    settings: "configurações",
    logout: "sair",
  },
};

export default function Home() {
  const { user, language, setUser } = useAppContext();
  const { entidades, isLoading, error } = useEntidades();
  let currentUser;
  if (!user) {
    setUser(userPlaceholder);
    currentUser = userPlaceholder;
    // redirect("/login");
  } else {
    currentUser = user;
  }
  const username = currentUser?.username ?? "John Doe";

  const vms = {
    Africa: "https://africa-vm-1.azurewebsites.net",
    Europe: "https://europe-vm-1.azurewebsites.net",
    America: "https://america-vm-1.azurewebsites.net",
  };

  const [selectedVm, setSelectedVm] = useState<keyof typeof vms>("Africa");
  const [currentClient, setCurrentClient] = useState<Entidade | null>(null);

  const url = vms[selectedVm];

  return (
    /* <section className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <Card className="p-2 md:p-6 lg:p-10 flex flex-col gap-4">
        <CardTitle className="flex flex-row justify-between">
          <span className="first-letter:uppercase">
            {languageConverter[language].balance}
          </span>
          <DollarSign />
        </CardTitle>
        <CardDescription className="first-letter:uppercase">
          {language === "en"
            ? `Current ${username} balance`
            : `Saldo atual de ${username}`}
        </CardDescription>
        <CardContent className="p-0 grow flex flex-row justify-center items-center *:text-3xl text-primary font-semibold">
          <p>
            {currentUser?.balance
              ? formatCurrency(currentUser?.balance, currentUser?.currency)
              : "0.00"}
          </p>
        </CardContent>
      </Card>

      <Card className="p-2 md:p-4 col-span-2">
        <CardTitle className="flex flex-row justify-between">
          <span className="first-letter:uppercase">User Analytics</span>
          <ChartColumnIncreasing />
        </CardTitle>
        <CardContent className="first-letter:uppercase">Content 1</CardContent>
        <CardFooter className="first-letter:uppercase">Footer 1</CardFooter>
      </Card>
    </section> */

    <div className="flex flex-col p-4 gap-3">
      <h2 className="text-center font-bold text-primary">
        Ambiente de {selectedVm.toUpperCase()} selecionado - {entidades.length}{" "}
        entidades encontradas
      </h2>
      <div className="flex flex-row justify-center gap-8">
        {Object.keys(vms).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedVm(key as keyof typeof vms)}
            className={`px-4 py-2 hover:bg-primary rounded-md bg-${
              selectedVm === key ? "primary" : "secondary"
            } ${selectedVm === key ? "text-white" : ""}
            hover:text-white
            focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            {key}
          </button>
        ))}
      </div>
      <SearchForm
        setCurrentClient={setCurrentClient}
        entidades={entidades}
        isLoading={isLoading}
        error={error}
      />

      {currentClient && <ClientDetails client={currentClient} />}
      {currentClient && (
        <EntidadeAddress ID_Entidade={currentClient.ID_Entidade} />
      )}
    </div>
  );
}
