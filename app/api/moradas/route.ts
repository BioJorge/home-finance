//api/moradas/route.ts
import { NextResponse } from "next/server";
import { getMoradas } from "@/services/moradaServices";

export async function GET() {
  try {
    console.log("Iniciando busca de entidades");
    const entidades = await getMoradas();
    console.log("Entidades recuperadas com sucesso:", entidades.length);
    return NextResponse.json(entidades);
  } catch (error: any) {
    console.error("Erro detalhado ao buscar entidades:", error);
    return NextResponse.json(
      { error: "Falha ao buscar entidades", details: error.message },
      { status: 500 }
    );
  }
}
