"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ScrollMotion } from "@/components/motion-runtime";
import { Sidebar, SidebarLink } from "@/components/ui/sidebar";
import { FileUpload } from "@/components/ui/file-upload";
import { StatefulButton } from "@/components/ui/stateful-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { NoticeCarousel } from "@/components/notice-carousel";
import { WorkspaceToast, type ToastKind } from "@/components/workspace-toast";
import { WorkspaceBanner } from "@/components/workspace-banner";
import { Skeleton } from "@/components/ui/skeleton";
import { BrandMark } from "@/components/brand-mark";
import type { Comparison, CostPeriod } from "@/lib/cost-demo";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import { ArrowRight, Bell, BriefcaseBusiness, Building2, FileSpreadsheet, Filter, LayoutDashboard, Menu, MoreHorizontal, Plus, Search, Settings2, TrendingUp, Upload, Users, X } from "lucide-react";

type Area = "overview" | "tasks" | "assets" | "analytics" | "imports" | "team";
type ToastState = { id: number; kind: ToastKind; message: string };

const CostAnalytics = dynamic(() => import("@/components/cost-analytics").then((module) => module.CostAnalytics), {
  loading: () => (
    <section className="analytics-loading" role="status">
      <span>Memuat analisis biaya…</span>
      <Skeleton className="analytics-loading-chart" />
    </section>
  ),
});
const AccountingIllustration = dynamic(() => import("@/components/accounting-illustration").then((module) => module.AccountingIllustration));
const nav = [
  { id: "overview", label: "Command center", icon: LayoutDashboard },
  { id: "tasks", label: "Tugas & workload", icon: BriefcaseBusiness },
  { id: "assets", label: "Asset 360", icon: Building2 },
  { id: "analytics", label: "Cost analytics", icon: TrendingUp },
  { id: "imports", label: "Impor data", icon: FileSpreadsheet },
  { id: "team", label: "Tim & akses", icon: Users },
] as const;
const tasks = [
  { name: "Rekonsiliasi akun beban dibayar dimuka", code: "FA-2026-084", section: "Financial Accounting", person: "Nadia Putri", initials: "NP", due: "Hari ini, 16:00", status: "In Progress", tone: "progress" },
  { name: "Validasi mapping equipment site Cikarang", code: "AS-2026-031", section: "Asset 360", person: "Rizky Ananda", initials: "RA", due: "Hari ini, 17:30", status: "Waiting / Blocked", tone: "blocked" },
  { name: "Analisis kenaikan biaya utilitas Q3", code: "CA-2026-027", section: "Cost Accounting", person: "Dimas Prakoso", initials: "DP", due: "Besok, 12:00", status: "In Review", tone: "review" },
  { name: "Review jurnal akrual vendor", code: "FA-2026-079", section: "Verification 2", person: "Nadia Putri", initials: "NP", due: "24 Nov 2026", status: "New", tone: "new" },
  { name: "Penyusunan laporan manajemen Oktober", code: "RP-2026-018", section: "Internal Reporting", person: "Sari Wulandari", initials: "SW", due: "25 Nov 2026", status: "In Progress", tone: "progress" },
];
const assetRows = [
  { id: "AS-100482", name: "HVAC Main Plant", equipment: "EQ-450188 · EQ-450191", location: "Cikarang · Building A", owner: "Facility Operations", status: "Mapped" },
  { id: "AS-100537", name: "Conveyor Assembly Line 2", equipment: "EQ-450207 · EQ-450209 · +2", location: "Karawang · Line 2", owner: "Manufacturing", status: "Mapped" },
  { id: "AS-100611", name: "Backup Generator 800kVA", equipment: "Belum dipetakan", location: "Surabaya · Utility", owner: "Infrastructure", status: "Unmapped" },
  { id: "AS-100748", name: "Packaging Line Sensor", equipment: "EQ-450812", location: "Cikarang · Building C", owner: "Manufacturing", status: "Review" },
] as const;

const assetStatusLabels = {
  Mapped: "Terpetakan",
  Unmapped: "Belum dipetakan",
  Review: "Perlu review",
};


function Brand({ compact = false }: { compact?: boolean }) {
  return <div className="brand-lockup"><div className="brand-mark"><BrandMark className="brand-symbol" /></div><div><div className="brand-title">accounting<span className="brand-accent">.</span></div>{!compact && <div className="brand-subtitle">DIGITAL OPERATIONS</div>}</div></div>;
}
function Button({ children, onClick, variant = "primary", className = "", type = "button", disabled = false }: { children: React.ReactNode; onClick?: (event: MouseEvent<HTMLButtonElement>) => void; variant?: "primary" | "secondary" | "quiet"; className?: string; type?: "button" | "submit"; disabled?: boolean }) {
  const uiVariant = variant === "secondary" ? "outline" : variant === "quiet" ? "ghost" : "default";
  return <ShadcnButton type={type} onClick={onClick} disabled={disabled} variant={uiVariant} className={`action-button ${variant} ${className}`}>{children}</ShadcnButton>;
}
function Metric({ label, value, note, positive = true }: {
  label: string; value: string; note: string; positive?: boolean;
}) {
  return (
    <Card as="article" className="metric-card">
      <div className="metric-top">{label}</div>
      <div className="metric-value">{value}</div>
      <div className={positive ? "metric-note" : "metric-note warn"}>{note}</div>
    </Card>
  );
}
function Status({ children, tone }: { children: string; tone: string }) { return <Badge variant="outline" className={`status-pill status-${tone}`}>{children}</Badge>; }
export default function Home() {
  const searchInput = useRef<HTMLInputElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const taskTrigger = useRef<HTMLButtonElement>(null);
  const assetTrigger = useRef<HTMLButtonElement>(null);
  const taskNameInput = useRef<HTMLInputElement>(null);
  const toastId = useRef(0);
  const [active, setActive] = useState<Area>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [overviewBanner, setOverviewBanner] = useState(true);
  const [assetBanner, setAssetBanner] = useState(true);
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState<CostPeriod>("Oktober 2026");
  const [comparison, setComparison] = useState<Comparison>("MoM");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<{ headers: string[]; preview: Record<string, unknown>[]; rowCount: number; requiredFields: string[]; missing: string[]; suggestedMapping: Record<string, string>; validCount: number; type: string } | null>(null);
  const [importType, setImportType] = useState("FINANCIAL_LINES");
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [commitBusy, setCommitBusy] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [newTasks, setNewTasks] = useState<typeof tasks[number][]>([]);
  const [section, setSection] = useState("Financial Accounting");
  const [deadline, setDeadline] = useState("");
  const [effort, setEffort] = useState("4");
  const [taskFilter, setTaskFilter] = useState("Semua status");
  const [assetFilter, setAssetFilter] = useState("Semua pemetaan");
  const [selectedAsset, setSelectedAsset] = useState<typeof assetRows[number] | null>(null);
  const [taskBusy, setTaskBusy] = useState(false);
  const [taskError, setTaskError] = useState<string | null>(null);

  function openTask(event: MouseEvent<HTMLButtonElement>) {
    taskTrigger.current = event.currentTarget;
    setTaskError(null);
    setModal(true);
  }

  function changeTaskDialog(open: boolean) {
    if (open || !taskBusy) setModal(open);
  }

  function navigate(area: Area) {
    setActive(area);
    setQuery("");
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInput.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);



  const title = nav.find((item) => item.id === active)?.label ?? "Command center";
  const filteredTasks = useMemo(() => [...newTasks, ...tasks].filter((t) => `${t.name} ${t.code} ${t.person} ${t.section}`.toLowerCase().includes(query.toLowerCase()) && (active !== "tasks" || taskFilter === "Semua status" || t.status === taskFilter)), [query, taskFilter, newTasks, active]);
    const filteredAssets = assetRows.filter((row) => (assetFilter === "Semua pemetaan" || row.status === assetFilter) && `${row.id} ${row.name} ${row.location} ${row.equipment}`.toLowerCase().includes(query.toLowerCase()));
  function showToast(message: string, kind: ToastKind = "info") {
    toastId.current += 1;
    setToast({ id: toastId.current, message, kind });
  }
  const dismissToast = useCallback(() => setToast(null), []);

  async function previewImport() {
    if (!file || uploadBusy || commitBusy) return;
    setUploadBusy(true);
    const body = new FormData(); body.set("file", file); body.set("type", importType);
    try {
      const response = await fetch("/api/imports/preview", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "File tidak dapat dibaca.");
      setPreview(data);
      setColumnMapping(data.suggestedMapping ?? {});
    } catch (error) { showToast(error instanceof Error ? error.message : "Pratinjau gagal dimuat.", "error"); }
    finally { setUploadBusy(false); }
  }
  async function commitImport() {
    if (!file || !preview || commitBusy || uploadBusy) return;
    setCommitBusy(true);
    const body = new FormData(); body.set("file", file); body.set("type", importType); body.set("mapping", JSON.stringify(columnMapping));
    try {
      const response = await fetch("/api/imports/commit", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Impor tidak dapat disimpan.");
      showToast(`Impor berhasil diproses · ${data.validCount ?? preview.validCount} baris valid.`, "success");
      setPreview(null); setFile(null);
    } catch (error) { showToast(error instanceof Error ? error.message : "Commit impor gagal.", "error"); }
    finally { setCommitBusy(false); }
  }
  async function submitTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskBusy) return;
    setTaskBusy(true);
    setTaskError(null);
    const payload = { title: taskName.trim(), category: section, deadline: deadline ? new Date(`${deadline}T23:59:00`).toISOString() : null, estimatedHours: Number(effort) };
    try {
      const response = await fetch("/api/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || (response.status === 401 ? "Masuk ke workspace agar pekerjaan tersimpan." : "Pekerjaan tidak dapat disimpan."));
      setNewTasks((current) => [{ name: taskName, code: data.task?.id?.slice(-8).toUpperCase() ?? "BARU", section, person: "Accounting Preview", initials: "AP", due: deadline || "Belum ditentukan", status: "New", tone: "new" }, ...current]);
      setModal(false); setTaskName(""); showToast("Pekerjaan tersimpan dan riwayat aktivitas tercatat.", "success");
    } catch (error) { setTaskError(error instanceof Error ? error.message : "Pekerjaan tidak dapat disimpan."); }
    finally { setTaskBusy(false); }
  }

  return <div className="app-shell"><a href="#workspace-content" className="skip-link">Langsung ke konten</a>
    <Sidebar open={mobileOpen} onOpenChange={setMobileOpen} triggerRef={menuButton}>
      <Brand />
      <div className="workspace-switch"><Avatar className="workspace-avatar"><AvatarFallback>DA</AvatarFallback></Avatar><span className="workspace-copy"><strong>Departemen Accounting</strong><small>Workspace internal</small></span></div>
      <nav className="nav-scroll" aria-label="Navigasi utama">
        <div className="nav-group-label">WORKSPACE</div>
        {nav.slice(0, 4).map((item) => { const Icon = item.icon; return <SidebarLink key={item.id} icon={<Icon />} label={item.label} active={active === item.id} onClick={() => navigate(item.id)} />; })}
        <div className="nav-group-label nav-spaced">DATA & ACCESS</div>
        {nav.slice(4).map(({ id, label, icon: Icon }) => <SidebarLink key={id} icon={<Icon />} label={label} active={active === id} onClick={() => navigate(id)} />)}
      </nav>
      <div className="sidebar-bottom"><Link className="drawer-login" href="/login">Masuk ke workspace</Link><div className="sidebar-user"><Avatar className="avatar"><AvatarFallback>AP</AvatarFallback></Avatar><span className="sidebar-user-meta"><span className="sidebar-user-name">Accounting Preview</span><span className="sidebar-user-role">Manager · Demo</span></span><ShadcnButton variant="ghost" size="unset" className="sidebar-signout" aria-label="Buka tim dan akses" onClick={() => navigate("team")}><Settings2 size={16} /></ShadcnButton></div></div>
    </Sidebar>
    <main className="main-frame">
      <header className="topbar"><div className="topbar-left"><ShadcnButton ref={menuButton} variant="ghost" size="unset" aria-label="Buka navigasi" aria-controls="workspace-navigation" aria-expanded={mobileOpen} className="mobile-menu-button" onClick={() => setMobileOpen(true)}><Menu size={18} /></ShadcnButton><div className="topbar-context">Workspace <span>/</span> <strong>{title}</strong></div></div><div className="topbar-right"><Label className="global-search"><Search size={15} /><Input className="workspace-search-input" ref={searchInput} aria-label={active === "assets" ? "Cari aset" : "Cari pekerjaan"} placeholder={active === "assets" ? "Cari aset" : "Cari pekerjaan"} value={query} onChange={(e) => { setQuery(e.target.value); if (active !== "assets" && active !== "tasks" && active !== "overview") setActive("tasks"); }} /><kbd>Ctrl K</kbd></Label><Badge variant="outline" className="simulation-badge"><i className="simulation-dot" /> DATA SIMULASI</Badge><ShadcnButton variant="ghost" size="unset" className="icon-button notification" aria-label="Notifikasi" onClick={() => showToast("Belum ada notifikasi baru.")}><Bell size={17} /></ShadcnButton><Link href="/login" className="topbar-avatar" aria-label="Masuk ke workspace">AP</Link></div></header>
      <div id="workspace-content" className="page-content" tabIndex={-1}>
         {active === "overview" && <Overview setActive={navigate} openModal={openTask} banner={overviewBanner} onDismissBanner={() => setOverviewBanner(false)} rows={filteredTasks} />}
        {active === "tasks" && <section className="page-section"><div className="page-heading"><div><h1>Pekerjaan tim</h1><p>Pantau prioritas, status, tenggat, dan kapasitas setiap PIC.</p></div><Button onClick={openTask}><Plus size={16} /> Buat pekerjaan</Button></div><div className="stats-strip compact-stats"><Metric label="Pekerjaan aktif" value="28" note="dari 34 pekerjaan" /><Metric label="Mendekati tenggat" value="6" note="dalam 3 hari" positive={false} /><Metric label="Menunggu review" value="4" note="perlu tindak lanjut" positive={false} /><Metric label="Kapasitas tim" value="76%" note="rata-rata terpakai" /></div><Card className="surface surface-pad"><div className="filter-row"><Label className="toolbar-search"><Search size={15} /><Input className="workspace-search-input" aria-label="Cari pekerjaan atau PIC" placeholder="Cari pekerjaan atau PIC" value={query} onChange={(e) => setQuery(e.target.value)} /></Label><NativeSelect className="field-control filter-select" aria-label="Filter status" value={taskFilter} onChange={(e) => setTaskFilter(e.target.value)}>{["Semua status", "New", "Assigned", "In Progress", "Waiting / Blocked", "In Review", "Completed"].map((s) => <NativeSelectOption key={s}>{s}</NativeSelectOption>)}</NativeSelect><span className="result-count">{filteredTasks.length} pekerjaan</span></div><TaskTable rows={filteredTasks} /></Card><Card as="section" className="surface surface-pad workload-summary" aria-label="Kapasitas mingguan"><div className="section-title"><div><h2>Kapasitas mingguan</h2><p>Estimasi effort dibanding kapasitas 40 jam per PIC · simulasi</p></div></div><Capacity /></Card></section>}
        {active === "assets" && <section className="page-section"><div className="page-heading"><div><h1>Mapping aset & equipment</h1><p>Satu aset SAP dapat terhubung ke beberapa equipment, dengan riwayat mapping dan tanggal efektif.</p></div><Button onClick={() => navigate("imports")}><Upload size={16} /> Impor master aset</Button></div>{assetBanner && <WorkspaceBanner tone="warning" title="Master SAP tetap sumber utama" onDismiss={() => setAssetBanner(false)}>Mapping di sini mencatat periode efektif dan riwayat audit tanpa mengubah master SAP.</WorkspaceBanner>}<div className="stats-strip compact-stats"><Metric label="Aset terdaftar" value="1.284" note="dari snapshot SAP" /><Metric label="Mapping lengkap" value="96,4%" note="1.238 aset terpetakan" /><Metric label="Belum dipetakan" value="31" note="perlu identifikasi" positive={false} /><Metric label="Pengecualian" value="15" note="lokasi, owner, status" positive={false} /></div><Card className="surface surface-pad"><div className="filter-row"><Label className="toolbar-search"><Search size={15} /><Input className="workspace-search-input" aria-label="Cari ID aset, equipment, lokasi" placeholder="Cari ID aset, equipment, lokasi..." value={query} onChange={(e) => setQuery(e.target.value)} /></Label><NativeSelect className="field-control filter-select" aria-label="Filter pemetaan" value={assetFilter} onChange={(e) => setAssetFilter(e.target.value)}>{["Semua pemetaan", "Mapped", "Unmapped", "Review"].map((x) => <NativeSelectOption key={x}>{x}</NativeSelectOption>)}</NativeSelect><ShadcnButton variant="outline" size="unset" className="action-button secondary" aria-pressed={assetFilter === "Review"} onClick={() => setAssetFilter(assetFilter === "Review" ? "Semua pemetaan" : "Review")}><Filter size={15} /> Pengecualian</ShadcnButton></div><div className="table-wrap"><Table className="data-table"><TableHeader><TableRow><TableHead>ID ASET</TableHead><TableHead>NAMA ASET</TableHead><TableHead>EQUIPMENT SAP</TableHead><TableHead>LOKASI</TableHead><TableHead>PEMILIK</TableHead><TableHead>STATUS</TableHead><TableHead /></TableRow></TableHeader><TableBody>{filteredAssets.map((row) => <TableRow key={row.id}><TableCell className="mono">{row.id}</TableCell><TableCell><strong className="table-strong">{row.name}</strong></TableCell><TableCell className="mono">{row.equipment}</TableCell><TableCell>{row.location}</TableCell><TableCell>{row.owner}</TableCell><TableCell><Status tone={row.status === "Mapped" ? "complete" : row.status === "Review" ? "review" : "blocked"}>{assetStatusLabels[row.status]}</Status></TableCell><TableCell><ShadcnButton variant="ghost" size="unset" className="row-more" aria-label={`Lihat detail ${row.id}`} onClick={(event) => {
  assetTrigger.current = event.currentTarget;
  setSelectedAsset(row);
}}><MoreHorizontal size={17} /></ShadcnButton></TableCell></TableRow>)}{filteredAssets.length === 0 && <TableRow><TableCell colSpan={7} className="empty-table">Tidak ada aset sesuai pencarian atau filter.</TableCell></TableRow>}</TableBody></Table></div><div className="provenance-ribbon"><span>Setiap perubahan mapping menyimpan pengguna, timestamp, dan periode efektif.</span><span className="ribbon-tag">AUDIT TRAIL</span></div></Card></section>}
         {active === "analytics" && <CostAnalytics period={period} setPeriod={setPeriod} comparison={comparison} setComparison={setComparison} showToast={showToast} />}
        {active === "imports" && <section className="page-section"><div className="page-heading"><div><h1>Impor data SAP</h1><p>Pratinjau, cocokkan kolom, validasi, lalu konfirmasi sebelum data masuk ke workspace.</p></div><Badge variant="outline" className="simulation-badge"><i className="simulation-dot" /> IMPORT TERKENDALI</Badge></div><WorkspaceBanner title="Tinjau sebelum menyimpan">Periksa hasil validasi dan pemetaan kolom sebelum mengonfirmasi impor.</WorkspaceBanner><div className="import-layout"><Card className="surface surface-pad"><h2 className="panel-heading">Unggah berkas</h2><p className="panel-description">Pilih snapshot SAP untuk analisis biaya, mapping aset, atau daftar equipment.</p><Label className="field-label" htmlFor="import-type">Jenis data</Label><NativeSelect id="import-type" className="field-control import-type" disabled={uploadBusy || commitBusy} value={importType} onChange={(e) => { setImportType(e.target.value); setPreview(null); }}><NativeSelectOption value="FINANCIAL_LINES">Cost Analytics · GL / CO / MM</NativeSelectOption><NativeSelectOption value="ASSETS">Asset 360 · SAP Asset</NativeSelectOption><NativeSelectOption value="EQUIPMENT">Asset 360 · Equipment</NativeSelectOption></NativeSelect><FileUpload file={file} disabled={uploadBusy || commitBusy} onChange={(next) => { setFile(next); setPreview(null); }} /><StatefulButton className="action-button primary full-button" onClick={previewImport} loading={uploadBusy} pendingLabel="Membaca berkas…" disabled={!file || commitBusy}>Tampilkan pratinjau</StatefulButton></Card><Card className="surface surface-pad import-side"><div className="import-art"><AccountingIllustration /></div><h3>Alur impor</h3><p>Setiap impor menyimpan informasi sumber, periode laporan, status validasi, dan waktu pemuatan.</p><div className="pipeline-step"><span>01</span><div><strong>Upload & pratinjau</strong><small>Periksa sampel baris dan format</small></div></div><div className="pipeline-step"><span>02</span><div><strong>Mapping kolom</strong><small>Hubungkan header dengan field</small></div></div><div className="pipeline-step"><span>03</span><div><strong>Review & simpan</strong><small>Konfirmasi sebelum commit</small></div></div></Card></div>{preview && <Card className="surface surface-pad preview-panel"><div className="section-title"><div><h2>Pratinjau berkas</h2><p>{preview.rowCount} baris ditemukan · {preview.validCount} lolos validasi · {preview.missing.length ? "kolom wajib belum terdeteksi" : "pratinjau hingga 5 baris"}</p></div><StatefulButton className="action-button primary" onClick={commitImport} loading={commitBusy} pendingLabel="Menyimpan impor…" disabled={uploadBusy || preview.requiredFields.some((field) => !columnMapping[field])}>Konfirmasi impor</StatefulButton></div><div className="mapping-grid import-mapping">{preview.requiredFields.map((field) => <div className="mapping-row" key={field}><Label className="mapping-field" htmlFor={`mapping-${field}`}>{field}<span className="mapping-required">Wajib</span></Label><NativeSelect id={`mapping-${field}`} className="field-control" value={columnMapping[field] ?? ""} disabled={commitBusy || uploadBusy} onChange={(e) => setColumnMapping((current) => ({ ...current, [field]: e.target.value }))}><NativeSelectOption value="">Pilih kolom sumber</NativeSelectOption>{preview.headers.map((header) => <NativeSelectOption key={header} value={header}>{header}</NativeSelectOption>)}</NativeSelect></div>)}</div><div className="table-wrap"><Table className="data-table"><TableHeader><TableRow>{preview.headers.map((header) => <TableHead key={header}>{header}</TableHead>)}</TableRow></TableHeader><TableBody>{preview.preview.slice(0, 5).map((row, index) => <TableRow key={index}>{preview.headers.map((h) => <TableCell key={h}>{String(row[h] ?? "—")}</TableCell>)}</TableRow>)}</TableBody></Table></div></Card>}</section>}
        {active === "team" && <section className="page-section"><div className="page-heading"><div><h1>Tim Accounting</h1><p>Struktur section, kapasitas mingguan, dan akses berdasarkan peran.</p></div><Button onClick={() => showToast("Pembuatan akun tersedia setelah Admin masuk.")}><Plus size={16} /> Undang anggota</Button></div><WorkspaceBanner title="Akses berbasis peran">Admin mengelola akun dan impor. Manager mengatur penugasan. PIC mencatat dan menyelesaikan tugasnya.</WorkspaceBanner><div className="overview-grid"><Card className="surface surface-pad"><div className="section-title"><div><h2>Anggota tim</h2><p>Contoh struktur untuk workspace</p></div><Badge variant="outline" className="simulation-badge">SIMULASI</Badge></div><div className="team-list">{[{ name: "Nadia Putri", role: "PIC · Financial Accounting", initials: "NP", load: 88 }, { name: "Rizky Ananda", role: "PIC · Asset & Reconciliation", initials: "RA", load: 72 }, { name: "Dimas Prakoso", role: "PIC · Cost Accounting", initials: "DP", load: 64 }, { name: "Sari Wulandari", role: "Manager · Internal Reporting", initials: "SW", load: 51 }].map((p) => <div className="team-row" key={p.name}><Avatar className="person-mini large"><AvatarFallback>{p.initials}</AvatarFallback></Avatar><div className="team-member"><strong>{p.name}</strong><small>{p.role}</small></div><span className={`load-label ${p.load > 85 ? "load-high" : ""}`}>{p.load}%</span><Progress value={p.load} aria-label={`Kapasitas ${p.name}`} className="progress-track team-progress" indicatorClassName={`progress-value ${p.load > 85 ? "high" : ""}`} /></div>)}</div></Card><Card className="surface surface-pad"><div className="section-title"><div><h2>Komposisi kapasitas</h2><p>Baseline 40 jam per minggu</p></div></div><Capacity /></Card></div></section>}
      </div>
      <footer className="page-footer"><span>Digital Accounting <i>·</i> Data pratinjau</span><span><a href="https://lordicon.com" target="_blank" rel="noreferrer">Ikon Lordicon</a></span></footer>
    </main>
    <Dialog open={modal} onOpenChange={changeTaskDialog}>
      <DialogContent showCloseButton={false} initialFocus={taskNameInput} finalFocus={taskTrigger}>
        <div className="modal-head">
          <div>
            <DialogTitle>Buat pekerjaan</DialogTitle>
            <DialogDescription>Catat pekerjaan dan estimasi kapasitas PIC.</DialogDescription>
          </div>
          <DialogClose className="icon-button" aria-label="Tutup" disabled={taskBusy}>
            <X size={18} aria-hidden="true" />
          </DialogClose>
        </div>
        <form onSubmit={submitTask} className="modal-body">
          {taskError && <Alert role="alert" className="modal-error">{taskError}</Alert>}
          <Label className="field-label" htmlFor="task-name">Nama pekerjaan <span className="required">*</span></Label>
          <Input id="task-name" ref={taskNameInput} disabled={taskBusy} className="field-control" maxLength={200} required placeholder="Contoh: Rekonsiliasi akun bank" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
          <div className="form-grid">
            <div>
              <Label className="field-label" htmlFor="task-section">Section</Label>
              <NativeSelect id="task-section" disabled={taskBusy} className="field-control" value={section} onChange={(e) => setSection(e.target.value)}>
                {["Verification 1", "Verification 2", "Financial Accounting", "Cost Accounting", "Reconciliation", "Internal Reporting", "External Reporting"].map((name) => (
                  <NativeSelectOption key={name}>{name}</NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div>
              <Label className="field-label" htmlFor="task-effort">Estimasi jam</Label>
              <Input id="task-effort" disabled={taskBusy} type="number" min="0.5" step="0.5" className="field-control" value={effort} onChange={(e) => setEffort(e.target.value)} />
            </div>
            <div className="form-span">
              <Label className="field-label" htmlFor="task-deadline">Tenggat</Label>
              <Input id="task-deadline" disabled={taskBusy} type="date" className="field-control" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
          </div>
          <p className="form-note">Penyimpanan memerlukan akun workspace.</p>
          <div className="modal-actions">
            <Button variant="secondary" disabled={taskBusy} onClick={() => changeTaskDialog(false)}>Batal</Button>
            <StatefulButton type="submit" loading={taskBusy} pendingLabel="Menyimpan…" disabled={!taskName.trim()} className="action-button primary">
              Simpan pekerjaan
            </StatefulButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    <Dialog open={selectedAsset !== null} onOpenChange={(open) => { if (!open) setSelectedAsset(null); }}>
      <DialogContent showCloseButton={false} finalFocus={assetTrigger}>
        <div className="modal-head">
          <div>
            <DialogTitle>Detail aset</DialogTitle>
            <DialogDescription>Referensi finance dan equipment · data simulasi</DialogDescription>
          </div>
          <DialogClose className="icon-button" aria-label="Tutup detail aset"><X size={18} aria-hidden="true" /></DialogClose>
        </div>
        {selectedAsset && (
          <div className="modal-body">
            <h3 className="asset-detail-title">{selectedAsset.name}</h3>
            <dl className="asset-detail-list">
              <div><dt>ID aset SAP</dt><dd className="mono">{selectedAsset.id}</dd></div>
              <div><dt>Equipment tertaut</dt><dd className="mono">{selectedAsset.equipment}</dd></div>
              <div><dt>Lokasi</dt><dd>{selectedAsset.location}</dd></div>
              <div><dt>Pemilik</dt><dd>{selectedAsset.owner}</dd></div>
              <div><dt>Status pemetaan</dt><dd>{assetStatusLabels[selectedAsset.status]}</dd></div>
            </dl>
            <p className="field-help">Riwayat perubahan tersedia setelah data sumber diimpor.</p>
            <div className="modal-actions">
              <DialogClose render={<ShadcnButton variant="outline" className="action-button secondary" />}>Tutup</DialogClose>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
    {toast && <WorkspaceToast key={toast.id} kind={toast.kind} message={toast.message} onDismiss={dismissToast} />}
  </div>;
}

function Overview({ setActive, openModal, banner, onDismissBanner, rows }: {
  setActive: (area: Area) => void;
  openModal: (event: MouseEvent<HTMLButtonElement>) => void;
  banner: boolean;
  onDismissBanner: () => void;
  rows: typeof tasks;
}) {
  const exceptions = [
    { area: "assets", label: "Mapping equipment", detail: "7 equipment belum terhubung ke aset SAP", impact: "7 item" },
    { area: "tasks", label: "Pekerjaan menunggu review", detail: "2 pekerjaan melewati tenggat review", impact: "4 item" },
    { area: "analytics", label: "Biaya utilitas naik", detail: "Demo CKG-02 · +18,6% bulanan", impact: "Rp 286 jt" },
  ] as const;

  return (
    <section className="page-section overview-page">
      <div className="page-heading overview-heading">
        <div>
          <h1>Antrian kerja Accounting</h1>
          <p>Pekerjaan, kapasitas, dan pengecualian yang perlu ditangani hari ini.</p>
        </div>
        <div className="heading-actions">
          <Button variant="secondary" onClick={() => setActive("analytics")}>Lihat analisis <ArrowRight size={15} aria-hidden="true" /></Button>
          <Button onClick={openModal}><Plus size={16} aria-hidden="true" /> Buat pekerjaan</Button>
        </div>
      </div>
      <div className="stats-strip overview-stats">
        <Metric label="Pekerjaan aktif" value="28" note="4 perlu perhatian" />
        <Metric label="Selesai bulan ini" value="84" note="dari target ilustratif 92" />
        <Metric label="Utilisasi tim" value="76%" note="Data demo · 40 jam per PIC" />
        <Metric label="Pengecualian data" value="12" note="3 berdampak tinggi" positive={false} />
      </div>
      <div className="overview-grid">
        <Card as="article" className="surface surface-pad task-queue-panel">
          <div className="section-title">
            <div><h2>Prioritas hari ini</h2><p>Tenggat dan status pekerjaan tim</p></div>
            <ShadcnButton variant="ghost" size="unset" className="section-link" onClick={() => setActive("tasks")}>
              Semua pekerjaan <ArrowRight size={14} aria-hidden="true" />
            </ShadcnButton>
          </div>
          <TaskTable rows={rows.slice(0, 5)} />
        </Card>
        <aside className="overview-side" aria-label="Konteks antrean">
          <Card as="article" className="surface surface-pad capacity-panel">
            <div className="section-title"><div><h2>Kapasitas tim</h2><p>Jam aktif dari 40 jam per minggu</p></div></div>
            <Capacity />
            <p className="capacity-caption">Nadia mendekati kapasitas. Tinjau distribusi pekerjaan baru.</p>
            <ShadcnButton variant="ghost" size="unset" className="capacity-link" onClick={() => setActive("team")}>
              Kelola beban kerja <ArrowRight size={13} aria-hidden="true" />
            </ShadcnButton>
          </Card>
          <Card as="article" className="surface surface-pad exception-panel">
            <div className="section-title">
              <div><h2>Perlu ditinjau</h2><p>Tindak lanjut untuk Accounting</p></div>
              <Badge variant="outline" className="count-tag">{exceptions.length} hal</Badge>
            </div>
            <div className="exception-list">
              {exceptions.map(({ area, label, detail, impact }) => (
                <ShadcnButton key={area} variant="ghost" size="unset" className="exception-row" onClick={() => setActive(area)}>
                  <span className="exception-text"><strong>{label}</strong><small>{detail}</small></span>
                  <span className="exception-impact">{impact}</span>
                  <ArrowRight className="exception-arrow" size={14} aria-hidden="true" />
                </ShadcnButton>
              ))}
            </div>
          </Card>
        </aside>
      </div>
      <div className="overview-sources" data-has-notices={banner || undefined}>
        <ScrollMotion />
        <Card as="article" className="surface surface-pad source-panel" data-aos="ledger-reveal">
          <div className="section-title"><div><h2>Sumber data</h2><p>Snapshot terakhir di workspace</p></div></div>
          <div className="source-total"><span>3</span><div><strong>snapshot SAP</strong><small>seluruh nilai bersifat simulasi</small></div></div>
          <div className="source-list">
            <div><span className="source-dot ready" aria-hidden="true" /><span>General Ledger · Okt 2026</span><small>21 Nov</small></div>
            <div><span className="source-dot ready" aria-hidden="true" /><span>Cost Center · Okt 2026</span><small>21 Nov</small></div>
            <div><span className="source-dot pending" aria-hidden="true" /><span>Equipment master · Okt</span><small>Perlu review</small></div>
          </div>
          <ShadcnButton variant="ghost" size="unset" className="capacity-link" onClick={() => setActive("imports")}>
            Buka impor data <ArrowRight size={13} aria-hidden="true" />
          </ShadcnButton>
        </Card>
        {banner && <NoticeCarousel onAnalytics={() => setActive("analytics")} onAssets={() => setActive("assets")} onDismiss={onDismissBanner} />}
      </div>
    </section>
  );
}

function TaskTable({ rows }: { rows: typeof tasks }) {
  return <div className="table-wrap"><Table className="priority-table"><TableHeader><TableRow><TableHead scope="col">PEKERJAAN</TableHead><TableHead scope="col">PIC</TableHead><TableHead scope="col">TENGGAT</TableHead><TableHead scope="col">STATUS</TableHead></TableRow></TableHeader><TableBody>{rows.length ? rows.map((task) => <TableRow key={task.code}><TableCell><div className="task-name">{task.name}</div><div className="task-sub">{task.code} <span>·</span> {task.section}</div></TableCell><TableCell data-label="PIC"><div className="person-cell"><Avatar className="person-mini" aria-hidden="true"><AvatarFallback>{task.initials}</AvatarFallback></Avatar><span>{task.person}</span></div></TableCell><TableCell data-label="Tenggat" className="due-cell">{task.due}</TableCell><TableCell data-label="Status"><Status tone={task.tone}>{task.status}</Status></TableCell></TableRow>) : <TableRow><TableCell colSpan={4} className="empty-table">Tidak ada pekerjaan sesuai pencarian.</TableCell></TableRow>}</TableBody></Table></div>;
}
function Capacity() {
  return <div className="capacity-list">{[{ name: "Nadia Putri", used: 35, cap: 40, color: "critical" }, { name: "Rizky Ananda", used: 31, cap: 40, color: "" }, { name: "Dimas Prakoso", used: 25, cap: 40, color: "" }, { name: "Sari Wulandari", used: 20, cap: 40, color: "" }].map((p) => <div className="capacity-row" key={p.name}><span className="capacity-name">{p.name}</span><Progress value={p.used} max={p.cap} aria-label={`Kapasitas ${p.name}`} aria-valuetext={`${p.used} dari ${p.cap} jam`} className="capacity-track" indicatorClassName={`capacity-fill ${p.color}`} /><span className="capacity-label">{p.used}<i> / {p.cap} j</i></span></div>)}</div>;
}
