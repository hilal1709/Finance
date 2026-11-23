---
name: Digital Accounting
description: A calm operations workspace for accounting teams to review work, capacity, assets, and source data.
colors:
  primary: "#44bba4"
  sidebar: "#393e41"
  teal: "#205e52"
  teal-soft: "#deeee7"
  neutral-bg: "#e7e5df"
  surface: "#faf9f5"
  heading-surface: "#e7e5df"
  summary-surface: "#393e41"
  foreground: "#393e41"
  muted-foreground: "#535956"
  border: "#d3d0cb"
  input-boundary: "#8b8e88"
  warning: "#e7bb41"
  destructive: "#993d41"
typography:
  display:
    fontFamily: "IBM Plex Sans Variable, IBM Plex Sans, sans-serif"
    fontSize: "3rem"
    fontWeight: 630
    lineHeight: 1.09
    letterSpacing: "-0.035em"
  body:
    fontFamily: "IBM Plex Sans Variable, IBM Plex Sans, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.75rem"
  label:
    fontFamily: "IBM Plex Sans Variable, IBM Plex Sans, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.06em"
rounded:
  sm: "9px"
  md: "14px"
  lg: "18px"
spacing:
  sm: "0.5rem"
  md: "1rem"
  panel: "20px"
  lg: "1.5rem"
  xl: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    height: "2.75rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "1.25rem"
---

## Overview

Ledger Editorial brings the daily work queue, its assignees and deadlines into the first viewport. A Gunmetal sidebar frames an Alabaster canvas. A tinted queue header leads into ruled tables, tabular amounts, and compact operational panels.

## Colors

Gunmetal (#393e41, `--foreground`, `--sidebar`) is the navigation and reading ink. Alabaster Grey (#e7e5df, `--background`) is the canvas and Dust Grey (#d3d0cb, `--border`) defines the panel and table rules. Ocean Mist (#44bba4, `--primary`) identifies primary actions and the selected navigation icon. Deep teal (#205e52, `--ring`) gives links and focus indicators contrast on paper. Tuscan Sun (#e7bb41, `--warning`) draws attention to exceptions. Use a text label for each status and reserve red for errors.

## Typography

IBM Plex Sans Variable carries interface labels, headings, and prose. IBM Plex Mono is reserved for IDs and tabular codes. Headings use compact tracking; operational numbers should be easy to compare at a glance.

## Layout

Use full navigation labels from 1200px, an 88px rail on smaller desktops, and a drawer at 900px and below. The Command Center places the priority queue directly below its heading, with a two-column summary and manual notices alongside it at wide widths. Capacity, exceptions, and sources follow. Tasks and assets lead with their filtered directories, Analytics with its trend chart, Imports with its upload and mapping stages, and Team with its roster. At 760px and below, login shows the form before the illustrated preview. Phone-sized priority rows stack their metadata. Wide data tables scroll inside their own region.

## Elevation & Depth

Use tonal separation and one-pixel rules for panels. Use `--shadow-raised` for toast and `--shadow-overlay` for the task dialog. The modal backdrop dims the workspace while keeping its context visible.

## Shapes

Use `--radius-control` (9px) for controls, `--radius-panel` (14px) for panels, and `--radius-overlay` (18px) for dialogs and the login frame. Use `--space-panel` (20px) between panels. Give form fields the `--input` boundary and a 2px focus outline. Keep table rows compact and use pills for short statuses and metadata.

## Components

- Primary actions are Ocean Mist buttons with Gunmetal labels; secondary actions use a quiet outline or text treatment.
- Status labels use restrained, contextual color and explicit text; color never carries meaning alone.
- Use lazy-loaded Chart.js bar charts through react-chartjs-2, with accessible expandable data tables so values are available without relying on the canvas, color, or hover.
- Actual versus baseline bar charts use Gunmetal for actual and Ocean Mist for baseline, with explicit series labels and monthly/YTD modes.
- Contributor charts use signed horizontal bars around zero to distinguish positive and negative contributions; preserve signs and values in the expandable data table.
- Capacity tracks are progress indicators, not Chart.js charts.
- The overview utilization, task capacity, and team roster percentages use the same simulated hours against 40 weekly hours per person.
- Toasts announce success, information, or failure with distinct icons and labels. Success and information last six seconds, with the timer paused on hover or focus. Error toasts stay until dismissed. Task errors appear inside the task dialog.
- Banners pair a leading icon with a status tint and supporting copy. Every module and login have a manual Swiper carousel for supporting context. Previous and next remain accessible by keyboard and slides respond to touch gestures. The overview notice can be dismissed.
- All workspace modules and login use local shadcn/ui `base-nova` primitives under `src/components/ui/`: Button, Input, Label, NativeSelect, Card, Badge, Table, Avatar, Progress, Alert, Skeleton, Collapsible, Tabs, Dialog, and Sheet. Do not rebuild their controls in feature markup. Layout containers, headings, links, and Chart.js canvases remain semantic HTML or purpose-built components.
- Inputs retain native types, autocomplete, validation, and associated labels. NativeSelect preserves platform selection behavior and native change events. Table primitives preserve semantic structure and caller-owned horizontal scroll regions.
- The task dialog keeps its form until the save succeeds. Asset details open in a right-side Sheet from the asset identifier. Base UI manages focus trapping, Escape, scroll locking, and focus restoration for both, including the mobile navigation Sheet.
- Controlled comparison tabs reuse `AnimatedTabs`, adapted from Aceternity Tabs with a shared-layout highlight and stable Base UI keyboard navigation. Keep motion on the selection highlight, not the accounting data; disable its travel for reduced-motion users.
- Use local Lottie scenes for source sheets, column mapping, equipment links, the empty work tray and period comparison. Replay on pointer entry, pause offscreen and use the settled frame for reduced motion.
- Aceternity Card Hover Effect is composed into the shared shadcn Card as `AceternitySurface`: a quiet full-border hover/focus highlight without moving accounting data. Metric strips stay flat. Sidebar uses the Aceternity responsive composition and label motion with a shared active-navigation highlight; shadcn Sheet supplies accessible mobile behavior.
- Keep carousel navigation controls mounted and announce the selected slide. File Upload adapts Aceternity's shared-layout tile with shadcn Input/Label/Button, accessible single-file selection, drag/drop, format/20 MB validation, and explicit removal.
- Stateful Button combines the Aceternity loading treatment with shadcn Button for task saves and login. Its pending state follows actual network/form status, never fabricated success.
- Use the shared `Icon` component for locally embedded Potlab SVG shapes with theme colors and hover, focus, and reduced-motion states. Icon-only controls carry labels on the control. The Trace Loop is the brand mark and favicon. [Potlab Icons by Suresh](https://www.potlabicons.com/)

## Motion

- GSAP draws the heading trace for 460 ms and settles the endpoint over 180 ms with an 80 ms overlap. The heading and panel content render immediately. During route loading, GSAP loops the Trace Loop dot and indeterminate indicator in 1.1-second cycles over table or form skeletons.
- Anime.js gives control feedback over 180 ms and animates toast entry over 220 ms. The task dialog uses 220 ms transitions for opening and closing. AOS cues one supporting panel over 320 ms. Swiper moves between manually selected slides over 320 ms.
- Reduced motion displays the finished trace, static icons and loading mark, and the settled Lottie frame. Carousel changes are immediate. Controls retain visible focus and state feedback.

## References

- Sliding navigation and period selection inform the local sidebar and tab treatments. [21st.dev Animated Sidebar](https://21st.dev/@unlumen/components/sidebar-001) · [21st.dev Segmented Tabs](https://21st.dev/@micka_design/components/tabs-base)
- Tonal panels and the framed login inform the workspace composition. [HorizonX NexusFlow](https://horizonx.so/explore/nexusflow-dashboard) · [HorizonX Kurage](https://horizonx.so/explore/kurage-dashboard)

## Do's and Don'ts

- Do keep the priority queue as the first and most prominent dashboard module.
- Do show source period and simulation status wherever sample data could be mistaken for live data.
- Do use checkmarks only for validated, completed, or successful states.
- Don't use sparkle motifs, decorative icon grids, or oversized KPI cards.
- Don't use motion to delay reading or interacting with accounting data.
