# Graph Report - KAB  (2026-11-22)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2709 nodes · 4708 edges · 83 communities (58 shown, 25 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 84 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- User.ts
- prismaNamespace.ts
- Task.ts
- live-browser.js
- AssetEquipmentMapping.ts
- ImportBatch.ts
- TaskEvent.ts
- Account.ts
- connectSSE
- FinancialLine.ts
- Asset.ts
- Session.ts
- setLiveState
- Equipment.ts
- commonInputTypes.ts
- modern-screenshot.umd.js
- buildInsertConfigureRow
- VerificationToken.ts
- syncPageChatFocus
- initGlobalBar
- renderDesignVisual
- package.json
- prismaNamespaceBrowser.ts
- showToast
- migration.sql
- svglib.py
- render_png.py
- dependencies
- workspace.tsx
- updatePendingCounter
- audit
- client.ts
- rejectUnlessSignedIn
- captureElementToBlob
- components.json
- createLiveBrowserDomHelpers
- createLiveBrowserSessionState
- PrismaClient
- resolveLiveInjectionAnchor
- compilerOptions
- presentation_board.py
- AccountDelegate
- AssetDelegate
- AssetEquipmentMappingDelegate
- EquipmentDelegate
- FinancialLineDelegate
- ImportBatchDelegate
- SessionDelegate
- TaskDelegate
- TaskEventDelegate
- UserDelegate
- VerificationTokenDelegate
- actOnAgentTarget
- onAnnotDown
- build_catalog.py
- commit/route.ts
- enums.ts
- scheduleAcceptCleanup
- devDependencies
- preview_sheet.py
- export_variants.py
- impeccable
- next
- auth.ts
- Prisma__UserClient
- scripts
- @prisma/client
- live-browser-ignores.js
- button.tsx
- Prisma__AssetEquipmentMappingClient
- Prisma__TaskClient
- Prisma__ImportBatchClient
- Prisma__TaskEventClient
- Prisma__AccountClient
- Prisma__AssetClient
- Prisma__EquipmentClient
- Prisma__FinancialLineClient
- Prisma__SessionClient
- allowScripts
- Prisma__VerificationTokenClient
- PrismaClientBaseOptions
- hasTextRows
- { GET, POST }

## God Nodes (most connected - your core abstractions)
1. `connectSSE()` - 38 edges
2. `setLiveState()` - 34 edges
3. `showToast()` - 33 edges
4. `resumeSession()` - 33 edges
5. `initGlobalBar()` - 30 edges
6. `el()` - 29 edges
7. `handleKeyDown()` - 28 edges
8. `buildInsertConfigureRow()` - 28 edges
9. `cleanup()` - 27 edges
10. `injectSvelteComponentsFromManifest()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `teardown()` --indirect_call--> `stopFocusOutIntoChrome()`  [INFERRED]
  .agents/skills/impeccable/scripts/live-browser.js → .agents/skills/impeccable/scripts/live-browser-dom.js
- `enableInlineEdit()` --indirect_call--> `own()`  [INFERRED]
  .agents/skills/impeccable/scripts/live-browser.js → .agents/skills/impeccable/scripts/live-browser-dom.js
- `removalOriginalText()` --indirect_call--> `own()`  [INFERRED]
  .agents/skills/impeccable/scripts/live-browser.js → .agents/skills/impeccable/scripts/live-browser-dom.js
- `GET()` --calls--> `rejectUnlessSignedIn()`  [EXTRACTED]
  src/app/api/team/route.ts → src/lib/server-auth.ts
- `GET()` --calls--> `rejectUnlessRole()`  [EXTRACTED]
  src/app/api/imports/route.ts → src/lib/server-auth.ts

## Import Cycles
- None detected.

## Communities (83 total, 25 thin omitted)

### Community 0 - "User.ts"
Cohesion: 0.01
Nodes (150): AggregateUser, BoolFieldUpdateOperationsInput, DateTimeFieldUpdateOperationsInput, EnumRoleFieldUpdateOperationsInput, GetUserAggregateType, GetUserGroupByPayload, IntFieldUpdateOperationsInput, NullableDateTimeFieldUpdateOperationsInput (+142 more)

### Community 1 - "prismaNamespace.ts"
Cohesion: 0.01
Nodes (136): AccountScalarFieldEnum, AnyNull, Args, AssetEquipmentMappingScalarFieldEnum, AssetScalarFieldEnum, At, AtLeast, AtLoose (+128 more)

### Community 2 - "Task.ts"
Cohesion: 0.02
Nodes (113): AggregateTask, DecimalFieldUpdateOperationsInput, EnumTaskPriorityFieldUpdateOperationsInput, EnumTaskStatusFieldUpdateOperationsInput, GetTaskAggregateType, GetTaskGroupByPayload, Task$assigneeArgs, Task$eventsArgs (+105 more)

### Community 3 - "live-browser.js"
Cohesion: 0.04
Nodes (110): addManualContextText(), applyEditing(), applyGlobalBarLabelState(), applyParamDefaults(), applyParamValue(), applyPlaceholderSizingStyles(), applySavedParamValues(), bindEditBadgeProxy() (+102 more)

### Community 4 - "AssetEquipmentMapping.ts"
Cohesion: 0.02
Nodes (105): AggregateAssetEquipmentMapping, AssetEquipmentMapping$approvedByArgs, AssetEquipmentMappingAggregateArgs, AssetEquipmentMappingAssetIdEquipmentIdEffectiveFromCompoundUniqueInput, AssetEquipmentMappingCountAggregateInputType, AssetEquipmentMappingCountAggregateOutputType, AssetEquipmentMappingCountArgs, AssetEquipmentMappingCountOrderByAggregateInput (+97 more)

### Community 5 - "ImportBatch.ts"
Cohesion: 0.02
Nodes (96): AggregateImportBatch, EnumImportStatusFieldUpdateOperationsInput, EnumImportTypeFieldUpdateOperationsInput, GetImportBatchAggregateType, GetImportBatchGroupByPayload, ImportBatch$financialLinesArgs, ImportBatchAggregateArgs, ImportBatchAvgAggregateInputType (+88 more)

### Community 6 - "TaskEvent.ts"
Cohesion: 0.02
Nodes (89): AggregateTaskEvent, GetTaskEventAggregateType, GetTaskEventGroupByPayload, NullableEnumTaskStatusFieldUpdateOperationsInput, TaskEventAggregateArgs, TaskEventCountAggregateInputType, TaskEventCountAggregateOutputType, TaskEventCountArgs (+81 more)

### Community 7 - "Account.ts"
Cohesion: 0.02
Nodes (81): AccountAggregateArgs, AccountAvgAggregateInputType, AccountAvgAggregateOutputType, AccountAvgOrderByAggregateInput, AccountCountAggregateInputType, AccountCountAggregateOutputType, AccountCountArgs, AccountCountOrderByAggregateInput (+73 more)

### Community 8 - "connectSSE"
Cohesion: 0.06
Nodes (80): abortSvelteComponentInjection(), applyPlaceholderDimensions(), applySavedSessionMeta(), clampVariantIndex(), clearHandled(), clearSession(), closedClipPath(), completeParameterGenerationIfReady() (+72 more)

### Community 9 - "FinancialLine.ts"
Cohesion: 0.03
Nodes (79): AggregateFinancialLine, FinancialLineAggregateArgs, FinancialLineAvgAggregateInputType, FinancialLineAvgAggregateOutputType, FinancialLineAvgOrderByAggregateInput, FinancialLineCountAggregateInputType, FinancialLineCountAggregateOutputType, FinancialLineCountArgs (+71 more)

### Community 10 - "Asset.ts"
Cohesion: 0.03
Nodes (78): AggregateAsset, Asset$mappingsArgs, AssetAggregateArgs, AssetAssetNumberSubNumberCompoundUniqueInput, AssetAvgAggregateInputType, AssetAvgAggregateOutputType, AssetAvgOrderByAggregateInput, AssetCountAggregateInputType (+70 more)

### Community 11 - "Session.ts"
Cohesion: 0.03
Nodes (73): AggregateSession, GetSessionAggregateType, GetSessionGroupByPayload, SessionAggregateArgs, SessionCountAggregateInputType, SessionCountAggregateOutputType, SessionCountArgs, SessionCountOrderByAggregateInput (+65 more)

### Community 12 - "setLiveState"
Cohesion: 0.08
Nodes (71): applyLiveBarPreference(), beginNewLiveConfiguration(), buildInsertPlaceholderSnapshotFromDom(), buildPickedAnchorSnapshot(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), cleanup() (+63 more)

### Community 13 - "Equipment.ts"
Cohesion: 0.03
Nodes (70): AggregateEquipment, Equipment$mappingsArgs, EquipmentAggregateArgs, EquipmentCountAggregateInputType, EquipmentCountAggregateOutputType, EquipmentCountArgs, EquipmentCountOrderByAggregateInput, EquipmentCountOutputType (+62 more)

### Community 14 - "commonInputTypes.ts"
Cohesion: 0.03
Nodes (69): BoolFilter, BoolWithAggregatesFilter, DateTimeFilter, DateTimeNullableFilter, DateTimeNullableWithAggregatesFilter, DateTimeWithAggregatesFilter, DecimalFilter, DecimalNullableFilter (+61 more)

### Community 15 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 16 - "buildInsertConfigureRow"
Cohesion: 0.07
Nodes (55): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+47 more)

### Community 17 - "VerificationToken.ts"
Cohesion: 0.04
Nodes (53): AggregateVerificationToken, GetVerificationTokenAggregateType, GetVerificationTokenGroupByPayload, VerificationTokenAggregateArgs, VerificationTokenCountAggregateInputType, VerificationTokenCountAggregateOutputType, VerificationTokenCountArgs, VerificationTokenCountOrderByAggregateInput (+45 more)

### Community 18 - "syncPageChatFocus"
Cohesion: 0.10
Nodes (45): armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), clearSteerAwaitTimer(), clearSteerFocusRecoverTimer(), collapsePageChat(), expandPageChat(), finishVoiceSession() (+37 more)

### Community 19 - "initGlobalBar"
Cohesion: 0.09
Nodes (41): agentHasWorkInFlight(), agentStatusText(), barPaletteForTheme(), brandMarkSvg(), buildParamsPanel(), buildSavingRow(), buildSteerProcessingDots(), buildSteerQueueHint() (+33 more)

### Community 20 - "renderDesignVisual"
Cohesion: 0.07
Nodes (41): buildCollapsible(), buildColorModels(), buildDesignHeader(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), copyToClipboard(), cssSafe() (+33 more)

### Community 21 - "package.json"
Cohesion: 0.06
Nodes (35): eslintConfig, name, private, type, version, animejs, aos, @auth/prisma-adapter (+27 more)

### Community 22 - "prismaNamespaceBrowser.ts"
Cohesion: 0.05
Nodes (35): Account, Asset, AssetEquipmentMapping, $Enums, Equipment, FinancialLine, ImportBatch, Session (+27 more)

### Community 23 - "showToast"
Cohesion: 0.08
Nodes (35): abandonForeignSession(), abandonSupersededGo(), applyOriginalAttrsToSvelteAnchor(), captureAndEmit(), checkpointPayload(), commitAcceptedSvelteComponentToDom(), compileShader(), componentModuleCandidates() (+27 more)

### Community 24 - "migration.sql"
Cohesion: 0.12
Nodes (32): "Account", "Asset", Asset_assetNumber_subNumber_key, Asset_location_costCenter_idx, Asset_name_idx, "AssetEquipmentMapping", AssetEquipmentMapping_assetId_effectiveTo_idx, AssetEquipmentMapping_assetId_equipmentId_effectiveFrom_key (+24 more)

### Community 25 - "svglib.py"
Cohesion: 0.10
Nodes (27): apply(), _arc_points(), bbox_of(), contrast_ratio(), document_geometry(), hex_to_rgb(), hue_family(), iter_shapes() (+19 more)

### Community 26 - "render_png.py"
Cohesion: 0.10
Nodes (26): available_backends(), _chrome(), find_chrome(), main(), png_size(), _qlmanage(), _qlmanage_once(), Like tempfile.TemporaryDirectory, but cleanup never raises (Windows can keep… (+18 more)

### Community 27 - "dependencies"
Cohesion: 0.07
Nodes (30): dependencies, animejs, aos, @auth/prisma-adapter, @base-ui/react, bcryptjs, class-variance-authority, clsx (+22 more)

### Community 28 - "workspace.tsx"
Cohesion: 0.08
Nodes (13): public_accounting_orbit, lottie-react, lucide-react, react, swiper, instant, Area, assetRows (+5 more)

### Community 29 - "updatePendingCounter"
Cohesion: 0.17
Nodes (27): clearStoredManualApplyState(), fetchPendingCount(), handleManualEditActivity(), hidePendingApplyDock(), manualApplyLoadingText(), manualApplyStateKey(), manualEditEventForCurrentPage(), numberOrNull() (+19 more)

### Community 30 - "audit"
Cohesion: 0.12
Nodes (24): analyse(), embed(), main(), Nested <svg> that fits the file into the box; ids are prefixed so several files…, audit(), load_stats(), main(), print_report() (+16 more)

### Community 31 - "client.ts"
Cohesion: 0.09
Nodes (22): email, prisma, bcryptjs, ref_node_path, ref_node_process, ref_node_url, @prisma/adapter-pg, Account (+14 more)

### Community 32 - "rejectUnlessSignedIn"
Cohesion: 0.16
Nodes (18): zod, GET(), offsetPeriod(), DELETE(), mappingSchema, POST(), assetSchema, GET() (+10 more)

### Community 33 - "captureElementToBlob"
Cohesion: 0.12
Nodes (22): absolutizeUrls(), averageRgb01(), bufferToBase64(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob(), collectFontCssText(), collectFontFaces() (+14 more)

### Community 34 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 35 - "createLiveBrowserDomHelpers"
Cohesion: 0.16
Nodes (15): createLiveBrowserDomHelpers(), activeElementDeep(), cloneWithoutChrome(), copyTextViaSelection(), cssId(), liveUiRoot(), makeFrozenAnchor(), raiseHitModal() (+7 more)

### Community 36 - "createLiveBrowserSessionState"
Cohesion: 0.19
Nodes (17): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+9 more)

### Community 38 - "resolveLiveInjectionAnchor"
Cohesion: 0.16
Nodes (19): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), elementMatchesOriginalMarkup() (+11 more)

### Community 39 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 40 - "presentation_board.py"
Cohesion: 0.15
Nodes (15): Build a one-page concept overview (SVG + PNG) to show the user BEFORE any kit…, wrap(), main(), mock_html(), pick_mockups(), White text while it keeps 3:1 on the background, near-black below that (white…, c: dict with sym, lock, avatar, color, cls, name, tag, nav., Build a client-ready concept presentation (single HTML file, no dependencies).… (+7 more)

### Community 52 - "actOnAgentTarget"
Cohesion: 0.29
Nodes (17): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), declineAgentTargetBusy(), declineAgentTargetUnresolvable() (+9 more)

### Community 53 - "onAnnotDown"
Cohesion: 0.20
Nodes (17): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), clampPlaceholderSize(), finalizeEditingPin(), initAnnotOverlay(), localCoords() (+9 more)

### Community 54 - "build_catalog.py"
Cohesion: 0.17
Nodes (13): build_stats(), dist(), main(), pct(), Rebuild the reference-library catalog from the SVG files + visual…, load_catalog(), main(), matches() (+5 more)

### Community 55 - "commit/route.ts"
Cohesion: 0.32
Nodes (13): optional(), POST(), POST(), requiredFields, ImportType, cellValue(), normalizePeriod(), normalizeText() (+5 more)

### Community 56 - "enums.ts"
Cohesion: 0.21
Nodes (11): GET(), patchSchema, ImportStatus, Role, TaskPriority, TaskStatus, JWT, next-auth (+3 more)

### Community 57 - "scheduleAcceptCleanup"
Cohesion: 0.23
Nodes (14): acceptedDomAlreadyClean(), clearHandledWrapperReloadStamp(), commitAcceptedVariantToDom(), deferredRecoverySuperseded(), ensureAcceptedDomClean(), findAcceptedRuntimeWrappers(), handledWrapperReloadKey(), reloadAfterMissingAcceptedDom() (+6 more)

### Community 58 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, eslint-config-next, prisma, shadcn, tailwindcss, @tailwindcss/turbopack, tsx (+6 more)

### Community 59 - "preview_sheet.py"
Cohesion: 0.28
Nodes (12): compare_block(), concept_block(), img(), main(), Generate an HTML test sheet for one or more logo SVGs (no dependencies). Shows…, refs_for_industry(), shelf_block(), tile() (+4 more)

### Community 60 - "export_variants.py"
Cohesion: 0.24
Nodes (9): inner_markup(), main(), Export the standard delivery variants of a logo from one master SVG (no…, Centre the artwork's real bounding box on a 256×256 canvas (optionally on a…, recolor(), set_title(), square_wrap(), os (+1 more)

### Community 61 - "impeccable"
Cohesion: 0.33
Nodes (9): impeccable script, cached_size(), check_download(), fetch_url(), hash_file(), manifest_digest(), probe_ok(), read_expected() (+1 more)

### Community 62 - "next"
Cohesion: 0.18
Nodes (7): nextConfig, next, GET(), POST(), userSchema, src_app_globals, metadata

### Community 63 - "auth.ts"
Cohesion: 0.25
Nodes (7): next-auth, authenticate(), instant, credentialsSchema, handlers, signIn, signOut

### Community 65 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, db:generate, db:migrate, db:seed, db:studio, dev, lint (+1 more)

### Community 66 - "@prisma/client"
Cohesion: 0.25
Nodes (6): ref_node_buffer, @prisma/client, config, decodeBase64AsWasm(), LogOptions, PrismaClientConstructor

### Community 67 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 68 - "button.tsx"
Cohesion: 0.33
Nodes (5): @base-ui/react, class-variance-authority, cn, Button(), buttonVariants

### Community 78 - "allowScripts"
Cohesion: 0.50
Nodes (4): allowScripts, esbuild@0.28.2, prisma@7.10.1, @prisma/engines@7.10.1

### Community 80 - "PrismaClientBaseOptions"
Cohesion: 0.67
Nodes (3): PrismaClientBaseOptions, PrismaClientOptionsWithAccelerateUrl, PrismaClientOptionsWithAdapter

## Knowledge Gaps
- **1379 isolated node(s):** `AggregateUser`, `BoolFieldUpdateOperationsInput`, `DateTimeFieldUpdateOperationsInput`, `EnumRoleFieldUpdateOperationsInput`, `GetUserAggregateType` (+1374 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1731 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@prisma/client` connect `@prisma/client` to `User.ts`, `prismaNamespace.ts`, `Task.ts`, `AssetEquipmentMapping.ts`, `ImportBatch.ts`, `TaskEvent.ts`, `Account.ts`, `FinancialLine.ts`, `Asset.ts`, `Session.ts`, `Equipment.ts`, `commonInputTypes.ts`, `VerificationToken.ts`, `package.json`, `prismaNamespaceBrowser.ts`, `client.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `initGlobalBar()` (e.g. with `hideAgentPollTooltip()` and `onDetectMessage()`) actually correct?**
  _`initGlobalBar()` has 9 INFERRED edges - model-reasoned connections that need verification._
- **What connects `AggregateUser`, `BoolFieldUpdateOperationsInput`, `DateTimeFieldUpdateOperationsInput` to the rest of the system?**
  _1379 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `User.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.013245033112582781 - nodes in this community are weakly interconnected._
- **Should `prismaNamespace.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.014598540145985401 - nodes in this community are weakly interconnected._