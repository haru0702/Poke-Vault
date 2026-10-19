import { createContext, useCallback, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { vault } from '../storage/vault';
import type { CatalogCard, SavedCopy } from '../domain/live';
import type { Id } from '../domain/identity';
import type { OwnedCopy } from '../domain/models';

function useVaultState() {
  const [copies, setCopies] = useState<readonly SavedCopy[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reload = useCallback(async () => {
    try { const saved = await vault.list(); setCopies(saved); setReady(true); setError(null); }
    catch (e) { setReady(false); setError(e instanceof Error ? e.message : 'Local storage unavailable'); }
  }, []);
  useEffect(() => {
    let active = true;
    void vault.list().then(saved => {
      if (active) { setCopies(saved); setReady(true); setError(null); }
    }).catch(e => {
      if (active) { setReady(false); setError(e instanceof Error ? e.message : 'Local storage unavailable'); }
    });
    return () => { active = false; };
  }, []);
  async function mutate(operation: () => Promise<unknown>) {
    if (!ready) throw new Error('Local storage is not ready. Resolve the storage error before editing.');
    await operation(); setCopies(await vault.list());
  }
  return { copies, ready, error, reload,
    add: (card: CatalogCard, variant: Id<'variant'> | null, condition: OwnedCopy['condition'], additional: boolean) => mutate(() => vault.add(card, variant, condition, additional)),
    edit: (id: Id<'copy'>, variant: Id<'variant'> | null, condition: OwnedCopy['condition']) => mutate(() => vault.edit(id, variant, condition)),
    remove: (id: Id<'copy'>) => mutate(() => vault.remove(id)),
  };
}
const VaultContext = createContext<ReturnType<typeof useVaultState> | null>(null);
export function VaultProvider({ children }: PropsWithChildren) { return <VaultContext.Provider value={useVaultState()}>{children}</VaultContext.Provider>; }
export function useVault() { const context = useContext(VaultContext); if (!context) throw new Error('VaultProvider is required'); return context; }
