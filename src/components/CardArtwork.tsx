import { findArtworkOverride } from '../providers/artwork-overrides';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Platform, View } from 'react-native';
import type { CatalogCard } from '../domain/live';
import { resolveCardArtwork } from './artwork';
import { colors } from '../theme/tokens';
import { Label } from './ui';

type Props = { card: Pick<CatalogCard, 'id' | 'name' | 'image' | 'external' | 'collectorNumber' | 'language'>; small?: boolean; imageUrls?: readonly string[] };
export function CardArtwork(props: Props) {
  const urls = resolveCardArtwork(props.card, Platform.OS, props.imageUrls);
  // Remount the request state when a card or its URLs change, including saved snapshots.
  return <ArtworkRequest key={JSON.stringify([props.card.id, urls])} {...props} urls={urls} />;
}
function ArtworkRequest({ card, small = false, urls }: Props & { urls: string[] }) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const uri = urls[index];
  const failed = urls.length > 0 && !uri;
  const supplement = findArtworkOverride(card);
  const supplemental = !!supplement && uri === supplement.image;
  useEffect(() => {
    if (!uri || loaded) return;
    // A stalled request must not leave an empty rectangle indefinitely.
    const timer = setTimeout(() => setIndex(i => i + 1), 15000);
    return () => clearTimeout(timer);
  }, [uri, loaded]);
  useEffect(() => {
    if (__DEV__ && !uri) {
      // No URLs, tokens, ownership records or user metadata in diagnostic output.
      console.debug('[CardArtwork]', { provider: card.external.provider, locale: card.external.locale, cardId: card.external.cardId, reason: failed ? 'load-failed' : 'missing-or-invalid-url' });
    }
  }, [uri, failed, card.external.provider, card.external.locale, card.external.cardId]);
  return <View testID="card-artwork" style={{ width: small ? 58 : '100%', height: small ? 82 : 245, borderRadius: 10, overflow: 'hidden', backgroundColor: colors.elevated, alignItems: 'center', justifyContent: 'center' }}>
    {uri ? <Image key={uri} accessibilityLabel={`${card.name} card artwork`} source={{ uri }} onLoad={() => setLoaded(true)} onError={() => { setLoaded(false); setIndex(i => i + 1); }} style={{ position: 'absolute', width: '100%', height: '100%', resizeMode: 'contain' }} /> : null}
    {uri && !loaded ? <View accessibilityLabel="Loading artwork" style={{ alignItems: 'center', gap: 6 }}><ActivityIndicator color={colors.accent} /><Label muted style={{ fontSize: 10 }}>Loading artwork</Label></View> : null}
    {loaded && supplemental ? <View style={{ position: 'absolute', bottom: 0, backgroundColor: colors.surface, padding: 3 }}><Label accessibilityLabel={`Artwork source: ${supplement.source}`} muted style={{ fontSize: small ? 8 : 10, textAlign: 'center' }}>Artwork: {small ? 'supplementary' : supplement.source}</Label></View> : null}
    {!uri ? <View accessibilityLabel={failed ? 'Artwork failed to load' : 'Artwork unavailable from provider'} style={{ padding: small ? 3 : 12, alignItems: 'center', gap: 4 }}><Label muted style={{ fontSize: small ? 10 : 14, textAlign: 'center' }}>Artwork unavailable</Label>{!small ? <Label muted style={{ fontSize: 11 }}>{failed ? 'Image could not be loaded' : 'No usable image supplied by provider'}</Label> : null}</View> : null}
  </View>;
}
