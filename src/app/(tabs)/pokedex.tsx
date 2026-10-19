import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Chip, CoveragePill, EmptyState, Icon, Label, Pill, PrintingCard, ResponsiveGrid, Screen, SectionHeader, Surface, styles } from '../../components/ui';
import { findPrintings } from '../../domain/catalog';
import { usePreview } from '../../state/preview';
import { colors } from '../../theme/tokens';

export default function PokedexScreen() {
  const { catalog } = usePreview();
  const [query, setQuery] = useState('');
  const [languageId, setLanguageId] = useState<string>();
  const [eraId, setEraId] = useState<string>();
  const results = useMemo(() => findPrintings(catalog, query, languageId, eraId), [catalog, query, languageId, eraId]);
  const activeLanguages = catalog.languages.filter((language) => catalog.releases.some((release) => release.languageId === language.id));
  return <Screen title="Pokédex" subtitle="Explore printings, across languages and eras.">
    <View style={{ gap: 14 }}>
      <View style={local.search}><Icon name="search-outline" /><TextInput accessibilityLabel="Search preview cards" placeholder="Search a name or collector number" placeholderTextColor={colors.subtle} value={query} onChangeText={setQuery} style={local.input} autoCorrect={false} clearButtonMode="while-editing" /></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}><Chip label="All languages" selected={!languageId} onPress={() => setLanguageId(undefined)} />{activeLanguages.map((language) => <Chip key={language.id} label={language.nativeName} selected={languageId === language.id} onPress={() => setLanguageId(language.id)} />)}</ScrollView>
      <Label muted style={{ fontSize: 11 }}>Era vocabulary is extensible. Some selections have no preview records.</Label>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 2 }}><Chip label="All eras" selected={!eraId} onPress={() => setEraId(undefined)} />{catalog.eras.map((era) => <Chip key={era.id} label={era.name} selected={eraId === era.id} onPress={() => setEraId(era.id)} />)}</ScrollView>
    </View>
    <View><SectionHeader title="Printing explorer" aside={`${results.length} mock results`} />{results.length > 0 ? <ResponsiveGrid columns={4}>{results.map((printing) => <PrintingCard key={printing.id} printing={printing} />)}</ResponsiveGrid> : <EmptyState title="No preview printings here" description="Try a different filter. An empty preview does not mean this language or era was never officially released." />}</View>
    <Surface><View style={{ gap: 12 }}><View style={styles.rowBetween}><Label style={{ fontWeight: '600' }}>Know what’s known</Label><Pill label="Catalog status" /></View><Label muted>Sample records illustrate partial and unverified data. Completion is unknown until an independent checklist is reconciled.</Label><View style={[styles.row, { flexWrap: 'wrap' }]}><CoveragePill status="partial" /><CoveragePill status="unverified" /><CoveragePill status="missing" /></View></View></Surface>
  </Screen>;
}
const local = StyleSheet.create({
  search: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingHorizontal: 16 },
  input: { flex: 1, minWidth: 0, minHeight: 52, color: colors.text, fontSize: 13, paddingVertical: 15 },
});
