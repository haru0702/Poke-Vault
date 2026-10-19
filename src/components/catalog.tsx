import { CardArtwork } from './CardArtwork';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, ScrollView, Switch, TextInput, View } from 'react-native';
import type { CatalogCard, SavedCopy } from '../domain/live';
import { variantLabel } from '../domain/live';
import type { Id } from '../domain/identity';
import type { OwnedCopy } from '../domain/models';
import { useVault } from '../state/vault';
import { colors } from '../theme/tokens';
import { Button, CoveragePill, Label, Pill, Surface, styles } from './ui';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Select({ label, value, options, onChange }: { label: string; value: string; options: readonly { value: string; label: string }[]; onChange(value: string): void }) {
  const [open, setOpen] = useState(false); const [filter, setFilter] = useState('');
  return <View style={{ flex: 1, minWidth: 130, gap: 5 }}>
    <Label muted>{label}</Label>
    <Pressable accessibilityRole="button" accessibilityLabel={`${label}: ${options.find(o => o.value === value)?.label ?? 'Choose'}`} onPress={() => { setFilter(''); setOpen(true); }} style={{ minHeight: 46, justifyContent: 'center', padding: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: colors.surface }}><Label numberOfLines={1}>{options.find(o => o.value === value)?.label ?? 'Choose'} ▾</Label></Pressable>
    {open ? <Modal visible animationType="slide" onRequestClose={() => setOpen(false)}><SafeAreaView style={{ flex: 1, backgroundColor: colors.background, padding: 20, gap: 12 }}>
      <Label accessibilityRole="header" style={{ fontSize: 22 }}>Choose {label.toLowerCase()}</Label>
      <TextInput accessibilityLabel={`Find ${label.toLowerCase()} option`} value={filter} onChangeText={setFilter} placeholder="Filter options" placeholderTextColor={colors.muted} style={inputStyle} />
      <FlatList data={options.filter(o => o.label.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))} keyExtractor={o => o.value} renderItem={({ item }) => <Pressable accessibilityRole="button" accessibilityLabel={`Choose ${label}: ${item.label}`} accessibilityState={{ selected: item.value === value }} onPress={() => { onChange(item.value); setOpen(false); }} style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border }}><Label>{item.label}</Label></Pressable>} ListEmptyComponent={<Label>No matching options</Label>} />
      <Button label="Close options" secondary onPress={() => setOpen(false)} />
    </SafeAreaView></Modal> : null}
  </View>;
}
export const inputStyle = { minHeight: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 14, color: colors.text, backgroundColor: colors.surface, fontSize: 14 } as const;
export function CatalogTile({ card, onPress }: { card: CatalogCard; onPress(): void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`View ${card.name}, ${card.language}, ${card.collectorNumber ?? 'unnumbered'}`} onPress={onPress}><Surface style={{ padding: 12, gap: 9 }}><CardArtwork key={card.image} card={card} /><Label style={{ fontWeight: '700' }}>{card.name}</Label><Label muted>{card.setName} · #{card.collectorNumber ?? 'unnumbered'}</Label><View style={styles.rowBetween}><Pill label={card.language} /><Label muted>{card.rarity ?? 'Rarity unknown'}</Label></View><CoveragePill status={card.coverage} /></Surface></Pressable>;
}
const conditionOptions = [{ value: '', label: 'Unknown condition' }, { value: 'near-mint', label: 'Near mint' }, { value: 'lightly-played', label: 'Lightly played' }, { value: 'played', label: 'Played' }, { value: 'damaged', label: 'Damaged' }];
/** One editor session per card/copy. The parent unmounts this component on close. */
export function CardDetails({ card, saved, onClose }: { card: CatalogCard; saved?: SavedCopy; onClose(): void }) {
  const vault = useVault();
  const [variant, setVariant] = useState<string>(saved?.copy.identification.variantId ?? '');
  const [condition, setCondition] = useState<string>(saved?.copy.condition ?? '');
  const [additional, setAdditional] = useState(false);
  const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  const [confirmRemove, setConfirmRemove] = useState(false);
  async function save() {
    if (busy) return; setBusy(true); setError(''); setNotice('');
    try {
      const variantId = variant ? card.variants.find(v => v.id === variant)?.id : null;
      if (variant && !variantId) throw new Error('Selected variant is unavailable');
      if (saved) await vault.edit(saved.copy.id, variantId ?? null, (condition || null) as OwnedCopy['condition']);
      else await vault.add(card, variantId ?? null, (condition || null) as OwnedCopy['condition'], additional);
      setNotice(saved ? 'Copy updated on this device.' : 'One physical copy saved on this device.'); setAdditional(false);
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to save'); }
    finally { setBusy(false); }
  }
  async function remove(id: Id<'copy'>) {
    setBusy(true); setError('');
    try { await vault.remove(id); onClose(); } catch (e) { setError(e instanceof Error ? e.message : 'Unable to remove'); } finally { setBusy(false); }
  }
  return <Modal visible animationType="slide" onRequestClose={() => { if (!busy) onClose(); }}><SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border }}><View style={styles.rowBetween}><Label accessibilityRole="header" style={{ fontSize: 22 }}>{saved ? 'Edit physical copy' : 'Card details'}</Label><Button label="Close details" secondary onPress={() => { if (!busy) onClose(); }} /></View><Label muted>TCGdex · coverage unverified · no prices</Label></View>
    <ScrollView contentContainerStyle={{ padding: 20, gap: 16, maxWidth: 700, width: '100%', alignSelf: 'center' }} keyboardShouldPersistTaps="handled">
      <CardArtwork card={card} /><Label style={{ fontSize: 24, fontWeight: '700' }}>{card.name}</Label><Label>{card.setName} · #{card.collectorNumber ?? 'unnumbered'} · {card.language}</Label><Label muted>{card.eraName} · {card.category ?? 'Category unknown'} · {card.rarity ?? 'Rarity unknown'}</Label>
      <Label muted>Illustrator: {card.illustrator ?? 'Unknown'} · HP: {card.hp ?? 'Unknown'} · Types: {card.types.join(', ') || 'Unknown'}</Label>
      {card.description ? <Label>{card.description}</Label> : null}
      {card.stage || card.regulationMark ? <Label muted>{card.stage ? `Stage: ${card.stage}` : ''}{card.regulationMark ? ` · Regulation mark: ${card.regulationMark}` : ''}</Label> : null}
      {card.effect ? <Surface><Label>{card.effect}</Label></Surface> : null}
      {card.abilities?.map((ability, i) => <Surface key={`ability-${i}`}><Label style={{ fontWeight: '600' }}>{ability.name}{ability.type ? ` · ${ability.type}` : ''}</Label>{ability.effect ? <Label muted>{ability.effect}</Label> : null}</Surface>)}
      {card.attacks.map((attack, i) => <Surface key={i}><Label style={{ fontWeight: '600' }}>{attack.name}{attack.damage ? ` · ${attack.damage}` : ''}</Label>{attack.effect ? <Label muted>{attack.effect}</Label> : null}</Surface>)}
      <Label accessibilityRole="header" style={{ fontWeight: '700' }}>Physical variant</Label><Label muted>Variants are independent of rarity. Provider information may be incomplete; unknown is not normal.</Label>
      <Select label="Variant" value={variant} options={[{ value: '', label: 'Unknown / not identified' }, ...card.variants.map(v => ({ value: v.id, label: variantLabel(v) }))]} onChange={setVariant} />
      {card.variants.length === 0 ? <Label muted>No detailed physical variants supplied.</Label> : <Label muted>{card.variants.length} provider variant candidates; not a complete variant checklist.</Label>}
      {card.variantHints.length > 0 ? <Label muted>Legacy provider hints: {card.variantHints.join(', ')}. These do not identify physical combinations.</Label> : null}
      <Select label="Condition" value={condition} options={conditionOptions} onChange={setCondition} />
      {!saved ? <View style={styles.rowBetween}><Label style={{ flex: 1 }}>Add another physical copy intentionally</Label><Switch accessibilityLabel="Add another physical copy" value={additional} onValueChange={setAdditional} /></View> : null}
      {vault.error ? <Label accessibilityRole="alert">{vault.error}</Label> : null}
      {error ? <Label accessibilityRole="alert">{error}</Label> : null}{notice ? <Label accessibilityLiveRegion="polite">{notice}</Label> : null}
      {busy ? <ActivityIndicator accessibilityLabel="Saving collection" color={colors.accent} /> : vault.ready ? <Button label={saved ? 'Save copy changes' : 'Add to collection'} onPress={() => void save()} /> : <Label muted>Collection storage is not ready. Adding is disabled.</Label>}
      {saved && !busy ? confirmRemove ? <Surface><Label>Remove this physical copy from your local collection? The catalog card remains available.</Label><View style={[styles.row, { marginTop: 12, flexWrap: 'wrap' }]}><Button label="Confirm removal" onPress={() => void remove(saved.copy.id)} /><Button label="Keep copy" secondary onPress={() => setConfirmRemove(false)} /></View></Surface> : <Button label="Remove this copy" secondary onPress={() => setConfirmRemove(true)} /> : null}
      <Label muted style={{ fontSize: 11 }}>Source: {card.provenance.evidenceRef} · Retrieved {card.provenance.observedAt}. Stored locally; no cloud backup or account sync. Card artwork belongs to its respective rights holders.</Label>
    </ScrollView>
  </SafeAreaView></Modal>;
}
