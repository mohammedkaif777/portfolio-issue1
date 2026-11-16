import React, { useState, useEffect } from 'react';
import { MultiverseTheme } from './types';
import { soundFx } from './utils/soundFx';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OriginStory } from './components/OriginStory';
import { Superpowers } from './components/Superpowers';
import { QuestArchive } from './components/QuestArchive';
import { CyberRunner } from './components/CyberRunner';
import { Experience } from './components/Experience';
import { EducationFlow } from './components/EducationFlow';
import { Certifications } from './components/Certifications';
import { SecretComms } from './components/SecretComms';
import { ResumeModal } from './components/ResumeModal';
import { BattleshipScroller } from './components/BattleshipScroller';

export default function App() {
  const [theme, setTheme] = useState<MultiverseTheme>('marvel');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeDecal, setActiveDecal] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // Initialize Sound preference
  useEffect(() => {
    setSoundEnabled(soundFx.isSoundOn());
  }, []);

  // Secret Easter Egg Key Listener: Typing "lotc" engages superhero celebration
  useEffect(() => {
    let keyBuffer = '';
    const onKey = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-4);
      if (keyBuffer === 'lotc') {
        soundFx.playVictory();
        triggerDecal('★ SECRET CODE: LORDS OF THE CODES! ★');
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#E62429', '#FFD200', '#0266B3', '#00D2FF'],
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleToggleSound = () => {
    const newState = soundFx.toggleSound();
    setSoundEnabled(newState);
    triggerDecal(newState ? 'SFX: ON!' : 'MUTED!');
  };

  const handleToggleTheme = () => {
    const nextTheme: MultiverseTheme = theme === 'marvel' ? 'dc' : 'marvel';
    setTheme(nextTheme);
    soundFx.playDimensionShift();
    triggerDecal(nextTheme === 'marvel' ? '★ MARVEL UNIVERSE! ★' : '🦇 DC GOTHAM NOIR! 🦇');
  };

  const triggerDecal = (text: string) => {
    setActiveDecal(text);
    setTimeout(() => {
      setActiveDecal(null);
    }, 1200);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isMarvel = theme === 'marvel';

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
      isMarvel ? 'halftone-marvel text-comic-ink' : 'halftone-dc text-dc-chalk'
    }`}>
      
      {/* Dynamic Pop-up Action Comic Decal */}
      {activeDecal && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-comic-bounce">
          <div className="bg-marvel-yellow text-comic-ink border-4 border-comic-ink font-bangers text-3xl sm:text-5xl px-8 py-3 shadow-comic-lg transform -rotate-3 uppercase tracking-wider select-none">
            💥 {activeDecal} 💥
          </div>
        </div>
      )}

      {/* Classified Resume Modal with Clean PDF Print */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        theme={theme}
      />

      {/* Comic Header Navigation & Controls */}
      <Header
        theme={theme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onToggleTheme={handleToggleTheme}
        onJumpToGame={() => scrollToSection('arcade')}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Animated Tactical Battleship Altitude Scroller */}
      <BattleshipScroller
        theme={theme}
        onTriggerDecal={triggerDecal}
      />

      {/* Main Comic Issue Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-12">
        
        {/* Cover Page: Hero Section */}
        <Hero
          theme={theme}
          onReadIssue={() => scrollToSection('origin')}
          onPlayGame={() => scrollToSection('arcade')}
          onOpenResume={() => setIsResumeOpen(true)}
          onTriggerDecal={triggerDecal}
        />

        {/* Chapter 1: 4-Panel Origin Story Comic Strip */}
        <OriginStory
          theme={theme}
          onTriggerDecal={triggerDecal}
        />

        {/* Chapter 2: 3-Tier Superpower Matrix */}
        <Superpowers
          theme={theme}
          onTriggerDecal={triggerDecal}
        />

        {/* Chapter 3: 4 Classified Project Missions (GitHub Dossiers & Patented IoT) */}
        <QuestArchive
          theme={theme}
          onTriggerDecal={triggerDecal}
        />

        {/* Chapter 4: The 2D Side-Scrolling Runner Mini-Game */}
        <CyberRunner
          theme={theme}
          onTriggerDecal={triggerDecal}
        />

        {/* Chapter 5: Dedicated Experience Section (TCS Systems Engineer) */}
        <Experience
          theme={theme}
          onTriggerDecal={triggerDecal}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Chapter 6: Linear Animated Education Flow (School -> Jr College -> College) */}
        <EducationFlow
          theme={theme}
          onTriggerDecal={triggerDecal}
        />

        {/* Chapter 7: Dedicated Certifications & Patents Showcase */}
        <Certifications
          theme={theme}
          onTriggerDecal={triggerDecal}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Chapter 8: Secret Comms & Encrypted Transmission Dispatch */}
        <SecretComms
          theme={theme}
          onTriggerDecal={triggerDecal}
          onOpenResume={() => setIsResumeOpen(true)}
        />

      </main>

      {/* Comic Book Footer */}
      <footer className={`border-t-4 border-comic-ink py-8 px-4 text-center font-comic transition-colors ${
        isMarvel ? 'bg-white text-gray-800' : 'bg-dc-dark text-gray-400'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="border-2 border-comic-ink bg-marvel-red text-white font-bangers text-sm px-2 py-0.5 shadow-comic-sm">
              ISSUE #1
            </span>
            <span className="font-bold">LORDS OF THE CODES</span>
            <span>• Mohammed Kaif Abdul Salam Tungekar</span>
          </div>
          <div>
            Borivali, Mumbai, India & Remote (The Underworld) • Type "LOTC" anywhere for secret Easter egg!
          </div>
        </div>
      </footer>
    </div>
  );
}
