# PokéVault working instructions

Established 2026-10-19 from the user's feasibility-audit request. Applies to this repository.

## Current phase and scope

PokéVault is a personal physical Pokémon TCG collection application targeting official releases from 1996 to the present, all officially printed languages, regional releases, promos and applicable variants. This is an intended scope, not an achieved coverage claim.

The user authorized Sprint 0B on 2026-10-19: an Expo / Expo Router / TypeScript mobile-first foundation with five tabs, mock previews, domain models, provider interfaces and automated checks. UI foundation work in that scope is authorized. Production backend, database migrations, real collection persistence, production scanning, paid API integrations, deployment and completeness claims remain outside this sprint. Read `docs/requirements.md`, `docs/catalog-audit.md`, `docs/architecture.md` and `docs/backlog.md` before implementation. Architecture/schema choices are proposals, not existing software.

## Research and evidence

- Prefer official Pokémon sources for release applicability/checklists and provider-owned documentation plus live responses for provider capability.
- Separate documented, observed, inferred and unverified claims. Include source URL, audit date, language/market scope and limitations for each factual finding.
- Never assume a supported locale has complete cards or that a listed set has card details. Keep aliases, localization, physical release and market separate.
- Record request failures accurately. DNS/tool failures are not HTTP 404s; guessed-ID 404s do not prove global absence. Unattempted checks stay unverified.
- Preserve raw snapshots, timestamps, statuses and hashes for empirical audits in `docs/audit-evidence/`. Never put credentials or private ownership data in evidence files. Raw market observations are not endorsed valuations.
- Inventory counts are not completion percentages. Require independent, versioned expected checklists for per-release/language printing or variant completeness. Unknown denominator means unknown percentage.
- Do not claim exhaustive official-language or global promo/variant coverage without independent evidence. Do not treat digital Pocket/Live records as physical cards.

## Catalog and collection integrity

- Use internal identities independent of providers. Scope external keys by provider, entity type, locale/domain and parent where required. Detailed TCGdex `variantId` is not globally unique in the sampled data.
- Keep Pokémon species, card design, localized printing, manufactured variant and owned physical copy distinct. Trainers/Energy need no species; multiple species per printing are valid.
- Preserve collector numbers as text, including leading zeros. Do not merge on species, names, artwork or numbers alone.
- Do not generate variant combinations from independent flags. Unknown variant is not normal/non-foil. Source editions, finish patterns, stamps and revisions.
- Maintain provenance, mapping confidence, conflicts and reviewable corrections. Provider updates/deletions must not destroy user copy history.

## Pricing

Never fabricate prices or coverage statistics. Missing, null, omitted, stale, inaccessible and ambiguous prices are distinct states; none imply zero. Keep original currency, source marketplace, transport provider, metric, timestamps and exact language/variant/condition/grade scope. Do not reuse another language's or broad card-level price as an exact physical-copy quote. Keep acquisition cost, manual valuation and market observations separate. Review provider and image/market-data rights before redistribution.

## Delivery and verification

Prefer focused, reversible changes and meaningful validation. For documentation, verify evidence arithmetic, internal links and source consistency; no application scaffolding or implementation-mirroring tests are needed. Update dated findings when new evidence supersedes old claims, preserving the historical snapshots. Do not publish, send contributions or create recurring automations without user authorization.

## Sprint 0B development

Use npm and the committed lockfile. Run `npm run check` and `npm run export:web` for application changes; run native bundle export when native dependency or routing changes justify it. Tests belong outside `src/app/`. `npm run verify:audit` must continue passing: the audit and matrix plus all saved evidence remain unchanged. Update requirements/architecture/backlog with dated implementation notes rather than rewriting historical findings.

All preview screens must retain persistent mock-data labeling. Do not invent market values, turn unknown variants into normal cards, claim the era/language vocabulary is populated catalog coverage, or let catalog synchronization reach personal-copy deletion. Keep provider and collection contracts separate. Report device testing separately from Jest, browser checks and native bundle export.
