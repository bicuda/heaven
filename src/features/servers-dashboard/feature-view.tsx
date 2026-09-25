import {
  Flame,
  Clock,
  MapPin,
  Trophy,
  ArrowUpRight,
  RefreshCw,
  Radio,
  Zap,
  Swords,
  Sparkles,
  Gem,
  Shield,
} from 'lucide-react';
import type { ServersDashboardProps } from './feature-types';
import { useServersStatus } from './feature-logic';

export function ServersDashboard({ onSelectGameToPlay }: ServersDashboardProps) {
  const {
    events,
    activeEventFilter,
    setActiveEventFilter,
    liveDrops,
    metrics,
    isTestingPing,
    currentPing,
    runLivePingTest,
    formatCountdown,
  } = useServersStatus();

  const filteredEvents =
    activeEventFilter === 'all'
      ? events
      : events.filter((e) => e.gameId === activeEventFilter);

  const renderMetricIcon = (id: string) => {
    switch (id) {
      case 'monsters':
        return <Swords className="w-4 h-4 text-[var(--theme-primary)]" />;
      case 'market':
        return <Gem className="w-4 h-4 text-cyan-400" />;
      case 'guilds':
        return <Shield className="w-4 h-4 text-amber-400" />;
      case 'zero-install':
        return <Zap className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-neutral-400" />;
    }
  };


  return (
    <section id="servidores" className="py-20 sm:py-28 relative z-10 border-t border-white/[0.08] overflow-hidden">
      {/* Deep atmospheric lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[var(--theme-glow)] opacity-15 blur-[150px] pointer-events-none" />

      {/* Atmospheric Tactical Grid (3.5% opacity) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 90%)',
        }}
      />

      {/* Monumental Arcane Rune / Celestial Astrolabe Watermark (5% opacity) */}
      <div className="absolute -right-28 top-8 w-[720px] h-[720px] pointer-events-none text-white opacity-[0.045] select-none">
        <svg viewBox="0 0 400 400" className="w-full h-full fill-none stroke-current stroke-[1.2]" aria-hidden="true">
          {/* Concentric rings & planetary paths */}
          <circle cx="200" cy="200" r="185" strokeDasharray="3 7" />
          <circle cx="200" cy="200" r="168" />
          <circle cx="200" cy="200" r="148" strokeWidth="0.8" strokeDasharray="14 4" />
          <circle cx="200" cy="200" r="115" strokeWidth="1" />
          <circle cx="200" cy="200" r="78" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="42" strokeWidth="1.2" strokeDasharray="6 3" />
          <circle cx="200" cy="200" r="14" />

          {/* Hexagram of ancient realms */}
          <polygon points="200,32 345,284 55,284" strokeWidth="0.9" />
          <polygon points="200,368 345,116 55,116" strokeWidth="0.9" />

          {/* Cardinal Axis Markers */}
          <line x1="200" y1="8" x2="200" y2="392" strokeWidth="0.7" strokeDasharray="3 6" />
          <line x1="8" y1="200" x2="392" y2="200" strokeWidth="0.7" strokeDasharray="3 6" />
          <line x1="68" y1="68" x2="332" y2="332" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="332" y1="68" x2="68" y2="332" strokeWidth="0.5" strokeDasharray="2 4" />

          {/* Glyph nodes */}
          <circle cx="200" cy="32" r="6" />
          <circle cx="200" cy="368" r="6" />
          <circle cx="345" cy="116" r="6" />
          <circle cx="55" cy="116" r="6" />
          <circle cx="345" cy="284" r="6" />
          <circle cx="55" cy="284" r="6" />
        </svg>
      </div>

      {/* Second Ancient Rune Seal on bottom left (3.5% opacity) */}
      <div className="absolute -left-36 -bottom-32 w-[640px] h-[640px] pointer-events-none text-[var(--theme-primary)] opacity-[0.035] select-none">
        <svg viewBox="0 0 300 300" className="w-full h-full fill-none stroke-current stroke-[1.2]" aria-hidden="true">
          <circle cx="150" cy="150" r="132" strokeDasharray="6 6" />
          <circle cx="150" cy="150" r="102" />
          <circle cx="150" cy="150" r="60" strokeDasharray="3 3" />
          <polygon points="150,18 264,150 150,282 36,150" strokeWidth="0.8" />
          <polygon points="150,42 240,150 150,258 60,150" strokeWidth="0.6" strokeDasharray="6 3" />
          <line x1="150" y1="0" x2="150" y2="300" strokeWidth="0.6" />
          <line x1="0" y1="150" x2="300" y2="150" strokeWidth="0.6" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================
            HEADER: LIVING MULTIVERSE IDENTITY & INTEGRATED TELEMETRY
            ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
              O pulso dos mundos agora.
            </h2>
            <p className="mt-3 text-base text-neutral-300 font-light leading-relaxed">
              Acontecendo ao vivo nos servidores oficiais: batalhas mundiais, drops raros forjados e a economia em movimento contínuo no seu navegador.
            </p>
          </div>

          {/* Integrated Console Telemetry */}
          <div className="flex items-center gap-2.5 bg-neutral-950/80 border border-white/10 rounded-2xl p-1.5 backdrop-blur-md">
            <div className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="text-xs font-mono">
                <span className="text-neutral-400">Latência SP: </span>
                <span className="text-emerald-400 font-bold font-mono-num">{currentPing} ms</span>
              </div>
            </div>

            <button
              type="button"
              onClick={runLivePingTest}
              disabled={isTestingPing}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-neutral-200 transition-all hover:text-white disabled:opacity-50 group"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[var(--theme-primary)] ${isTestingPing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
              <span>{isTestingPing ? 'Medindo...' : 'Testar Ping'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TELEMETRIA & DROPS UNIFICADOS (Informações soltas e abertas)
            (Sem caixas pesadas envolventes - visual despojado e limpo)
            ======================================================== */}
        <div className="mt-8 border-y border-white/[0.08] divide-y divide-white/[0.08]">
          {/* Métricas Globais Abertas (Zero caixas/cards pesados) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] py-6 sm:py-7">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="px-4 sm:px-6 py-4 sm:py-0 flex flex-col justify-between group transition-colors"
              >
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-[var(--theme-primary)]/40 group-hover:bg-white/[0.07] transition-all">
                    {renderMetricIcon(metric.id)}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-neutral-400 group-hover:text-neutral-200 transition-colors">
                    <span className="w-1 h-1 rounded-full bg-[var(--theme-primary)]" />
                    {metric.trend}
                  </span>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-mono-num tracking-tight group-hover:text-[var(--theme-primary-light)] transition-colors">
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-neutral-200 mt-1">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-light mt-0.5">
                    {metric.subtext}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Faixa Contínua de Drops ao Vivo Integrada */}
          <div className="py-3 flex items-center relative overflow-hidden select-none">
            {/* Pinned Left HUD Badge */}
            <div className="shrink-0 flex items-center gap-2.5 pl-2 pr-6 z-10 bg-gradient-to-r from-[var(--theme-bg-canvas)] via-[var(--theme-bg-canvas)] to-transparent">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase whitespace-nowrap">
                Drops ao Vivo
              </span>
            </div>

            {/* Continuous HUD Marquee Stream */}
            <div className="overflow-hidden flex-1 relative">
              <div className="animate-hud-ticker flex items-center gap-6 py-0.5">
                {[...liveDrops, ...liveDrops].map((drop, idx) => {
                  const rarityColor =
                    drop.rarity === 'Lendário'
                      ? 'text-amber-300 font-bold'
                      : drop.rarity === 'Mítico'
                      ? 'text-purple-300 font-bold'
                      : drop.rarity === 'Shiny'
                      ? 'text-cyan-300 font-bold'
                      : 'text-neutral-300';

                  return (
                    <div
                      key={`${drop.id}-${idx}`}
                      className="flex items-center gap-2 text-xs text-neutral-300 whitespace-nowrap font-mono hover:text-white transition-colors cursor-default"
                    >
                      <span className="text-base select-none">{drop.icon}</span>
                      <span className="text-white font-semibold">@{drop.playerName}</span>
                      <span className="text-neutral-300">{drop.title}</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-neutral-400">[{drop.gameTitle}]</span>
                      <span className="text-neutral-600">·</span>
                      <span className={rarityColor}>{drop.rarity}</span>
                      <span className="text-neutral-500 text-[11px]">({drop.timestamp})</span>
                      <span className="text-neutral-700 ml-4 font-normal">//</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 3: GLOBAL EVENTS HUD (5 Distinctive Artistic Modes)
            ======================================================== */}
        <div className="mt-14">
          {/* Section Subheader & Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--theme-primary)] mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>OPERAÇÕES & EVENTOS GLOBAIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Disputas ativas e torneios no multiverso
              </h3>
            </div>

            {/* Event Filter Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-neutral-900/80 border border-white/10 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveEventFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeEventFilter === 'all'
                    ? 'bg-white/15 text-white font-bold shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Todos (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveEventFilter('ragnarok')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeEventFilter === 'ragnarok'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Ragnarok
              </button>
              <button
                type="button"
                onClick={() => setActiveEventFilter('pokemon')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeEventFilter === 'pokemon'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Pokémon
              </button>
              <button
                type="button"
                onClick={() => setActiveEventFilter('mu')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeEventFilter === 'mu'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                MU Online
              </button>
            </div>
          </div>

          {/* ========================================================
              DEFINITIVE PRODUCTION LAYOUT: AO VIVO + TIMELINE
              Elevated, atmospheric, zero AI-slop
              ======================================================== */}
          <div className="space-y-6">
            {/* Primary Live Event (or first filtered event if filter active) */}
            {(() => {
              const liveEvt =
                filteredEvents.find((e) => e.status === 'active') || filteredEvents[0];
              if (!liveEvt) {
                return (
                  <div className="p-8 rounded-2xl bg-neutral-950/60 border border-white/10 text-center text-neutral-400 font-mono text-sm">
                    Nenhuma operação ativa encontrada para o filtro selecionado.
                  </div>
                );
              }
              const upcomingEvents = filteredEvents.filter((e) => e.id !== liveEvt.id);
              const isLive = liveEvt.status === 'active';

              return (
                <>
                  {/* Top Panoramic Widescreen Stage */}
                  <div className="relative rounded-3xl border border-rose-500/40 bg-neutral-950 p-6 sm:p-10 overflow-hidden shadow-2xl shadow-rose-950/40">
                    {/* Atmospheric artwork backdrop with deep cinematic gradient masks */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
                      <img
                        src={liveEvt.bgArtwork}
                        alt=""
                        className="w-full h-full object-cover object-center filter brightness-90 contrast-125"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60" />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                      {/* Left: Tactical Briefing & Genuine Game Drops */}
                      <div className="max-w-3xl">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="px-2.5 py-0.5 rounded-md bg-black/80 border border-white/15 text-xs font-mono uppercase text-neutral-200 font-semibold tracking-wide">
                            {liveEvt.gameTitle}
                          </span>

                          <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                            {liveEvt.location}
                          </span>
                        </div>

                        <h4 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white font-display tracking-tight leading-[1.02] text-balance">
                          {liveEvt.title}
                        </h4>

                        <p className="mt-3 text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl">
                          {liveEvt.description}
                        </p>

                        {/* Drop Registry: Clean MMORPG Loot styling without generic pill badges */}
                        <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono">
                          <span className="text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Trophy className="w-3.5 h-3.5 text-amber-400" />
                            <span>ESPÓLIOS CONFIRMADOS:</span>
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            {liveEvt.rewards.map((reward, idx) => {
                              const rarityTag =
                                idx === 0
                                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                                  : idx === 1
                                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';

                              return (
                                <span
                                  key={reward}
                                  className={`px-3 py-1 rounded-lg border text-xs font-mono flex items-center gap-1.5 ${rarityTag}`}
                                >
                                  <Sparkles className="w-3 h-3 opacity-80" />
                                  <span>{reward}</span>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Right: Open Telemetry Timer & Command Action (No Box-in-a-Box) */}
                      <div className="shrink-0 flex flex-col items-start lg:items-end justify-center gap-3 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/10">
                        <div className="text-left lg:text-right">
                          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                            {isLive ? 'Janela de Invasão Restante:' : 'Início das Operações em:'}
                          </div>
                          <div className="text-5xl sm:text-6xl font-extrabold font-mono text-rose-400 tracking-wider tabular-nums drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                            {formatCountdown(liveEvt.countdownSeconds)}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onSelectGameToPlay(liveEvt.gameId)}
                          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-display text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl shadow-rose-950/80 hover:scale-[1.02] transition-all cursor-pointer"
                        >
                          <span>{isLive ? 'Entrar na Batalha Agora' : 'Mobilizar para o Evento'}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Mobilizations: Structured Expedition Dispatch Timeline */}
                  {upcomingEvents.length > 0 && (
                    <div className="mt-8">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>PRÓXIMAS MOBILIZAÇÕES AGENDADAS NO MULTIVERSO</span>
                        </div>
                        <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
                          CRONOGRAMA SINCRONIZADO COM SERVIDORES
                        </span>
                      </div>

                      <div className="space-y-3">
                        {upcomingEvents.map((evt) => (
                          <div
                            key={evt.id}
                            className="group relative rounded-2xl border border-white/[0.08] bg-neutral-950/70 hover:bg-neutral-900/90 hover:border-white/20 transition-all duration-300 p-5 sm:p-6 overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                          >
                            {/* Subtle backdrop glow artwork on hover */}
                            <div className="absolute inset-0 z-0 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                              <img
                                src={evt.bgArtwork}
                                alt=""
                                className="w-full h-full object-cover object-right filter brightness-75 contrast-125"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/50" />
                            </div>

                            {/* Left: Dispatch Time Marker & Mission Data */}
                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5 max-w-4xl">
                              {/* Countdown node with status */}
                              <div className="shrink-0 flex sm:flex-col items-center sm:items-start justify-between gap-1 sm:w-44 border-b sm:border-b-0 sm:border-r border-white/10 pb-3 sm:pb-0 sm:pr-4">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                                  <Clock className="w-3 h-3 text-amber-400" />
                                  INICIA EM:
                                </span>
                                <span className="text-xl sm:text-2xl font-mono font-extrabold text-amber-300 tracking-wider tabular-nums">
                                  {formatCountdown(evt.countdownSeconds)}
                                </span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-white/10 text-neutral-300 uppercase mt-0.5">
                                  {evt.gameTitle}
                                </span>
                              </div>

                              {/* Event Main Briefing */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h5 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight group-hover:text-[var(--theme-primary-light)] transition-colors">
                                    {evt.title}
                                  </h5>
                                </div>

                                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                                  <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                                  <span>{evt.location}</span>
                                  <span className="text-neutral-600">·</span>
                                  <span className="text-neutral-300 font-light truncate max-w-md">{evt.subtitle}</span>
                                </div>

                                <p className="text-xs sm:text-sm text-neutral-300 font-light line-clamp-1">
                                  {evt.description}
                                </p>

                                {/* Guaranteed Spoils line */}
                                <div className="mt-2 text-xs font-mono text-neutral-400 flex items-center gap-2">
                                  <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Recompensa:</span>
                                  <span className="text-neutral-200">✦ {evt.rewards.join(' · ')}</span>
                                </div>
                              </div>
                            </div>

                            {/* Right Action Button */}
                            <div className="relative z-10 shrink-0 flex items-center lg:justify-end">
                              <button
                                type="button"
                                onClick={() => onSelectGameToPlay(evt.gameId)}
                                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 text-white font-display text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:translate-x-0.5"
                              >
                                <span>Preparar Aventureiro</span>
                                <ArrowUpRight className="w-4 h-4 text-[var(--theme-primary-light)]" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}

