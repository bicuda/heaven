import { useState, useEffect, useCallback } from 'react';
import type { GameItem, GameId } from './feature-types';

export const GAMES_DATA: GameItem[] = [
  {
    id: 'ragnarok',
    title: 'Ragnarok Online',
    subtitle: 'Clássico de Midgard Web Idle',
    badgeGenre: 'MMORPG Nórdico',
    status: 'Alpha Fechado',
    iconSymbol: 'RO',
    logoImage: '/logo-ragnarok.png',
    altLogoImage: '/assets/logo-ragnarok.png',
    bannerImage: '/card-ragnarok.png',
    videoUrl: '/videos/ragnarok-bg.mp4',
    playUrl: '', // Insira aqui a URL direta do site do jogo (quando tiver)
    accentGradient: 'from-amber-600/40 via-amber-900/20 to-neutral-950',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    heroHeadline: 'Prontera agora vive no seu navegador, sem precisar instalar 18 gigabytes.',
    overview:
      'Midgard clássico adaptado para a web: enfrente MVPs lendários, drope cartas raras e monte suas builds com sistema de progressão AFK contínuo e sem downloads.',
    webAdvantages: [
      'Execução 100% nativa em WebGL: abre instantaneamente no Chrome, Edge ou Safari.',
      'Sincronização Cloud: jogue no PC e confira o progresso pelo celular sem perda de dados.',
      'Sistema de Farm AFK Oficial: sem banimentos; progressão offline contínua e segura.',
      'Calculadora de Atributos & Builds ao vivo integrada à simulação do servidor.',
    ],
    keyMechanics: [
      {
        title: 'Auto-Raid MVP com Estratégia de Equipes',
        description:
          'Defina suas formações de sacerdotes, bruxos e algozes para enfrentar Baphomet e Drake automaticamente.',
      },
      {
        title: 'Álbum e Coleção de Cartas Ativas',
        description:
          'Drop de cartas lendárias de 0.01% com sistema de pity rate e fusão no ferreiro virtual.',
      },
      {
        title: 'Guerra do Emperium (WoE) Web Live',
        description:
          'Batalhas periódicas de clãs com renderização otimizada para até 200 aventureiros no browser.',
      },
    ],
    mediaItems: [
      {
        id: 'rag-1',
        title: 'Prontera Central & Aventureiros',
        caption: 'O comércio clássico e encontros de clãs na praça central de Prontera.',
        tag: 'Mundo Aberto',
        image: '/card-ragnarok.png',
      },
      {
        id: 'rag-2',
        title: 'Batalha MVP contra Baphomet',
        caption: 'Auto-raid com sinergia de classes e uso tático de buffs sagrados.',
        tag: 'Raid MVP',
        image: '/card-ragnarok.png',
      },
      {
        id: 'rag-3',
        title: 'Álbum de Cartas & Forja de Equipamentos',
        caption: 'Coleção completa de cartas clássicas com efeitos ativos de combate.',
        tag: 'Colecionáveis',
        image: '/bg1.png',
      },
    ],
    specs: {
      rateExp: 'Dinâmica 10x - 25x',
      rateDrop: 'Equipamentos 15x / Cartas 5x',
      maxLevel: '99 / 70 (Transclasses)',
      engine: 'WebGL Sprite Renderer',
      platform: 'Web Desktop & Mobile',
      cloudSync: 'Instantâneo via WebSocket',
      activePlayers: '1.420 testadores',
      pingMs: 14,
    },
    loreQuote:
      '"O som do drop de uma carta rara em Prontera agora toca direto na aba do seu navegador."',
    quoteAuthor: 'Haven Engine Team',
    colorScheme: {
      primary: 'amber',
      border: 'border-amber-500/30',
      glow: 'shadow-amber-500/20',
      badge: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
      tagBg: 'bg-amber-500/10 text-amber-200',
    },
  },
  {
    id: 'pokemon',
    title: 'Pokémon Idle',
    subtitle: 'Universo e Motor de Batalhas Web',
    badgeGenre: 'Monster RPG',
    status: 'Beta Aberto',
    iconSymbol: 'PK',
    logoImage: '/logo-pokemon.png',
    altLogoImage: '/assets/logo-pokemon.png',
    bannerImage: '/card-pokemon.png',
    videoUrl: '/videos/pokemon-bg.mp4',
    playUrl: '', // Insira aqui a URL direta do site do jogo (quando tiver)
    accentGradient: 'from-emerald-600/40 via-teal-950/20 to-neutral-950',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    heroHeadline: 'Captura infinita, breeding matemático e sinergias elementais com 0 delay.',
    overview:
      'Colecione mais de 250 monstros, monte sinergias táticas elementais e suba de nível com batalhas automáticas em tempo real, caça a Shinies e treino de EVs em background.',
    webAdvantages: [
      'Zero emulador: roda como aplicação web nativa a 60 FPS.',
      'Economia de bateria brutal: WebWorker computa batalhas sem aquecer o celular.',
      'Multiplayer assíncrono: desafie ginásios de outros treinadores enquanto dormem.',
      'Árvore genealógica de Breeding acessível sem menus confusos.',
    ],
    keyMechanics: [
      {
        title: 'Calculador de IVs e Treino de EVs em Segundo Plano',
        description:
          'Aloque monstrinhos em rotas especializadas e colete os atributos prontos para torneios.',
      },
      {
        title: 'Caça a Variantes Shiny com Pity Rate',
        description:
          'A cada encontro não-shiny, a chance do próximo aumenta matematicamente no servidor.',
      },
      {
        title: 'Torre de Batalhas Sem Fim com Recompensas Raras',
        description:
          'Suba centenas de andares automatizados adaptando o time contra chefes elementais.',
      },
    ],
    mediaItems: [
      {
        id: 'pok-1',
        title: 'Rotas de Caça & Batalhas',
        caption: 'Sistema de exploração contínua com batalhas táticas e encontros de raros.',
        tag: 'Exploração',
        image: '/card-pokemon.png',
      },
      {
        id: 'pok-2',
        title: 'Arena de Batalhas em Tempo Real',
        caption: 'Combates automáticos baseados em fraquezas elementais e velocidade.',
        tag: 'Combate Tático',
        image: '/card-pokemon.png',
      },
      {
        id: 'pok-3',
        title: 'Fábrica de Ovos & Incubação AFK',
        caption: 'Herança genética de IVs perfeitos enquanto o navegador estiver fechado.',
        tag: 'Breeding',
        image: '/bg1.png',
      },
    ],
    specs: {
      rateExp: 'Linear Suave (Foco AFK)',
      rateDrop: 'Ovos Místicos / TMs Raras',
      maxLevel: '100 (Maestria)',
      engine: 'High-FPS Web Canvas Engine',
      platform: 'Qualquer Navegador Moderno',
      cloudSync: 'Salva Local com Backup Nuvem',
      activePlayers: '2.180 treinadores',
      pingMs: 18,
    },
    loreQuote:
      '"Construído para quem ama colecionar e aperfeiçoar composições táticas sem a barreira do grind repetitivo."',
    quoteAuthor: 'Dev Master / Haven Games',
    colorScheme: {
      primary: 'emerald',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20',
      badge: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
      tagBg: 'bg-emerald-500/10 text-emerald-200',
    },
  },
  {
    id: 'mu',
    title: 'MU Online',
    subtitle: 'Reconstruído para Web & Mobile',
    badgeGenre: 'Dark Fantasy MMO',
    status: 'Temporada I',
    iconSymbol: 'MU',
    logoImage: '/logo-mu.png',
    altLogoImage: '/assets/logo-mu.png',
    bannerImage: '/card-mu.png',
    videoUrl: '/videos/mu-bg.mp4',
    playUrl: '', // Insira aqui a URL direta do site do jogo (quando tiver)
    accentGradient: 'from-purple-600/40 via-rose-950/20 to-neutral-950',
    glowColor: 'rgba(168, 85, 247, 0.3)',
    heroHeadline: 'Asas de anjo +15 e o som inconfundível de uma Bless caindo no chão, no browser.',
    overview:
      'Lorencia, Noria e Devias com asas +15, Blood Castle e Chaos Machine rodando em 60 FPS nativo no computador e celular.',
    webAdvantages: [
      'Abra a URL e esteja em Lorencia em 3 segundos, sem instaladores de 8GB.',
      'Controles inteligentes adaptativos: mouse no PC e touch gestures no mobile.',
      'Chaos Machine Web: suas combinações épicas com persistência de estado garantida.',
      'Blood Castle e Devil Square com notificações nativas do navegador.',
    ],
    keyMechanics: [
      {
        title: 'Asas +15 e Shaders de Reflexo',
        description:
          'Brilhos fiéis dos sets clássicos com efeitos acelerados por WebGL.',
      },
      {
        title: 'Auto-Leveling em Segundo Plano',
        description:
          'Caça automática contínua mesmo com a aba do navegador minimizada.',
      },
      {
        title: 'Comércio Livre no Web Market',
        description:
          'Troca de Bless e Soul em leilão instantâneo em tempo real.',
      },
    ],
    mediaItems: [
      {
        id: 'mu-1',
        title: 'Lorencia & Praça dos Guerreiros',
        caption: 'Encontros de guildas e armaduras luminosas em alta resolução.',
        tag: 'Cidade Central',
        image: '/card-mu.png',
      },
      {
        id: 'mu-2',
        title: 'Blood Castle em Alta Velocidade',
        caption: 'Quebra de portão e recuperação da arma do arcanjo.',
        tag: 'Evento Diário',
        image: '/card-mu.png',
      },
      {
        id: 'mu-3',
        title: 'Chaos Machine & Sucesso +15',
        caption: 'Evolução de asas nível 3 e combinação de joias mágicas sem delay.',
        tag: 'Forja Mágica',
        image: '/bg1.png',
      },
    ],
    specs: {
      rateExp: '50x (Temporada I)',
      rateDrop: '35% Jewels / 20% Exc',
      maxLevel: '400 (Master Level)',
      engine: 'WebGL 3D Shader Engine',
      platform: 'Cross-play PC & Mobile',
      cloudSync: 'Servidor Central Rollback Zero',
      activePlayers: '3.400 guerreiros',
      pingMs: 12,
    },
    loreQuote:
      '"O brilho dourado de uma Chaos Weapon forjada com sucesso no conforto do seu celular."',
    quoteAuthor: 'Lorencia Foundry Labs',
    colorScheme: {
      primary: 'purple',
      border: 'border-purple-500/30',
      glow: 'shadow-purple-500/20',
      badge: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
      tagBg: 'bg-purple-500/10 text-purple-200',
    },
  },
];

export interface VideoSourceParsed {
  isIframe: boolean;
  isDirectVideo: boolean;
  embedUrl: string;
}

export function parseVideoSource(rawUrl?: string): VideoSourceParsed | null {
  if (!rawUrl || !rawUrl.trim()) return null;
  const url = rawUrl.trim();

  // YouTube: youtube.com/watch?v=ID or youtu.be/ID or youtube.com/embed/ID
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      isIframe: true,
      isDirectVideo: false,
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`,
    };
  }

  // Vimeo: vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      isIframe: true,
      isDirectVideo: false,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  // Direct video file (mp4, webm, mov, etc.)
  return {
    isIframe: false,
    isDirectVideo: true,
    embedUrl: url,
  };
}

const GAME_IDS: GameId[] = ['ragnarok', 'pokemon', 'mu'];

export function useGamesShowcase() {
  const [activeCurtainId, setActiveCurtainId] = useState<GameId>('ragnarok');
  const [selectedMediaIndices, setSelectedMediaIndices] = useState<Record<GameId, number>>({
    ragnarok: 0,
    pokemon: 0,
    mu: 0,
  });
  const [activeMediaTab, setActiveMediaTab] = useState<'screenshots' | 'trailer'>('screenshots');
  const [isPlayingTrailer, setIsPlayingTrailer] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(Date.now());
  const [pings, setPings] = useState<Record<GameId, number>>({
    ragnarok: 14,
    pokemon: 18,
    mu: 12,
  });

  // Keyboard Navigation: Arrow keys to switch between games, Escape to close fullscreen lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        return;
      }

      // Do not capture if typing in inputs/textareas
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }

      if (e.key === 'ArrowRight') {
        const idx = GAME_IDS.indexOf(activeCurtainId);
        const nextId = GAME_IDS[(idx + 1) % GAME_IDS.length];
        handleSelectCurtain(nextId);
      } else if (e.key === 'ArrowLeft') {
        const idx = GAME_IDS.indexOf(activeCurtainId);
        const prevId = GAME_IDS[(idx - 1 + GAME_IDS.length) % GAME_IDS.length];
        handleSelectCurtain(prevId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCurtainId]);

  // 3.5s Gallery Auto-advance Carousel:
  // Starts after the curtain finishes opening and sits still for 3.5s,
  // then cycles images every 3.5s. Pauses automatically if fullscreen lightbox is open.
  useEffect(() => {
    if (activeMediaTab !== 'screenshots') return;
    if (isLightboxOpen) return;

    const currentGame = GAMES_DATA.find((g) => g.id === activeCurtainId);
    if (!currentGame || currentGame.mediaItems.length <= 1) return;

    const intervalId = setInterval(() => {
      setSelectedMediaIndices((prev) => ({
        ...prev,
        [activeCurtainId]: ((prev[activeCurtainId] || 0) + 1) % currentGame.mediaItems.length,
      }));
    }, 3500);

    return () => clearInterval(intervalId);
  }, [activeCurtainId, activeMediaTab, lastInteractionTime, isLightboxOpen]);

  const handleManualMediaSelect = useCallback((gameId: GameId, index: number) => {
    setSelectedMediaIndices((prev) => ({ ...prev, [gameId]: index }));
    setLastInteractionTime(Date.now()); // Resets timer so user gets 3.5s on selected item
  }, []);

  const handleSelectCurtain = useCallback((id: GameId) => {
    setActiveCurtainId((current) => (current === id ? current : id));
    setIsPlayingTrailer(false);
    setLastInteractionTime(Date.now());
  }, []);

  return {
    activeCurtainId,
    setActiveCurtainId: handleSelectCurtain,
    selectedMediaIndices,
    selectedMediaIndex: selectedMediaIndices[activeCurtainId] || 0,
    setSelectedMediaIndex: (idx: number) => handleManualMediaSelect(activeCurtainId, idx),
    setGameMediaIndex: handleManualMediaSelect,
    activeMediaTab,
    setActiveMediaTab,
    isPlayingTrailer,
    setIsPlayingTrailer,
    isLightboxOpen,
    setIsLightboxOpen,
    pings,
    games: GAMES_DATA,
  };
}
