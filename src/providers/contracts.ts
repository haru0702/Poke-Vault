import type { Id } from '../domain/identity';
import type { CardSet, CatalogSnapshot, DataMode, ExternalMapping, PriceObservation, PriceScope, Printing, ProductDomain } from '../domain/models';

export interface ProviderCapabilities {
  readonly id: string;
  readonly label: string;
  readonly mode: DataMode;
  readonly languageTags: readonly string[];
  readonly domains: readonly ProductDomain[];
  readonly catalog: boolean;
  readonly pricing: boolean;
  readonly limitations: readonly string[];
}
export interface ProviderContext { readonly locale: string; readonly domain: ProductDomain; readonly signal?: AbortSignal }
export interface ProviderEnvelope<T> {
  readonly provider: string;
  readonly requestedLocale: string;
  readonly actualLocale: string | null;
  readonly fetchedAt: string;
  readonly upstreamUpdatedAt: string | null;
  readonly evidenceRef: string | null;
  readonly data: T;
}
export type ProviderResult<T> =
  | { readonly status: 'ok'; readonly result: ProviderEnvelope<T> }
  | { readonly status: 'unavailable' | 'unsupported' | 'error'; readonly reason: string; readonly retryable: boolean };
export interface ProviderPage<T> { readonly items: readonly T[]; readonly nextCursor: string | null }
/** External records are staging data, never automatically canonical entities. */
export interface ProviderRecord<T> { readonly externalId: string; readonly parentExternalId?: string; readonly payload: T }
export interface CatalogProvider {
  capabilities(): ProviderCapabilities;
  listSets(context: ProviderContext, cursor?: string): Promise<ProviderResult<ProviderPage<ProviderRecord<unknown>>>>;
  getSet(externalId: string, context: ProviderContext): Promise<ProviderResult<ProviderRecord<unknown>>>;
  getCard(externalId: string, context: ProviderContext): Promise<ProviderResult<ProviderRecord<unknown>>>;
}
export interface PricingProvider {
  capabilities(): ProviderCapabilities;
  resolveListing(scope: PriceScope, context: ProviderContext): Promise<ProviderResult<readonly ExternalMapping[]>>;
  getObservations(listingIds: readonly string[], context: ProviderContext): Promise<ProviderResult<readonly PriceObservation[]>>;
}
/** Only reviewed canonical upserts may reach the domain merge; no collection repository is exposed. */
export interface CatalogRepository {
  read(): Promise<CatalogSnapshot>;
  upsertReviewed(snapshot: CatalogSnapshot): Promise<void>;
}
export interface CollectionRepository {
  list(): Promise<readonly import('../domain/models').OwnedCopy[]>;
  saveByUser(copy: import('../domain/models').OwnedCopy): Promise<void>;
  removeByUser(copyId: Id<'copy'>): Promise<void>;
}
export interface PreviewDataSource {
  readonly mode: 'mock';
  readonly catalog: CatalogSnapshot;
  readonly sets: readonly CardSet[];
  readonly printings: readonly Printing[];
}
