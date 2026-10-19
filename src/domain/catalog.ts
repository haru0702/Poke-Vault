import type { CatalogSnapshot, Coverage, OwnedCopy, Printing } from './models';

/** Omitted upstream records are retained. No delete/tombstone operation exists in this boundary. */
function mergeById<T extends { readonly id: string }>(existing: readonly T[], incoming: readonly T[]): readonly T[] {
  return [...new Map([...existing, ...incoming].map((record) => [record.id, record])).values()];
}

/** Catalog synchronization cannot access or modify personal copies: different aggregate, no parameter. */
export function applyCatalogUpserts(existing: CatalogSnapshot, incoming: CatalogSnapshot): CatalogSnapshot {
  const merged: CatalogSnapshot = {
    species: mergeById(existing.species, incoming.species), languages: mergeById(existing.languages, incoming.languages),
    markets: mergeById(existing.markets, incoming.markets), eras: mergeById(existing.eras, incoming.eras),
    sets: mergeById(existing.sets, incoming.sets), releases: mergeById(existing.releases, incoming.releases),
    designs: mergeById(existing.designs, incoming.designs), printings: mergeById(existing.printings, incoming.printings),
    variants: mergeById(existing.variants, incoming.variants),
    // Provider mappings require explicit reconciliation, not automatic overwrite by a catalog feed.
    mappings: existing.mappings,
  };
  validateCatalog(merged);
  return merged;
}
export function validateCatalog(catalog: CatalogSnapshot): void {
  const ids = <T extends { readonly id: string }>(records: readonly T[]) => new Set(records.map((x) => x.id));
  const languages = ids(catalog.languages), sets = ids(catalog.sets), releases = ids(catalog.releases);
  const species = ids(catalog.species), designs = ids(catalog.designs), printings = ids(catalog.printings);
  const eras = ids(catalog.eras), markets = ids(catalog.markets);
  for (const release of catalog.releases) {
    if (!sets.has(release.setId) || !languages.has(release.languageId) || release.eraIds.some((id) => !eras.has(id)) || release.marketIds.some((id) => !markets.has(id))) {
      throw new Error('Unresolved release reference');
    }
  }
  for (const printing of catalog.printings) {
    if (!releases.has(printing.releaseId) || printing.speciesIds.some((id) => !species.has(id)) || (printing.designId && !designs.has(printing.designId))) {
      throw new Error('Unresolved printing reference');
    }
  }
  if (catalog.variants.some((variant) => !printings.has(variant.printingId))) throw new Error('Unresolved variant reference');
}
export function validateOwnedCopy(copy: OwnedCopy, catalog: CatalogSnapshot): void {
  if (copy.identification.status === 'unidentified') return;
  const printing = catalog.printings.find((x) => x.id === copy.identification.printingId);
  if (!printing) throw new Error('Copy printing is not in catalog');
  if (copy.identification.status === 'identified') {
    const variant = catalog.variants.find((x) => x.id === copy.identification.variantId);
    if (!variant || variant.printingId !== printing.id) throw new Error('Variant does not belong to copy printing');
  }
}
export function completionRatio(coverage: Coverage): number | null {
  const { expected, retrievedPrintings } = coverage;
  if (!expected || !expected.evidenceRef.trim() || !expected.checklistRevision.trim() || retrievedPrintings === null) return null;
  if (!Number.isInteger(expected.count) || expected.count <= 0 || !Number.isInteger(retrievedPrintings) || retrievedPrintings < 0 || retrievedPrintings > expected.count) return null;
  return retrievedPrintings / expected.count;
}
export function findPrintings(catalog: CatalogSnapshot, query: string, languageId?: string, eraId?: string): readonly Printing[] {
  const needle = query.trim().toLocaleLowerCase();
  return catalog.printings.filter((printing) => {
    const release = catalog.releases.find((x) => x.id === printing.releaseId);
    if (!release || (languageId && release.languageId !== languageId) || (eraId && !release.eraIds.some((id) => id === eraId))) return false;
    return [printing.nativeName, printing.collectorNumber ?? '', ...Object.values(printing.displayNames)]
      .some((value) => value.toLocaleLowerCase().includes(needle));
  });
}
