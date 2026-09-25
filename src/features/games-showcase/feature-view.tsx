import { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Wifi,
  Play,
  Pause,
  Image as ImageIcon,
  Film,
  ChevronRight,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2,
  X,
} from 'lucide-react';
import type { GamesShowcaseProps, GameId, GameItem } from './feature-types';
import { useGamesShowcase, parseVideoSource } from './feature-logic';

/**
 * GamesShowcase Component
 * Theatrical multi-curtain showcase with pre-rendered stage canvas and smooth reveal.
 */

/**
 * CurtainVideoBackground
 * Plays continuously in loop so the world stays alive.
 * Dynamically repositions video (e.g. MU aligns to left when collapsed so key action is visible in narrow drawer).
 */
function CurtainVideoBackground({
  gameId,
  videoUrl,
  isExpanded,
  poster,
}: {
  gameId: GameId;
  videoUrl: string;
  isExpanded: boolean;
  poster?: string;
}) {
  const [hasError, setHasError] = useState(false);

  const getObjectPosition = () => {
    if (isExpanded) {
      return 'center center';
    }
    if (gameId === 'mu') {
      return '24% center';
    }
    if (gameId === 'pokemon') {
      return '24% center';
    }
    if (gameId === 'ragnarok') {
      return '21% center';
    }
    return 'center center';
  };

  if (hasError) {
    return (
      <img
        src={poster || '/bg1.png'}
        alt="Cover artwork"
        style={{
          objectPosition: getObjectPosition(),
        }}
        className={`w-full h-full object-cover transition-all duration-1000 ${
          isExpanded ? 'opacity-40 scale-100' : 'opacity-20 grayscale scale-105'
        }`}
      />
    );
  }

  return (
    <video
      key={videoUrl}
      src={videoUrl}
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      onError={() => setHasError(true)}
      style={{
        objectPosition: getObjectPosition(),
      }}
      className={`w-full h-full object-cover filter contrast-115 transition-all duration-1000 ${
        isExpanded
          ? 'opacity-45 scale-100'
          : 'opacity-25 grayscale scale-105 hover:grayscale-0 hover:opacity-40'
      }`}
    />
  );
}

export function GamesShowcase({
  selectedGameId,
  onSelectGame,
}: GamesShowcaseProps) {
  const {
    activeCurtainId,
    setActiveCurtainId,
    selectedMediaIndices,
    selectedMediaIndex,
    setSelectedMediaIndex,
    setGameMediaIndex,
    activeMediaTab,
    setActiveMediaTab,
    isPlayingTrailer,
    setIsPlayingTrailer,
    isLightboxOpen,
    setIsLightboxOpen,
    pings,
    games,
  } = useGamesShowcase();

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  // Navigation lock ref: prevents accidental hover triggers while scrolling down from "Saber mais"
  const isNavigatingRef = useRef(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  // Sync with universe selection from hero cards
  useEffect(() => {
    if (selectedGameId && selectedGameId !== 'all') {
      setActiveCurtainId(selectedGameId as GameId);
      // Lock hover for 1200ms while smooth scrolling to gallery so cursor passing over other curtains doesn't override it
      isNavigatingRef.current = true;
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      const timer = window.setTimeout(() => {
        isNavigatingRef.current = false;
      }, 1200);
      return () => window.clearTimeout(timer);
    }
  }, [selectedGameId, setActiveCurtainId]);

  const handleCurtainClick = (id: GameId) => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveCurtainId(id);
    onSelectGame(id);
  };

  const handleCurtainHover = (id: GameId) => {
    if (isNavigatingRef.current) return;
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    // 140ms Hover Intent: responsive yet avoids accidental triggers on rapid cursor swipes
    hoverTimeoutRef.current = window.setTimeout(() => {
      handleCurtainClick(id);
    }, 140);
  };

  const handleCurtainLeave = () => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleLogoError = (id: string) => {
    setLogoErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Align the panoramic artwork (bg1.png) per game:
  // Ragnarok = Left, Pokemon = Center, MU = Right
  const getGameArtPosition = (id: GameId) => {
    switch (id) {
      case 'ragnarok':
        return {
          className: 'object-left',
          style: { objectPosition: 'left center' },
        };
      case 'pokemon':
        return {
          className: 'object-center',
          style: { objectPosition: 'center center' },
        };
      case 'mu':
        return {
          className: 'object-right',
          style: { objectPosition: 'right center' },
        };
    }
  };

  return (
    <section id="jogos" className="py-20 sm:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs tracking-wider text-[var(--theme-primary)] font-mono mb-3">
              <span>GALERIA INTERATIVA DE JOGOS</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-400">PASSE O MOUSE OU CLIQUE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
              Três reinos. Uma única janela.
            </h2>
            <p className="mt-3 text-base text-neutral-300 font-light">
              Passe o mouse ou toque para expandir a cortina de cada jogo e explorar screenshots, trailers e rates ao vivo.
            </p>
          </div>

          {/* Quick Tab Selector */}
          <div className="flex items-center p-1 bg-neutral-900/80 border border-white/10 rounded-xl self-start md:self-auto">
            {games.map((game) => {
              const isActive = activeCurtainId === game.id;
              return (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => handleCurtainClick(game.id)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 ${
                    isActive
                      ? 'theme-btn-primary font-semibold shadow-lg'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded bg-black/40">
                    {game.iconSymbol}
                  </span>
                  <span>{game.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic Curtain Stage (Fixed 720px on desktop for rock-solid stability) */}
        <div className="mt-10">
          <div className="flex flex-col lg:flex-row h-auto lg:h-[720px] rounded-3xl overflow-hidden border border-white/10 bg-neutral-950 shadow-2xl shadow-black/80 relative">
            {games.map((game) => {
              const isExpanded = activeCurtainId === game.id;
              const currentMedia = game.mediaItems[selectedMediaIndices[game.id] || 0] || game.mediaItems[0];
              const hasLogoError = logoErrors[game.id];

              return (
                <div
                  key={game.id}
                  onClick={() => !isExpanded && handleCurtainClick(game.id)}
                  onMouseEnter={() => {
                    if (window.innerWidth >= 1024 && !isExpanded) {
                      handleCurtainHover(game.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth >= 1024) {
                      handleCurtainLeave();
                    }
                  }}
                  className={`relative h-full transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden select-none ${
                    isExpanded
                      ? 'lg:flex-[4.5] flex-1 bg-neutral-900/75 cursor-default'
                      : 'lg:flex-[1] py-8 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/[0.08] hover:bg-white/[0.04] cursor-pointer'
                  }`}
                >
                  {/* Background Artwork / Video Layer aligned specifically: Left (Ragnarok), Center (Pokemon), Right (MU) */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {game.videoUrl ? (
                      <CurtainVideoBackground
                        gameId={game.id}
                        videoUrl={game.videoUrl}
                        isExpanded={isExpanded}
                        poster={game.bannerImage || '/bg1.png'}
                      />
                    ) : (
                      <img
                        src="/bg1.png"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.endsWith('/hero-bg.svg')) {
                            target.src = '/hero-bg.svg';
                          }
                        }}
                        alt={game.title}
                        style={getGameArtPosition(game.id).style}
                        className={`w-full h-full object-cover ${getGameArtPosition(game.id).className} filter contrast-115 transition-all duration-1000 ${
                          isExpanded
                            ? 'opacity-40 scale-100'
                            : 'opacity-20 grayscale scale-105 hover:grayscale-0 hover:opacity-35'
                        }`}
                      />
                    )}

                    {/* Gradient color tint */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${game.accentGradient} opacity-50`}
                    />

                    {/* Atmospheric Dark Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-transparent to-neutral-950/90" />
                  </div>

                  {/* ========================================================
                      STATE 1: COMPRESSED / CLOSED CURTAIN (Logo & Title)
                      ======================================================== */}
                  <div
                    className={`absolute inset-0 z-10 flex lg:flex-col items-center justify-between p-6 sm:p-7 transition-all duration-400 ease-out ${
                      isExpanded
                        ? 'opacity-0 pointer-events-none -translate-x-6'
                        : 'opacity-100 pointer-events-auto translate-x-0 delay-150'
                    }`}
                  >
                    {/* Top: Dedicated Game Logo Slot */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center p-2.5 bg-black/60 border border-white/10 backdrop-blur-md shadow-lg group-hover:border-white/25 transition-all shrink-0">
                      {!hasLogoError ? (
                        <img
                          src={game.logoImage}
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (game.altLogoImage && !target.src.includes(game.altLogoImage)) {
                              target.src = game.altLogoImage;
                            } else {
                              handleLogoError(game.id);
                            }
                          }}
                          alt={`Logo ${game.title}`}
                          className="max-w-full max-h-full object-contain filter drop-shadow"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <span
                            className="font-display font-black text-xl tracking-wider text-transparent bg-clip-text"
                            style={{
                              backgroundImage: `linear-gradient(135deg, #ffffff 30%, ${game.glowColor} 100%)`,
                            }}
                          >
                            {game.iconSymbol}
                          </span>
                          <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
                            GAME
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Middle: Rotated Vertical Game Title */}
                    <div className="lg:[writing-mode:vertical-rl] lg:rotate-180 text-center tracking-wider font-display font-bold text-white text-base lg:text-lg drop-shadow opacity-80 hover:opacity-100 transition-opacity my-4">
                      {game.title}
                    </div>

                    {/* Bottom: Genre Badge & Expand Prompt */}
                    <div className="flex flex-col items-center gap-2.5">
                      <span className="hidden lg:inline-block text-[10px] font-mono text-neutral-300 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-center whitespace-nowrap">
                        {game.badgeGenre}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white group-hover:bg-white/10 transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* ========================================================
                      STATE 2: EXPANDED STUDIO (Interactive Stage)
                      ======================================================== */}
                  <div
                    className={`z-10 w-full h-full flex flex-col justify-between p-5 sm:p-7 lg:p-8 overflow-hidden transition-all duration-500 ease-out ${
                      isExpanded
                        ? 'opacity-100 pointer-events-auto translate-x-0 delay-200 relative'
                        : 'opacity-0 pointer-events-none translate-x-6 absolute inset-0'
                    }`}
                  >
                      {/* Top Header Row: Unified Title + Badges + Right-Aligned Play Button */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-white/[0.08]">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight drop-shadow-md leading-tight">
                            {game.title}
                          </h3>
                          <div className="text-xs sm:text-sm text-neutral-300 font-light mt-0.5">
                            {game.subtitle}
                          </div>
                        </div>

                        {/* Top-Right Play CTA: Direct play URL or smooth fallback */}
                        <a
                          href={game.playUrl || '#servidores'}
                          target={game.playUrl ? '_blank' : undefined}
                          rel={game.playUrl ? 'noopener noreferrer' : undefined}
                          className="self-start md:self-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl theme-btn-primary text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xl shrink-0"
                        >
                          <span>Jogar no Navegador</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Main Dual Grid: Info Details (Left) & Media Showcase (Right) */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 my-auto py-2 items-start w-full min-w-0">
                        {/* Left Column (5 cols): Description + System Highlights + Rates */}
                        <div className="lg:col-span-5 space-y-3 min-w-0 flex flex-col">
                          {/* Header bar aligned with right column tabs (both height h-9) */}
                          <div className="flex items-center gap-2 h-9 text-xs font-mono text-[var(--theme-primary)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)]" />
                            <span className="uppercase tracking-wider font-semibold">Resumo do Universo</span>
                          </div>

                          {/* Overview paragraph: locked height with line-clamp to guarantee 0 layout shifting */}
                          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm h-[76px] flex items-center overflow-hidden">
                            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light line-clamp-3">
                              {game.overview}
                            </p>
                          </div>

                          {/* Systems & Mechanics Cards */}
                          <div className="space-y-1.5 pt-1">
                            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                              Destaques e Sistemas:
                            </div>
                            <div className="space-y-1.5">
                              {game.keyMechanics.slice(0, 3).map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs hover:border-white/15 transition-colors"
                                >
                                  <div className="font-semibold text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)]" />
                                    <span>{item.title}</span>
                                  </div>
                                  <p className="text-neutral-400 text-[11px] mt-0.5 line-clamp-1 font-light">
                                    {item.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Rates Badges */}
                          <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                            <span className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-neutral-200 whitespace-nowrap">
                              ⚡ Exp: {game.specs.rateExp}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-neutral-200 whitespace-nowrap">
                              💎 Drop: {game.specs.rateDrop}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-neutral-300 whitespace-nowrap">
                              📱 Cross-Play
                            </span>
                          </div>
                        </div>

                        {/* Right Column (7 cols): Screenshots & Gameplay Teaser */}
                        <div className="lg:col-span-7 flex flex-col space-y-3 min-w-0">
                          {/* Media Tab Header Selector: height matches left column header (h-9) */}
                          <div className="flex items-center justify-between h-9">
                          <div className="flex items-center gap-1 p-1 bg-black/60 border border-white/10 rounded-xl text-xs font-mono">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMediaTab('screenshots');
                                  setIsPlayingTrailer(false);
                                }}
                                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                                  activeMediaTab === 'screenshots'
                                    ? 'bg-white/15 text-white font-semibold shadow'
                                    : 'text-neutral-400 hover:text-white'
                                }`}
                              >
                                <ImageIcon className="w-3.5 h-3.5" />
                                <span>Screenshots ({game.mediaItems.length})</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMediaTab('trailer');
                                  setIsPlayingTrailer(true);
                                }}
                                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                                  activeMediaTab === 'trailer'
                                    ? 'bg-white/15 text-white font-semibold shadow'
                                    : 'text-neutral-400 hover:text-white'
                                }`}
                              >
                                <Film className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                                <span>Gameplay Teaser</span>
                              </button>
                            </div>

                            {activeMediaTab === 'trailer' && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSoundEnabled(!soundEnabled);
                                }}
                                className="p-2 rounded-xl bg-black/60 border border-white/10 text-neutral-300 hover:text-white text-xs transition-colors"
                                title="Controle de áudio"
                              >
                                {soundEnabled ? (
                                  <Volume2 className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                                ) : (
                                  <VolumeX className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}
                          </div>

                          {/* 16:9 Cinematic Video / Screenshot Frame */}
                          <div
                            onClick={() => {
                              if (activeMediaTab === 'screenshots') {
                                setIsLightboxOpen(true);
                              }
                            }}
                            className={`relative rounded-2xl overflow-hidden border border-white/15 bg-black/90 aspect-video flex items-center justify-center group/display shadow-2xl shadow-black/90 ${
                              activeMediaTab === 'screenshots' ? 'cursor-zoom-in' : ''
                            }`}
                          >
                            {/* Mode A: Screenshots */}
                            {activeMediaTab === 'screenshots' ? (
                              <>
                                <img
                                  src={currentMedia.image}
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    if (!target.src.endsWith('/bg1.png')) {
                                      target.src = '/bg1.png';
                                    }
                                  }}
                                  alt={currentMedia.title}
                                  style={currentMedia.image.includes('bg1.png') ? getGameArtPosition(game.id).style : undefined}
                                  className={`w-full h-full object-cover ${
                                    currentMedia.image.includes('bg1.png') ? getGameArtPosition(game.id).className : 'object-center'
                                  } transition-transform duration-700 group-hover/display:scale-105`}
                                />

                                {/* Fullscreen Zoom Trigger Button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsLightboxOpen(true);
                                  }}
                                  title="Ver em tela cheia"
                                  aria-label="Abrir imagem em tela cheia"
                                  className="absolute top-3 right-3 z-20 p-2 rounded-xl bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 backdrop-blur-md opacity-0 group-hover/display:opacity-100 transition-all hover:scale-105 shadow-xl"
                                >
                                  <Maximize2 className="w-4 h-4" />
                                </button>

                                {/* Caption Gradient Scrim */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5 pointer-events-none">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--theme-primary)]/20 text-[var(--theme-primary-light)] border border-[var(--theme-primary)]/30 font-semibold">
                                      {currentMedia.tag}
                                    </span>
                                    <span className="text-xs sm:text-sm font-semibold text-white drop-shadow">
                                      {currentMedia.title}
                                    </span>
                                  </div>
                                  <p className="text-[11px] sm:text-xs text-neutral-300 font-light line-clamp-1">
                                    {currentMedia.caption}
                                  </p>
                                </div>
                              </>
                            ) : (
                              /* Mode B: Real Video Player or Gameplay Teaser Simulator */
                              (() => {
                                const parsedVideo = parseVideoSource(game.videoUrl);

                                if (parsedVideo?.isIframe) {
                                  return (
                                    <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
                                      <iframe
                                        src={parsedVideo.embedUrl}
                                        title={`${game.title} Gameplay Video`}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                      />
                                    </div>
                                  );
                                }

                                if (parsedVideo?.isDirectVideo) {
                                  return (
                                    <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
                                      <video
                                        src={parsedVideo.embedUrl}
                                        controls
                                        autoPlay={isPlayingTrailer}
                                        muted={!soundEnabled}
                                        playsInline
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  );
                                }

                                return (
                                  <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-br from-neutral-950 to-neutral-900">
                                    {/* Simulated Game Scene */}
                                    <div className="absolute inset-0 z-0">
                                      <img
                                        src="/bg1.png"
                                        onError={(e) => {
                                          const target = e.currentTarget;
                                          if (!target.src.endsWith('/hero-bg.svg')) {
                                            target.src = '/hero-bg.svg';
                                          }
                                        }}
                                        alt=""
                                        style={getGameArtPosition(game.id).style}
                                        className={`w-full h-full object-cover ${getGameArtPosition(game.id).className} filter contrast-125 transition-transform duration-1000 ${
                                          isPlayingTrailer ? 'scale-110' : 'scale-100'
                                        }`}
                                      />
                                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                                    </div>

                                    {/* Video Status Bar */}
                                    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white">
                                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/90 font-bold uppercase tracking-wider text-[10px] shadow">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                        <span>LIVE WEBGL</span>
                                      </span>
                                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md">
                                        60 FPS · 1080p
                                      </span>
                                    </div>

                                    {/* Center Play / Pause trigger */}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsPlayingTrailer(!isPlayingTrailer);
                                      }}
                                      className="relative z-10 self-center w-14 h-14 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all hover:scale-110 shadow-2xl"
                                    >
                                      {isPlayingTrailer ? (
                                        <Pause className="w-6 h-6 fill-current" />
                                      ) : (
                                        <Play className="w-6 h-6 fill-current ml-0.5" />
                                      )}
                                    </button>

                                    {/* Bottom Video Timeline */}
                                    <div className="relative z-10 flex items-center gap-3">
                                      <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full bg-[var(--theme-primary)] transition-all ${
                                            isPlayingTrailer ? 'w-3/4 duration-1000' : 'w-1/4'
                                          }`}
                                        />
                                      </div>
                                      <span className="text-[10px] font-mono text-neutral-300">
                                        00:45 / 01:20
                                      </span>
                                    </div>
                                  </div>
                                );
                              })()
                            )}
                          </div>

                          {/* Thumbnail Switchers (for Screenshots mode) */}
                          {activeMediaTab === 'screenshots' && (
                            <div className="grid grid-cols-3 gap-2.5">
                              {game.mediaItems.map((media, idx) => {
                                const isSelected = (selectedMediaIndices[game.id] || 0) === idx;
                                return (
                                  <button
                                    key={media.id}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setGameMediaIndex(game.id, idx);
                                    }}
                                    className={`relative rounded-xl overflow-hidden aspect-video border transition-all ${
                                      isSelected
                                        ? 'border-[var(--theme-primary)] ring-2 ring-[var(--theme-primary)]/50 scale-[1.02] shadow-md'
                                        : 'border-white/10 opacity-60 hover:opacity-100'
                                    }`}
                                  >
                                    <img
                                      src={media.image}
                                      onError={(e) => {
                                        const target = e.currentTarget;
                                        if (!target.src.endsWith('/bg1.png')) {
                                          target.src = '/bg1.png';
                                        }
                                      }}
                                      alt={media.title}
                                      className="w-full h-full object-cover object-center"
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                    <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-white drop-shadow truncate max-w-[90%]">
                                      {media.tag}
                                    </span>

                                    {/* 3.5s Progress indicator line on the active thumbnail */}
                                    {isSelected && (
                                      <div className="absolute top-0 left-0 right-0 h-1 bg-black/50 overflow-hidden z-10 pointer-events-none">
                                        <div
                                          key={`${game.id}-${idx}-${selectedMediaIndices[game.id] || 0}`}
                                          className="h-full bg-[var(--theme-primary)] animate-carousel-progress"
                                        />
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bottom Footer Info Row */}
                      <div className="shrink-0 mt-3 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-white font-medium">
                            {game.specs.activePlayers}
                          </span>
                        </div>

                        <div className="hidden sm:block text-[var(--theme-primary-light)] font-sans italic text-xs">
                          {game.loreQuote}
                        </div>
                      </div>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Fechar tela cheia"
              className="absolute -top-12 right-0 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-110 shadow-xl"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large High-Res Image Display */}
            {(() => {
              const activeGame = games.find((g) => g.id === activeCurtainId) || games[0];
              const activeImage =
                activeGame.mediaItems[selectedMediaIndices[activeGame.id] || 0] || activeGame.mediaItems[0];
              return (
                <>
                  <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black max-w-full max-h-[75vh]">
                    <img
                      src={activeImage.image}
                      alt={activeImage.title}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith('/bg1.png')) {
                          target.src = '/bg1.png';
                        }
                      }}
                      className="w-full h-auto max-h-[75vh] object-contain"
                    />
                  </div>

                  {/* Bottom Metadata Bar */}
                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 w-full px-2 text-white">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--theme-primary)]/20 text-[var(--theme-primary-light)] border border-[var(--theme-primary)]/30 font-semibold">
                        {activeImage.tag}
                      </span>
                      <h4 className="text-base font-bold font-display">{activeImage.title}</h4>
                    </div>
                    <p className="text-xs text-neutral-300 font-light max-w-md text-center sm:text-right">
                      {activeImage.caption}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
