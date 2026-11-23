import { Icon } from "@/components/ui/icon";
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
      <span className="banner-icon" aria-hidden="true"><Icon name={tone === "warning" ? "warning" : "info"} size={20} /></span>
      <div className="banner-copy"><strong>{title}</strong><span>{children}</span></div>
      {onDismiss && (
        <Button variant="ghost" size="icon" className="banner-close" aria-label="Tutup banner" onClick={onDismiss}>
          <Icon name="close" size={16} />
        </Button>
      )}
    </Alert>
  );
}
