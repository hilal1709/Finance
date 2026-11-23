import { NextResponse } from "next/server";
import { z } from "zod";
import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { rejectUnlessSignedIn } from "@/lib/server-auth";

export async function GET(request: Request) {
  const { response } = await rejectUnlessSignedIn();
  if (response) return response;
  const search = new URL(request.url).searchParams.get("q")?.trim();
  const assets = await prisma.asset.findMany({
    where: search ? { OR: [{ assetNumber: { contains: search, mode: "insensitive" } }, { name: { contains: search, mode: "insensitive" } }, { costCenter: { contains: search, mode: "insensitive" } }] } : undefined,
    include: { mappings: { where: { effectiveTo: null }, include: { equipment: true }, orderBy: { effectiveFrom: "desc" } } },
    orderBy: { assetNumber: "asc" },
    take: 200,
  });
  return NextResponse.json({ assets });
}

const assetSchema = z.object({
  assetNumber: z.string().trim().min(1).max(80),
  subNumber: z.string().trim().default("0000"),
  name: z.string().trim().min(2).max(220),
  bookValue: z.coerce.number().optional().nullable(),
  location: z.string().max(180).optional().nullable(),
  costCenter: z.string().max(80).optional().nullable(),
});

export async function POST(request: Request) {
  const { user, response } = await rejectUnlessSignedIn();
  if (response) return response;
  if (user!.role === Role.PIC) return NextResponse.json({ error: "Hanya Manager atau Admin yang dapat mengubah master aset." }, { status: 403 });
  const parsed = assetSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Periksa kembali detail aset." }, { status: 400 });
  const asset = await prisma.asset.upsert({
    where: { assetNumber_subNumber: { assetNumber: parsed.data.assetNumber, subNumber: parsed.data.subNumber } },
    create: { ...parsed.data, bookValue: parsed.data.bookValue ?? undefined },
    update: { ...parsed.data, bookValue: parsed.data.bookValue ?? undefined },
  });
  return NextResponse.json({ asset }, { status: 201 });
}
