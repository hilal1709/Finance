import ExcelJS from "exceljs";

export type ParsedFile = { headers: string[]; rows: Record<string, unknown>[] };

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"') {
      if (quoted && text[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }
  row.push(value);
  if (row.some((cell) => cell.trim() !== "")) rows.push(row);
  return rows;
}

function cellValue(value: unknown): unknown {
  if (value && typeof value === "object" && "text" in value) return (value as { text: unknown }).text;
  if (value && typeof value === "object" && "result" in value) return (value as { result: unknown }).result;
  if (value && typeof value === "object" && "richText" in value) {
    return ((value as { richText: { text: string }[] }).richText ?? []).map((part) => part.text).join("");
  }
  return value ?? "";
}

export async function parseImportFile(file: File): Promise<ParsedFile> {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension === "csv") {
    const table = parseCsv(await file.text());
    const headers = (table[0] ?? []).map((header) => header.trim());
    return {
      headers,
      rows: table.slice(1).map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]))),
    };
  }
  if (extension !== "xlsx") throw new Error("Gunakan file CSV atau XLSX.");

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(Buffer.from(await file.arrayBuffer()) as never);
  const sheet = workbook.worksheets[0];
  if (!sheet) throw new Error("Workbook tidak berisi sheet.");
  const headerRow = sheet.getRow(1);
  const headers = Array.from({ length: headerRow.cellCount }, (_, index) => String(cellValue(headerRow.getCell(index + 1).value)).trim());
  const rows: Record<string, unknown>[] = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const record = Object.fromEntries(headers.map((header, index) => [header, cellValue(row.getCell(index + 1).value)]));
    if (Object.values(record).some((value) => String(value ?? "").trim() !== "")) rows.push(record);
  });
  return { headers, rows };
}

export function parseAmount(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  let text = String(value ?? "").trim().replace(/[^\d,.-]/g, "");
  if (!text || text === "-" || text === "." || text === ",") return null;
  const comma = text.lastIndexOf(",");
  const dot = text.lastIndexOf(".");
  if (comma >= 0 && dot >= 0) {
    const decimalSeparator = comma > dot ? "," : ".";
    const groupingSeparator = decimalSeparator === "," ? "." : ",";
    text = text.split(groupingSeparator).join("").replace(decimalSeparator, ".");
  } else if (comma >= 0) {
    const tail = text.length - comma - 1;
    text = tail === 3 ? text.replaceAll(",", "") : text.replace(",", ".");
  } else if (dot >= 0 && text.length - dot - 1 === 3) {
    text = text.replaceAll(".", "");
  }
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizePeriod(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) return value.toISOString().slice(0, 7);
  const text = String(value ?? "").trim();
  const compact = text.match(/^(\d{4})(\d{2})$/);
  if (compact) return `${compact[1]}-${compact[2]}`;
  const iso = text.match(/^(\d{4})[-/](\d{1,2})/);
  if (iso) return `${iso[1]}-${String(Number(iso[2])).padStart(2, "0")}`;
  const parsed = new Date(text);
  return Number.isNaN(parsed.valueOf()) ? null : parsed.toISOString().slice(0, 7);
}

export function normalizeText(value: unknown): string | null {
  const text = String(value ?? "").trim();
  return text ? text : null;
}
