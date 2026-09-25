import { Palette, X, Check, Sparkles, SlidersHorizontal } from 'lucide-react';
import type { ThemePaletteMenuProps, ThemePaletteId } from './feature-types';
import { THEME_PALETTES } from './feature-logic';

export function ThemePaletteModal({
  currentPaletteId,
  onSelectPalette,
  isOpen,
  onClose,
}: ThemePaletteMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090b14] border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/[0.06] border border-white/10 text-white">
              <Palette className="w-5 h-5 text-[var(--theme-primary)]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Estilo Visual & Paleta de Cores
              </h3>
              <p className="text-xs text-neutral-400 font-light">
                Selecione a atmosfera cromática que você mais gosta para personalizar o site.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fechar seletor de paleta"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Palette Grid */}
        <div className="p-6 overflow-y-auto space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {THEME_PALETTES.map((palette) => {
              const isSelected = currentPaletteId === palette.id;
              const [primaryColor, secondaryColor, bgColor] = palette.swatches;

              return (
                <div
                  key={palette.id}
                  onClick={() => onSelectPalette(palette.id)}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white/[0.08] border-[var(--theme-primary)] shadow-lg shadow-[var(--theme-primary-glow)] ring-1 ring-[var(--theme-primary)]'
                      : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.05)' : undefined,
                  }}
                >
                  <div>
                    {/* Top Row: Swatches & Selection Status */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-white/30 shadow-sm"
                          style={{ backgroundColor: primaryColor }}
                          title="Cor Primária"
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-white/30 shadow-sm"
                          style={{ backgroundColor: secondaryColor }}
                          title="Cor Secundária"
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-white/30 shadow-sm"
                          style={{ backgroundColor: bgColor }}
                          title="Fundo"
                        />
                      </div>

                      {isSelected ? (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-white font-mono px-2 py-0.5 rounded-full bg-[var(--theme-primary)] text-[var(--theme-contrast-text)]">
                          <Check className="w-3 h-3" />
                          <span>Ativo</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
                          Clique para ativar
                        </span>
                      )}
                    </div>

                    {/* Palette Title */}
                    <h4 className="text-sm font-bold text-white font-display flex items-center justify-between">
                      <span>{palette.name}</span>
                    </h4>

                    <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                      {palette.category}
                    </div>

                    <p className="mt-2 text-xs text-neutral-300 font-light leading-relaxed">
                      {palette.tagline}
                    </p>
                  </div>

                  {/* Visual Accent Bar */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>Amostra de Gradiente:</span>
                    <span
                      className="w-20 h-2.5 rounded-full shadow-sm"
                      style={{ background: palette.cssVars['--theme-gradient'] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
            <span>As cores são salvas no seu navegador.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 transition-colors shadow-md"
          >
            Concluir Escolha
          </button>
        </div>
      </div>
    </div>
  );
}

export function ThemePaletteFloatingTrigger({
  onOpen,
  currentPaletteName,
}: {
  onOpen: () => void;
  currentPaletteName: string;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={onOpen}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/15 hover:border-[var(--theme-primary)] shadow-2xl backdrop-blur-lg transition-all hover:scale-105 active:scale-95"
        title="Alterar paleta de cores do site"
      >
        <span
          className="w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px]"
          style={{
            backgroundColor: 'var(--theme-primary)',
            boxShadow: '0 0 10px var(--theme-primary)',
          }}
        />
        <Palette className="w-4 h-4 text-[var(--theme-primary)]" />
        <span className="text-xs font-medium font-sans">
          Mudar Cores
        </span>
        <span className="hidden sm:inline text-[11px] text-neutral-400 font-mono border-l border-white/10 pl-2">
          {currentPaletteName.split('/')[0].trim()}
        </span>
      </button>
    </div>
  );
}
