import { NextResponse } from "next/server";
import { getEntidades } from "@/services/entidadeServices";

export async function GET() {
  try {
    console.log("Iniciando busca de entidades");
    const entidades = await getEntidades();
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
