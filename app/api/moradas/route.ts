//api/moradas/route.ts
import { NextResponse } from "next/server";
import { getMoradas } from "@/services/moradaServices";
import { handleError } from "@/lib/utils";

export async function GET() {
  try {
    console.log("Iniciando busca de entidades");
    const entidades = await getMoradas();
    console.log("Entidades recuperadas com sucesso:", entidades.length);
    return NextResponse.json(entidades);
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    console.error("Erro detalhado ao buscar entidades:", error);
    return NextResponse.json(
      { error: "Falha ao buscar entidades", details: errorMessage },
      { status: 500 }
    );
  }
}
