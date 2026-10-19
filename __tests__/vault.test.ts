import { describe, expect, it } from '@jest/globals';
import { VaultStore } from '../src/storage/vault';
import { cardFixture, memoryStorage, uuidFactory } from './live-fixtures';

describe('persistent personal collection boundary', () => {
  it('persists add/edit/remove across new store instances and keeps snapshots offline', async () => {
    const storage = memoryStorage(); const uuid = uuidFactory(); const store = new VaultStore(storage, uuid);
    const card = await cardFixture();
    const added = await store.add(card, null, null);
    const restarted = new VaultStore(storage, uuid);
    expect((await restarted.list())[0]!.card.name).toBe(card.name);
    expect(added.copy.identification.status).toBe('printing-only');
    await restarted.edit(added.copy.id, card.variants[0]!.id, 'lightly-played');
    const edited = (await store.list())[0]!;
    expect(edited.copy.id).toBe(added.copy.id); expect(edited.copy.condition).toBe('lightly-played');
    expect(edited.copy.identification.variantId).toBe(card.variants[0]!.id);
    await restarted.remove(added.copy.id); expect(await store.list()).toEqual([]);
    expect(card.variants).toHaveLength(4);
  });
  it('prevents duplicate submissions unless another physical copy is intentional', async () => {
    const store = new VaultStore(memoryStorage(), uuidFactory()); const card = await cardFixture();
    await store.add(card, null, null);
    await expect(store.add(card, null, null)).rejects.toThrow('already saved');
    const extra = await store.add(card, null, null, true);
    await store.add(card, card.variants[0]!.id, 'near-mint');
    const copies = await store.list(); expect(copies).toHaveLength(3);
    expect(new Set(copies.map(c => c.copy.id)).size).toBe(3);
    expect(extra.card.id).toBe(card.id);
  });
  it('serializes concurrent adds to prevent accidental duplicates', async () => {
    const store = new VaultStore(memoryStorage(), uuidFactory()); const card = await cardFixture();
    const results = await Promise.allSettled([store.add(card, null, null), store.add(card, null, null)]);
    expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1); expect(await store.list()).toHaveLength(1);
  });
  it('rejects a wrong-parent variant and synthetic collection records', async () => {
    const store = new VaultStore(memoryStorage(), uuidFactory()); const card = await cardFixture();
    await expect(store.add({ ...card, variants: [] }, card.variants[0]!.id, null)).rejects.toThrow('Variant does not belong');
    await expect(store.add({ ...card, provenance: { ...card.provenance, mode: 'mock' } }, null, null)).rejects.toThrow('Mock records');
    expect(await store.list()).toEqual([]);
  });
  it('keeps copies intact during identity registration and provider changes', async () => {
    const store = new VaultStore(memoryStorage(), uuidFactory()); const card = await cardFixture();
    await store.add(card, null, null); const before = await store.list();
    await store.identity('printing', 'new unrelated provider mapping');
    expect(await store.list()).toEqual(before);
  });
  it('preserves corrupt or newer-version data without silently replacing it', async () => {
    const storage = memoryStorage(); storage.data.set('pokevault:user-vault:v1', '{broken');
    const store = new VaultStore(storage, uuidFactory());
    await expect(store.list()).rejects.toThrow('preserved');
    await expect(store.identity('printing', 'key')).rejects.toThrow('preserved');
    expect(storage.data.get('pokevault:user-vault:v1')).toBe('{broken');
  });
  it('does not acknowledge failed writes or lose existing copies', async () => {
    const storage = memoryStorage(); const store = new VaultStore(storage, uuidFactory()); const card = await cardFixture();
    const added = await store.add(card, null, null); storage.failWrites = true;
    await expect(store.remove(added.copy.id)).rejects.toThrow('Storage full');
    expect(await store.list()).toHaveLength(1);
    storage.failWrites = false; await store.remove(added.copy.id); expect(await store.list()).toEqual([]);
  });
});


describe('catalog identity storage isolation', () => {
  it('does not rewrite the personal-copy document during catalog registration', async () => {
    const storage = memoryStorage(); const store = new VaultStore(storage, uuidFactory());
    const card = await cardFixture(); await store.add(card, null, null);
    const before = storage.data.get('pokevault:user-vault:v1');
    await store.identity('printing', 'another-provider-card');
    expect(storage.data.get('pokevault:user-vault:v1')).toBe(before);
    expect(storage.data.has('pokevault:catalog-identities:v1')).toBe(true);
  });
  it('retains IDs allocated by the earlier combined storage format without touching copies', async () => {
    const storage = memoryStorage();
    const key = JSON.stringify(['printing', 'legacy-key']);
    const id = '12345678-1234-4000-8000-000000000001';
    const legacy = JSON.stringify({ version: 1, identities: { [key]: id }, copies: [] });
    storage.data.set('pokevault:user-vault:v1', legacy);
    const store = new VaultStore(storage, uuidFactory());
    expect(await store.identity('printing', 'legacy-key')).toBe(id);
    expect(storage.data.get('pokevault:user-vault:v1')).toBe(legacy);
  });
});
