//api/moradas/route.ts
import { NextResponse } from "next/server";
import { getContactos } from "@/services/contactosServices";
import { handleError } from "@/lib/utils";

export async function GET() {
  try {
    console.log("Iniciando busca de contactos");
    const contactos = await getContactos();
    console.log("contactos recuperadas com sucesso:", contactos.length);
    return NextResponse.json(contactos);
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error("Erro detalhado ao buscar contactos:", error);
    return NextResponse.json(
      { error: "Falha ao buscar entidades", details: errorMessage },
      { status: 500 }
    );
  }
}
