"use client";

import { useState, type ComponentProps } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// Aceternity Card Hover Effect, adapted to existing shadcn Card surfaces.
// https://ui.aceternity.com/components/card-hover-effect
// A full-border highlight also follows keyboard focus; content never moves.
export function AceternitySurface({ as: Component = "div", className, children, onMouseEnter, onMouseLeave, onFocusCapture, onBlurCapture, ...props }: ComponentProps<"div"> & { as?: "div" | "section" | "article" }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <Component
      {...props}
      data-aceternity="card-hover-effect"
      className={cn("aceternity-surface", className)}
      onMouseEnter={(event) => { setHovered(true); onMouseEnter?.(event); }}
      onMouseLeave={(event) => { setHovered(false); onMouseLeave?.(event); }}
      onFocusCapture={(event) => { setFocused(true); onFocusCapture?.(event); }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); onBlurCapture?.(event); }}
    >
      {children}
      <AnimatePresence>
        {(hovered || focused) && <motion.span
          key="highlight"
          aria-hidden="true"
          className="aceternity-surface-highlight"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.15 }}
        />}
      </AnimatePresence>
    </Component>
  );
}
