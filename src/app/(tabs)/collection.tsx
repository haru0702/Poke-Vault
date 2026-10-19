import { CardArtwork } from '../../components/CardArtwork';
import { useState } from 'react';
import { ActivityIndicator, Pressable, TextInput, View } from 'react-native';
import { Button, EmptyState, Label, Screen, SectionHeader, Surface, styles } from '../../components/ui';
import { CardDetails, inputStyle } from '../../components/catalog';
import type { SavedCopy } from '../../domain/live';
import { variantLabel } from '../../domain/live';
import { useVault } from '../../state/vault';
import { colors } from '../../theme/tokens';

export default function CollectionScreen() {
  const vault = useVault(); const [query, setQuery] = useState(''); const [selected, setSelected] = useState<SavedCopy | null>(null);
  const needle = query.trim().toLocaleLowerCase();
  const visible = vault.copies.filter(item => [item.card.name, item.card.collectorNumber ?? '', item.card.language, item.card.setName].some(s => s.toLocaleLowerCase().includes(needle)));
  return <Screen mode="live" title="Collection" subtitle="Your physical copies, saved on this device.">
    <Surface><Label>{vault.ready ? `${vault.copies.length} physical ${vault.copies.length === 1 ? 'copy' : 'copies'}` : 'Loading saved copies…'} · one record per object</Label><Label muted>Saved card snapshots remain here even when TCGdex is unavailable. Local storage is not a cloud backup. No mock copies are imported.</Label></Surface>
    <TextInput accessibilityLabel="Search collection" placeholder="Name, card number, set or language" placeholderTextColor={colors.muted} value={query} onChangeText={setQuery} style={inputStyle} />
    {!vault.ready && !vault.error ? <ActivityIndicator color={colors.accent} accessibilityLabel="Loading local collection" /> : null}
    {vault.error ? <Surface><Label accessibilityRole="alert">{vault.error}</Label><Button label="Retry local storage" onPress={() => void vault.reload()} /></Surface> : null}
    <SectionHeader title="Your binder" aside={vault.ready ? `${visible.length} ${visible.length === 1 ? 'copy' : 'copies'}` : 'Loading…'} />
    {visible.map(item => {
      const variant = item.card.variants.find(v => v.id === item.copy.identification.variantId);
      return <Pressable key={item.copy.id} accessibilityRole="button" accessibilityLabel={`Edit ${item.card.name} copy ${item.copy.id.slice(-4)}`} onPress={() => setSelected(item)}><Surface style={{ padding: 14 }}><View style={[styles.row, { alignItems: 'flex-start' }]}><CardArtwork key={item.card.image} card={item.card} small /><View style={{ flex: 1, gap: 6 }}><Label style={{ fontWeight: '700' }}>{item.card.name}</Label><Label muted>{item.card.language} · {item.card.setName} · #{item.card.collectorNumber ?? 'unnumbered'}</Label><Label muted>{variant ? variantLabel(variant) : 'Variant unknown'}</Label><Label>{item.copy.condition?.replaceAll('-', ' ') ?? 'Condition unknown'}</Label><Label muted style={{ fontSize: 10 }}>Physical copy {item.copy.id.slice(-8)}</Label></View></View></Surface></Pressable>;
    })}
    {vault.ready && visible.length === 0 ? <EmptyState title={vault.copies.length ? 'No matching copies' : 'Start your collection'} description="Open a real card in the Pokédex, choose its variant and condition, then add your physical copy." icon="albums-outline" /> : null}
    <Button label="Browse cards to add" href="/pokedex" />
    {selected ? <CardDetails key={selected.copy.id} card={selected.card} saved={selected} onClose={() => setSelected(null)} /> : null}
  </Screen>;
}
