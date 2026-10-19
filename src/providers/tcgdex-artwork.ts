/** TCGdex alone defines extensionless image bases and their supported renditions. */
export function resolveTCGdexImage(value: unknown): string | null {
  if (typeof value !== 'string' || !value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.hostname !== 'assets.tcgdex.net' || url.username || url.password || url.search || url.hash) return null;
    return /\.(webp|png|jpe?g)$/i.test(url.pathname) ? url.href : `${url.href.replace(/\/$/, '')}/high.webp`;
  } catch { return null; }
}

/** Only documented TCGdex renditions may be derived; never infer artwork from IDs. */
export function tcgdexRenditions(url: URL, native: boolean): string[] | null {
  if (url.hostname !== 'assets.tcgdex.net' || url.search || url.hash || !/\/(high|low)\.(webp|png|jpg)$/.test(url.pathname)) return null;
  const base = url.href.replace(/\.(webp|png|jpg)$/, '');
  return native ? [`${base}.png`, `${base}.webp`, `${base}.jpg`] : [url.href, `${base}.png`, `${base}.jpg`];
}
