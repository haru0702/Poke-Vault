import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, renderRouter, screen, waitFor } from 'expo-router/testing-library';
import RootLayout from '../src/app/_layout';
import TabLayout from '../src/app/(tabs)/_layout';
import Dashboard from '../src/app/(tabs)/index';
import Pokedex from '../src/app/(tabs)/pokedex';
import Collection from '../src/app/(tabs)/collection';
import Portfolio from '../src/app/(tabs)/portfolio';
import Settings from '../src/app/(tabs)/settings';
import { liveCatalogProvider } from '../src/providers/tcgdex';
import { cardFixture, era, set } from './live-fixtures';

jest.mock('../src/providers/tcgdex', () => {
  const actual = jest.requireActual<typeof import('../src/providers/tcgdex')>('../src/providers/tcgdex');
  return { ...actual, liveCatalogProvider: { index: jest.fn(), search: jest.fn() } };
});
const provider = jest.mocked(liveCatalogProvider);
const routes = { _layout: RootLayout, '(tabs)/_layout': TabLayout, '(tabs)/index': Dashboard,
  '(tabs)/pokedex': Pokedex, '(tabs)/collection': Collection, '(tabs)/portfolio': Portfolio, '(tabs)/settings': Settings };
async function selectTab(label: string) {
  fireEvent.press(screen.getByLabelText(`${label} tab`));
  await waitFor(() => expect(screen.getByRole('header', { name: label })).toBeVisible());
}
beforeEach(async () => {
  await AsyncStorage.clear(); jest.clearAllMocks();
  provider.index.mockResolvedValue({ eras: [era], sets: [set], rarities: ['Rare'], warnings: [] });
  provider.search.mockResolvedValue({ cards: [await cardFixture()], nextPage: null, warnings: [] });
});
describe('Sprint 1 real navigation with controlled provider responses', () => {
  it('renders all five tabs with live/source labeling and no mock copies', async () => {
    renderRouter(routes, { initialUrl: '/' });
    for (const title of ['Pokédex', 'Collection', 'Portfolio', 'Settings', 'Dashboard']) {
      await selectTab(title);
      expect(screen.getByText('LIVE CATALOG')).toBeVisible();
      expect(screen.getByText('TCGdex catalog · local collection · coverage unverified · no pricing')).toBeVisible();
      expect(screen.queryByText('MOCK DATA')).toBeNull();
    }
  });
  it('passes search/filter/language selections to the provider and explains empty catalogs', async () => {
    renderRouter(routes, { initialUrl: '/pokedex' });
    await screen.findByRole('button', { name: 'View Charizard, en, 4' });
    fireEvent.changeText(screen.getByLabelText('Pokémon name'), 'Char');
    fireEvent.changeText(screen.getByLabelText('Card number'), '004');
    fireEvent.press(screen.getByRole('button', { name: 'Era: All listed eras' }));
    fireEvent.press(screen.getByRole('button', { name: 'Choose Era: Base' }));
    fireEvent.press(screen.getByRole('button', { name: 'Set: All listed physical sets' }));
    fireEvent.press(screen.getByRole('button', { name: 'Choose Set: Base Set' }));
    fireEvent.press(screen.getByRole('button', { name: 'Rarity: All rarities' }));
    fireEvent.press(screen.getByRole('button', { name: 'Choose Rarity: Rare' }));
    fireEvent.press(screen.getByRole('button', { name: 'Search catalog' }));
    await waitFor(() => expect(provider.search).toHaveBeenLastCalledWith('en', expect.anything(), expect.objectContaining({ name: 'Char', number: '004', eraId: era.id, setId: set.id, rarity: 'Rare' }), 1, expect.anything()));
    provider.index.mockResolvedValue({ eras: [], sets: [], rarities: [], warnings: [] });
    provider.search.mockResolvedValue({ cards: [], nextPage: null, warnings: [] });
    fireEvent.press(screen.getByRole('button', { name: 'Language: English' }));
    fireEvent.press(screen.getByRole('button', { name: 'Choose Language: 日本語' }));
    expect(await screen.findByText('No physical catalog records')).toBeVisible();
    expect(provider.index).toHaveBeenLastCalledWith('ja', expect.anything());
  });
  it('adds, edits and removes a physical copy with explicit confirmation', async () => {
    renderRouter(routes, { initialUrl: '/pokedex' });
    fireEvent.press(await screen.findByRole('button', { name: 'View Charizard, en, 4' }));
    expect(screen.getByRole('header', { name: 'Card details' })).toBeVisible();
    fireEvent.press(screen.getByRole('button', { name: 'Add to collection' }));
    expect(await screen.findByText('One physical copy saved on this device.')).toBeVisible();
    fireEvent.press(screen.getByRole('button', { name: 'Add to collection' }));
    expect(await screen.findByText(/A matching copy is already saved/)).toBeVisible();
    fireEvent.press(screen.getByRole('button', { name: 'Close details' }));
    await selectTab('Collection');
    fireEvent.press(await screen.findByRole('button', { name: /Edit Charizard copy/ }));
    fireEvent.press(screen.getByRole('button', { name: 'Condition: Unknown condition' }));
    fireEvent.press(screen.getByRole('button', { name: 'Choose Condition: Played' }));
    fireEvent.press(screen.getByRole('button', { name: 'Save copy changes' }));
    expect(await screen.findByText('Copy updated on this device.')).toBeVisible();
    fireEvent.press(screen.getByRole('button', { name: 'Remove this copy' }));
    expect(screen.getByRole('button', { name: 'Keep copy' })).toBeVisible();
    fireEvent.press(screen.getByRole('button', { name: 'Confirm removal' }));
    expect(await screen.findByText('Start your collection')).toBeVisible();
  });
  it('shows failures without replacing cards with preview fixtures and supports retry', async () => {
    provider.index.mockRejectedValueOnce(new Error('Provider offline'));
    renderRouter(routes, { initialUrl: '/pokedex' });
    expect(await screen.findByText('Provider offline')).toBeVisible();
    expect(screen.queryByText('Kanto study · preview')).toBeNull();
    fireEvent.press(screen.getByRole('button', { name: 'Retry catalog' }));
    expect(await screen.findByRole('button', { name: 'View Charizard, en, 4' })).toBeVisible();
  });
});

it('preserves missing-artwork fallback in catalog and card details', async () => {
  provider.search.mockResolvedValue({ cards: [{ ...await cardFixture(), image: null }], nextPage: null, warnings: [] });
  renderRouter(routes, { initialUrl: '/pokedex' });
  await screen.findByRole('button', { name: 'View Charizard, en, 4' });
  expect(screen.getByText('Artwork unavailable')).toBeVisible();
  fireEvent.press(screen.getByRole('button', { name: 'View Charizard, en, 4' }));
  expect(screen.getByRole('header', { name: 'Card details' })).toBeVisible();
  expect(screen.getAllByLabelText('Artwork unavailable from provider')).toHaveLength(2);
  expect(screen.getAllByLabelText('Artwork unavailable from provider')[1]).toBeVisible();
});
