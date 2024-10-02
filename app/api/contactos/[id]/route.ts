// app/api/moradas/[id]/route.ts
import { handleError } from "@/lib/utils";
import { getContactosByID } from "@/services/contactosServices";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    console.log(`Buscando contactos com ID: ${id}`);
    const contactos = await getContactosByID(Number(id));

    if (!contactos) {
      return NextResponse.json(
        { error: "contactos não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(contactos);
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error(`Erro ao buscar contactos com ID ${id}:`, error);
    return NextResponse.json(
      {
        error: `Falha ao buscar contactos com ID ${id}`,
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
