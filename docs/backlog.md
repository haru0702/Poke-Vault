# PokéVault backlog

Planning date: 2026-10-19. The original Sprint 0A items below remain proposed unless the Sprint 0B status section explicitly narrows their implementation status. Priority reflects the user's universal physical-catalog objective and [audit evidence](catalog-audit.md); it is not a promise of exhaustive provider support. The user authorized Sprint 0B foundation work on 2026-10-19; broader production work remains deferred.

| ID | Priority | Work | Acceptance evidence / dependencies |
| --- | --- | --- | --- |
| CAT-001 | P0 | Establish official release, language and market registry | Independently sourced release periods and applicability; distinguish language, script, locale aliases, market and digital domain. Historic exceptions remain unknown until evidenced. |
| CAT-002 | P0 | Japanese DP/DPt/BW gap recovery | Reconcile official chronology and exact release checklists with alternate providers/curated records; no replacement by English equivalents. Depends on CAT-001. |
| CAT-003 | P0 | Resolve Simplified Chinese `CSM1aC` shell | Validate market/date/checklist; enumerate missing printing identities; source native data. Do not use provider total as independent denominator. |
| CAT-004 | P0 | Resolve `pt`/`pt-br`/`pt-pt` and `es`/`es-mx` routing | Compare actual physical cards, dates and regional localization; retain provider aliases and avoid duplicate releases. |
| CAT-005 | P0 | Define checklist and completeness semantics | Versioned expected printing/variant identities; unknown denominator yields no percentage. Define not applicable, unknown, inaccessible, shell, partial and verified complete with evidence. |
| CAT-006 | P0 | Qualify secondary catalog and pricing providers | Capability/terms matrix, access verification, language/region samples, promo/variant matching and overlap/conflict assessment. Alternatives are not presumed available. |
| CAT-007 | P0 | Rights/attribution review | Record data, images and market-feed terms independently; define permitted storage, caching, redistribution and contribution practices. No published asset reuse until resolved. |
| MOD-001 | P0 | Review proposed domain schema | Species-free Trainers/Energy, multi-species cards, string numbers, unnumbered promos, regional numbering, detailed variant collisions and unknown copy identification all represented. Depends on CAT-005. |
| ING-001 | P1 | Design and later implement TCGdex catalog adapter | Capabilities, pagination, snapshots, schema versions, bounded requests, resume checkpoints, idempotent imports and errors distinct from empty data. Implementation is a later phase. |
| ING-002 | P1 | Full card-detail and image availability census | Traverse discovered IDs; count missing fields and errors per release/language; do not assume image URL means valid image. Keep official denominators separate. Depends on ING-001, CAT-007. |
| CAT-008 | P1 | Promo/campaign registry | Reconcile Japanese 25th promo checklist; extend to trophy/prize, event/staff, prerelease, movie/magazine, retail, Pokémon Center, decks and unnumbered releases. Source physical differences; don't duplicate identical distribution copies. |
| CAT-009 | P1 | Historic and regional release audits | Dutch, Polish, Russian, early Korean/Traditional Chinese, Indonesian, Thai and other confirmed official languages; verified release-specific checklist results and explicitly unknown exceptions. |
| VAR-001 | P1 | Physical variant taxonomy and reconciliation | Foil pattern, edition, stamp, copyright/text revision, size, metal/lenticular and documented errors/corrections; no boolean Cartesian-product expansion. |
| ID-001 | P1 | Identity resolution and curation workflow | Reviewed candidate mappings, provenance per fact, reversible merges, scoped external IDs and stable internal IDs; no silent ownership rewrites. |
| PRICE-001 | P1 | Verify exact market mappings | Check repeated mappings in sampled Charizard/Furret variants; broad listings cannot become exact quotes. Retain market origin and transport provider separately. |
| PRICE-002 | P1 | Pricing coverage census | Per eligible variant/language/market, count mapped, priced, null, omitted, ambiguous, stale and failed; preserve currency, metric, condition, grading scope and timestamps. No zero-fill. |
| PRICE-003 | P2 | Evaluate regional/graded/historical feeds | Verify access, licensing, identity and actual coverage; no assumption of direct marketplace credentials, realized sales or price history. |
| OWN-001 | P2 | Design owned-copy workflows for later implementation | Individual copies, condition history, grades, private acquisition allocations, storage, disposal, backup/export and provisional identification; independent of price availability. |
| QA-001 | P1 | Meaningful fixture and reconciliation suite | Preserve shell, zero-padded ID, null pricing, duplicated provider variant ID across cards, multiple species, digital exclusion, unknown language applicability and provider schema drift. Depends on MOD-001/ING-001. |
| OPS-001 | P2 | Re-audit procedure | On-demand scheduled-work proposal only: no automation created. Version manifests/checklists, detect changes, retain prior snapshots and classify announced releases. |
| UI-001 | Sprint 0B foundation done; production deferred | Five-tab Expo mobile foundation | Authorized by user after Sprint 0A. Offline preview implemented; persistent editing/scanning/live integrations remain future work. |

## Exit criteria for the feasibility phase

The documentation phase ends with evidence-backed findings and a viable gap-management design, not a false claim that every card has been found. Current deliverables satisfy that phase; the full census and independent official release registry remain future work. No global completion statistic is approved.

## Open decisions

- Exact boundaries for official ancillary/commemorative cards and accidentally distributed errors; retain classification until resolved.
- Whether historical European/Brazilian Portuguese releases require distinct canonical locale identities beyond market/revision differences.
- Which secondary sources have adequate rights, access and editorial quality for the known gaps.
- What freshness thresholds and confidence labels to use for each market/metric; thresholds must be configurable and justified.
- How much manual curation the personal project can sustain, and which release/language slices should be completed first without narrowing the long-term target.

## Sprint 0B status — 2026-10-19

| Item | Status | Scope / remaining work |
| --- | --- | --- |
| FND-001 | Done | Expo SDK 57, Expo Router, TypeScript, npm lockfile, five bottom tabs. |
| FND-002 | Done | Responsive dark UI, safe areas, mock labeling, search/filters/sorting and session-only preferences. Native device checks still needed. |
| MOD-001 | Foundation types done | Entities and UUID identity boundary implemented. Relational schema, migrations, storage and full editorial review remain open. |
| CAT-005 | Foundation safeguards done | Unknown denominators yield no percentage; positive independent checklist evidence required. No official global registry or completed reconciliation. |
| ID-001 | Foundation boundary done | Parent/locale/provider-scoped upstream keys and validated non-destructive canonical upserts. Production candidate matching, mapping review and reversible merges remain open. |
| QA-001 | Foundation tests done | Unit and Router integration tests; browser preview and native bundle validation. Official full-census fixtures and physical-device testing remain open. |
| ING-001 | Contracts only | Separate catalog/pricing interfaces and synthetic adapter exist; no TCGdex production adapter or live sync. |
| OWN-001 | Models and preview only | Owned-copy/condition/grade/acquisition types. No persistent personal storage, user editing or copy-deletion workflow. |
| PRICE-001 / PRICE-002 | Open | Exact marketplace qualification and full pricing coverage census unimplemented; every preview copy is unpriced. |
| CAT-001 through CAT-004, CAT-006 through CAT-009, VAR-001 | Open | Independent official registry, known gaps, rights, alternate providers and promo/variant reconciliation remain unresolved. |

Next integration priority: verify release/language applicability and curated shell/missing-era fixtures; qualify source rights; implement a staged catalog adapter and persistent collection repository with no cascading catalog deletions. Production scanning, paid providers, app-store deployment and full-completeness claims are not part of Sprint 0B. See [Sprint 0B verification](sprint-0b.md).

### Sprint 0B completion review — 2026-10-19

FND-002 mock provenance is now fixed above scrolling content. The existing 24 tests, TypeScript, lint, web export and iOS/Android bundle exports passed; browser checks exercised all tabs and 320/768/1280 px page widths. Added the previously missing [Sprint 0B handoff](sprint-0b.md) with current screenshots and actual limitations. Physical-device acceptance remains open and must not be marked done from bundle export. All 194 protected Sprint 0A files passed hash verification unchanged.
