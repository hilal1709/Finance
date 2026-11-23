---
name: Digital Accounting
description: A calm operations workspace for accounting teams to review work, capacity, assets, and source data.
colors:
  primary: "#705080"
  sidebar: "#292730"
  teal: "#347c88"
  teal-soft: "#e7f0f2"
  neutral-bg: "#f7f5f8"
  surface: "#ffffff"
  foreground: "#292730"
  muted-foreground: "#665c6d"
  border: "#dfd8e3"
  warning: "#b9853f"
  destructive: "#b33c4b"
typography:
  display:
    fontFamily: "IBM Plex Sans Variable, IBM Plex Sans, sans-serif"
    fontSize: "2.625rem"
    fontWeight: 620
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  body:
    fontFamily: "IBM Plex Sans Variable, IBM Plex Sans, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Sans Variable, IBM Plex Sans, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.06em"
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "0.9rem"
  xl: "1.2rem"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    height: "2.5rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "1.25rem"
---

## Overview

Ledger modern centers the Accounting team's daily queue. The graphite navigation frames a pale canvas, aubergine identifies primary actions, and teal distinguishes supporting financial context. The Trace Loop mark and the accounting data-flow illustration connect the workspace, login, and imports.

## Colors

Use graphite (`#292730`, `--sidebar`) for persistent navigation and aubergine (`#705080`, `--primary`) for primary actions and focus. Keep the canvas pale (`#F7F5F8`, `--background`), surfaces white (`#FFFFFF`, `--card`), and borders quiet (`#DFD8E3`, `--border`). Teal (`#347C88`, `--chart-1`, aliased by `--teal`) is the secondary chart accent, not semantic success; aubergine is also available as `--chart-2`. The soft teal token follows `--accent` (`#E7F0F2`). These documented colors follow the normative `:root` tokens in `src/app/globals.css`, not legacy hardcoded component colors. Preserve semantic success, warning, and error treatments: green for actual successful, validated, or completed states, amber for due attention, and red for errors. A green check is only for an actual successful, validated, or completed state.

## Typography

IBM Plex Sans Variable carries interface labels, headings, and prose. IBM Plex Mono is reserved for IDs and tabular codes. Headings use compact tracking; operational numbers should be easy to compare at a glance.

## Layout

Use a persistent dark sidebar beside a flexible work area. The Command Center starts with the task heading and primary action, a compact metric strip, and the priority queue. Capacity and exceptions sit beside the queue on desktop and follow it at tablet and mobile widths. Snapshots and notices share the next row on wide screens. The sidebar becomes a drawer at 900px. On phones, priority rows stack their metadata and wide data tables scroll inside their own region.

## Elevation & Depth

Prefer tonal separation and one-pixel borders over stacked shadows. Use a soft shadow only for floating dialogs and transient overlays. The modal backdrop should mute the workspace without obscuring its context.

## Shapes

Use moderate rounded corners for work surfaces and smaller radii for controls. Keep tables and information rows compact and square enough to feel operational. Avoid pills except for short statuses and metadata labels.

## Components

- Primary actions are aubergine filled buttons; secondary actions use a quiet outline or text treatment.
- Status labels use restrained, contextual color and explicit text; color never carries meaning alone.
- Use lazy-loaded Chart.js bar charts through react-chartjs-2, with accessible expandable data tables so values are available without relying on the canvas, color, or hover.
- Actual versus baseline bar charts use aubergine for actual and teal for baseline, with explicit series labels and monthly/YTD modes.
- Contributor charts use signed horizontal bars around zero to distinguish positive and negative contributions; preserve signs and values in the expandable data table.
- Capacity tracks are progress indicators, not Chart.js charts.
- Toasts announce success, information, or failure. Success and information last six seconds, with the timer paused on hover or focus. Import errors stay until dismissed. Task errors appear inside the task dialog.
- Context banners communicate source and validation status. The overview banner uses a manual Swiper carousel with swipe, previous, next, and dismiss controls.
- All workspace modules and login use local shadcn/ui `base-nova` primitives under `src/components/ui/`: Button, Input, Label, NativeSelect, Card, Badge, Table, Avatar, Progress, Alert, Skeleton, Collapsible, Tabs, Dialog, and Sheet. Do not rebuild their controls in feature markup. Layout containers, headings, links, and Chart.js canvases remain semantic HTML or purpose-built components.
- Inputs retain native types, autocomplete, validation, and associated labels. NativeSelect preserves platform selection behavior and native change events. Table primitives preserve semantic structure and caller-owned horizontal scroll regions.
- Dialogs have a clear title, short description, compact form, and explicit save action. Base UI manages focus trapping, Escape, scroll locking, and focus restoration, including the Sheet-based mobile navigation.
- Controlled comparison tabs reuse `AnimatedTabs`, adapted from Aceternity Tabs with a shared-layout highlight and stable Base UI keyboard navigation. Keep motion on the selection highlight, not the accounting data; disable its travel for reduced-motion users.
- Use the local Lottie illustration on login and in the import guidance panel. Keep the local Lordicon asset in Cost Analytics with attribution in the footer.
- Aceternity Card Hover Effect is composed into the shared shadcn Card as `AceternitySurface`: a quiet full-border hover/focus highlight without moving accounting data. Metric strips stay flat. Sidebar uses the Aceternity responsive composition and label motion with a shared active-navigation highlight; shadcn Sheet supplies accessible mobile behavior.
- Keep carousel navigation controls mounted and announce the selected slide. File Upload adapts Aceternity's shared-layout tile with shadcn Input/Label/Button, accessible single-file selection, drag/drop, format/20 MB validation, and explicit removal.
- Stateful Button combines the Aceternity loading treatment with shadcn Button for task saves and login. Its pending state follows actual network/form status, never fabricated success.
- GSAP animates the route loading mark and trace during real loading. Anime.js animates toast entry. AOS runs a one-time reveal on the source snapshot panel, which stays readable throughout. Use a static loading mark, zero-duration slide changes, and a static illustration frame for reduced motion.

## Do's and Don'ts

- Do keep the priority queue as the first and most prominent dashboard module.
- Do show source period and simulation status wherever sample data could be mistaken for live data.
- Do use checkmarks only for validated, completed, or successful states.
- Don't use sparkle motifs, decorative icon grids, or oversized KPI cards.
- Don't use motion to delay reading or interacting with accounting data.
