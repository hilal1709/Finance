import { X } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function WorkspaceBanner({ title, children, tone = "info", onDismiss }: {
  title: string;
  children: React.ReactNode;
  tone?: "info" | "warning";
  onDismiss?: () => void;
}) {
  return (
    <Alert className={`banner workspace-banner ${tone}`} role="note">
      <div><strong>{title}</strong><span>{children}</span></div>
      {onDismiss && (
        <Button variant="ghost" size="icon" className="banner-close" aria-label="Tutup banner" onClick={onDismiss}>
          <X size={16} aria-hidden="true" />
        </Button>
      )}
    </Alert>
  );
}
