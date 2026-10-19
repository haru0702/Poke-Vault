# Audit evidence

Audit date: 2026-10-19, Asia/Manila. Request timestamps in the manifests are UTC. This directory contains public TCGdex responses, not PokéVault user data or a verified official master catalog.

- `requests.json`: initial locale list and targeted sample requests (46 distinct URLs; 44 HTTP 200, two HTTP 404).
- `requests-detail.json`: all 133 returned series details plus ten targeted checks (143 requests; 140 HTTP 200, three HTTP 404).
- `series-inventory.csv`: every observed locale/series grouping and its set-list count.
- `set-inventory.csv`: every observed locale/set list entry and its series memberships. Rows are not unique physical printings. Detail URLs are discovery references; most individual set details were not requested.
- `v2__*.json`: unchanged successful JSON response bodies. `status.html` is the successful HTML status report.
- `fetch-inventory.py` / `fetch-details.py`: public, read-only audit request scripts. Run inventory first, then details. They overwrite the current evidence files; archive a dated directory before repeating. Error response bodies are not captured, but exceptions/statuses are logged.
- `build-report.py`: derives CSV inventories and the audit report from snapshots. It overwrites `docs/catalog-audit.md`; preserve editorial changes before rerunning.

Reproduce with Python 3 and public HTTPS access, from any directory:

```sh
python3 /absolute/path/to/PokéVault/docs/audit-evidence/fetch-inventory.py
python3 /absolute/path/to/PokéVault/docs/audit-evidence/fetch-details.py
python3 /absolute/path/to/PokéVault/docs/audit-evidence/build-report.py
```

Snapshots are mutable provider claims captured at the stated time. Prices in raw responses are actual API observations and may be stale, broad or mismapped; they are not recommended valuations. Numeric documentation examples were not used as current market prices. Check hashes against the request manifests before deriving conclusions. The audit did not fetch every individual card, independently validate every set date/count, download card images or certify historical language applicability.

Human-readable source links, access limitations and the audit methodology are recorded in `../catalog-audit.md`. Documentation sources were read through web retrieval; they are linked rather than locally archived. API responses were obtained by direct HTTPS after initial sandbox DNS failures; these network limitations do not imply provider outages.
