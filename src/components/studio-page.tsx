"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ScrollMotion } from "@/components/motion-runtime";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function StudioPage({ className = "", children }: { className?: string; children: ReactNode }) {
  const page = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const surface = page.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!surface || reducedMotion || media.matches) return;

    let disposed = false;
    let stopEntry: (() => void) | undefined;
    const stopFeedback = new Map<HTMLElement, () => void>();
    const heading = surface.querySelector<HTMLElement>("[data-studio-entry]");
    const trace = heading?.querySelector<SVGPathElement>(".studio-trace path");
    const endpoint = heading?.querySelector<SVGCircleElement>(".studio-trace circle:last-child");
    if (trace && endpoint) {
      void import("gsap").then(({ gsap }) => {
        if (disposed || media.matches) return;
        const scope = gsap.context(() => {
          gsap.timeline({
            onComplete: () => { surface.dataset.entryAnimated = "true"; },
          })
            .fromTo(trace, { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.46, ease: "power2.inOut" })
            .fromTo(endpoint, { opacity: 0.2, scale: 0.65 }, {
              opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.18, ease: "power2.out",
            }, "-=0.08");
        }, surface);
        stopEntry = () => scope.revert();
      }).catch(() => { /* Keep server-rendered content available. */ });
    }

    async function feedback(event: Event) {
      const target = event.target instanceof HTMLElement || event.target instanceof SVGElement
        ? event.target.closest<HTMLElement>(event.type === "change"
          ? "[data-slot='native-select'], input[type='file']"
          : "button[data-slot]:not([disabled]), [data-studio-feedback]")
        : null;
      if (!target || !surface?.contains(target)) return;
      try {
        const { animate } = await import("animejs");
        if (disposed || media.matches || !target.isConnected) return;
        stopFeedback.get(target)?.();
        const animation = animate(target, {
          filter: ["brightness(.91)", "brightness(1)"],
          duration: 180,
          ease: "outCubic",
          onComplete: () => {
            animation.revert();
            stopFeedback.delete(target);
            surface.dataset.feedbackAnimated = "true";
          },
        });
        stopFeedback.set(target, () => { animation.revert(); });
      } catch { /* Controls still work when the animation chunk is unavailable. */ }
    }

    surface.addEventListener("click", feedback);
    surface.addEventListener("change", feedback);
    return () => {
      disposed = true;
      stopEntry?.();
      stopFeedback.forEach((stop) => stop());
      surface.removeEventListener("click", feedback);
      surface.removeEventListener("change", feedback);
      delete surface.dataset.entryAnimated;
      delete surface.dataset.feedbackAnimated;
    };
  }, [reducedMotion]);

  return <div ref={page} className={`studio-page ${className}`} data-studio-page><ScrollMotion />{children}</div>;
}

export function StudioTrace() {
  return (
    <svg className="studio-trace" viewBox="0 0 118 20" fill="none" aria-hidden="true">
      <path d="M3 16h38l11-11h63" pathLength="100" />
      <circle cx="3" cy="16" r="2" />
      <circle cx="115" cy="5" r="2.4" />
    </svg>
  );
}

export function StudioHeading({ title, description, children }: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-heading studio-heading" data-studio-entry>
      <div className="studio-heading-copy"><h1>{title}</h1><p>{description}</p></div>
      {children && <div className="heading-actions">{children}</div>}
      <StudioTrace />
    </header>
  );
}
