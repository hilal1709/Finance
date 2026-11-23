import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rejectUnlessSignedIn } from "@/lib/server-auth";

function offsetPeriod(period: string, years: number, months: number) {
  const [year, month] = period.split("-").map(Number);
  const date = new Date(Date.UTC(year + years, month - 1 + months, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export async function GET(request: Request) {
  const { response } = await rejectUnlessSignedIn();
  if (response) return response;
  const current = new URL(request.url).searchParams.get("period") ?? new Date().toISOString().slice(0, 7);
  const params = new URL(request.url).searchParams;
  const company = params.get("company")?.trim();
  const classification = params.get("classification")?.trim();
  const account = params.get("account")?.trim();
  const costCenter = params.get("costCenter")?.trim();
  const materiality = Number(params.get("materiality") ?? 0);
  const baseWhere = {
    ...(company ? { company: { contains: company, mode: "insensitive" as const } } : {}),
    ...(classification ? { classification: { contains: classification, mode: "insensitive" as const } } : {}),
    ...(costCenter ? { costCenter: { contains: costCenter, mode: "insensitive" as const } } : {}),
    ...(account || materiality > 0 ? { AND: [
      ...(account ? [{ OR: [{ account: { contains: account, mode: "insensitive" as const } }, { accountName: { contains: account, mode: "insensitive" as const } }] }] : []),
      ...(materiality > 0 ? [{ OR: [{ amount: { gte: materiality } }, { amount: { lte: -materiality } }] }] : []),
    ] } : {}),
  };
  const previous = offsetPeriod(current, 0, -1);
  const yearAgo = offsetPeriod(current, -1, 0);
  const yearStart = `${current.slice(0, 4)}-01`;
  const [currentLines, previousLines, yearAgoLines, ytdLines, recentPeriods] = await Promise.all([
    prisma.financialLine.findMany({ where: { ...baseWhere, period: current }, orderBy: { amount: "desc" }, take: 10000 }),
    prisma.financialLine.findMany({ where: { ...baseWhere, period: previous }, select: { amount: true } }),
    prisma.financialLine.findMany({ where: { ...baseWhere, period: yearAgo }, select: { amount: true } }),
    prisma.financialLine.findMany({ where: { ...baseWhere, period: { gte: yearStart, lte: current } }, select: { amount: true } }),
    prisma.financialLine.findMany({ distinct: ["period"], select: { period: true }, orderBy: { period: "desc" }, take: 12 }),
  ]);
  const sum = (items: { amount: { toNumber(): number } }[]) => items.reduce((total, item) => total + item.amount.toNumber(), 0);
  const currentTotal = sum(currentLines);
  const previousTotal = sum(previousLines);
  const yearAgoTotal = sum(yearAgoLines);
  const ytdTotal = sum(ytdLines);
  const groups = new Map<string, number>();
  for (const line of currentLines) {
    const key = line.classification || line.accountName || "Lainnya";
    groups.set(key, (groups.get(key) ?? 0) + line.amount.toNumber());
  }
  const contributors = [...groups.entries()].map(([name, amount]) => ({ name, amount })).sort((a, b) => b.amount - a.amount).slice(0, 5);
  const change = previousTotal === 0 ? null : ((currentTotal - previousTotal) / Math.abs(previousTotal)) * 100;
  const yearChange = yearAgoTotal === 0 ? null : ((currentTotal - yearAgoTotal) / Math.abs(yearAgoTotal)) * 100;

  return NextResponse.json({
    period: current,
    previousPeriod: previous,
    yearAgoPeriod: yearAgo,
    currentTotal,
    previousTotal,
    yearAgoTotal,
    ytdTotal,
    change,
    yearChange,
    lineCount: currentLines.length,
    contributors,
    periods: recentPeriods.map((item) => item.period),
    lines: currentLines.slice(0, 100).map((line) => ({ ...line, amount: line.amount.toNumber() })),
  });
}
