"use client";

import dynamic from "next/dynamic";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { NativeSelect } from "@/components/ui/native-select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { PeriodTabs } from "@/components/period-tabs";
import { WorkspaceBanner } from "@/components/workspace-banner";
import { StudioCarousel } from "@/components/notice-carousel";
import { StudioHeading, StudioPage } from "@/components/studio-page";
import type { ToastKind } from "@/components/workspace-toast";
import { costPeriods, formatAmount, formatChange, getCostSnapshot, type Comparison, type CostPeriod } from "@/lib/cost-demo";

const AccountingIllustration = dynamic(() => import("@/components/accounting-illustration").then((module) => module.AccountingIllustration));

function ChartLoading() {
  return <Skeleton className="cost-chart skeleton" role="status" aria-live="polite" aria-hidden={false}><span className="sr-only">Memuat grafik…</span></Skeleton>;
}
const CostTrendChart = dynamic(() => import("@/components/cost-charts").then((module) => module.CostTrendChart), { ssr: false, loading: ChartLoading });
const CostDriverChart = dynamic(() => import("@/components/cost-charts").then((module) => module.CostDriverChart), { ssr: false, loading: ChartLoading });

const transactions = [
  { account: "6102-100", name: "Biaya listrik & energi", center: "CKG-02", document: "1900084211", classification: "Utilitas", amount: 286400000 },
  { account: "6201-220", name: "Jasa pemeliharaan mesin", center: "KRG-01", document: "1900084188", classification: "Pemeliharaan", amount: 142250000 },
  { account: "5105-040", name: "Bahan pendukung produksi", center: "SBY-03", document: "1900083992", classification: "Material", amount: 94100000 },
];
const comparisons = ["MoM", "YoY", "YTD"] as const;

export function CostAnalytics({ period, setPeriod, comparison, setComparison, showToast }: {
  period: CostPeriod;
  setPeriod: (period: CostPeriod) => void;
  comparison: Comparison;
  setComparison: (comparison: Comparison) => void;
  showToast: (message: string, kind?: ToastKind) => void;
}) {
  const snapshot = getCostSnapshot(period, comparison);
  const hasDetails = period === "Oktober 2026";

  function exportTransactions() {
    const rows = [["Periode", "Akun", "Nama akun", "Cost center", "Dokumen", "Klasifikasi", "Jumlah IDR", "Sumber"],
      ...transactions.map((row) => ["2026.10", row.account, row.name, row.center, row.document, row.classification, String(row.amount), "SIMULASI"])];
    const csv = "\uFEFF" + rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "transaksi-simulasi-2026-10.csv";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("CSV berisi 3 baris transaksi simulasi telah disiapkan.", "success");
  }

  return <StudioPage className="studio-analytics">
    <StudioHeading title="Analisis biaya" description="Bandingkan periode, tinjau kontributor, dan telusuri contoh transaksi." />
    <div className="studio-analytics-toolbar">
      <div><strong>Periode laporan</strong><small>Snapshot simulasi · 2026</small></div>
      <div className="studio-analytics-controls">
        <NativeSelect aria-label="Periode analisis" className="field-control period-select" value={period} onChange={(event) => setPeriod(event.target.value as CostPeriod)}>{costPeriods.map((value) => <option key={value}>{value}</option>)}</NativeSelect>
        <PeriodTabs value={comparison} onChange={setComparison} />
      </div>
    </div>
    <div className="analytics-grid studio-split">
      <Card as="article" className="surface surface-pad studio-trend">
        <div className="section-title"><div><h2>{comparison === "YTD" ? "Akumulasi biaya" : "Tren biaya bulanan"}</h2><p>{snapshot.rangeLabel} · simulasi · {comparison}</p></div></div>
        <dl key={period + comparison} className="studio-cost-figures">
          {[
            { label: `Total · ${period}`, value: `Rp ${formatAmount(snapshot.total)} M` },
            { label: `MoM · vs ${snapshot.previousMonth}`, value: formatChange(snapshot.mom) },
            { label: "YoY · vs 2025", value: formatChange(snapshot.yoy) },
            { label: "Akumulasi YTD", value: `Rp ${formatAmount(snapshot.ytd)} M` },
          ].map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <CostTrendChart period={period} comparison={comparison} />
      </Card>
      <aside className="studio-context">
        <Card as="article" className="surface surface-pad"><div className="section-title"><div><h2>Pendorong biaya</h2><p>{hasDetails ? "Oktober vs September 2026 · kontributor terpilih" : `Rincian ${period}`}</p></div><span className="cost-icon"><Icon name="chart" size={30} /></span></div>
          {hasDetails ? <><CostDriverChart /><div className="accounting-note">Angka menunjukkan perubahan biaya. Penyebabnya memerlukan validasi Accounting.</div></> : <div className="empty-state"><h3>Rincian periode belum tersedia</h3><p>Contoh kontributor dan transaksi hanya tersedia untuk Oktober 2026.</p><Button variant="outline" className="action-button secondary" onClick={() => setPeriod("Oktober 2026")}>Lihat contoh Oktober</Button></div>}
        </Card>
        <div className="period-guide" data-aos="studio-reveal">
          <AccountingIllustration scene="period" />
          <StudioCarousel title="Panduan perbandingan" selectedIndex={comparisons.indexOf(comparison)} onIndexChange={(index) => setComparison(comparisons[index])} slides={[
            { title: "MoM · Month over Month", description: "Bandingkan biaya bulan terpilih dengan bulan sebelumnya." },
            { title: "YoY · Year over Year", description: "Bandingkan biaya dengan bulan yang sama tahun sebelumnya." },
            { title: "YTD · Year to Date", description: "Bandingkan akumulasi biaya dari Januari hingga bulan terpilih." },
          ]} />
        </div>
      </aside>
    </div>
    {hasDetails && <>
      <WorkspaceBanner tone="warning" title="Utilitas · kandidat untuk ditelusuri">Kontribusi kenaikan simulasi Rp 286 juta di CKG-02. Perubahan harga atau pemakaian belum dapat disimpulkan dari angka ini saja.</WorkspaceBanner>
      <Card as="article" className="surface surface-pad source-lines">
        <div className="section-title"><div><h2>Contoh transaksi Oktober</h2><p>Baris ilustratif untuk penelusuran, bukan rekonsiliasi lengkap grafik.</p></div><Button variant="outline" className="action-button secondary" onClick={exportTransactions}><Icon name="download" size={18} /> Ekspor CSV</Button></div>
        <div className="table-wrap"><Table className="data-table"><TableHeader><TableRow><TableHead scope="col">PERIODE</TableHead><TableHead scope="col">AKUN</TableHead><TableHead scope="col">NAMA AKUN</TableHead><TableHead scope="col">COST CENTER</TableHead><TableHead scope="col">DOKUMEN</TableHead><TableHead scope="col">KLASIFIKASI</TableHead><TableHead scope="col" className="align-right">JUMLAH</TableHead></TableRow></TableHeader>
          <TableBody>{transactions.map((row) => <TableRow key={row.document}><TableCell className="mono">2026.10</TableCell><TableCell className="mono">{row.account}</TableCell><TableCell>{row.name}</TableCell><TableCell className="mono">{row.center}</TableCell><TableCell><Button variant="link" className="mono document-link" onClick={() => showToast(`Dokumen ${row.document} adalah referensi simulasi, bukan tautan ke SAP.`)}>{row.document}</Button></TableCell><TableCell><Badge className="classification-tag">{row.classification}</Badge></TableCell><TableCell className="amount-cell">Rp {formatAmount(row.amount)}</TableCell></TableRow>)}</TableBody>
        </Table></div>
      </Card>
    </>}
  </StudioPage>;
}
