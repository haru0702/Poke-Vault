import type { Id } from './identity';
import type { CardVariant, CoverageStatus, OwnedCopy, Provenance } from './models';

export interface CatalogEra {
  readonly id: Id<'era'>;
  readonly externalId: string;
  readonly name: string;
}
export interface CatalogSet {
  readonly id: Id<'set'>;
  readonly releaseId: Id<'release'>;
  readonly externalId: string;
  readonly name: string;
  readonly eraId: Id<'era'>;
  readonly language: string;
  readonly providerTotal: number | null;
}
export interface CatalogIndex {
  readonly eras: readonly CatalogEra[];
  readonly sets: readonly CatalogSet[];
  readonly rarities: readonly string[];
  readonly warnings: readonly string[];
}
export interface CatalogCard {
  readonly id: Id<'printing'>;
  readonly releaseId: Id<'release'>;
  readonly setId: Id<'set'>;
  readonly eraId: Id<'era'>;
  readonly name: string;
  readonly collectorNumber: string | null;
  readonly language: string;
  readonly setName: string;
  readonly eraName: string;
  readonly rarity: string | null;
  readonly image: string | null;
  readonly category: string | null;
  readonly illustrator: string | null;
  readonly hp: number | null;
  readonly types: readonly string[];
  readonly description: string | null;
  readonly dexIds?: readonly number[];
  readonly effect?: string | null;
  readonly stage?: string | null;
  readonly regulationMark?: string | null;
  readonly abilities?: readonly { name: string; effect: string | null; type: string | null }[];
  readonly attacks: readonly { name: string; effect: string | null; damage: string | null }[];
  readonly variants: readonly CardVariant[];
  /** Legacy flags are hints only, never combined into invented physical variants. */
  readonly variantHints: readonly string[];
  readonly coverage: CoverageStatus;
  readonly provenance: Provenance;
  readonly external: { provider: string; locale: string; cardId: string; setId: string };
}
export interface CardQuery {
  readonly name: string;
  readonly number: string;
  readonly setId: string;
  readonly eraId: string;
  readonly rarity: string;
}
export const emptyQuery: CardQuery = { name: '', number: '', setId: '', eraId: '', rarity: '' };
export interface CardPage {
  readonly cards: readonly CatalogCard[];
  readonly nextPage: number | null;
  readonly warnings: readonly string[];
}
export interface SavedCopy {
  readonly copy: OwnedCopy;
  readonly card: CatalogCard;
}
export function matchesCard(card: CatalogCard, query: CardQuery): boolean {
  return card.name.toLocaleLowerCase().includes(query.name.trim().toLocaleLowerCase())
    && (card.collectorNumber ?? '').toLocaleLowerCase().includes(query.number.trim().toLocaleLowerCase())
    && (!query.setId || card.setId === query.setId)
    && (!query.eraId || card.eraId === query.eraId)
    && (!query.rarity || card.rarity === query.rarity);
}
export function variantLabel(variant: CardVariant): string {
  return Object.entries(variant.attributes).map(([key, values]) => `${key}: ${values.join(', ')}`).join(' · ') || 'Provider variant (attributes unknown)';
}
