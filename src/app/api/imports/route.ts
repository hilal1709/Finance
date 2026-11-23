import { NextResponse } from "next/server";
import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { rejectUnlessRole } from "@/lib/server-auth";

export async function GET() {
  const { response } = await rejectUnlessRole(Role.ADMIN);
  if (response) return response;
  const imports = await prisma.importBatch.findMany({
    include: { importedBy: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ imports });
}
