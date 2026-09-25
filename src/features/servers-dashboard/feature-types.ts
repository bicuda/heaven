export interface LiveDropEvent {
  id: string;
  gameId: 'ragnarok' | 'pokemon' | 'mu';
  gameTitle: string;
  playerName: string;
  eventType: 'drop' | 'boss_kill' | 'refine' | 'capture' | 'pvp';
  title: string;
  details: string;
  rarity: 'Lendário' | 'Mítico' | 'Shiny' | 'Épico';
  timestamp: string;
  icon: string;
}

export interface GlobalGameEvent {
  id: string;
  gameId: 'ragnarok' | 'pokemon' | 'mu';
  gameTitle: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  rewards: string[];
  status: 'active' | 'upcoming';
  countdownSeconds: number;
  badgeLabel: string;
  accentColor: string;
  bgArtwork: string;
}

export interface MultiverseMetric {
  id: string;
  label: string;
  value: string;
  subtext: string;
  trend: string;
  icon: string;
}

export interface ServerDetail {
  id: string;
  name: string;
  gameTitle: string;
  realm: string;
  region: string;
  status: 'Online' | 'Beta Aberto' | 'Alpha Restrito' | 'Manutenção Preventiva';
  uptimePercent: string;
  tickRate: string;
  latencyMs: number;
  onlineCount: number;
  maxCapacity: number;
  currentSeason: string;
  ratesSummary: string;
  idleCapacityHours: number;
  directWebUrl: string;
}

export interface ServersDashboardProps {
  onSelectGameToPlay: (gameId: 'ragnarok' | 'pokemon' | 'mu') => void;
}
