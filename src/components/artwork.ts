import { findArtworkOverride, type ArtworkIdentity } from '../providers/artwork-overrides';
import type { CatalogCard } from '../domain/live';
import { tcgdexRenditions } from '../providers/tcgdex-artwork';

/** Explicit provider URLs only; generic providers do not inherit TCGdex's URL rules. */
export function resolveCardArtwork(card: Pick<CatalogCard, 'image'> & ArtworkIdentity, platform: string, imageUrls: readonly string[] = []): string[] {
  const candidates = [card.image, ...imageUrls, findArtworkOverride(card)?.image].flatMap(value => {
    if (!value) return [];
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.username || url.password) return [];
      return (card.external.provider === 'tcgdex' ? tcgdexRenditions(url, platform !== 'web') : null) ?? [url.href];
    } catch { return []; }
  });
  return [...new Set(candidates)];
}
