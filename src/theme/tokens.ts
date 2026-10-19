export const colors = {
  background: '#0B1110', surface: '#121B18', elevated: '#19241F', border: '#29362E',
  text: '#F1F4ED', muted: '#A5B4AA', subtle: '#778A7D', accent: '#BCE5A3',
  accentDark: '#20372A', gold: '#E8C988', goldDark: '#302A1F', blue: '#A9C8DE',
  blueDark: '#1B2A34', purple: '#C8B8E8', purpleDark: '#2C2437', danger: '#F0B9A8',
} as const;
export const radii = { sm: 12, md: 18, lg: 26, pill: 999 } as const;
export const elementColors: Record<string, { foreground: string; background: string }> = {
  Fire: { foreground: '#E6B199', background: '#3A2920' },
  Electric: { foreground: '#E8D68A', background: '#36331F' },
  Grass: { foreground: '#BCE5A3', background: '#26382C' },
  Ghost: { foreground: '#C8B8E8', background: '#30283E' },
  Psychic: { foreground: '#B5CBDF', background: '#27323E' },
  Normal: { foreground: '#D1C4AE', background: '#332F27' },
  Trainer: { foreground: '#B8D1C7', background: '#253A32' },
};
