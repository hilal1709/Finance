---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/workspace.tsx", "src/app/login/page.tsx"]
---

## Scope
Primary route: `src/app/page.tsx`. Operate surface for Accounting PICs and Managers. Redesign the shared workspace shell and its six in-app modules: Command Center, Task & Workload, Asset 360, Cost Analytics, Data Imports, and Team & Access. Preserve current interactions, API payloads, role-aware access, and simulated-data labeling.

## Current selection
The user selected palette D (Graphite & Aubergine) and Chart.js with react-chartjs-2 for all charts. Preserve the queue-first composition. Cost comparison tabs and period selections must update synthetic datasets and metrics together. No future-month actuals; disclose when detailed records only cover October.

## Direction contract
THESIS: An evidence-first accounting workspace puts the work that needs a decision at the center, instead of treating every metric as an equal dashboard card.

OWN-WORLD: Accounting Operations Ledger uses user-selected palette D: graphite #292730 navigation, aubergine #705080 actions, teal #347C88 chart accent, #F7F5F8 canvas, and white work surfaces, with strong sans headings, mono only for codes and measurements, compact rule lines, and one teal source-trace path. Keep the selected Trace Loop logo. Avoid decorative archive motifs, sparkle, glow, and repeated icon cards.

STORY: PICs can see what is due or blocked and act. Managers can read capacity pressure, reroute work, and move from an asset exception or cost variance to its supporting record.

FIRST VIEWPORT: Use a compact graphite rail and utility bar. A direct task heading and “Buat pekerjaan” action lead into a compact summary strip and a wide ruled priority queue. Capacity and exceptions sit beside the queue on desktop and follow it on mobile. Source snapshots and notices share the next row. The login panel illustrates the accounting data flow using the same visual language as imports.

FORM: Ledger modern, `seed: none (pinned)` — “Antrean kerja lebih menonjol, tabel mudah dipindai, dan animasi paling ekspresif ada di login, loading, serta ilustrasi impor.”

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
