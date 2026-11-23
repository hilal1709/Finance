# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router, PostgreSQL on Supabase, Auth.js, shadcn/ui and Aceternity UI. Charts use Chart.js with react-chartjs-2, not Recharts. Stack chosen by the user.

## Users

PICs and Managers in the Department of Accounting use the system to record and execute work, review workload, resolve asset/equipment mapping exceptions, and investigate cost movements. Admins manage access and controlled data imports.

## Product Purpose

Digital Accounting centralizes team work, asset references, and cost analysis so accounting work is measurable, integrated, and traceable.

## Positioning

The product joins task ownership and capacity, finance-to-equipment asset links, and cost variance evidence in one role-aware workspace. Cost explanations must be traceable to available records; accounting users retain responsibility for final conclusions.

## Operating Context

- The initial organization is the Department of Accounting, including Verification, Financial Accounting, Cost Accounting, Reconciliation, and Reporting sections.
- PICs may register work independently. Managers may create and assign work, review workload in parallel, and reroute assignments without an approval gate.
- SAP and operational data enter through controlled CSV/XLSX imports for the MVP. Direct SAP integration and automatic SAP master-data changes are outside the initial release.
- Cost views include MoM, YoY, and YTD comparisons, with drilldown to source transactions when those fields are present.

## Capabilities and Constraints

- MVP modules: Team Task & Workload, Asset 360 with one-to-many equipment mapping and change history, and Cost Analytics with rule-based insights.
- Roles: Admin, Manager, and PIC. Authentication uses Auth.js email/password with credentials stored securely in PostgreSQL.
- Work status vocabulary: New, Assigned, In Progress, Waiting/Blocked, In Review, and Completed.
- Initial workload capacity is 40 hours per PIC per week and should be configurable.
- Imports require column mapping, validation preview, and explicit confirmation. Exceptions include unmapped records, duplicate mapping, location/owner mismatch, and inactive equipment.
- All illustrative records and values must be labeled as simulated until actual source data is imported.
- Live AI Q&A, direct SAP extraction, and automatic SAP master updates are not part of the MVP.

## Brand Commitments

- Product name: Digital Accounting.
- Ledger Editorial uses Gunmetal #393e41, Dust Grey #d3d0cb, Alabaster Grey #e7e5df, Ocean Mist #44bba4 and Tuscan Sun #e7bb41. UI references include 21st.dev and horizonx.so.
- The user requested a logo developed with the logo-design-skill workflow.

## Evidence on Hand

- Client brief: `Inisiatif Digital Accounting.pptx`.
- The brief defines three modules, the Accounting organization, target task flows, asset-to-equipment mapping, and illustrative cost analytics.
- No real accounting, employee, asset, equipment, or transaction data was supplied. Any in-product sample values are synthetic.

## Product Principles

- Preserve ownership, evidence, and change history.
- Make workload and data exceptions visible while allowing work to continue.
- Keep imported source data traceable and avoid automatic master-data mutation.
- Keep accounting judgment with the accounting team.

## Accessibility & Inclusion

- Support keyboard navigation, clear focus states, readable contrast, and reduced-motion preferences.
- Keep the application usable at desktop and mobile widths.
