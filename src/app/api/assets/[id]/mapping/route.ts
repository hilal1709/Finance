import { NextResponse } from "next/server";
import { z } from "zod";
import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { rejectUnlessSignedIn } from "@/lib/server-auth";

const mappingSchema = z.object({
  equipmentId: z.string().min(1),
  effectiveFrom: z.string().datetime().optional(),
  note: z.string().max(1200).optional().nullable(),
});

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { user, response } = await rejectUnlessSignedIn();
  if (response) return response;
  if (user!.role !== Role.ADMIN && user!.role !== Role.MANAGER) return NextResponse.json({ error: "Hanya Manager atau Admin yang dapat memperbarui mapping." }, { status: 403 });
  const { id: assetId } = await context.params;
  const parsed = mappingSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Pilih equipment yang valid." }, { status: 400 });

  const asset = await prisma.asset.findUnique({ where: { id: assetId } });
  const equipment = await prisma.equipment.findUnique({ where: { id: parsed.data.equipmentId } });
  if (!asset || !equipment) return NextResponse.json({ error: "Aset atau equipment tidak ditemukan." }, { status: 404 });

  const result = await prisma.assetEquipmentMapping.create({
    data: {
      assetId,
      equipmentId: equipment.id,
      effectiveFrom: parsed.data.effectiveFrom ? new Date(parsed.data.effectiveFrom) : new Date(),
      note: parsed.data.note || null,
      approvedById: user!.id,
    },
    include: { equipment: true },
  });
  return NextResponse.json({ mapping: result }, { status: 201 });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const { user, response } = await rejectUnlessSignedIn();
  if (response) return response;
  if (user!.role !== Role.ADMIN && user!.role !== Role.MANAGER) return NextResponse.json({ error: "Hanya Manager atau Admin yang dapat memperbarui mapping." }, { status: 403 });
  const { id: assetId } = await context.params;
  const mappingId = new URL(request.url).searchParams.get("mappingId");
  if (!mappingId) return NextResponse.json({ error: "Mapping ID diperlukan." }, { status: 400 });
  const mapping = await prisma.assetEquipmentMapping.findFirst({ where: { id: mappingId, assetId } });
  if (!mapping) return NextResponse.json({ error: "Mapping tidak ditemukan." }, { status: 404 });
  await prisma.assetEquipmentMapping.update({ where: { id: mappingId }, data: { effectiveTo: new Date() } });
  return NextResponse.json({ ok: true });
}
