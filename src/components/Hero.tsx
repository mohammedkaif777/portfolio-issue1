import React from 'react';
import { MultiverseTheme } from '../types';
import { soundFx } from '../utils/soundFx';
import { Sparkles, Gamepad2, ArrowDown, Shield, Terminal, Cpu, Zap, Award, FileText, ExternalLink } from 'lucide-react';

interface HeroProps {
  theme: MultiverseTheme;
  onReadIssue: () => void;
  onPlayGame: () => void;
  onOpenResume: () => void;
  onTriggerDecal: (text: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  theme,
  onReadIssue,
  onPlayGame,
  onOpenResume,
  onTriggerDecal,
}) => {
  const isMarvel = theme === 'marvel';

  return (
    <section id="hero" className="relative pt-6 pb-16 overflow-hidden">
      
      {/* Comic Cover Outer Container Frame */}
      <div className={`comic-panel relative max-w-6xl mx-auto rounded-xl p-4 sm:p-8 md:p-10 transition-colors ${
        isMarvel ? 'bg-white text-comic-ink' : 'bg-dc-card text-dc-chalk'
      }`}>
        
        {/* Top Cover Bar: Issue Metas */}
        <div className="border-b-4 border-comic-ink pb-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          
          {/* Price & Date Box */}
          <div className="flex items-center gap-3">
            <div className="border-3 border-comic-ink bg-comic-paper text-comic-ink px-3 py-1 font-arcade text-xs shadow-comic-sm">
              <span className="block font-bold">$0.00 / FREE</span>
              <span className="text-[9px] text-gray-700">SPECIAL ISSUE #1</span>
            </div>
            <div className={`border-3 border-comic-ink px-3 py-1 font-bangers text-sm sm:text-base shadow-comic-sm transform -rotate-1 ${
              isMarvel ? 'bg-marvel-yellow text-comic-ink' : 'bg-dc-gold text-comic-ink'
            }`}>
              {isMarvel ? 'MARVEL LIGHT EDITION' : 'DC GOTHAM NOIR'}
            </div>
          </div>

          {/* Publisher Brand Ribbon */}
          <div className="font-bangers text-lg sm:text-2xl tracking-wider uppercase text-center flex items-center gap-2">
            <span className={isMarvel ? 'text-marvel-red' : 'text-dc-gold'}>
              ★ THE LORDS OF THE CODES MULTIVERSE ★
            </span>
          </div>

          {/* Comics Code Authority Seal */}
          <div className="border-3 border-comic-ink bg-comic-paper text-comic-ink p-1.5 rounded shadow-comic-sm text-center w-24">
            <span className="font-bangers text-[9px] block text-gray-700 leading-tight">APPROVED BY THE</span>
            <span className="font-bangers text-xs block text-marvel-red leading-none font-bold">COMICS CODE</span>
            <span className="font-arcade text-[7px] block text-gray-800 leading-tight">AUTHORITY</span>
          </div>
        </div>

        {/* Main Cover Grid: Hero Title & Comic Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Narrative & Action Typography (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Origin Caption Tag */}
            <div className="inline-flex items-center gap-2 border-3 border-comic-ink bg-marvel-red text-white font-bangers text-base px-3 py-1 shadow-comic-sm transform -rotate-1">
              <Terminal className="w-4 h-4" />
              <span>SYSTEMS ENGINEER AT TCS • AI ARCHITECT</span>
            </div>

            {/* Giant Title Typography */}
            <div>
              <p className="font-bangers text-lg sm:text-2xl tracking-widest uppercase opacity-90 mb-1">
                MEET THE FULL-STACK & AI SENTINEL
              </p>
              <h1 className="font-bangers text-4xl xs:text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-marvel-red via-marvel-blue to-purple-600 filter drop-shadow-[3px_3px_0px_#111111] sm:drop-shadow-[4px_4px_0px_#111111] break-words">
                LORDS OF THE CODES
              </h1>
              <div className="font-bangers text-xl sm:text-3xl tracking-wide mt-1 text-amber-500">
                MOHAMMED KAIF ABDUL SALAM TUNGEKAR
              </div>
            </div>

            {/* Narrative Dialogue Balloon */}
            <div className="speech-bubble bg-comic-paper text-comic-ink border-4 border-comic-ink p-5 rounded-2xl shadow-comic max-w-xl">
              <p className="font-comic font-bold text-lg sm:text-xl leading-snug">
                "From writing code to empowering intelligence — building the systems of tomorrow."
              </p>
              <div className="flex flex-wrap items-center justify-between text-xs font-bold text-gray-700 mt-2 uppercase gap-2">
                <span>⚡ BORIVALI, MUMBAI & REMOTE (THE UNDERWORLD)</span>
                <span>STATUS: ACTIVE SYSTEMS ENGINEER</span>
              </div>
            </div>

            {/* Mission Overview Caption */}
            <div className={`border-3 border-comic-ink p-4 rounded-lg font-comic text-sm sm:text-base leading-relaxed space-y-2 ${
              isMarvel ? 'bg-amber-50 text-comic-ink' : 'bg-black/50 text-dc-chalk'
            }`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bangers text-xs px-2 py-0.5 border-2 border-comic-ink bg-amber-400 text-comic-ink shadow-comic-sm">
                  ★ GOVT OF INDIA DESIGN PATENT (JUL 2026)
                </span>
                <span className="font-bangers text-xs px-2 py-0.5 border-2 border-comic-ink bg-blue-500 text-white shadow-comic-sm">
                  ★ CLAUDE CERTIFIED DEVELOPER
                </span>
              </div>
              <p className="opacity-95 text-xs sm:text-sm">
                Engineering high-throughput Java microservices on AWS at TCS, while pioneering GenAI, LLM agents, and patent-granted IoT sensor hardware.
              </p>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              
              {/* Read Issue Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onTriggerDecal('OPENING ISSUE #1!');
                  onReadIssue();
                }}
                className="comic-btn min-h-[44px] flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 border-3 sm:border-4 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-lg sm:text-2xl shadow-comic hover:bg-white transition-all flex-grow sm:flex-grow-0"
              >
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                <span>READ ISSUE</span>
              </button>

              {/* View Classified Resume Button */}
              <button
                onClick={() => {
                  soundFx.playToken();
                  onOpenResume();
                }}
                className="comic-btn min-h-[44px] flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 border-3 sm:border-4 border-comic-ink bg-marvel-red text-white font-bangers text-lg sm:text-2xl shadow-comic hover:bg-black transition-all flex-grow sm:flex-grow-0"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>CLASSIFIED RESUME</span>
              </button>

              {/* Play Mini-Game Button */}
              <button
                onClick={() => {
                  soundFx.playJump();
                  onTriggerDecal('ARCADE READY!');
                  onPlayGame();
                }}
                className="comic-btn min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 sm:border-3 border-comic-ink bg-emerald-400 text-comic-ink font-bangers text-base sm:text-xl shadow-comic hover:bg-white transition-all"
              >
                <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>PLAY GAME</span>
              </button>

              {/* LinkedIn Comms Button */}
              <a
                href="https://www.linkedin.com/in/mohammedkaiftungekar/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playToken()}
                className="comic-btn min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-3 border-2 sm:border-3 border-comic-ink bg-blue-600 text-white font-bangers text-base sm:text-lg shadow-comic hover:bg-blue-700"
                title="LinkedIn Profile"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LINKEDIN</span>
              </a>

              {/* GitHub Comms Link */}
              <a
                href="https://github.com/mohammedkaif777"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playToken()}
                className="comic-btn min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-3 border-2 sm:border-3 border-comic-ink bg-comic-paper text-comic-ink font-bangers text-base sm:text-lg shadow-comic hover:bg-white"
                title="GitHub Base"
              >
                <Terminal className="w-4 h-4 text-marvel-red" />
                <span>GITHUB</span>
              </a>
            </div>

          </div>

          {/* Right Column: Comic Visual Artwork & Floating Badges (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Action Decal Stickers Floating Around Hero */}
            <div className="absolute -top-6 -right-2 z-20 border-3 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-xl px-4 py-1 shadow-comic transform rotate-6 animate-pulse select-none">
              ★ PATENT GRANTED ★
            </div>

            <div className="absolute top-1/2 -left-6 z-20 border-3 border-comic-ink bg-marvel-red text-white font-bangers text-lg px-3 py-1 shadow-comic transform -rotate-12 select-none hidden sm:block">
              TCS SYSTEMS ENG
            </div>

            <div className="absolute -bottom-4 -left-2 z-20 border-3 border-comic-ink bg-marvel-blue text-white font-bangers text-lg px-3 py-1 shadow-comic transform rotate-3 select-none">
              ⚡ JAVA • AWS • GEN AI
            </div>

            {/* Hero Artwork Card */}
            <div className="w-full max-w-md border-4 border-comic-ink bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl shadow-comic-lg relative overflow-hidden text-center group">
              
              {/* Background Halftone Pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E62429_2px,transparent_2px)] [background-size:16px_16px]" />

              {/* Glowing Cape-clad Hero Avatar Graphic */}
              <div className="relative z-10 py-6">
                
                {/* Hero Avatar Emblem */}
                <div className="w-40 h-40 mx-auto rounded-full border-4 border-comic-ink bg-gradient-to-tr from-marvel-red via-purple-700 to-marvel-yellow p-1 shadow-comic relative flex items-center justify-center transform group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-black/85 flex flex-col items-center justify-center text-center">
                    <span className="font-bangers text-6xl text-marvel-yellow">⚡</span>
                    <span className="font-arcade text-[10px] text-white font-bold">LOTC</span>
                  </div>
                  
                  {/* Rotating Halo */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-marvel-yellow animate-spin [animation-duration:15s]" />
                </div>

                {/* Hero Metadata Card */}
                <div className="mt-6 border-3 border-comic-ink bg-comic-paper text-comic-ink p-3.5 rounded-xl shadow-comic text-left space-y-1.5">
                  <div className="flex items-center justify-between font-bangers text-sm text-marvel-red">
                    <span>SUPERHERO DOSSIER:</span>
                    <span>LVL 99 ARCHITECT</span>
                  </div>
                  <div className="font-comic font-bold text-sm">
                    Mohammed Kaif A. S. Tungekar
                  </div>
                  <div className="text-xs text-gray-700 font-comic flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                    <span>Role: Systems Engineer at TCS</span>
                  </div>
                  <div className="text-xs text-gray-700 font-comic flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Honor: Design Patent Holder (Govt of India)</span>
                  </div>
                </div>

                {/* Comic Tag Strip */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="border-2 border-comic-ink bg-marvel-red text-white font-bangers text-xs px-2.5 py-0.5 rounded shadow-comic-sm">
                    JAVA / SPRING BOOT
                  </span>
                  <span className="border-2 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-xs px-2.5 py-0.5 rounded shadow-comic-sm">
                    AWS MICROSERVICES
                  </span>
                  <span className="border-2 border-comic-ink bg-blue-600 text-white font-bangers text-xs px-2.5 py-0.5 rounded shadow-comic-sm">
                    CLAUDE CERTIFIED
                  </span>
                  <span className="border-2 border-comic-ink bg-emerald-500 text-white font-bangers text-xs px-2.5 py-0.5 rounded shadow-comic-sm">
                    IOT PATENT
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
