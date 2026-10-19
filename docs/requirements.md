# PokéVault requirements

Decision date: 2026-10-19 (Asia/Manila). Status: proposed requirements, not implemented. User's scope is the authority for this document; external feasibility evidence is in [catalog audit](catalog-audit.md).

## Product scope

Support personal collection tracking for official physical Pokémon TCG releases from 1996 through the present, across every officially released card language, region, promotion and applicable manufacturing variant. This is a long-term coverage target, not a claim that any provider currently achieves it. The official Japanese chronology dates the first expansion and starter to 1996-10-20 ([source](https://www.pokemon-card.com/20th/chronicle/), checked 2026-10-19).

Catalog Pokémon, Trainer and Energy cards, including cards depicting multiple species. Support numbered and unnumbered promos, special collections, decks, prize/event distributions, regional releases, reprints, oversized cards and official commemorative/non-tournament cards. Record product kind and eligibility separately. Exclude counterfeit, fan-made and altered cards as official catalog entries. A user may record uncertainty about a physical copy without claiming authenticity.

TCG Pocket and other digital-only records are outside the physical collection scope; retain a product-domain discriminator during ingestion so they cannot silently enter collection totals. Unreleased/announced entries must remain distinct from releases available by the audit date. Tournament legality is a dated, format- and region-specific fact, not a condition of catalog inclusion.

## Functional requirements

- Maintain an extensible language/script/locale registry and a separate market registry. A language does not imply release in every set or country. Do not equate website translation with an officially printed language.
- Distinguish species, card design, localized printing, manufactured variant and owned physical copy. Multiple copies may differ in condition, grading, purchase cost, location and provenance.
- Support native names, string collector numbers (including prefixes and leading zeros), regional set structures, artwork relationships, multiple species and unknown identification.
- Identify variants through evidence-backed attributes: finish/pattern, edition, stamp, copyright/text revision, dimensions and distribution where it changes the collectible printing. Do not generate combinations from independent boolean flags.
- Import from multiple catalog providers and manual curation. Preserve external identifiers, response snapshots, attribution, audit times and mapping confidence. Conflicting evidence must remain reviewable.
- Allow provisional catalog records and provisional owned copies while missing printings are researched. Never require a market listing or price to own a card.
- Measure metadata, images, verified printing/variant coverage and pricing separately per regional release and language. Distinguish unknown, partial, verified complete, not applicable and inaccessible.
- Show a completion percentage only against a versioned, evidenced expected checklist. Provider row counts and printed denominators alone are insufficient.
- Preserve price source, listing identity, currency, metric, observation time, provider update time, variant, language scope, condition and grading scope. Unknown price is not zero. Currency conversion is a separate dated estimate.
- Track manual valuations and acquisition costs separately from marketplace observations. Collection valuation must disclose excluded/unpriced copies and stale or ambiguous estimates.
- Preserve user ownership data across provider deletions, merges and identifier changes. Support later export, correction and backup.

## Nonfunctional requirements

Use stable internal IDs, relational integrity, idempotent imports, resumable bounded ingestion, schema-drift detection, retries with backoff and per-provider configuration. Keep credentials out of repositories and audit artifacts. Review data/image and price redistribution rights before distribution; open-source code licensing does not itself grant image or marketplace rights. Treat owned-copy data and purchase records as private.

## Acceptance gates

1. Every empirical coverage claim has source, date, scope and evidence; inaccessible checks remain unverified.
2. A reviewed fixture corpus covers early Japanese, modern international, regional Asian, historic discontinued languages, unnumbered promos, multi-species cards and detailed variants.
3. Import replay creates no duplicate printings or copies; a failed import cannot wipe prior coverage.
4. A 151-card set shell with zero card records is classified as metadata-only/partial, not complete.
5. Identical collector numbers in different languages/markets and distinct finishes remain distinct. Unknown variant does not silently become normal.
6. A missing or null price never becomes zero or a price copied from another language/edition.
7. Before any claim of universal support, independently reconcile every applicable release/language checklist and explicitly resolve scope exceptions. No universal coverage certification is possible from the current sample audit.

## Sprint 0A phase (historical)

Documentation and feasibility only. Do not build UI, mobile app, production services, database migrations or deploy anything in this phase. Schema and adapter interfaces in the architecture are proposals. Open questions and release gates are tracked in [backlog](backlog.md).

## Sprint 0B implementation update — 2026-10-19

The user subsequently authorized the Expo application foundation. Five responsive dark-theme tabs, reusable components, provider-independent TypeScript models, staged-provider contracts, explicit coverage/price states, synthetic preview data, session-only display preferences and automated checks are implemented. The Sprint 0A phase restriction above is retained as history and superseded only for this authorized scope.

The preview is read-only and offline. Real collection editing/persistence, production catalog/pricing adapters, scanning, credentials and paid integrations are not implemented. All preview ownership data is synthetic; no catalog-completeness or live-price claim is made. The audit and saved evidence remain unchanged. See [Sprint 0B](sprint-0b.md) for actual validation and remaining limitations.

### Sprint 0B completion verification — 2026-10-19

Reviewed the existing foundation and fixed the shared preview header so mock-data and no-live-prices labeling remains visible while scrolling. Five-tab browser navigation, responsive page widths, web startup/export, native JavaScript bundle exports and all 24 automated tests passed. Physical-device testing remains unperformed. See [Sprint 0B results](sprint-0b.md) for commands, evidence and qualified checks; no historical audit findings were changed.

## Sprint 1 implementation update — 2026-10-19

The user authorized replacement of the mock Pokédex with live TCGdex discovery/search, sourced card artwork/details, language/era/set/rarity/name/number controls and persistent local physical-copy add/edit/remove operations. The Sprint 0B read-only restriction above remains historical and is superseded for this scope. Mock copies are not migrated into the personal collection, and API failures never substitute preview fixtures.

Each saved copy retains a card snapshot, canonical printing/variant UUIDs, language and condition. Matching add submissions are rejected unless the user deliberately chooses an additional physical copy; removal requires confirmation. Unknown variants and conditions remain unknown. Storage failures surface errors; unreadable/version-incompatible data is preserved. Local storage has no cloud backup or account synchronization and is not encrypted application-level storage.

TCGdex coverage remains unverified; physical Pocket exclusion, empty catalogs/shells, missing images and partial requests have explicit states. Real data does not mean independently verified completeness. Scanning and pricing remain deferred. Sprint 2 is gated on review. See [Sprint 1 handoff](sprint-1.md) for actual validation and QA steps.

## 2026-10-19 — Sprint 1 artwork fix

Added shared artwork resolution and rendering across catalog, collection and details, with loading, missing-provider and failed-load states, documented format retries, stable frames and regression tests. See [artwork fix report](sprint-1-artwork-fix.md) for evidence, validation and remaining device QA. Historical audit findings remain unchanged.

### 2026-10-19 — Reviewed artwork supplementation

Four English first-page omissions now use explicit, guarded Pokémon TCG API historical image mappings with on-screen attribution. Browser loading verified; native device behavior and two Trainer Kit replacements remain unresolved. No provider identity or collection data is rewritten. See [recovery evidence and limitations](sprint-1-artwork-fix.md#browser-verified-recovery--2026-10-19-supersedes-the-preceding-recovery-conclusion).

### 2026-10-19 — Trainer Kit artwork recovery

Added exact English Skitty and Glameow 1/30 Pooka mappings for local personal, noncommercial use, with source attribution and recorded terms scope. Both catalog/detail images verified in browser; public/commercial use needs separate review and native device behavior remains unverified. All six originally reported first-page omissions are now resolved in the browser sample. See [updated artwork report](sprint-1-artwork-fix.md).
