import { describe, expect, it } from '@jest/globals';
import { mockCatalogProvider, mockPricingProvider } from '../src/providers/mock';
import { mockCatalog } from '../src/data/mock';

describe('offline provider contracts', () => {
  const context = { locale: 'ja', domain: 'physical' as const };
  it('labels all capabilities as mock and returns locale-scoped sets', async () => {
    expect(mockCatalogProvider.capabilities().mode).toBe('mock');
    const result = await mockCatalogProvider.listSets(context);
    expect(result.status).toBe('ok');
    if (result.status !== 'ok') throw new Error('Expected mock page');
    expect(result.result.requestedLocale).toBe('ja');
    expect(result.result.data.items).toHaveLength(2);
    expect(result.result.data.nextCursor).toBeNull();
  });
  it('does not fall back to English for unsupported languages or digital products', async () => {
    expect((await mockCatalogProvider.listSets({ ...context, locale: 'ko' })).status).toBe('unsupported');
    expect((await mockCatalogProvider.listSets({ ...context, domain: 'digital' })).status).toBe('unsupported');
  });
  it('returns discovered card keys only in the correct language', async () => {
    const key = `preview:${mockCatalog.printings[0]!.id}`;
    expect((await mockCatalogProvider.getCard(key, context)).status).toBe('unsupported');
    expect((await mockCatalogProvider.getCard(key, { ...context, locale: 'en' })).status).toBe('ok');
    expect((await mockCatalogProvider.getSet('missing', context)).status).toBe('unsupported');
  });
  it('makes absent prices unavailable without returning a zero or fabricated quote', async () => {
    const result = await mockPricingProvider.getObservations([], context);
    expect(result).toEqual({ status: 'unavailable', reason: 'No market observations in preview mode.', retryable: false });
    expect(mockPricingProvider.capabilities().pricing).toBe(false);
  });
});
