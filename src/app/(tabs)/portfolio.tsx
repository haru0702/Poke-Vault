import { Text, View } from 'react-native';
import { EmptyState, Label, Screen, Surface, styles } from '../../components/ui';
import { useVault } from '../../state/vault';
import { colors } from '../../theme/tokens';
export default function PortfolioScreen() {
  const vault = useVault();
  const languages = [...new Set(vault.copies.map(item => item.card.language))];
  return <Screen mode="live" title="Portfolio" subtitle="Understand what you collect. Value it with context.">
    <Surface style={{ gap: 12 }}><Label>COLLECTION VALUE</Label><Text style={{ color: colors.text, fontSize: 50 }}>—</Text><Label muted>No estimate available. Pricing and price tracking are outside Sprint 1.</Label><Label>{vault.ready ? vault.copies.length : '—'} saved copies · all unpriced</Label></Surface>
    <Surface style={{ gap: 12 }}><Label accessibilityRole="header">Languages in your binder</Label>{languages.map(language => <View key={language} style={styles.rowBetween}><Label>{language}</Label><Label muted>{vault.copies.filter(item => item.card.language === language).length} copies</Label></View>)}{!languages.length ? <Label muted>No saved collection languages yet.</Label> : null}</Surface>
    <EmptyState title="No price tracking" description="Sprint 1 focuses on catalog identities and your physical collection. No market values or history have been fabricated." icon="analytics-outline" />
    {vault.error ? <Label accessibilityRole="alert">{vault.error}</Label> : null}
  </Screen>;
}
