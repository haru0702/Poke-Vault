# PokéVault architecture proposal

Design date: 2026-10-19. Status: proposal; no application or migrations implemented. Inputs: user requirements and [dated audit](catalog-audit.md). The following choices are engineering recommendations, not provider guarantees.

## Provider-independent catalog

Use PostgreSQL for canonical relationships, constraints, audit history and indexed JSONB for unmodeled provider fields. Start with a modular backend and background ingestion jobs rather than separate services. Store immutable provider snapshots in a content-addressed evidence store; application queries use reviewed canonical data, not live upstream calls.

Ingestion flow: provider adapter → raw snapshot → validated staging → identity candidates → reviewed mapping → canonical catalog → coverage report. Pricing uses a parallel flow into observations after marketplace identity resolution. A provider outage must not prevent collection access. Separate catalog ingestion, market ingestion and owned-copy mutation permissions.

Catalog adapter contract: `capabilities()`, `listSeries(locale, cursor)`, `listSets(locale, cursor)`, `getSet(id, locale)`, `getCard(id, locale)`, optional `getChanges(since)`. Responses carry provider ID, external ID, requested locale, actual locale if known, fetched time, upstream update time, raw evidence reference and cursor. Capabilities describe language/region/domain coverage and limitations; they are claims to audit, not completeness proofs.

Pricing adapter contract: `resolveListing(variant, market, locale)` returns candidates and confidence; `getObservations(listingIds, since)` returns metric/currency/timestamps/scope. Do not assume providers support search, history or every language. A TCGdex adapter may expose both contracts while retaining TCGdex as transport source and Cardmarket/TCGplayer as market origin.

Use retry/backoff, bounded concurrency, explicit pagination termination, checkpointing, raw payload hashes and atomic per-release promotion from staging. Record HTTP errors independently of empty successful arrays. Never delete canonical records because a single fetch is empty or inaccessible. Cache within permitted terms; compare snapshots on later runs. Contract tests should use captured shapes and meaningful identity/error cases, not assert that mutable market prices equal fixtures.

## Proposed relational schema

All entity IDs below are internal UUIDs unless a natural key is specified. Tables carry created/updated timestamps; factual assertions reference evidence. `?` means nullable/unknown, never implicitly false. Use foreign keys and controlled vocabularies without hard-coding today's language or variant list into database enums.

| Table | Principal fields and constraints |
| --- | --- |
| `language` | `id`, `bcp47_tag UNIQUE`, language, script, region qualifier, display name; provider aliases live separately. `zh-Hant`/`zh-Hans` describe script, not release market. |
| `market` | `id`, code UNIQUE, name; supports countries and multi-country distribution regions. |
| `species` | `id`, national_dex_number UNIQUE, canonical name; optional form table with species FK and form key. Species IDs are independent of card IDs. |
| `species_name` | species FK, language FK, localized name; UNIQUE(species, language). |
| `era` | id, canonical name, chronology scope, approximate/date bounds and evidence; provider series mappings may be many-to-many. |
| `expansion` | id, product domain (physical/digital), canonical family name, kind (expansion/promo/deck/etc.); does not imply common numbering across regions. |
| `release` | id, expansion FK, language FK, market FK, release date?, date precision, status (announced/released/unverified), expected checklist revision?; separate rows when regional checklists differ. |
| `release_era` | release FK, era FK, relation/evidence; avoids forcing Japanese and international series into the same taxonomy. |
| `release_name` | release FK, display-language FK, localized title, source; a translated title does not create a card-language release. |
| `card_design` | id, category (Pokémon/Trainer/Energy/etc.), concept identifier?; groups related designs without asserting every localization is identical. |
| `artwork` / `design_artwork` | artwork id, artist?, evidence; design FK, artwork FK, role; reused artwork is not printing identity. |
| `printing` | id, release FK, design FK?, collector_number TEXT?, number_suffix?, native_name, rules/text revision?, face/layout signature?, provisional flag; allow unnumbered cards and duplicate printed numbers. |
| `printing_species` | printing FK, species FK, form FK?, role, position; UNIQUE(printing, species, form, role) using null-safe uniqueness. Trainers/Energy may have no species; multiple species are valid. |
| `variant` | id, printing FK, normalized identity signature, identity status, dimensions?, finish?, edition?, copyright revision?; UNIQUE(printing, identity_signature) only for resolved signatures. Unknown is not a manufactured variant. |
| `variant_attribute` | variant FK, attribute definition FK, value, evidence; typed definitions for foil pattern, stamps, text correction, card back, size, etc. Enforce cardinality for single-value attributes; stamps may have many. |
| `distribution` / `variant_distribution` | campaign/event/product, territory, dates, evidence; many-to-many variant link. Same variant sold in two products stays one variant unless physical evidence distinguishes it. |
| `asset` | id, printing/variant FK as applicable, face, URL, checksum?, rights status, language, evidence; images and data can have different licenses. |
| `owned_copy` | id, owner FK, printing FK?, variant FK?, identification status, user label, condition?, location?, acquired_at?, purchase allocation?, disposal status; exactly one row per physical object. Composite FK ensures variant belongs to selected printing; unidentified copies may lack both. |
| `copy_grade` | id, copy FK, company, grade TEXT, certificate?, graded_at?, superseded_at?; grading events do not change catalog variant. |
| `acquisition` / `acquisition_item` | transaction, date?, original decimal cost/currency?, fees?, evidence/private notes; allocation per copy with method and unallocated remainder. Bundle total must not be copied as each item's cost. |
| `provider` | id, name, provider kind, base URL, terms reference, capabilities and last review. |
| `ingestion_run` / `source_record` | provider FK, run status/times, requested URL/locale, HTTP status, upstream time?, content hash, raw storage reference; UNIQUE(provider, external key, locale, payload hash). |
| `external_mapping` | provider FK, external entity type/key, locale/domain, internal typed entity FK, status/confidence, valid_from/to, evidence; resolved active source identity maps to one target, ambiguous mappings remain candidates. Implement typed mapping tables or enforce target references with FK-backed entity registry. |
| `fact_assertion` | subject FK, field path, asserted value, source_record FK, confidence, reviewed_by?, supersedes?; preserve disagreements and selected-value rationale. |
| `checklist_revision` / `checklist_entry` | release FK, revision, source, scope, expected printing/variant identities, applicability status, verified date; variant checklist is separate from base printing checklist. |
| `coverage_snapshot` | provider/release/language, run, denominator revision?, expected?, matched, missing, extra, fields/images/variants/pricing counts, status, errors; ratios nullable without trusted denominator. |
| `market_listing` | origin provider FK, external product ID, market, language scope?, condition scope?, grading scope?, variant mapping status and evidence. Multiple variants may map to a broad product; such mapping is not exact pricing eligibility. |
| `price_observation` | listing FK, transport provider FK, source_record FK, metric, amount DECIMAL?, currency, observed_at, provider_updated_at?, metric period?, availability reason, scope/mapping confidence; append-only and deduplicated by source identity/time/metric. |
| `manual_valuation` | copy FK or variant FK, owner FK, amount/currency, as_of, method, notes; never masquerades as an external quote. |
| `fx_observation` | source, currency pair, rate DECIMAL, as_of; conversions reference the original quote and FX record. |

Use an optional `printing_relationship` table for exact localized equivalents, artwork reuse, reprints and disputed candidate links, each with source/confidence. Never equate cards merely because species, translated name or set position match. Include legal-format assertions with jurisdiction and effective dates if legality is later exposed.

## Identity and reconciliation

Prefer external IDs only within `(provider, entity type, language, domain)`. A detailed TCGdex variant key must also include parent card ID: the audit observed the same `variantId` on different cards. Do not use provider variant IDs as globally unique canonical keys.

Match candidates using regional release, native collector number, image/layout, language, copyright, finish and stamp. Preserve leading zeros, punctuation, capitalization and original provider IDs. Candidate scoring can assist review; never auto-merge on names alone. Store reversible merge redirects and audit history, with affected owned copies retained. Catalog correction cannot silently rewrite user condition, grade or purchase information.

Legacy booleans provide incomplete variant hints. Detailed variant arrays are better candidates, but unknown attributes and conflicting marketplace IDs require evidence. Do not create every combination of holo × first edition × stamp. Never reuse a broad card-level price as an exact variant quote by default.

## Coverage and pricing policies

Compute separate printing, variant, image, metadata and price metrics for `(release, language, provider, as_of)`. Known unsupported release/language combinations are not missing records; unknown applicability is not excluded from the backlog. Preserve expected denominator version and record-level missing identities. Provider totals are useful diagnostics, not independent denominators.

Price selection requires compatible language scope, finish, edition, condition, grading and metric, followed by freshness and mapping confidence. When exact compatibility is unavailable, return unpriced or an explicitly labeled broad-market estimate. Display source currency; optional home-currency valuation uses dated FX. Do not average incompatible marketplace metrics or sum both root and variant prices for one copy. Expose priced/unpriced/ambiguous/stale counts with any valuation.

## Filling gaps

Build an independent release registry from official regional product/checklist pages and historical archives; attach reviewable checklist revisions. Add licensed secondary catalog adapters after checking capability and terms, plus a curated local provider for evidence-backed missing records. Keep official names and Japanese/regional numbering rather than manufacturing English equivalents. Obtain legitimate scans for missing images separately. Submit upstream corrections only when authorized; local curation need not wait for acceptance. Backfill newly resolved mappings, recompute coverage and retain prior snapshots.

Alternative providers are candidates, not integrated or certified by this audit. Evaluate catalog overlap, licensing, per-language release identity, promos and variant detail with the same corpus before adoption. Pricing providers need independent marketplace/region checks and permission to access and retain observations. Do not assume direct marketplace API credentials or historical feeds are available.

## Sprint 0B implementation update — 2026-10-19

The approved client foundation now lives in `src/app/`, `src/components/`, `src/theme/`, `src/domain/`, `src/providers/`, `src/data/` and `src/state/`. Expo SDK 57 uses file-based Expo Router layouts and five bottom tabs. Preview state provides immutable-by-contract synthetic catalog/copy arrays plus session-only presentation settings. Responsive grids, reusable surfaces, status badges, empty states and local abstract artwork share dark-theme tokens.

`src/domain/models.ts` represents languages independently from release markets, native and translated names, string/unnumbered collector numbers, multi-species cards, explicit variants, unknown copy identity and price-availability reasons. Era/language registries are extensible; seeded names are vocabulary rather than coverage guarantees. UUID-based canonical IDs are branded by entity type; upstream keys live in separately scoped mappings.

`applyCatalogUpserts` merges reviewed canonical records without deleting omitted records, validates references and cannot access the separate collection aggregate. Provider interfaces return success envelopes or explicit unsupported/unavailable/error results and stage external payloads as unknown data; normalization, provenance review and identity resolution remain adapter responsibilities. `mockCatalogProvider` is the only catalog adapter; mock pricing returns unavailable. No production synchronization runs.

The relational schema above remains a future design, not an implemented database. Persistent storage, repository implementations, acquisition transactions, backup/export, merge redirects, full provenance/conflict tooling, network retry/checkpointing and real provider qualification remain future work. Do not infer those capabilities from TypeScript interfaces. Details and check results: [Sprint 0B](sprint-0b.md).

### Sprint 0B completion verification — 2026-10-19

The shared `Screen` now places its mock badge and synthetic-data/no-live-prices notice outside the scrolling content; presentation switches cannot hide this provenance boundary. Confirmed with a scrolled mobile browser preview. Catalog/pricing remain offline mock contracts; personal-copy persistence and production provider synchronization are not implemented. Actual command and platform validation is recorded in [Sprint 0B results](sprint-0b.md).
