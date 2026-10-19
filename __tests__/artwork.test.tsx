import { artworkOverrides, findArtworkOverride } from '../src/providers/artwork-overrides';
import { beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { fireEvent, render, screen, act } from '@testing-library/react-native';
import { CardArtwork } from '../src/components/CardArtwork';
import { CatalogTile } from '../src/components/catalog';
import { resolveCardArtwork } from '../src/components/artwork';
import { cardFixture } from './live-fixtures';

beforeEach(() => { jest.spyOn(console, 'debug').mockImplementation(() => {}); });
afterEach(() => { jest.restoreAllMocks(); jest.useRealTimers(); });
it('selects documented native PNG and web WebP without inventing images', async () => {
  const card = await cardFixture();
  expect(resolveCardArtwork(card, 'ios')[0]).toMatch(/high.png$/);
  expect(resolveCardArtwork(card, 'web')[0]).toMatch(/high.webp$/);
  expect(resolveCardArtwork({ ...card, image: null }, 'web')).toEqual([]);
  expect(resolveCardArtwork({ ...card, image: 'file:///secret' }, 'web')).toEqual([]);
  expect(resolveCardArtwork({ ...card, image: 'https://configured.example/art.png', external: { ...card.external, provider: 'other' } }, 'web')).toEqual(['https://configured.example/art.png']);
});
it('shows valid art after loading and resets on source changes', async () => {
  const card = await cardFixture();
  const view = render(<CardArtwork card={card} />);
  expect(screen.getByLabelText('Loading artwork')).toBeTruthy();
  fireEvent(screen.getByLabelText('Charizard card artwork'), 'load');
  expect(screen.queryByLabelText('Loading artwork')).toBeNull();
  view.rerender(<CardArtwork card={{ ...card, image: null }} />);
  expect(screen.getByLabelText('Artwork unavailable from provider')).toBeTruthy();
  view.rerender(<CardArtwork card={card} />);
  expect(screen.getByLabelText('Loading artwork')).toBeTruthy();
});
it('tries documented formats then renders load-failure fallback', async () => {
  render(<CardArtwork card={await cardFixture()} />);
  for (let n = 0; n < 3; n++) fireEvent(screen.getByLabelText('Charizard card artwork'), 'error');
  expect(screen.getByLabelText('Artwork failed to load')).toBeTruthy();
  expect(screen.queryByLabelText('Charizard card artwork')).toBeNull();
});
it('times out stalled requests and preserves the small layout', async () => {
  jest.useFakeTimers();
  render(<CardArtwork card={await cardFixture()} small />);
  for (let n = 0; n < 3; n++) act(() => jest.advanceTimersByTime(15000));
  expect(screen.getByLabelText('Artwork failed to load')).toBeTruthy();
  expect(screen.getByTestId('card-artwork')).toHaveStyle({ width: 58, height: 82 });
});
it('renders the missing-provider placeholder inside a real catalog tile', async () => {
  render(<CatalogTile card={{ ...await cardFixture(), image: null }} onPress={() => {}} />);
  expect(screen.getByText('Artwork unavailable')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'View Charizard, en, 4' })).toBeTruthy();
});
it('uses only reviewed exact-printing supplementary images and attributes them', async () => {
  const base = await cardFixture();
  for (const entry of artworkOverrides) {
    const card = { ...base, image: null, name: entry.name, collectorNumber: entry.number, external: { provider: 'tcgdex', locale: 'en', cardId: entry.cardId, setId: entry.setId } };
    expect(resolveCardArtwork(card, 'web')).toEqual([entry.image]);
    expect(findArtworkOverride({ ...card, language: 'ja' })).toBeUndefined();
    expect(findArtworkOverride({ ...card, collectorNumber: 'wrong' })).toBeUndefined();
    expect(findArtworkOverride({ ...card, external: { ...card.external, setId: 'wrong' } })).toBeUndefined();
  }
  const entry = artworkOverrides[0]!;
  const card = { ...base, image: null, name: entry.name, collectorNumber: entry.number, external: { provider: 'tcgdex', locale: 'en', cardId: entry.cardId, setId: entry.setId } };
  render(<CardArtwork card={card} />);
  fireEvent(screen.getByLabelText('Unown card artwork'), 'load');
  expect(screen.getByLabelText('Artwork source: Pokémon TCG API (legacy)')).toBeTruthy();
  fireEvent(screen.getByLabelText('Unown card artwork'), 'error');
  expect(screen.getByLabelText('Artwork failed to load')).toBeTruthy();
});

it('attributes Pooka Trainer Kit images and rejects different-number reprints', async () => {
  const base = await cardFixture();
  for (const entry of artworkOverrides.filter(e => e.usageScope === 'personal-noncommercial')) {
    const card = { ...base, image: null, name: entry.name, collectorNumber: '1', external: { provider: 'tcgdex', locale: 'en', cardId: entry.cardId, setId: entry.setId } };
    const view = render(<CardArtwork card={card} />);
    fireEvent(screen.getByLabelText(`${entry.name} card artwork`), 'load');
    expect(screen.getByLabelText('Artwork source: Pooka (personal use)')).toBeTruthy();
    expect(findArtworkOverride({ ...card, collectorNumber: '27' })).toBeUndefined();
    expect(entry.termsUrl).toBe('https://pooka.app/terms');
    view.unmount();
  }
});
