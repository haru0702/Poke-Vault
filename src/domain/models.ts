import type { Id } from './identity';

export type DataMode = 'mock' | 'live' | 'curated';
export type CoverageStatus = 'verified-complete' | 'partial' | 'missing' | 'unverified' | 'inaccessible' | 'not-applicable';
export type ProductDomain = 'physical' | 'digital';
export type LocalizedText = Readonly<Record<string, string>>;

export interface Provenance {
  readonly mode: DataMode;
  readonly source: string;
  readonly observedAt: string;
  readonly evidenceRef?: string;
}

/** BCP 47 language/script identity is independent of provider aliases and release markets. */
export interface Language {
  readonly id: Id<'language'>;
  readonly tag: string;
  readonly name: string;
  readonly nativeName: string;
}
export interface Market { readonly id: Id<'market'>; readonly name: string; readonly code: string }
export interface ReleasePeriod {
  readonly start: string | null;
  readonly end: string | null;
  readonly certainty: 'verified' | 'provider-reported' | 'unknown';
}
export interface Era {
  readonly id: Id<'era'>;
  readonly name: string;
  readonly scope: 'japanese' | 'international' | 'regional' | 'cross-era';
  readonly period: ReleasePeriod;
}
export interface Species {
  readonly id: Id<'species'>;
  readonly nationalDexNumber: number;
  readonly names: LocalizedText;
}
export interface CardDesign {
  readonly id: Id<'design'>;
  readonly category: 'pokemon' | 'trainer' | 'energy' | 'other';
  readonly artworkId: Id<'artwork'> | null;
}
export interface Coverage {
  readonly status: CoverageStatus;
  readonly retrievedPrintings: number | null;
  /** Only an independent, evidenced checklist can supply a denominator. */
  readonly expected: { readonly count: number; readonly checklistRevision: string; readonly evidenceRef: string } | null;
  readonly note: string;
}
export interface CardSet {
  readonly id: Id<'set'>;
  readonly names: LocalizedText;
  readonly domain: ProductDomain;
  readonly kind: 'expansion' | 'promo' | 'deck' | 'prize' | 'special' | 'other';
  readonly provenance: Provenance;
}
export interface SetRelease {
  readonly id: Id<'release'>;
  readonly setId: Id<'set'>;
  readonly eraIds: readonly Id<'era'>[];
  readonly languageId: Id<'language'>;
  readonly marketIds: readonly Id<'market'>[];
  readonly releaseDate: string | null;
  readonly status: 'announced' | 'released' | 'unverified';
  readonly coverage: Coverage;
  readonly provenance: Provenance;
}
export interface Printing {
  readonly id: Id<'printing'>;
  readonly releaseId: Id<'release'>;
  readonly designId: Id<'design'> | null;
  readonly nativeName: string;
  readonly displayNames: LocalizedText;
  /** Strings retain leading zeroes, prefixes and suffixes. Null supports unnumbered promos. */
  readonly collectorNumber: string | null;
  readonly speciesIds: readonly Id<'species'>[];
  readonly status: CoverageStatus;
  readonly provenance: Provenance;
}
export interface CardVariant {
  readonly id: Id<'variant'>;
  readonly printingId: Id<'printing'>;
  readonly identityStatus: 'verified' | 'provisional';
  /** Extensible attributes: finish, foil pattern, edition, stamp, copyright, dimensions, etc. */
  readonly attributes: Readonly<Record<string, readonly string[]>>;
  readonly provenance: Provenance;
}
export type CopyIdentification =
  | { readonly status: 'unidentified'; readonly printingId: null; readonly variantId: null }
  | { readonly status: 'printing-only'; readonly printingId: Id<'printing'>; readonly variantId: null }
  | { readonly status: 'identified'; readonly printingId: Id<'printing'>; readonly variantId: Id<'variant'> };
export interface OwnedCopy {
  readonly id: Id<'copy'>;
  readonly label: string;
  readonly identification: CopyIdentification;
  readonly condition: 'near-mint' | 'lightly-played' | 'played' | 'damaged' | null;
  readonly grade: { readonly company: string; readonly value: string; readonly certificate: string | null } | null;
  readonly acquisition: { readonly date: string | null; readonly cost: Money | null };
  readonly location: string | null;
  readonly provenance: Provenance;
}
export interface Money { readonly amount: string; readonly currency: string }
export type PriceAvailability = 'unavailable' | 'missing-mapping' | 'provider-null' | 'omitted' | 'inaccessible' | 'stale' | 'ambiguous';
export interface PriceScope {
  readonly variantId: Id<'variant'>;
  readonly languageId: Id<'language'> | null;
  readonly marketId: Id<'market'> | null;
  readonly condition: OwnedCopy['condition'];
  readonly grade: OwnedCopy['grade'];
}
export type PriceObservation = {
  readonly origin: string;
  readonly transportProvider: string;
  readonly listingId: string | null;
  readonly scope: PriceScope;
  readonly observedAt: string;
  readonly providerUpdatedAt: string | null;
  readonly provenance: Provenance;
} & (
  | { readonly status: 'available'; readonly money: Money; readonly metric: string; readonly mapping: 'exact' }
  | { readonly status: PriceAvailability; readonly reason: string; readonly money: null }
);
export interface ExternalMapping {
  readonly provider: string;
  readonly entity: 'set' | 'release' | 'printing' | 'variant';
  readonly externalId: string;
  readonly parentExternalId?: string;
  readonly locale: string;
  readonly domain: ProductDomain;
  readonly canonicalId: Id<'set'> | Id<'release'> | Id<'printing'> | Id<'variant'>;
  readonly status: 'candidate' | 'verified' | 'rejected';
  readonly provenance: Provenance;
}
export interface CatalogSnapshot {
  readonly species: readonly Species[];
  readonly languages: readonly Language[];
  readonly markets: readonly Market[];
  readonly eras: readonly Era[];
  readonly sets: readonly CardSet[];
  readonly releases: readonly SetRelease[];
  readonly designs: readonly CardDesign[];
  readonly printings: readonly Printing[];
  readonly variants: readonly CardVariant[];
  readonly mappings: readonly ExternalMapping[];
}
