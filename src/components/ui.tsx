import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, type Href } from 'expo-router';
import Head from 'expo-router/head';
import type { ComponentProps, PropsWithChildren } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, type ColorValue, type StyleProp, type TextProps, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, elementColors, radii } from '../theme/tokens';
import { useHydrated, useResponsiveWidth } from '../theme/useResponsiveWidth';
import type { CoverageStatus, Printing } from '../domain/models';
import { getPrintingContext } from '../data/mock';
import { usePreview } from '../state/preview';

export type IconName = ComponentProps<typeof Ionicons>['name'];
export function Icon({ name, size = 20, color = colors.muted }: { name: IconName; size?: number; color?: ColorValue }) {
  const hydrated = useHydrated();
  if (!hydrated) return <View aria-hidden style={{ width: size, height: size }} />;
  return <Ionicons name={name} size={size} color={color} accessible={false} aria-hidden importantForAccessibility="no-hide-descendants" />;
}
export function Label({ children, muted = false, style, ...props }: TextProps & { muted?: boolean }) {
  return <Text {...props} style={[styles.body, muted && { color: colors.muted }, style]}>{children}</Text>;
}
export function Eyebrow({ children }: PropsWithChildren) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}
export function Pill({ label, tone = 'muted' }: { label: string; tone?: 'accent' | 'gold' | 'muted' | 'purple' }) {
  const foreground = tone === 'accent' ? colors.accent : tone === 'gold' ? colors.gold : tone === 'purple' ? colors.purple : colors.muted;
  return <View style={[styles.pill, { backgroundColor: tone === 'accent' ? colors.accentDark : tone === 'gold' ? colors.goldDark : tone === 'purple' ? colors.purpleDark : colors.elevated }]}><Text style={{ fontSize: 11, lineHeight: 16, fontWeight: '600', color: foreground }}>{label}</Text></View>;
}
export function CoveragePill({ status }: { status: CoverageStatus }) {
  const text = status === 'verified-complete' ? 'Verified complete' : status.charAt(0).toUpperCase() + status.slice(1).replaceAll('-', ' ');
  return <Pill label={text} tone={status === 'partial' ? 'gold' : status === 'missing' ? 'purple' : status === 'verified-complete' ? 'accent' : 'muted'} />;
}
export function Surface({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.surface, style]}>{children}</View>;
}
export function SectionHeader({ title, aside }: { title: string; aside?: string }) {
  return <View style={styles.sectionHeader}><Text accessibilityRole="header" style={styles.sectionTitle}>{title}</Text>{aside ? <Label muted style={{ fontSize: 12 }}>{aside}</Label> : null}</View>;
}
export function Button({ label, icon, onPress, secondary = false, href }: { label: string; icon?: IconName; onPress?: () => void; secondary?: boolean; href?: Href }) {
  const router = useRouter();
  return <Pressable accessibilityRole="button" onPress={href ? () => router.push(href) : onPress} style={({ pressed }) => [styles.button, secondary && styles.secondaryButton, pressed && { opacity: 0.7 }]}>
    <Text style={[styles.buttonText, secondary && { color: colors.text }]}>{label}</Text>{icon ? <Icon name={icon} size={17} color={secondary ? colors.text : colors.background} /> : null}
  </Pressable>;
}
export function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={({ pressed }) => [styles.chip, selected && styles.selectedChip, pressed && { opacity: 0.7 }]}><Text style={{ color: selected ? colors.accent : colors.muted, fontWeight: '600', fontSize: 12 }}>{label}</Text></Pressable>;
}
export function Metric({ label, value, caption, icon }: { label: string; value: string; caption: string; icon: IconName }) {
  return <Surface style={{ flex: 1, minWidth: 145, padding: 18 }}><View style={styles.rowBetween}><Label muted style={{ fontSize: 12 }}>{label}</Label><Icon name={icon} size={17} color={colors.subtle} /></View><Text style={styles.metric}>{value}</Text><Label muted style={{ fontSize: 11 }}>{caption}</Label></Surface>;
}
export function Screen({ title, subtitle, children, mode = 'mock' }: PropsWithChildren<{ title: string; subtitle: string; mode?: 'mock' | 'live' }>) {
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
    <Head><title>{`PokéVault · ${title}`}</title><meta name="description" content="PokéVault personal collection. Catalog coverage is unverified." /></Head>
    <View style={styles.container}>
        <View style={styles.brandRow}>
          <View style={styles.brand}><View style={styles.brandIcon}><Icon name="albums-outline" size={18} color={colors.accent} /></View><Text style={styles.brandText}>PokéVault</Text></View>
          <View style={styles.preview}><View style={styles.statusDot} /><Text style={styles.previewText}>{mode === 'mock' ? 'MOCK DATA' : 'LIVE CATALOG'}</Text></View>
        </View>
        <View style={styles.mockNotice}><Icon name="flask-outline" size={15} color={colors.accent} /><Label style={styles.mockNoticeText}>{mode === 'mock' ? 'Offline preview · synthetic cards and copies · no live prices' : 'TCGdex catalog · local collection · coverage unverified · no pricing'}</Label></View>
    </View>
    <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.pageHeading}><Text accessibilityRole="header" style={styles.pageTitle}>{title}</Text><Label muted>{subtitle}</Label></View>
        <View style={styles.sections}>{children}</View>
        <View style={styles.footer}><View style={styles.footerLine} /><Label muted style={{ fontSize: 11, textAlign: 'center' }}>A personal space for your collection. Catalog coverage is still being verified.</Label></View>
      </View>
    </ScrollView>
  </SafeAreaView>;
}
export function EmptyState({ title, description, icon = 'search-outline' }: { title: string; description: string; icon?: IconName }) {
  return <Surface style={{ alignItems: 'center', padding: 32, gap: 12 }}><Icon name={icon} size={28} color={colors.accent} /><Label style={{ fontWeight: '600', textAlign: 'center' }}>{title}</Label><Label muted style={{ textAlign: 'center', maxWidth: 370 }}>{description}</Label></Surface>;
}
export function CardArt({ number, element, small = false }: { number: string; element: string; small?: boolean }) {
  const palette = elementColors[element] ?? elementColors.Trainer!;
  return <View accessibilityLabel={`${element} abstract preview artwork`} style={[styles.art, { backgroundColor: palette.background }, small && { width: 52, height: 68, minHeight: 68, flex: 0, borderRadius: 8 }]}>
    <View style={[styles.artOrbit, small && { width: 42, height: 42 }, { borderColor: palette.foreground }]} />
    <View style={[styles.artOrbit, { borderColor: palette.foreground, transform: [{ rotate: '65deg' }, { scale: 0.7 }] }, small && { width: 42, height: 42 }]} />
    <Text style={[styles.artNumber, { color: palette.foreground }, small && { fontSize: 12 }]}>{number}</Text>
    {!small ? <Text style={[styles.artCaption, { color: palette.foreground }]}>PREVIEW ART</Text> : null}
  </View>;
}
export function PrintingCard({ printing }: { printing: Printing }) {
  const { language, set, element } = getPrintingContext(printing);
  const { showCatalogNotes } = usePreview();
  return <Surface style={{ padding: 12, gap: 10, flex: 1 }}>
    <View style={{ minHeight: 154, borderRadius: 12, overflow: 'hidden' }}><CardArt number={printing.collectorNumber ?? '—'} element={element} /></View>
    <View style={{ gap: 5 }}><Label style={{ fontWeight: '600', fontSize: 15 }}>{printing.nativeName}</Label><Label muted numberOfLines={1} style={{ fontSize: 11 }}>{set.names.en}</Label></View>
    <View style={styles.rowBetween}><Pill label={language.tag} /><Label muted style={{ fontSize: 11 }}>#{printing.collectorNumber ?? 'unnumbered'}</Label></View>
    {showCatalogNotes ? <View style={styles.rowBetween}><Label muted style={{ fontSize: 10 }}>Mock printing</Label><CoveragePill status={printing.status} /></View> : null}
  </Surface>;
}
export function ResponsiveGrid({ children, columns = 2 }: PropsWithChildren<{ columns?: number }>) {
  const width = useResponsiveWidth();
  const actualColumns = width >= 1000 ? columns : width >= 700 ? Math.min(columns, 2) : columns > 2 ? 2 : 1;
  const items = Array.isArray(children) ? children : [children];
  return <View style={styles.grid}>{items.map((child, i) => <View key={i} style={{ width: `${100 / actualColumns}%`, padding: 6 }}>{child}</View>)}</View>;
}
export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, paddingBottom: 30 },
  container: { width: '100%', maxWidth: 1160, alignSelf: 'center', paddingHorizontal: 20 },
  brandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 21, borderBottomWidth: 1, borderBottomColor: colors.border, gap: 12 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9 }, brandIcon: { padding: 8, backgroundColor: colors.accentDark, borderRadius: 11 },
  brandText: { color: colors.text, fontWeight: '700', fontSize: 19, letterSpacing: -0.6 },
  preview: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.elevated, paddingHorizontal: 10, paddingVertical: 7, borderRadius: radii.pill },
  statusDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.accent },
  previewText: { color: colors.accent, fontSize: 9, fontWeight: '700', letterSpacing: 1.2 },
  pageHeading: { paddingTop: 28, paddingBottom: 18, gap: 7 },
  pageTitle: { color: colors.text, fontSize: 30, fontWeight: '600', letterSpacing: -1 },
  body: { color: colors.text, fontSize: 13, lineHeight: 20 },
  mockNotice: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 10 },
  mockNoticeText: { color: colors.muted, fontSize: 11, lineHeight: 17, flex: 1 },
  eyebrow: { color: colors.accent, fontWeight: '600', letterSpacing: 1.8, fontSize: 10, lineHeight: 16 },
  surface: { backgroundColor: colors.surface, padding: 20, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border },
  pill: { alignSelf: 'flex-start', paddingHorizontal: 9, paddingVertical: 4, borderRadius: radii.pill },
  sectionHeader: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '600', letterSpacing: -0.4 },
  button: { backgroundColor: colors.accent, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingHorizontal: 17, minHeight: 46, paddingVertical: 12, borderRadius: 12, alignSelf: 'flex-start' },
  secondaryButton: { backgroundColor: colors.elevated, borderWidth: 1, borderColor: colors.border },
  buttonText: { color: colors.background, fontSize: 12, fontWeight: '700' },
  chip: { minHeight: 44, paddingHorizontal: 15, paddingVertical: 12, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border, justifyContent: 'center' },
  selectedChip: { backgroundColor: colors.accentDark, borderColor: '#6B8D58' },
  metric: { color: colors.text, fontWeight: '500', fontSize: 32, letterSpacing: -1, marginTop: 12, marginBottom: 5 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowBetween: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  sections: { gap: 26 }, grid: { flexDirection: 'row', flexWrap: 'wrap', margin: -6 },
  footer: { gap: 14, paddingTop: 35 }, footerLine: { height: 1, backgroundColor: colors.border },
  art: { flex: 1, width: '100%', minHeight: 154, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: 10 },
  artOrbit: { width: 95, height: 95, borderWidth: 1, opacity: 0.3, borderRadius: 100, transform: [{ rotate: '-25deg' }, { scaleX: 1.5 }], position: 'absolute' },
  artNumber: { fontSize: 36, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, serif' }), letterSpacing: 2 },
  artCaption: { position: 'absolute', bottom: 12, fontSize: 7, letterSpacing: 2.5, opacity: 0.75 },
});
