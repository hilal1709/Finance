import { expect, test, type Page } from "@playwright/test";

async function navigate(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Buka navigasi" });
  if (await menu.isVisible()) await menu.click();
  await page.getByRole("navigation", { name: "Navigasi utama" }).getByRole("button", { name, exact: true }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Antrian kerja Accounting" })).toBeVisible();
});

test("palette D, simulation disclosure, and working search shortcut", async ({ page }) => {
  const colors = await page.locator("html").evaluate((node) => {
    const style = getComputedStyle(node);
    return ["--sidebar", "--primary", "--chart-1", "--background"].map((token) => style.getPropertyValue(token).trim().toLowerCase());
  });
  expect(colors).toEqual(["#292730", "#705080", "#347c88", "#f7f5f8"]);
  await expect(page.getByText("DATA SIMULASI", { exact: true })).toBeVisible();
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("textbox", { name: "Cari pekerjaan", exact: true })).toBeFocused();
    await expect(page.getByRole("textbox", { name: "Cari pekerjaan", exact: true })).toHaveAttribute("data-slot", "input");
  await page.getByRole("textbox", { name: "Cari pekerjaan", exact: true }).fill("tidak-ada-pekerjaan");
  await expect(page.getByText("Tidak ada pekerjaan sesuai pencarian.")).toBeVisible();
});

test("task filter and empty state", async ({ page }) => {
  await navigate(page, "Tugas & workload");
  await page.getByRole("combobox", { name: "Filter status" }).selectOption("Waiting / Blocked");
  await expect(page.locator(".priority-table tbody tr")).toHaveCount(1);
  await expect(page.locator(".priority-table")).toContainText("Validasi mapping equipment");
  await page.getByRole("combobox", { name: "Filter status" }).selectOption("Completed");
  await expect(page.getByText("Tidak ada pekerjaan sesuai pencarian.")).toBeVisible();
});

test("asset exception filter, details, and empty search", async ({ page }) => {
  await navigate(page, "Asset 360");
  const filter = page.getByRole("button", { name: "Pengecualian", exact: true });
  await filter.click();
  await expect(filter).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".data-table tbody tr")).toHaveCount(1);
  const detail = page.getByRole("button", { name: "Lihat detail AS-100748" });
  await detail.click();
  await expect(page.getByRole("dialog")).toHaveAttribute("data-slot", "dialog-content");
    await expect(page.getByRole("dialog")).toContainText("Packaging Line Sensor");
  await expect(page.getByRole("dialog")).toContainText("EQ-450812");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(detail).toBeFocused();
  await page.getByRole("textbox", { name: "Cari aset", exact: true }).fill("tidak-ada-aset");
  await expect(page.getByText("Tidak ada aset sesuai pencarian atau filter.")).toBeVisible();
});

test("Aceternity period selection preserves keyboard behavior", async ({ page }) => {
  await navigate(page, "Cost analytics");
  await page.getByRole("tab", { name: "YoY", exact: true }).click();
  await expect(page.getByRole("tab", { name: "YoY", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "YTD", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { name: "Akumulasi biaya" })).toBeVisible();
  await page.keyboard.press("Home");
  await expect(page.getByRole("tab", { name: "MoM", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: "YTD", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { name: "Akumulasi biaya" })).toBeVisible();
  await page.getByRole("combobox", { name: "Periode analisis" }).selectOption({ label: "September 2026" });
  await expect(page.getByRole("heading", { name: "Rincian periode belum tersedia" })).toBeVisible();
});

test("task modal keeps input after a failed save and announces the error", async ({ page }) => {
  await page.route("**/api/tasks", (route) => route.fulfill({ status: 401, contentType: "application/json", body: JSON.stringify({ error: "Masuk ke workspace agar pekerjaan tersimpan." }) }));
  await page.getByRole("button", { name: "Buat pekerjaan", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveAttribute("data-slot", "dialog-content");
  await expect.poll(() => dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  await expect(dialog.getByRole("textbox", { name: "Nama pekerjaan" })).toHaveAttribute("data-slot", "input");
  await expect(dialog.getByRole("button", { name: "Simpan pekerjaan", exact: true })).toBeDisabled();
  await dialog.getByRole("textbox", { name: "Nama pekerjaan" }).fill("Review akun simulasi");
  await dialog.getByRole("button", { name: "Simpan pekerjaan", exact: true }).click();
  await expect(dialog.getByRole("alert")).toContainText("Masuk ke workspace");
  await expect(dialog.getByRole("textbox", { name: "Nama pekerjaan" })).toHaveValue("Review akun simulasi");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Buat pekerjaan", exact: true })).toBeFocused();
});

test("a pending task stays in the dialog until the request succeeds", async ({ page }) => {
  let finishRequest!: () => void;
  const pending = new Promise<void>((resolve) => { finishRequest = resolve; });
  await page.route("**/api/tasks", async (route) => {
    await pending;
    await route.fulfill({ json: { task: { id: "test-12345678" } } });
  });
  const trigger = page.getByRole("button", { name: "Buat pekerjaan", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  const taskName = "Rekonsiliasi snapshot uji";
  await dialog.getByRole("textbox", { name: "Nama pekerjaan" }).fill(taskName);
  await dialog.getByRole("button", { name: "Simpan pekerjaan", exact: true }).click();
  try {
    const submit = dialog.getByRole("button", { name: "Menyimpan…" });
    await expect(submit).toBeDisabled();
    await expect(submit).toHaveAttribute("aria-busy", "true");
    await expect(dialog.getByRole("button", { name: "Batal" })).toBeDisabled();
    await expect(page.locator(".toast-viewport")).toHaveCount(0);
  } finally {
    finishRequest();
  }
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator(".priority-table").getByText(taskName, { exact: true })).toBeVisible();
  const toast = page.locator(".toast-viewport");
  await expect(toast.getByRole("status")).toContainText("Pekerjaan tersimpan");
  await toast.getByRole("button", { name: "Tutup notifikasi" }).click();
  await expect(toast).toHaveCount(0);
});

test("manual notice carousel and dismiss", async ({ page }) => {
  const carousel = page.getByRole("region", { name: "Perhatian workspace" });
  await expect(carousel.getByRole("group", { name: "1 dari 2" })).toContainText("Oktober 2026");
  await expect(carousel.getByRole("button", { name: "Tinjau aset" })).toHaveCount(0);
  await page.getByRole("button", { name: "Perhatian berikutnya" }).click();
  await expect(carousel.getByRole("group", { name: "2 dari 2" })).toContainText("7 equipment");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Perhatian sebelumnya" }).click();
  await expect(carousel.getByRole("group", { name: "1 dari 2" })).toBeVisible();
  await page.getByRole("button", { name: "Tutup perhatian", exact: true }).click();
  await expect(carousel).toHaveCount(0);
});

test("informational toast timeout pauses for keyboard focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install();
  const notification = page.getByRole("button", { name: "Notifikasi", exact: true });
  await notification.click();
  const toast = page.locator(".toast-viewport");
  await expect(toast.getByRole("status")).toContainText("Belum ada notifikasi baru.");
  await toast.getByRole("button", { name: "Tutup notifikasi" }).focus();
  await page.clock.fastForward(6500);
  await expect(toast).toBeVisible();
  await notification.focus();
  await page.clock.fastForward(6500);
  await expect(toast).toHaveCount(0);
});

test("import illustration loads locally and upload is gated", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await navigate(page, "Impor data");
  const illustration = page.getByRole("img", { name: "Ilustrasi alur data tugas, biaya, dan pemetaan aset" });
  await expect(illustration).toBeVisible();
  await expect.poll(() => illustration.locator("svg path").count()).toBeGreaterThan(12);
  await expect(page.getByRole("button", { name: "Tampilkan pratinjau" })).toBeDisabled();
  await navigate(page, "Cost analytics");
  await expect(page.locator("lord-icon")).toHaveAttribute("src", "/lordicon-coins.json");
  await expect.poll(() => page.locator("lord-icon").evaluate((element) => Boolean(element.shadowRoot?.querySelector("svg, canvas")))).toBe(true);
  expect(errors).toEqual([]);
});

test("login uses shared shadcn inputs and submit button", async ({ page }) => {
  await page.goto("/login?error=credentials");
  const email = page.getByRole("textbox", { name: "Email kerja" });
  await expect(email).toHaveAttribute("data-slot", "input");
  await expect(email).toHaveAttribute("type", "email");
  await expect(page.getByLabel("Kata sandi", { exact: true })).toHaveAttribute("data-slot", "input");
  await expect(page.getByLabel("Kata sandi", { exact: true })).toHaveAttribute("type", "password");
  await expect(page.getByRole("button", { name: "Masuk", exact: true })).toHaveAttribute("data-slot", "button");
  await expect(page.getByText("Email atau kata sandi tidak cocok, atau akun sedang nonaktif.")).toBeVisible();
  await email.fill("accounting@example.com");
  await page.getByLabel("Kata sandi", { exact: true }).fill("test-password");
  await expect(email).toHaveValue("accounting@example.com");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  await page.getByRole("link", { name: "Kembali ke pratinjau" }).click();
  await expect(page.getByRole("heading", { name: "Antrian kerja Accounting" })).toBeVisible();
});

test("all workspace modules share shadcn primitives and Aceternity surfaces", async ({ page }) => {
  test.setTimeout(60_000);
  const modules = [
    ["Command center", "Antrian kerja Accounting"],
    ["Tugas & workload", "Pekerjaan tim"],
    ["Asset 360", "Mapping aset & equipment"],
    ["Cost analytics", "Analisis biaya"],
    ["Impor data", "Impor data SAP"],
    ["Tim & akses", "Tim Accounting"],
  ];
  for (const [name, heading] of modules) {
    await navigate(page, name);
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    await expect(page.locator(".page-content [data-slot=card]").first()).toHaveAttribute("data-aceternity", "card-hover-effect");
    await expect(page.locator(".page-content button:not([data-slot]), .page-content input:not([data-slot]), .page-content select:not([data-slot]), .page-content table:not([data-slot])")).toHaveCount(0);
    const original = page.viewportSize()!;
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), { message: `overflow in ${name} at ${width}px` }).toBe(false);
            if (name === "Impor data" && width <= 900) {
              await expect.poll(() => page.locator(".import-layout > [data-slot=card]").first().evaluate((node) => node.getBoundingClientRect().width)).toBeGreaterThan(width * 0.7);
            }
    }
    await page.setViewportSize(original);
  }
  const capacity = page.getByRole("progressbar", { name: "Kapasitas Nadia Putri", exact: true }).first();
  await expect(capacity).toHaveAttribute("aria-valuenow", "88");
  await expect(capacity).toHaveAttribute("aria-valuemax", "100");
});

test("Aceternity file upload validates, removes, and preserves input on failed preview", async ({ page }) => {
  await navigate(page, "Impor data");
  const upload = page.locator("[data-aceternity=file-upload]");
  const input = upload.locator("input[type=file]");
  const preview = page.getByRole("button", { name: "Tampilkan pratinjau" });
  await input.setInputFiles({ name: "catatan.txt", mimeType: "text/plain", buffer: Buffer.from("not a snapshot") });
  await expect(upload.getByRole("alert")).toContainText("Format tidak didukung");
  await expect(preview).toBeDisabled();
  await input.setInputFiles({ name: "snapshot.csv", mimeType: "text/csv", buffer: Buffer.from("account,amount\n6102,100\n") });
  await expect(upload).toContainText("snapshot.csv");
  await expect(upload.getByRole("alert")).toHaveCount(0);
  await expect(preview).toBeEnabled();
  await page.route("**/api/imports/preview", (route) => route.fulfill({ status: 401, contentType: "application/json", body: JSON.stringify({ error: "Masuk untuk meninjau snapshot." }) }));
  await preview.click();
  const errorToast = page.locator(".toast-viewport").getByRole("alert");
  await expect(errorToast).toContainText("Masuk untuk meninjau snapshot.");
  await page.clock.fastForward(6500);
  await expect(errorToast).toBeVisible();
  await expect(upload).toContainText("snapshot.csv");
  await upload.getByRole("button", { name: "Hapus berkas" }).click();
  await expect(preview).toBeDisabled();
  await expect(upload).not.toContainText("snapshot.csv");
  await upload.locator(".dropzone").evaluate((node) => {
    const transfer = new DataTransfer();
    transfer.items.add(new File(["account,amount\n6102,200"], "dropped.csv", { type: "text/csv" }));
    node.dispatchEvent(new DragEvent("drop", { bubbles: true, cancelable: true, dataTransfer: transfer }));
  });
  await expect(upload).toContainText("dropped.csv");
  await expect(preview).toBeEnabled();
});

test("chart data disclosures remain keyboard accessible", async ({ page }) => {
  await navigate(page, "Cost analytics");
  const trigger = page.getByRole("button", { name: "Lihat angka grafik" });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("table", { name: "Data simulasi · Rp miliar", exact: true })).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("responsive widths and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), { message: `document overflow at ${width}px` }).toBe(false);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".task-queue-panel tbody tr").first()).toBeInViewport();
  await page.getByRole("button", { name: "Buka navigasi" }).click();
  await expect(page.getByRole("dialog", { name: "Menu workspace" })).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Buka tim dan akses" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Buka navigasi" })).toBeFocused();
});
