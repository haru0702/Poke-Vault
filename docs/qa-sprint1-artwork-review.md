# Independent QA handoff — Sprint 1 and artwork fix

Prepared 2026-10-19 for branch `qa/sprint1-artwork-review`. Base: `81aaeb6` (published Sprint 0A/0B). No Sprint 2 work, merge, deployment, scanner, paid provider integration or pricing feature is included.

## Included implementation

- Live TCGdex provider with physical-series membership, locale handling, pagination, cancellation, partial/error responses and no mock fallback.
- Five existing dark tabs; multilingual search/filtering and card/variant details.
- Provider-independent UUID registry, separate from persistent local user-copy transactions; explicit duplicate/additional-copy behavior and edit/removal confirmation.
- Shared card artwork URL resolver and renderer across tiles, collection and details: loading, source reset, documented rendition retry, timeout, missing and failed placeholders, safe development diagnostics.
- Six reviewed, exact English artwork mappings with attribution: two Unown cards, Charmander, Bulbasaur, Skitty and Glameow. Historical image hosting may fail per client; Pooka entries carry personal/noncommercial scope. These are representative printing images, not authentication or exact finish/condition quotes.
- Source fixtures, dated requirements/architecture/backlog notes and textual API/browser evidence. Historical Sprint 0A audit, matrix, evidence and baseline remain unchanged.

## Reproduce independently

From a fresh checkout of this branch, using Node.js 24 LTS and npm:

```sh
npm ci
npm run check
npm run export:web
npx expo export --platform ios --platform android --output-dir /tmp/pokevault-independent-qa-native
```

`check` runs protected audit hashes, TypeScript, zero-warning ESLint and the entire Jest suite. Tests use controlled responses and a synthetic in-memory/AsyncStorage mock; they require no API credentials and deliberately reject accidental network requests. Use a new browser origin/app sandbox for live collection tests; do not use personal collection records.

## Actual preparation results

- `npm run check`: PASS; TypeScript, lint and **6 suites / 54 tests** passed.
- `npm run verify:audit` within check: PASS; **194 protected Sprint 0A files unchanged**.
- `npm run export:web`: PASS; **12 static routes**.
- Native export: PASS for iOS and Android, local output `/tmp/pokevault-qa-sprint1-artwork`.
- `git diff --check`: PASS.
- Candidate text-file review plus high-confidence private-key, token, credential-URL and assigned-secret pattern checks: no detected secrets. This is not a claim of exhaustive secret detection.
- Generated build outputs, dependencies, Expo state, logs and generated PNG screenshots are excluded. No card image binaries or personal collection document is included. `docs/sprint-1-previews/verification.json` and `docs/artwork-evidence/` are intentional textual verification/research evidence, not build output.

## Review focus and limits

Inspect provider filtering/cancellation and unknown-data behavior; test variant/rarity separation and exact number/language identity; verify that catalog operations never write user copies; test failed writes, corrupt storage, duplicate submission and intentional additional copies. Exercise artwork failure, stalls, source changes and locale/number mismatches. Tests are in `__tests__/tcgdex.test.ts`, `vault.test.ts`, `navigation.test.tsx`, `artwork.test.tsx` plus the retained foundation tests.

Previous live browser checks and manual iPhone instructions are in [Sprint 1](sprint-1.md), and source/provenance/recovery details are in [artwork report](sprint-1-artwork-fix.md). Generated screenshots remain on the original local workspace and are deliberately not committed. Their historical references are labeled local-only.

Physical iPhone/Android acceptance is still unverified. Bundle export does not certify device decoding. External catalog/artwork availability is not guaranteed; no universal catalog completeness claim. Review image-source scope before public/commercial distribution. Local collection has no cloud backup, export or cross-tab locking. Independent QA and user Sprint 1 review remain pending; do not start Sprint 2 from this handoff alone.
