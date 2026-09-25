import { useState, useEffect } from 'react';
import { PortalHeader } from './features/portal-header';
import { HeroExperience, type UniverseId } from './features/hero-experience';
import { GamesShowcase } from './features/games-showcase';
import { ServersDashboard } from './features/servers-dashboard';
import { CommunityTerminal } from './features/community-terminal';
import { useThemePalette } from './features/theme-palette';

export default function App() {
  const [activeUniverse, setActiveUniverse] = useState<UniverseId>('all');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Dynamic Theme Palette Engine (locked to Titânio Sleek)
  const { activePalette } = useThemePalette();

  // Scroll listener to update active section in header
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['comunidade', 'servidores', 'jogos'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionId);
          return;
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectGameToPlay = (gameId: 'ragnarok' | 'pokemon' | 'mu') => {
    setActiveUniverse(gameId);
    handleNavigate('servidores');
  };

  return (
    <div className="min-h-screen bg-[var(--theme-bg-canvas)] text-neutral-100 flex flex-col relative selection:bg-white/10 selection:text-white transition-colors duration-500">
      {/* 3-Zone Portal Navigation */}
      <PortalHeader
        activeSection={activeSection}
        onNavigate={handleNavigate}
        activeUniverseTheme={activeUniverse}
        onThemeChange={(theme) => setActiveUniverse(theme)}
      />

      <main className="flex-1 flex flex-col">
        {/* Cinematic Hero with Background Art & 3-Realm Gateways */}
        <div id="hero">
          <HeroExperience
            activeUniverse={activeUniverse}
            onSelectUniverse={(universe) => {
              setActiveUniverse(universe);
              handleNavigate('jogos');
            }}
            onExploreGames={() => handleNavigate('jogos')}
            onViewServers={() => handleNavigate('servidores')}
            activeParticleHue={activePalette.particleHue}
          />
        </div>

        {/* 3 Primary Games Showcase (Clean & Punchy) */}
        <GamesShowcase
          selectedGameId={activeUniverse}
          onSelectGame={(id) => {
            setActiveUniverse(id as UniverseId);
          }}
        />

        {/* Live Servers Status Dashboard & Global Events (Ao Vivo + Timeline Refinado) */}
        <ServersDashboard
          onSelectGameToPlay={handleSelectGameToPlay}
        />

        {/* Community Terminal, Discord & Links */}
        <CommunityTerminal />
      </main>
    </div>
  );
}

