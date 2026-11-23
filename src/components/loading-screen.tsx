"use client";

import { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BrandMark } from "@/components/brand-mark";

export function LoadingScreen({ label = "Menyiapkan workspace…", form = false }: { label?: string; form?: boolean }) {
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void import("gsap").then(({ gsap }) => {
      if (disposed || !mark.current) return;
      const media = gsap.matchMedia(mark.current);
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } })
          .fromTo(".loading-trace", { xPercent: -110 }, { xPercent: 310, duration: 1.1 }, 0)
          .fromTo(".loading-mark circle", { opacity: 0.45 }, { opacity: 1, duration: 0.55 }, 0)
          .to(".loading-mark circle", { opacity: 0.45, duration: 0.55 }, 0.55);
      });
      cleanup = () => media.revert();
    }).catch(() => { /* A static loading indicator remains available. */ });
    return () => { disposed = true; cleanup?.(); };
  }, []);

  return (
    <div className="page-loading" role="status" aria-live="polite" aria-atomic="true">
      <div className="loading-composition" ref={mark}>
        <div className="loading-mark" aria-hidden="true"><BrandMark /></div>
        <div className="loading-track" aria-hidden="true"><i className="loading-trace" /></div>
        <span>{label}</span>
        <div className={form ? "loading-fields" : "loading-rows"} aria-hidden="true">
          {Array.from({ length: form ? 2 : 4 }, (_, i) => <Skeleton key={i} className="loading-placeholder" />)}
        </div>
      </div>
    </div>
  );
}
