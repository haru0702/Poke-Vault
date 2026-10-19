# Sprint 1 artwork handling fix — 2026-10-19

## Findings and evidence

All checks below were performed on 2026-10-19. These are samples, not global artwork coverage statistics.

- Documented: TCGdex card `image` is optional ([card reference](https://tcgdex.dev/reference/card)). Extensionless image bases require a quality and extension; high/low and PNG/WebP/JPG are documented. WebP is recommended for web, PNG for other formats ([assets reference](https://tcgdex.dev/assets)).
- Observed: [English base1-4](https://api.tcgdex.net/v2/en/cards/base1-4) returned HTTP 200 with `image: https://assets.tcgdex.net/en/base/base1/4`. Its `/high.webp` and `/high.png` assets both returned HTTP 200 with image/webp and image/png respectively. Existing base URL mapping was correct for this sample.
- Observed: [Japanese SM1M-001](https://api.tcgdex.net/v2/ja/cards/SM1M-001) and [English exu-!](https://api.tcgdex.net/v2/en/cards/exu-!) returned HTTP 200 without an image value. Rendering changes cannot supply these missing provider images.
- Attempted but unverified identification: direct probes of en/exu-%3F, en/sm75-1 and en/sm35-1 returned HTTP 404. These guessed/encoded routes do not establish absence of the visible printings or their artwork. No global conclusion follows.
- Code inspection: old renderer had no loading state or timeout; its error boolean persisted across source changes; its small fallback lacked the image's fixed width; loading failures were incorrectly labeled as provider omissions.
- Platform concern, not proven root cause: old code selected WebP everywhere. Native PNG preference now follows provider guidance; physical iPhone/Android rendering remains unverified. No evidence of a corrupt browser cache was found, and cache busting was not added.

## Implementation

`resolveTCGdexImage` keeps provider base URL rules in its adapter. The shared `resolveCardArtwork` consumes explicit metadata/URLs and derives alternative renditions only for TCGdex's documented asset paths. Other providers retain their explicit HTTPS URLs. It never derives image paths from card IDs or substitutes another language's art.

`CardArtwork` is used in catalog tiles, collection rows and details. It shows a loading indicator, retries approved format candidates on errors or a 15-second per-candidate timeout, then displays a labeled placeholder. Missing/invalid URLs and exhausted requests have distinct accessible descriptions. The image frame stays fixed (58×82 for collection thumbnails, full width×245 elsewhere). Card/source changes reset request state; existing saved snapshots remain compatible. Development diagnostics contain only public provider/locale/card identifiers and reason, never ownership data or full URLs.

No collection storage schema, identities, pricing, scanning or audit evidence was changed. Missing records remain missing; no mock or unofficial artwork was added.

## Validation and manual QA

- `npm run check`: TypeScript and ESLint passed; 6 suites / 52 tests passed. Includes valid, absent, invalid, failed, stalled, source-change, list and detail artwork cases.
- `npm run export:web`: passed, 12 routes exported.
- `npx expo export --platform ios --platform android --output-dir /tmp/pokevault-artwork-native`: passed both bundles. Bundle export is not device testing.
- `verify:audit`: 194 historical files unchanged.
- Browser: localhost:8083/pokedex loaded real TCGdex results. Aggron, Bellossom and Jirachi images completed with naturalWidth 600. Unown `!` displayed the labeled placeholder in catalog and details; screenshot: fallback (local screenshot: `docs/sprint-1-previews/artwork-fallback.png`; excluded from Git). Network failures are deterministic automated tests, not injected production data.

On iPhone Expo Go, reload the current development server, browse an image-bearing card and Unown `!`, then open each detail view. Confirm image/placeholder, stable layout and scrolling. Check an existing saved copy's thumbnail and detail. Test a disconnected network after metadata loads; verify eventual fallback and absence of empty frames. No physical-device QA was performed during this fix.

Remaining limits: provider omissions cannot be recovered automatically; temporary network failures may exhaust all formats (remount/reopen to retry); native decoding needs device QA. The provider's session cache can retain metadata until app reload, and saved collection snapshots retain the image metadata captured at save time. No cache-related loss was established by this audit.

## Files changed for this fix

- Created `src/providers/tcgdex-artwork.ts`, `src/components/artwork.ts`, `src/components/CardArtwork.tsx`, `__tests__/artwork.test.tsx`, this report and `docs/sprint-1-previews/artwork-fallback.png`.
- Updated `src/providers/tcgdex.ts`, `src/components/catalog.tsx`, `src/app/(tabs)/collection.tsx`, `__tests__/navigation.test.tsx`, `docs/requirements.md`, `docs/architecture.md`, `docs/backlog.md`.
- Other working tree changes predate this fix and belong to the existing Sprint 1 implementation.

## Follow-up recovery investigation — 2026-10-19

The user requested recovery of the six English first-page omissions. Exact detail responses for `exu-!`, `exu-%3F` (request path must encode the literal percent sign), `sm7.5-1`, `sm3.5-1`, `tk-xy-latio-1` and `tk-xy-p-1` all omit `image`. The sampled set/card brief responses for Unown, Dragon Majesty and Shining Legends also omit artwork. The earlier guessed `sm75`/`sm35` API identifiers were not the TCGdex identifiers; this follow-up uses the actual IDs returned by the provider.

Pokémon TCG API's historical repository supplies exact English metadata/image matches for the two Unown cards (`ex10-!`, `ex10-?`), Charmander (`sm75-1`) and Bulbasaur (`sm35-1`). However, all four published large image URLs returned HTTP 403 from this environment. These candidates were **not integrated**. Metadata availability does not prove usable artwork. The provider-owned [repository README](https://github.com/PokemonTCG/pokemon-tcg-data) now marks the service as legacy and announces API retirement on 2027-03-01; it is not a durable new integration recommendation. The checked set list did not establish exact XY Trainer Kit candidates for Skitty or Glameow; no substitutes were selected.

The [official Dragon Majesty card page](https://www.pokemon.com/us/pokemon-tcg/pokemon-cards/series/sm75/1/) and [official Shining Legends card page](https://www.pokemon.com/us/pokemon-tcg/pokemon-cards/series/sm35/1/) returned HTTP-success access-block HTML rather than card content. Artwork from those pages remains unverified. Access restrictions were not bypassed.

New evidence is separate from the frozen Sprint 0A evidence: [manifest](artwork-evidence/manifest.json), six raw TCGdex responses and selected supplementary metadata in `docs/artwork-evidence/`. The manifest distinguishes full raw-response hashes from hashes of source responses from which selected metadata was extracted. No media files were downloaded or rehosted. No application changes were made in this follow-up because no working, reviewed replacement URL was confirmed.

Remaining recovery work: obtain a maintained provider's exact English-printing mappings and usable image URLs, review its image terms, then configure attributed artwork independently of TCGdex catalog identities. Paid integrations remain outside Sprint 1. Until that dependency is resolved, these six cards correctly retain the unavailable placeholder. This follow-up does not claim that artwork is unavailable everywhere, only that the checked sources did not provide a verified usable replacement.

## Browser-verified recovery — 2026-10-19 (supersedes the preceding recovery conclusion)

The four published historical image URLs that failed in command-line checks **do load in the in-app Chromium browser**. Direct images measured 600px (both Unown cards) or 734px (Charmander/Bulbasaur) wide. The same four images subsequently completed successfully inside PokéVault's catalog; Unown also loaded in details. The prior CLI 403 evidence remains accurate for that request method and must not be generalized to all clients. [Browser evidence](artwork-evidence/browser-recovery.json).

Implemented a small, explicit artwork mapping registry in `src/providers/artwork-overrides.ts`. Reviewed pairs are TCGdex English `exu-!` → historical `ex10-!`, `exu-%3F` → `ex10-?`, `sm7.5-1` → `sm75-1`, and `sm3.5-1` → `sm35-1`. Exact provider, locale, language, set, card ID, name and collector number must match. Numbers are not rewritten (including the literal `%3F`). Provider metadata and internal identities remain unchanged. Original artwork is attempted first; the reviewed image follows it. Existing saved snapshots can use the registry without collection writes. These are representative printing images, not proof of a specific owned finish, edition or condition.

The shared renderer shows `Artwork: Pokémon TCG API (legacy)` when displaying the supplemental image. Published image URLs were taken from the saved provider metadata, not synthesized or taken from Google thumbnails. The historical provider's [card schema](https://docs.pokemontcg.io/api-reference/cards/card-object/) publishes image fields for clients; its [repository](https://github.com/PokemonTCG/pokemon-tcg-data) is now deprecated, so these four references are a limited compatibility measure, not a new live API dependency or a durability guarantee. Images remain copyrighted by their respective owners; this change does not establish unrestricted redistribution rights. No images were downloaded/rehosted, no paid integration or scraping job added. Reassess hosting/terms before public distribution.

The exact Skitty TCGplayer product (98347, linked in TCGdex `thirdParty.tcgplayer`) itself serves `image-missing.svg`; rejected. The exact Glameow product (118798) shows a 281px scan, but [TCGplayer terms](https://help.tcgplayer.com/hc/en-us/articles/205004918-Terms-of-Service) do not establish permission for copying its site image into this app. It remains a research candidate, not a configured source. Different-number reprints were not substituted. A limited unauthenticated Scrydex query returned HTTP 401. Scrydex [image guidance](https://scrydex.com/docs/getting-started/best-practices) allows using API-provided images but explicitly says to use returned URLs, not guessed patterns. No Scrydex image was inferred or account created.

Validation: `npm run check` passed (6 suites / 53 tests), including guarded crosswalk matching, source attribution and supplemental-image failure fallback. Web export passed (12 routes). iOS and Android exports passed to `/tmp/pokevault-artwork-recovery-native`; physical-device decoding remains unverified. Protected Sprint 0A check passed (194 unchanged files). Screenshot: restored Unown (local screenshot: `docs/sprint-1-previews/artwork-recovered.png`; excluded from Git).

Files in this recovery change: new `src/providers/artwork-overrides.ts` and browser evidence; updated `src/components/artwork.ts`, `src/components/CardArtwork.tsx`, `__tests__/artwork.test.tsx`, this report and dated requirements/architecture/backlog notes. No collection storage, pricing or scanner code changed. Two of the six initial omissions remain unresolved. Remaining action: permission-backed exact Trainer Kit images or an authenticated maintained provider lookup, followed by platform testing. Native requests may experience the earlier 403 behavior and must retain graceful fallback.

## Final two Trainer Kit printings recovered — 2026-10-19

Found [Skitty 1/30](https://pooka.app/card/en-tk8a-1/Skitty) and [Glameow 1/30](https://pooka.app/card/en-tk9b-1/Glameow) on Pooka. Browser inspection confirmed both scans contain English text, the correct name, and printed number 1/30; this avoids substituting Skitty 27/30, Primal Clash 113/160 or Glameow BREAKpoint 93/122. Both source images are 500px wide. Source pages identify the relevant Latios and Pikachu Libre Trainer Kits. [Evidence](artwork-evidence/trainer-kit-browser.json).

Pooka's [terms section 3](https://pooka.app/terms) documents limited personal, noncommercial content use. These explicit mappings are configured for the user's local personal app, marked `personal-noncommercial` with source/terms URLs in the registry, and show `Artwork: Pooka (personal use)` when rendered. They are not a general API integration or a grant for public/commercial redistribution; review or replace them before that scope. No media was downloaded or rehosted; no credentials, subscription or pricing integration was added.

Added two guarded entries in `src/providers/artwork-overrides.ts` and regression coverage in `__tests__/artwork.test.tsx`. Existing catalog identities, provider metadata, and saved physical copies are unchanged. Existing fallback behavior remains in effect if a remote image becomes inaccessible. Dated docs and new evidence record this recovery without changing protected historical audit evidence.

Actual validation: TypeScript and lint passed; 6 Jest suites / 54 tests passed; web export passed (12 routes); iOS and Android bundle export passed to `/tmp/pokevault-trainer-artwork-native`. All 194 protected Sprint 0A files unchanged. Both new images completed in the actual catalog and details browser views with naturalWidth 500. Screenshot: Skitty restored (local screenshot: `docs/sprint-1-previews/skitty-recovered.png`; excluded from Git). No physical-device test performed. All six originally identified first-page missing artworks now have browser-verified mappings; this does not establish artwork coverage for the rest of the catalog or future requests.
