// app/api/moradas/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getMoradasByID } from "@/services/moradaServices";
import { handleError } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    console.log(`Buscando entidade com ID: ${id}`);
    const morada = await getMoradasByID(Number(id));

    if (!morada) {
      return NextResponse.json(
        { error: "Entidade não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(morada);
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error(`Erro ao buscar entidade com ID ${id}:`, error);
    return NextResponse.json(
      {
        error: `Falha ao buscar entidade com ID ${id}`,
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
