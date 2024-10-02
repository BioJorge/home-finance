import { useHomeContext } from "@/contexts/HomeContext";
import { ContactosDB } from "@/types/Contactos";
import React, { useState, useEffect, useCallback } from "react";

const ContactosTable: React.FC = () => {
  const { currentMorada } = useHomeContext();
  const [isLoadingContactos, setIsLoadingContactos] = useState(true);
  const [errorContactos, setErrorContactos] = useState<string | null>(null);
  const [contactos, setContactos] = useState<ContactosDB[]>([]);

  const fetchContactos = useCallback(async () => {
    if (!currentMorada) return;
    try {
      const response = await fetch(`/api/contactos/${currentMorada.ID_Morada}`);
      if (!response.ok) {
        throw new Error("Falha ao buscar contactos");
      }
      const data = await response.json();
      setContactos(data);
      setIsLoadingContactos(false);
    } catch (err) {
      console.error(err);
      setErrorContactos(
        err instanceof Error ? err.message : "Erro desconhecido"
      );
      setIsLoadingContactos(false);
    }
  }, [currentMorada]);

  useEffect(() => {
    if (currentMorada) {
      console.log("Morada atual: ", currentMorada);
      fetchContactos();
    }
  }, [currentMorada, fetchContactos]);

  if (!currentMorada) return null;
  if (isLoadingContactos) return <p>Carregando...</p>;
  if (errorContactos) return <p>Erro: {errorContactos}</p>;
  if (contactos.length === 0)
    return <p>Esta morada não possui contactos cadastrados</p>;

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="font-bold text-primary">Contactos</h3>
      <table className="min-w-full border shadow rounded-md">
        <thead>
          <tr className="bg-secondary">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Telefone</th>
            <th className="px-4 py-2">Telefone alternativo</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((contacto) => (
            <tr key={contacto.ID_Contacto}>
              <td className="border px-4 py-2">{contacto.ID_Contacto}</td>
              <td className="border px-4 py-2">{contacto.Nome_contacto}</td>
              <td className="border px-4 py-2">{contacto.Email}</td>
              <td className="border px-4 py-2">
                {contacto.Contacto_telefonico}
              </td>
              <td className="border px-4 py-2">
                {contacto.Contacto_telefonico_alternativo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactosTable;
