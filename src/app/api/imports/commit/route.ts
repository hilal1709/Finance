import { NextResponse } from "next/server";
import { ImportStatus, ImportType, Role } from "@/generated/prisma/enums";
import { normalizePeriod, normalizeText, parseAmount, parseImportFile } from "@/lib/import-parser";
import { prisma } from "@/lib/prisma";
import { rejectUnlessRole } from "@/lib/server-auth";

const optional = (row: Record<string, unknown>, mapping: Record<string, string>, field: string) => normalizeText(row[mapping[field] ?? ""]);

export async function POST(request: Request) {
  const { user, response } = await rejectUnlessRole(Role.ADMIN);
  if (response) return response;
  const form = await request.formData();
  const file = form.get("file");
  const typeValue = form.get("type");
  const mappingValue = form.get("mapping");
  if (!(file instanceof File) || typeof typeValue !== "string" || !Object.values(ImportType).includes(typeValue as ImportType) || typeof mappingValue !== "string") {
    return NextResponse.json({ error: "File, tipe data, dan mapping kolom diperlukan." }, { status: 400 });
  }
  if (file.size > 20_000_000) return NextResponse.json({ error: "Ukuran file maksimal 20 MB." }, { status: 413 });

  let mapping: Record<string, string>;
  try { mapping = JSON.parse(mappingValue) as Record<string, string>; }
  catch { return NextResponse.json({ error: "Mapping kolom tidak valid." }, { status: 400 }); }

  const type = typeValue as ImportType;
  const required = type === ImportType.ASSETS ? ["assetNumber", "name"] : type === ImportType.EQUIPMENT ? ["equipmentId", "name"] : ["period", "amount"];
  if (required.some((field) => !mapping[field])) return NextResponse.json({ error: "Pilih kolom untuk semua field wajib." }, { status: 400 });

  try {
    const parsed = await parseImportFile(file);
    if (parsed.rows.length > 20000) return NextResponse.json({ error: "File berisi lebih dari 20.000 baris. Bagi file menjadi beberapa bagian." }, { status: 413 });
    const unknownHeaders = Object.values(mapping).filter((header) => header && !parsed.headers.includes(header));
    if (unknownHeaders.length) return NextResponse.json({ error: "Mapping berisi kolom yang tidak ada pada file." }, { status: 400 });

    const batch = await prisma.importBatch.create({ data: { type, fileName: file.name, importedById: user!.id, rowCount: parsed.rows.length } });
    const warnings: { row: number; message: string }[] = [];
    let validCount = 0;
    try {
      for (let index = 0; index < parsed.rows.length; index += 1) {
        const row = parsed.rows[index];
        const rowNo = index + 2;
        if (type === ImportType.ASSETS) {
          const assetNumber = optional(row, mapping, "assetNumber");
          const name = optional(row, mapping, "name");
          if (!assetNumber || !name) { warnings.push({ row: rowNo, message: "Nomor aset atau deskripsi kosong." }); continue; }
          const subNumber = optional(row, mapping, "subNumber") ?? "0000";
          const bookValue = parseAmount(row[mapping.bookValue ?? ""]);
          await prisma.asset.upsert({
            where: { assetNumber_subNumber: { assetNumber, subNumber } },
            create: { assetNumber, subNumber, name, bookValue: bookValue ?? undefined, location: optional(row, mapping, "location"), costCenter: optional(row, mapping, "costCenter") },
            update: { name, bookValue: bookValue ?? undefined, location: optional(row, mapping, "location"), costCenter: optional(row, mapping, "costCenter") },
          });
          validCount += 1;
        } else if (type === ImportType.EQUIPMENT) {
          const equipmentId = optional(row, mapping, "equipmentId");
          const name = optional(row, mapping, "name");
          if (!equipmentId || !name) { warnings.push({ row: rowNo, message: "Equipment ID atau nama kosong." }); continue; }
          await prisma.equipment.upsert({
            where: { equipmentId },
            create: { equipmentId, name, type: optional(row, mapping, "type"), unit: optional(row, mapping, "unit"), location: optional(row, mapping, "location"), owner: optional(row, mapping, "owner"), status: optional(row, mapping, "status") ?? "Aktif" },
            update: { name, type: optional(row, mapping, "type"), unit: optional(row, mapping, "unit"), location: optional(row, mapping, "location"), owner: optional(row, mapping, "owner"), status: optional(row, mapping, "status") ?? "Aktif" },
          });
          validCount += 1;
        } else {
          const period = normalizePeriod(row[mapping.period]);
          const amount = parseAmount(row[mapping.amount]);
          if (!period || amount === null) { warnings.push({ row: rowNo, message: "Periode atau nilai transaksi tidak valid." }); continue; }
          await prisma.financialLine.create({
            data: {
              period,
              amount,
              classification: optional(row, mapping, "classification"),
              company: optional(row, mapping, "company"),
              account: optional(row, mapping, "account"),
              accountName: optional(row, mapping, "accountName"),
              costCenter: optional(row, mapping, "costCenter"),
              plant: optional(row, mapping, "plant"),
              documentNo: optional(row, mapping, "documentNo"),
              lineItem: optional(row, mapping, "lineItem"),
              description: optional(row, mapping, "description"),
              currency: optional(row, mapping, "currency") ?? "IDR",
              importBatchId: batch.id,
            },
          });
          validCount += 1;
        }
      }
      const finished = await prisma.importBatch.update({
        where: { id: batch.id },
        data: { status: ImportStatus.COMPLETED, validCount, errorCount: warnings.length, warnings, completedAt: new Date() },
      });
      return NextResponse.json({ import: finished, warnings }, { status: 201 });
    } catch (error) {
      await prisma.importBatch.update({ where: { id: batch.id }, data: { status: ImportStatus.FAILED, validCount, errorCount: warnings.length, warnings } });
      throw error;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Data belum dapat diimpor.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
