import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { AccountingIllustration } from "@/components/accounting-illustration";
import { StatefulButton } from "@/components/ui/stateful-button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { AceternitySurface } from "@/components/ui/aceternity-surface";
import { StudioCarousel } from "@/components/notice-carousel";
import { StudioPage, StudioTrace } from "@/components/studio-page";
import { Icon } from "@/components/ui/icon";

export const instant = false;

async function authenticate(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) redirect("/login?error=credentials");
    throw error;
  }
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="studio-auth">
      <StudioPage className="login-page studio-login">
        <AceternitySurface as="section" className="login-side" aria-labelledby="login-heading">
          <form className="login-form" action={authenticate}>
            <div className="login-brand">
              <div className="brand-mark"><BrandMark className="brand-symbol" /></div>
              <span className="brand-title">Digital Accounting</span>
            </div>
            <div className="studio-login-heading" data-studio-entry>
              <h1 id="login-heading">Masuk ke workspace</h1>
              <p>Gunakan email dan kata sandi perusahaan.</p>
              <StudioTrace />
            </div>
            {error === "credentials" && <Alert role="alert" className="login-error">Email atau kata sandi tidak cocok, atau akun sedang nonaktif.</Alert>}
            <Label className="field-label" htmlFor="email">Email kerja</Label>
            <Input className="field-control login-input" type="email" name="email" id="email" autoComplete="username" placeholder="nama@perusahaan.co.id" required />
            <Label className="field-label login-password-label" htmlFor="password">Kata sandi</Label>
            <Input className="field-control login-input" type="password" name="password" id="password" autoComplete="current-password" placeholder="Masukkan kata sandi" required />
            <StatefulButton className="action-button primary login-submit" type="submit" pendingLabel="Memeriksa akses…">
              Masuk <Icon name="arrow" size={16} />
            </StatefulButton>
            <Link href="/" className="preview-link" data-studio-feedback>Kembali ke pratinjau workspace</Link>
          </form>
        </AceternitySurface>
        <section className="login-visual" aria-labelledby="login-product-title">
          <div className="login-content">
            <h2 id="login-product-title">Dari pekerjaan harian ke bukti sumber.</h2>
            <AccountingIllustration scene="ledger" className="login-illustration" />
            <div data-aos="studio-reveal">
              <StudioCarousel title="Pratinjau workspace" slides={[
                { title: "Tugas & workload", description: "Lihat prioritas harian, tenggat, dan kapasitas penanggung jawab." },
                { title: "Asset 360", description: "Hubungkan aset SAP dengan referensi equipment dan lokasi." },
                { title: "Cost Analytics", description: "Bandingkan periode dan telusuri perubahan hingga transaksi sumber." },
              ]} />
            </div>
          </div>
        </section>
      </StudioPage>
    </main>
  );
}
