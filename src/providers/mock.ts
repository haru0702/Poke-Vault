import type { CatalogProvider, PricingProvider, ProviderContext, ProviderResult } from './contracts';
import { mockCatalog } from '../data/mock';

const capabilities = () => ({
  id: 'pokevault-preview', label: 'Offline preview', mode: 'mock' as const,
  languageTags: ['en', 'ja', 'zh-Hant'], domains: ['physical' as const], catalog: true, pricing: false,
  limitations: ['Synthetic fixtures only', 'No live catalog', 'No market prices', 'Not an official checklist'],
});
function response<T>(data: T, context: ProviderContext): ProviderResult<T> {
  return { status: 'ok', result: { provider: capabilities().id, requestedLocale: context.locale, actualLocale: context.locale,
    fetchedAt: '2026-10-19T00:00:00Z', upstreamUpdatedAt: null, evidenceRef: null, data } };
}
function unsupported<T>(): ProviderResult<T> { return { status: 'unsupported', reason: 'Not available in offline preview', retryable: false }; }
function supports(context: ProviderContext): boolean {
  return context.domain === 'physical' && capabilities().languageTags.includes(context.locale);
}
export const mockCatalogProvider: CatalogProvider = {
  capabilities,
  async listSets(context, cursor) {
    if (!supports(context)) return unsupported();
    const releases = mockCatalog.releases.filter((release) => mockCatalog.languages.some((language) => language.id === release.languageId && language.tag === context.locale));
    return response({ items: cursor ? [] : mockCatalog.sets.filter((set) => releases.some((release) => release.setId === set.id)).map((set) => ({ externalId: `preview:${set.id}`, payload: set })), nextCursor: null }, context);
  },
  async getSet(externalId, context) {
    if (!supports(context)) return unsupported();
    const page = await this.listSets(context);
    const record = page.status === 'ok' ? page.result.data.items.find((item) => item.externalId === externalId) : undefined;
    return record ? response(record, context) : unsupported();
  },
  async getCard(externalId, context) {
    if (!supports(context)) return unsupported();
    const printing = mockCatalog.printings.find((item) => `preview:${item.id}` === externalId);
    const release = mockCatalog.releases.find((item) => item.id === printing?.releaseId);
    const language = mockCatalog.languages.find((item) => item.id === release?.languageId);
    return printing && language?.tag === context.locale ? response({ externalId, payload: printing }, context) : unsupported();
  },
};
export const mockPricingProvider: PricingProvider = {
  capabilities: () => ({ ...capabilities(), catalog: false }),
  async resolveListing() { return { status: 'unavailable', reason: 'No marketplace is connected. No prices are fabricated.', retryable: false }; },
  async getObservations() { return { status: 'unavailable', reason: 'No market observations in preview mode.', retryable: false }; },
};
