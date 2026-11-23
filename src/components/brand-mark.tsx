export function BrandMark({ className = "", title = "Accounting", accentColor = "var(--primary)" }: { className?: string; title?: string; accentColor?: string }) {
  return <svg className={className} viewBox="0 0 256 256" role="img" aria-label={title} fill="none">
    <g transform="translate(-13 -19) scale(1.15)" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
      <path d="M84 58H150A46 46 0 0 1 196 104V152A46 46 0 0 1 150 198H104A44 44 0 0 1 60 154V130" />
      <circle cx="60" cy="84" r="11" fill={accentColor} stroke="none" />
    </g>
  </svg>;
}
