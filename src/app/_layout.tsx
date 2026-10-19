import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PreviewProvider } from '../state/preview';
import { colors } from '../theme/tokens';

export default function RootLayout() {
  return <PreviewProvider><StatusBar style="light" /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}><Stack.Screen name="(tabs)" /></Stack></PreviewProvider>;
}
