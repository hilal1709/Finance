"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CircleCheck, Info, X } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const variants = {
  success: { title: "Berhasil", Icon: CircleCheck },
  info: { title: "Informasi", Icon: Info },
  error: { title: "Perlu perhatian", Icon: AlertTriangle },
} as const;

export type ToastKind = keyof typeof variants;

export function WorkspaceToast({ kind, message, onDismiss }: {
  kind: ToastKind;
  message: string;
  onDismiss: () => void;
}) {
  const card = useRef<HTMLDivElement>(null);
  const remaining = useRef(6000);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const { title, Icon } = variants[kind];

  useEffect(() => {
    if (kind === "error" || hovered || focused) return;
    const started = performance.now();
    const timeout = window.setTimeout(onDismiss, remaining.current);
    return () => {
      window.clearTimeout(timeout);
      remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [kind, hovered, focused, onDismiss]);

  useEffect(() => {
    if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let revert: (() => void) | undefined;
    void import("animejs").then(({ animate }) => {
      if (disposed || !card.current) return;
      const animation = animate(card.current, {
        translateY: [8, 0],
        opacity: [0.85, 1],
        duration: 230,
        ease: "outExpo",
      });
      revert = () => { animation.revert(); };
    }).catch(() => { /* The toast remains visible without animation. */ });
    return () => { disposed = true; revert?.(); };
  }, [reducedMotion]);

  return (
    <div
      className="toast-viewport"
      ref={card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <Alert role="presentation" className={`toast-card ${kind}`}>
        <span className="toast-icon" aria-hidden="true"><Icon size={17} /></span>
        <div className="toast-copy" role={kind === "error" ? "alert" : "status"} aria-atomic="true">
          <strong>{title}</strong>
          <span>{message}</span>
        </div>
        <Button variant="ghost" size="unset" className="toast-close" aria-label="Tutup notifikasi" onClick={onDismiss}>
          <X size={16} aria-hidden="true" />
        </Button>
      </Alert>
    </div>
  );
}
