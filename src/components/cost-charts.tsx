"use client";

import { Bar } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Icon } from "@/components/ui/icon";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, type ChartOptions } from "chart.js";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { costDrivers, formatAmount, getCostSnapshot, type Comparison, type CostPeriod } from "@/lib/cost-demo";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function useChartOptions(horizontal = false): ChartOptions<"bar"> {
  const reducedMotion = usePrefersReducedMotion();
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: reducedMotion ? false : { duration: 350 },
    indexAxis: horizontal ? "y" : "x",
    interaction: { intersect: false, mode: "index" },
    datasets: { bar: { borderRadius: 3, maxBarThickness: 22 } },
    plugins: {
      legend: {
        display: !horizontal,
        position: "bottom",
        align: "start",
        labels: { color: "#535956", boxWidth: 10, boxHeight: 10, padding: 18, font: { family: "IBM Plex Sans Variable", size: 11 } },
      },
      tooltip: {
        backgroundColor: "#393e41",
        titleColor: "#FFFFFF",
        bodyColor: "#e7e5df",
        padding: 12,
        cornerRadius: 7,
        callbacks: {
          label: (context) => `${context.dataset.label}: Rp ${formatAmount(Number(horizontal ? context.parsed.x : context.parsed.y))} ${horizontal ? "juta" : "miliar"}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: horizontal,
        border: { display: false },
        grid: { display: horizontal, color: "#d3d0cb" },
        ticks: { color: "#535956", font: { family: "IBM Plex Sans Variable", size: 12 }, maxRotation: 0 },
        ...(horizontal ? { title: { display: true, text: "Perubahan · Rp juta", color: "#535956" } } : {}),
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: { display: !horizontal, color: "#d3d0cb" },
        ticks: { color: "#535956", font: { family: "IBM Plex Sans Variable", size: 12 } },
        ...(!horizontal ? { title: { display: true, text: "Rp miliar", color: "#535956" } } : {}),
      },
    },
  };
}

export function CostTrendChart({ period, comparison }: { period: CostPeriod; comparison: Comparison }) {
  const options = useChartOptions();
  const snapshot = getCostSnapshot(period, comparison);
  return <>
    <div className="cost-chart">
      <Bar role="img" aria-label={`Tren biaya simulasi ${snapshot.rangeLabel}, perbandingan ${comparison}. Angka tersedia pada tabel di bawah.`} options={options} data={{
        labels: snapshot.labels,
        datasets: [
          { label: snapshot.actualLabel, data: snapshot.actual, backgroundColor: "#393e41" },
          { label: snapshot.baselineLabel, data: snapshot.baseline, backgroundColor: "#44bba4" },
        ],
      }} />
    </div>
    <Collapsible className="chart-data-summary">
      <CollapsibleTrigger render={<Button variant="ghost" className="chart-data-trigger" />}><Icon name="chevron-right" size={12} />Lihat angka grafik</CollapsibleTrigger>
      <CollapsibleContent><div className="table-wrap"><Table className="data-table">
        <TableCaption>Data simulasi · Rp miliar</TableCaption>
        <TableHeader><TableRow><TableHead scope="col">Bulan</TableHead><TableHead scope="col">{snapshot.actualLabel}</TableHead><TableHead scope="col">{snapshot.baselineLabel}</TableHead></TableRow></TableHeader>
        <TableBody>{snapshot.labels.map((label, index) => <TableRow key={label}><TableHead scope="row">{label}</TableHead><TableCell>{formatAmount(snapshot.actual[index])}</TableCell><TableCell>{formatAmount(snapshot.baseline[index])}</TableCell></TableRow>)}</TableBody>
      </Table></div></CollapsibleContent>
    </Collapsible>
  </>;
}

export function CostDriverChart() {
  const options = useChartOptions(true);
  return <>
    <div className="cost-chart">
      <Bar role="img" aria-label="Perubahan biaya Oktober terhadap September 2026: utilitas naik 286, pemeliharaan naik 142, bahan pendukung turun 94, transportasi naik 68 juta Rupiah. Data simulasi." options={options} data={{
        labels: costDrivers.map((driver) => driver.label),
        datasets: [{ label: "Perubahan biaya", data: costDrivers.map((driver) => driver.value), backgroundColor: costDrivers.map((driver) => driver.value < 0 ? "#44bba4" : "#393e41") }],
      }} />
    </div>
    <Collapsible className="chart-data-summary">
      <CollapsibleTrigger render={<Button variant="ghost" className="chart-data-trigger" />}><Icon name="chevron-right" size={12} />Lihat rincian kontribusi</CollapsibleTrigger>
      <CollapsibleContent><div className="table-wrap"><Table className="data-table">
        <TableCaption>Kontributor terpilih, bukan seluruh perubahan · Rp juta</TableCaption>
        <TableHeader><TableRow><TableHead scope="col">Kategori</TableHead><TableHead scope="col">Cost center</TableHead><TableHead scope="col">Perubahan</TableHead></TableRow></TableHeader>
        <TableBody>{costDrivers.map((driver) => <TableRow key={driver.label}><TableHead scope="row">{driver.label}</TableHead><TableCell>{driver.center}</TableCell><TableCell>{driver.value > 0 ? "+" : ""}{formatAmount(driver.value)}</TableCell></TableRow>)}</TableBody>
      </Table></div></CollapsibleContent>
    </Collapsible>
  </>;
}
