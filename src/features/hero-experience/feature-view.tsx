import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Server } from 'lucide-react';
import type { HeroExperienceProps, UniversePillar, UniverseId } from './feature-types';
import { useHeroParallax } from './feature-logic';

/**
 * PillarCardVideo
 * Plays continuously in loop so realm cards stay dynamic.
 */
function PillarCardVideo({
  videoUrl,
  poster,
  isSelected,
  isHovered,
}: {
  videoUrl: string;
  poster: string;
  isSelected: boolean;
  isHovered: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <img
        src={poster}
        alt="Preview"
        className={`w-full h-full object-cover object-center transition-all duration-700 ease-out filter contrast-115 saturate-110 ${
          isSelected || isHovered
            ? 'opacity-85 scale-105'
            : 'opacity-55 scale-100'
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
      className={`w-full h-full object-cover object-center transition-all duration-700 ease-out filter contrast-115 saturate-110 ${
        isSelected || isHovered
          ? 'opacity-85 scale-105'
          : 'opacity-55 scale-100'
      }`}
    />
  );
}

const PILLARS: UniversePillar[] = [
  {
    id: 'ragnarok',
    name: 'Ragnarok Online',
    genre: 'MMORPG Idle Nórdico',
    tagline: 'O universo clássico de Midgard com progressão AFK contínua e drop de cartas.',
    accentColor: 'from-amber-500/20 to-amber-600/5 text-amber-300 border-amber-500/30',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    iconSymbol: '',
    keyFeature: 'Farm offline de cartas & MVPs',
    statusText: 'Alpha Fechado',
    bgImage: '/card-ragnarok.png',
    altBgImage: '/ard-ragnarok.png',
    videoUrl: '/videos/ragnarok-bg.mp4',
  },
  {
    id: 'pokemon',
    name: 'Pokémon Idle',
    genre: 'Monsters RPG Web',
    tagline: 'Captura, táticas de sinergia elemental e batalhas automáticas em tempo real.',
    accentColor: 'from-emerald-500/20 to-teal-600/5 text-emerald-300 border-emerald-500/30',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    iconSymbol: '',
    keyFeature: 'Caça a Shinies & IVs no browser',
    statusText: 'Beta Aberto',
    bgImage: '/card-pokemon.png',
    altBgImage: '/assets/card-pokemon.png',
    videoUrl: '/videos/pokemon-bg.mp4',
  },
  {
    id: 'mu',
    name: 'MU Online Web',
    genre: 'Dark Fantasy Web MMO',
    tagline: 'Asas +15, Blood Castle e Chaos Machine no PC ou smartphone em 60 FPS.',
    accentColor: 'from-purple-500/20 to-rose-600/5 text-purple-300 border-purple-500/30',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    iconSymbol: '',
    keyFeature: 'Cross-play PC e Celular',
    statusText: 'Season 2',
    bgImage: '/card-mu.png',
    altBgImage: '/assets/card-mu.png',
    videoUrl: '/videos/mu-bg.mp4',
  },
];

export function HeroExperience({
  activeUniverse,
  onSelectUniverse,
  onExploreGames,
  onViewServers,
  activeParticleHue = 270,
}: HeroExperienceProps) {
  const { mousePos, canvasRef } = useHeroParallax(activeUniverse, activeParticleHue);
  const [heroVideoError, setHeroVideoError] = useState(false);
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  const getThemeGlow = () => {
    switch (activeUniverse) {
      case 'ragnarok':
        return 'from-amber-500/10 via-amber-900/5 to-transparent';
      case 'pokemon':
        return 'from-emerald-500/10 via-emerald-950/5 to-transparent';
      case 'mu':
        return 'from-purple-600/10 via-rose-950/5 to-transparent';
      default:
        return 'from-[var(--theme-primary)]/10 via-transparent to-transparent';
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-20">
      {/* Background Artwork Layer (Single unified artwork bg1.png or ambient video) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          transform: `scale(1.04) translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`,
          transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 55%, rgba(0, 0, 0, 0.5) 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, rgba(0, 0, 0, 0.5) 80%, transparent 100%)',
        }}
      >
        {!heroVideoError ? (
          <video
            src="/videos/hero-ambient.mp4"
            autoPlay
            loop
            muted
            playsInline
            onError={() => setHeroVideoError(true)}
            poster="/bg1.png"
            className="w-full h-full object-cover object-center opacity-45 filter contrast-110 saturate-125"
          />
        ) : (
          <img
            src="/bg1.png"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith('/bg1.png')) {
                target.src = '/hero-bg.svg';
              }
            }}
            alt="Haven Games - Ragnarok, Pokémon e MU Online"
            className="w-full h-full object-cover object-center opacity-45 filter contrast-110 saturate-125"
          />
        )}

        {/* Ambient Dark Scrims ensuring high contrast and readable typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg-canvas)] via-[var(--theme-bg-canvas)]/60 to-[var(--theme-bg-canvas)]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-bg-canvas)]/70 via-transparent to-[var(--theme-bg-canvas)]/70" />
      </div>

      {/* Hero Bottom Feather: Seamless dissolve into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 sm:h-56 pointer-events-none z-[4] bg-gradient-to-t from-[var(--theme-bg-canvas)] via-[var(--theme-bg-canvas)]/80 to-transparent" />

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[1] opacity-75"
      />

      {/* Dynamic Ambient Gradient with Parallax */}
      <div
        className={`absolute inset-0 bg-radial transition-all duration-1000 pointer-events-none z-[1] ${getThemeGlow()}`}
        style={{
          transform: `translate(${mousePos.x * 14}px, ${mousePos.y * 14}px)`,
        }}
      />

      {/* Subtle Grid Perspective Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)]"
        style={{
          transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`,
        }}
      />

      {/* Content Container - Cohesive & standardized flow */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Editorial Subtitle / Kicker */}
        <div className="flex items-center gap-3 text-xs tracking-wider text-neutral-400 mb-4 font-mono">
          <span
            className="inline-block w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          />
          <span>HUB INDIE DE JOGOS WEB</span>
          <span aria-hidden="true">·</span>
          <span className="text-neutral-400">SEM DOWNLOAD</span>
          <span aria-hidden="true">·</span>
          <span style={{ color: 'var(--theme-primary-light)' }}>3 REINOS NATIVOS</span>
        </div>

        {/* Main Cinematic Title */}
        <div className="max-w-5xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-[1.05] text-balance font-display">
            A era de ouro dos clássicos,{' '}
            <span className="theme-gradient-text drop-shadow-sm">
              reimaginada no navegador.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-neutral-300 max-w-2xl leading-relaxed font-light">
            Esqueça instaladores de 20GB, patchers lentos e emuladores. Jogue <strong className="font-medium text-white">Ragnarok</strong>, <strong className="font-medium text-white">Pokémon</strong> e <strong className="font-medium text-white">MU Online</strong> com 1 clique direto no browser, no PC ou no celular.
          </p>

          {/* Primary Action Row */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onExploreGames}
              className="px-6 py-3.5 text-sm font-semibold rounded-xl theme-btn-primary flex items-center gap-2 group whitespace-nowrap cursor-pointer select-none shadow-lg"
            >
              <span>Ver os 3 Jogos</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onViewServers}
              className="px-6 py-3.5 text-sm font-medium text-neutral-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap hover:border-white/20 cursor-pointer select-none"
            >
              <Server className="w-4 h-4 text-[var(--theme-primary)]" />
              <span>Status dos Servidores</span>
            </button>
          </div>
        </div>

        {/* The 3 Realm Gateway Cards - Padronizados e integrados logo abaixo */}
        <div className="mt-11 sm:mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {PILLARS.map((pillar) => {
              const isSelected = activeUniverse === pillar.id;
              return (
                <div
                  key={pillar.id}
                  onClick={() => onSelectUniverse(pillar.id as UniverseId)}
                  onMouseEnter={() => setHoveredPillar(pillar.id)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  className={`group relative cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 border overflow-hidden ${
                    isSelected
                      ? `bg-white/[0.06] ${pillar.accentColor} shadow-[0_10px_35px_-5px] shadow-black/80 scale-[1.02]`
                      : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/20'
                  }`}
                >
                  {/* Card Custom Background Image / Video Layer */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {pillar.videoUrl ? (
                      <PillarCardVideo
                        videoUrl={pillar.videoUrl}
                        poster={pillar.bgImage}
                        isSelected={isSelected}
                        isHovered={hoveredPillar === pillar.id}
                      />
                    ) : (
                      <img
                        src={pillar.bgImage}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (pillar.altBgImage && !target.src.includes(pillar.altBgImage)) {
                            target.src = pillar.altBgImage;
                          } else if (!target.src.includes('/assets/')) {
                            target.src = `/assets${pillar.bgImage}`;
                          } else {
                            target.style.display = 'none';
                          }
                        }}
                        alt={pillar.name}
                        className="w-full h-full object-cover object-center opacity-45 group-hover:opacity-75 scale-100 group-hover:scale-105 transition-all duration-700 ease-out filter contrast-115 saturate-110"
                      />
                    )}

                    {/* Dark gradient scrims ensuring pristine readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/65 to-neutral-950/30" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                  </div>

                  {/* Card Content Layer */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[var(--theme-primary-light)] transition-colors font-display tracking-wide drop-shadow">
                        {pillar.name}
                      </h3>
                      <span className="text-[10px] text-neutral-300 font-mono px-2 py-0.5 rounded-md bg-black/60 border border-white/15 backdrop-blur-md">
                        {pillar.statusText}
                      </span>
                    </div>

                    <p className="mt-1 text-xs font-medium text-neutral-300 tracking-wide drop-shadow-sm">
                      {pillar.genre}
                    </p>

                    <p className="mt-2 text-xs sm:text-sm text-neutral-200 leading-relaxed font-light line-clamp-2 drop-shadow-sm">
                      {pillar.tagline}
                    </p>

                    {/* Interactive Action: Saber mais e ir para a galeria */}
                    <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-white group-hover:text-[var(--theme-primary-light)] font-medium flex items-center gap-1.5 transition-colors">
                        <span>Saber mais</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                      <span className="text-[10px] text-neutral-400 group-hover:text-neutral-200 transition-colors">
                        Galeria & Trailer ↓
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
