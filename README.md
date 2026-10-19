# PokéVault

A mobile-first Pokémon TCG collection application built with **Expo SDK 57, Expo Router, React Native and TypeScript**.

**Sprint 1:** the Pokédex browses real TCGdex eras, sets, cards, artwork and metadata. Your physical collection is stored locally with printing, language, optional variant and condition. API failures never fall back to mock cards. Catalog completeness remains **unverified / NO-GO for a universal completeness claim**; source records are not an independently reconciled official checklist.

Five dark-theme bottom tabs remain: Dashboard, Pokédex, Collection, Portfolio and Settings. Portfolio has no pricing or tracking. Scanning is not implemented. Review the [Sprint 1 handoff](docs/sprint-1.md) before Sprint 2.

## Run on your Mac and iPhone

Use Node.js 24 LTS and npm with the committed lockfile:

```sh
cd "/Users/maryantoinetteabuela/Documents/ChatGPT/PokéVault"
npm ci
npx expo start --go --lan
```

Open the QR code with a compatible Expo Go client on your iPhone, with phone and Mac on the same Wi-Fi. Keep Terminal running. If necessary, sign in to Expo CLI and Expo Go with the same Expo account. For the browser:

```sh
npm run web
```

The Sprint 1 verification server uses [localhost:8083](http://localhost:8083). Run `EXPO_OFFLINE=1 npm run web -- --port 8083` to use that port without Expo dependency network checks; this does **not** disable the app's live TCGdex requests.

No production credentials, API key, paid account or scanning permission is needed. Initial dependency installation and live catalog browsing require network access. Saved collection text/identity snapshots remain available without a provider connection; artwork is remotely hosted and may not be available offline.

## Use

- In Pokédex, choose a language, optionally filter by name/number/era/set/rarity, then press **Search catalog**. Number search preserves the provider's native numbering, including leading zeros. **Load more cards** retrieves another page.
- Open a card for artwork, rules metadata and detailed variant candidates. Choose **Unknown / not identified** when its physical variant is not known; rarity is separate.
- Choose condition and **Add to collection**. If a matching copy already exists, adding another requires explicitly enabling **Add another physical copy**.
- Open a saved copy in Collection to edit variant/condition or remove it with confirmation. Copies are individual physical objects, not a combined quantity bucket.

**Local-only storage:** browser data is scoped to the URL origin/port; native data is scoped to the app installation. Uninstalling/clearing site/app data may delete the collection. There is no cloud synchronization or backup/export feature yet. AsyncStorage is not encrypted application-level storage; do not store sensitive notes. Test changes at another port do not appear in your usual browser origin or on your iPhone.

## Verification

```sh
npm run check
npm run export:web
npx expo export --platform ios --platform android --output-dir /tmp/pokevault-sprint1-native-reviewed
```

`check` verifies 194 protected Sprint 0A audit/evidence files, TypeScript, zero-warning ESLint and Jest tests. Tests use captured public response fixtures and controlled provider responses; this is separate from live browser testing. Native bundle export is not physical-device testing or an installable binary build. Actual results and manual QA are in [Sprint 1](docs/sprint-1.md).

## Structure

- `src/app/`: five-tab Expo Router application.
- `src/components/`, `src/theme/`: shared dark UI, live tiles/artwork, searchable selectors and card/copy detail modals.
- `src/providers/tcgdex.ts`, `contracts.ts`: provider-neutral browsing boundary and read-only TCGdex adapter; no pricing integration.
- `src/domain/`: canonical UUIDs, foundational entities, live card projection and search/variant helpers.
- `src/storage/vault.ts`: versioned persistent identity registry and user-only collection transactions.
- `src/state/vault.tsx`: hydrated local collection state and error handling.
- `src/data/mock.ts`, `src/providers/mock.ts`, `src/state/preview.tsx`: historical fixtures/preview helpers retained for tests; current tabs do not import mock ownership.
- `__tests__/`: normalization, multilingual filters, variants, persistence, duplicate guards, failure cases and actual Expo Router navigation with controlled provider data.
- `docs/`: preserved [catalog audit](docs/catalog-audit.md), [coverage matrix](docs/catalog-coverage-matrix.md), [architecture](docs/architecture.md), [backlog](docs/backlog.md), and dated [Sprint 0B](docs/sprint-0b.md)/[Sprint 1](docs/sprint-1.md) handoffs.

Do not regenerate the audit baseline to conceal changes. No scanner, paid integration, price tracking, deployment or Sprint 2 work is included.
