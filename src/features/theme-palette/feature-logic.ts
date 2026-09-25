import { useState, useEffect } from 'react';
import type { ThemePalette, ThemePaletteId } from './feature-types';

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: 'sleek-mono',
    name: 'Titânio Sleek / Minimalist Dark',
    category: 'Brutalismo & Estúdio de Luxo',
    tagline: 'Platina fria, grafite profundo e prata sem saturações coloridas. Minimalismo absoluto.',
    swatches: ['#f3f4f6', '#94a3b8', '#090a0d'],
    particleHue: 215,
    cssVars: {
      '--theme-primary': '#f3f4f6',
      '--theme-primary-light': '#ffffff',
      '--theme-primary-dark': '#94a3b8',
      '--theme-primary-glow': 'rgba(255, 255, 255, 0.35)',
      '--theme-gradient': 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%)',
      '--theme-contrast-text': '#090a0d',
      '--theme-bg-canvas': '#090a0d',
      '--theme-bg-surface': '#14161d',
      '--theme-border': 'rgba(255, 255, 255, 0.2)',
    },
  },
];

const STORAGE_KEY = 'haven_theme_palette';

export function useThemePalette() {
  const [currentPaletteId, setCurrentPaletteId] = useState<ThemePaletteId>('sleek-mono');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Apply variables to document root
  useEffect(() => {
    const palette = THEME_PALETTES[0];
    const root = document.documentElement;

    Object.entries(palette.cssVars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });

    document.body.style.backgroundColor = palette.cssVars['--theme-bg-canvas'];
    root.setAttribute('data-theme', palette.id);

    try {
      localStorage.setItem(STORAGE_KEY, palette.id);
    } catch {
      // Ignore
    }
  }, []);

  const selectPalette = (id: ThemePaletteId) => {
    setCurrentPaletteId(id);
  };

  const activePalette = THEME_PALETTES[0];

  return {
    currentPaletteId,
    activePalette,
    selectPalette,
    isMenuOpen,
    setIsMenuOpen,
    palettes: THEME_PALETTES,
  };
}
