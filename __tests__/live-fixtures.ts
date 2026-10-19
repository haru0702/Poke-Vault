import { VaultStore, type KeyValueStorage } from '../src/storage/vault';
import { TCGdexProvider } from '../src/providers/tcgdex';
import type { CatalogSet, CatalogEra } from '../src/domain/live';
import { internalId } from '../src/domain/identity';
import rawCard from '../docs/audit-evidence/v2__en__cards__base1-4.json';

export function memoryStorage(): KeyValueStorage & { data: Map<string, string>; failWrites: boolean } {
  return { data: new Map(), failWrites: false,
    async getItem(key) { return this.data.get(key) ?? null; },
    async setItem(key, value) { if (this.failWrites) throw new Error('Storage full'); this.data.set(key, value); },
  };
}
export function uuidFactory() { let n = 0; return () => `12345678-1234-4000-8000-${(++n).toString(16).padStart(12, '0')}`; }
export const era: CatalogEra = { id: internalId('era', '12345678-1234-4000-8000-000000000100'), externalId: 'base', name: 'Base' };
export const set: CatalogSet = { id: internalId('set', '12345678-1234-4000-8000-000000000200'), releaseId: internalId('release', '12345678-1234-4000-8000-000000000300'), externalId: 'base1', name: 'Base Set', eraId: era.id, language: 'en', providerTotal: 102 };
export async function cardFixture() {
  const store = new VaultStore(memoryStorage(), uuidFactory());
  return new TCGdexProvider(store).normalize(rawCard, 'en', set, [era]);
}
export function response(data: unknown, status = 200): Response { return { ok: status >= 200 && status < 300, status, json: async () => data } as Response; }
export { rawCard };
