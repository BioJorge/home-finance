import React from "react";
import { Entidade } from "@/types/Entidades";

interface ClientDetailsProps {
  client: Entidade;
}

// Definindo o clientInfoBox como um componente funcional correto
interface InfoBoxProps {
  labelName: string;
  value: any;
  width?: string;
}

const ClientInfoBox: React.FC<InfoBoxProps> = ({ labelName, value, width }) => {
  const minWidth = width || "200px";

  return (
    <div className="flex flex-row gap-3">
      <p>{labelName}:</p>
      <p
        className="border-2 rounded-md border-primary text-center px-2"
        style={{ minWidth }}
      >
        {value || "N/A"}
      </p>
    </div>
  );
};

const ClientDetails: React.FC<ClientDetailsProps> = ({ client }) => {
  return (
    <section className="p-4 bg-secondary shadow rounded-md">
      <div className="flex flex-row flex-wrap gap-3 justify-between">
        <ClientInfoBox labelName="Nome Fiscal" value={client.Nome_fiscal} />
        <ClientInfoBox
          labelName="ID Entidade"
          value={client.ID_Entidade}
          width="50px"
        />
        <ClientInfoBox
          labelName="ID Segmento"
          value={client.ID_Segmento}
          width="100px"
        />
        <ClientInfoBox labelName="NUIT" value={client.NUIT} />
        <ClientInfoBox labelName="Estado" value={client.Estado} width="70px" />
        <ClientInfoBox
          labelName="Tipo de Entidade"
          value={client.Tipo_entidade}
        />
      </div>
    </section>
  );
};

export default ClientDetails;
