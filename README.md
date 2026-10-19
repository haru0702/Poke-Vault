# PokéVault

A mobile-first personal Pokémon TCG collection foundation built with **Expo SDK 57, Expo Router, React Native and TypeScript**. Sprint 0B provides five bottom tabs: Dashboard, Pokédex, Collection, Portfolio and Settings.

**This is an offline mock preview.** Its printings, releases, variants and owned copies are synthetic examples, not an official checklist or your personal collection. No market prices are supplied. Catalog completeness remains **NO-GO**; the provider-independent foundation has a **CONDITIONAL GO**. See the [coverage matrix](docs/catalog-coverage-matrix.md).

## Run

Use Node.js 24 LTS (verified with 24.18.0) and npm. SDK 57 was chosen using Expo's [current Expo Go transition guidance](https://docs.expo.dev/get-started/create-a-project/) (checked 2026-10-19); dependencies are pinned by `package-lock.json`.

```sh
npm ci
npm start
```

Scan the terminal QR code with a compatible Expo Go installation, or use:

```sh
npm run ios       # needs an installed iOS simulator / Xcode
npm run android   # needs an Android emulator or connected development device
npm run web       # local browser preview
```

No environment variables, production credentials, login, paid API account, EAS configuration or scanning permissions are needed. Initial dependency installation needs internet access. To start using installed dependencies without version checks:

```sh
EXPO_OFFLINE=1 npm run web -- --port 8082
```

## Verify

```sh
npm run check           # preserved audit hashes + TypeScript + zero-warning lint + tests
npm run export:web      # production static route rendering and web bundle
npx expo install --check
npx expo export --platform ios --platform android --output-dir /tmp/pokevault-native-export
```

`npm test` includes unit tests for identity, reconciliation, coverage and provider limitations plus integration tests that press real Expo Router tab buttons and exercise search, filters and preferences. Tests use native mocks provided by `jest-expo`; passing them is not a physical-device test. Native bundle export is not an installable native binary. See [actual Sprint 0B verification](docs/sprint-0b.md).

## Structure

- `src/app/`: root layout and the five Expo Router bottom-tab screens.
- `src/components/ui.tsx`, `src/theme/`: reusable components, dark palette, responsive grids, safe-area-aware screens and abstract preview art.
- `src/domain/`: branded internal UUID identities; species, eras, languages, markets, sets, regional releases, designs, printings, variants, copies and scoped price states; validated, non-destructive catalog upserts.
- `src/providers/`: catalog/pricing/repository contracts and a synthetic offline provider; no production network integration.
- `src/data/mock.ts`: explicitly synthetic fixtures and an extensible era/language vocabulary. Vocabulary presence does not certify card availability.
- `src/state/`: read-only preview collection plus session-only display preferences.
- `__tests__/`: domain, provider and real-router integration tests.
- `docs/`: Sprint 0A audit, coverage evidence, requirements, architecture, backlog and Sprint 0B results.
- `scripts/verify-audit.mjs`: checks 194 audit/evidence files against the pre-Sprint 0B baseline. Do not regenerate that baseline to hide changes.

## Boundaries

The preview supports native/translated-name search, language/era filters, collection review filters and date sorting. The Settings switches affect catalog notes and compact collection rows for the current session; mock labels cannot be hidden. Portfolio shows copy-language distribution, not catalog-completion percentages, and leaves every price unknown.

Personal-copy records are separate from catalog snapshots. `applyCatalogUpserts` accepts no personal collection and exposes no delete operation; omitted upstream records are retained. Production adapters must reconcile raw records into reviewed canonical upserts before calling it. This is an in-memory foundation, not a persisted synchronization service or a final database schema.

Not implemented: real collection editing/persistence, authentication, production scanning, live catalog synchronization, paid integrations, market valuation, historical price charts, complete card coverage, app-store builds or deployment. Do not enter real collection data into this read-only demo.

The project contains no Pokémon card scans. Visuals are abstract local UI shapes labeled preview art. Source data and image/market-feed rights must be reviewed before adding production assets.

Completion review on 2026-10-19: the preview provenance header stays visible while scrolling. Current screenshots, exact commands and separate Jest/browser/native-bundle/device results are in [the Sprint 0B handoff](docs/sprint-0b.md). Physical-device testing remains open.
