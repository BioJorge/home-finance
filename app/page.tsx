"use client";

// import { useAppContext } from "@/contexts/AppContext";
// import { userPlaceholder } from "@/public/placeholders";
import { useState } from "react";
import SearchForm from "@/components/client/SearchForm";
import ClientDetails from "@/components/client/EntidadeInfoBox";
import EntidadeAddress from "@/components/client/EntidadeAddress";
import { HomeProvider, useHomeContext } from "@/contexts/HomeContext";
import CentroCustoTable from "@/components/client/CentroCustoTable";
import ContactosTable from "@/components/client/ContactosTable";

function HomeContent() {
  const { entidades, currentClient } = useHomeContext();

  const vms = {
    Africa: "https://africa-vm-1.azurewebsites.net",
    Europe: "https://europe-vm-1.azurewebsites.net",
    America: "https://america-vm-1.azurewebsites.net",
  };

  const [selectedVm, setSelectedVm] = useState<keyof typeof vms>("Africa");

  // const url = vms[selectedVm];

  return (
    <div className="flex flex-col p-4 gap-5">
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
      <SearchForm />

      {currentClient && <ClientDetails />}
      {/* 
        Addresses from current client
      */}

      {currentClient && (
        <section className="flex flex-col items-center gap-2">
          <h3 className="font-bold text-primary">
            Selecione a morada para inspeção
          </h3>
          <EntidadeAddress />
        </section>
      )}
      {/* 
        Cost centers and contacts from current client
      */}
      {currentClient && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CentroCustoTable />
          <ContactosTable />
        </section>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <HomeProvider>
      <HomeContent />
    </HomeProvider>
  );
}
