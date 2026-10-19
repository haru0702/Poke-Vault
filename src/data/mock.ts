/** Entirely synthetic preview fixtures. Not an official checklist, ownership record or price feed. */
import { internalId } from '../domain/identity';
import type { CatalogSnapshot, Era, Language, OwnedCopy, Printing, Provenance } from '../domain/models';

const fixtureId = <K extends string>(kind: K, n: number) => internalId(kind, `00000000-0000-4000-8000-${n.toString(16).padStart(12, '0')}`);
export const mockProvenance: Provenance = { mode: 'mock', source: 'PokéVault synthetic preview fixtures', observedAt: '2026-10-19T00:00:00Z' };

const languageNames = [
  ['en', 'English', 'English'], ['ja', 'Japanese', '日本語'], ['ko', 'Korean', '한국어'],
  ['zh-Hans', 'Simplified Chinese', '简体中文'], ['zh-Hant', 'Traditional Chinese', '繁體中文'],
  ['th', 'Thai', 'ไทย'], ['id', 'Indonesian', 'Bahasa Indonesia'], ['fr', 'French', 'Français'],
  ['de', 'German', 'Deutsch'], ['it', 'Italian', 'Italiano'], ['es-ES', 'European Spanish', 'Español'],
  ['es-419', 'Latin American Spanish', 'Español latinoamericano'], ['pt-BR', 'Brazilian Portuguese', 'Português brasileiro'],
  ['pt-PT', 'European Portuguese', 'Português europeu'], ['nl', 'Dutch', 'Nederlands'],
  ['pl', 'Polish', 'Polski'], ['ru', 'Russian', 'Русский'],
] as const;
export const previewLanguages: readonly Language[] = languageNames.map(([tag, name, nativeName], n) => ({ id: fixtureId('language', 100 + n), tag, name, nativeName }));

/** Extensible structural vocabulary, not a statement that each era/language has catalog records. */
const eraNames: readonly [string, Era['scope']][] = [
  ['Original PMCG', 'japanese'], ['Base', 'international'], ['Gym', 'international'], ['Neo', 'international'],
  ['Legendary Collection', 'international'], ['VS', 'japanese'], ['web', 'japanese'], ['E-Card / e', 'international'],
  ['EX', 'international'], ['ADV', 'japanese'], ['PCG', 'japanese'], ['Diamond & Pearl / DP', 'international'],
  ['Platinum / DPt', 'international'], ['HeartGold & SoulSilver', 'international'], ['LEGEND', 'japanese'],
  ['Call of Legends', 'international'], ['Black & White / BW', 'international'], ['XY', 'international'],
  ['XY BREAK', 'japanese'], ['Sun & Moon', 'international'], ['Sword & Shield', 'international'],
  ['Scarlet & Violet', 'international'], ['Mega Evolution / MEGA', 'international'], ['Promotional / regional', 'cross-era'],
  ['POP', 'cross-era'], ['Trainer kits', 'cross-era'], ["McDonald's", 'cross-era'], ['Miscellaneous', 'cross-era'],
];
export const previewEras: readonly Era[] = eraNames.map(([name, scope], n) => ({ id: fixtureId('era', 200 + n), name, scope, period: { start: null, end: null, certainty: 'unknown' } }));
const language = (tag: string) => {
  const value = previewLanguages.find((item) => item.tag === tag);
  if (!value) throw new Error('Unknown preview language');
  return value.id;
};
const era = (name: string) => {
  const value = previewEras.find((item) => item.name === name);
  if (!value) throw new Error('Unknown preview era');
  return value.id;
};
const speciesData = [
  [6, 'Charizard', 'リザードン', 'Fire'], [25, 'Pikachu', 'ピカチュウ', 'Electric'],
  [133, 'Eevee', 'イーブイ', 'Normal'], [1, 'Bulbasaur', 'フシギダネ', 'Grass'],
  [94, 'Gengar', 'ゲンガー', 'Ghost'], [249, 'Lugia', 'ルギア', 'Psychic'],
] as const;
export const previewSpecies = speciesData.map(([number, en, ja, element], n) => ({
  id: fixtureId('species', 300 + n), nationalDexNumber: number, names: { en, ja }, element,
}));
const releaseSeeds = [
  ['Kanto study', 'en', 'Base', 'expansion', 'partial'],
  ['Johto notes', 'ja', 'LEGEND', 'expansion', 'unverified'],
  ['Regional sampler', 'zh-Hant', 'Scarlet & Violet', 'special', 'partial'],
  ['Promo archive', 'ja', 'Promotional / regional', 'promo', 'missing'],
] as const;
const previewSets = releaseSeeds.map(([name, , , kind], n) => ({
  id: fixtureId('set', 400 + n), names: { en: `${name} · preview` }, domain: 'physical' as const, kind, provenance: mockProvenance,
}));
const releases = releaseSeeds.map(([, tag, eraName, , status], n) => ({
  id: fixtureId('release', 500 + n), setId: fixtureId('set', 400 + n), eraIds: [era(eraName)],
  languageId: language(tag), marketIds: [], releaseDate: null, status: 'unverified' as const,
  coverage: { status, retrievedPrintings: status === 'missing' ? 0 : null, expected: null,
    note: 'Synthetic preview state. Official checklist and variants have not been verified.' }, provenance: mockProvenance,
}));
const printingSeeds: readonly [string, number, number[], string | null][] = [
  ['Charizard', 0, [0], '004'], ['Pikachu', 0, [1], '025'], ['Eevee', 0, [2], '133'],
  ['フシギダネ', 1, [3], '001'], ['ゲンガー', 1, [4], '094'], ['洛奇亞', 2, [5], '249'],
  ['Pikachu & Eevee', 2, [1, 2], 'TG01'], ['Research notes', 0, [], null],
];
export const previewPrintings: readonly Printing[] = printingSeeds.map(([name, releaseIndex, speciesIndexes, collectorNumber], n) => ({
  id: fixtureId('printing', 600 + n), releaseId: fixtureId('release', 500 + releaseIndex), designId: fixtureId('design', 700 + n),
  nativeName: name, displayNames: { en: n < speciesData.length ? speciesData[n]![1] : name },
  collectorNumber, speciesIds: speciesIndexes.map((index) => fixtureId('species', 300 + index)),
  status: n === 7 ? 'unverified' : 'partial', provenance: mockProvenance,
}));
const previewVariants = previewPrintings.slice(0, 3).map((printing, n) => ({
  id: fixtureId('variant', 800 + n), printingId: printing.id, identityStatus: 'provisional' as const,
  attributes: { finish: [n === 0 ? 'holo' : 'normal'] }, provenance: mockProvenance,
}));
export const mockCatalog: CatalogSnapshot = {
  species: previewSpecies, languages: previewLanguages, eras: previewEras, markets: [], sets: previewSets, releases,
  designs: previewPrintings.map((printing, n) => ({ id: fixtureId('design', 700 + n), category: n === 7 ? 'trainer' : 'pokemon', artworkId: null })),
  printings: previewPrintings, variants: previewVariants, mappings: [],
};
export const mockCopies: readonly OwnedCopy[] = [0, 0, 1, 3, 5, -1].map((printingIndex, n) => ({
  id: fixtureId('copy', 900 + n), label: n === 5 ? 'A card waiting to be identified' : 'Preview collection copy',
  identification: printingIndex < 0
    ? { status: 'unidentified' as const, printingId: null, variantId: null }
    : printingIndex < 2
      ? { status: 'identified' as const, printingId: fixtureId('printing', 600 + printingIndex), variantId: fixtureId('variant', 800 + printingIndex) }
      : { status: 'printing-only' as const, printingId: fixtureId('printing', 600 + printingIndex), variantId: null },
  condition: n === 1 ? 'lightly-played' as const : null,
  grade: null, acquisition: { date: `2026-10-${String(10 + n).padStart(2, '0')}`, cost: null },
  location: n === 5 ? null : 'Preview binder', provenance: mockProvenance,
}));
export function getPrintingContext(printing: Printing) {
  const release = releases.find((item) => item.id === printing.releaseId)!;
  const set = previewSets.find((item) => item.id === release.setId)!;
  const lang = previewLanguages.find((item) => item.id === release.languageId)!;
  const species = previewSpecies.find((item) => printing.speciesIds.includes(item.id));
  return { release, set, language: lang, element: species?.element ?? 'Trainer' };
}
