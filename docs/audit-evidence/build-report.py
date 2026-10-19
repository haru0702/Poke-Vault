import pathlib,json,csv,collections
p=pathlib.Path(__file__).resolve().parent;langs='en fr es es-mx it pt pt-br pt-pt de nl pl ru ja ko zh-tw id th zh-cn'.split()
seriesrows=[];setrows=[];summary=[]
for l in langs:
 ss=json.loads((p/f'v2__{l}__series.json').read_text());sets=json.loads((p/f'v2__{l}__sets.json').read_text());membership=collections.defaultdict(list);digital=set()
 for s in ss:
  detail=json.loads((p/f'v2__{l}__series__{s["id"]}.json').read_text())
  for st in detail.get('sets',[]):
   membership[st['id']].append(s['id'])
   if s['id']=='tcgp':digital.add(st['id'])
  seriesrows.append([l,s['id'],s['name'],len(detail.get('sets',[])),'digital' if s['id']=='tcgp' else 'physical_candidate','2026-10-19',f'https://api.tcgdex.net/v2/{l}/series/{s["id"]}'])
 for s in sets:setrows.append([l,s['id'],s['name'],'|'.join(membership[s['id']]),'digital' if s['id'] in digital else 'physical_candidate' if membership[s['id']] else 'unclassified','2026-10-19',f'https://api.tcgdex.net/v2/{l}/sets',f'https://api.tcgdex.net/v2/{l}/sets/{s["id"]}'])
 summary.append([l,len(ss),len(sets),len(digital),len(sets)-len(digital)])
for filename,header,rows in [('series-inventory.csv',['language','series_id','series_name','listed_sets','domain_candidate','audit_date','source_url'],seriesrows),('set-inventory.csv',['language','set_id','set_name','series_ids','domain_candidate','audit_date','list_source_url','detail_url_not_necessarily_fetched'],setrows)]:
 with (p/filename).open('w') as f:w=csv.writer(f);w.writerow(header);w.writerows(rows)
a='''# Pokémon TCG catalog feasibility audit

Audit date: **2026-10-19, Asia/Manila**. Live response timestamps are UTC in the evidence manifests. Scope: physical official releases from 1996 through the audit date; future coverage requires continuing audits. This is a feasibility audit with full language/series/set-list enumeration and targeted card/set samples, not a census of every card or a certification of universal completeness.

## Decision

**TCGdex is usable as an initial catalog provider, but insufficient as the sole authority for PokéVault's universal scope.** Live data contains language-dependent series gaps, set shells without card records, missing image fields, unpriced promos and ambiguous marketplace mappings. Use a provider-independent canonical catalog with independent release checklists and a curated gap-filling workflow. Universal support remains an unfulfilled product target.

Status vocabulary: **observed** = successful API payload inspected; **documented** = provider/official documentation inspected; **inferred** = reasoning from those observations; **unverified** = not checked, inaccessible, or insufficient evidence. Absence from the observed list is not proof that a card was never officially released.

## Method and reproducible evidence

1. Read TCGdex's official homepage, status, card/set references, pricing integration, language errors, FAQ and source interfaces.
2. Request `/v2/{language}/series` and `/sets` for all 18 locale tokens found across the references/source, then fetch every returned series detail to obtain expansion membership. Preserve all successful payloads and request outcomes.
3. Inspect early Japanese, international base/modern/promo, regional Chinese and historic-language set/card samples. Target known chronological and promotional gaps. No guessed ID 404 is treated as global absence.
4. Compare provider claims with observed structures. Assess completeness against independently evidenced checklists, not raw inventory size. Inspect price structure without treating observations as reliable valuations.

Evidence: [initial request manifest](audit-evidence/requests.json), [series/detail manifest](audit-evidence/requests-detail.json), [all series](audit-evidence/series-inventory.csv), [all listed expansions](audit-evidence/set-inventory.csv). Manifests include URLs, fetch timestamps, HTTP status, body filenames and SHA-256 hashes for successful responses. Raw files are provider observations and may contain incorrect metadata or market values; no price is endorsed. CSV counts describe returned records, including possible shells, digital products and duplicates—not coverage percentages. `physical_candidate` only excludes known Pocket membership; it is not official release verification. Inventory detail URLs are references, not claims every set detail was fetched.

## Language coverage

**Documented, 2026-10-19:** [homepage](https://tcgdex.dev/) lists ten named physical-card languages and calls six others forthcoming. [language-error reference](https://tcgdex.dev/errors/language-invalid) accepts Portuguese aliases plus Dutch, Polish, Russian, Korean and both Chinese scripts. The [source interface](https://github.com/tcgdex/cards-database/blob/master/interfaces.d.ts) also names `es-mx`. These statements conflict; recognized locale tokens, localized website text and actual card inventory are different capabilities.

**Observed, 2026-10-19:** all 18 tested locale tokens returned HTTP 200 for series and sets; `pt-pt` returned empty lists. `xx` was rejected with 404. This does not mean 18 distinct card languages. Locale aliases and regional localizations must be reconciled.

| Locale token | Listed series | Listed sets | Pocket sets¹ | Other set candidates¹ |
| --- | ---: | ---: | ---: | ---: |
'''
for r in summary:a+='| '+' | '.join(map(str,r))+' |\n'
a+='''
¹ Computed from `tcgp` series membership, not artwork or set-name heuristics. Every row's source is `https://api.tcgdex.net/v2/{locale}/series` and `/sets`, with membership from each series detail; fetched 2026-10-19 and captured in the manifests.

Locale names: `en` English; `fr` French; `es` Spanish; `es-mx` Latin American Spanish locale; `it` Italian; `de` German; `pt` Portuguese; `pt-br` Brazilian Portuguese; `pt-pt` Portugal Portuguese; `nl` Dutch; `pl` Polish; `ru` Russian; `ja` Japanese; `ko` Korean; `zh-tw` Traditional Chinese; `zh-cn` Simplified Chinese; `id` Indonesian; `th` Thai. These are provider tokens, not a definitive official-language registry.

**Observed:** `pt-br` lists only Pocket, whereas `pt` includes physical set candidates. `pt-pt` is accepted but empty. Do not route all physical Brazilian cards to `pt-br` or count aliases as separate official languages. `es-mx` returns physical sets, beginning in the observed list with `sv09`; this is stronger evidence of populated support than its omission from older docs, but does not establish every applicable release.

**Unknown:** a definitive historical inventory of every officially printed language/locale and regional release period has not been independently certified. The tested registry covers the languages named in TCGdex references, not every conceivable official promotional exception. No additional language can responsibly be declared unsupported without confirming an official physical release. Do not confuse game/app/support-site languages with printed card languages. Portugal-Portuguese applicability needs historical evidence before interpreting its empty list as missing printings.

## Eras and expansion series

**Observed, 2026-10-19:** the following are all series IDs returned across the audited language endpoints. IDs are case-sensitive and provider-specific; they are not a universal historical era taxonomy. Full localized names, memberships, source URLs and all set identifiers are in the CSV inventories.

| Locale | Series IDs returned |
| --- | --- |
'''
for l in langs:
 ss=json.loads((p/f'v2__{l}__series.json').read_text());a+=f'| `{l}` | '+(', '.join('`'+x['id']+'`' for x in ss) or '(none)')+' |\n'
a+='''
English series names: Miscellaneous (`misc`), Base, Gym, Neo, Legendary Collection (`lc`), E-Card (`ecard`), EX, POP, Trainer kits (`tk`), Diamond & Pearl (`dp`), Platinum (`pl`), HeartGold & SoulSilver (`hgss`), Call of Legends (`col`), Black & White (`bw`), McDonald's Collection (`mc`), XY, Sun & Moon (`sm`), Sword & Shield (`swsh`), Scarlet & Violet (`sv`), Mega Evolution (`me`), and digital Pokémon TCG Pocket (`tcgp`). Japanese grouping additionally distinguishes original PMCG, VS, web, e, ADV, PCG, LEGEND, XY BREAK and later native series. Do not map international expansion names one-to-one onto Japanese or Chinese releases.

**Observed expansion examples:** English includes `base1`, `basep`, `wp`, `np`, `pop1` through `pop9`, `dpp`, `hgssp`, `bwp`, `xyp`, `smp`, `swshp`, `svp`, `mep`, `miscp`, `jumbo`, trainer kits and McDonald's collections. Japanese includes `PMCG1`–`PMCG6`, `neo1`–`neo4`, `VS1`, `web1`, `E1`–`E5`, ADV/PCG, LEGEND, XY, SM, S, SV and M sets. These examples are not a replacement for the exhaustive observed expansion CSV. An entry's presence establishes metadata discoverability only, not complete cards, correct dates, physical availability or all variants.

## Card and set structures

**Documented, checked 2026-10-19:** [card reference](https://tcgdex.dev/reference/card) describes localized `id`, `localId`, name/category, set summary, optional image/rarity/illustrator, variant flags, rules fields, Pokémon `dexId`, update time and optional pricing. Trainers and Energy have category-specific fields; species links cannot be mandatory for every card. [set reference](https://tcgdex.dev/reference/set) describes set ID/name, series, release date, optional assets, card briefs and `cardCount`: printed `official` denominator, `total` including hidden cards, and finish/edition counts. Those values do not define all physically collectible combinations.

**Observed, 2026-10-19 (raw card and set snapshots):**

| Sample | Result | Implication |
| --- | --- | --- |
| `en/sets/base1` | 102 card briefs; `official=102`, `total=102`; finish/edition counts exceed a single checklist dimension | Count equality does not certify variants. |
| `en/sets/swsh3` | 201 briefs, `official=189`, `total=201` | Printed denominator excludes some cards; never use it alone for collection completion. |
| `en/sets/basep` | 53 briefs, `official=53`, `total=53` | Promo set exists; all distributions/physical variants still need reconciliation. |
| `ja/sets/PMCG1` | 102 briefs; IDs include `PMCG1-001`; name present without image on first brief | Early-era metadata exists; leading zeros matter and image availability differs. |
| `ja/sets/SM1M` | 73 briefs versus `official=60`; card `SM1M-001` resolves | Localized set numbering differs; guessed `SM1M-1` fails. |
| `zh-cn/sets/CSM1aC` | `official=151`, `total=151`, `cards=[]` | Verified metadata-only shell; all card records absent from this response. Date/market metadata correctness remains unverified. |
| `en/cards/base1-4` | Four detailed variants including unlimited, shadowless, stamped first edition and copyright revision | Legacy flags lose distinctions. |
| `en/cards/basep-1` | Detailed normal and stamp variants; marketplace IDs but null provider prices | Listing mapping does not imply valuation coverage. |
| `ja/cards/SM1M-001` | Card data returned without `image` | At least one observed image gap. |

Live cards include `variants_detailed[]` with `variantId`, type, size, optional subtype/stamps, `thirdParty` IDs and per-variant pricing, in addition to legacy `variants` and root `pricing`. The same `variantId` appears on different sampled cards, so scope it to its parent card. The [FAQ](https://tcgdex.dev/faq), checked 2026-10-19, still describes detailed variants as in development: documentation lag is verified, deployment universality is unknown.

## Completeness measurement

**Documented:** [project status](https://tcgdex.dev/status) links a live translation/status report at [API status](https://api.tcgdex.net/status). **Observed:** the status endpoint returned HTML, not a JSON coverage contract. Its existence helps discover provider gaps; its percentages are not independent proof of official release completeness. We do not reproduce global completion percentages.

**Recommended measurement, not a provider fact:** key audits by regional release × printed language × checklist revision × as-of date. Let E be an independently verified expected identity set, P the provider's normalized identities and M the exact reconciled intersection. Missing = E−P; extra/unresolved = P−E; printing coverage = |M|/|E| only if E is authoritative for that scope. Without E report known records, unknown denominator and unresolved gaps, not a percentage. Never derive E solely from the same provider's totals.

Track distinct metrics: release applicability; set metadata; card brief/detail availability; native text; images; base printings; physical variants; exact market mappings; compatible fresh prices. `cards.length == cardCount.total` tests internal consistency only. Validate unique IDs, card/detail resolution, expected collector numbers including subsets/unnumbered cards, date/market evidence and pagination termination. Variants require their own checklist; independent boolean counts cannot supply it. Pricing coverage uses eligible verified variants as its denominator, not species or all languages pooled together.

A set-language combination can be not officially released, unknown, inaccessible, metadata-only, partial, or verified complete against a specific checklist. An empty array does not decide applicability. This audit did not fetch every card detail, verify images over HTTP, or reconcile all official per-language checklists; those global checks remain unverified.

## Known gaps and unresolved scope

| Finding | Evidence/status as of 2026-10-19 | Follow-up |
| --- | --- | --- |
| Japanese DP, DPt and BW-era series/expansions are absent from the observed Japanese lists | Observed absence; official Japanese [chronology](https://www.pokemon-card.com/20th/chronicle/) identifies these eras and releases. Includes Diamond/Pearl collections and Black/White collections. Guessed `DP1`/`BW1` detail IDs also return 404, but those guesses alone prove nothing. | Import official release checklists and locate alternate/curated records; do not substitute English cards. |
| Japanese 25th anniversary promo pack has no matching promo-set entry found in observed Japanese inventory | Official [promo checklist](https://www.pokemon-card.com/ex/25th/s8aP/index.html) exists; `S8a` main expansion is listed, guessed `S8a-P` is 404. Missing standalone representation observed; individual cards under alternate grouping remain unverified. | Reconcile official promo checklist and search card identities across groupings. |
| Simplified Chinese `CSM1aC` has no card briefs | Observed successful set response with empty cards and nonzero expected provider total. | Acquire regional checklist and curated native records; verify dates and names before normalization. |
| Portugal locale has no sets; Brazilian alias holds Pocket only | Observed language endpoint differences. | Resolve historical Portuguese locale mapping; never claim all Portuguese printings missing. |
| Korean inventory begins at SM; Traditional Chinese at S; several regional series lists are sparse | Observed inventory limits; full historical official release comparison unverified. | Independently validate early/regional eras and discontinued language products. |
| Dutch/Polish/Russian have limited listed sets | Observed inventories, not a completeness certification; card-detail census unperformed. | Verify each historical release and applicable promo/edition against original sources. |
| Trophy/prize, event, staff, prerelease, retailer/Pokémon Center, magazine/movie, deck-exclusive, unnumbered and regional promos | No independent exhaustive checklist established; unknown global coverage. Broad promo buckets are not proof. | Separate campaigns and physical identities, review official distribution evidence and archival scans. |
| Foil patterns, edition/copyright/text revisions, stamps, oversized, metal/lenticular, errors and corrections | Some detailed variants observed; source interface models further types. Exhaustiveness unknown. | Build per-printing variant checklists; accidental errors require physical/archival evidence and classification. |
| Future/current releases | Latest provider names are inventory observations only; all release dates and official latest availability not independently reconciled. | Version the official registry, mark announced/unverified records, and repeat audits as releases occur. |

No exact count of all missing cards, sets, languages or variants is claimed. No evidence supports “every era in every language.” Historic cards unavailable for competitive play still belong in catalog scope if officially released.

## Pricing representation and limitations

**Documented, 2026-10-19:** [markets integration](https://tcgdex.dev/markets-prices) embeds pricing in card responses. Cardmarket uses EUR and aggregate/low/trend/holo metrics; TCGplayer uses USD and low/mid/high/market/direct metrics with variant-dependent buckets. Documentation describes daily versus hourly-to-daily updates, not a freshness guarantee. A missing marketplace may be omitted. No independent historical trade stream is established by rolling averages.

**Observed:** all three English card samples returned explicit null TCGplayer prices despite external IDs. `basep-1` also had null Cardmarket prices. `base1-4` and `swsh3-136` had timestamped Cardmarket objects at root and variant level, with null metric values in some fields. Charizard's copyright-revision variant had no pricing field. Furret's normal/reverse variants share a marketplace product and repeated price payload; distinct Charizard shadowless/stamped variants also share mappings. A market product may legitimately aggregate variants or languages, but these payloads alone do not establish exact quote scope. Do not sum root and nested prices or treat repeated payloads as independent quotes.

**Documented:** the [FAQ](https://tcgdex.dev/faq) acknowledges missing prices and erroneous listing matches, with older cards, recent releases and regional exclusives among examples. **Unknown:** all-language, all-region, condition-specific, graded, trophy-card, realized-sale and long-term historical coverage; no exhaustive pricing census performed. A null does not prove the marketplace itself lacks a listing. No current valuation or fabricated price appears in these recommendations; raw snapshots retain actual provider output for reproducibility only.

Recommended result states: available exact quote; broad/ambiguous market estimate; missing mapping; provider null/omitted; fetch failed; stale; unsupported scope. Preserve source and timestamp for each, and keep collection acquisition cost separate.

## Endpoint failures and access limitations

| Attempt | Outcome | Interpretation |
| --- | --- | --- |
| Initial sandbox curl to `/v2/en/series` | DNS resolution failed, no HTTP response | Environment restriction; later direct network request succeeded. Not API outage. |
| Web retrieval `/v2/en/series`, `/v2/en/cards/base1-4` | Tool reported inaccessible | Later successful direct HTTP responses supersede this access failure for these observations. |
| Web retrieval `https://tcgdex.dev/rest/pricing` | Inaccessible via tool | Guessed documentation URL unverified; pricing page discovered via official navigation is `/markets-prices` and was readable. |
| `/v2/xx/sets` | HTTP 404 | Deliberate negative control for invalid language; error body was not retained by the audit fetcher. |
| `/v2/ja/cards/SM1M-1` | HTTP 404 | Failed guessed identifier; discovered zero-padded `SM1M-001` succeeded. |
| `/v2/ja/sets/DP1`, `/BW1`, `/S8a-P` | HTTP 404 | No resource under these exact guessed keys; alternate IDs/groupings not ruled out. |
| GraphQL, asset image URLs, complete per-card scans, direct Cardmarket/TCGplayer APIs and non-TCGdex catalog providers | Not attempted | Unverified; no implied provider outage or access rights. |

Every API request actually made by the audit fetchers is logged; all returned language lists and series detail requests succeeded. Successful JSON transport is not proof of correctness. This is a point-in-time audit, with no uptime or rate-limit benchmark.

## Gap-filling plan and recommendation

1. Establish the independent official regional release/language registry, beginning with Japanese historical eras and the sampled Chinese shell. Record evidence, applicability and exact checklist identities; preserve unknown historical exceptions.
2. Reconcile every listed set against official checklist revisions and identify missing cards, misleading translated shells, incorrect metadata and alternate groupings. Expand detail/image sampling into a resumable full census with explicit denominators.
3. Evaluate secondary catalog providers on licensing, actual languages, historical promos and variant identity. Do not choose by headline card counts. Use a curated local provider for documented gaps until trusted upstream data exists.
4. Add native-language records and variants from official checklists and legitimate scans; source every field, review merges and keep provisional records out of “verified complete” metrics. Translated rules text is not proof of a physical release.
5. Independently qualify market listings per physical variant/language/condition. Add region-appropriate licensed feeds where feasible; keep unavailable prices unavailable. Never invent a fallback price.
6. Preserve upstream attribution and image rights, maintain corrections locally and prepare upstream contributions for later authorized submission. Re-audit after provider/schema/release changes and recompute versioned coverage.

Proceed with the canonical model and ingestion design in [architecture](architecture.md). Treat UI work and universal-coverage claims as gated by the [backlog](backlog.md), not approved by this audit.
'''
p.parent.joinpath('catalog-audit.md').write_text(a)
print('series rows',len(seriesrows),'set rows',len(setrows),'audit words',len(a.split()))
