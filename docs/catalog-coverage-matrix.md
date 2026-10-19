# PokéVault Sprint 0A — catalog coverage matrix

Review date: **2026-10-19 (Asia/Manila)**. TCGdex observations: saved Sprint 0A responses fetched **2026-10-19**, with exact UTC timestamps and hashes in the manifests. This review does not refresh those API responses. Supplemental-provider documentation was checked on the review date and is explicitly distinguished below.

**Foundation recommendation: CONDITIONAL GO. Full catalog completeness claim: NO-GO.** No era-language slice in the saved evidence qualifies as Verified Complete. A foundation can support uncertain and missing data; it cannot honestly promise a finished universal catalog.

## Scope and interpretation

The matrix covers the full historical sequence starting with Japan's 1996 original releases, including Japanese-specific VS/web, ADV/PCG, DP/DPt, LEGEND and XY BREAK; international special series; promos and regional releases. Era labels are comparison buckets, not assertions that Japanese and international sets are interchangeable. Actual regional release timing differs. English, Japanese, Korean, both Chinese scripts, Thai, Indonesian, French, German, Italian, Spanish, Portuguese, Dutch, Polish, Russian and Latin American Spanish have distinct rows.

**Number of known sets** means the independently evidenced official total for that era/language, not the provider's own list size. Sprint 0A did not establish such totals. `U` is therefore the correct answer for most cells. A lower bound is explicitly marked and never presented as a total. **Expected card count** likewise requires an independently reconciled official checklist. Provider totals appear only as diagnostics, never authoritative denominators. No missing-count subtraction or completion percentage is justified from these data.

**Actual retrieved card count** separates `B` = card briefs inside saved individual set-detail responses from `D` = distinct saved full card-detail responses. `NR` means not retrieved at that level, not zero cards in TCGdex. Series/set-list briefs are not card retrievals. Within a row B counts distinct card IDs in distinct sampled sets; D is a subset/sample and is never added to B. These are retrieved sample counts, not an era-wide census. A successful empty set response is recorded as zero B and is materially different from NR.

**Release period:** `Provider start YYYY-MM-DD; end U` quotes the saved series `releaseDate`, with the earliest value used where a bucket spans multiple provider series. It is a provider assertion, not a certified local launch date or a full era interval. In particular, saved Japanese SV/M dates and dates repeated across European locales must not be promoted to official chronology. End dates and regional distribution windows remain unverified. All observations stop at the audit date; listing a future or unverified product does not prove release. J1 below independently anchors the Japanese 1996 start. The matrix deliberately leaves unsupported dates unknown instead of inventing conventional ranges.

Known officially unreleased language-era combinations should eventually be marked not applicable in the release registry. Because the requested status vocabulary has no not-applicable state, unestablished combinations are **Unverified**, never automatically **Missing**. Zero found means zero entries in the saved mapped series inventory, not proof of historical non-release or absence under every alternate grouping.

## Status and cell legend

| Code / status | Meaning |
| --- | --- |
| Verified Complete | Every applicable set, base printing and in-scope variant reconciled to independent versioned official evidence; required metadata checked. **No row currently meets this standard.** Pricing completeness is separately scoped. |
| Partial | Card-detail or set-card sampling establishes some representation but not complete era/language coverage, or an explicit empty shell exists alongside metadata. |
| Missing | Official releases are independently established but no corresponding sets are found in the audited era/language inventory. Scope is the observed grouping; alternate locations still require search. |
| Unverified | Set metadata may exist, but card coverage was not established; or release applicability is unresolved. Not a judgment that listed cards are necessarily incomplete. |
| G0 | Set identities exist; official denominator, full details, fields/images and variants not reconciled. |
| G1 | No corresponding series/set entries found; historical applicability or alternate grouping unresolved. |
| G2 | Official Japanese DP/DPt/BW gap relative to J1; exact missing-set/card totals U. |
| G3 | Only listed sample set/card responses checked; rest of era unknown. |
| G4 | Explicit empty-card shell(s); provider total is nonzero. Missing official identities/count still U. |
| V0 | Variant coverage unverified; no full-card sample for this row. |
| V1 | Detailed variant records observed on sampled cards; era-wide variant completeness unverified. |
| P0 | Pricing not examined for this row; neither absence nor availability inferred. |
| P1 | At least one sampled root Cardmarket object exists; TCGplayer null in saved samples. Currency/condition/language/variant mapping not independently certified; no era-wide pricing inference. |
| P2 | Both market providers null on sampled card(s); not proof all cards or marketplaces are unpriced. |
| O / J / R / C / A? / S? | Source recommendations defined below. Question mark means a supplementary provider candidate, not a validated gap-fill commitment. |

## Evidence and additional-source register

All local evidence links below refer to unchanged Sprint 0A snapshots, dated 2026-10-19. Every numbered set-count cell links its saved series detail(s), or the saved locale-series list when no matching series exists. Full set IDs and names are in [set inventory](audit-evidence/set-inventory.csv), with [series inventory](audit-evidence/series-inventory.csv), [request outcomes](audit-evidence/requests.json) and [detail outcomes](audit-evidence/requests-detail.json). Hashes were revalidated for this review. Every requested series detail succeeded; transport success is not content verification.

| Code | Recommended source and verified scope as of 2026-10-19 | Gap-fill confidence / limitations |
| --- | --- | --- |
| J / J1 | [Official Japanese chronology](https://www.pokemon-card.com/20th/chronicle/) establishes the first expansion/starter on 1996-10-20 and historical DP/DPt/BW products. [Official Japanese promo checklist](https://www.pokemon-card.com/ex/25th/s8aP/index.html) documents the 25th promo pack (already recorded in Sprint 0A). | Authoritative release/checklist evidence; not a verified exhaustive bulk API for all old promos or variants. Manually reconcile exact physical printings. |
| O | Official international Pokémon product/checklist material. The [all-expansions page](https://tcg.pokemon.com/en-us/all-expansions/) returned no usable listing text through web retrieval in this review. | Recommended authority, but this check did not establish a complete denominator. Individual PDFs/product pages must be acquired and versioned. |
| R | Official regional publisher/operator product pages and original packaging/checklists, selected separately for Korean, Chinese, Thai, Indonesian and historic European markets. | Research route, not a named, confirmed machine-readable provider. Sprint 0A did not save exhaustive regional official checklists. Reliability must be established per source and release. |
| C | PokéVault curated local catalog with evidence-linked official scans/checklists, editorial review and conflict retention. | Can represent verified missing identities without waiting for an API. Manual work, rights and historic source availability remain constraints; no invented translations or variants. |
| A? | [PokemonTCG/pokemon-tcg-data](https://github.com/PokemonTCG/pokemon-tcg-data) is the repository of Pokémon TCG API data; evaluate a pinned snapshot for English overlap and independent reconciliation. | No per-gap record comparison or rights review performed here. Not a certified all-language or all-variant source. Do not infer independence if records share upstream origins. |
| S? | [Scrydex documentation](https://scrydex.com/docs) and [provider site](https://scrydex.com/) expose Pokémon catalog/market capabilities and separate English/Japanese browsing. | Candidate for English/Japanese gaps and compatible market data. Exact historical DP/DPt/BW, regional-language, promo, variant and price coverage is **unverified**; no authenticated API query or purchase made. |

Important new provider finding: [Pokémon TCG API's own documentation](https://docs.pokemontcg.io/api-reference/cards/card-object/) currently announces deprecation, no new registrations and existing-key operation through 2027-03-01, directing migration to Scrydex. This is documented provider guidance checked on the review date, not an independently tested service cutoff. Do **not** choose its live API as a new foundational dependency. Its [set reference](https://docs.pokemontcg.io/api-reference/sets/set-object/) also defines release dates as USA dates, unsuitable for establishing regional chronology. Scrydex marketing/examples are capability claims, not proof its catalog fills any particular matrix row.

## Historical and current era × language matrix

Each section has the exact requested columns. Promo sets grouped by the provider within an era remain in its set count. The separate promo and cross-era tables below overlap these counts and must not be summed with them. Known digital `tcgp` series are excluded. `U` cells are an explicit finding about insufficient evidence, not omitted analysis.

### Original / Base / Gym

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Original / Base / Gym | Provider start 1996-10-20; end U | Japanese (`ja`) | U | 6 [PMCG](audit-evidence/v2__ja__series__PMCG.json) | U; sampled provider totals 102 (not official E) | 102 B / 1 sets; 0 D | G3 | V0 | P0 | Partial | J+C; S? |
| Original / Base / Gym | Provider start 1999-01-09; end U | English (`en`) | U | 9 [base](audit-evidence/v2__en__series__base.json), [gym](audit-evidence/v2__en__series__gym.json) | U; sampled provider totals 155 (not official E) | 155 B / 2 sets; 2 D | G3 | V1 | P1 | Partial | O+C; A?/S? |
| Original / Base / Gym | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Original / Base / Gym | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Original / Base / Gym | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Original / Base / Gym | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Original / Base / Gym | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Original / Base / Gym | Provider start 1999-01-09; end U | French (`fr`) | U | 6 [base](audit-evidence/v2__fr__series__base.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Original / Base / Gym | Provider start 1999-01-09; end U | German (`de`) | U | 5 [base](audit-evidence/v2__de__series__base.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Original / Base / Gym | Provider start 1999-01-09; end U | Italian (`it`) | U | 6 [base](audit-evidence/v2__it__series__base.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Original / Base / Gym | Provider start 1999-01-09; end U | Spanish (provider es) (`es`) | U | 4 [base](audit-evidence/v2__es__series__base.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Original / Base / Gym | Provider start 1999-01-09; end U | Portuguese (provider pt) (`pt`) | U | 3 [base](audit-evidence/v2__pt__series__base.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Original / Base / Gym | Provider start 1999-01-09; end U | Dutch (`nl`) | U | 3 [base](audit-evidence/v2__nl__series__base.json) | U; sampled provider totals 102 (not official E) | 0 B / 1 sets; 0 D | G4: base1 | V0 | P0 | Partial | R+C |
| Original / Base / Gym | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Original / Base / Gym | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Original / Base / Gym | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### Neo

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Neo | Provider start 2000-02-04; end U | Japanese (`ja`) | U | 4 [neo](audit-evidence/v2__ja__series__neo.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| Neo | Provider start 2000-12-16; end U | English (`en`) | U | 5 [neo](audit-evidence/v2__en__series__neo.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| Neo | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Neo | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Neo | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Neo | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Neo | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Neo | Provider start 2000-12-16; end U | French (`fr`) | U | 4 [neo](audit-evidence/v2__fr__series__neo.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Neo | Provider start 2000-12-16; end U | German (`de`) | U | 4 [neo](audit-evidence/v2__de__series__neo.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Neo | Provider start 2000-12-16; end U | Italian (`it`) | U | 4 [neo](audit-evidence/v2__it__series__neo.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Neo | Provider start 2000-12-16; end U | Spanish (provider es) (`es`) | U | 1 [neo](audit-evidence/v2__es__series__neo.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Neo | U; applicability not established | Portuguese (provider pt) (`pt`) | U | 0 [list](audit-evidence/v2__pt__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Neo | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Neo | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Neo | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Neo | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### Legendary Collection

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Legendary Collection | U; applicability not established | Japanese (`ja`) | U | 0 [list](audit-evidence/v2__ja__series.json) | U | NR | G1 | V0 | P0 | Unverified | J+C; S? |
| Legendary Collection | Provider start 2002-05-24; end U | English (`en`) | U | 1 [lc](audit-evidence/v2__en__series__lc.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| Legendary Collection | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | French (`fr`) | U | 0 [list](audit-evidence/v2__fr__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | German (`de`) | U | 0 [list](audit-evidence/v2__de__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | Italian (`it`) | U | 0 [list](audit-evidence/v2__it__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | Spanish (provider es) (`es`) | U | 0 [list](audit-evidence/v2__es__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | Portuguese (provider pt) (`pt`) | U | 0 [list](audit-evidence/v2__pt__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Legendary Collection | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### VS

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VS | Provider start 2001-07-19; end U | Japanese (`ja`) | U | 1 [VS](audit-evidence/v2__ja__series__VS.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| VS | U; applicability not established | English (`en`) | U | 0 [list](audit-evidence/v2__en__series.json) | U | NR | G1 | V0 | P0 | Unverified | O+C; A?/S? |
| VS | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | French (`fr`) | U | 0 [list](audit-evidence/v2__fr__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | German (`de`) | U | 0 [list](audit-evidence/v2__de__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | Italian (`it`) | U | 0 [list](audit-evidence/v2__it__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | Spanish (provider es) (`es`) | U | 0 [list](audit-evidence/v2__es__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | Portuguese (provider pt) (`pt`) | U | 0 [list](audit-evidence/v2__pt__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| VS | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### web

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| web | Provider start 2001-10-20; end U | Japanese (`ja`) | U | 1 [web](audit-evidence/v2__ja__series__web.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| web | U; applicability not established | English (`en`) | U | 0 [list](audit-evidence/v2__en__series.json) | U | NR | G1 | V0 | P0 | Unverified | O+C; A?/S? |
| web | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | French (`fr`) | U | 0 [list](audit-evidence/v2__fr__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | German (`de`) | U | 0 [list](audit-evidence/v2__de__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | Italian (`it`) | U | 0 [list](audit-evidence/v2__it__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | Spanish (provider es) (`es`) | U | 0 [list](audit-evidence/v2__es__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | Portuguese (provider pt) (`pt`) | U | 0 [list](audit-evidence/v2__pt__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| web | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### E-Card / e

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| E-Card / e | Provider start 2001-12-01; end U | Japanese (`ja`) | U | 5 [e](audit-evidence/v2__ja__series__e.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| E-Card / e | Provider start 2002-08-01; end U | English (`en`) | U | 5 [ecard](audit-evidence/v2__en__series__ecard.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| E-Card / e | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| E-Card / e | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| E-Card / e | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| E-Card / e | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| E-Card / e | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| E-Card / e | Provider start 2002-09-15; end U | French (`fr`) | U | 2 [ecard](audit-evidence/v2__fr__series__ecard.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| E-Card / e | Provider start 2002-09-15; end U | German (`de`) | U | 3 [ecard](audit-evidence/v2__de__series__ecard.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| E-Card / e | Provider start 2002-09-15; end U | Italian (`it`) | U | 3 [ecard](audit-evidence/v2__it__series__ecard.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| E-Card / e | U; applicability not established | Spanish (provider es) (`es`) | U | 0 [list](audit-evidence/v2__es__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| E-Card / e | U; applicability not established | Portuguese (provider pt) (`pt`) | U | 0 [list](audit-evidence/v2__pt__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| E-Card / e | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| E-Card / e | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| E-Card / e | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| E-Card / e | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### EX / ADV / PCG

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EX / ADV / PCG | Provider start 2003-01-31; end U | Japanese (`ja`) | U | 15 [ADV](audit-evidence/v2__ja__series__ADV.json), [PCG](audit-evidence/v2__ja__series__PCG.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| EX / ADV / PCG | Provider start 2003-07-01; end U | English (`en`) | U | 18 [ex](audit-evidence/v2__en__series__ex.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| EX / ADV / PCG | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | Provider start 2003-07-01; end U | French (`fr`) | U | 16 [ex](audit-evidence/v2__fr__series__ex.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | Provider start 2003-07-01; end U | German (`de`) | U | 15 [ex](audit-evidence/v2__de__series__ex.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | Provider start 2003-07-01; end U | Italian (`it`) | U | 15 [ex](audit-evidence/v2__it__series__ex.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | Provider start 2003-07-01; end U | Spanish (provider es) (`es`) | U | 3 [ex](audit-evidence/v2__es__series__ex.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | Provider start 2003-07-01; end U | Portuguese (provider pt) (`pt`) | U | 5 [ex](audit-evidence/v2__pt__series__ex.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| EX / ADV / PCG | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### Diamond & Pearl / DP

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Diamond & Pearl / DP | Official DP era starts 2006-10-27; end U | Japanese (`ja`) | ≥1 (J1; exact total U) | 0 [list](audit-evidence/v2__ja__series.json) | U | NR | G2 | V0 | P0 | Missing | J+C; S? |
| Diamond & Pearl / DP | Provider start 2007-05-01; end U | English (`en`) | U | 8 [dp](audit-evidence/v2__en__series__dp.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| Diamond & Pearl / DP | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Diamond & Pearl / DP | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Diamond & Pearl / DP | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Diamond & Pearl / DP | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Diamond & Pearl / DP | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Diamond & Pearl / DP | Provider start 2007-05-01; end U | French (`fr`) | U | 8 [dp](audit-evidence/v2__fr__series__dp.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Diamond & Pearl / DP | Provider start 2007-05-01; end U | German (`de`) | U | 8 [dp](audit-evidence/v2__de__series__dp.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Diamond & Pearl / DP | Provider start 2007-05-01; end U | Italian (`it`) | U | 8 [dp](audit-evidence/v2__it__series__dp.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Diamond & Pearl / DP | Provider start 2007-05-01; end U | Spanish (provider es) (`es`) | U | 7 [dp](audit-evidence/v2__es__series__dp.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Diamond & Pearl / DP | Provider start 2007-05-01; end U | Portuguese (provider pt) (`pt`) | U | 3 [dp](audit-evidence/v2__pt__series__dp.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Diamond & Pearl / DP | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Diamond & Pearl / DP | Provider start 2007-05-01; end U | Polish (`pl`) | U | 2 [dp](audit-evidence/v2__pl__series__dp.json) | U; sampled provider totals 130 (not official E) | 0 B / 1 sets; 0 D | G4: dp1 | V0 | P0 | Partial | R+C |
| Diamond & Pearl / DP | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Diamond & Pearl / DP | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### Platinum / DPt

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Platinum / DPt | Official DPt starts 2008-10-10; end U | Japanese (`ja`) | ≥1 (J1; exact total U) | 0 [list](audit-evidence/v2__ja__series.json) | U | NR | G2 | V0 | P0 | Missing | J+C; S? |
| Platinum / DPt | Provider start 2009-02-11; end U | English (`en`) | U | 5 [pl](audit-evidence/v2__en__series__pl.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| Platinum / DPt | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | Provider start 2009-02-11; end U | French (`fr`) | U | 3 [pl](audit-evidence/v2__fr__series__pl.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | Provider start 2009-02-11; end U | German (`de`) | U | 4 [pl](audit-evidence/v2__de__series__pl.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | Provider start 2009-02-11; end U | Italian (`it`) | U | 3 [pl](audit-evidence/v2__it__series__pl.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | Provider start 2009-02-11; end U | Spanish (provider es) (`es`) | U | 3 [pl](audit-evidence/v2__es__series__pl.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | U; applicability not established | Portuguese (provider pt) (`pt`) | U | 0 [list](audit-evidence/v2__pt__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Platinum / DPt | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### HeartGold & SoulSilver / LEGEND

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| HeartGold & SoulSilver / LEGEND | Provider start 2009-10-09; end U | Japanese (`ja`) | U | 5 [L](audit-evidence/v2__ja__series__L.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| HeartGold & SoulSilver / LEGEND | Provider start 2010-02-10; end U | English (`en`) | U | 5 [hgss](audit-evidence/v2__en__series__hgss.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| HeartGold & SoulSilver / LEGEND | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | Provider start 2010-02-10; end U | French (`fr`) | U | 5 [hgss](audit-evidence/v2__fr__series__hgss.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | Provider start 2010-02-10; end U | German (`de`) | U | 5 [hgss](audit-evidence/v2__de__series__hgss.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | Provider start 2010-02-10; end U | Italian (`it`) | U | 5 [hgss](audit-evidence/v2__it__series__hgss.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | Provider start 2010-02-10; end U | Spanish (provider es) (`es`) | U | 3 [hgss](audit-evidence/v2__es__series__hgss.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | Provider start 2010-02-10; end U | Portuguese (provider pt) (`pt`) | U | 4 [hgss](audit-evidence/v2__pt__series__hgss.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| HeartGold & SoulSilver / LEGEND | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### Call of Legends

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Call of Legends | U; applicability not established | Japanese (`ja`) | U | 0 [list](audit-evidence/v2__ja__series.json) | U | NR | G1 | V0 | P0 | Unverified | J+C; S? |
| Call of Legends | Provider start 2011-02-09; end U | English (`en`) | U | 1 [col](audit-evidence/v2__en__series__col.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| Call of Legends | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Call of Legends | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Call of Legends | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Call of Legends | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Call of Legends | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Call of Legends | Provider start 2011-02-09; end U | French (`fr`) | U | 1 [col](audit-evidence/v2__fr__series__col.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Call of Legends | Provider start 2011-02-09; end U | German (`de`) | U | 1 [col](audit-evidence/v2__de__series__col.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Call of Legends | Provider start 2011-02-09; end U | Italian (`it`) | U | 1 [col](audit-evidence/v2__it__series__col.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Call of Legends | U; applicability not established | Spanish (provider es) (`es`) | U | 0 [list](audit-evidence/v2__es__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Call of Legends | Provider start 2011-02-09; end U | Portuguese (provider pt) (`pt`) | U | 1 [col](audit-evidence/v2__pt__series__col.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Call of Legends | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Call of Legends | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Call of Legends | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Call of Legends | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### Black & White / BW

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Black & White / BW | Official BW era documented; bounds U | Japanese (`ja`) | ≥1 (J1; exact total U) | 0 [list](audit-evidence/v2__ja__series.json) | U | NR | G2 | V0 | P0 | Missing | J+C; S? |
| Black & White / BW | Provider start 2011-04-25; end U | English (`en`) | U | 14 [bw](audit-evidence/v2__en__series__bw.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| Black & White / BW | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Black & White / BW | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Black & White / BW | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Black & White / BW | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Black & White / BW | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Black & White / BW | Provider start 2011-04-25; end U | French (`fr`) | U | 13 [bw](audit-evidence/v2__fr__series__bw.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Black & White / BW | Provider start 2011-04-25; end U | German (`de`) | U | 12 [bw](audit-evidence/v2__de__series__bw.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Black & White / BW | Provider start 2011-04-25; end U | Italian (`it`) | U | 12 [bw](audit-evidence/v2__it__series__bw.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Black & White / BW | Provider start 2011-04-25; end U | Spanish (provider es) (`es`) | U | 11 [bw](audit-evidence/v2__es__series__bw.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Black & White / BW | Provider start 2011-04-25; end U | Portuguese (provider pt) (`pt`) | U | 12 [bw](audit-evidence/v2__pt__series__bw.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Black & White / BW | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Black & White / BW | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Black & White / BW | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Black & White / BW | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### XY / XY BREAK

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| XY / XY BREAK | Provider start 2013-12-13; end U | Japanese (`ja`) | U | 21 [XY](audit-evidence/v2__ja__series__XY.json), [XYb](audit-evidence/v2__ja__series__XYb.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| XY / XY BREAK | Provider start 2013-10-12; end U | English (`en`) | U | 17 [xy](audit-evidence/v2__en__series__xy.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| XY / XY BREAK | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | Provider start 2013-10-12; end U | French (`fr`) | U | 17 [xy](audit-evidence/v2__fr__series__xy.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | Provider start 2013-10-12; end U | German (`de`) | U | 16 [xy](audit-evidence/v2__de__series__xy.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | Provider start 2013-10-12; end U | Italian (`it`) | U | 16 [xy](audit-evidence/v2__it__series__xy.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | Provider start 2013-10-12; end U | Spanish (provider es) (`es`) | U | 15 [xy](audit-evidence/v2__es__series__xy.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | Provider start 2013-11-08; end U | Portuguese (provider pt) (`pt`) | U | 15 [xy](audit-evidence/v2__pt__series__xy.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | Provider start 2013-11-08; end U | Russian (`ru`) | U | 9 [xy](audit-evidence/v2__ru__series__xy.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| XY / XY BREAK | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### Sun & Moon

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Sun & Moon | Provider start 2016-11-18; end U | Japanese (`ja`) | U | 42 [SM](audit-evidence/v2__ja__series__SM.json) | U; sampled provider totals 73 (not official E) | 73 B / 1 sets; 1 D | G3 | V1 | P1 | Partial | J+C; S? |
| Sun & Moon | Provider start 2017-02-03; end U | English (`en`) | U | 18 [sm](audit-evidence/v2__en__series__sm.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| Sun & Moon | Provider start 2016-12-09; end U | Korean (`ko`) | U | 35 [SM](audit-evidence/v2__ko__series__SM.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sun & Moon | Provider start 2020-10-28; end U | Simplified Chinese (`zh-cn`) | U | 17 [SM](audit-evidence/v2__zh-cn__series__SM.json) | U; sampled provider totals 151 (not official E) | 0 B / 1 sets; 0 D | G4: CSM1aC | V0 | P0 | Partial | R+C |
| Sun & Moon | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Sun & Moon | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Sun & Moon | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Sun & Moon | Provider start 2017-02-03; end U | French (`fr`) | U | 18 [sm](audit-evidence/v2__fr__series__sm.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sun & Moon | Provider start 2017-02-03; end U | German (`de`) | U | 18 [sm](audit-evidence/v2__de__series__sm.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sun & Moon | Provider start 2017-02-03; end U | Italian (`it`) | U | 18 [sm](audit-evidence/v2__it__series__sm.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sun & Moon | Provider start 2017-02-03; end U | Spanish (provider es) (`es`) | U | 18 [sm](audit-evidence/v2__es__series__sm.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sun & Moon | Provider start 2017-02-03; end U | Portuguese (provider pt) (`pt`) | U | 18 [sm](audit-evidence/v2__pt__series__sm.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sun & Moon | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Sun & Moon | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Sun & Moon | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Sun & Moon | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### Sword & Shield

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Sword & Shield | Provider start 2019-12-06; end U | Japanese (`ja`) | U | 45 [S](audit-evidence/v2__ja__series__S.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| Sword & Shield | Provider start 2019-11-15; end U | English (`en`) | U | 26 [swsh](audit-evidence/v2__en__series__swsh.json) | U; sampled provider totals 201 (not official E) | 201 B / 1 sets; 1 D | G3 | V1 | P1 | Partial | O+C; A?/S? |
| Sword & Shield | Provider start 2019-12-06; end U | Korean (`ko`) | U | 45 [S](audit-evidence/v2__ko__series__S.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sword & Shield | Provider start 2023-05-19; end U | Simplified Chinese (`zh-cn`) | U | 18 [S](audit-evidence/v2__zh-cn__series__S.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sword & Shield | Provider start 2020-08-21; end U | Traditional Chinese (`zh-tw`) | U | 62 [S](audit-evidence/v2__zh-tw__series__S.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sword & Shield | Provider start 2024-04-26; end U | Thai (`th`) | U | 49 [S](audit-evidence/v2__th__series__S.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sword & Shield | Provider start 2024-04-26; end U | Indonesian (`id`) | U | 48 [S](audit-evidence/v2__id__series__S.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sword & Shield | Provider start 2019-11-15; end U | French (`fr`) | U | 25 [swsh](audit-evidence/v2__fr__series__swsh.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sword & Shield | Provider start 2019-11-15; end U | German (`de`) | U | 25 [swsh](audit-evidence/v2__de__series__swsh.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sword & Shield | Provider start 2019-11-15; end U | Italian (`it`) | U | 25 [swsh](audit-evidence/v2__it__series__swsh.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sword & Shield | Provider start 2019-11-15; end U | Spanish (provider es) (`es`) | U | 25 [swsh](audit-evidence/v2__es__series__swsh.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sword & Shield | Provider start 2019-11-15; end U | Portuguese (provider pt) (`pt`) | U | 25 [swsh](audit-evidence/v2__pt__series__swsh.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Sword & Shield | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Sword & Shield | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Sword & Shield | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Sword & Shield | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### Scarlet & Violet

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Scarlet & Violet | Provider start 2024-01-26; end U | Japanese (`ja`) | U | 29 [SV](audit-evidence/v2__ja__series__SV.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| Scarlet & Violet | Provider start 2023-03-31; end U | English (`en`) | U | 19 [sv](audit-evidence/v2__en__series__sv.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| Scarlet & Violet | U; applicability not established | Korean (`ko`) | U | 15 [SV](audit-evidence/v2__ko__series__SV.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | Provider start 2025-01-17; end U | Simplified Chinese (`zh-cn`) | U | 21 [SV](audit-evidence/v2__zh-cn__series__SV.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | Provider start 2024-02-02; end U | Traditional Chinese (`zh-tw`) | U | 36 [SV](audit-evidence/v2__zh-tw__series__SV.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | Provider start 2023-11-10; end U | Thai (`th`) | U | 23 [SV](audit-evidence/v2__th__series__SV.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | Provider start 2023-10-27; end U | Indonesian (`id`) | U | 22 [SV](audit-evidence/v2__id__series__SV.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | Provider start 2023-03-31; end U | French (`fr`) | U | 18 [sv](audit-evidence/v2__fr__series__sv.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | Provider start 2023-03-31; end U | German (`de`) | U | 18 [sv](audit-evidence/v2__de__series__sv.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | Provider start 2023-03-31; end U | Italian (`it`) | U | 18 [sv](audit-evidence/v2__it__series__sv.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | Provider start 2023-03-31; end U | Spanish (provider es) (`es`) | U | 18 [sv](audit-evidence/v2__es__series__sv.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | Provider start 2023-03-31; end U | Portuguese (provider pt) (`pt`) | U | 18 [sv](audit-evidence/v2__pt__series__sv.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Scarlet & Violet | Provider start 2025-03-28; end U | Latin American Spanish (`es-mx`) | U | 2 [sv](audit-evidence/v2__es-mx__series__sv.json) | U; sampled provider totals 190 (not official E) | 190 B / 1 sets; 0 D | G3 | V0 | P0 | Partial | R+C |

### Mega Evolution / MEGA

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Mega Evolution / MEGA | Provider start 2026-03-13; end U | Japanese (`ja`) | U | 10 [M](audit-evidence/v2__ja__series__M.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| Mega Evolution / MEGA | Provider start 2025-09-25; end U | English (`en`) | U | 10 [me](audit-evidence/v2__en__series__me.json) | U; sampled provider totals 158 (not official E) | 158 B / 1 sets; 0 D | G3 | V0 | P0 | Partial | O+C; A?/S? |
| Mega Evolution / MEGA | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | Provider start 2025-09-25; end U | French (`fr`) | U | 10 [me](audit-evidence/v2__fr__series__me.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | Provider start 2025-09-25; end U | German (`de`) | U | 10 [me](audit-evidence/v2__de__series__me.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | Provider start 2025-09-25; end U | Italian (`it`) | U | 10 [me](audit-evidence/v2__it__series__me.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | Provider start 2025-09-25; end U | Spanish (provider es) (`es`) | U | 10 [me](audit-evidence/v2__es__series__me.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | Provider start 2025-09-25; end U | Portuguese (provider pt) (`pt`) | U | 10 [me](audit-evidence/v2__pt__series__me.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Mega Evolution / MEGA | Provider start 2025-09-26; end U | Latin American Spanish (`es-mx`) | U | 9 [me](audit-evidence/v2__es-mx__series__me.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |

## Japanese native-era subdivisions

The principal matrix combines historical families only for comparison. These subdivisions preserve every Japanese series returned by the evidence, including ADV, PCG and XY BREAK separately. Counts overlap their parent rows above. Periods remain provider starts, not verified era boundaries.

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Original PMCG (includes Gym) | Provider start 1996-10-20; end U | Japanese (`ja`) | U | 6 [PMCG](audit-evidence/v2__ja__series__PMCG.json) | U; sampled provider totals 102 (not official E) | 102 B / 1 sets; 0 D | G3 | V0 | P0 | Partial | J+C; S? |
| ADV | Provider start 2003-01-31; end U | Japanese (`ja`) | U | 5 [ADV](audit-evidence/v2__ja__series__ADV.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| PCG | Provider start 2004-04-09; end U | Japanese (`ja`) | U | 10 [PCG](audit-evidence/v2__ja__series__PCG.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| LEGEND | Provider start 2009-10-09; end U | Japanese (`ja`) | U | 5 [L](audit-evidence/v2__ja__series__L.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| XY | Provider start 2013-12-13; end U | Japanese (`ja`) | U | 11 [XY](audit-evidence/v2__ja__series__XY.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |
| XY BREAK | Provider start 2015-09-26; end U | Japanese (`ja`) | U | 10 [XYb](audit-evidence/v2__ja__series__XYb.json) | U | NR | G0 | V0 | P0 | Unverified | J+C; S? |

## Cross-era products, organized play and regional promotions

These are supplemental product/campaign groupings, not additional chronological eras. Provider series membership defines only the listed counts. A deck or campaign absent from such a grouping may still be filed in a main era. All 16 language inventories are checked separately; zero is therefore meaningful as inventory absence, not automatic official non-release.

### Miscellaneous / unclassified promos

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Miscellaneous / unclassified promos | U; applicability not established | Japanese (`ja`) | U | 0 [list](audit-evidence/v2__ja__series.json) | U | NR | G1 | V0 | P0 | Unverified | J+C; S? |
| Miscellaneous / unclassified promos | Provider start 1996-01-01; end U | English (`en`) | U | 2 [misc](audit-evidence/v2__en__series__misc.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| Miscellaneous / unclassified promos | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | Provider start 2000-02-01; end U | French (`fr`) | U | 1 [misc](audit-evidence/v2__fr__series__misc.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | U; applicability not established | German (`de`) | U | 0 [list](audit-evidence/v2__de__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | U; applicability not established | Italian (`it`) | U | 0 [list](audit-evidence/v2__it__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | U; applicability not established | Spanish (provider es) (`es`) | U | 0 [list](audit-evidence/v2__es__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | U; applicability not established | Portuguese (provider pt) (`pt`) | U | 0 [list](audit-evidence/v2__pt__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Miscellaneous / unclassified promos | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### POP organized-play series

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| POP organized-play series | U; applicability not established | Japanese (`ja`) | U | 0 [list](audit-evidence/v2__ja__series.json) | U | NR | G1 | V0 | P0 | Unverified | J+C; S? |
| POP organized-play series | Provider start 2003-10-01; end U | English (`en`) | U | 10 [pop](audit-evidence/v2__en__series__pop.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| POP organized-play series | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| POP organized-play series | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| POP organized-play series | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| POP organized-play series | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| POP organized-play series | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| POP organized-play series | Provider start 2003-10-01; end U | French (`fr`) | U | 7 [pop](audit-evidence/v2__fr__series__pop.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| POP organized-play series | U; applicability not established | German (`de`) | U | 0 [list](audit-evidence/v2__de__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| POP organized-play series | Provider start 2003-10-01; end U | Italian (`it`) | U | 8 [pop](audit-evidence/v2__it__series__pop.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| POP organized-play series | Provider start 2003-10-01; end U | Spanish (provider es) (`es`) | U | 1 [pop](audit-evidence/v2__es__series__pop.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| POP organized-play series | U; applicability not established | Portuguese (provider pt) (`pt`) | U | 0 [list](audit-evidence/v2__pt__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| POP organized-play series | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| POP organized-play series | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| POP organized-play series | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| POP organized-play series | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### Trainer kits / deck products

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Trainer kits / deck products | U; applicability not established | Japanese (`ja`) | U | 0 [list](audit-evidence/v2__ja__series.json) | U | NR | G1 | V0 | P0 | Unverified | J+C; S? |
| Trainer kits / deck products | Provider start 2004-07-01; end U | English (`en`) | U | 20 [tk](audit-evidence/v2__en__series__tk.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| Trainer kits / deck products | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | Provider start 2004-07-01; end U | French (`fr`) | U | 20 [tk](audit-evidence/v2__fr__series__tk.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | U; applicability not established | German (`de`) | U | 0 [list](audit-evidence/v2__de__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | Provider start 2004-07-01; end U | Italian (`it`) | U | 18 [tk](audit-evidence/v2__it__series__tk.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | Provider start 2004-07-01; end U | Spanish (provider es) (`es`) | U | 20 [tk](audit-evidence/v2__es__series__tk.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | U; applicability not established | Portuguese (provider pt) (`pt`) | U | 0 [list](audit-evidence/v2__pt__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| Trainer kits / deck products | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### McDonald's regional collections

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| McDonald's regional collections | U; applicability not established | Japanese (`ja`) | U | 0 [list](audit-evidence/v2__ja__series.json) | U | NR | G1 | V0 | P0 | Unverified | J+C; S? |
| McDonald's regional collections | Provider start 2011-06-17; end U | English (`en`) | U | 12 [mc](audit-evidence/v2__en__series__mc.json) | U | NR | G0 | V0 | P0 | Unverified | O+C; A?/S? |
| McDonald's regional collections | U; applicability not established | Korean (`ko`) | U | 0 [list](audit-evidence/v2__ko__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | U; applicability not established | Simplified Chinese (`zh-cn`) | U | 0 [list](audit-evidence/v2__zh-cn__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | U; applicability not established | Traditional Chinese (`zh-tw`) | U | 0 [list](audit-evidence/v2__zh-tw__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | U; applicability not established | Thai (`th`) | U | 0 [list](audit-evidence/v2__th__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | U; applicability not established | Indonesian (`id`) | U | 0 [list](audit-evidence/v2__id__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | Provider start 2011-06-17; end U | French (`fr`) | U | 13 [mc](audit-evidence/v2__fr__series__mc.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | U; applicability not established | German (`de`) | U | 0 [list](audit-evidence/v2__de__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | Provider start 2011-06-17; end U | Italian (`it`) | U | 12 [mc](audit-evidence/v2__it__series__mc.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | Provider start 2011-06-17; end U | Spanish (provider es) (`es`) | U | 6 [mc](audit-evidence/v2__es__series__mc.json) | U | NR | G0 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | U; applicability not established | Portuguese (provider pt) (`pt`) | U | 0 [list](audit-evidence/v2__pt__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | U; applicability not established | Dutch (`nl`) | U | 0 [list](audit-evidence/v2__nl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | U; applicability not established | Polish (`pl`) | U | 0 [list](audit-evidence/v2__pl__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | U; applicability not established | Russian (`ru`) | U | 0 [list](audit-evidence/v2__ru__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |
| McDonald's regional collections | U; applicability not established | Latin American Spanish (`es-mx`) | U | 0 [list](audit-evidence/v2__es-mx__series.json) | U | NR | G1 | V0 | P0 | Unverified | R+C |

### Named promo-set candidates per language

Counts below select unique set IDs with `promo` or `プロモ` in the saved native name, plus the known English W Promotional `wp`. This transparent discovery filter is **not** an official promo census: it misses unnumbered distributions, differently named promos, deck exclusives and unknown regional variants. Other regional exclusives must be researched using R/C. A main-set language translation is not evidence of local promo release.

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| All eras — named promo candidates | Distribution dates U | Japanese (`ja`) | U | 2 [native list](audit-evidence/v2__ja__sets.json) | U | NR | Exact IDs: SV-P, M-P; completeness U | V0 | P0 | Unverified | J+C; S? |
| All eras — named promo candidates | Distribution dates U | English (`en`) | U | 12 [native list](audit-evidence/v2__en__sets.json) | U | 53 B / 1 sets; 1 D | Exact IDs: miscp, basep, wp, np, dpp, hgssp, bwp, xyp, smp, swshp, svp, mep; completeness U | V1 | P2 | Partial | O+C; A?/S? |
| All eras — named promo candidates | Distribution dates U | Korean (`ko`) | U | 0 [native list](audit-evidence/v2__ko__sets.json) | U | NR | Exact IDs: none by filter; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | Simplified Chinese (`zh-cn`) | U | 0 [native list](audit-evidence/v2__zh-cn__sets.json) | U | NR | Exact IDs: none by filter; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | Traditional Chinese (`zh-tw`) | U | 0 [native list](audit-evidence/v2__zh-tw__sets.json) | U | NR | Exact IDs: none by filter; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | Thai (`th`) | U | 0 [native list](audit-evidence/v2__th__sets.json) | U | NR | Exact IDs: none by filter; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | Indonesian (`id`) | U | 2 [native list](audit-evidence/v2__id__sets.json) | U | NR | Exact IDs: S-P, SV-P; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | French (`fr`) | U | 11 [native list](audit-evidence/v2__fr__sets.json) | U | NR | Exact IDs: basep, wp, np, dpp, hgssp, bwp, xyp, smp, swshp, svp, mep; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | German (`de`) | U | 9 [native list](audit-evidence/v2__de__sets.json) | U | NR | Exact IDs: basep, dpp, hgssp, bwp, xyp, smp, swshp, svp, mep; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | Italian (`it`) | U | 11 [native list](audit-evidence/v2__it__sets.json) | U | NR | Exact IDs: basep, wp, np, dpp, hgssp, bwp, xyp, smp, swshp, svp, mep; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | Spanish (provider es) (`es`) | U | 10 [native list](audit-evidence/v2__es__sets.json) | U | NR | Exact IDs: basep, np, dpp, hgssp, bwp, xyp, smp, swshp, svp, mep; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | Portuguese (provider pt) (`pt`) | U | 4 [native list](audit-evidence/v2__pt__sets.json) | U | NR | Exact IDs: smp, swshp, svp, mep; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | Dutch (`nl`) | U | 0 [native list](audit-evidence/v2__nl__sets.json) | U | NR | Exact IDs: none by filter; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | Polish (`pl`) | U | 0 [native list](audit-evidence/v2__pl__sets.json) | U | NR | Exact IDs: none by filter; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | Russian (`ru`) | U | 0 [native list](audit-evidence/v2__ru__sets.json) | U | NR | Exact IDs: none by filter; completeness U | V0 | P0 | Unverified | R+C |
| All eras — named promo candidates | Distribution dates U | Latin American Spanish (`es-mx`) | U | 1 [native list](audit-evidence/v2__es-mx__sets.json) | U | NR | Exact IDs: mep; completeness U | V0 | P0 | Unverified | R+C |

## Set-level proof points and regional-exclusive gaps

These rows isolate what was actually retrieved. “Expected” is explicitly labeled provider-reported unless independently verified; equality is never promoted to Verified Complete. Each sample links its original JSON and URL is recoverable from the manifests.

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Mega Evolution — 30th | Provider set date 2026-09-16 | English | U | 1 [sample](audit-evidence/v2__en__sets__30th.json) | U official; provider total 158, printed 128 | 158 B; 0 D | Checklist, variants, images and official count unverified | V0 | P0 | Partial | O+C; A?/S? |
| Base — base1 | Provider set date 1999-01-09 | English | U | 1 [sample](audit-evidence/v2__en__sets__base1.json) | U official; provider total 102, printed 102 | 102 B; 1 D | Checklist, variants, images and official count unverified | V1 | P1 | Partial | O+C; A?/S? |
| Base — basep | Provider set date 1999-07-01 | English | U | 1 [sample](audit-evidence/v2__en__sets__basep.json) | U official; provider total 53, printed 53 | 53 B; 1 D | Checklist, variants, images and official count unverified | V1 | P2 | Partial | O+C; A?/S? |
| Sword & Shield — swsh3 | Provider set date 2020-08-14 | English | U | 1 [sample](audit-evidence/v2__en__sets__swsh3.json) | U official; provider total 201, printed 189 | 201 B; 1 D | Checklist, variants, images and official count unverified | V1 | P1 | Partial | O+C; A?/S? |
| Escarlata y Púrpura — sv09 | Provider set date 2025-03-28 | Latin American Spanish | U | 1 [sample](audit-evidence/v2__es-mx__sets__sv09.json) | U official; provider total 190, printed 159 | 190 B; 0 D | Checklist, variants, images and official count unverified | V0 | P0 | Partial | R+C |
| ポケットモンスターカードゲーム — PMCG1 | Provider set date 1996-10-20 | Japanese | U | 1 [sample](audit-evidence/v2__ja__sets__PMCG1.json) | U official; provider total 102, printed 102 | 102 B; 0 D | Provider 102 must not be treated as independently verified Japanese checklist | V0 | P0 | Partial | J+C; S? |
| サン＆ムーン — SM1M | Provider set date 2016-12-09 | Japanese | U | 1 [sample](audit-evidence/v2__ja__sets__SM1M.json) | U official; provider total 73, printed 60 | 73 B; 1 D | Checklist, variants, images and official count unverified | V1 | P1 | Partial | J+C; S? |
| Basis — base1 | Provider set date 1999-01-09 | Dutch | U | 1 [sample](audit-evidence/v2__nl__sets__base1.json) | U official; provider total 102, printed 102 | 0 B; 0 D | Empty card list; nonzero provider total. Official missing identities U | V0 | P0 | Partial | R+C |
| Diament i Perla — dp1 | Provider set date 2007-05-01 | Polish | U | 1 [sample](audit-evidence/v2__pl__sets__dp1.json) | U official; provider total 130, printed 130 | 0 B; 0 D | Empty card list; nonzero provider total. Official missing identities U | V0 | P0 | Partial | R+C |
| 太阳&月亮 — CSM1aC | Provider set date 2020-10-28 | Simplified Chinese | U | 1 [sample](audit-evidence/v2__zh-cn__sets__CSM1aC.json) | U official; provider total 151, printed 151 | 0 B; 0 D | Empty card list; nonzero provider total. Official missing identities U | V0 | P0 | Partial | R+C |

| Era | Release period | Language | Number of known sets | Number of sets found in TCGdex | Expected card count | Actual retrieved card count | Missing or incomplete records | Variant coverage | Pricing availability | Coverage status | Recommended additional data source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Sword & Shield — Japanese 25th promo pack | 2021 anniversary; exact distribution window U | Japanese | ≥1 official pack (J1); full promo total U | 0 matching standalone entry found; S8a main set is not promo proof | U; official checklist not enumerated locally | NR | Guessed S8a-P returned 404; alternate card grouping unverified | V0 | P0 | Missing | J+C; S? (not validated) |
| All eras — trophy/prize, staff, prerelease, retailer and Pokémon Center exclusives | Campaign-specific; U | Each language/region separately; applicability U | U | U; mixed/main-era grouping not classified | U | NR campaign census | No exhaustive campaign/variant registry or confirmed full provider | V0 | P0 | Unverified | Official campaign rules/checklists + C; no confirmed bulk provider |
| All eras — movie/magazine, unnumbered and historical regional exclusives | Campaign-specific; U | Each language/region separately; applicability U | U | U; named-promo filter is insufficient | U | NR campaign census | Unnumbered cards cannot be recovered from collector-number sequences alone | V0 | P0 | Unverified | Contemporaneous official publications/packaging + C; no confirmed bulk provider |

## Portuguese aliases and digital exclusions

`pt` in the main matrix is the provider's populated physical-candidate route, not a claim that all those releases are Portugal-specific. Brazilian distribution and historic European Portuguese require separate evidence. Saved `pt-br` has 11 sets, all in Pocket; `pt-pt` has zero series and sets. Thus **both alias routes have zero physical candidates found**, expected physical totals U, card retrieval NR, variant/pricing U, and coverage **Unverified**. Use R+C to resolve applicability; never declare Portuguese missing merely because `pt-br` is digital-only. The aliases are not two additional certified physical-card languages.

All saved `tcgp` members are excluded from physical-era counts. No Pocket card may be used to fill Korean, European or other physical-language gaps. The named-promo filter also excludes digital members. Live/Online legality or code fields do not establish a separate physical printing.

## Review findings and gaps without a confirmed provider

1. **Newly surfaced evidence:** Dutch `base1` and Polish `dp1` are empty shells, just like sampled Chinese `CSM1aC`. These were saved in Sprint 0A but not called out in its main summary. The current review supersedes any inference of card availability from their language-level set counts. Raw evidence has not been changed.
2. **Japanese DP, DPt and BW:** official historical existence is established; TCGdex's saved Japanese series/set inventory lacks these eras. Scrydex is a plausible evaluation target, not a confirmed repair. No reliable machine-readable gap-fill provider is yet validated for these exact releases, variants and languages.
3. **Japanese 25th promo pack:** official evidence establishes the product; no corresponding standalone entry was found. Missing status is scoped to set representation. Alternate card grouping and exact missing printings remain unknown. Official checklist + curated records is a grounded workflow; a complete automated source is unconfirmed.
4. **Korean/Traditional Chinese early releases; Thai/Indonesian pre-Sword & Shield:** absence in saved series must not be mistaken for no historical releases. Official applicability, local chronologies and exact missing identities remain unverified; no confirmed supplementary provider established in this review.
5. **Historic Dutch/Polish/Russian and Portuguese locale distinctions:** native-language records, historical dates and campaign variants cannot be supplied by translating English data. Official regional archives plus curation are necessary research routes; a reliable exhaustive bulk source remains unconfirmed.
6. **Trophy/prize, staff, store stamps, error/correction, foil pattern and unnumbered promos:** no independently complete expected registry and no confirmed universal provider. Evaluate physical evidence, official publications and legitimate scans; preserve unknowns rather than manufacturing variants.
7. **Pricing:** saved Japanese `SM1M-001` also has a root Cardmarket object and null TCGplayer, an observation not highlighted in the earlier summary. It does not certify Japanese-market pricing: inspect listing language, currency, variant and condition scope. English sampled root/variant mapping collisions and null promos persist. No confirmed universal provider covers exact-language, condition, grade, rare promos and realized historical sales.

Supplementary sources can address missing records **where a matching record/checklist is actually verified**: official checklists support manual canonical entries; a qualified pinned secondary dataset can cross-check English printings; a qualified Scrydex adapter could extend English/Japanese catalog and pricing coverage. None of those statements asserts an untested exact recovery count. The same provider discrepancy must be reconciled rather than outvoted by duplicated upstream data.

## Prioritized catalog integration strategy

| Priority | Integration / work | Deliverable and gate |
| --- | --- | --- |
| P0 — before foundation data import | Independent official release/language registry; preserve native Japanese and regional taxonomy | Evidence-backed applicability and chronology; known missing DP/DPt/BW and shell fixtures; unverified/announced releases stay labeled. Never use provider list size as expected total. |
| P0 — foundation contract | Provider-independent identities, immutable evidence, staged imports and curated-source adapter | Distinct species/design/printing/variant/copy; unknown variant/price supported; external IDs scoped by parent/locale; stable user copy identities. Review schema from architecture before migrations. |
| P1 — first catalog adapter | TCGdex via discovered IDs with locale routing | Resumable per-set/card retrieval, explicit empty-shell/error states, physical/digital exclusion, field/image checks and coverage snapshots. No silent zero-filling or deletion on outage. |
| P1 — highest-impact recovery | Japanese DP/DPt/BW; Chinese/Dutch/Polish shells; Japanese anniversary promo checklist | Versioned official checklist and exact missing-record queue; manual provider records where evidence exists. Fix data before promising era coverage. |
| P1 — supplementary-provider qualification | Compare pinned PokemonTCG dataset for English; test Scrydex for exact English/Japanese gap identities | Verify access/terms, currentness, record identity, variant specificity and missing cases against official evidence. No new dependency on deprecated Pokémon TCG API; do not sign up/pay without authorization. |
| P2 — regional expansion | Korean, both Chinese scripts, Thai, Indonesian and historic European-language releases; Portuguese/Spanish locale distinctions | Source-specific regional checklist audits and licensing; integrate only proven matches. If no adequate provider, explicitly retain curated/unknown state. |
| P2 — campaign/variant enrichment | Promos, decks, prize/trophy, retailer/staff, foil/copyright/error revisions | Separate distribution from physical variant identity; evidence per attribute; no Cartesian products of flags or deduplication by species/name. |
| P3 — pricing integration | Separate TCGdex market observations; qualify additional feeds independently | Exact compatible listing mapping, source timestamps, currency/metric/condition/grade/language scope. Null/unmapped/stale/ambiguous remain distinct; no price required for ownership. |
| Ongoing after authorization | Incremental census and review | Dated official checklist denominators, record-level diffs, reversible corrections and versioned coverage; no universal completeness badge until all scope gates pass. |

This sequence prioritizes reliable identities and uncertainty handling before adding more providers. Provider count is not a measure of completeness. Full card retrieval, independently expected counts, image validation, graded/regional market coverage and every promo reconciliation remain open work, not completed integrations.

## Review validation and access limits

Revalidated saved response hashes and derived set counts from unique `(locale, set ID)` values within mapped series, not sums of language headlines. Checked the matrix's sampled B/D arithmetic directly against saved files. Main-era buckets, Japanese subdivisions, cross-era families, promo filters and sample rows deliberately overlap; never sum the entire document into a global card/set count. Saved series starts and totals were not rewritten to match assumed chronology.

No new TCGdex, direct market or authenticated supplementary API requests were required. The original guessed-ID 404s and initial transport restrictions remain recorded in the Sprint 0A manifests/audit; a guessed 404 does not prove global absence. This review's official international all-expansions retrieval yielded no useful listing text, so its denominator check remains unverified. Supplemental docs were readable; their real record-level coverage, access and rights were not tested. This matrix does not certify the literal universe of official language exceptions or future releases beyond the current official/provider evidence.

## Go / no-go decisions

**Starting the application foundation: CONDITIONAL GO.** Begin only after the user authorizes implementation, using the proposed provider-independent schema, explicit partial/unknown coverage, evidence-backed curation, safe locale/domain routing, optional pricing and preservation of owned copies. Foundation acceptance should include the three empty-shell cases, Japanese missing-era cases, detailed variant ID collisions, string collector numbers and ambiguous/null prices. These conditions make a useful personal collection foundation feasible while gaps are resolved. This recommendation does not authorize UI/mobile development now.

**Claiming full catalog completeness: NO-GO.** No Verified Complete row is justified. Reconsider only after an independent official regional release/language registry, versioned expected printing and variant checklists, a full retrieval/reconciliation census, resolved historical/promotional gaps and documented scope exceptions exist. A full-pricing claim needs its own compatible-market coverage audit and is not a prerequisite for basic ownership tracking.
