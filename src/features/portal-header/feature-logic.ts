import { useState, useEffect, useRef } from 'react';
import type { HeadlineFontOption } from './feature-types';

export const HEADLINE_FONTS: HeadlineFontOption[] = [
  { id: 'teko', name: 'Teko', family: "'Teko', sans-serif", category: 'Condensada / Impacto Máximo (Definida)' },
  { id: 'syne', name: 'Syne', family: "'Syne', sans-serif", category: 'Futurista / Avant-garde' },
  { id: 'unbounded', name: 'Unbounded', family: "'Unbounded', sans-serif", category: 'Gamer Moderna / Brutal' },
  { id: 'orbitron', name: 'Orbitron', family: "'Orbitron', sans-serif", category: 'Sci-Fi / E-Sports HUD' },
  { id: 'oxanium', name: 'Oxanium', family: "'Oxanium', sans-serif", category: 'MMORPG Tecnológico' },
  { id: 'cinzel', name: 'Cinzel', family: "'Cinzel', serif", category: 'Fantasia Épica / Medieval' },
  { id: 'space-grotesk', name: 'Space Grotesk', family: "'Space Grotesk', sans-serif", category: 'Tech Contemporâneo' },
  { id: 'chakra-petch', name: 'Chakra Petch', family: "'Chakra Petch', sans-serif", category: 'Mecha Tático / Cyber' },
  { id: 'russo-one', name: 'Russo One', family: "'Russo One', sans-serif", category: 'Maciça / Peso Pesado' },
  { id: 'audiowide', name: 'Audiowide', family: "'Audiowide', sans-serif", category: 'Arcade Anos 90' },
  { id: 'bebas-neue', name: 'Bebas Neue', family: "'Bebas Neue', sans-serif", category: 'Poster Clássico' },
  { id: 'righteous', name: 'Righteous', family: "'Righteous', sans-serif", category: 'Arcade Fluido' },
  { id: 'rajdhani', name: 'Rajdhani', family: "'Rajdhani', sans-serif", category: 'HUD Militar Limpo' },
  { id: 'michroma', name: 'Michroma', family: "'Michroma', sans-serif", category: 'Minimalista Widescreen' },
  { id: 'staatliches', name: 'Staatliches', family: "'Staatliches', sans-serif", category: 'Monumental Arquitetônica' },
  { id: 'sora', name: 'Sora', family: "'Sora', sans-serif", category: 'Gamer Clean Moderna' },
  { id: 'plus-jakarta', name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif", category: 'Clean Ultra-Legível' },
  { id: 'jetbrains-mono', name: 'JetBrains Mono', family: "'JetBrains Mono', monospace", category: 'Terminal / Código' },
];

const FONT_STORAGE_KEY = 'haven_selected_headline_font';

export function usePortalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [fontToast, setFontToast] = useState<{ name: string; category: string; index: number } | null>(null);
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Restore stored font preference on mount (defaults to Teko)
  useEffect(() => {
    try {
      const savedId = localStorage.getItem(FONT_STORAGE_KEY) || 'teko';
      const foundIdx = HEADLINE_FONTS.findIndex((f) => f.id === savedId);
      const activeIdx = foundIdx !== -1 ? foundIdx : 0;
      setCurrentFontIndex(activeIdx);
      document.documentElement.style.setProperty('--font-display', HEADLINE_FONTS[activeIdx].family);
    } catch {
      document.documentElement.style.setProperty('--font-display', HEADLINE_FONTS[0].family);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playChime = (freq: number = 440, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // AudioContext might be blocked or unavailable
    }
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const applyFont = (index: number) => {
    const font = HEADLINE_FONTS[index];
    document.documentElement.style.setProperty('--font-display', font.family);
    setCurrentFontIndex(index);
    try {
      localStorage.setItem(FONT_STORAGE_KEY, font.id);
    } catch {
      // Ignore
    }

    // Trigger toast notification
    setFontToast({
      name: font.name,
      category: font.category,
      index: index + 1,
    });

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setFontToast(null);
    }, 2800);
  };

  const cycleFont = () => {
    playChime(523.25); // high pitch chime feedback
    const nextIndex = (currentFontIndex + 1) % HEADLINE_FONTS.length;
    applyFont(nextIndex);
  };

  const selectFont = (index: number) => {
    playChime(587.33);
    applyFont(index);
    setIsFontMenuOpen(false);
  };

  return {
    isScrolled,
    mobileMenuOpen,
    setMobileMenuOpen,
    soundEnabled,
    toggleSound,
    playChime,
    currentFontIndex,
    currentFont: HEADLINE_FONTS[currentFontIndex],
    fontsList: HEADLINE_FONTS,
    cycleFont,
    selectFont,
    fontToast,
    isFontMenuOpen,
    setIsFontMenuOpen,
  };
}
