// app/api/moradas/[id]/route.ts
import { handleError } from "@/lib/utils";
import { getCentrosCustoByID } from "@/services/centroCustoServices";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    console.log(`Buscando centrosCusto com ID: ${id}`);
    const centrosCusto = await getCentrosCustoByID(Number(id));

    if (!centrosCusto) {
      return NextResponse.json(
        { error: "centrosCusto não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(centrosCusto);
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error(`Erro ao buscar centrosCusto com ID ${id}:`, error);
    return NextResponse.json(
      {
        error: `Falha ao buscar centrosCusto com ID ${id}`,
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
