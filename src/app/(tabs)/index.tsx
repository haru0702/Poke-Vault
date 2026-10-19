import { Text, View } from 'react-native';
import { Button, Eyebrow, Label, Metric, Screen, Surface, styles } from '../../components/ui';
import { useVault } from '../../state/vault';
import { colors } from '../../theme/tokens';
export default function DashboardScreen() {
  const vault = useVault();
  const languages = new Set(vault.copies.map(c => c.card.language));
  return <Screen mode="live" title="Dashboard" subtitle="Your collection, at a glance.">
    <Surface style={{ padding: 26, gap: 18, backgroundColor: '#213323' }}><Eyebrow>THE COLLECTOR’S COMPANION</Eyebrow><Text style={{ color: colors.text, fontSize: 38, fontWeight: '600' }}>Every card has{ '\n' }a place here.</Text><Label>Discover real card printings and build a collection that tells your story.</Label><View style={[styles.row, { flexWrap: 'wrap' }]}><Button label="Explore Pokédex" href="/pokedex" icon="arrow-forward" /><Button label="My collection" href="/collection" secondary /></View></Surface>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}><Metric label="Physical copies" value={vault.ready ? String(vault.copies.length) : '—'} caption="Saved on this device" icon="albums-outline" /><Metric label="Collection languages" value={vault.ready ? String(languages.size) : '—'} caption="Your saved copies" icon="language-outline" /><Metric label="Market value" value="—" caption="Pricing outside Sprint 1" icon="pie-chart-outline" /></View>
    <Surface><Label style={{ fontWeight: '600' }}>A catalog with room to grow</Label><Label muted>TCGdex has known historical, regional, language and promotional gaps. Listed sets never establish complete cards or variants. Your collection remains separate from catalog requests.</Label></Surface>
    {vault.error ? <Label accessibilityRole="alert">{vault.error}</Label> : null}
  </Screen>;
}
