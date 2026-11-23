import { NextResponse } from "next/server";
import { ImportType, Role } from "@/generated/prisma/enums";
import { parseImportFile, normalizePeriod, parseAmount, normalizeText } from "@/lib/import-parser";
import { rejectUnlessRole } from "@/lib/server-auth";

const requiredFields: Record<ImportType, string[]> = {
  ASSETS: ["assetNumber", "name"],
  EQUIPMENT: ["equipmentId", "name"],
  FINANCIAL_LINES: ["period", "amount"],
};

export async function POST(request: Request) {
  const { response } = await rejectUnlessRole(Role.ADMIN);
  if (response) return response;
  const form = await request.formData();
  const file = form.get("file");
  const type = form.get("type");
  if (!(file instanceof File) || typeof type !== "string" || !Object.values(ImportType).includes(type as ImportType)) {
    return NextResponse.json({ error: "Pilih tipe data dan file CSV/XLSX." }, { status: 400 });
  }
  if (file.size > 20_000_000) return NextResponse.json({ error: "Ukuran file maksimal 20 MB." }, { status: 413 });

  try {
    const parsed = await parseImportFile(file);
    const missing = requiredFields[type as ImportType].filter((field) => !parsed.headers.some((header) => header.toLowerCase() === field.toLowerCase()));
    return NextResponse.json({
      fileName: file.name,
      type,
      headers: parsed.headers,
      rowCount: parsed.rows.length,
      requiredFields: requiredFields[type as ImportType],
      suggestedMapping: Object.fromEntries(requiredFields[type as ImportType].map((field) => [field, parsed.headers.find((header) => header.toLowerCase() === field.toLowerCase()) ?? ""])),
      missing,
      preview: parsed.rows.slice(0, 12).map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => [key, value instanceof Date ? value.toISOString() : value]))),
      validCount: missing.length ? 0 : parsed.rows.filter((row) => {
        if (type === ImportType.FINANCIAL_LINES) return normalizePeriod(row[parsed.headers.find((header) => header.toLowerCase() === "period") ?? ""]) !== null && parseAmount(row[parsed.headers.find((header) => header.toLowerCase() === "amount") ?? ""]) !== null;
        return requiredFields[type as ImportType].every((field) => normalizeText(row[parsed.headers.find((header) => header.toLowerCase() === field.toLowerCase()) ?? ""]));
      }).length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "File tidak dapat dibaca.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
