import type { CatalogCard } from '../domain/live';

export type ArtworkIdentity = Pick<CatalogCard, 'external' | 'name' | 'collectorNumber' | 'language'>;
export interface ArtworkOverride {
  readonly cardId: string;
  readonly setId: string;
  readonly name: string;
  readonly number: string;
  readonly image: string;
  readonly source: string;
  readonly sourceCardId: string;
  readonly evidence: string;
  readonly reviewedAt: string;
  readonly sourcePage?: string;
  readonly termsUrl?: string;
  readonly usageScope?: 'personal-noncommercial';
}
/** Reviewed exact English printings only. Never map by species/name alone.
 * Legacy-host availability is not guaranteed; normal load-failure fallback still applies.
 * No variant/condition claim, collection rewrite, or live paid API integration.
 */
const historicalOverrides: readonly ArtworkOverride[] = [
  { cardId: 'exu-!', setId: 'exu', name: 'Unown', number: '!', image: 'https://images.pokemontcg.io/ex10/!_hires.png', sourceCardId: 'ex10-!', evidence: 'ex10-selected.json' },
  { cardId: 'exu-%3F', setId: 'exu', name: 'Unown', number: '%3F', image: 'https://images.pokemontcg.io/ex10/question_hires.png', sourceCardId: 'ex10-?', evidence: 'ex10-selected.json' },
  { cardId: 'sm7.5-1', setId: 'sm7.5', name: 'Charmander', number: '1', image: 'https://images.pokemontcg.io/sm75/1_hires.png', sourceCardId: 'sm75-1', evidence: 'sm75-selected.json' },
  { cardId: 'sm3.5-1', setId: 'sm3.5', name: 'Bulbasaur', number: '1', image: 'https://images.pokemontcg.io/sm35/1_hires.png', sourceCardId: 'sm35-1', evidence: 'sm35-selected.json' },
].map(entry => ({ ...entry, source: 'Pokémon TCG API (legacy)', reviewedAt: '2026-10-19', evidence: `docs/artwork-evidence/${entry.evidence}` }));

/** Explicit personal-use references, not a general Pooka integration or redistribution grant. */
const trainerKitOverrides: readonly ArtworkOverride[] = [
  { cardId: 'tk-xy-latio-1', setId: 'tk-xy-latio', name: 'Skitty', number: '1', image: 'https://cdn.pooka.app/card/en-tk8a-1.png', sourceCardId: 'en-tk8a-1', sourcePage: 'https://pooka.app/card/en-tk8a-1/Skitty' },
  { cardId: 'tk-xy-p-1', setId: 'tk-xy-p', name: 'Glameow', number: '1', image: 'https://cdn.pooka.app/card/en-tk9b-1.png', sourceCardId: 'en-tk9b-1', sourcePage: 'https://pooka.app/card/en-tk9b-1/Glameow' },
].map(entry => ({ ...entry, source: 'Pooka (personal use)', reviewedAt: '2026-10-19', evidence: 'docs/artwork-evidence/trainer-kit-browser.json', termsUrl: 'https://pooka.app/terms', usageScope: 'personal-noncommercial' as const }));
export const artworkOverrides: readonly ArtworkOverride[] = [...historicalOverrides, ...trainerKitOverrides];

export function findArtworkOverride(card: ArtworkIdentity): ArtworkOverride | undefined {
  if (card.external.provider !== 'tcgdex' || card.external.locale !== 'en' || card.language !== 'en') return undefined;
  return artworkOverrides.find(entry => entry.cardId === card.external.cardId && entry.setId === card.external.setId && entry.name === card.name && entry.number === card.collectorNumber);
}
