import { Switch, View } from 'react-native';
import { Eyebrow, Icon, Label, Pill, Screen, SectionHeader, Surface, styles } from '../../components/ui';
import { usePreview } from '../../state/preview';
import { colors } from '../../theme/tokens';

export default function SettingsScreen() {
  const { showCatalogNotes, setShowCatalogNotes, compactRows, setCompactRows } = usePreview();
  return <Screen title="Settings" subtitle="Make space for the way you collect.">
    <Surface style={{ gap: 16 }}><View style={styles.rowBetween}><View style={styles.row}><View style={{ backgroundColor: colors.accentDark, padding: 12, borderRadius: 14 }}><Icon name="person-outline" color={colors.accent} size={23} /></View><View style={{ gap: 4 }}><Label style={{ fontSize: 17, fontWeight: '600' }}>Your personal vault</Label><Label muted style={{ fontSize: 12 }}>Sprint 0B · local preview</Label></View></View><Pill label="Mock data" tone="accent" /></View><Label muted>No account is connected. The sample binder is separate from your real collection.</Label></Surface>
    <View><SectionHeader title="Display" /><Surface style={{ gap: 20 }}>
      <View style={styles.rowBetween}><View style={{ flex: 1, gap: 4 }}><Label style={{ fontWeight: '600' }}>Dark appearance</Label><Label muted>Quiet colors, made for your collection.</Label></View><Pill label="On" tone="accent" /></View>
      <View style={{ height: 1, backgroundColor: colors.border }} />
      <View style={styles.rowBetween}><View style={{ flex: 1, gap: 4 }}><Label style={{ fontWeight: '600' }}>Show catalog notes</Label><Label muted>Show coverage badges and copy notes.</Label></View><Switch accessibilityLabel="Show catalog notes" value={showCatalogNotes} onValueChange={setShowCatalogNotes} trackColor={{ false: colors.border, true: '#547341' }} thumbColor={showCatalogNotes ? colors.accent : colors.muted} /></View>
      <View style={{ height: 1, backgroundColor: colors.border }} />
      <View style={styles.rowBetween}><View style={{ flex: 1, gap: 4 }}><Label style={{ fontWeight: '600' }}>Compact collection rows</Label><Label muted>Keep the binder list a little lighter.</Label></View><Switch accessibilityLabel="Compact collection rows" value={compactRows} onValueChange={setCompactRows} trackColor={{ false: colors.border, true: '#547341' }} thumbColor={compactRows ? colors.accent : colors.muted} /></View>
      <Label muted style={{ fontSize: 11 }}>Display preferences last for this session. Mock-data labeling always stays on.</Label>
    </Surface></View>
    <View><SectionHeader title="Data sources" /><View style={{ gap: 12 }}>
      <Surface><View style={styles.rowBetween}><View style={styles.row}><Icon name="flask-outline" color={colors.accent} /><Label style={{ fontWeight: '600' }}>Offline preview catalog</Label></View><Pill label="Active" tone="accent" /></View><Label muted style={{ marginTop: 10 }}>Synthetic records only. No API calls or credentials.</Label></Surface>
      <Surface><View style={styles.rowBetween}><View style={styles.row}><Icon name="cloud-outline" /><Label style={{ fontWeight: '600' }}>Catalog providers</Label></View><Pill label="Not connected" /></View><Label muted style={{ marginTop: 10 }}>Interfaces are ready for multiple sources. Historical, language, and promo coverage still needs verification.</Label></Surface>
      <Surface><View style={styles.rowBetween}><View style={styles.row}><Icon name="pulse-outline" /><Label style={{ fontWeight: '600' }}>Pricing providers</Label></View><Pill label="Not connected" /></View><Label muted style={{ marginTop: 10 }}>Unavailable prices stay unknown. No paid integrations are enabled.</Label></Surface>
    </View></View>
    <Surface style={{ gap: 12 }}><Eyebrow>FOUNDATION, WITH INTENTION</Eyebrow><Label muted>Species, printings, variants, and physical copies have independent identities. Catalog synchronization cannot remove personal copies.</Label><Label muted>Scanning, real collection editing, persistent storage, and live synchronization are future work.</Label></Surface>
  </Screen>;
}
