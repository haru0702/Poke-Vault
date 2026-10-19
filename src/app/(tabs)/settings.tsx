import { Label, Pill, Screen, SectionHeader, Surface, styles } from '../../components/ui';
import { View } from 'react-native';
export default function SettingsScreen() {
  return <Screen mode="live" title="Settings" subtitle="Your catalog and collection, with clear boundaries.">
    <SectionHeader title="Data sources" /><Surface><View style={styles.rowBetween}><Label style={{ fontWeight: '700' }}>TCGdex card catalog</Label><Pill label="Live requests" tone="accent" /></View><Label muted>Public catalog endpoints supply eras, sets, metadata and artwork. Coverage varies by language and release. No mock fallback is used. Catalog availability and variant completeness are unverified.</Label></Surface>
    <Surface><Label style={{ fontWeight: '700' }}>Local collection</Label><Label muted>Your physical copies and provider-independent identity mappings are stored on this device. Clearing browser/site data, uninstalling the app or removing its app data may remove them. There is no cloud sync or export/backup feature in Sprint 1.</Label></Surface>
    <Surface><Label style={{ fontWeight: '700' }}>Dark appearance</Label><Label muted>Shared dark colors and the five-tab navigation are retained. The fixed data-source notice stays visible.</Label></Surface>
    <Surface><Label style={{ fontWeight: '700' }}>Not connected</Label><Label muted>No account integration, scanner, paid provider, market pricing or price tracking runs in this application. Your GitHub development account is separate from the app.</Label></Surface>
    <Label muted>PokéVault Sprint 1 · Full catalog completeness remains NO-GO. Additional language records and variants require independent reconciliation. Review this sprint before starting Sprint 2.</Label>
  </Screen>;
}
