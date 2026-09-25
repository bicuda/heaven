import { useState, useEffect } from 'react';
import type {
  ServerDetail,
  LiveDropEvent,
  GlobalGameEvent,
  MultiverseMetric,
} from './feature-types';

export const MULTIVERSE_METRICS: MultiverseMetric[] = [
  {
    id: 'monsters',
    label: 'Monstros Derrotados Hoje',
    value: '14.8M+',
    subtext: 'Calculado em tempo real nos 3 reinos',
    trend: '+12.4% vs ontem',
    icon: '⚔️',
  },
  {
    id: 'market',
    label: 'Negociações no Mercado',
    value: '94.320',
    subtext: 'Cartas, Jóias e Pokémon trocados',
    trend: 'Liquidez alta',
    icon: '💎',
  },
  {
    id: 'guilds',
    label: 'Clãs & Guildas Ativas',
    value: '480+',
    subtext: 'Alianças ativas em WoE e Raids',
    trend: 'Recrutamento aberto',
    icon: '🛡️',
  },
  {
    id: 'zero-install',
    label: 'Download Necessário',
    value: '0 MB',
    subtext: 'WebGL instantâneo no navegador',
    trend: '60 FPS Nativo',
    icon: '⚡',
  },
];

export const INITIAL_EVENTS: GlobalGameEvent[] = [
  {
    id: 'golden-invasion-mu',
    gameId: 'mu',
    gameTitle: 'MU Online',
    title: 'Invasão dos Dragões Dourados',
    subtitle: 'A Caçada Celestial por Kundun Boxes',
    description:
      'O céu escureceu sobre o continente. Golden Goblins e Great Golden Dragons surgiram para saquear as vilas.',
    location: 'Lorencia, Noria & Devias',
    rewards: [
      'Box of Kundun +4 e +5',
      'Jewels of Bless & Soul',
      'Equipamentos Excellent',
    ],
    status: 'active',
    countdownSeconds: 754, // ~12m
    badgeLabel: 'Acontecendo Agora',
    accentColor: 'from-rose-500/20 via-orange-900/10 to-neutral-950 text-rose-400 border-rose-500/30',
    bgArtwork: '/card-mu.png',
  },
  {
    id: 'woe-ragnarok',
    gameId: 'ragnarok',
    gameTitle: 'Ragnarok Online',
    title: 'Guerra do Emperium (WoE)',
    subtitle: 'Cerco aos Castelos de Valkyrie Realm',
    description:
      'Batalha de 200 aventureiros pelo domínio dos castelos sagrados e acesso exclusivo aos calabouços de clã.',
    location: 'Feudo de Prontera & Castelos de Geffen',
    rewards: [
      'Baú do Tesouro do Castelo',
      'Itens Divinos & Godly',
      'Aura Visual Soberana',
    ],
    status: 'upcoming',
    countdownSeconds: 6140, // 1h 42m
    badgeLabel: 'Batalha de Guildas',
    accentColor: 'from-amber-500/20 via-amber-900/10 to-neutral-950 text-amber-400 border-amber-500/30',
    bgArtwork: '/card-ragnarok.png',
  },
  {
    id: 'indigo-championship',
    gameId: 'pokemon',
    gameTitle: 'Pokémon Idle',
    title: 'Torneio Mestre da Liga Índigo',
    subtitle: 'Fase Eliminatória de Batalhas Táticas',
    description:
      'Os 64 melhores treinadores da temporada disputam a Taça de Kanto com regras de sinergia elemental e drafting.',
    location: 'Planalto Índigo (Arena Central)',
    rewards: [
      'Ovo Pokémon Mítico',
      'Troféu de Mestre da Temporada',
      'Insígnia Web Exclusiva',
    ],
    status: 'upcoming',
    countdownSeconds: 11840, // 3h 17m
    badgeLabel: 'Torneio Ranqueado',
    accentColor: 'from-emerald-500/20 via-emerald-900/10 to-neutral-950 text-emerald-400 border-emerald-500/30',
    bgArtwork: '/card-pokemon.png',
  },
];

export const INITIAL_DROPS: LiveDropEvent[] = [
  {
    id: 'drop-1',
    gameId: 'mu',
    gameTitle: 'MU Online',
    playerName: 'Archangel_DK',
    eventType: 'refine',
    title: 'Refino Épico na Chaos Machine!',
    details: 'Dragon Knight Blade subiu com sucesso para +13!',
    rarity: 'Lendário',
    timestamp: 'há 45s',
    icon: '✨',
  },
  {
    id: 'drop-2',
    gameId: 'ragnarok',
    gameTitle: 'Ragnarok Online',
    playerName: 'Valhalla_Guild',
    eventType: 'boss_kill',
    title: 'MVP Baphomet Derrotado!',
    details: 'Drop confirmado: Carta Baphomet (0.01%)',
    rarity: 'Mítico',
    timestamp: 'há 2m',
    icon: '⚔️',
  },
  {
    id: 'drop-3',
    gameId: 'pokemon',
    gameTitle: 'Pokémon Idle',
    playerName: 'RedAsh_99',
    eventType: 'capture',
    title: 'Nascimento de Shiny Raro!',
    details: 'Chocou um Charizard Shiny (1/256) na Rota 17!',
    rarity: 'Shiny',
    timestamp: 'há 4m',
    icon: '🌟',
  },
  {
    id: 'drop-4',
    gameId: 'ragnarok',
    gameTitle: 'Ragnarok Online',
    playerName: 'Shadow_Loki',
    eventType: 'drop',
    title: 'Carta Ghostring Adquirida',
    details: 'Dropada no Navio Fantasma após 4 horas de farm AFK.',
    rarity: 'Lendário',
    timestamp: 'há 6m',
    icon: '📜',
  },
  {
    id: 'drop-5',
    gameId: 'mu',
    gameTitle: 'MU Online',
    playerName: 'SoulMaster_Neo',
    eventType: 'drop',
    title: 'Wings of Ruin +Luck Dropadas!',
    details: 'Recompensa obtida na invasão de Kundun em Devias.',
    rarity: 'Épico',
    timestamp: 'há 8m',
    icon: '🪶',
  },
  {
    id: 'drop-6',
    gameId: 'pokemon',
    gameTitle: 'Pokémon Idle',
    playerName: 'MistyTrainer',
    eventType: 'pvp',
    title: 'Vitória na Arena Cerulean!',
    details: 'Alcançou sequência de 15 vitórias consecutivas.',
    rarity: 'Épico',
    timestamp: 'há 11m',
    icon: '🏆',
  },
  {
    id: 'drop-7',
    gameId: 'ragnarok',
    gameTitle: 'Ragnarok Online',
    playerName: 'HighPriest_Sol',
    eventType: 'drop',
    title: 'Drop Raro: Tiara de Plumas',
    details: 'Dropada de Valquíria Randgris no Templo de Odin.',
    rarity: 'Lendário',
    timestamp: 'há 14m',
    icon: '👑',
  },
  {
    id: 'drop-8',
    gameId: 'mu',
    gameTitle: 'MU Online',
    playerName: 'DarkLord_King',
    eventType: 'refine',
    title: 'Dark Horse Level 50 Alcançado!',
    details: 'Montaria mágica evoluída com 100% de maestria.',
    rarity: 'Mítico',
    timestamp: 'há 18m',
    icon: '🐎',
  },
  {
    id: 'drop-9',
    gameId: 'pokemon',
    gameTitle: 'Pokémon Idle',
    playerName: 'Oak_Apprentice',
    eventType: 'capture',
    title: 'Mewtwo Encontrado na Caverna!',
    details: 'Captura bem-sucedida após evento de Raid Cooperativa.',
    rarity: 'Mítico',
    timestamp: 'há 22m',
    icon: '🔮',
  },
];

const SIMULATED_NEW_DROPS: Omit<LiveDropEvent, 'id' | 'timestamp'>[] = [
  {
    gameId: 'pokemon',
    gameTitle: 'Pokémon Idle',
    playerName: 'MistyTrainer',
    eventType: 'pvp',
    title: 'Vitória na Arena Cerulean!',
    details: 'Alcançou sequência de 15 vitórias consecutivas.',
    rarity: 'Épico',
    icon: '🏆',
  },
  {
    gameId: 'ragnarok',
    gameTitle: 'Ragnarok Online',
    playerName: 'HighPriest_Sol',
    eventType: 'drop',
    title: 'Drop Raro: Tiara de Plumas',
    details: 'Dropada de Valquíria Randgris no Templo de Odin.',
    rarity: 'Lendário',
    icon: '👑',
  },
  {
    gameId: 'mu',
    gameTitle: 'MU Online',
    playerName: 'DarkLord_King',
    eventType: 'refine',
    title: 'Dark Horse Level 50 Alcançado!',
    details: 'Montaria mágica evoluída com 100% de maestria.',
    rarity: 'Mítico',
    icon: '🐎',
  },
  {
    gameId: 'pokemon',
    gameTitle: 'Pokémon Idle',
    playerName: 'Oak_Apprentice',
    eventType: 'capture',
    title: 'Mewtwo Encontrado na Caverna!',
    details: 'Captura bem-sucedida após evento de Raid Cooperativa.',
    rarity: 'Mítico',
    icon: '🔮',
  },
];

export const SERVERS_LIST: ServerDetail[] = [
  {
    id: 'prontera-alpha',
    name: 'Prontera Sanctum [BR-01]',
    gameTitle: 'Ragnarok Online',
    realm: 'Rune-Midgard Clássico',
    region: 'São Paulo (Edge Latency BR)',
    status: 'Alpha Restrito',
    uptimePercent: '99.98%',
    tickRate: '60 Hz WebSockets',
    latencyMs: 14,
    onlineCount: 1420,
    maxCapacity: 2500,
    currentSeason: 'Era do Emperium',
    ratesSummary: 'EXP 15x · Drops 10x · Cartas 5x',
    idleCapacityHours: 24,
    directWebUrl: '#jogar-ragnarok',
  },
  {
    id: 'kanto-reborn',
    name: 'Pallet Foundry [BR-02]',
    gameTitle: 'Pokémon Idle',
    realm: 'Kanto & Johto Reborn',
    region: 'São Paulo (Edge Latency BR)',
    status: 'Beta Aberto',
    uptimePercent: '99.95%',
    tickRate: '30 Hz Logic Worker',
    latencyMs: 18,
    onlineCount: 2180,
    maxCapacity: 4000,
    currentSeason: 'Temporada dos Campeões',
    ratesSummary: 'Exp Suave · Pity Shiny 1/256',
    idleCapacityHours: 18,
    directWebUrl: '#jogar-pokemon',
  },
  {
    id: 'lorencia-prime',
    name: 'Lorencia Citadel [BR-03]',
    gameTitle: 'MU Online',
    realm: 'Continente de Lorencia & Devias',
    region: 'São Paulo (Edge Latency BR)',
    status: 'Online',
    uptimePercent: '99.99%',
    tickRate: '60 Hz WebGL Sync',
    latencyMs: 12,
    onlineCount: 3400,
    maxCapacity: 5000,
    currentSeason: 'Temporada I: Archangel Rise',
    ratesSummary: 'EXP 50x · Drops 35% · Asas +15 Habilitadas',
    idleCapacityHours: 24,
    directWebUrl: '#jogar-mu',
  },
];

export function useServersStatus() {
  const [servers, setServers] = useState<ServerDetail[]>(SERVERS_LIST);
  const [events, setEvents] = useState<GlobalGameEvent[]>(INITIAL_EVENTS);
  const [liveDrops, setLiveDrops] = useState<LiveDropEvent[]>(INITIAL_DROPS);
  const [activeEventFilter, setActiveEventFilter] = useState<'all' | 'ragnarok' | 'pokemon' | 'mu'>('all');
  const [isTestingPing, setIsTestingPing] = useState(false);
  const [currentPing, setCurrentPing] = useState(14);
  const [lastPingTest, setLastPingTest] = useState<string>('Agora mesmo');

  // Real-time Event Countdowns (decrements every second)
  useEffect(() => {
    const timer = setInterval(() => {
      setEvents((prevEvents) =>
        prevEvents.map((evt) => {
          if (evt.countdownSeconds <= 1) {
            return {
              ...evt,
              status: evt.status === 'active' ? 'upcoming' : 'active',
              countdownSeconds: evt.status === 'active' ? 7200 : 900,
              badgeLabel: evt.status === 'active' ? 'Em Preparação' : 'Acontecendo Agora',
            };
          }
          return {
            ...evt,
            countdownSeconds: evt.countdownSeconds - 1,
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const runLivePingTest = () => {
    setIsTestingPing(true);
    setTimeout(() => {
      const newLatency = Math.floor(10 + Math.random() * 6);
      setCurrentPing(newLatency);
      setServers((prev) =>
        prev.map((s) => ({
          ...s,
          latencyMs: Math.floor(newLatency + (Math.random() * 4 - 2)),
        }))
      );
      setIsTestingPing(false);
      const time = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setLastPingTest(time);
    }, 500);
  };

  const formatCountdown = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const filteredEvents =
    activeEventFilter === 'all'
      ? events
      : events.filter((e) => e.gameId === activeEventFilter);

  return {
    servers,
    events: filteredEvents,
    activeEventFilter,
    setActiveEventFilter,
    liveDrops,
    metrics: MULTIVERSE_METRICS,
    isTestingPing,
    currentPing,
    lastPingTest,
    runLivePingTest,
    formatCountdown,
  };
}
