import { useSyncExternalStore } from 'react';
import { useWindowDimensions } from 'react-native';

const subscribe = () => () => undefined;
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** Also gates font-backed icons whose cached client state differs from static HTML. */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}

/** Hydration uses the server snapshot first; native renders use actual dimensions immediately. */
export function useResponsiveWidth(): number {
  const { width } = useWindowDimensions();
  const hydrated = useHydrated();
  return hydrated ? width : 390;
}
