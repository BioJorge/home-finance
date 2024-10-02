// import React, { useCallback, useEffect } from "react";
// import { useHomeContext } from "@/contexts/HomeContext";

// const EntidadeAddress: React.FC = () => {
//   const {
//     currentClient,
//     isLoadingMoradas,
//     errorMoradas,
//     fetchMoradasByID,
//     moradas,
//     setCurrentMorada,
//   } = useHomeContext();

//   // Memoizamos a função fetchMoradasByID
//   const memoizedFetchMoradasByID = useCallback(() => {
//     if (currentClient?.ID_Entidade) {
//       fetchMoradasByID(currentClient.ID_Entidade.toString());
//     }
//   }, [currentClient?.ID_Entidade, fetchMoradasByID]);

//   // Usamos a função memoizada no useEffect
//   useEffect(() => {
//     memoizedFetchMoradasByID();
//   }, [memoizedFetchMoradasByID]);

//   if (isLoadingMoradas) {
//     return <p>Carregando...</p>;
//   }
//   if (errorMoradas) {
//     return <p>Erro: {errorMoradas}</p>;
//   }

//   if (!isLoadingMoradas && moradas.length === 0) {
//     return <p>Este cliente não possui moradas cadastradas</p>;
//   }

//   return (
//     <table className="min-w-full border shadow rounded-md">
//       <thead>
//         <tr className="bg-secondary">
//           <th className="py-2 px-4 border">ID Morada</th>
//           <th className="py-2 px-4 border">Localidade</th>
//           <th className="py-2 px-4 border">Andar</th>
//           <th className="py-2 px-4 border">Coordenadas</th>
//           <th className="py-2 px-4 border">Cod Primavera</th>
//         </tr>
//       </thead>
//       <tbody>
//         {moradas.map((morada) => (
//           <tr
//             key={morada.ID_Morada}
//             className="hover:bg-primary hover:text-white"
//             onClick={() => setCurrentMorada(morada)}
//           >
//             <td className="py-2 px-4 border">{morada.ID_Morada}</td>
//             <td className="py-2 px-4 border">{morada.Localidade || "-"}</td>
//             <td className="py-2 px-4 border">{morada.Andar || "-"}</td>
//             <td className="py-2 px-4 border">{morada.Coordenadas || "-"}</td>
//             <td className="py-2 px-4 border">{morada.Cod_Primavera || "-"}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default EntidadeAddress;

import React from "react";
import { useHomeContext } from "@/contexts/HomeContext";

const EntidadeAddress: React.FC = () => {
  const {
    currentClient,
    isLoadingMoradas,
    errorMoradas,
    fetchMoradasByID,
    moradas,
    setCurrentMorada,
  } = useHomeContext();

  React.useEffect(() => {
    fetchMoradasByID(currentClient?.ID_Entidade?.toString() || "");
  }, [currentClient?.ID_Entidade]);

  if (isLoadingMoradas) {
    return <p>Carregando...</p>;
  }
  if (errorMoradas) {
    return <p>Erro: {errorMoradas}</p>;
  }

  if (!isLoadingMoradas && moradas.length === 0) {
    return <p>Este cliente não possui moradas cadastradas</p>;
  }

  return (
    <table className="min-w-full border shadow rounded-md">
      <thead>
        <tr className="bg-secondary">
          <th className="py-2 px-4 border">ID Morada</th>
          <th className="py-2 px-4 border">Localidade</th>
          <th className="py-2 px-4 border">Andar</th>
          <th className="py-2 px-4 border">Coordenadas</th>
          <th className="py-2 px-4 border">Cod Primavera</th>
        </tr>
      </thead>
      <tbody>
        {moradas.map((morada) => (
          <tr
            key={morada.ID_Morada}
            className="hover:bg-primary hover:text-white"
            onClick={() => setCurrentMorada(morada)}
          >
            <td className="py-2 px-4 border">{morada.ID_Morada}</td>
            <td className="py-2 px-4 border">{morada.Localidade || "-"}</td>
            <td className="py-2 px-4 border">{morada.Andar || "-"}</td>
            <td className="py-2 px-4 border">{morada.Coordenadas || "-"}</td>
            <td className="py-2 px-4 border">{morada.Cod_Primavera || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EntidadeAddress;
