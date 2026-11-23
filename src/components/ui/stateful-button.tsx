"use client";

import type { ComponentProps, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Adapted from https://ui.aceternity.com/components/stateful-button.
// Pending state follows the real request; no optimistic success checkmark.
export function StatefulButton({ loading = false, pendingLabel, children, disabled, ...props }: ComponentProps<typeof Button> & { loading?: boolean; pendingLabel?: ReactNode }) {
  const { pending } = useFormStatus();
  const reducedMotion = useReducedMotion();
  const busy = loading || pending;

  return <Button {...props} disabled={disabled || busy} aria-busy={busy} data-aceternity="stateful-button"
    render={<motion.button whileTap={reducedMotion ? undefined : { scale: 0.99 }} />}>
    <AnimatePresence initial={false}>
      {busy && <motion.span key="loader" aria-hidden="true" initial={reducedMotion ? false : { width: 0, opacity: 0 }}
        animate={{ width: 16, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.15 }}>
        <LoaderCircle size={16} className="motion-safe:animate-spin" />
      </motion.span>}
    </AnimatePresence>
    {busy && pendingLabel ? pendingLabel : children}
  </Button>;
}
