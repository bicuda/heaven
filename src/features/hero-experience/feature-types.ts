export type UniverseId = 'all' | 'ragnarok' | 'pokemon' | 'mu';

export interface UniversePillar {
  id: 'ragnarok' | 'pokemon' | 'mu';
  name: string;
  genre: string;
  tagline: string;
  accentColor: string;
  glowColor: string;
  iconSymbol: string;
  keyFeature: string;
  statusText: string;
  bgImage: string;
  altBgImage?: string;
  videoUrl?: string;
}

export interface HeroExperienceProps {
  activeUniverse: UniverseId;
  onSelectUniverse: (id: UniverseId) => void;
  onExploreGames: () => void;
  onViewServers: () => void;
  activeParticleHue?: number;
}
