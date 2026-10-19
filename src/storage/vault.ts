import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto';
import { internalId, type Id } from '../domain/identity';
import type { CatalogCard, SavedCopy } from '../domain/live';
import type { OwnedCopy } from '../domain/models';

export interface KeyValueStorage { getItem(key: string): Promise<string | null>; setItem(key: string, value: string): Promise<void> }
interface VaultData { version: 1; identities: Record<string, string>; copies: SavedCopy[] }
const KEY = 'pokevault:user-vault:v1';
const IDENTITIES_KEY = 'pokevault:catalog-identities:v1';
const empty = (): VaultData => ({ version: 1, identities: {}, copies: [] });
const conditions = new Set(['near-mint', 'lightly-played', 'played', 'damaged']);
function validateSaved(item: SavedCopy): void {
  if (!item || !item.copy || !item.card) throw new Error('Invalid saved collection record');
  internalId('copy', item.copy.id); internalId('printing', item.card.id);
  const identity = item.copy.identification;
  if (identity.printingId !== item.card.id || !['printing-only', 'identified'].includes(identity.status)) throw new Error('Copy printing mismatch');
  if (identity.status === 'identified' && !item.card.variants.some(v => v.id === identity.variantId && v.printingId === item.card.id)) throw new Error('Variant does not belong to printing');
  if (identity.status === 'printing-only' && identity.variantId !== null) throw new Error('Unknown variant must stay unknown');
  if (item.copy.condition !== null && !conditions.has(item.copy.condition)) throw new Error('Invalid condition');
  if (item.card.provenance.mode === 'mock' || item.copy.provenance.mode === 'mock') throw new Error('Mock records cannot enter the real collection');
}
/** Serialized local transactions; only user operations can alter copies. Failures never replace storage with an empty vault. */
export class VaultStore {
  private queue: Promise<unknown> = Promise.resolve();
  private identityQueue: Promise<unknown> = Promise.resolve();
  constructor(private readonly storage: KeyValueStorage, private readonly uuid: () => string = randomUUID) {}
  private transaction<T>(operation: (data: VaultData) => Promise<T>): Promise<T> {
    const result = this.queue.then(async () => {
      const raw = await this.storage.getItem(KEY);
      let data = empty();
      if (raw !== null) {
        try {
          data = JSON.parse(raw) as VaultData;
          if (data.version !== 1 || !data.identities || typeof data.identities !== 'object' || Array.isArray(data.identities) || !Array.isArray(data.copies)) throw new Error();
          data.copies.forEach(validateSaved);
          if (new Set(data.copies.map(item => item.copy.id)).size !== data.copies.length) throw new Error();
        } catch { throw new Error('Local vault is unreadable or has an unsupported version. Existing data was preserved.'); }
      }
      return operation(data);
    });
    this.queue = result.catch(() => undefined);
    return result;
  }
  /** Persist random canonical identities before exposing a catalog entity; never derive UUIDs from provider keys. */
  identity<K extends string>(kind: K, externalKey: string): Promise<Id<K>> {
    const result = this.identityQueue.then(async () => {
      const raw = await this.storage.getItem(IDENTITIES_KEY);
      // Read the older combined document only to retain previously allocated IDs.
      // Catalog operations never write the personal-copy document.
      const legacy = raw === null ? await this.storage.getItem(KEY) : null;
      let identities: Record<string, string> = {};
      if (raw !== null || legacy !== null) {
        try {
          const parsed = JSON.parse(raw ?? legacy!) as VaultData;
          if (parsed.version !== 1 || !parsed.identities || typeof parsed.identities !== 'object' || Array.isArray(parsed.identities)) throw new Error();
          identities = { ...parsed.identities };
        } catch { throw new Error('Local identity registry is unreadable or has an unsupported version. Existing data was preserved.'); }
      }
      const key = JSON.stringify([kind, externalKey]);
      const value = internalId(kind, identities[key] ?? this.uuid());
      if (!identities[key] || raw === null) {
        identities[key] = value;
        await this.storage.setItem(IDENTITIES_KEY, JSON.stringify({ version: 1, identities }));
      }
      return value;
    });
    this.identityQueue = result.catch(() => undefined);
    return result;
  }

  list(): Promise<readonly SavedCopy[]> { return this.transaction(async data => data.copies); }
  add(card: CatalogCard, variantId: Id<'variant'> | null, condition: OwnedCopy['condition'], allowAdditionalCopy = false): Promise<SavedCopy> {
    return this.transaction(async data => {
      const identification: OwnedCopy['identification'] = variantId ? { status: 'identified', printingId: card.id, variantId } : { status: 'printing-only', printingId: card.id, variantId: null };
      const record: SavedCopy = { card, copy: {
        id: internalId('copy', this.uuid()), label: card.name, identification, condition, grade: null,
        acquisition: { date: null, cost: null }, location: null,
        provenance: { mode: 'curated', source: 'User collection entry', observedAt: new Date().toISOString() },
      } };
      validateSaved(record);
      if (!allowAdditionalCopy && data.copies.some(item => item.card.id === card.id && item.copy.identification.variantId === variantId && item.copy.condition === condition)) {
        throw new Error('A matching copy is already saved. Choose “Add another physical copy” intentionally.');
      }
      data.copies.push(record);
      await this.storage.setItem(KEY, JSON.stringify(data));
      return record;
    });
  }
  edit(id: Id<'copy'>, variantId: Id<'variant'> | null, condition: OwnedCopy['condition']): Promise<void> {
    return this.transaction(async data => {
      const record = data.copies.find(item => item.copy.id === id);
      if (!record) throw new Error('Copy no longer exists');
      const copy: OwnedCopy = { ...record.copy, condition, identification: variantId ? { status: 'identified', printingId: record.card.id, variantId } : { status: 'printing-only', printingId: record.card.id, variantId: null } };
      const next = { ...record, copy }; validateSaved(next);
      data.copies = data.copies.map(item => item.copy.id === id ? next : item);
      await this.storage.setItem(KEY, JSON.stringify(data));
    });
  }
  remove(id: Id<'copy'>): Promise<void> {
    return this.transaction(async data => {
      data.copies = data.copies.filter(item => item.copy.id !== id);
      await this.storage.setItem(KEY, JSON.stringify(data));
    });
  }
}
export const vault = new VaultStore(AsyncStorage);
