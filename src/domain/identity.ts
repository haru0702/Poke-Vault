/** Canonical IDs are UUIDs allocated by PokéVault, never derived from provider keys. */
declare const entityBrand: unique symbol;
export type Id<Kind extends string> = string & { readonly [entityBrand]: Kind };

export function internalId<Kind extends string>(kind: Kind, value: string): Id<Kind> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
    throw new Error(`Invalid internal ${kind} UUID`);
  }
  return value as Id<Kind>;
}

/** Parent scope matters: upstream variant IDs can repeat across different cards. */
export function externalIdentityKey(ref: {
  provider: string; entity: string; externalId: string; locale: string;
  domain: 'physical' | 'digital'; parentExternalId?: string;
}): string {
  return JSON.stringify([ref.provider, ref.entity, ref.externalId, ref.locale, ref.domain, ref.parentExternalId ?? null]);
}
