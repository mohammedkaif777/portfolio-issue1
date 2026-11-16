import React from 'react';
import { MultiverseTheme } from '../types';
import { Volume2, VolumeX, Sparkles, Gamepad2, FileText } from 'lucide-react';

interface HeaderProps {
  theme: MultiverseTheme;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onJumpToGame: () => void;
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  soundEnabled,
  onToggleSound,
  onToggleTheme,
  onJumpToGame,
  onOpenResume,
}) => {
  const isMarvel = theme === 'marvel';

  return (
    <header className={`sticky top-0 z-40 border-b-4 border-comic-ink shadow-md transition-colors ${
      isMarvel ? 'bg-white/95 text-comic-ink backdrop-blur' : 'bg-dc-dark/95 text-dc-chalk backdrop-blur'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Issue Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="border-4 border-comic-ink bg-marvel-red text-white font-bangers text-2xl px-3 py-0.5 shadow-comic-sm transform -rotate-2 select-none">
            ISSUE #1
          </div>
          <div>
            <div className="font-bangers text-2xl md:text-3xl tracking-wide flex items-center gap-2">
              <span className={isMarvel ? 'text-marvel-red' : 'text-dc-gold'}>LORDS OF THE CODES</span>
              <span className="text-[10px] font-arcade px-2 py-0.5 border-2 border-comic-ink bg-marvel-yellow text-comic-ink hidden sm:inline-block">
                {isMarvel ? 'MARVEL LIGHT' : 'DC GOTHAM'}
              </span>
            </div>
            <p className="text-xs font-comic opacity-80 -mt-1 hidden lg:block">
              Mohammed Kaif • Borivali, Mumbai & Remote (The Underworld)
            </p>
          </div>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden lg:flex items-center gap-1 font-bangers text-lg">
          <a href="#hero" className="px-2 py-1 hover:text-marvel-red transition-colors">COVER</a>
          <a href="#origin" className="px-2 py-1 hover:text-marvel-red transition-colors">ORIGIN</a>
          <a href="#superpowers" className="px-2 py-1 hover:text-marvel-red transition-colors">POWERS</a>
          <a href="#quests" className="px-2 py-1 hover:text-marvel-red transition-colors">MISSIONS</a>
          <a href="#arcade" className="px-2 py-1 text-amber-500 hover:text-marvel-red transition-colors flex items-center gap-1">
            <Gamepad2 className="w-4 h-4" /> GAME
          </a>
          <a href="#experience" className="px-2 py-1 hover:text-marvel-red transition-colors">EXPERIENCE</a>
          <a href="#education" className="px-2 py-1 hover:text-marvel-red transition-colors">EDUCATION</a>
          <a href="#certifications" className="px-2 py-1 hover:text-marvel-red transition-colors">HONORS</a>
          <a href="#comms" className="px-2 py-1 hover:text-marvel-red transition-colors">COMMS</a>
        </nav>

        {/* Controls HUD */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Classified Resume Button */}
          <button
            onClick={onOpenResume}
            className="comic-btn flex items-center gap-1.5 px-3 py-1 border-3 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-base shadow-comic-sm hover:bg-white"
            title="Open Classified Resume Dossier"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">RESUME</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`comic-btn flex items-center gap-1.5 px-3 py-1 border-3 border-comic-ink font-bangers text-base shadow-comic-sm ${
              soundEnabled ? 'bg-emerald-400 text-comic-ink' : 'bg-gray-400 text-gray-800'
            }`}
            title="Toggle Procedural Web Audio"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden xs:inline">{soundEnabled ? 'SFX: ON' : 'MUTED'}</span>
          </button>

          {/* Multiverse Theme Switcher (Marvel ⇄ DC) */}
          <button
            onClick={onToggleTheme}
            className={`comic-btn flex items-center gap-1.5 px-3 py-1 border-3 border-comic-ink font-bangers text-base shadow-comic-sm ${
              isMarvel
                ? 'bg-marvel-blue text-white hover:bg-marvel-red'
                : 'bg-dc-gold text-comic-ink hover:bg-white'
            }`}
            title="Switch Universe: Marvel (Light) / DC (Dark)"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isMarvel ? 'MARVEL (LIGHT)' : 'DC NOIR (DARK)'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
