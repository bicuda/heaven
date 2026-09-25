import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import type { HeaderProps, NavItem } from './feature-types';
import { usePortalHeader } from './feature-logic';

const NAV_ITEMS: NavItem[] = [
  { id: 'jogos', label: 'Jogos', href: '#jogos' },
  { id: 'servidores', label: 'Servidores', href: '#servidores' },
  { id: 'comunidade', label: 'Comunidade', href: '#comunidade' },
];

export function PortalHeader({ activeSection, onNavigate }: HeaderProps) {
  const {
    isScrolled,
    mobileMenuOpen,
    setMobileMenuOpen,
    soundEnabled,
    toggleSound,
    playChime,
  } = usePortalHeader();

  const handleLinkClick = (id: string) => {
    playChime(523.25);
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--theme-bg-canvas)]/90 backdrop-blur-md border-b border-white/[0.07] py-3.5 shadow-2xl shadow-black/40'
          : 'bg-gradient-to-b from-[var(--theme-bg-canvas)]/80 via-[var(--theme-bg-canvas)]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className="text-lg md:text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-85 font-display flex items-center gap-2"
          >
            <span
              className="w-2.5 h-2.5 rounded-full transition-colors"
              style={{
                backgroundColor: 'var(--theme-primary)',
                boxShadow: '0 0 10px var(--theme-primary-glow)',
              }}
            />
            <span>HAVEN GAMES</span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`relative transition-colors duration-150 py-1 ${
                  activeSection === item.id
                    ? 'text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: 'var(--theme-gradient)' }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5">
            {/* Sound toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-200 transition-colors border border-white/10 hover:border-white/20 bg-white/[0.03]"
              title={soundEnabled ? 'Silenciar efeitos de áudio' : 'Ativar áudio ambiente'}
              aria-label="Controle de áudio"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[var(--theme-primary)]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white rounded-xl border border-white/10 bg-white/[0.03]"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070a12] border-b border-white/10 px-6 py-5 mt-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`py-2.5 border-b border-white/[0.04] flex items-center justify-between ${
                  activeSection === item.id ? 'text-[var(--theme-primary)] font-semibold' : 'text-neutral-300'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-neutral-600">→</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
