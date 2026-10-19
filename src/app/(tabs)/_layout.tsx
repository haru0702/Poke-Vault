import { Tabs } from 'expo-router';
import { useResponsiveWidth } from '../../theme/useResponsiveWidth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, type IconName } from '../../components/ui';
import { colors } from '../../theme/tokens';

const tabs: readonly { name: string; title: string; icon: IconName; active: IconName }[] = [
  { name: 'index', title: 'Dashboard', icon: 'grid-outline', active: 'grid' },
  { name: 'pokedex', title: 'Pokédex', icon: 'layers-outline', active: 'layers' },
  { name: 'collection', title: 'Collection', icon: 'albums-outline', active: 'albums' },
  { name: 'portfolio', title: 'Portfolio', icon: 'pie-chart-outline', active: 'pie-chart' },
  { name: 'settings', title: 'Settings', icon: 'options-outline', active: 'options' },
];
export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const width = useResponsiveWidth();
  return <Tabs screenOptions={{
    headerShown: false, sceneStyle: { backgroundColor: colors.background }, tabBarActiveTintColor: colors.accent,
    tabBarInactiveTintColor: colors.subtle, tabBarHideOnKeyboard: true,
    tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, height: 66 + insets.bottom, paddingTop: 8, paddingBottom: Math.max(insets.bottom, 8) },
    tabBarLabelStyle: { fontSize: width < 360 ? 9 : 10, fontWeight: '600' }, tabBarItemStyle: { paddingHorizontal: 0 },
  }}>{tabs.map((tab) => <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title, tabBarAccessibilityLabel: `${tab.title} tab`, tabBarIcon: ({ focused, color }) => <Icon name={focused ? tab.active : tab.icon} size={21} color={color} /> }} />)}</Tabs>;
}
