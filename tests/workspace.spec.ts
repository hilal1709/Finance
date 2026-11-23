import { expect, test, type Page } from "@playwright/test";

async function navigate(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Buka navigasi" });
  if (await menu.isVisible()) await menu.click();
  await page.getByRole("navigation", { name: "Navigasi utama" }).getByRole("button", { name, exact: true }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Antrean kerja Accounting" })).toBeVisible();
});

test("Ledger Editorial palette, simulation disclosure, and working search shortcut", async ({ page }) => {
  const colors = await page.locator("html").evaluate((node) => {
    const style = getComputedStyle(node);
    return ["--sidebar", "--primary", "--border", "--background", "--warning"].map((token) => style.getPropertyValue(token).trim().toLowerCase());
  });
  expect(colors).toEqual(["#393e41", "#44bba4", "#d3d0cb", "#e7e5df", "#e7bb41"]);
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
  await expect(page.getByRole("dialog")).toHaveAttribute("data-slot", "sheet-content");
    await expect(page.getByRole("dialog")).toContainText("Packaging Line Sensor");
  await expect(page.getByRole("dialog")).toContainText("EQ-450812");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(detail).toBeFocused();
  await page.getByRole("textbox", { name: "Cari aset", exact: true }).fill("tidak-ada-aset");
  await expect(page.getByText("Tidak ada aset sesuai pencarian atau filter.")).toBeVisible();
  const banner = page.getByRole("note").filter({ hasText: "Master SAP tetap sumber utama" });
  await expect(banner.locator('svg[data-icon="warning"]')).toBeVisible();
  await banner.getByRole("button", { name: "Tutup banner" }).click();
  await expect(banner).toHaveCount(0);
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
  await Promise.all([
    page.waitForResponse((response) => response.url().endsWith("/api/tasks") && response.status() === 401),
    dialog.getByRole("button", { name: "Simpan pekerjaan", exact: true }).click(),
  ]);
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
    await expect(submit.locator('svg[data-icon="spinner"]')).toBeVisible();
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
  const illustration = page.getByRole("img", { name: "Kolom pada berkas sumber dipasangkan dengan kolom tujuan" });
  await illustration.scrollIntoViewIfNeeded();
  await expect(illustration).toBeVisible();
  await expect.poll(() => illustration.locator("svg path").count()).toBeGreaterThan(12);
  await expect(page.getByRole("button", { name: "Tampilkan pratinjau" })).toBeDisabled();
  await navigate(page, "Cost analytics");
  await expect(page.locator('.cost-icon svg[data-icon="chart"][data-icon-library="potlab"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test("Potlab icons respond to hover and keyboard focus without visible credits", async ({ page, isMobile }) => {
  await expect(page.getByText(/ikon animasi oleh|potlab icons/i)).toHaveCount(0);
  await expect(page.locator("lord-icon")).toHaveCount(0);
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/login");
    await expect(page.getByText(/ikon animasi oleh|potlab icons/i)).toHaveCount(0);
    await expect(page.locator("lord-icon")).toHaveCount(0);
    const submit = page.getByRole("button", { name: "Masuk", exact: true });
    const icon = submit.locator('svg[data-icon="arrow"]');
    const transform = reducedMotion === "reduce" ? "none" : "matrix(1, 0, 0, 1, 3, 0)";
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute("data-icon-library", "potlab");
    await expect(icon).toHaveAttribute("aria-hidden", "true");
    if (!isMobile) {
      await submit.hover();
      await expect(icon).toHaveCSS("transform", transform);
      await page.getByLabel("Email kerja").hover();
    }
    await page.getByLabel("Kata sandi", { exact: true }).focus();
    await page.keyboard.press("Tab");
    await expect(submit).toBeFocused();
    await expect(icon).toHaveCSS("transform", transform);
    await expect(icon.locator(":scope > :last-child")).toHaveCSS("animation-name", reducedMotion === "reduce" ? "none" : "icon-detail-arrow");
    if (reducedMotion === "no-preference") {
      await expect(icon.locator(":scope > :last-child")).toHaveCSS("animation-iteration-count", "infinite");
    }
  }
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
  await expect(page.getByRole("heading", { name: "Antrean kerja Accounting" })).toBeVisible();
});

test("all workspace modules share shadcn primitives and Aceternity surfaces", async ({ page }) => {
  test.setTimeout(60_000);
  const modules = [
    ["Command center", "Antrean kerja Accounting"],
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
    await expect(page.locator("svg.ui-icon:not([data-icon-library=potlab])")).toHaveCount(0);
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
  await expect(page.getByRole("progressbar", { name: "Kapasitas Rizky Ananda", exact: true })).toHaveAttribute("aria-valuetext", "31 dari 40 jam · 78%");
});

test("Aceternity file upload validates, removes, and preserves input on failed preview", async ({ page }) => {
  await navigate(page, "Impor data");
  const upload = page.locator("[data-aceternity=file-upload]");
  const input = upload.locator("input[type=file]");
  await expect(upload.locator(".file-upload-tile")).toHaveCSS("display", "grid");
  const preview = page.getByRole("button", { name: "Tampilkan pratinjau" });
  await input.setInputFiles({ name: "catatan.txt", mimeType: "text/plain", buffer: Buffer.from("not a snapshot") });
  await expect(upload.getByRole("alert")).toContainText("Format tidak didukung");
  await expect(preview).toBeDisabled();
  await input.setInputFiles({ name: "snapshot.csv", mimeType: "text/csv", buffer: Buffer.from("account,amount\n6102,100\n") });
  await expect(upload).toContainText("snapshot.csv");
  await expect(upload.locator(".file-upload-tile")).toHaveCSS("display", "grid");
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

test("Ledger Editorial runs the four motion libraries on every page", async ({ page }) => {
  test.setTimeout(100_000);
  const surfaces = [
    ["Command center", "Antrean kerja Accounting", "Perhatian workspace", "Perhatian berikutnya"],
    ["Tugas & workload", "Pekerjaan tim", "Beban per PIC", "Panel berikutnya"],
    ["Asset 360", "Mapping aset & equipment", "Status pemetaan", "Panel berikutnya"],
    ["Cost analytics", "Analisis biaya", "Panduan perbandingan", "Panel berikutnya"],
    ["Impor data", "Impor data SAP", "Panduan impor", "Panel berikutnya"],
    ["Tim & akses", "Tim Accounting", "Peran & akses", "Panel berikutnya"],
    ["Login", "Masuk ke workspace", "Pratinjau workspace", "Panel berikutnya"],
  ] as const;
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  for (const [route, heading, title, next] of surfaces) {
    if (route === "Login") await page.goto("/login");
    else await navigate(page, route);
    const surface = page.locator("[data-studio-page]").filter({ has: page.getByRole("heading", { name: heading, exact: true }) });
    await expect(surface).toHaveAttribute("data-entry-animated", "true");
    const reveal = surface.locator('[data-aos="studio-reveal"]');
    await expect(reveal).toBeVisible();
    await reveal.scrollIntoViewIfNeeded();
    await expect(reveal).toHaveClass(/\baos-animate\b/);
    const carousel = surface.getByRole("region", { name: title });
    await carousel.getByRole("button", { name: next }).click();
    await expect(carousel.getByRole("group", { name: /^2 dari/ })).toBeVisible();
    await expect(surface).toHaveAttribute("data-feedback-animated", "true");
    if (route === "Cost analytics") await expect(surface.getByRole("tab", { name: "YoY" })).toHaveAttribute("aria-selected", "true");
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  const surface = page.locator("[data-studio-page]");
  await expect(surface).not.toHaveAttribute("data-entry-animated", "true");
  const carousel = surface.getByRole("region", { name: "Pratinjau workspace" });
  await expect.poll(() => carousel.locator(".swiper").evaluate((node) => (node as HTMLElement & { swiper?: { params: { speed: number } } }).swiper?.params.speed)).toBe(0);
  await carousel.getByRole("button", { name: "Panel berikutnya" }).click();
  await expect(carousel.getByRole("group", { name: "3 dari 3" })).toBeVisible();
  await expect(surface).not.toHaveAttribute("data-feedback-animated", "true");
  for (const width of [768, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(page.getByRole("button", { name: "Masuk", exact: true })).toBeInViewport();
    await expect(page.getByRole("textbox", { name: "Email kerja" })).toBeInViewport();
    await expect.poll(() => page.locator(".studio-login .accounting-illustration").evaluate((node) => node.getBoundingClientRect().width)).toBeLessThan(width);
  }
  await page.goto("/");
  await navigate(page, "Tugas & workload");
  await navigate(page, "Command center");
  await expect(page.locator("[data-studio-page]")).toHaveCount(1);
  expect(errors).toEqual([]);
});

test("the overview carousel can be swiped without auto-advancing", async ({ page, isMobile }) => {
  const carousel = page.getByRole("region", { name: "Perhatian workspace" });
  const slides = carousel.locator(".swiper");
  await expect(slides).toHaveClass(/swiper-initialized/);
  await slides.scrollIntoViewIfNeeded();
  const box = (await slides.boundingBox())!;
  const start = { x: box.x + box.width * 0.8, y: box.y + 22 };
  const end = { x: box.x + box.width * 0.17, y: start.y };
  if (isMobile) {
    const touch = await page.context().newCDPSession(page);
    await touch.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [start] });
    for (let step = 1; step <= 5; step++) {
      const x = start.x + (end.x - start.x) * step / 5;
      await touch.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: start.y }] });
    }
    await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await touch.detach();
  } else {
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(end.x, end.y, { steps: 10 });
    await page.mouse.up();
  }
  await expect(carousel.getByRole("group", { name: "2 dari 2" })).toBeVisible();
  await page.clock.fastForward(6000);
  await expect(carousel.getByRole("group", { name: "2 dari 2" })).toBeVisible();
});

test("import shows each stage and confirms a validated preview", async ({ page }) => {
  await page.route("**/api/imports/preview", (route) => route.fulfill({
    json: { headers: ["account"], preview: [{ account: "6102" }], rowCount: 1, validCount: 1, requiredFields: ["account"], missing: ["account"], suggestedMapping: {}, type: "FINANCIAL_LINES" },
  }));
  await page.route("**/api/imports/commit", async (route) => {
    expect(route.request().postData()).toContain('{"account":"account"}');
    await route.fulfill({ json: { validCount: 1 } });
  });
  await navigate(page, "Impor data");
  await expect(page.locator(".studio-steps [aria-current]")).toContainText("Unggah berkas");
  await page.locator('input[type="file"]').setInputFiles({ name: "snapshot.csv", mimeType: "text/csv", buffer: Buffer.from("account\n6102\n") });
  await page.getByRole("button", { name: "Tampilkan pratinjau" }).click();
  const confirm = page.getByRole("button", { name: "Konfirmasi impor", exact: true });
  await expect(confirm).toBeDisabled();
  await expect(page.locator(".studio-steps [aria-current]")).toContainText("Petakan kolom");
  await page.getByRole("combobox", { name: "account", exact: true }).selectOption("account");
  await expect(page.locator(".studio-steps [aria-current]")).toContainText("Tinjau pratinjau");
  await confirm.click();
  await expect(page.locator(".toast-viewport").getByRole("status")).toContainText("1 baris valid");
  await expect(page.locator(".studio-steps [aria-current]")).toContainText("Unggah berkas");
});

test("period and filter feedback respect the motion preference", async ({ page }) => {
  await navigate(page, "Cost analytics");
  const figure = page.locator(".studio-cost-figures dd").first();
  await page.getByRole("tab", { name: "YoY" }).click();
  await expect(figure).toHaveCSS("animation-name", "ledger-entry");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("tab", { name: "YTD" }).click();
  await expect(figure).toHaveCSS("animation-name", "none");
  await navigate(page, "Tugas & workload");
  await page.getByRole("combobox", { name: "Filter status" }).selectOption("Completed");
  const tray = page.locator('[data-scene="tasks"]');
  await tray.scrollIntoViewIfNeeded();
  await expect(tray.locator("svg")).toBeVisible();
});
