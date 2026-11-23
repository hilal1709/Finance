# Digital Accounting

Workspace operasional untuk Accounting: Team Task & Workload, Asset 360, Cost Analytics, dan impor snapshot SAP.

## Menjalankan aplikasi

1. Gunakan Node.js 20.19+ atau versi LTS yang kompatibel dengan Next.js 16.
2. Salin `.env.example` menjadi `.env.local`, lalu isi `DATABASE_URL`, `AUTH_SECRET`, dan detail bootstrap Admin.
3. Jalankan `npm install`.
4. Jalankan `npm run db:generate`.
5. Jalankan `npm run db:migrate` untuk membuat tabel di PostgreSQL.
6. Jalankan `npm run db:seed` untuk membuat/memperbarui akun Admin awal.
7. Jalankan `npm run dev`, lalu buka `http://localhost:3000`.

`/login` menggunakan email dan kata sandi Auth.js Credentials. Command center menyediakan pratinjau dengan data ilustratif. API operasional meminta sesi pengguna; perubahan di pratinjau browser tidak dianggap tersimpan ke database.

## Modul

- **Team Task & Workload** — status New, Assigned, In Progress, Waiting/Blocked, In Review, Completed; penugasan; deadline; effort; kapasitas awal 40 jam/minggu; riwayat aktivitas.
- **Asset 360** — relasi satu aset SAP ke banyak equipment, tanggal efektif mapping, dan pengecualian. Data master SAP tetap tidak diubah.
- **Cost Analytics** — filter GL/CO/MM, MoM/YoY/YTD, pendorong biaya, dan drilldown ke baris transaksi.
- **Data imports** — CSV/XLSX, pratinjau file, saran mapping kolom, validasi, dan commit terkontrol.
- **Team & access** — peran Admin, Manager, dan PIC.

## Proyek

- UI direction: Accounting Operations Ledger; palet D, Graphite & Aubergine. Navigasi `#292730`, aksi utama `#705080`, aksen grafik `#347C88`, latar `#F7F5F8`, dan permukaan putih. Referensi: 21st.dev dan horizonx.so.
- Semua enam modul workspace dan login memakai fondasi shadcn/ui `base-nova` (Base UI) di `src/components/ui/`: Button, Input, Label, NativeSelect, Card, Badge, Table, Avatar, Progress, Alert, Skeleton, Collapsible, Tabs, Dialog, dan Sheet. Komponen tetap mengikuti token workspace; tabel mempertahankan struktur HTML semantik dan scroll lokal.
- Aceternity diterapkan sebagai adaptasi lokal di seluruh pengalaman: Card Hover Effect pada permukaan Card, Sidebar dengan highlight navigasi dan gerak label, Carousel pengumuman manual, File Upload dengan tile shared-layout, Tabs MoM/YoY/YTD, dan Stateful Button untuk penyimpanan pekerjaan serta login. Sumber resmi dicantumkan di komponen; animasi menghormati reduced motion. Navigasi mobile memakai shadcn Sheet untuk fokus dan Escape.
- File Upload mendukung pilihan keyboard dan drag/drop satu file CSV/XLSX/XLS maksimal 20 MB, pesan penolakan, penghapusan pilihan, dan mempertahankan berkas ketika pratinjau gagal. Stateful Button mengikuti status request/form yang sebenarnya, tanpa menampilkan tanda berhasil sebelum server mengonfirmasi.
- Registry `@aceternity` sudah dikonfigurasi di `components.json`; komponen tambahan dapat dipasang melalui `npx shadcn add @aceternity/<nama-komponen>`. Jangan menimpa adaptasi lokal tanpa meninjau aksesibilitas dan token desain.
- Motion interaksi dikelola oleh React melalui `motion/react` dan pola Aceternity, bukan beberapa runtime DOM yang bersaing. GSAP, anime.js, AOS, dan Swiper tidak lagi dipakai pada UI workspace. Ilustrasi Lottie dan Lordicon tetap dipertahankan.
- Sumber ikon: Lordicon `298-coins-outline`, https://cdn.lordicon.com/qhviklyi.json, disimpan lokal di `public/lordicon-coins.json`; atribusi tersedia di footer.
- Pencarian mendukung Ctrl/Cmd+K. Tugas menjadi daftar ringkas pada layar kecil; drawer navigasi mendukung Escape, focus trap, dan penguncian scroll.
- Detail aset dan filter bekerja pada data contoh. Membuat tugas atau commit impor tetap memerlukan sesi pengguna; pratinjau tidak menyimulasikan keberhasilan penyimpanan.
- Skema dan migration berada di `prisma/`; generated Prisma Client berada di `src/generated/prisma/`.
- Peta kode Graphify: `graphify-out/GRAPH_REPORT.md`, `graphify-out/graph.html`, dan `graphify-out/graph.json`.
- Eksplorasi logo (menunggu pilihan arah): `public/brand-exploration/concepts.png` dan file SVG pada folder yang sama.

## Validasi UI

- `npm run build` memeriksa build produksi dan TypeScript.
- `npm run test:e2e -- --workers 2` menjalankan 24 skenario Playwright desktop/mobile terhadap build produksi: palet D, pencarian, filter, detail aset, tab keyboard, modal/error toast, login, carousel, ilustrasi, adopsi komponen bersama di semua modul, progress ARIA, unggah/drag-drop/penolakan file, disclosure data grafik, serta responsivitas setiap modul pada 320–1440 px.
- Pengujian memakai Google Chrome yang terpasang (`channel: chrome`) dan menjalankan server sementara di port 3100. Jalankan `npm run build` sebelum pengujian. Request penyimpanan dalam pengujian error di-mock; tes tidak menulis ke database.

Semua angka contoh ditandai sebagai ilustrasi dan tidak berasal dari data perusahaan.
