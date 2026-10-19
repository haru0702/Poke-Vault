# Sprint 1 — Live Card Catalog and Collection

Implementation/review date: **2026-10-19, Asia/Manila**. Status: **implemented locally; awaiting user review and physical-device acceptance**. Sprint 2 has not started. Full catalog completeness remains **NO-GO**.

## Scope and increments

The six required project documents and existing architecture/audits were reviewed. A partial Sprint 1 working tree already existed when this retry began; it was continued, inspected and corrected rather than discarded. Sprint 0A findings/evidence were preserved; dated notes supersede Sprint 0B's preview-only restrictions only for the user's newly authorized scope.

1. **Live provider and identities:** reusable provider-neutral discovery/search contract; real TCGdex series, physical set memberships, cards, artwork and metadata; random canonical UUID allocation with persisted provider/parent/locale mappings.
2. **Catalog UI:** existing dark theme/five tabs retained; language, era, set, rarity, native-name and text-number filters; pagination; card/variant detail; explicit loading, missing image, empty catalog, partial response and error states. No mock fallback.
3. **Collection:** persistent local add/edit/remove, card snapshots, variant/condition identification, duplicate submission guard, explicit additional-copy intent and removal confirmation.
4. **Verification and handoff:** meaningful provider/storage/navigation regressions, live browser operations, responsive checks, web/native bundling and dated documentation.

Corrections made during completion include binding native browser fetch correctly, unmounting closed option modals, making option accessibility labels specific to their filter, avoiding synchronous state updates during hydration effects, retaining Trainer effects/Pokémon abilities, permitting valid punctuation in official asset paths, defending against nonmatching server-filter results, and verifying physical membership in generic card transport. Catalog identity writes now use a separate storage key from personal copies.

## User-visible behavior

- **Dashboard:** actual local-copy/language counts, live catalog entry points and explicit coverage/pricing boundaries.
- **Pokédex:** provider series/sets and language-specific card search. Filters apply when **Search catalog** is pressed. Name and number queries are substring searches in the selected language, not automatic cross-language translations. Numbers retain source text: `001` is not silently rewritten to `1`. Changing language clears old filters/results. **Load more cards** requests another page.
- **Details:** real remote artwork (or an unavailable state), name, source collector number, language, set/era, category, rarity, illustrator, HP/types, description, abilities, Trainer effects, attacks and available stage/regulation metadata. Physical variant candidates have their own internal identities/attributes; rarity does not generate variants. Unknown variant remains selectable.
- **Collection:** begins empty rather than importing preview copies. Each physical object gets its own UUID and stored card snapshot. Users can set variant/condition, deliberately add another matching physical copy, edit it, or confirm removal. Personal data stays local.
- **Portfolio:** saved-copy/language context only; prices and price tracking remain absent.
- **Settings:** source, local-storage and scope disclosures. GitHub development authentication is not an in-app collection account.

Recognized provider locale tokens are exposed independently from canonical language/script tags. A recognized route is not a guarantee of populated data or officially released printings. Portuguese aliases differ; Pocket-only aliases yield no physical catalog records. Provider totals and listed set counts never become official completion denominators or percentages.

## Provider and storage boundaries

`LiveCatalogProvider` extends `CatalogProvider`, enabling replacement/supplementation without putting TCGdex keys in internal primary IDs. `TCGdexProvider` uses discovered series/set membership, excludes `tcgp`, paginates cards at 24 briefs per request, fetches details with bounded workers, propagates cancellation and sets a 20-second timeout per HTTP request. Partial series/detail failures surface warnings. Explicit set browsing checks for empty card lists. Card details are cached in memory with a 1,000-record bound; this is not a full offline catalog or a freshness guarantee. User retry refreshes discovery; some in-session details may still be cached. Normalized snapshots do not import market prices.

Each normalized card has provenance and a source URL. Provider variants are provisional candidates, not independent physical authentication or a complete checklist. Legacy flags remain hints and are never expanded as Cartesian-product physical variants. Unknown fields are null/absent; fake metadata/images/prices are not generated. A full canonical species/artwork/release database, exhaustive catalog ingestion and independent checklist reconciliation are not implemented by this client projection.

AsyncStorage keys:

| Key | Purpose | Write boundary |
| --- | --- | --- |
| `pokevault:catalog-identities:v1` | Persisted random canonical UUID mappings | Catalog identity allocation only; no personal-copy writes. |
| `pokevault:user-vault:v1` | Individual physical copies plus their card snapshots | User add/edit/remove operations only. |

Identity allocation retains earlier combined-document UUIDs through a read-only compatibility path. It does not rewrite or delete that personal document. Corrupt/unsupported-version stored data is preserved and errors are shown; failed writes are not acknowledged as success. Collection operations are serialized within the default store instance. Matching printing + variant + condition adds require explicit additional-copy intent; deliberate objects remain separate copies. Updates preserve copy UUIDs.

## Changed files

| Area | Created / modified files relative to Sprint 0B |
| --- | --- |
| Dependencies | Modified `package.json`, `package-lock.json`: SDK-compatible AsyncStorage 2.2.0 and Expo Crypto ~57.0.4. Dependencies were already present in the partial Sprint 1 tree at retry inspection. |
| Domain | Created `src/domain/live.ts`: live catalog projection, search/variant helpers and saved-copy snapshot type. Existing foundational `models.ts`/UUID helpers remain in use. |
| Provider | Created `src/providers/tcgdex.ts`; extended `src/providers/contracts.ts` with reusable live discovery/search. |
| Persistence/state | Created `src/storage/vault.ts`, `src/state/vault.tsx`; modified `src/app/_layout.tsx` to hydrate the real local collection instead of wrapping current tabs in preview state. |
| Shared UI | Created `src/components/catalog.tsx`; modified `src/components/ui.tsx` for persistent source-mode labeling. |
| Navigation screens | Modified all five existing tab screens: `index.tsx`, `pokedex.tsx`, `collection.tsx`, `portfolio.tsx`, `settings.tsx`. Bottom-tab layout/navigation is retained. |
| Tests | Created `__tests__/live-fixtures.ts`, `tcgdex.test.ts`, `vault.test.ts`; updated `navigation.test.tsx` and `jest.setup.js`. Existing domain/mock-provider tests retained. |
| Documentation | Updated `AGENTS.md`, `README.md`; appended dated notes to requirements, architecture and backlog; created this report and `docs/sprint-1-previews/` verification/screenshots. |

No protected audit, coverage matrix or saved Sprint 0A evidence file was changed. Historical Sprint 0B report/screenshots remain historical. No scanner, pricing integration, credentials, deployment, backend/database migrations or Sprint 2 work was added. No commit or push was made as part of this implementation request; changes remain local for review.

## Actual automated and build results

Final runs on **2026-10-19**:

| Command | Result |
| --- | --- |
| `npm run check` | **PASS**: preserved audit hashes, TypeScript, zero-warning lint and Jest. |
| `npm run verify:audit` via check | **PASS: 194 protected files unchanged**. Baseline not regenerated. |
| `npm run typecheck` via check | **PASS**, `tsc --noEmit`. |
| `npm run lint` via check | **PASS**, `eslint . --max-warnings=0`. |
| `npm test` via check | **PASS: 5 suites, 46 tests**. Final run: 2.652 seconds. Tests use controlled provider responses/captured public evidence, not live API availability. |
| `npm run export:web` | **PASS**, web bundle and 12 static routes including all five primary screens. |
| `npx expo export --platform ios --platform android --output-dir /tmp/pokevault-sprint1-native-reviewed` | **PASS**, iOS and Android Hermes bundles/assets. Not an installable native binary or device run. |
| `EXPO_OFFLINE=1 npm run web -- --port 8083` | **PASS**, Expo/Metro startup and browser rendering. Started outside sandbox for a usable local listener. `EXPO_OFFLINE` affects Expo checks, not app catalog fetching. |

The final commands supersede intermediate runs. Earlier lint caught the hydration effect; an integration test caught ambiguous option controls; TypeScript caught a nullable filter predicate while hardening search. Those issues were corrected before the final passing runs. Earlier native/web outputs were regenerated after final code changes. Build output included the environment's `NO_COLOR`/`FORCE_COLOR` warning; no corresponding application build failure occurred.

Coverage includes:

- Stable random IDs across store recreation, native text/zero-padded numbers, language/parent isolation and multi-species/species-free foundational modeling.
- Name/number/set/era/rarity queries, physical-only discovery, Pocket exclusion in direct transport, unknown language rejection and no fallback.
- Empty shells, partial index/detail warnings, network/404/malformed response handling, cancellation, absent artwork and independent rarity/variant identity.
- Persisted add/edit/remove, duplicate protection, intentional multiple objects, concurrent add serialization, wrong-parent variant rejection, mock-record rejection, corruption preservation and failed writes.
- Separate identity storage not rewriting the personal document and retention of legacy identity mappings.
- Real Expo Router tab presses, search/filter/language controls, card/copy details, collection actions/confirmation and provider retry UI.

## Actual live browser verification

Verification used the app at **http://localhost:8083**, an isolated browser origin for QA. No real personal collection was imported. Results are recorded in [browser verification](sprint-1-previews/verification.json); these observations are point-in-time provider behavior, not updated global coverage statistics.

| Scenario | Actual result |
| --- | --- |
| English discovery | 20 provider-listed physical series/groupings and 205 physical set candidates loaded. These counts match observed source inventory, not verified official totals. |
| Combined filters | English `Charizard`, number `4`, era `Base`, set `Base Set`, rarity `Rare` returned the matching real card. Artwork, metadata, ability and four detailed variant candidates displayed. |
| Collection lifecycle | Added one temporary QA copy with unknown variant/condition; duplicate add was rejected. Reload retained the copy and UUID. Changed to provider holo/unlimited candidate and lightly played condition; reload retained edits. Confirmed removal; reload showed empty collection. The QA copy was removed, not retained as a claimed owned card. |
| Empty language | `pt-pt` showed zero physical records and an explicit unknown/incomplete applicability message; no English or mock records substituted. |
| Japanese native search | Japanese discovery returned 14 provider groupings/184 set candidates; `フシギ` returned native-name records with text numbers such as `001`, `002`, `003`. Some had missing artwork and showed the unavailable state. Japanese Venusaur ex details displayed real artwork and rules metadata. |
| Navigation/responsiveness | All five real tab buttons rendered matching screens at 320, 768 and 1280 px. Document width equaled viewport width on each check. Also inspected mobile screenshots at 390 × 844. This does not certify every child layout/accessibility setting. |
| Browser logs | No warning/error entries returned during the final responsive check. |

Sources for API behavior: [TCGdex filtering/pagination](https://tcgdex.dev/rest/filtering-sorting-pagination), [cards endpoint](https://tcgdex.dev/rest/cards), [assets](https://tcgdex.dev/assets), checked **2026-10-19**; live data came from `https://api.tcgdex.net/v2/{locale}/series`, series details, card searches/details and selected set responses through the app. None establishes completeness. Sprint 0A's known historical/promotional/locale gaps remain unresolved.

No live API failure was deliberately induced on the user's network; failure/retry behavior is verified with controlled automated responses. The initial real browser fetch-receiver error was corrected and live loading retested. No per-language full-card census or independent latest-release verification was performed.

Real Japanese card details (local screenshot: `docs/sprint-1-previews/japanese-card-details.png`; excluded from Git)

Temporary QA copy retained after reload, before its cleanup (local screenshot: `docs/sprint-1-previews/collection-persistence.png`; excluded from Git)

## Limitations

- **Physical iPhone/Android and emulator QA was not performed for Sprint 1.** Earlier Sprint 0B phone connectivity does not certify this sprint. Native bundle export is not device testing.
- TCGdex remains incomplete and sometimes inconsistent. No full catalog/variant/language completeness claim, official denominator or fabricated percentage is supplied. UI era lists are provider groupings, not an independently complete era registry.
- Catalog browsing needs network access. Saved card text/identity snapshots remain local; remote artwork may disappear offline. Full catalog cache, refresh TTL, global ingestion and offline search are not implemented.
- Search is language-specific and substring-based, not translated species search or exact-number matching. Pagination is incremental, not a downloaded global catalog. Filter/language selection is session-only and resets on a full app/page restart.
- Identity mapping is stable within this installation/storage namespace. Clearing storage loses mappings. Cross-provider editorial reconciliation and multi-device identity transfer remain future work.
- AsyncStorage is not a cloud backup or encrypted app database. Data is scoped to native install or browser origin/port. Site/app-data clearing, uninstall or storage eviction may lose data. No backup/export, account sync, multi-tab locking or server transaction coordination is included; use one active browser editor for now.
- Corrupt/version-incompatible documents are preserved with an error, not automatically repaired. Future migration/recovery tooling remains open.
- Saved records preserve provider metadata snapshots; they do not authenticate a physical card or certify a variant. Edits currently cover variant/condition; grade/acquisition/location editing and import are not part of Sprint 1.
- Artwork remains remotely supplied by TCGdex and its rights holders; attribution is displayed. Distribution/asset rights for any future public release still require the separate rights review; no images were bundled into the production app.

## Manual iPhone QA — required before accepting Sprint 1

1. In the existing project directory run `npm ci`, then `npx expo start --go --lan`. Keep Terminal open and phone/Mac on the same Wi-Fi; use compatible Expo Go. If prompted, use the same Expo account in CLI/client. The current test server is on 8083, while your own Expo session may use another port.
2. Open the app and visit all five tabs. Confirm dark appearance, bottom navigation, safe areas, readable text and persistent source/coverage notice.
3. In English Pokédex, search `Charizard`; select Base era, Base Set and rarity Rare. Search number `4`. Open the matching details and check artwork, ability/attack text, source and variants.
4. Add a deliberate test copy with **Unknown / not identified** and unknown condition. Confirm one saved copy and that another matching add is blocked.
5. Enable **Add another physical copy** and deliberately add a second object. Confirm two different copy IDs, not an accidental merged quantity.
6. Edit one object's variant and condition. Navigate away, close/reopen Expo Go and confirm both objects and edits persist. Unknown identification on the other object must remain unknown.
7. Remove only the test copies using the confirmation controls. Reopen the app and confirm removal persists; the catalog card must still be searchable.
8. Select Japanese, search native text `フシギ`, check zero-padded numbers and artwork/unavailable-image states. Return to another language and confirm no stale Japanese cards masquerade as that language.
9. Select the European Portuguese provider alias (`pt-pt`) and verify its explicit empty state with no fallback. In Dutch, select Base Set and verify the empty-shell warning if the provider still returns that shell.
10. Disable connectivity while a catalog request is needed. Confirm a visible failure/retry path without mock cards. Confirm previously saved local copies still display their text/identification. Reconnect and retry.
11. Test rapid taps, modal close/back gestures, keyboard, small-screen scrolling and large text. Confirm no accidental additional copies and no inaccessible confirm/cancel controls.
12. Review limitations and the unchanged catalog audit before approving any Sprint 2 work. Record actual device/OS/Expo Go version and any failures separately.

**Sprint 1 review gate:** user review and native device acceptance remain pending. No Sprint 2 work has begun.
