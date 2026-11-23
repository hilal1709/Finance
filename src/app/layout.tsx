import type { Metadata } from "next";
import "./globals.css";
import "./studio.css";

export const metadata: Metadata = {
  title: "Digital Accounting | Accounting Operations",
  description: "Ruang kerja terpadu untuk operasional Accounting, pengelolaan aset, dan analisis biaya.",
  manifest: "/ledger/site.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "any" }],
    apple: "/ledger/icon-180.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" className="h-full antialiased"><body className="min-h-full">{children}</body></html>;
}
