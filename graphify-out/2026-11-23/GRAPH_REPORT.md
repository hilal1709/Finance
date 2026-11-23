# Graph Report - KAB  (2026-11-23)

## Corpus Check
- 223 files · ~1,274,021 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 18 file(s) not represented in the graph (top: .toml 6, (none) 2, .ico 2)

## Summary
- 3710 nodes · 6040 edges · 157 communities (127 shown, 30 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 110 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8df197c5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- User.ts
- prismaNamespace.ts
- live-browser.js
- Task.ts
- AssetEquipmentMapping.ts
- ImportBatch.ts
- TaskEvent.ts
- resumeSession
- Account.ts
- FinancialLine.ts
- Asset.ts
- Session.ts
- Equipment.ts
- commonInputTypes.ts
- connectSSE
- el
- VerificationToken.ts
- updatePendingCounter
- react
- initPageChat
- renderDesignVisual
- package.json
- migration.sql
- svglib.py
- dependencies
- rejectUnlessSignedIn
- cost-analytics.tsx
- render_png.py
- createLiveBrowserDomHelpers
- workspace.tsx
- mountSvelteComponentVariant
- Responsive Design
- client.ts
- Generate Report
- prismaNamespaceBrowser.ts
- applyEditing
- 2. The twelve principles
- animate.md
- audit
- live.md
- onboard.md
- Visual Techniques & Optical Corrections
- components.json
- The Toolkit
- scripts
- createLiveBrowserSessionState
- modern-screenshot.umd.js
- PrismaClient
- compilerOptions
- showToast
- commit/route.ts
- AccountDelegate
- AssetDelegate
- render_brand_kit.mjs
- AssetEquipmentMappingDelegate
- build_catalog.py
- EquipmentDelegate
- preview_sheet.py
- FinancialLineDelegate
- ImportBatchDelegate
- presentation_board.py
- SessionDelegate
- build_brand_kit.py
- TaskDelegate
- TaskEventDelegate
- initGlobalBar
- UserDelegate
- VerificationTokenDelegate
- resolveLiveInjectionAnchor
- devDependencies
- login/page.tsx
- k
- Logo Design
- Handle `generate`
- impeccable/SKILL.md
- new-work.md
- L
- Discovery & the Design Brief
- actOnAgentTarget
- New visual work
- optimize.md
- Mark Types — What to Choose and When
- The Design Process in Detail
- export_variants.py
- Impeccable Asset Producer
- Scan mode (approach C: auto-extract, then confirm descriptive language)
- generate.md
- Building Logos in SVG
- Product
- prisma.ts
- reference/critique.md
- Simplify the Design
- auth.ts
- Colour
- alert.tsx
- loading-screen.tsx
- clarify.md
- Generate Combined Critique Report
- Nielsen's 10 Heuristics
- document.md
- polish.md
- quieter.md
- impeccable
- From Logo to Identity System
- Generate Report
- Prisma__UserClient
- Cognitive Load Assessment
- Init flow
- Testing Checklist
- Typography for Logos
- layout.tsx
- Accounting · Logo guidelines
- Common Cognitive Load Violations
- iOS platform
- Operate mode depth (and Read notes)
- Shape
- typeset.md
- qt
- The Reference Library — Guide & Insights
- Presentation, Feedback & Delivery
- Redesign, Refresh & Rebrand
- <Brand> — Logo Guidelines (compact)
- notice-carousel.tsx
- bolder.md
- Android platform
- Persona-Based Design Testing
- hasTextRows
- Extract Flow
- public_accounting_orbit
- Impeccable Manual Edit Applier
- live-browser-ignores.js
- enums.ts
- Prisma__AssetEquipmentMappingClient
- Prisma__TaskClient
- Diagnostic Scan
- Impeccable Documenter
- $impeccable hooks
- Critiquing a Logo
- workspace-toast.tsx
- Handover notes
- Prisma__ImportBatchClient
- Prisma__TaskEventClient
- Digital Accounting
- Prisma__AccountClient
- Prisma__AssetClient
- Prisma__EquipmentClient
- Prisma__FinancialLineClient
- Prisma__SessionClient
- Scoring the report
- src-app-page-tsx.md
- Home
- Prisma__VerificationTokenClient
- dashboard.md
- Accounting · Trace Loop logo kit
- PrismaClientBaseOptions
- AGENTS.md
- { GET, POST }

## God Nodes (most connected - your core abstractions)
1. `connectSSE()` - 38 edges
2. `setLiveState()` - 34 edges
3. `showToast()` - 33 edges
4. `resumeSession()` - 33 edges
5. `initGlobalBar()` - 30 edges
6. `el()` - 29 edges
7. `buildInsertConfigureRow()` - 28 edges
8. `handleKeyDown()` - 28 edges
9. `cleanup()` - 27 edges
10. `init()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `Loading Performance` --references--> `optional()`  [INFERRED]
  .agents/skills/impeccable/reference/optimize.md → src/app/api/imports/commit/route.ts
- `Step 2: Act by severity` --references--> `init()`  [INFERRED]
  .agents/skills/impeccable/reference/doctor.md → .agents/skills/impeccable/scripts/live-browser.js
- `What this owns, and what it does not` --references--> `init()`  [INFERRED]
  .agents/skills/impeccable/reference/doctor.md → .agents/skills/impeccable/scripts/live-browser.js
- `Start` --references--> `init()`  [INFERRED]
  .agents/skills/impeccable/reference/live.md → .agents/skills/impeccable/scripts/live-browser.js
- `Commands` --references--> `init()`  [INFERRED]
  .agents/skills/impeccable/SKILL.md → .agents/skills/impeccable/scripts/live-browser.js

## Import Cycles
- None detected.

## Communities (157 total, 30 thin omitted)

### Community 0 - "User.ts"
Cohesion: 0.01
Nodes (150): AggregateUser, BoolFieldUpdateOperationsInput, DateTimeFieldUpdateOperationsInput, EnumRoleFieldUpdateOperationsInput, GetUserAggregateType, GetUserGroupByPayload, IntFieldUpdateOperationsInput, NullableDateTimeFieldUpdateOperationsInput (+142 more)

### Community 1 - "prismaNamespace.ts"
Cohesion: 0.01
Nodes (136): AccountScalarFieldEnum, AnyNull, Args, AssetEquipmentMappingScalarFieldEnum, AssetScalarFieldEnum, At, AtLeast, AtLoose (+128 more)

### Community 2 - "live-browser.js"
Cohesion: 0.04
Nodes (114): absolutizeUrls(), applyGlobalBarLabelState(), applyPlaceholderSizingStyles(), attachSteerFocusGuard(), averageRgb01(), beginEditPin(), bindEditBadgeProxy(), bufferToBase64() (+106 more)

### Community 3 - "Task.ts"
Cohesion: 0.02
Nodes (113): AggregateTask, DecimalFieldUpdateOperationsInput, EnumTaskPriorityFieldUpdateOperationsInput, EnumTaskStatusFieldUpdateOperationsInput, GetTaskAggregateType, GetTaskGroupByPayload, Task$assigneeArgs, Task$eventsArgs (+105 more)

### Community 4 - "AssetEquipmentMapping.ts"
Cohesion: 0.02
Nodes (105): AggregateAssetEquipmentMapping, AssetEquipmentMapping$approvedByArgs, AssetEquipmentMappingAggregateArgs, AssetEquipmentMappingAssetIdEquipmentIdEffectiveFromCompoundUniqueInput, AssetEquipmentMappingCountAggregateInputType, AssetEquipmentMappingCountAggregateOutputType, AssetEquipmentMappingCountArgs, AssetEquipmentMappingCountOrderByAggregateInput (+97 more)

### Community 5 - "ImportBatch.ts"
Cohesion: 0.02
Nodes (96): AggregateImportBatch, EnumImportStatusFieldUpdateOperationsInput, EnumImportTypeFieldUpdateOperationsInput, GetImportBatchAggregateType, GetImportBatchGroupByPayload, ImportBatch$financialLinesArgs, ImportBatchAggregateArgs, ImportBatchAvgAggregateInputType (+88 more)

### Community 6 - "TaskEvent.ts"
Cohesion: 0.02
Nodes (89): AggregateTaskEvent, GetTaskEventAggregateType, GetTaskEventGroupByPayload, NullableEnumTaskStatusFieldUpdateOperationsInput, TaskEventAggregateArgs, TaskEventCountAggregateInputType, TaskEventCountAggregateOutputType, TaskEventCountArgs (+81 more)

### Community 7 - "resumeSession"
Cohesion: 0.06
Nodes (79): applyParamDefaults(), applyParamValue(), applyPlaceholderDimensions(), applySavedParamValues(), applySavedSessionMeta(), buildParamsPanel(), clampVariantIndex(), clearHandled() (+71 more)

### Community 8 - "Account.ts"
Cohesion: 0.02
Nodes (81): AccountAggregateArgs, AccountAvgAggregateInputType, AccountAvgAggregateOutputType, AccountAvgOrderByAggregateInput, AccountCountAggregateInputType, AccountCountAggregateOutputType, AccountCountArgs, AccountCountOrderByAggregateInput (+73 more)

### Community 9 - "FinancialLine.ts"
Cohesion: 0.03
Nodes (79): AggregateFinancialLine, FinancialLineAggregateArgs, FinancialLineAvgAggregateInputType, FinancialLineAvgAggregateOutputType, FinancialLineAvgOrderByAggregateInput, FinancialLineCountAggregateInputType, FinancialLineCountAggregateOutputType, FinancialLineCountArgs (+71 more)

### Community 10 - "Asset.ts"
Cohesion: 0.03
Nodes (78): AggregateAsset, Asset$mappingsArgs, AssetAggregateArgs, AssetAssetNumberSubNumberCompoundUniqueInput, AssetAvgAggregateInputType, AssetAvgAggregateOutputType, AssetAvgOrderByAggregateInput, AssetCountAggregateInputType (+70 more)

### Community 11 - "Session.ts"
Cohesion: 0.03
Nodes (73): AggregateSession, GetSessionAggregateType, GetSessionGroupByPayload, SessionAggregateArgs, SessionCountAggregateInputType, SessionCountAggregateOutputType, SessionCountArgs, SessionCountOrderByAggregateInput (+65 more)

### Community 12 - "Equipment.ts"
Cohesion: 0.03
Nodes (70): AggregateEquipment, Equipment$mappingsArgs, EquipmentAggregateArgs, EquipmentCountAggregateInputType, EquipmentCountAggregateOutputType, EquipmentCountArgs, EquipmentCountOrderByAggregateInput, EquipmentCountOutputType (+62 more)

### Community 13 - "commonInputTypes.ts"
Cohesion: 0.03
Nodes (69): BoolFilter, BoolWithAggregatesFilter, DateTimeFilter, DateTimeNullableFilter, DateTimeNullableWithAggregatesFilter, DateTimeWithAggregatesFilter, DecimalFilter, DecimalNullableFilter (+61 more)

### Community 14 - "connectSSE"
Cohesion: 0.09
Nodes (67): abortSvelteComponentInjection(), applyLiveBarPreference(), beginNewLiveConfiguration(), buildInsertPlaceholderSnapshotFromDom(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), cleanup() (+59 more)

### Community 15 - "el"
Cohesion: 0.07
Nodes (57): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+49 more)

### Community 16 - "VerificationToken.ts"
Cohesion: 0.04
Nodes (53): AggregateVerificationToken, GetVerificationTokenAggregateType, GetVerificationTokenGroupByPayload, VerificationTokenAggregateArgs, VerificationTokenCountAggregateInputType, VerificationTokenCountAggregateOutputType, VerificationTokenCountArgs, VerificationTokenCountOrderByAggregateInput (+45 more)

### Community 17 - "updatePendingCounter"
Cohesion: 0.17
Nodes (27): clearStoredManualApplyState(), dismissToast(), fetchPendingCount(), handleManualEditActivity(), hidePendingApplyDock(), manualApplyLoadingText(), manualApplyStateKey(), manualEditEventForCurrentPage() (+19 more)

### Community 18 - "react"
Cohesion: 0.13
Nodes (15): @base-ui/react, motion, react, AnimatedTab, AnimatedTabsProps, Avatar(), AvatarFallback(), FileUpload() (+7 more)

### Community 19 - "initPageChat"
Cohesion: 0.11
Nodes (42): armPageChatForTyping(), attachSteerFocusDebug(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), collapsePageChat(), expandPageChat(), finishVoiceSession() (+34 more)

### Community 20 - "renderDesignVisual"
Cohesion: 0.07
Nodes (40): buildCollapsible(), buildColorModels(), buildDesignHeader(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), cssSafe(), designEmptyMessage() (+32 more)

### Community 21 - "package.json"
Cohesion: 0.05
Nodes (33): eslintConfig, allowScripts, esbuild@0.28.2, prisma@7.10.1, @prisma/engines@7.10.1, name, private, type (+25 more)

### Community 22 - "migration.sql"
Cohesion: 0.12
Nodes (32): "Account", "Asset", Asset_assetNumber_subNumber_key, Asset_location_costCenter_idx, Asset_name_idx, "AssetEquipmentMapping", AssetEquipmentMapping_assetId_effectiveTo_idx, AssetEquipmentMapping_assetId_equipmentId_effectiveFrom_key (+24 more)

### Community 23 - "svglib.py"
Cohesion: 0.10
Nodes (33): apply(), _arc_points(), bbox_of(), collect_colors(), document_geometry(), element_counts(), _in_defs_helper(), iter_shapes() (+25 more)

### Community 24 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, animejs, aos, @auth/prisma-adapter, @base-ui/react, bcryptjs, chart.js, class-variance-authority (+23 more)

### Community 25 - "rejectUnlessSignedIn"
Cohesion: 0.15
Nodes (20): nextConfig, next, zod, GET(), offsetPeriod(), DELETE(), mappingSchema, POST() (+12 more)

### Community 26 - "cost-analytics.tsx"
Cohesion: 0.09
Nodes (34): ref_node_assert, ref_node_test, comparisons, CostAnalytics(), CostDriverChart, CostTrendChart, transactions, CostDriverChart() (+26 more)

### Community 27 - "render_png.py"
Cohesion: 0.10
Nodes (27): available_backends(), _chrome(), find_chrome(), main(), png_size(), _qlmanage(), _qlmanage_once(), Like tempfile.TemporaryDirectory, but cleanup never raises (Windows can keep… (+19 more)

### Community 28 - "createLiveBrowserDomHelpers"
Cohesion: 0.16
Nodes (15): createLiveBrowserDomHelpers(), activeElementDeep(), cloneWithoutChrome(), copyTextViaSelection(), cssId(), liveUiRoot(), makeFrozenAnchor(), raiseHitModal() (+7 more)

### Community 29 - "workspace.tsx"
Cohesion: 0.07
Nodes (35): cn, react-dom, Area, assetRows, assetStatusLabels, capacity, CostAnalytics, importSteps (+27 more)

### Community 30 - "mountSvelteComponentVariant"
Cohesion: 0.10
Nodes (32): acceptedDomAlreadyClean(), applyOriginalAttrsToSvelteAnchor(), clearHandledWrapperReloadStamp(), clearMountErrorCard(), commitAcceptedSvelteComponentToDom(), commitAcceptedVariantToDom(), componentModuleCandidates(), deferredRecoverySuperseded() (+24 more)

### Community 31 - "Responsive Design"
Cohesion: 0.08
Nodes (25): Assess Adaptation Challenge, Breakpoints: Content-Driven, Content Adaptation, Desktop Adaptation (Mobile → Desktop), Detect Input Method, Not Just Screen Size, Email Adaptation (Web → Email), Implement Adaptations, Layout Adaptation Patterns (+17 more)

### Community 32 - "client.ts"
Cohesion: 0.08
Nodes (20): ref_node_buffer, ref_node_process, ref_node_url, @prisma/client, Account, Asset, AssetEquipmentMapping, $Enums (+12 more)

### Community 33 - "Generate Report"
Cohesion: 0.12
Nodes (15): 1. Accessibility (A11y), 2. Performance, 3. Theming, 4. Responsive Design, 5. Implementation Integrity (CRITICAL), Audit Health Score, Detailed Findings by Severity, Diagnostic Scan (+7 more)

### Community 34 - "prismaNamespaceBrowser.ts"
Cohesion: 0.05
Nodes (35): Account, Asset, AssetEquipmentMapping, $Enums, Equipment, FinancialLine, ImportBatch, Session (+27 more)

### Community 35 - "applyEditing"
Cohesion: 0.07
Nodes (43): addManualContextText(), applyEditing(), buildLocatorForLeaf(), canRestoreManualEditElement(), collectEditableTextRows(), visit(), collectManualContextPieces(), walk() (+35 more)

### Community 36 - "2. The twelve principles"
Cohesion: 0.08
Nodes (23): 10. Make the logo the foundation of a system, 11. Design for every medium, 12. Be seductive — and be strong, 1. Start with who, what, why, 1. What a logo is (and is not), 2. Identify, don't explain, 2. The twelve principles, 3. Keep it simple (+15 more)

### Community 37 - "animate.md"
Cohesion: 0.09
Nodes (20): Accessibility and control, Choose material by meaning, Find the job, Hover, Implement to the runtime, Set the motion thesis, Timing and easing, Verify (+12 more)

### Community 38 - "audit"
Cohesion: 0.17
Nodes (15): 5. Catalog schema & extending the library, analyse(), embed(), main(), Nested <svg> that fits the file into the box; ids are prefixed so several files…, audit(), load_stats(), aspect_class() (+7 more)

### Community 39 - "live.md"
Cohesion: 0.08
Nodes (22): Apply at system scale, Audit before choosing, Choose a strategy, Contrast and perception, Live-mode signature params, Verify, Visitor mode, Cleanup (+14 more)

### Community 40 - "onboard.md"
Cohesion: 0.09
Nodes (22): Assess Onboarding Needs, Context Over Ceremony, Contextual Help, Design Onboarding Experiences, Documentation & Help, Empty State Design, Feature Discovery & Adoption, Guided Tours & Walkthroughs (+14 more)

### Community 41 - "Visual Techniques & Optical Corrections"
Cohesion: 0.09
Nodes (22): 10. Gradients, light and shading, 11. Dimension, 12. Visibility devices, 13. Patterns, 14. Reviewing with fresh eyes (the dialectical approach), 1. Geometry, grids and the golden ratio, 2. Balance, 3. Optical corrections (+14 more)

### Community 42 - "components.json"
Cohesion: 0.09
Nodes (22): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+14 more)

### Community 43 - "The Toolkit"
Cohesion: 0.10
Nodes (20): Animate complex properties, Assess What "Extraordinary" Means Here, For data-heavy interfaces, For functional UI, For performance-critical UI, For visual/marketing surfaces, Implement with Discipline, Interact with the device (+12 more)

### Community 44 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:generate, db:migrate, db:seed, db:studio, dev, lint (+2 more)

### Community 45 - "createLiveBrowserSessionState"
Cohesion: 0.19
Nodes (17): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+9 more)

### Community 46 - "modern-screenshot.umd.js"
Cohesion: 0.20
Nodes (18): Ce(), Ct(), _e(), Ee(), Et(), Gt(), It(), J() (+10 more)

### Community 48 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 49 - "showToast"
Cohesion: 0.12
Nodes (23): abandonForeignSession(), abandonSupersededGo(), copyToClipboard(), discardOrphanedSession(), injectVariantsFromSource(), isCompiledTemplateSourceFile(), isSvelteComponentManifestPath(), isTerminalSessionSummary() (+15 more)

### Community 50 - "commit/route.ts"
Cohesion: 0.29
Nodes (14): exceljs, optional(), POST(), POST(), requiredFields, ImportType, cellValue(), normalizePeriod() (+6 more)

### Community 53 - "render_brand_kit.mjs"
Cohesion: 0.13
Nodes (13): ref_node_fs, ref_node_path, ref_sharp, out, rasters, root, digital, maskableSvg (+5 more)

### Community 55 - "build_catalog.py"
Cohesion: 0.11
Nodes (24): Step 1: Run the pass, build_stats(), dist(), main(), pct(), Rebuild the reference-library catalog from the SVG files + visual…, Build a one-page concept overview (SVG + PNG) to show the user BEFORE any kit…, wrap() (+16 more)

### Community 57 - "preview_sheet.py"
Cohesion: 0.32
Nodes (11): compare_block(), concept_block(), img(), main(), Generate an HTML test sheet for one or more logo SVGs (no dependencies). Shows…, refs_for_industry(), shelf_block(), tile() (+3 more)

### Community 60 - "presentation_board.py"
Cohesion: 0.23
Nodes (10): main(), mock_html(), pick_mockups(), White text while it keeps 3:1 on the background, near-black below that (white…, c: dict with sym, lock, avatar, color, cls, name, tag, nav., Build a client-ready concept presentation (single HTML file, no dependencies).…, text_on(), uri() (+2 more)

### Community 62 - "build_brand_kit.py"
Cohesion: 0.17
Nodes (8): fonttools_pens_svgpathpen, fonttools_ttlib, fonttools_varlib_instancer, html, Path, pathlib, Build outlined IBM Plex wordmarks and original Trace Loop lockups., save()

### Community 65 - "initGlobalBar"
Cohesion: 0.10
Nodes (34): agentHasWorkInFlight(), agentStatusText(), barPaletteForTheme(), brandMarkSvg(), designPanelCss(), detectPageTheme(), ensureAgentPollTooltip(), ensureSpinKeyframes() (+26 more)

### Community 68 - "resolveLiveInjectionAnchor"
Cohesion: 0.16
Nodes (19): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), elementMatchesOriginalMarkup() (+11 more)

### Community 69 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, eslint-config-next, @playwright/test, prisma, shadcn, tailwindcss, @tailwindcss/turbopack (+7 more)

### Community 70 - "login/page.tsx"
Cohesion: 0.16
Nodes (9): lottie-react, authenticate(), instant, AccountingIllustration, signIn, AccountingIllustration(), descriptions, AccountingIllustration (+1 more)

### Community 71 - "k"
Cohesion: 0.18
Nodes (17): ae(), be(), bt(), dt(), er(), fe(), ft(), jt() (+9 more)

### Community 72 - "Logo Design"
Cohesion: 0.12
Nodes (16): Design workflow, Honesty and limits, Logo Design, Phase 1 — Discovery → brief, Phase 2 — Research & strategy, Phase 3 — Concepts, Phase 4 — Build in SVG (black first), Phase 5 — Test & refine (loop at least twice) (+8 more)

### Community 73 - "Handle `generate`"
Cohesion: 0.07
Nodes (27): Accessibility Resilience, Assess Hardening Needs, Edge Cases & Boundary Conditions, Error Handling, Hardening Dimensions, Input Validation & Sanitization, Internationalization (i18n), Performance Resilience (+19 more)

### Community 74 - "impeccable/SKILL.md"
Cohesion: 0.10
Nodes (15): Craft (deprecated alias), Craft floor, Refuse, Verify, $impeccable foundations, What "done" means, With an id: fix that one item, Without an argument: the roadmap (+7 more)

### Community 75 - "new-work.md"
Cohesion: 0.06
Nodes (28): Checks, in order, Disposition, Impeccable Finish Reviewer, Input Contract, Output Contract, Verdict Pass, Comps, Directions (+20 more)

### Community 76 - "L"
Cohesion: 0.18
Nodes (15): s(), ht(), L(), l(), me(), pt(), u(), ut() (+7 more)

### Community 77 - "Discovery & the Design Brief"
Cohesion: 0.13
Nodes (14): 1. Why discovery first, 2. The fast path (when the user wants speed), 3. The full question bank, 5. From answers to a brief (template), 6. Word mapping — turning language into symbols, 7. Warning signs in a brief, After gathering answers, ask yourself, Contents (+6 more)

### Community 78 - "actOnAgentTarget"
Cohesion: 0.29
Nodes (17): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), declineAgentTargetBusy(), declineAgentTargetUnresolvable() (+9 more)

### Community 79 - "New visual work"
Cohesion: 0.14
Nodes (14): 1. Decide what is already true, 2. Ask what will change the work, 3. Choose the right amount of invention, 4. Commit the world, 5. Record the decision, 6. Build with full commitment, 7. Inspect and finish, Both paths (+6 more)

### Community 80 - "optimize.md"
Cohesion: 0.14
Nodes (13): Animation Performance, Assess Performance Issues, Core Web Vitals Optimization, Cumulative Layout Shift (CLS < 0.1), Interaction to Next Paint (INP < 200ms), Largest Contentful Paint (LCP < 2.5s), Loading Performance, Network Optimization (+5 more)

### Community 81 - "Mark Types — What to Choose and When"
Cohesion: 0.14
Nodes (13): 10. Combination mark & lockups, 11. Pictograms, logo systems, dynamic marks, patterns, 12. Decision guide, 1. Overview table, 2. Wordmark (logotype), 4. Letterform (single-letter symbol), 5. Pictorial mark, 6. Abstract mark (+5 more)

### Community 82 - "The Design Process in Detail"
Cohesion: 0.14
Nodes (13): 1. Stage map, 2. Concepting, 3. Mood boards and reference gathering, 4. Exploration — three stages, 5. Development in vector, 6. Refinement and gridding, 7. Final artwork checklist, 8. Working habits (+5 more)

### Community 83 - "export_variants.py"
Cohesion: 0.31
Nodes (7): inner_markup(), main(), Export the standard delivery variants of a logo from one master SVG (no…, Centre the artwork's real bounding box on a 256×256 canvas (optionally on a…, recolor(), set_title(), square_wrap()

### Community 84 - "Impeccable Asset Producer"
Cohesion: 0.15
Nodes (11): Act on the receipt, Assemble and review, Plan and asset review, Plan, capture, serve, Core Rule, Decision Comps, Impeccable Asset Producer, Input Contract (+3 more)

### Community 85 - "Scan mode (approach C: auto-extract, then confirm descriptive language)"
Cohesion: 0.15
Nodes (13): Component translation rules, Narrative mapping, Scan mode (approach C: auto-extract, then confirm descriptive language), Schema, Step 1: Find the design assets, Step 2: Auto-extract what can be auto-extracted, Step 2b: Stage the frontmatter, Step 3: Ask the user for qualitative language (+5 more)

### Community 86 - "generate.md"
Cohesion: 0.15
Nodes (11): Step 1: Parse the request, Step 2: Reuse the page, then start, Step 3: Generate, Step 4: Accept and close, append-arrays, append-string, Config drift, Consent prompt (use this phrasing) (+3 more)

### Community 87 - "Building Logos in SVG"
Cohesion: 0.15
Nodes (12): 10. Outlines and boolean unions (production), 11. Validation, 1. File conventions, 2. Construction strategy: think in primitives, 4. Negative space and compound shapes, 5. Strokes vs fills, 6. Type in SVG, 7. Colour, gradients, variants (+4 more)

### Community 88 - "Product"
Cohesion: 0.15
Nodes (12): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+4 more)

### Community 89 - "prisma.ts"
Cohesion: 0.19
Nodes (10): email, prisma, bcryptjs, @prisma/adapter-pg, GET(), POST(), userSchema, PrismaClient (+2 more)

### Community 90 - "reference/critique.md"
Cohesion: 0.17
Nodes (11): Action Summary, Ask the User, Assessment A: Design Review, Assessment B: Detector + Browser Evidence, Assessment Orchestration, Deliver the Report, Hard Invariants, Persist the Snapshot (+3 more)

### Community 91 - "Simplify the Design"
Cohesion: 0.17
Nodes (11): Assess Current State, Code Simplification, Content Simplification, Document Removed Complexity, Information Architecture, Interaction Simplification, Layout Simplification, Plan Simplification (+3 more)

### Community 92 - "auth.ts"
Cohesion: 0.33
Nodes (5): @auth/prisma-adapter, next-auth, credentialsSchema, handlers, signOut

### Community 93 - "Colour"
Cohesion: 0.17
Nodes (11): 1. Order of operations, 2. Associations (and their limits), 3. Owning a colour, 4. Harmony systems, 5. How many colours?, 6. Practical reproduction, 7. Accessibility and contrast, 8. Library data (1,400+ real-world logos) (+3 more)

### Community 94 - "alert.tsx"
Cohesion: 0.24
Nodes (5): class-variance-authority, Alert(), alertVariants, Badge(), badgeVariants

### Community 95 - "loading-screen.tsx"
Cohesion: 0.19
Nodes (5): gsap, instant, BrandMark(), LoadingScreen(), Skeleton()

### Community 96 - "clarify.md"
Cohesion: 0.18
Nodes (10): Actions and navigation, Audit the language, Errors and permissions, Forms, Help and instructional text, Loading, empty, and success states, Rewrite by function, Set the message hierarchy (+2 more)

### Community 97 - "Generate Combined Critique Report"
Cohesion: 0.18
Nodes (11): Design Health Score, Design Specificity Verdict, Generate Combined Critique Report, Minor Observations, Overall Impression, Persona Red Flags, Priority Issues, Questions to Consider (+3 more)

### Community 98 - "Nielsen's 10 Heuristics"
Cohesion: 0.18
Nodes (11): 10. Help and Documentation, 1. Visibility of System Status, 2. Match Between System and Real World, 3. User Control and Freedom, 4. Consistency and Standards, 5. Error Prevention, 6. Recognition Rather Than Recall, 7. Flexibility and Efficiency of Use (+3 more)

### Community 99 - "document.md"
Cohesion: 0.18
Nodes (10): Pitfalls, Seed mode, Step 1: Route through new-work's workshop, Step 2: Write seed DESIGN.md, Step 3: Confirm, Style guidelines, The frontmatter: token schema, The markdown body: eight sections (canonical order) (+2 more)

### Community 100 - "polish.md"
Cohesion: 0.18
Nodes (10): 1. Establish the system, 2. Gather the evidence, 3. Triage, 4. Polish the whole path, 5. Verify and finish, Color, imagery, and icons, Content and code, Flow and hierarchy (+2 more)

### Community 101 - "quieter.md"
Cohesion: 0.18
Nodes (10): Assess Current State, Color Refinement, Composition Refinement, Motion Reduction, Plan Refinement, Refine the Design, Simplification, Verify Quality (+2 more)

### Community 102 - "impeccable"
Cohesion: 0.33
Nodes (9): impeccable script, cached_size(), check_download(), fetch_url(), hash_file(), manifest_digest(), probe_ok(), read_expected() (+1 more)

### Community 103 - "From Logo to Identity System"
Cohesion: 0.18
Nodes (10): 1. Principles of a system, 2. The kit of parts (checklist), 3. Logo systems and sub-brands, 4. Static vs. changeable (dynamic) identities, 5. Patterns and graphic devices, 6. Motion and sound, 7. Standards manual / brand guidelines, 8. Rollout and stewardship (+2 more)

### Community 104 - "Generate Report"
Cohesion: 0.29
Nodes (7): Audit Health Score, Detailed Findings by Severity, Executive Summary, Generate Report, Patterns & Systemic Issues, Platform Conformance Verdict, Positive Findings

### Community 106 - "Cognitive Load Assessment"
Cohesion: 0.20
Nodes (9): Cognitive Load Assessment, Cognitive Load Checklist, Critique rubric, Extraneous Load: Bad Design, Germane Load: Learning Effort, Heuristics Scoring Guide, Intrinsic Load: The Task Itself, The Working Memory Rule (+1 more)

### Community 107 - "Init flow"
Cohesion: 0.20
Nodes (10): Completion gate, Init flow, Step 1: Load current state, Step 2: Explore the project, Step 3: Interview for product truth, Step 4: Write PRODUCT.md, Step 5: Record workflow defaults, Step 6: Wrap up or resume (+2 more)

### Community 108 - "Testing Checklist"
Cohesion: 0.20
Nodes (9): 1. Scale, 2. Colour and value, 3. Form, 4. Distinctiveness and originality, 5. Meaning and fit, 6. Media and production, 7. Context, Recording results (+1 more)

### Community 109 - "Typography for Logos"
Cohesion: 0.20
Nodes (9): 1. Choosing a direction: type study, 2. Classification and what each voice says, 3. Custom vs. existing type, 5. Lockups: symbol + type, 6. Brand typefaces beyond the logo, 7. Licensing and technical checks, 8. Common mistakes, Contents (+1 more)

### Community 110 - "layout.tsx"
Cohesion: 0.25
Nodes (5): @lordicon/element, src_app_globals, metadata, src_app_studio, LordiconRuntime()

### Community 111 - "Accounting · Logo guidelines"
Cohesion: 0.20
Nodes (9): Accounting · Logo guidelines, Approved artwork, Approved pairings, Clear space and minimum size, Colour palette, Do, Don't, Idea (+1 more)

### Community 112 - "Common Cognitive Load Violations"
Cohesion: 0.22
Nodes (9): 1. The Wall of Options, 2. The Memory Bridge, 3. The Hidden Navigation, 4. The Jargon Barrier, 5. The Visual Noise Floor, 6. The Inconsistent Pattern, 7. The Multi-Task Demand, 8. The Context Switch (+1 more)

### Community 113 - "iOS platform"
Cohesion: 0.22
Nodes (9): Color & materials, Components & controls, iOS platform, Layout & structure, Motion, The iOS slop test, Touch targets, Typography (+1 more)

### Community 114 - "Operate mode depth (and Read notes)"
Cohesion: 0.22
Nodes (9): Color, Components, Layout, Motion, Operate mode depth (and Read notes), Product constraints, Product permissions, The product slop test (+1 more)

### Community 115 - "Shape"
Cohesion: 0.22
Nodes (8): Cadence, Confirm and stop, Phase 1: Discovery interview, Phase 2: Resolve the design direction, Phase 3: Write the brief, Round 1: purpose, people, and outcome, Round 2: material, behavior, and boundaries, Shape

### Community 116 - "typeset.md"
Cohesion: 0.06
Nodes (30): Adaptation Strategies, Assess Adaptation Challenge, Implement & Verify, Orientation & foldables, Phone → Tablet (iPad / large screens), Platform → platform (iOS ↔ Android), Web → native (porting a website or web app), Recommended Actions (+22 more)

### Community 117 - "qt"
Cohesion: 0.31
Nodes (9): de(), Ie(), Lt(), Mt(), oe(), Ot(), qt(), Re() (+1 more)

### Community 118 - "The Reference Library — Guide & Insights"
Cohesion: 0.29
Nodes (6): 1. What's inside & where, 2. How to use it well, 3. Data-driven insights, 4. Curated lessons by technique (with example files), Contents, The Reference Library — Guide & Insights

### Community 119 - "Presentation, Feedback & Delivery"
Cohesion: 0.22
Nodes (8): 1. Presentation rounds, 2. Structure of a concept presentation, 3. Talking about concepts, 4. Feedback, committees and decision-makers, 5. Final deliverables, 6. The working relationship (for designer users), Contents, Presentation, Feedback & Delivery

### Community 120 - "Redesign, Refresh & Rebrand"
Cohesion: 0.22
Nodes (8): 1. First: should it change at all?, 2. Evolution vs. revolution, 3. Equity audit, 4. Refresh techniques, 5. Mergers and new structures, 6. Launch, 7. Deliverable for a redesign proposal, Redesign, Refresh & Rebrand

### Community 121 - "<Brand> — Logo Guidelines (compact)"
Cohesion: 0.22
Nodes (8): 1. The logo, 2. Clear space, 3. Minimum size, 4. Colour, 5. Typography, 6. Don'ts, 7. Contact, <Brand> — Logo Guidelines (compact)

### Community 122 - "notice-carousel.tsx"
Cohesion: 0.09
Nodes (15): Colors, Components, Do's and Don'ts, Elevation & Depth, Layout, Overview, Shapes, Typography (+7 more)

### Community 123 - "bolder.md"
Cohesion: 0.33
Nodes (5): Before you finish, Scope is sovereign, The amplification, The skeleton test, Why it reads flat

### Community 124 - "Android platform"
Cohesion: 0.25
Nodes (8): Android platform, Color & theming, Components & motion, Layout & structure, The Android slop test, Touch targets, Typography, Verifying the build

### Community 125 - "Persona-Based Design Testing"
Cohesion: 0.25
Nodes (8): 1. Impatient Power User: "Alex", 2. Confused First-Timer: "Jordan", 3. Accessibility-Dependent User: "Sam", 4. Deliberate Stress Tester: "Riley", 5. Distracted Mobile User: "Casey", Persona-Based Design Testing, Project-Specific Personas, Selecting Personas

### Community 127 - "Extract Flow"
Cohesion: 0.25
Nodes (7): Extract Flow, Step 1: Discover the Design System, Step 2: Identify Patterns, Step 3: Plan Extraction, Step 4: Extract & Enrich, Step 5: Migrate, Step 6: Document

### Community 129 - "Impeccable Manual Edit Applier"
Cohesion: 0.29
Nodes (6): Checks, Entry Atomicity, Impeccable Manual Edit Applier, Input Contract, Output Contract, Workflow

### Community 130 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 131 - "enums.ts"
Cohesion: 0.21
Nodes (11): GET(), patchSchema, ImportStatus, Role, TaskPriority, TaskStatus, JWT, next-auth (+3 more)

### Community 134 - "Diagnostic Scan"
Cohesion: 0.33
Nodes (6): 1. Accessibility (VoiceOver / TalkBack), 2. Performance, 3. Appearance & Theming, 4. Platform Conformance (CRITICAL), 5. Adaptivity, Diagnostic Scan

### Community 135 - "Impeccable Documenter"
Cohesion: 0.40
Nodes (4): Impeccable Documenter, Input Contract, Output Contract, Workflow

### Community 136 - "$impeccable hooks"
Cohesion: 0.33
Nodes (6): Constraints, Failure modes, Flow, $impeccable hooks, Routing, Triage findings

### Community 137 - "Critiquing a Logo"
Cohesion: 0.33
Nodes (5): Common diagnoses and fixes, Critiquing a Logo, Method, Output format, Scorecard

### Community 138 - "workspace-toast.tsx"
Cohesion: 0.21
Nodes (10): animejs, aos, ScrollMotion(), StudioHeading(), StudioPage(), feedback(), ToastKind, variants (+2 more)

### Community 139 - "Handover notes"
Cohesion: 0.33
Nodes (5): Craft and checks, Font licence, Handover notes, Open items, Rationale

### Community 143 - "Digital Accounting"
Cohesion: 0.33
Nodes (5): Digital Accounting, Menjalankan aplikasi, Modul, Proyek, Validasi UI

### Community 149 - "Scoring the report"
Cohesion: 0.50
Nodes (4): Issue Severity (P0–P3), Reference Material, Score Summary, Scoring the report

### Community 151 - "Home"
Cohesion: 0.27
Nodes (5): Home(), commitImport(), previewImport(), showToast(), submitTask()

### Community 156 - "PrismaClientBaseOptions"
Cohesion: 0.67
Nodes (3): PrismaClientBaseOptions, PrismaClientOptionsWithAccelerateUrl, PrismaClientOptionsWithAdapter

## Knowledge Gaps
- **2024 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+2019 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 2439 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `optional()` connect `commit/route.ts` to `optimize.md`?**
  _High betweenness centrality (0.390) - this node is a cross-community bridge._
- **Why does `Loading Performance` connect `optimize.md` to `commit/route.ts`?**
  _High betweenness centrality (0.390) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _2024 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `User.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.013245033112582781 - nodes in this community are weakly interconnected._
- **Should `prismaNamespace.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.014598540145985401 - nodes in this community are weakly interconnected._
- **Should `live-browser.js` be split into smaller, more focused modules?**
  _Cohesion score 0.035082458770614694 - nodes in this community are weakly interconnected._
- **Should `Task.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.017543859649122806 - nodes in this community are weakly interconnected._