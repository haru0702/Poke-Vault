import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CardArt, Chip, EmptyState, Icon, Label, Metric, Pill, Screen, SectionHeader, Surface, styles } from '../../components/ui';
import { getPrintingContext } from '../../data/mock';
import { usePreview } from '../../state/preview';
import { colors } from '../../theme/tokens';

type Filter = 'all' | 'identified' | 'review';
export default function CollectionScreen() {
  const { catalog, copies, compactRows, showCatalogNotes } = usePreview();
  const [filter, setFilter] = useState<Filter>('all');
  const [newestFirst, setNewestFirst] = useState(true);
  const visible = useMemo(() => [...copies].filter((copy) => filter === 'all' || (filter === 'identified' ? copy.identification.status === 'identified' : copy.identification.status !== 'identified'))
    .sort((a, b) => (newestFirst ? -1 : 1) * (a.acquisition.date ?? '').localeCompare(b.acquisition.date ?? '')), [copies, filter, newestFirst]);
  const identified = copies.filter((copy) => copy.identification.status === 'identified').length;
  return <Screen title="Collection" subtitle="Individual cards. A collection that’s yours.">
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}><Metric label="Physical copies" value={String(copies.length)} caption="Preview objects only" icon="albums-outline" /><Metric label="Identified variants" value={String(identified)} caption="Synthetic identifications" icon="checkmark-circle-outline" /><Metric label="Needs review" value={String(copies.length - identified)} caption="Printing or variant unknown" icon="scan-outline" /></View>
    <View style={{ gap: 14 }}><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}><Chip label="All copies" selected={filter === 'all'} onPress={() => setFilter('all')} /><Chip label="Identified" selected={filter === 'identified'} onPress={() => setFilter('identified')} /><Chip label="Needs review" selected={filter === 'review'} onPress={() => setFilter('review')} /><Chip label={newestFirst ? 'Newest first' : 'Oldest first'} selected={false} onPress={() => setNewestFirst(!newestFirst)} /></ScrollView>
    <SectionHeader title="Your preview binder" aside={`${visible.length} copies`} />
    {visible.length === 0 ? <EmptyState title="No copies in this view" description="Switch filters to see the sample collection." icon="albums-outline" /> : visible.map((copy) => {
      const printing = catalog.printings.find((item) => item.id === copy.identification.printingId);
      const context = printing ? getPrintingContext(printing) : null;
      const variant = catalog.variants.find((item) => item.id === copy.identification.variantId);
      return <Surface key={copy.id} style={{ padding: compactRows ? 12 : 16 }}><View style={[styles.row, { alignItems: 'flex-start', gap: 15 }]}>
        {printing && context ? <CardArt small number={printing.collectorNumber ?? '—'} element={context.element} /> : <View style={{ width: 52, height: 68, alignItems: 'center', justifyContent: 'center', borderRadius: 8, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.border }}><Icon name="help-outline" color={colors.subtle} /></View>}
        <View style={{ flex: 1, minWidth: 0, gap: 5 }}><Label style={{ fontWeight: '600', fontSize: 15 }}>{printing?.nativeName ?? 'Unidentified card'}</Label><Label muted style={{ fontSize: 11 }}>{context ? `${context.language.name} · ${variant?.attributes.finish?.join(', ') ?? 'Variant unknown'}` : 'Language and printing unknown'}</Label>{!compactRows ? <Label muted style={{ fontSize: 11 }}>{copy.location ?? 'No location'} · {copy.acquisition.date}</Label> : null}
        {showCatalogNotes ? <Label muted style={{ fontSize: 10 }}>Mock copy · {copy.id.slice(-4)}</Label> : null}</View>
        <Pill label={copy.identification.status === 'identified' ? 'Identified' : 'Review'} tone={copy.identification.status === 'identified' ? 'accent' : 'gold'} />
      </View></Surface>;
    })}</View>
    <Surface><View style={styles.row}><Icon name="shield-checkmark-outline" color={colors.accent} /><Label style={{ flex: 1, fontWeight: '600' }}>Your copies are separate from the catalog</Label></View><Label muted style={{ marginTop: 10 }}>Catalog updates cannot delete collection records. This preview is read-only and does not save real ownership data.</Label></Surface>
  </Screen>;
}
