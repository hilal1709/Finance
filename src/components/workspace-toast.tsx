"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const variants = {
  success: { title: "Berhasil", icon: "success" },
  info: { title: "Informasi", icon: "info" },
  error: { title: "Perlu perhatian", icon: "warning" },
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
  const { title, icon } = variants[kind];

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
        translateY: [10, 0],
        opacity: [0.7, 1],
        duration: 220,
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
        <span className="toast-icon" aria-hidden="true"><Icon name={icon} size={19} /></span>
        <div className="toast-copy" role={kind === "error" ? "alert" : "status"} aria-atomic="true">
          <strong>{title}</strong>
          <span>{message}</span>
        </div>
        <Button variant="ghost" size="unset" className="toast-close" aria-label="Tutup notifikasi" onClick={onDismiss}>
          <Icon name="close" size={16} />
        </Button>
      </Alert>
    </div>
  );
}
