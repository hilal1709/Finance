export const costPeriods = ["Oktober 2026", "September 2026", "Agustus 2026", "Juli 2026"] as const;
export type CostPeriod = (typeof costPeriods)[number];
export type Comparison = "MoM" | "YoY" | "YTD";

const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt"];
// Synthetic monthly costs, in Rp billion; never mixed with imported source records.
const currentYear = [16.4, 16.7, 17.1, 17.4, 17.8, 18.1, 18.7, 18.6, 17.58, 18.42];
const previousYear = [15.8, 16.1, 16.5, 17, 17.3, 17.6, 17.9, 18, 17.2, 18.04];
const endMonth: Record<CostPeriod, number> = {
  "Oktober 2026": 9, "September 2026": 8, "Agustus 2026": 7, "Juli 2026": 6,
};
const sum = (values: number[]) => Number(values.reduce((total, value) => total + value, 0).toFixed(2));
const percentage = (value: number, baseline: number) => (value - baseline) / baseline * 100;
export const formatAmount = (value: number) => new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(value);
export const formatChange = (value: number) => `${value > 0 ? "+" : ""}${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(value)}%`;

export function getCostSnapshot(period: CostPeriod, comparison: Comparison) {
  const end = endMonth[period];
  const total = currentYear[end];
  const ytd = sum(currentYear.slice(0, end + 1));
  const indices = Array.from({ length: end + 1 }, (_, index) => index).filter((index) => comparison !== "MoM" || index >= end - 5);
  return {
    total,
    ytd,
    mom: percentage(total, currentYear[end - 1]),
    yoy: percentage(total, previousYear[end]),
    previousMonth: `${months[end - 1]} 2026`,
    labels: indices.map((index) => months[index]),
    actual: indices.map((index) => comparison === "YTD" ? sum(currentYear.slice(0, index + 1)) : currentYear[index]),
    baseline: indices.map((index) => comparison === "YTD" ? sum(previousYear.slice(0, index + 1)) : comparison === "YoY" ? previousYear[index] : currentYear[index - 1]),
    actualLabel: comparison === "YTD" ? "Kumulatif 2026" : "Biaya 2026",
    baselineLabel: comparison === "YTD" ? "Kumulatif 2025" : comparison === "YoY" ? "Bulan sama · 2025" : "Bulan sebelumnya",
    rangeLabel: `${comparison === "MoM" ? months[indices[0]] : "Jan"}–${months[end]} 2026`,
  };
}

export const costDrivers = [
  { label: "Utilitas & energi", center: "CKG-02", value: 286, lines: 14 },
  { label: "Jasa pemeliharaan", center: "KRG-01", value: 142, lines: 8 },
  { label: "Bahan pendukung", center: "SBY-03", value: -94, lines: 21 },
  { label: "Transportasi", center: "CKG-01", value: 68, lines: 11 },
];
