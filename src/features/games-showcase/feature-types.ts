export type GameId = 'ragnarok' | 'pokemon' | 'mu';

export interface GameServerSpec {
  rateExp: string;
  rateDrop: string;
  maxLevel: string;
  engine: string;
  platform: string;
  cloudSync: string;
  activePlayers: string;
  pingMs: number;
}

export interface GameMediaItem {
  id: string;
  title: string;
  caption: string;
  tag: string;
  image: string;
}

export interface GameItem {
  id: GameId;
  title: string;
  subtitle: string;
  badgeGenre: string;
  status: 'Alpha Fechado' | 'Beta Aberto' | 'Lançamento Imediato' | 'Temporada I';
  heroHeadline: string;
  overview: string;
  iconSymbol: string;
  logoImage: string;
  altLogoImage?: string;
  bannerImage: string;
  videoUrl?: string;
  playUrl?: string;
  accentGradient: string;
  glowColor: string;
  webAdvantages: string[];
  keyMechanics: {
    title: string;
    description: string;
  }[];
  mediaItems: GameMediaItem[];
  specs: GameServerSpec;
  loreQuote: string;
  quoteAuthor: string;
  colorScheme: {
    primary: string;
    border: string;
    glow: string;
    badge: string;
    tagBg: string;
  };
}

export interface GamesShowcaseProps {
  selectedGameId: GameId | 'all';
  onSelectGame: (id: GameId | 'all') => void;
  onOpenPlayModal?: (game: GameItem) => void;
}
