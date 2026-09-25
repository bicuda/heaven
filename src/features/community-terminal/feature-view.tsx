import { useState } from 'react';
import {
  MessageSquare,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Shield,
  FileText,
  Scale,
  Sparkles,
  X,
  Radio,
  ExternalLink,
} from 'lucide-react';
import type { LegalModalType } from './feature-types';
import {
  COMMUNITY_STATS,
  DISCORD_FEATURED_CHANNELS,
  LEGAL_DOCUMENTS,
} from './feature-logic';

export function CommunityTerminal() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  const activeDoc = activeLegalModal ? LEGAL_DOCUMENTS[activeLegalModal] : null;

  return (
    <section id="comunidade" className="pt-20 sm:pt-28 pb-8 sm:pb-10 relative z-10 border-t border-white/[0.06] overflow-hidden">
      {/* Background Matrix & Constellation Nodes */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle, white 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 15%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 15%, transparent 85%)',
        }}
      />

      {/* Massive Outer Valkyrie / Angelic Crest Watermark (4% opacity) */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[680px] h-[680px] pointer-events-none text-white opacity-[0.035] select-none">
        <svg viewBox="0 0 500 500" className="w-full h-full fill-none stroke-current stroke-[1.2]" aria-hidden="true">
          {/* Central Sacred Blade */}
          <line x1="250" y1="40" x2="250" y2="440" strokeWidth="1.5" />
          <polygon points="250,20 256,50 250,45 244,50" fill="currentColor" />
          <line x1="210" y1="130" x2="290" y2="130" strokeWidth="2" />
          <circle cx="250" cy="130" r="10" />
          <circle cx="250" cy="455" r="8" fill="currentColor" />

          {/* Majestic Archangel Wings Feathers (Stylized geometric) */}
          <path d="M 250 140 C 320 80, 420 90, 470 180 C 440 230, 390 260, 250 330" strokeWidth="1.2" />
          <path d="M 250 160 C 310 110, 390 120, 440 200 C 400 240, 360 270, 250 340" strokeWidth="1" strokeDasharray="6 3" />
          <path d="M 250 180 C 295 140, 365 150, 405 220 C 370 255, 335 280, 250 350" strokeWidth="0.8" />

          <path d="M 250 140 C 180 80, 80 90, 30 180 C 60 230, 110 260, 250 330" strokeWidth="1.2" />
          <path d="M 250 160 C 190 110, 110 120, 60 200 C 100 240, 140 270, 250 340" strokeWidth="1" strokeDasharray="6 3" />
          <path d="M 250 180 C 205 140, 135 150, 95 220 C 130 255, 165 280, 250 350" strokeWidth="0.8" />

          {/* Halo and Runes */}
          <circle cx="250" cy="130" r="55" strokeDasharray="4 4" />
          <circle cx="250" cy="130" r="75" strokeWidth="0.7" />
          <polygon points="250,65 306,162 194,162" strokeWidth="0.6" />
          <polygon points="250,195 306,98 194,98" strokeWidth="0.6" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Community Banner */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-b from-neutral-900/90 via-neutral-900/60 to-neutral-950 border border-white/[0.08] relative overflow-hidden shadow-2xl">
          {/* Watermark Crest inside Discord Banner (5.5% opacity) */}
          <div className="absolute -right-16 -bottom-16 w-[480px] h-[480px] pointer-events-none text-white opacity-[0.055] select-none">
            <svg viewBox="0 0 300 300" className="w-full h-full fill-none stroke-current stroke-[1.2]" aria-hidden="true">
              <circle cx="150" cy="150" r="135" strokeDasharray="4 6" />
              <circle cx="150" cy="150" r="115" strokeWidth="0.8" />
              <polygon points="150,30 245,195 55,195" strokeWidth="0.8" />
              <polygon points="150,270 245,105 55,105" strokeWidth="0.8" />
              <line x1="150" y1="15" x2="150" y2="285" strokeWidth="0.6" strokeDasharray="4 4" />
              <line x1="15" y1="150" x2="285" y2="150" strokeWidth="0.6" strokeDasharray="4 4" />
              <circle cx="150" cy="150" r="30" strokeWidth="1.2" />
            </svg>
          </div>

          {/* Subtle Background Glow */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Call to Action & Value Prop */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--theme-primary)] mb-3 tracking-wider">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-primary)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--theme-primary)]" />
                  </span>
                  <span>GUILDA & COMUNIDADE OFICIAL</span>
                  <span aria-hidden="true">·</span>
                  <span>DISCORD ABERTO</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
                  Junte-se a mais de 8.000 jogadores no Discord.
                </h2>

                <p className="mt-4 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                  Discuta táticas de builds, participe de votações de balanceamento de rates, negocie itens entre guildas e receba avisos em primeira mão sobre abertura de novos servidores.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-6 py-3.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-[#5865F2]/25 hover:shadow-[#5865F2]/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Entrar no Discord da Comunidade</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#jogos"
                  className="px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-medium text-sm transition-all flex items-center gap-2 hover:border-white/25"
                >
                  <Sparkles className="w-4 h-4 text-[var(--theme-primary)]" />
                  <span>Explorar Jogos</span>
                </a>
              </div>

              {/* Newsletter subscription */}
              <div className="mt-10 pt-8 border-t border-white/[0.08] max-w-xl">
                <div className="text-xs font-mono text-neutral-400 mb-3 flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Receber novidades sobre novas temporadas e eventos especiais:</span>
                </div>
                {subscribed ? (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-mono">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Inscrição confirmada! Você receberá os boletins de temporada em primeira mão.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Digite seu melhor e-mail..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-[var(--theme-primary)] focus:outline-none text-white text-xs placeholder:text-neutral-500 transition-colors"
                      required
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl theme-btn-primary text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shadow-md"
                    >
                      <span>Inscrever</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Live Discord Hub & Community Activity Widget (Hidden on mobile for clean UX, visible on desktop) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col gap-4">
              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl relative shadow-xl">
                {/* Header of the Discord mini-card */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5865F2] flex items-center justify-center text-white shadow-md">
                      <MessageSquare className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">Haven Community Hub</h4>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>1.428 online agora</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                    Oficial
                  </span>
                </div>

                {/* Featured Channels Preview */}
                <div className="mt-4 space-y-2">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Canais em Alta no Servidor:
                  </div>
                  {DISCORD_FEATURED_CHANNELS.map((ch) => (
                    <div
                      key={ch.name}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-colors group cursor-default"
                    >
                      <div>
                        <span className="font-mono text-xs font-semibold text-white group-hover:text-[var(--theme-primary)] transition-colors">
                          {ch.name}
                        </span>
                        <p className="text-[11px] text-neutral-400 font-light">{ch.desc}</p>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/40 text-neutral-400 border border-white/5">
                        {ch.badge}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Live Stats Grid */}
                <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-center">
                  {COMMUNITY_STATS.map((stat) => (
                    <div key={stat.label} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <div
                        className={`text-sm font-bold font-mono ${
                          stat.highlight ? 'text-emerald-400' : 'text-white'
                        }`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            STREAMLINED FOOTER
            ======================================================== */}
        <footer className="mt-12 pt-8 border-t border-white/[0.06]">
          {/* 4-Column Directory Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-white/[0.06] text-xs">
            {/* Col 1: Universos de Jogo */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider font-mono text-[11px] mb-3">
                Jogos
              </h5>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a href="#jogos" className="hover:text-white transition-colors">
                    Ragnarok Online (Midgard)
                  </a>
                </li>
                <li>
                  <a href="#jogos" className="hover:text-white transition-colors">
                    Pokémon Idle (Kanto a Sinnoh)
                  </a>
                </li>
                <li>
                  <a href="#jogos" className="hover:text-white transition-colors">
                    MU Online (Lorencia Web)
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 2: Comunidade & Eventos */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider font-mono text-[11px] mb-3">
                Comunidade
              </h5>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Discord Oficial (+8.000)</span>
                    <ExternalLink className="w-3 h-3 text-neutral-500" />
                  </a>
                </li>
                <li>
                  <a href="#servidores" className="hover:text-white transition-colors">
                    Horários de Guerra do Emperium
                  </a>
                </li>
                <li>
                  <a href="#servidores" className="hover:text-white transition-colors">
                    Invasões MVP & Blood Castle
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Segurança & Legal */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider font-mono text-[11px] mb-3">
                Segurança & Legal
              </h5>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('terms')}
                    className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Termos de Serviço (ToS)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('privacy')}
                    className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                  >
                    <Shield className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Política de Privacidade (LGPD)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('fairplay')}
                    className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                  >
                    <Scale className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Diretrizes de Fair Play</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Infraestrutura & Servidores */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider font-mono text-[11px] mb-3">
                Servidores
              </h5>
              <ul className="space-y-2 text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Cluster São Paulo (14ms)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Nuvem Virgínia (US East)</span>
                </li>
                <li className="text-neutral-500">Nativo no Browser (Sem Download)</li>
              </ul>
            </div>
          </div>

          {/* Trademarks & Legal Disclaimers (Compact & discreet) */}
          <div className="py-4 border-b border-white/[0.04] text-[10px] text-neutral-500 leading-relaxed font-light">
            <p>
              <strong className="text-neutral-400 font-medium">Aviso de Marcas:</strong>{' '}
              Ragnarok Online é marca registrada de Gravity Co., Ltd. Pokémon é marca registrada de Nintendo, Creatures Inc. e Game Freak Inc. MU Online é marca registrada de Webzen Inc. 
              Haven Games é um projeto comunitário independente para navegadores modernos sem afiliação ou patrocínio oficial com os detentores das marcas. Todos os direitos e logos pertencem aos seus respectivos proprietários.
            </p>
          </div>

          {/* Bottom Copyright & Back to Top */}
          <div className="pt-4 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
            <div>
              © {new Date().getFullYear()} Haven Games. Feito para jogadores.
            </div>
            <a href="#hero" className="hover:text-neutral-300 transition-colors font-mono">
              Voltar ao Topo ↑
            </a>
          </div>
        </footer>
      </div>

      {/* ========================================================
          INTERACTIVE LEGAL MODAL
          ======================================================== */}
      {activeLegalModal && activeDoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLegalModal(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] rounded-3xl bg-neutral-950 border border-white/15 p-6 sm:p-8 flex flex-col shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--theme-primary)]">
                  <Shield className="w-3.5 h-3.5" />
                  <span>TRANSPARÊNCIA & REGRAS OFICIAIS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                  {activeDoc.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">{activeDoc.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-2 my-6 space-y-6 text-sm text-neutral-300 font-light leading-relaxed">
              {activeDoc.sections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-semibold text-white text-sm font-display mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)]" />
                    <span>{sec.heading}</span>
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{sec.content}</p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>{activeDoc.lastUpdated}</span>
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2 rounded-xl theme-btn-primary font-semibold text-xs text-white"
              >
                Entendi e Concordo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
