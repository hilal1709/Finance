"use client";

import { useEffect, useRef } from "react";
import { BrandMark } from "@/components/brand-mark";

export function LoadingScreen({ label = "Menyiapkan workspace…" }: { label?: string }) {
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void import("gsap").then(({ gsap }) => {
      if (disposed || !mark.current) return;
      const media = gsap.matchMedia(mark.current);
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".loading-trace", { xPercent: -100 }, {
          xPercent: 280,
          duration: 1.15,
          ease: "power2.inOut",
          repeat: -1,
        });
        gsap.to("circle", { opacity: 0.45, duration: 0.575, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });
      cleanup = () => media.revert();
    }).catch(() => { /* A static loading indicator remains available. */ });
    return () => { disposed = true; cleanup?.(); };
  }, []);

  return (
    <div className="page-loading" role="status" aria-live="polite" aria-atomic="true">
      <div className="loading-composition" ref={mark}>
        <div className="loading-mark" aria-hidden="true"><BrandMark accentColor="#347C88" /></div>
        <div className="loading-track" aria-hidden="true"><i className="loading-trace" /></div>
        <span>{label}</span>
      </div>
    </div>
  );
}
