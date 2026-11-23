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

- Ledger Editorial memakai Gunmetal #393e41, Dust Grey #d3d0cb, Alabaster Grey #e7e5df, Ocean Mist #44bba4, dan Tuscan Sun #e7bb41. Token, pola komponen, dan referensi 21st.dev serta HorizonX tercatat di [DESIGN.md](./DESIGN.md).
- Semua enam modul workspace dan login memakai fondasi shadcn/ui `base-nova` (Base UI) di `src/components/ui/`: Button, Input, Label, NativeSelect, Card, Badge, Table, Avatar, Progress, Alert, Skeleton, Collapsible, Tabs, Dialog, dan Sheet. Komponen tetap mengikuti token workspace; tabel mempertahankan struktur HTML semantik dan scroll lokal.
- Aceternity diterapkan sebagai adaptasi lokal di seluruh pengalaman: Card Hover Effect pada permukaan Card, Sidebar dengan highlight navigasi dan gerak label, Carousel pengumuman manual, File Upload dengan tile shared-layout, Tabs MoM/YoY/YTD, dan Stateful Button untuk penyimpanan pekerjaan serta login. Sumber resmi dicantumkan di komponen; animasi menghormati reduced motion. Navigasi mobile memakai shadcn Sheet untuk fokus dan Escape.
- File Upload mendukung pilihan keyboard dan drag/drop satu file CSV/XLSX/XLS maksimal 20 MB, pesan penolakan, penghapusan pilihan, dan mempertahankan berkas ketika pratinjau gagal. Stateful Button mengikuti status request/form yang sebenarnya, tanpa menampilkan tanda berhasil sebelum server mengonfirmasi.
- Registry `@aceternity` sudah dikonfigurasi di `components.json`; komponen tambahan dapat dipasang melalui `npx shadcn add @aceternity/<nama-komponen>`. Jangan menimpa adaptasi lokal tanpa meninjau aksesibilitas dan token desain.
- GSAP menggambar garis pada pergantian modul dan menggerakkan indikator loading. Anime.js memberi umpan balik pada kontrol dan toast, AOS memperkenalkan panel pendukung, dan Swiper menjalankan carousel manual. Lima ilustrasi Lottie lokal menjelaskan alur kerja.
- Ikon antarmuka memakai SVG Potlab yang disimpan lokal dan mengikuti warna tema, hover, fokus keyboard, serta reduced motion. [Potlab Icons oleh Suresh](https://www.potlabicons.com/)
- Pencarian mendukung Ctrl/Cmd+K. Tugas menjadi daftar ringkas pada layar kecil; drawer navigasi mendukung Escape, focus trap, dan penguncian scroll.
- Detail aset dan filter bekerja pada data contoh. Membuat tugas atau commit impor tetap memerlukan sesi pengguna; pratinjau tidak menyimulasikan keberhasilan penyimpanan.
- Skema dan migration berada di `prisma/`; generated Prisma Client berada di `src/generated/prisma/`.
- Peta kode Graphify: `graphify-out/GRAPH_REPORT.md`, `graphify-out/graph.html`, dan `graphify-out/graph.json`.
- Eksplorasi logo (menunggu pilihan arah): `public/brand-exploration/concepts.png` dan file SVG pada folder yang sama.

## Validasi UI

- `npm run build` memeriksa build produksi dan TypeScript.
- `npm run test:e2e -- --workers 2` menjalankan skenario Playwright desktop dan mobile terhadap build produksi. Cakupannya meliputi palet, pencarian, filter, fokus keyboard, modal, toast, login, carousel, ilustrasi, impor, disclosure data grafik, dan responsivitas modul pada 320–1440 px.
- Pengujian memakai Google Chrome yang terpasang (`channel: chrome`) dan menjalankan server sementara di port 3100. Jalankan `npm run build` sebelum pengujian. Request penyimpanan dalam pengujian error di-mock; tes tidak menulis ke database.

Semua angka contoh ditandai sebagai ilustrasi dan tidak berasal dari data perusahaan.
