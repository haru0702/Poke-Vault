import { Text, View } from 'react-native';
import { Button, EmptyState, Eyebrow, Icon, Label, Pill, ResponsiveGrid, Screen, SectionHeader, Surface, styles } from '../../components/ui';
import { usePreview } from '../../state/preview';
import { colors } from '../../theme/tokens';

export default function PortfolioScreen() {
  const { catalog, copies } = usePreview();
  const languageMix = catalog.languages.map((language) => ({ language,
    count: copies.filter((copy) => {
      const printing = catalog.printings.find((item) => item.id === copy.identification.printingId);
      return catalog.releases.some((release) => release.id === printing?.releaseId && release.languageId === language.id);
    }).length,
  })).filter((entry) => entry.count > 0);
  const unknown = copies.filter((copy) => copy.identification.status === 'unidentified').length;
  return <Screen title="Portfolio" subtitle="Understand what you collect. Value it with context.">
    <Surface style={{ padding: 26, gap: 18 }}><View style={styles.rowBetween}><Eyebrow>COLLECTION VALUE</Eyebrow><Pill label="No live pricing" tone="gold" /></View><Text style={{ fontSize: 54, color: colors.text, fontWeight: '300' }}>—</Text><Label muted>No estimate available. {copies.length} preview copies are unpriced.</Label><View style={{ height: 1, backgroundColor: colors.border }} /><View style={[styles.row, { flexWrap: 'wrap', gap: 20 }]}><Label muted>Priced copies <Text style={{ color: colors.text }}>0</Text></Label><Label muted>Unpriced copies <Text style={{ color: colors.gold }}>{copies.length}</Text></Label><Label muted>Acquisition costs <Text style={{ color: colors.text }}>Unknown</Text></Label></View></Surface>
    <View><SectionHeader title="A little perspective" aside="Mock collection only" /><ResponsiveGrid columns={2}>
      <Surface style={{ flex: 1, gap: 18 }}><Label style={{ fontWeight: '600', fontSize: 16 }}>Languages in your binder</Label>{languageMix.map(({ language, count }) => <View key={language.id} style={{ gap: 8 }}><View style={styles.rowBetween}><Label muted>{language.name}</Label><Label>{count} {count === 1 ? 'copy' : 'copies'}</Label></View><View style={{ height: 5, borderRadius: 4, backgroundColor: colors.elevated }}><View style={{ width: `${count / copies.length * 100}%`, height: 5, borderRadius: 4, backgroundColor: colors.accent }} /></View></View>)}<Label muted style={{ fontSize: 11 }}>{unknown} unidentified copy · not catalog completion</Label></Surface>
      <Surface style={{ flex: 1, gap: 14 }}><View style={styles.row}><Icon name="information-circle-outline" color={colors.accent} /><Label style={{ fontWeight: '600', fontSize: 16 }}>A price needs a match</Label></View><Label muted>Language, finish, edition, condition, and grading all matter. A broad marketplace listing isn’t automatically a value for your copy.</Label><Label muted>No market amounts, purchase costs, or currency conversions are invented for this preview.</Label><Button label="Provider settings" href="/settings" icon="arrow-forward" secondary /></Surface>
    </ResponsiveGrid></View>
    <EmptyState title="Price history will live here" description="A compatible pricing provider and verified listing identities are needed before real observations can be shown." icon="analytics-outline" />
  </Screen>;
}
