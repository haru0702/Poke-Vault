import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { VaultProvider } from '../state/vault';
import { colors } from '../theme/tokens';

export default function RootLayout() {
  return <VaultProvider><StatusBar style="light" /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}><Stack.Screen name="(tabs)" /></Stack></VaultProvider>;
}
