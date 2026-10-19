import { resolveTCGdexImage } from './tcgdex-artwork';
import type { LiveCatalogProvider, ProviderContext, ProviderResult } from './contracts';
import type { CatalogCard, CatalogEra, CatalogIndex, CatalogSet, CardPage, CardQuery } from '../domain/live';
import type { CardVariant, Provenance } from '../domain/models';
import { externalIdentityKey } from '../domain/identity';
import { matchesCard } from '../domain/live';
import { vault, type VaultStore } from '../storage/vault';

export const catalogLanguages = [
  ['en', 'English', 'en'], ['ja', '日本語', 'ja'], ['ko', '한국어', 'ko'],
  ['zh-cn', '简体中文', 'zh-Hans'], ['zh-tw', '繁體中文', 'zh-Hant'], ['th', 'ไทย', 'th'], ['id', 'Bahasa Indonesia', 'id'],
  ['fr', 'Français', 'fr'], ['de', 'Deutsch', 'de'], ['it', 'Italiano', 'it'], ['es', 'Español (España)', 'es-ES'],
  ['es-mx', 'Español latinoamericano', 'es-419'], ['pt', 'Português (physical catalog route)', 'pt'],
  ['pt-br', 'Português brasileiro (provider alias)', 'pt-BR'], ['pt-pt', 'Português europeu (provider alias)', 'pt-PT'],
  ['nl', 'Nederlands', 'nl'], ['pl', 'Polski', 'pl'], ['ru', 'Русский', 'ru'],
] as const;
const BASE = 'https://api.tcgdex.net/v2';
const PAGE_SIZE = 24;
type Obj = Record<string, unknown>;
const object = (value: unknown): Obj => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Unexpected TCGdex record shape');
  return value as Obj;
};
const text = (value: unknown): string | null => typeof value === 'string' && value.length > 0 ? value : null;
const required = (value: unknown): string => { const result = text(value); if (!result) throw new Error('TCGdex record is missing an identifier or name'); return result; };
const array = (value: unknown): unknown[] => { if (!Array.isArray(value)) throw new Error('Unexpected TCGdex list shape'); return value; };
const strings = (value: unknown): string[] => Array.isArray(value) ? value.filter((s): s is string => typeof s === 'string') : [];
const nullableNumber = (value: unknown): number | null => typeof value === 'number' && Number.isFinite(value) ? value : null;
export async function pooledMap<T, R>(items: readonly T[], fn: (item: T) => Promise<R>, concurrency = 4): Promise<R[]> {
  const results = new Array<R>(items.length); let next = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (next < items.length) { const index = next++; results[index] = await fn(items[index]!); }
  }));
  return results;
}
/** Read-only catalog provider. Has no collection mutation capability and discards pricing payloads. */
export class TCGdexProvider implements LiveCatalogProvider {
  private cardCache = new Map<string, CatalogCard>();
  constructor(private readonly identities: Pick<VaultStore, 'identity'> = vault, private readonly fetcher: typeof fetch = (input, init) => fetch(input, init)) {}
  capabilities() { return { id: 'tcgdex', label: 'TCGdex', mode: 'live' as const, languageTags: catalogLanguages.map(l => l[2]), domains: ['physical' as const], catalog: true, pricing: false, limitations: ['Language and era coverage varies', 'Provider variants are not an exhaustive checklist', 'No pricing imported'] }; }
  private checkLocale(locale: string) {
    if (!catalogLanguages.some(l => l[0] === locale)) throw new Error('Unsupported catalog language; no fallback language was used.');
  }
  private key(entity: string, id: string, locale: string, parentExternalId?: string): string {
    return externalIdentityKey({ provider: 'tcgdex', entity, externalId: id, locale, domain: 'physical', parentExternalId });
  }
  private async request(locale: string, path: string, signal?: AbortSignal): Promise<unknown> {
    this.checkLocale(locale);
    const controller = new AbortController();
    const abort = () => controller.abort();
    if (signal?.aborted) controller.abort();
    signal?.addEventListener('abort', abort);
    const timer = setTimeout(abort, 20000);
    try {
      const response = await this.fetcher(`${BASE}/${encodeURIComponent(locale)}/${path}`, { signal: controller.signal });
      if (!response.ok) throw new Error(response.status === 404 ? 'TCGdex record or language endpoint is unavailable (404). No fallback was used.' : `TCGdex request failed (${response.status}). Retry when the service is available.`);
      return await response.json() as unknown;
    } catch (error) {
      if (signal?.aborted) throw new Error('Request cancelled');
      if (controller.signal.aborted) throw new Error('TCGdex timed out. Check your connection and retry.');
      throw error;
    } finally { clearTimeout(timer); signal?.removeEventListener('abort', abort); }
  }
  private async transport<T>(locale: string, path: string, operation: () => Promise<T>): Promise<ProviderResult<T>> {
    try { return { status: 'ok', result: { provider: 'tcgdex', requestedLocale: locale, actualLocale: null, fetchedAt: new Date().toISOString(), upstreamUpdatedAt: null, evidenceRef: `${BASE}/${locale}/${path}`, data: await operation() } }; }
    catch (e) { return { status: 'error', reason: e instanceof Error ? e.message : 'Catalog unavailable', retryable: true }; }
  }
  async listSets(context: ProviderContext) {
    return this.transport(context.locale, 'sets', async () => {
      if (context.domain !== 'physical') throw new Error('Only physical cards are supported');
      const index = await this.index(context.locale, context.signal);
      return { items: index.sets.map(set => ({ externalId: set.externalId, payload: set as unknown })), nextCursor: null };
    });
  }
  async getSet(id: string, context: ProviderContext) {
    return this.transport(context.locale, `sets/${id}`, async () => {
      if (context.domain !== 'physical') throw new Error('Only physical cards are supported');
      const payload = object(await this.request(context.locale, `sets/${encodeURIComponent(id)}`, context.signal));
      if (object(payload.serie).id === 'tcgp') throw new Error('Digital Pocket cards are outside the physical catalog');
      return { externalId: id, payload: payload as unknown };
    });
  }
  async getCard(id: string, context: ProviderContext) {
    return this.transport(context.locale, `cards/${id}`, async () => {
      if (context.domain !== 'physical') throw new Error('Only physical cards are supported');
      const payload = object(await this.request(context.locale, `cards/${encodeURIComponent(id)}`, context.signal));
      if (payload.id !== id) throw new Error('Provider card identifier mismatch');
      const setResult = await this.getSet(required(object(payload.set).id), context);
      if (setResult.status !== 'ok') throw new Error(setResult.reason);
      return { externalId: id, payload };
    });
  }
  async index(locale: string, signal?: AbortSignal): Promise<CatalogIndex> {
    const series = array(await this.request(locale, 'series', signal)).map(object).filter(s => s.id !== 'tcgp');
    const warnings: string[] = [];
    const groups = await pooledMap(series, async s => {
      try {
        const sid = required(s.id);
        const detail = object(await this.request(locale, `series/${encodeURIComponent(sid)}`, signal));
        const era: CatalogEra = { id: await this.identities.identity('era', this.key('era', sid, locale)), externalId: sid, name: required(detail.name) };
        const sets = await pooledMap(array(detail.sets), async item => {
          const raw = object(item); const id = required(raw.id);
          return { id: await this.identities.identity('set', this.key('set', id, locale)), releaseId: await this.identities.identity('release', this.key('release', id, locale)), externalId: id, name: required(raw.name), eraId: era.id, language: catalogLanguages.find(l => l[0] === locale)![2], providerTotal: raw.cardCount ? nullableNumber(object(raw.cardCount).total) : null } satisfies CatalogSet;
        });
        return { era, sets };
      } catch (e) { if (signal?.aborted) throw e; warnings.push(`Series ${String(s.name ?? s.id)} could not be loaded; its sets are not included.`); return null; }
    });
    let rarities: string[] = [];
    try { rarities = strings(await this.request(locale, 'rarities', signal)); } catch (e) { if (signal?.aborted) throw e; warnings.push('Rarity options unavailable. Other browsing remains available.'); }
    const loaded = groups.filter(g => g !== null);
    if (series.length > 0 && loaded.length === 0) throw new Error('TCGdex series were listed but no set details could be loaded. Retry.');
    return { eras: loaded.map(g => g.era), sets: [...new Map(loaded.flatMap(g => g.sets).map(s => [s.id, s])).values()], rarities, warnings };
  }
  async search(locale: string, index: CatalogIndex, query: CardQuery, page: number, signal?: AbortSignal): Promise<CardPage> {
    const sets = index.sets.filter(s => (!query.setId || s.id === query.setId) && (!query.eraId || s.eraId === query.eraId));
    if (sets.length === 0) return { cards: [], nextPage: null, warnings: ['No physical set records for these filters. Official release applicability is unverified.'] };
    if (query.setId && !query.name.trim() && !query.number.trim() && !query.rarity) {
      // The set detail is needed to distinguish an empty shell from an exhausted search page.
      const raw = object(await this.request(locale, `sets/${encodeURIComponent(sets[0]!.externalId)}`, signal));
      if (array(raw.cards).length === 0) return { cards: [], nextPage: null, warnings: [`Set metadata exists, but TCGdex returned no card records. Provider total: ${sets[0]!.providerTotal ?? 'unknown'}. Official completeness is unverified.`] };
    }
    const params = new URLSearchParams({ 'set.id': `eq:${sets.map(s => s.externalId).join('|')}`, 'pagination:page': String(page), 'pagination:itemsPerPage': String(PAGE_SIZE) });
    if (query.name.trim()) params.set('name', query.name.trim());
    if (query.number.trim()) params.set('localId', query.number.trim());
    if (query.rarity) params.set('rarity', `eq:${query.rarity}`);
    const briefs = array(await this.request(locale, `cards?${params}`, signal));
    const warnings: string[] = [];
    const cards = await pooledMap(briefs, async brief => {
      const id = required(object(brief).id);
      try {
        const key = `${locale}:${id}`; const cached = this.cardCache.get(key);
        if (cached && sets.some(s => s.id === cached.setId)) return cached;
        const data = object(await this.request(locale, `cards/${encodeURIComponent(id)}`, signal));
        if (data.id !== id) throw new Error('Provider card identifier mismatch');
        const set = sets.find(s => s.externalId === object(data.set).id);
        if (!set) throw new Error('Card is outside the selected physical sets');
        const card = await this.normalize(data, locale, set, index.eras);
        if (this.cardCache.size >= 1000) this.cardCache.clear();
        this.cardCache.set(key, card); return card;
      } catch (e) { if (signal?.aborted) throw e; warnings.push(`Card ${id} could not be retrieved; no mock replacement was used.`); return null; }
    });
    return { cards: [...new Map(cards.filter((c): c is CatalogCard => c !== null && matchesCard(c, query)).map(c => [c.id, c])).values()], nextPage: briefs.length === PAGE_SIZE ? page + 1 : null, warnings };
  }
  async normalize(raw: Obj, locale: string, set: CatalogSet, eras: readonly CatalogEra[]): Promise<CatalogCard> {
    const id = required(raw.id);
    const printingId = await this.identities.identity('printing', this.key('printing', id, locale));
    const provenance: Provenance = { mode: 'live', source: 'TCGdex', observedAt: new Date().toISOString(), evidenceRef: `${BASE}/${locale}/cards/${encodeURIComponent(id)}` };
    const variants: CardVariant[] = [];
    if (Array.isArray(raw.variants_detailed)) {
      const seen = new Set<string>();
      for (const item of raw.variants_detailed) {
        const variant = object(item); const externalId = text(variant.variantId);
        if (!externalId || seen.has(externalId)) continue;
        seen.add(externalId);
        const attributes: Record<string, readonly string[]> = {};
        for (const field of ['type', 'subtype', 'size', 'stamp']) {
          const value = variant[field];
          if (typeof value === 'string') attributes[field] = [value];
          else if (Array.isArray(value)) attributes[field] = strings(value);
        }
        variants.push({ id: await this.identities.identity('variant', this.key('variant', externalId, locale, id)), printingId, identityStatus: 'provisional', attributes, provenance });
      }
    }
    const flags = raw.variants && !Array.isArray(raw.variants) ? object(raw.variants) : {};
    return {
      id: printingId, releaseId: set.releaseId, setId: set.id, eraId: set.eraId,
      name: required(raw.name), collectorNumber: typeof raw.localId === 'string' || typeof raw.localId === 'number' ? String(raw.localId) : null,
      language: set.language, setName: set.name, eraName: eras.find(e => e.id === set.eraId)?.name ?? 'Unknown era',
      rarity: text(raw.rarity), image: resolveTCGdexImage(raw.image), category: text(raw.category), illustrator: text(raw.illustrator), hp: nullableNumber(raw.hp), types: strings(raw.types), description: text(raw.description),
      dexIds: Array.isArray(raw.dexId) ? raw.dexId.filter((n): n is number => typeof n === 'number' && Number.isInteger(n) && n > 0) : [],
      effect: text(raw.effect), stage: text(raw.stage), regulationMark: text(raw.regulationMark),
      abilities: Array.isArray(raw.abilities) ? raw.abilities.map(item => { const a = object(item); return { name: required(a.name), effect: text(a.effect), type: text(a.type) }; }) : [],
      attacks: Array.isArray(raw.attacks) ? raw.attacks.map(item => { const a = object(item); return { name: required(a.name), effect: text(a.effect), damage: typeof a.damage === 'number' ? String(a.damage) : text(a.damage) }; }) : [],
      variants, variantHints: Object.entries(flags).filter(([, value]) => value === true).map(([key]) => key),
      coverage: 'unverified', provenance, external: { provider: 'tcgdex', locale, cardId: id, setId: set.externalId },
    };
  }
}
export const liveCatalogProvider: LiveCatalogProvider = new TCGdexProvider();
