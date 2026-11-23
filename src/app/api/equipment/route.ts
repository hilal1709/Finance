import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rejectUnlessSignedIn } from "@/lib/server-auth";

export async function GET(request: Request) {
  const { response } = await rejectUnlessSignedIn();
  if (response) return response;
  const search = new URL(request.url).searchParams.get("q")?.trim();
  const equipment = await prisma.equipment.findMany({
    where: search ? { OR: [{ equipmentId: { contains: search, mode: "insensitive" } }, { name: { contains: search, mode: "insensitive" } }] } : undefined,
    orderBy: { equipmentId: "asc" },
    take: 250,
  });
  return NextResponse.json({ equipment });
}
