import React, { useState, useMemo } from "react";
import ComboBox from "./ComboBox";
import { Entidade } from "@/types/Entidades";

interface SearchFormProps {
  setCurrentClient: React.Dispatch<React.SetStateAction<Entidade | null>>;
  entidades: Entidade[];
  isLoading: boolean;
  error: string | null;
}

const SearchForm: React.FC<SearchFormProps> = ({
  setCurrentClient,
  entidades,
  isLoading,
  error,
}) => {
  const [searchParams, setSearchParams] = useState({
    id_entidade: "",
    nuit: "",
    // contacto: "",
    // cod_primavera: "",
  });

  const nomeItems = useMemo(() => {
    const filteredEntidades = searchParams.nuit
      ? entidades.filter((e) => e.NUIT?.toString() === searchParams.nuit)
      : entidades;
    return filteredEntidades.map((e) => ({
      id_entidade: e.ID_Entidade.toString(),
      name: e.Nome_fiscal || "",
      nuit: e.NUIT?.toString() || "",
    }));
  }, [entidades, searchParams.nuit]);

  const nuitItems = useMemo(() => {
    const filteredEntidades = searchParams.id_entidade
      ? entidades.filter(
          (e) => e.ID_Entidade.toString() === searchParams.id_entidade
        )
      : entidades;
    return filteredEntidades.map((e) => ({
      id_entidade: e.ID_Entidade.toString(),
      name: e.Nome_fiscal || "",
      nuit: e.NUIT?.toString() || "",
    }));
  }, [entidades, searchParams.id_entidade]);

  const handleSelect = (field: string) => (value: string) => {
    setSearchParams({
      id_entidade: "",
      nuit: "",
      // contacto: "",
      // cod_primavera: "",
      [field]: value,
    });

    // Determine the current client based on the selected field
    let client = null;

    if (field === "id_entidade") {
      client =
        entidades.find((e) => e.ID_Entidade.toString() === value) ?? null;
    } else if (field === "nuit") {
      client = entidades.find((e) => e.NUIT?.toString() === value) ?? null;
    }
    // Update the current client state
    setCurrentClient(client);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Realizando pesquisa com:", searchParams);
    // Implement your search logic here
  };

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row w-full justify-between align-center gap-4 h-fit bg-secondary p-3 rounded-md"
    >
      <ComboBox
        label="Nome"
        placeholder="Ex: John Doe"
        onSelect={handleSelect("id_entidade")}
        items={nomeItems}
        displayKey="name"
        onSelectKey="id_entidade"
      />
      <ComboBox
        label="NUIT"
        placeholder="Ex: 123456789"
        onSelect={handleSelect("nuit")}
        items={nuitItems.filter((el) => el.nuit !== "")} // Filter out empty NUIT
        displayKey="nuit"
        onSelectKey="nuit"
      />
      {/* Additional ComboBoxes */}
      {/* <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Pesquisar
      </button> */}
    </form>
  );
};

export default SearchForm;
