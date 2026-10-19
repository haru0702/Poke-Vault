import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button, Eyebrow, Icon, Label, Metric, Pill, PrintingCard, ResponsiveGrid, Screen, SectionHeader, Surface, styles } from '../../components/ui';
import { usePreview } from '../../state/preview';
import { colors } from '../../theme/tokens';
import { useResponsiveWidth } from '../../theme/useResponsiveWidth';

export default function DashboardScreen() {
  const { catalog, copies } = usePreview();
  const wide = useResponsiveWidth() > 700;
  const languages = new Set(copies.flatMap((copy) => {
    const printing = catalog.printings.find((x) => x.id === copy.identification.printingId);
    const release = catalog.releases.find((x) => x.id === printing?.releaseId);
    return release ? [release.languageId] : [];
  }));
  return <Screen title="Dashboard" subtitle="Your collection, at a glance.">
    <View style={[local.hero, wide && { padding: 34, flexDirection: 'row' }]}>
      <View style={{ flex: 1, gap: 17, zIndex: 1 }}><Eyebrow>THE COLLECTOR’S COMPANION</Eyebrow><Text style={local.heroTitle}>Every card has{ '\n' }a place here.</Text><Label style={{ color: '#C0D0BB', maxWidth: 360, fontSize: 14, lineHeight: 23 }}>From the first discovery to the next favorite. Build a collection that tells your story.</Label><View style={[styles.row, { marginTop: 6, flexWrap: 'wrap' }]}><Button label="Explore Pokédex" href="/pokedex" icon="arrow-forward" /><Button label="My collection" href="/collection" secondary /></View></View>
      <View style={[local.heroArt, !wide && { alignSelf: 'flex-end', marginTop: -12 }]} accessible={false}>
        <View style={local.orbit} /><View style={[local.orbit, { width: 160, height: 160 }]} />
        <View style={[local.miniCard, { transform: [{ rotate: '-15deg' }], left: 28, top: 32, backgroundColor: '#B3C8A3' }]} />
        <View style={[local.miniCard, { transform: [{ rotate: '12deg' }], left: 76, top: 12 }]}><View style={local.miniCardWindow}><Icon name="sparkles-outline" size={38} color={colors.accent} /></View><View style={local.miniLine} /><View style={[local.miniLine, { width: 30, opacity: 0.3 }]} /></View>
        <View style={local.artLabel}><Icon name="shield-checkmark-outline" size={12} color={colors.accent} /><Text style={local.artLabelText}>YOUR PERSONAL VAULT</Text></View>
      </View>
    </View>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      <Metric label="Preview copies" value={String(copies.length)} caption="Synthetic collection" icon="albums-outline" />
      <Metric label="Catalog samples" value={String(catalog.printings.length)} caption="Mock printings only" icon="layers-outline" />
      <Metric label="Collection languages" value={String(languages.size)} caption="In this preview" icon="language-outline" />
      <Metric label="Market value" value="—" caption="No pricing connected" icon="pie-chart-outline" />
    </View>
    <View><SectionHeader title="Discover the details" aside="Preview highlights" /><ResponsiveGrid columns={4}>{catalog.printings.slice(0, 4).map((printing) => <PrintingCard key={printing.id} printing={printing} />)}</ResponsiveGrid></View>
    <Surface><View style={[styles.rowBetween, { flexWrap: 'wrap', gap: 16 }]}><View style={{ flex: 1, minWidth: 220, gap: 7 }}><View style={styles.row}><Icon name="compass-outline" color={colors.accent} /><Label style={{ fontWeight: '600', fontSize: 16 }}>A catalog with room to grow</Label></View><Label muted>Historical, regional, and promotional records are still being verified. Listed sets do not imply complete cards or variants.</Label></View><Pill label="Coverage unverified" tone="gold" /></View></Surface>
  </Screen>;
}
const local = StyleSheet.create({
  hero: { backgroundColor: '#213323', borderWidth: 1, borderColor: '#3D5137', borderRadius: 24, overflow: 'hidden', padding: 24, gap: 12 },
  heroTitle: { color: '#F0F3DF', fontSize: 43, lineHeight: 48, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, serif' }), letterSpacing: -1.5 },
  heroArt: { width: 220, height: 210, justifyContent: 'center', alignItems: 'center' },
  orbit: { position: 'absolute', width: 210, height: 210, borderRadius: 150, borderWidth: 1, borderColor: '#506548' },
  miniCard: { position: 'absolute', width: 112, height: 154, borderRadius: 12, backgroundColor: '#18251A', borderWidth: 4, borderColor: '#8C9F77', padding: 9, gap: 10 },
  miniCardWindow: { height: 88, backgroundColor: '#304732', borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  miniLine: { height: 3, width: 53, backgroundColor: '#A7BF8E', borderRadius: 2 },
  artLabel: { position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#18271C', padding: 9, borderRadius: 20 },
  artLabelText: { fontSize: 7, letterSpacing: 1.3, color: colors.accent, fontWeight: '600' },
});
