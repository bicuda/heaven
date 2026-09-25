export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeadlineFontOption {
  id: string;
  name: string;
  family: string;
  category: string;
}

export interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  activeUniverseTheme: 'all' | 'ragnarok' | 'pokemon' | 'mu';
  onThemeChange: (theme: 'all' | 'ragnarok' | 'pokemon' | 'mu') => void;
  onOpenPaletteMenu?: () => void;
}

