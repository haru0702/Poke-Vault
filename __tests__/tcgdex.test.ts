import { describe, expect, it, jest } from '@jest/globals';
import { TCGdexProvider } from '../src/providers/tcgdex';
import { VaultStore } from '../src/storage/vault';
import { emptyQuery, matchesCard } from '../src/domain/live';
import { cardFixture, era, memoryStorage, rawCard, response, set, uuidFactory } from './live-fixtures';

const index = { eras: [era], sets: [set], rarities: ['Rare'], warnings: [] };
describe('TCGdex normalization and physical identification', () => {
  it('allocates stable internal UUIDs, preserving provider keys separately across restarts', async () => {
    const storage = memoryStorage(); const uuid = uuidFactory();
    const first = await new TCGdexProvider(new VaultStore(storage, uuid)).normalize(rawCard, 'en', set, [era]);
    const second = await new TCGdexProvider(new VaultStore(storage, uuid)).normalize(rawCard, 'en', set, [era]);
    expect(first.id).toBe(second.id); expect(first.id).not.toBe(rawCard.id);
    expect(first.external.cardId).toBe(rawCard.id);
    expect(first.variants.map(v => v.id)).toEqual(second.variants.map(v => v.id));
  });
  it('separates language, parent card, detailed variants and rarity without expanding legacy flags', async () => {
    const provider = new TCGdexProvider(new VaultStore(memoryStorage(), uuidFactory()));
    const en = await provider.normalize(rawCard, 'en', set, [era]);
    const ja = await provider.normalize({ ...rawCard, name: 'リザードン', localId: '004' }, 'ja', { ...set, language: 'ja' }, [era]);
    const another = await provider.normalize({ ...rawCard, id: 'different-parent' }, 'en', set, [era]);
    expect(ja.id).not.toBe(en.id); expect(ja.collectorNumber).toBe('004');
    expect(en.rarity).toBe('Rare'); expect(en.variants).toHaveLength(4);
    expect(en.variants[0]!.id).not.toBe(another.variants[0]!.id);
    expect(en.variants.some(v => v.attributes.subtype?.includes('shadowless'))).toBe(true);
    const flagsOnly = await provider.normalize({ id: 'flags', name: 'Test', localId: null, variants: { holo: true, firstEdition: true } }, 'en', set, [era]);
    expect(flagsOnly.variants).toEqual([]); expect(flagsOnly.variantHints).toEqual(['holo', 'firstEdition']);
    expect(flagsOnly.rarity).toBeNull(); expect(flagsOnly.image).toBeNull(); expect(flagsOnly.collectorNumber).toBeNull();
    expect(en).not.toHaveProperty('pricing');
  });
  it('supports native name, number, set, era and rarity filters', async () => {
    const card = await cardFixture();
    expect(matchesCard(card, { ...emptyQuery, name: 'CHAR', number: '4', setId: set.id, eraId: era.id, rarity: 'Rare' })).toBe(true);
    for (const query of [{ name: 'Pikachu' }, { number: '001' }, { setId: 'wrong' }, { eraId: 'wrong' }, { rarity: 'Common' }]) expect(matchesCard(card, { ...emptyQuery, ...query })).toBe(false);
    expect(matchesCard({ ...card, name: 'リザードン' }, { ...emptyQuery, name: 'リザ' })).toBe(true);
  });
});
describe('live provider failure, language and search behavior', () => {
  const make = (fetcher: typeof fetch) => new TCGdexProvider(new VaultStore(memoryStorage(), uuidFactory()), fetcher);
  it('uses set membership for era filters, encodes names/numbers and imports full metadata', async () => {
    const fetcher = jest.fn<typeof fetch>().mockImplementation(async input => {
      const url = new URL(String(input));
      return response(url.pathname.endsWith('/cards') ? [{ id: rawCard.id }] : rawCard);
    });
    const result = await make(fetcher).search('en', index, { ...emptyQuery, name: 'Char', number: '4', eraId: era.id, rarity: 'Rare' }, 1);
    expect(result.cards).toHaveLength(1); expect(result.cards[0]!.image).toContain('/high.webp');
    const url = new URL(String(fetcher.mock.calls[0]![0]));
    expect(url.searchParams.get('set.id')).toBe('eq:base1'); expect(url.searchParams.get('rarity')).toBe('eq:Rare');
    expect(url.searchParams.get('name')).toBe('Char'); expect(url.searchParams.get('localId')).toBe('4');
    expect(url.searchParams.has('set.serie.id')).toBe(false);
  });
  it('rejects unsupported languages without an English fallback', async () => {
    const fetcher = jest.fn<typeof fetch>();
    await expect(make(fetcher).index('not-a-language')).rejects.toThrow('Unsupported');
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('excludes digital Pocket sets and does not equate set presence with completeness', async () => {
    const fetcher = jest.fn<typeof fetch>().mockImplementation(async input => {
      const url = String(input);
      if (url.endsWith('/series')) return response([{ id: 'base', name: 'Base' }, { id: 'tcgp', name: 'Pocket' }]);
      if (url.endsWith('/series/base')) return response({ name: 'Base', sets: [{ id: 'base1', name: 'Base', cardCount: { total: 102 } }] });
      if (url.endsWith('/rarities')) return response(['Rare']);
      throw new Error('Unexpected path');
    });
    const result = await make(fetcher).index('en');
    expect(result.sets).toHaveLength(1); expect(result.sets[0]!.providerTotal).toBe(102);
    expect(fetcher.mock.calls.some(c => String(c[0]).includes('/series/tcgp'))).toBe(false);
  });
  it('identifies set shells from empty cards rather than claiming completion', async () => {
    const fetcher = jest.fn<typeof fetch>().mockResolvedValue(response({ cards: [] }));
    const page = await make(fetcher).search('zh-cn', index, { ...emptyQuery, setId: set.id }, 1);
    expect(page.cards).toEqual([]); expect(page.warnings.join()).toContain('no card records'); expect(page.nextPage).toBeNull();
  });
  it('reports network errors and skipped cards without fabricating mock results', async () => {
    const failure = jest.fn<typeof fetch>().mockRejectedValue(new Error('Network offline'));
    await expect(make(failure).index('en')).rejects.toThrow('Network offline');
    const fetcher = jest.fn<typeof fetch>().mockResolvedValueOnce(response([{ id: 'missing' }])).mockResolvedValue(response({}, 404));
    const result = await make(fetcher).search('en', index, emptyQuery, 1);
    expect(result.cards).toEqual([]); expect(result.warnings.join()).toContain('no mock replacement');
  });
  it('retains partial index warnings when an era cannot load', async () => {
    const fetcher = jest.fn<typeof fetch>().mockImplementation(async input => {
      const url = String(input);
      if (url.endsWith('/series')) return response([{ id: 'base', name: 'Base' }, { id: 'neo', name: 'Neo' }]);
      if (url.endsWith('/series/base')) return response({ name: 'Base', sets: [] });
      if (url.endsWith('/series/neo')) return response({}, 500);
      return response([]);
    });
    const result = await make(fetcher).index('en'); expect(result.warnings.join()).toContain('Neo'); expect(result.eras).toHaveLength(1);
  });
  it('cancels pending requests and rejects malformed response shapes', async () => {
    const fetcher = jest.fn<typeof fetch>().mockResolvedValue(response({ wrong: true }));
    await expect(make(fetcher).index('en')).rejects.toThrow('list shape');
    const abort = new AbortController(); abort.abort();
    const cancelled = jest.fn<typeof fetch>().mockRejectedValue(new Error('aborted'));
    await expect(make(cancelled).index('en', abort.signal)).rejects.toThrow('cancelled');
  });
});


describe('metadata and defensive filtering regressions', () => {
  it('retains Trainer effects and supported asset punctuation without fabricating metadata', async () => {
    const provider = new TCGdexProvider(new VaultStore(memoryStorage(), uuidFactory()));
    const card = await provider.normalize({ id: 'trainer', name: 'Trainer', category: 'Trainer', localId: {}, effect: 'Draw cards.', image: 'https://assets.tcgdex.net/en/ex/exu/!' }, 'en', set, [era]);
    expect(card.collectorNumber).toBeNull(); expect(card.effect).toBe('Draw cards.');
    expect(card.image).toBe('https://assets.tcgdex.net/en/ex/exu/!/high.webp');
    const invalid = await provider.normalize({ id: 'invalid-image', name: 'Unknown', image: 'https://untrusted.example/card.png' }, 'en', set, [era]);
    expect(invalid.image).toBeNull(); expect(invalid.rarity).toBeNull();
  });
  it('checks normalized results when the server returns a nonmatching filter result', async () => {
    const fetcher = jest.fn<typeof fetch>().mockResolvedValueOnce(response([{ id: rawCard.id }])).mockResolvedValue(response(rawCard));
    const result = await new TCGdexProvider(new VaultStore(memoryStorage(), uuidFactory()), fetcher).search('en', index, { ...emptyQuery, rarity: 'Common' }, 1);
    expect(result.cards).toEqual([]);
  });
});


describe('reusable provider transport boundary', () => {
  it('does not expose a Pocket card through the physical getCard contract', async () => {
    const fetcher = jest.fn<typeof fetch>().mockResolvedValueOnce(response({ id: 'A1-001', set: { id: 'A1' } })).mockResolvedValue(response({ serie: { id: 'tcgp' } }));
    const result = await new TCGdexProvider(new VaultStore(memoryStorage(), uuidFactory()), fetcher).getCard('A1-001', { locale: 'en', domain: 'physical' });
    expect(result.status).toBe('error');
    if (result.status !== 'ok') expect(result.reason).toContain('Digital Pocket');
  });
});
