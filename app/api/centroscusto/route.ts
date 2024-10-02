//api/moradas/route.ts
import { NextResponse } from "next/server";
import { getCentrosCusto } from "@/services/centroCustoServices";
import { handleError } from "@/lib/utils";

export async function GET() {
  try {
    console.log("Iniciando busca de centrosCusto");
    const centrosCusto = await getCentrosCusto();
    console.log("centrosCusto recuperadas com sucesso:", centrosCusto.length);
    return NextResponse.json(centrosCusto);
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error("Erro detalhado ao buscar centrosCusto:", error);
    return NextResponse.json(
      { error: "Falha ao buscar centrosCusto", details: errorMessage },
      { status: 500 }
    );
  }
}
