"use client";

import { useEffect, useId, type ReactNode, type RefObject } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";

// Adapted from Aceternity Sidebar: https://ui.aceternity.com/components/sidebar
// Keep its responsive composition and label motion, but use shadcn Sheet for
// modal focus, Escape, scroll locking, and restoration on touch devices.
export function Sidebar({ children, open, onOpenChange, triggerRef }: { children: ReactNode; open: boolean; onOpenChange: (open: boolean) => void; triggerRef: RefObject<HTMLButtonElement | null> }) {
  const id = useId();
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => { if (desktop.matches) onOpenChange(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [onOpenChange]);

  return <>
    <aside className="sidebar sidebar-desktop" aria-label="Menu workspace" data-aceternity="sidebar">
      <LayoutGroup id={`${id}-desktop`}>{children}</LayoutGroup>
    </aside>
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent id="workspace-navigation" side="left" className="sidebar sidebar-mobile open" finalFocus={triggerRef}>
        <SheetTitle className="sr-only">Menu workspace</SheetTitle>
        <SheetDescription className="sr-only">Pilih modul Accounting. Tekan Escape untuk menutup navigasi.</SheetDescription>
        <LayoutGroup id={`${id}-mobile`}>{children}</LayoutGroup>
      </SheetContent>
    </Sheet>
  </>;
}

export function SidebarLink({ icon, label, shortLabel, active, onClick }: {
  icon: ReactNode; label: string; shortLabel: string; active: boolean; onClick: () => void;
}) {
  const reducedMotion = useReducedMotion();
  return <Button
    variant="ghost"
    size="unset"
    className="nav-link"
    aria-label={label}
    aria-current={active ? "page" : undefined}
    onClick={onClick}
    render={<motion.button whileHover="hover" whileFocus="hover" />}
  >
    {active && <motion.span aria-hidden="true" layoutId="active-navigation" className="sidebar-active-background" transition={{ duration: reducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }} />}
    {icon}
    <motion.span className="sidebar-link-label" variants={{ hover: { x: reducedMotion ? 0 : 3 } }} transition={{ duration: 0.15 }}>
      <span className="sidebar-full-label">{label}</span><span className="sidebar-short-label">{shortLabel}</span>
    </motion.span>
  </Button>;
}
