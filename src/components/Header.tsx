import React, { useState } from 'react';
import { MultiverseTheme } from '../types';
import { Volume2, VolumeX, Sparkles, Gamepad2, FileText, Menu, X, BookOpen, Zap, Briefcase, GraduationCap, Award, Mail } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isMarvel = theme === 'marvel';

  const navLinks = [
    { label: 'COVER', href: '#hero' },
    { label: 'ORIGIN', href: '#origin' },
    { label: 'POWERS', href: '#superpowers' },
    { label: 'MISSIONS', href: '#quests' },
    { label: 'GAME', href: '#arcade', special: true },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'EDUCATION', href: '#education' },
    { label: 'HONORS', href: '#certifications' },
    { label: 'COMMS', href: '#comms' },
  ];

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-40 border-b-4 border-comic-ink shadow-md transition-colors ${
      isMarvel ? 'bg-white/95 text-comic-ink backdrop-blur' : 'bg-dc-dark/95 text-dc-chalk backdrop-blur'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Issue Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="border-3 sm:border-4 border-comic-ink bg-marvel-red text-white font-bangers text-xl sm:text-2xl px-2.5 py-0.5 shadow-comic-sm transform -rotate-2 select-none">
            ISSUE #1
          </div>
          <div>
            <div className="font-bangers text-xl sm:text-2xl md:text-3xl tracking-wide flex items-center gap-1.5 sm:gap-2 leading-none">
              <span className={isMarvel ? 'text-marvel-red' : 'text-dc-gold'}>LORDS OF THE CODES</span>
              <span className="text-[9px] sm:text-[10px] font-arcade px-1.5 py-0.5 border-2 border-comic-ink bg-marvel-yellow text-comic-ink hidden xs:inline-block">
                {isMarvel ? 'MARVEL' : 'DC NOIR'}
              </span>
            </div>
            <p className="text-[11px] font-comic opacity-80 mt-0.5 hidden md:block">
              Mohammed Kaif • Borivali, Mumbai & Remote
            </p>
          </div>
        </div>

        {/* Desktop Navigation Anchors (Large Screens) */}
        <nav className="hidden xl:flex items-center gap-1 font-bangers text-base lg:text-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-2 py-1 transition-colors ${
                link.special 
                  ? 'text-amber-500 hover:text-marvel-red font-bold' 
                  : 'hover:text-marvel-red'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Controls HUD (Mobile & Desktop Accessible) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Resume Quick Button */}
          <button
            onClick={onOpenResume}
            className="comic-btn min-h-[38px] flex items-center gap-1 px-2.5 sm:px-3 py-1 border-2 sm:border-3 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-sm sm:text-base shadow-comic-sm hover:bg-white"
            title="Open Classified Resume Dossier"
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>RESUME</span>
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={onToggleSound}
            className={`comic-btn min-h-[38px] flex items-center justify-center gap-1 px-2.5 py-1 border-2 sm:border-3 border-comic-ink font-bangers text-sm sm:text-base shadow-comic-sm ${
              soundEnabled ? 'bg-emerald-400 text-comic-ink' : 'bg-gray-400 text-gray-800'
            }`}
            title="Toggle Procedural Web Audio"
            aria-label="Toggle Audio"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'SFX' : 'MUTE'}</span>
          </button>

          {/* Multiverse Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className={`comic-btn min-h-[38px] flex items-center gap-1 px-2.5 sm:px-3 py-1 border-2 sm:border-3 border-comic-ink font-bangers text-xs sm:text-sm shadow-comic-sm ${
              isMarvel
                ? 'bg-marvel-blue text-white hover:bg-marvel-red'
                : 'bg-dc-gold text-comic-ink hover:bg-white'
            }`}
            title="Switch Universe"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isMarvel ? 'MARVEL (LIGHT)' : 'DC (DARK)'}</span>
            <span className="md:hidden">{isMarvel ? 'MARVEL' : 'DC'}</span>
          </button>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="comic-btn xl:hidden min-h-[38px] min-w-[38px] flex items-center justify-center p-2 border-2 sm:border-3 border-comic-ink bg-comic-paper text-comic-ink font-bangers shadow-comic-sm"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-marvel-red" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div className={`xl:hidden border-t-3 border-comic-ink px-4 py-4 transition-colors animate-fadeIn ${
          isMarvel ? 'bg-white text-comic-ink' : 'bg-dc-card text-dc-chalk'
        }`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-bangers text-lg">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleMobileNavClick(link.href)}
                className={`comic-btn text-left p-2.5 rounded-lg border-2 border-comic-ink shadow-comic-sm flex items-center gap-1.5 ${
                  link.special
                    ? 'bg-marvel-yellow text-comic-ink font-bold'
                    : isMarvel
                      ? 'bg-comic-paper text-comic-ink hover:bg-amber-100'
                      : 'bg-dc-dark text-dc-chalk hover:bg-black'
                }`}
              >
                <span>★ {link.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-3 pt-3 border-t-2 border-comic-ink flex items-center justify-between text-xs font-comic font-bold opacity-80">
            <span>Issue #1 • Lords of the Codes</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="text-marvel-red underline font-bangers text-sm"
            >
              Open Classified Resume Dossier →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
