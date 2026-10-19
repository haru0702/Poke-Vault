import { describe, expect, it } from '@jest/globals';
import { applyCatalogUpserts, completionRatio, findPrintings, validateCatalog, validateOwnedCopy } from '../src/domain/catalog';
import { externalIdentityKey, internalId } from '../src/domain/identity';
import { mockCatalog, mockCopies, mockProvenance } from '../src/data/mock';
import type { CatalogSnapshot, Coverage, Language, OwnedCopy } from '../src/domain/models';

const empty: CatalogSnapshot = { species: [], languages: [], markets: [], eras: [], sets: [], releases: [], designs: [], printings: [], variants: [], mappings: [] };
const printing = mockCatalog.printings[0]!;
const copy = mockCopies[0]!;

describe('independent identities and multilingual domain', () => {
  it('rejects an upstream card ID as an internal UUID', () => {
    expect(() => internalId('printing', 'base1-4')).toThrow('Invalid internal');
  });
  it('scopes repeated provider variant IDs by parent, language and provider', () => {
    const ref = { provider: 'example', entity: 'variant', externalId: 'repeated', locale: 'en', domain: 'physical' as const };
    expect(externalIdentityKey({ ...ref, parentExternalId: 'card-a' })).not.toBe(externalIdentityKey({ ...ref, parentExternalId: 'card-b' }));
    expect(externalIdentityKey(ref)).not.toBe(externalIdentityKey({ ...ref, locale: 'ja' }));
    expect(externalIdentityKey(ref)).not.toBe(externalIdentityKey({ ...ref, provider: 'other' }));
  });
  it('validates preview references and individual copies', () => {
    expect(() => validateCatalog(mockCatalog)).not.toThrow();
    mockCopies.forEach((item) => expect(() => validateOwnedCopy(item, mockCatalog)).not.toThrow());
    expect(mockCopies[0]!.identification.printingId).toBe(mockCopies[1]!.identification.printingId);
    expect(mockCopies[0]!.id).not.toBe(mockCopies[1]!.id);
  });
  it('allows unidentified copies and unknown finish without inventing normal', () => {
    expect(mockCopies.some((item) => item.identification.status === 'unidentified')).toBe(true);
    expect(mockCopies.find((item) => item.identification.status === 'printing-only')?.identification.variantId).toBeNull();
  });
  it('rejects a variant that belongs to a different printing', () => {
    const wrong: OwnedCopy = { ...copy, identification: { status: 'identified', printingId: printing.id, variantId: mockCatalog.variants[1]!.id } };
    expect(() => validateOwnedCopy(wrong, mockCatalog)).toThrow('Variant does not belong');
  });
  it('supports multi-species cards, species-free Trainers and unnumbered cards', () => {
    expect(mockCatalog.printings.some((item) => item.speciesIds.length > 1)).toBe(true);
    expect(mockCatalog.printings.some((item) => item.speciesIds.length === 0 && item.collectorNumber === null)).toBe(true);
    expect(mockCatalog.designs.some((item) => item.category === 'trainer')).toBe(true);
  });
  it('preserves native text and leading zeroes and supports extensible languages', () => {
    expect(findPrintings(mockCatalog, 'フシギ')[0]?.collectorNumber).toBe('001');
    const extension: Language = { id: internalId('language', '65433333-1234-4000-8000-000000000001'), tag: 'x-research', name: 'Unverified locale', nativeName: 'Unverified' };
    expect(() => validateCatalog({ ...mockCatalog, languages: [...mockCatalog.languages, extension] })).not.toThrow();
  });
  it('searches printings by native name, number, language and era', () => {
    const japanese = mockCatalog.languages.find((item) => item.tag === 'ja')!;
    const results = findPrintings(mockCatalog, '001', japanese.id);
    expect(results).toHaveLength(1);
    expect(findPrintings(mockCatalog, 'Charizard', japanese.id)).toHaveLength(0);
    expect(findPrintings(mockCatalog, '', undefined, mockCatalog.eras.find((item) => item.name === 'VS')!.id)).toHaveLength(0);
  });
});
describe('safe catalog merge', () => {
  it('retains all records when an upstream snapshot becomes empty', () => {
    const copiesBefore = JSON.stringify(mockCopies);
    expect(applyCatalogUpserts(mockCatalog, empty)).toEqual(mockCatalog);
    expect(JSON.stringify(mockCopies)).toBe(copiesBefore);
  });
  it('is idempotent and does not mutate old objects or copies', () => {
    const before = JSON.stringify(mockCatalog);
    const incoming = { ...empty, printings: [{ ...printing, nativeName: 'Reviewed mock correction' }] };
    const updated = applyCatalogUpserts(mockCatalog, incoming);
    expect(updated.printings).toHaveLength(mockCatalog.printings.length);
    expect(updated.printings.find((item) => item.id === printing.id)?.nativeName).toBe('Reviewed mock correction');
    expect(applyCatalogUpserts(updated, incoming)).toEqual(updated);
    expect(JSON.stringify(mockCatalog)).toBe(before);
    expect(copy.provenance).toEqual(mockProvenance);
  });
  it('rejects dangling staged references without touching the existing catalog', () => {
    const before = JSON.stringify(mockCatalog);
    const badRelease = internalId('release', '12345678-1234-4000-8000-000000000001');
    expect(() => applyCatalogUpserts(mockCatalog, { ...empty, printings: [{ ...printing, releaseId: badRelease }] })).toThrow('Unresolved printing reference');
    expect(JSON.stringify(mockCatalog)).toBe(before);
  });
});
describe('honest coverage', () => {
  const coverage: Coverage = { status: 'partial', retrievedPrintings: 0, expected: null, note: 'Empty shell; provider total is not independent evidence' };
  it('does not turn a set shell or unknown denominator into completion', () => {
    expect(completionRatio(coverage)).toBeNull();
    expect(completionRatio({ ...coverage, retrievedPrintings: 151 })).toBeNull();
    expect(mockCatalog.releases.every((release) => completionRatio(release.coverage) === null)).toBe(true);
  });
  it.each([['Simplified Chinese', 151], ['Dutch', 102], ['Polish', 130]])('keeps the audited %s shell unknown despite provider total %s', (_language, providerTotal) => {
    const shell: Coverage = { status: 'partial', retrievedPrintings: 0, expected: null, note: `Provider reports ${providerTotal}; no independent checklist` };
    expect(completionRatio(shell)).toBeNull();
    expect(shell.status).toBe('partial');
  });
  it('requires a positive evidenced checklist and handles count mismatches', () => {
    const expected = { count: 2, checklistRevision: 'reviewed-v1', evidenceRef: 'test://independent-checklist' };
    expect(completionRatio({ ...coverage, retrievedPrintings: 1, expected })).toBe(0.5);
    expect(completionRatio({ ...coverage, retrievedPrintings: 3, expected })).toBeNull();
    expect(completionRatio({ ...coverage, expected: { ...expected, count: 0 } })).toBeNull();
    expect(completionRatio({ ...coverage, expected: { ...expected, evidenceRef: '' } })).toBeNull();
  });
});
