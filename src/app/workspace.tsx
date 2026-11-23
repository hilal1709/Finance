"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { StudioHeading, StudioPage } from "@/components/studio-page";
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
import { NoticeCarousel, StudioCarousel } from "@/components/notice-carousel";
import { WorkspaceToast, type ToastKind } from "@/components/workspace-toast";
import { WorkspaceBanner } from "@/components/workspace-banner";
import { CostAnalytics } from "@/components/cost-analytics";
import { BrandMark } from "@/components/brand-mark";
import type { Comparison, CostPeriod } from "@/lib/cost-demo";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";


import { Icon } from "@/components/ui/icon";

type Area = "overview" | "tasks" | "assets" | "analytics" | "imports" | "team";
type ToastState = { id: number; kind: ToastKind; message: string };

const AccountingIllustration = dynamic(() => import("@/components/accounting-illustration").then((module) => module.AccountingIllustration));
const nav = [
  { id: "overview", label: "Command center", shortLabel: "Beranda", icon: "chart" },
  { id: "tasks", label: "Tugas & workload", shortLabel: "Tugas", icon: "tasks" },
  { id: "assets", label: "Asset 360", shortLabel: "Aset", icon: "asset" },
  { id: "analytics", label: "Cost analytics", shortLabel: "Biaya", icon: "analytics" },
  { id: "imports", label: "Impor data", shortLabel: "Impor", icon: "file" },
  { id: "team", label: "Tim & akses", shortLabel: "Tim", icon: "people" },
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


const capacity = [
  { name: "Nadia Putri", used: 35, role: "PIC · Financial Accounting", initials: "NP" },
  { name: "Rizky Ananda", used: 31, role: "PIC · Asset & Reconciliation", initials: "RA" },
  { name: "Dimas Prakoso", used: 25, role: "PIC · Cost Accounting", initials: "DP" },
  { name: "Sari Wulandari", used: 20, role: "Manager · Internal Reporting", initials: "SW" },
];
const weeklyCapacity = 40;
const utilization = Math.round(capacity.reduce((total, person) => total + person.used, 0) / (capacity.length * weeklyCapacity) * 100);

const importSteps = ["Unggah berkas", "Petakan kolom", "Tinjau pratinjau", "Konfirmasi impor"];

function Brand() {
  return <div className="brand-lockup"><div className="brand-mark"><BrandMark className="brand-symbol" /></div><span className="brand-title">Digital Accounting</span></div>;
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
  const [importError, setImportError] = useState<string | null>(null);
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
    window.scrollTo({ top: 0, behavior: "instant" });
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
    setImportError(null);
    const body = new FormData(); body.set("file", file); body.set("type", importType);
    try {
      const response = await fetch("/api/imports/preview", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "File tidak dapat dibaca.");
      setPreview(data);
      setColumnMapping(data.suggestedMapping ?? {});
    } catch (error) {
      const message = error instanceof Error ? error.message : "Pratinjau gagal dimuat.";
      setImportError(message);
      showToast(message, "error");
    }
    finally { setUploadBusy(false); }
  }
  async function commitImport() {
    if (!file || !preview || commitBusy || uploadBusy) return;
    setCommitBusy(true);
    setImportError(null);
    const body = new FormData(); body.set("file", file); body.set("type", importType); body.set("mapping", JSON.stringify(columnMapping));
    try {
      const response = await fetch("/api/imports/commit", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Impor tidak dapat disimpan.");
      showToast(`Impor berhasil diproses · ${data.validCount ?? preview.validCount} baris valid.`, "success");
      setPreview(null); setFile(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Commit impor gagal.";
      setImportError(message);
      showToast(message, "error");
    }
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

  function showAsset(event: MouseEvent<HTMLButtonElement>, asset: typeof assetRows[number]) {
    assetTrigger.current = event.currentTarget;
    setSelectedAsset(asset);
  }

  function jumpToAssetFilter(status: keyof typeof assetStatusLabels) {
    setAssetFilter(status);
    document.getElementById("asset-filter")?.focus();
  }

  const importReady = preview?.requiredFields.every((field) => Boolean(columnMapping[field]));
  const importStage = commitBusy ? 3 : preview ? (importReady ? 2 : 1) : 0;

  return <div className="app-shell studio-shell">
    <a href="#workspace-content" className="skip-link">Langsung ke konten</a>
    <Sidebar open={mobileOpen} onOpenChange={setMobileOpen} triggerRef={menuButton}>
      <Brand />
      <nav className="nav-scroll" aria-label="Navigasi utama">
        {nav.map(({ id, label, shortLabel, icon }) => (
          <SidebarLink key={id} icon={<Icon name={icon} size={19} />} label={label} shortLabel={shortLabel} active={active === id} onClick={() => navigate(id)} />
        ))}
      </nav>
      <div className="sidebar-bottom">
        <Link className="drawer-login" href="/login">Masuk ke workspace</Link>
        <div className="sidebar-user">
          <Avatar className="avatar"><AvatarFallback>AP</AvatarFallback></Avatar>
          <div className="sidebar-user-meta"><span className="sidebar-user-name">Accounting Preview</span><span className="sidebar-user-role">Manager · Demo</span></div>
          <ShadcnButton variant="ghost" size="unset" className="sidebar-signout" aria-label="Buka tim dan akses" onClick={() => navigate("team")}><Icon name="settings" size={16} /></ShadcnButton>
        </div>
      </div>
    </Sidebar>
    <main className="main-frame">
      <header className="topbar">
        <div className="topbar-left">
          <ShadcnButton ref={menuButton} variant="ghost" size="unset" aria-label="Buka navigasi" aria-controls="workspace-navigation" aria-expanded={mobileOpen} className="mobile-menu-button" onClick={() => setMobileOpen(true)}><Icon name="menu" size={18} /></ShadcnButton>
          <span className="studio-mobile-brand">Accounting</span>
          <div className="topbar-context"><strong>Digital Accounting</strong><span>/</span>{title}</div>
        </div>
        <div className="topbar-right">
          <Label className="global-search">
            <Icon name="search" size={15} />
            <Input className="workspace-search-input" ref={searchInput} aria-label={active === "assets" ? "Cari aset" : "Cari pekerjaan"} placeholder={active === "assets" ? "Cari aset" : "Cari pekerjaan"} value={query} onChange={(event) => {
              setQuery(event.target.value);
              if (active !== "assets" && active !== "tasks" && active !== "overview") setActive("tasks");
            }} />
            <kbd>Ctrl K</kbd>
          </Label>
          <Badge variant="outline" className="simulation-badge"><i className="simulation-dot" /> DATA SIMULASI</Badge>
          <ShadcnButton variant="ghost" size="unset" className="icon-button notification" aria-label="Notifikasi" onClick={() => showToast("Belum ada notifikasi baru.")}><Icon name="bell" size={17} /></ShadcnButton>
          <Link href="/login" className="topbar-avatar" aria-label="Masuk ke workspace">AP</Link>
        </div>
      </header>
      <div id="workspace-content" className="page-content" tabIndex={-1}>
        {active === "overview" && <Overview setActive={navigate} openModal={openTask} banner={overviewBanner} onDismissBanner={() => setOverviewBanner(false)} rows={filteredTasks} />}
        {active === "tasks" && (
          <StudioPage className="studio-tasks">
            <StudioHeading title="Pekerjaan tim" description="Pantau pekerjaan, tenggat, dan kapasitas setiap PIC.">
              <Button onClick={openTask}><Icon name="add" size={16} /> Buat pekerjaan</Button>
            </StudioHeading>
            <div className="studio-split studio-task-layout">
              <Card as="section" className="surface studio-directory">
                <div className="studio-panel-heading">
                  <div><h2>Daftar pekerjaan</h2><p>Simulasi · 6 mendekati tenggat · 4 menunggu review</p></div>
                  <span key={filteredTasks.length} className="result-count">{filteredTasks.length} pekerjaan</span>
                </div>
                <div className="filter-row studio-toolbar">
                  <Label className="toolbar-search">
                    <Icon name="search" size={15} />
                    <Input className="workspace-search-input" aria-label="Cari pekerjaan atau PIC" placeholder="Cari pekerjaan atau PIC" value={query} onChange={(event) => setQuery(event.target.value)} />
                  </Label>
                  <NativeSelect className="field-control filter-select" aria-label="Filter status" value={taskFilter} onChange={(event) => setTaskFilter(event.target.value)}>
                    {["Semua status", "New", "Assigned", "In Progress", "Waiting / Blocked", "In Review", "Completed"].map((status) => <NativeSelectOption key={status}>{status}</NativeSelectOption>)}
                  </NativeSelect>
                </div>
                <TaskTable rows={filteredTasks} filtered={Boolean(query.trim()) || taskFilter !== "Semua status"} />
              </Card>
              <aside className="studio-context">
                <Card as="section" className="surface surface-pad capacity-panel" aria-label="Kapasitas mingguan">
                  <div className="section-title"><div><h2>Kapasitas mingguan</h2><p>40 jam per PIC · simulasi</p></div></div>
                  <Capacity />
                </Card>
                <div data-aos="studio-reveal">
                  <StudioCarousel title="Beban per PIC" slides={capacity.map((person) => ({
                    title: person.name,
                    description: `${person.used} dari ${weeklyCapacity} jam terpakai · ${person.role}.`,
                  }))} />
                </div>
              </aside>
            </div>
          </StudioPage>
        )}
        {active === "assets" && (
          <StudioPage className="studio-assets">
            <StudioHeading title="Mapping aset & equipment" description="Telusuri hubungan aset SAP dengan equipment, lokasi, dan pemilik.">
              <Button onClick={() => navigate("imports")}><Icon name="upload" size={20} /> Impor master aset</Button>
            </StudioHeading>
            <Card as="section" className="surface studio-directory studio-asset-directory">
              <div className="studio-panel-heading">
                <h2>Direktori aset</h2><span key={filteredAssets.length} className="result-count">{filteredAssets.length} aset</span>
              </div>
              <div className="filter-row studio-toolbar">
                <Label className="toolbar-search"><Icon name="search" size={15} /><Input className="workspace-search-input" aria-label="Cari ID aset, equipment, lokasi" placeholder="Cari ID, equipment, lokasi" value={query} onChange={(event) => setQuery(event.target.value)} /></Label>
                <NativeSelect id="asset-filter" className="field-control filter-select" aria-label="Filter pemetaan" value={assetFilter} onChange={(event) => setAssetFilter(event.target.value)}>
                  <NativeSelectOption>Semua pemetaan</NativeSelectOption>
                  {Object.entries(assetStatusLabels).map(([value, label]) => <NativeSelectOption key={value} value={value}>{label}</NativeSelectOption>)}
                </NativeSelect>
                <ShadcnButton variant="outline" size="unset" className="action-button secondary" aria-pressed={assetFilter === "Review"} onClick={() => setAssetFilter(assetFilter === "Review" ? "Semua pemetaan" : "Review")}><Icon name="filter" size={15} /> Pengecualian</ShadcnButton>
              </div>
              <div className="table-wrap" tabIndex={0} role="region" aria-label="Tabel direktori aset">
                <Table className="data-table asset-table">
                  <TableHeader><TableRow><TableHead scope="col">ASET SAP</TableHead><TableHead scope="col">STATUS MAPPING</TableHead><TableHead scope="col">EQUIPMENT SAP</TableHead><TableHead scope="col">LOKASI</TableHead><TableHead scope="col">PEMILIK</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {filteredAssets.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <ShadcnButton variant="link" size="unset" className="asset-record" aria-label={`Lihat detail ${row.id}`} onClick={(event) => showAsset(event, row)}>
                            <span className="mono">{row.id}</span><strong>{row.name}</strong><Icon name="arrow" size={14} />
                          </ShadcnButton>
                        </TableCell>
                        <TableCell><Status tone={row.status === "Mapped" ? "complete" : row.status === "Review" ? "review" : "blocked"}>{assetStatusLabels[row.status]}</Status></TableCell>
                        <TableCell className="mono">{row.equipment}</TableCell><TableCell>{row.location}</TableCell><TableCell>{row.owner}</TableCell>
                      </TableRow>
                    ))}
                    {!filteredAssets.length && <TableRow><TableCell colSpan={5} className="empty-table">Tidak ada aset sesuai pencarian atau filter.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </div>
            </Card>
            <div className="studio-split studio-asset-support" data-aos="studio-reveal">
              <div>
                {assetBanner && <WorkspaceBanner tone="warning" title="Master SAP tetap sumber utama" onDismiss={() => setAssetBanner(false)}>Mapping mencatat periode efektif dan riwayat audit tanpa mengubah master SAP.</WorkspaceBanner>}
                <div className="studio-facts">
                  <span><strong>1.284</strong> Aset pada snapshot SAP</span>
                  <span><strong>96,4%</strong> Terpetakan · data simulasi</span>
                  <span><strong>31</strong> Belum dipetakan</span>
                  <span><strong>15</strong> Pengecualian</span>
                </div>
              </div>
              <StudioCarousel title="Status pemetaan" slides={[
                { title: "Terpetakan", description: "Aset memiliki setidaknya satu referensi equipment.", action: { label: "Lihat aset terpetakan", onClick: () => jumpToAssetFilter("Mapped") } },
                { title: "Belum dipetakan", description: "Aset belum memiliki referensi equipment.", action: { label: "Lihat aset belum dipetakan", onClick: () => jumpToAssetFilter("Unmapped") } },
                { title: "Perlu review", description: "Periksa pengecualian lokasi, pemilik, atau status equipment.", tone: "warning", action: { label: "Lihat aset perlu review", onClick: () => jumpToAssetFilter("Review") } },
              ]} />
            </div>
          </StudioPage>
        )}
        {active === "analytics" && <CostAnalytics period={period} setPeriod={setPeriod} comparison={comparison} setComparison={setComparison} showToast={showToast} />}
        {active === "imports" && (
          <StudioPage className="studio-imports">
            <StudioHeading title="Impor data SAP" description="Tinjau berkas dan pemetaan kolom sebelum menyimpan data ke workspace." />
            <ol className="studio-steps" aria-label="Tahapan impor">
              {importSteps.map((step, index) => <li key={step} aria-current={index === importStage ? "step" : undefined}><span>{index + 1}</span>{step}</li>)}
            </ol>
            <div className="import-layout">
              <Card as="section" className="surface surface-pad">
                <h2 className="panel-heading">Unggah berkas</h2>
                <p className="panel-description">Pilih snapshot untuk analisis biaya, data aset, atau daftar equipment.</p>
                <Label className="field-label" htmlFor="import-type">Jenis data</Label>
                <NativeSelect id="import-type" className="field-control import-type" disabled={uploadBusy || commitBusy} value={importType} onChange={(event) => { setImportType(event.target.value); setPreview(null); setImportError(null); }}>
                  <NativeSelectOption value="FINANCIAL_LINES">Cost Analytics · GL / CO / MM</NativeSelectOption>
                  <NativeSelectOption value="ASSETS">Asset 360 · SAP Asset</NativeSelectOption>
                  <NativeSelectOption value="EQUIPMENT">Asset 360 · Equipment</NativeSelectOption>
                </NativeSelect>
                <FileUpload file={file} disabled={uploadBusy || commitBusy} onChange={(next) => { setFile(next); setPreview(null); setImportError(null); }} />
                {importError && !preview && <p className="import-error">{importError}</p>}
                <StatefulButton className="action-button primary full-button" onClick={previewImport} loading={uploadBusy} pendingLabel="Membaca berkas…" disabled={!file || commitBusy}>Tampilkan pratinjau</StatefulButton>
              </Card>
              <aside className="studio-import-context" data-aos="studio-reveal">
                <div className="import-art"><AccountingIllustration scene="import" /></div>
                <StudioCarousel title="Panduan impor" slides={[
                  { title: "Format berkas", description: "Gunakan CSV atau XLSX hingga 20 MB dengan header pada baris pertama." },
                  { title: "Pemetaan kolom", description: "Pasangkan setiap kolom wajib dengan header yang sesuai dari berkas." },
                  { title: "Validasi", description: "Tinjau jumlah baris valid dan kolom yang belum terdeteksi sebelum konfirmasi." },
                ]} />
              </aside>
            </div>
            {preview && <Card as="section" className="surface studio-directory preview-panel">
              <div className="studio-panel-heading">
                <div><h2>Pratinjau berkas</h2><p>{preview.rowCount} baris · {!importReady ? "Pilih sumber untuk setiap kolom wajib." : preview.requiredFields.every((field) => columnMapping[field] === preview.suggestedMapping[field]) ? `${preview.validCount} lolos validasi awal.` : "Pemetaan manual akan divalidasi saat konfirmasi."} Maksimal 5 baris ditampilkan.</p></div>
                <StatefulButton className="action-button primary" onClick={commitImport} loading={commitBusy} pendingLabel="Menyimpan impor…" disabled={uploadBusy || !importReady}>Konfirmasi impor</StatefulButton>
              </div>
              {importError && <p className="import-error">{importError}</p>}
              <div className="mapping-grid import-mapping">{preview.requiredFields.map((field) => <div className="mapping-row" key={field}>
                <Label className="mapping-field" htmlFor={`mapping-${field}`}>{field}<span className="mapping-required" aria-hidden="true">Wajib</span></Label>
                <NativeSelect id={`mapping-${field}`} className="field-control" value={columnMapping[field] ?? ""} required disabled={commitBusy || uploadBusy} onChange={(event) => setColumnMapping((current) => ({ ...current, [field]: event.target.value }))}>
                  <NativeSelectOption value="">Pilih kolom sumber</NativeSelectOption>
                  {preview.headers.map((header) => <NativeSelectOption key={header} value={header}>{header}</NativeSelectOption>)}
                </NativeSelect>
              </div>)}</div>
              <div className="table-wrap">
                <Table className="data-table">
                  <TableHeader><TableRow>{preview.headers.map((header) => <TableHead key={header} scope="col">{header}</TableHead>)}</TableRow></TableHeader>
                  <TableBody>{preview.preview.slice(0, 5).map((row, index) => <TableRow key={index}>{preview.headers.map((header) => <TableCell key={header}>{String(row[header] ?? "—")}</TableCell>)}</TableRow>)}</TableBody>
                </Table>
              </div>
            </Card>}
          </StudioPage>
        )}
        {active === "team" && (
          <StudioPage className="studio-team">
            <StudioHeading title="Tim Accounting" description="Tinjau peran, section, dan kapasitas mingguan anggota tim.">
              <Button onClick={() => showToast("Pembuatan akun tersedia setelah Admin masuk.")}><Icon name="add" size={16} /> Undang anggota</Button>
            </StudioHeading>
            <div className="studio-split studio-team-layout">
              <Card as="section" className="surface studio-directory">
                <div className="studio-panel-heading"><h2>Anggota tim</h2><Badge variant="outline" className="simulation-badge">SIMULASI</Badge></div>
                <div className="team-list studio-roster">
                  {capacity.map((person) => {
                    const load = Math.round(person.used / weeklyCapacity * 100);
                    return <div className="team-row" key={person.name}>
                      <Avatar className="person-mini large" aria-hidden="true"><AvatarFallback>{person.initials}</AvatarFallback></Avatar>
                      <div className="team-member"><strong>{person.name}</strong><small>{person.role}</small></div>
                      <span className="allocation-hours">{person.used} / {weeklyCapacity} j</span>
                      <span className={`load-label ${load > 85 ? "load-high" : ""}`}>{load}%</span>
                      <Progress value={load} aria-label={`Kapasitas ${person.name}`} aria-valuetext={`${person.used} dari ${weeklyCapacity} jam · ${load}%`} className="progress-track team-progress" indicatorClassName={`progress-value ${load > 85 ? "high" : ""}`} />
                    </div>;
                  })}
                </div>
              </Card>
              <div data-aos="studio-reveal">
                <StudioCarousel title="Peran & akses" slides={[
                  { title: "Admin", description: "Kelola akun pengguna dan akses impor data." },
                  { title: "Manager", description: "Atur penugasan dan tinjau beban kerja tim." },
                  { title: "PIC", description: "Catat pekerjaan dan perbarui status tugas yang menjadi tanggung jawabnya." },
                ]} />
              </div>
            </div>
          </StudioPage>
        )}
      </div>
      <footer className="page-footer"><span>Digital Accounting <i>·</i> Data pratinjau</span></footer>
    </main>
    <Dialog open={modal} onOpenChange={changeTaskDialog}>
      <DialogContent showCloseButton={false} initialFocus={taskNameInput} finalFocus={taskTrigger}>
        <div className="modal-head">
          <div>
            <DialogTitle>Buat pekerjaan</DialogTitle>
            <DialogDescription>Catat pekerjaan dan estimasi kapasitas PIC.</DialogDescription>
          </div>
          <DialogClose className="icon-button" aria-label="Tutup" disabled={taskBusy}>
            <Icon name="close" size={18} />
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
    <Sheet open={selectedAsset !== null} onOpenChange={(open) => { if (!open) setSelectedAsset(null); }}>
      <SheetContent className="studio-asset-sheet" finalFocus={assetTrigger}>
        <div className="modal-head">
          <div>
            <SheetTitle className="modal-title">Detail aset</SheetTitle>
            <SheetDescription>Referensi finance dan equipment · data simulasi</SheetDescription>
          </div>
          <SheetClose className="icon-button" aria-label="Tutup detail aset"><Icon name="close" size={18} /></SheetClose>
        </div>
        {selectedAsset && (
          <div className="modal-body">
            <h3 className="asset-detail-title">{selectedAsset.name}</h3>
            <figure className="asset-map-guide"><AccountingIllustration scene="asset" className="asset-map-art" /><figcaption>Contoh struktur pemetaan</figcaption></figure>
            <dl className="asset-detail-list">
              <div><dt>ID aset SAP</dt><dd className="mono">{selectedAsset.id}</dd></div>
              <div><dt>Equipment tertaut</dt><dd className="mono">{selectedAsset.equipment}</dd></div>
              <div><dt>Lokasi</dt><dd>{selectedAsset.location}</dd></div>
              <div><dt>Pemilik</dt><dd>{selectedAsset.owner}</dd></div>
              <div><dt>Status pemetaan</dt><dd>{assetStatusLabels[selectedAsset.status]}</dd></div>
            </dl>
            <p className="field-help">Riwayat perubahan tersedia setelah data sumber diimpor.</p>
            <div className="modal-actions">
              <SheetClose render={<ShadcnButton variant="outline" className="action-button secondary" />}>Tutup</SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
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
    <StudioPage className="studio-overview">
      <StudioHeading title="Antrean kerja Accounting" description="Lihat tenggat, kapasitas, dan pengecualian yang perlu ditangani hari ini.">
        <Button onClick={openModal}><Icon name="add" size={16} /> Buat pekerjaan</Button>
      </StudioHeading>
      <div className="studio-split studio-overview-layout">
        <Card as="article" className="surface task-queue-panel">
          <div className="section-title">
            <div><h2>Prioritas hari ini</h2><p>Tenggat dan status pekerjaan tim</p></div>
            <ShadcnButton variant="ghost" size="unset" className="section-link" onClick={() => setActive("tasks")}>
              Semua pekerjaan <Icon name="arrow" size={14} />
            </ShadcnButton>
          </div>
          <TaskTable rows={rows.slice(0, 5)} />
        </Card>
        <aside className="studio-context" aria-label="Konteks antrean">
          <section className="studio-brief">
            <h2>Ringkasan operasional</h2>
            <AccountingIllustration scene="ledger" />
            <div className="studio-brief-grid">
              <Metric label="Pekerjaan aktif" value="28" note="4 perlu perhatian" />
              <Metric label="Selesai bulan ini" value="84" note="target ilustratif 92" />
              <Metric label="Utilisasi tim" value={`${utilization}%`} note="Data demo · 40 jam/PIC" />
              <Metric label="Pengecualian" value="12" note="3 berdampak tinggi" positive={false} />
            </div>
          </section>
          {banner && <NoticeCarousel onAnalytics={() => setActive("analytics")} onAssets={() => setActive("assets")} onDismiss={onDismissBanner} />}
        </aside>
      </div>
      <div className="studio-split studio-overview-followup" data-aos="studio-reveal">
          <Card as="article" className="surface surface-pad capacity-panel">
            <div className="section-title"><div><h2>Kapasitas tim</h2><p>Jam aktif dari 40 jam per minggu</p></div></div>
            <Capacity />
            <p className="capacity-caption">Nadia mendekati kapasitas. Tinjau distribusi pekerjaan baru.</p>
            <ShadcnButton variant="ghost" size="unset" className="capacity-link" onClick={() => setActive("team")}>
              Kelola beban kerja <Icon name="arrow" size={13} />
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
                  <Icon name="arrow" className="exception-arrow" size={14} />
                </ShadcnButton>
              ))}
            </div>
          </Card>
        <Card as="article" className="surface surface-pad source-panel">
          <div className="section-title"><div><h2>Sumber data</h2><p>Snapshot terakhir di workspace</p></div></div>
          <div className="source-total"><span>3</span><div><strong>snapshot SAP</strong><small>seluruh nilai bersifat simulasi</small></div></div>
          <div className="source-list">
            <div><span className="source-dot ready" aria-hidden="true" /><span>General Ledger · Okt 2026</span><small>21 Nov</small></div>
            <div><span className="source-dot ready" aria-hidden="true" /><span>Cost Center · Okt 2026</span><small>21 Nov</small></div>
            <div><span className="source-dot pending" aria-hidden="true" /><span>Equipment master · Okt</span><small>Perlu review</small></div>
          </div>
          <ShadcnButton variant="ghost" size="unset" className="capacity-link" onClick={() => setActive("imports")}>
            Buka impor data <Icon name="arrow" size={13} />
          </ShadcnButton>
        </Card>
      </div>
    </StudioPage>
  );
}

function TaskTable({ rows, filtered = true }: { rows: typeof tasks; filtered?: boolean }) {
  return <div className="table-wrap"><Table className="priority-table"><TableHeader><TableRow><TableHead scope="col">PEKERJAAN</TableHead><TableHead scope="col">PIC</TableHead><TableHead scope="col">TENGGAT</TableHead><TableHead scope="col">STATUS</TableHead></TableRow></TableHeader><TableBody>{rows.length ? rows.map((task) => <TableRow key={task.code}><TableCell><div className="task-name">{task.name}</div><div className="task-sub">{task.code} <span>·</span> {task.section}</div></TableCell><TableCell data-label="PIC"><div className="person-cell"><Avatar className="person-mini" aria-hidden="true"><AvatarFallback>{task.initials}</AvatarFallback></Avatar><span>{task.person}</span></div></TableCell><TableCell data-label="Tenggat" className="due-cell">{task.due}</TableCell><TableCell data-label="Status"><Status tone={task.tone}>{task.status}</Status></TableCell></TableRow>) : <TableRow><TableCell colSpan={4} className="empty-table"><AccountingIllustration scene="tasks" /><strong>{filtered ? "Tidak ada pekerjaan sesuai pencarian." : "Belum ada pekerjaan."}</strong><p>{filtered ? "Coba nama PIC, kode, atau status lain." : "Buat pekerjaan untuk mengisi daftar tim."}</p></TableCell></TableRow>}</TableBody></Table></div>;
}
function Capacity() {
  return <div className="capacity-list">{capacity.map((person) => (
    <div className="capacity-row" key={person.name}>
      <span className="capacity-name">{person.name}</span>
      <Progress value={person.used} max={weeklyCapacity} aria-label={`Kapasitas ${person.name}`} aria-valuetext={`${person.used} dari ${weeklyCapacity} jam`} className="capacity-track" indicatorClassName={`capacity-fill ${person.used >= 35 ? "critical" : ""}`} />
      <span className="capacity-label">{person.used}<i> / {weeklyCapacity} j</i></span>
    </div>
  ))}</div>;
}
