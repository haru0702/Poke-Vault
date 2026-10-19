import { describe, expect, it } from '@jest/globals';
import { fireEvent, renderRouter, screen, waitFor } from 'expo-router/testing-library';
import RootLayout from '../src/app/_layout';
import TabLayout from '../src/app/(tabs)/_layout';
import Dashboard from '../src/app/(tabs)/index';
import Pokedex from '../src/app/(tabs)/pokedex';
import Collection from '../src/app/(tabs)/collection';
import Portfolio from '../src/app/(tabs)/portfolio';
import Settings from '../src/app/(tabs)/settings';

const routes = { _layout: RootLayout, '(tabs)/_layout': TabLayout, '(tabs)/index': Dashboard,
  '(tabs)/pokedex': Pokedex, '(tabs)/collection': Collection, '(tabs)/portfolio': Portfolio, '(tabs)/settings': Settings };

async function selectTab(label: string) {
  fireEvent.press(screen.getByLabelText(`${label} tab`));
  await waitFor(() => expect(screen.getByRole('header', { name: label })).toBeVisible());
}
describe('real Expo Router tabs and preview screens', () => {
  it('renders all five screens and switches tabs by pressing their tab buttons', async () => {
    renderRouter(routes, { initialUrl: '/' });
    expect(screen.getByRole('header', { name: 'Dashboard' })).toBeVisible();
    for (const title of ['Pokédex', 'Collection', 'Portfolio', 'Settings', 'Dashboard']) {
      await selectTab(title);
      expect(screen.getByText('MOCK DATA')).toBeVisible();
      expect(screen.getByText('Offline preview · synthetic cards and copies · no live prices')).toBeVisible();
    }
  });
  it('filters native names and languages and explains empty era previews', async () => {
    renderRouter(routes, { initialUrl: '/pokedex' });
    fireEvent.changeText(screen.getByLabelText('Search preview cards'), 'フシギ');
    expect(screen.getByText('1 mock results')).toBeVisible();
    fireEvent.changeText(screen.getByLabelText('Search preview cards'), '');
    fireEvent.press(screen.getByRole('button', { name: '日本語' }));
    expect(screen.getByText('2 mock results')).toBeVisible();
    fireEvent.press(screen.getByRole('button', { name: 'Neo' }));
    expect(screen.getByText('No preview printings here')).toBeVisible();
  });
  it('filters owned copies and preserves preview labeling when display notes are disabled', async () => {
    renderRouter(routes, { initialUrl: '/collection' });
    fireEvent.press(screen.getByRole('button', { name: 'Needs review' }));
    expect(screen.getByText('3 copies')).toBeVisible();
    await selectTab('Settings');
    fireEvent(screen.getByLabelText('Show catalog notes'), 'valueChange', false);
    fireEvent(screen.getByLabelText('Compact collection rows'), 'valueChange', true);
    await selectTab('Collection');
    expect(screen.getByText('MOCK DATA')).toBeVisible();
    expect(screen.queryByText(/Mock copy ·/)).toBeNull();
  });
  it('opens the explorer through the dashboard action', async () => {
    renderRouter(routes, { initialUrl: '/' });
    fireEvent.press(screen.getByRole('button', { name: 'Explore Pokédex' }));
    await waitFor(() => expect(screen.getByRole('header', { name: 'Pokédex' })).toBeVisible());
  });
});
