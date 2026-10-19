import { useEffect, useState } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { Button, EmptyState, Label, ResponsiveGrid, Screen, SectionHeader, Surface } from '../../components/ui';
import { CardDetails, CatalogTile, inputStyle, Select } from '../../components/catalog';
import { emptyQuery, type CatalogCard, type CatalogIndex, type CardQuery } from '../../domain/live';
import { catalogLanguages, liveCatalogProvider } from '../../providers/tcgdex';
import { useVault } from '../../state/vault';
import { colors } from '../../theme/tokens';

export default function PokedexScreen() {
  const vault = useVault();
  const [locale, setLocale] = useState('en');
  const [index, setIndex] = useState<CatalogIndex | null>(null); const [indexLocale, setIndexLocale] = useState('');
  const [query, setQuery] = useState<CardQuery>(emptyQuery); const [applied, setApplied] = useState<CardQuery>(emptyQuery);
  const [cards, setCards] = useState<readonly CatalogCard[]>([]); const [selected, setSelected] = useState<CatalogCard | null>(null);
  const [page, setPage] = useState(1); const [next, setNext] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); const [indexLoading, setIndexLoading] = useState(true);
  const [error, setError] = useState(''); const [warnings, setWarnings] = useState<readonly string[]>([]); const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!vault.ready) return;
    const controller = new AbortController();
    void liveCatalogProvider.index(locale, controller.signal).then(result => {
      if (controller.signal.aborted) return;
      setIndex(result); setIndexLocale(locale); setPage(1); setLoading(true);
    }).catch(e => { if (!controller.signal.aborted) { setError(e instanceof Error ? e.message : 'Catalog unavailable'); setLoading(false); } })
      .finally(() => { if (!controller.signal.aborted) setIndexLoading(false); });
    return () => controller.abort();
  }, [locale, vault.ready, retry]);
  useEffect(() => {
    if (!index || indexLocale !== locale) return;
    const controller = new AbortController();
    void liveCatalogProvider.search(locale, index, applied, page, controller.signal).then(result => {
      if (controller.signal.aborted) return;
      setCards(old => [...new Map([...(page === 1 ? [] : old), ...result.cards].map(card => [card.id, card])).values()]);
      setNext(result.nextPage); setWarnings(result.warnings);
    }).catch(e => { if (!controller.signal.aborted) { setError(e instanceof Error ? e.message : 'Cards unavailable'); setNext(null); } })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [locale, index, indexLocale, applied, page]);
  function resetIndex() { setIndex(null); setCards([]); setNext(null); setWarnings([]); setError(''); setIndexLoading(true); setLoading(false); }
  function changeLanguage(value: string) { resetIndex(); setLocale(value); setQuery(emptyQuery); setApplied(emptyQuery); setPage(1); setSelected(null); }
  const sets = index?.sets.filter(s => !query.eraId || s.eraId === query.eraId) ?? [];
  return <Screen mode="live" title="Pokédex" subtitle="Real printings. Explore what the catalog actually knows.">
    <Surface style={{ gap: 14 }}>
      <Select label="Language" value={locale} options={catalogLanguages.map(l => ({ value: l[0], label: l[1] }))} onChange={changeLanguage} />
      <Label muted>Language catalogs differ. An empty list does not prove a language was never officially released. Portuguese aliases have different coverage.</Label>
      <TextInput accessibilityLabel="Pokémon name" placeholder="Pokémon / card name in selected language" placeholderTextColor={colors.muted} value={query.name} onChangeText={name => setQuery(q => ({ ...q, name }))} style={inputStyle} autoCorrect={false} />
      <TextInput accessibilityLabel="Card number" placeholder="Card number, e.g. 001 or TG01" placeholderTextColor={colors.muted} value={query.number} onChangeText={number => setQuery(q => ({ ...q, number }))} style={inputStyle} autoCorrect={false} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        <Select label="Era" value={query.eraId} options={[{ value: '', label: 'All listed eras' }, ...(index?.eras.map(e => ({ value: e.id, label: e.name })) ?? [])]} onChange={eraId => setQuery(q => ({ ...q, eraId, setId: '' }))} />
        <Select label="Set" value={query.setId} options={[{ value: '', label: 'All listed physical sets' }, ...sets.map(s => ({ value: s.id, label: s.name }))]} onChange={setId => setQuery(q => ({ ...q, setId }))} />
        <Select label="Rarity" value={query.rarity} options={[{ value: '', label: 'All rarities' }, ...(index?.rarities.map(r => ({ value: r, label: r })) ?? [])]} onChange={rarity => setQuery(q => ({ ...q, rarity }))} />
      </View>
      <Button label="Search catalog" icon="search-outline" onPress={() => { setCards([]); setNext(null); setError(''); setWarnings([]); setLoading(true); setPage(1); setApplied({ ...query }); }} />
      <Label muted>Filters apply when you search. Name and number match within the selected language; rarity is not a physical variant.</Label>
    </Surface>
    {!vault.ready ? <Surface><Label accessibilityRole={vault.error ? 'alert' : undefined}>{vault.error ?? 'Opening local identity registry…'}</Label>{vault.error ? <Button label="Retry local storage" onPress={() => void vault.reload()} /> : null}</Surface> : null}
    {vault.ready && (indexLoading || loading) ? <View style={{ gap: 8, alignItems: 'center' }}><ActivityIndicator color={colors.accent} accessibilityLabel="Loading TCGdex catalog" /><Label muted>{indexLoading ? 'Loading provider eras and physical sets…' : 'Loading card metadata…'}</Label></View> : null}
    {error ? <Surface><Label accessibilityRole="alert">{error}</Label><Button label="Retry catalog" onPress={() => { resetIndex(); setPage(1); setRetry(r => r + 1); }} /></Surface> : null}
    {[...(index?.warnings ?? []), ...warnings].map((warning, i) => <Label key={i} accessibilityRole="alert">{warning}</Label>)}
    {index && !indexLoading ? <Label muted>{index.eras.length} listed eras · {index.sets.length} physical set candidates · completeness unverified. Set presence does not imply cards or variants are complete.</Label> : null}
    <View><SectionHeader title="Card catalog" aside={`${cards.length} retrieved records`} />
      {cards.length ? <ResponsiveGrid columns={4}>{cards.map(card => <CatalogTile key={card.id} card={card} onPress={() => setSelected(card)} />)}</ResponsiveGrid> : !loading && !indexLoading && vault.ready && !error ? <EmptyState title={index?.sets.length === 0 ? 'No physical catalog records' : 'No matching retrieved cards'} description="This language, set or search may be unsupported or incomplete. No mock cards have been substituted." /> : null}
    </View>
    {next && !loading ? <Button label="Load more cards" secondary onPress={() => { setLoading(true); setError(''); setPage(next); }} /> : null}
    <Label muted>Source: TCGdex. Metadata and artwork remain provider-supplied and unverified against an independent checklist. Card artwork © its respective rights holders.</Label>
    {selected ? <CardDetails key={selected.id} card={selected} onClose={() => setSelected(null)} /> : null}
  </Screen>;
}
