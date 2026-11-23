"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

let scrollMotion: typeof import("aos") | undefined;

export function ScrollMotion() {
  const reducedMotion = usePrefersReducedMotion();
  useEffect(() => {
    if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    void import("aos").then(({ default: aos }) => {
      if (disposed) return;
      if (scrollMotion) {
        scrollMotion.refreshHard();
      } else {
        // AOS has document-level listeners. Register them once for the document.
        aos.init({ once: true, offset: 24, disableMutationObserver: true });
        scrollMotion = aos;
      }
    }).catch(() => { /* Elements remain visible without AOS. */ });

    return () => {
      disposed = true;
      // Refresh after React has removed the old panel from the document.
      queueMicrotask(() => scrollMotion?.refreshHard());
    };
  }, [reducedMotion]);

  return null;
}
