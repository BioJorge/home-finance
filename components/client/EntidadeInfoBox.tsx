import { useHomeContext } from "@/contexts/HomeContext";
import React from "react";

// Definindo o clientInfoBox como um componente funcional correto
interface InfoBoxProps {
  labelName: string;
  value: string | Date | number | null | undefined;
  width?: string;
}

const ClientInfoBox: React.FC<InfoBoxProps> = ({ labelName, value, width }) => {
  const minWidth = width || "200px";

  return (
    <div className="flex flex-row gap-3">
      <p className="font-bold">{labelName}:</p>
      <p
        className="border-2 rounded-md border-primary text-center px-2"
        style={{ minWidth }}
      >
        {value instanceof Date ? value.toLocaleDateString() : value || "N/A"}
      </p>
    </div>
  );
};

const ClientDetails: React.FC = () => {
  const { currentClient } = useHomeContext();
  if (!currentClient) return null;
  return (
    <section className="p-4 bg-secondary shadow rounded-md">
      <div className="flex flex-row flex-wrap gap-3 justify-between">
        <ClientInfoBox
          labelName="Nome Fiscal"
          value={currentClient.Nome_fiscal}
        />
        <ClientInfoBox
          labelName="ID Entidade"
          value={currentClient.ID_Entidade}
          width="50px"
        />
        <ClientInfoBox
          labelName="ID Segmento"
          value={currentClient.ID_Segmento}
          width="100px"
        />
        <ClientInfoBox labelName="NUIT" value={currentClient.NUIT} />
        <ClientInfoBox
          labelName="Estado"
          value={currentClient.Estado}
          width="70px"
        />
        <ClientInfoBox
          labelName="Tipo de Entidade"
          value={currentClient.Tipo_entidade}
        />
      </div>
    </section>
  );
};

export default ClientDetails;
