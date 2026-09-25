export type ThemePaletteId = 'sleek-mono';

export interface ThemePalette {
  id: ThemePaletteId;
  name: string;
  category: string;
  tagline: string;
  swatches: [string, string, string]; // [primary, secondary/accent, background]
  particleHue: number;
  cssVars: {
    '--theme-primary': string;
    '--theme-primary-light': string;
    '--theme-primary-dark': string;
    '--theme-primary-glow': string;
    '--theme-gradient': string;
    '--theme-contrast-text': string;
    '--theme-bg-canvas': string;
    '--theme-bg-surface': string;
    '--theme-border': string;
  };
}

export interface ThemePaletteMenuProps {
  currentPaletteId: ThemePaletteId;
  onSelectPalette: (id: ThemePaletteId) => void;
  isOpen: boolean;
  onClose: () => void;
}
