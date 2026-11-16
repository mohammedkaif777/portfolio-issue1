import React, { useEffect, useState, useRef } from 'react';
import { MultiverseTheme } from '../types';
import { soundFx } from '../utils/soundFx';
import { Crosshair } from 'lucide-react';

interface BattleshipScrollerProps {
  theme: MultiverseTheme;
  onTriggerDecal: (text: string) => void;
}

interface SectorCheckpoint {
  id: string;
  name: string;
  code: string;
}

export const BattleshipScroller: React.FC<BattleshipScrollerProps> = ({ theme, onTriggerDecal }) => {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [currentSector, setCurrentSector] = useState<string>('COVER');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMarvel = theme === 'marvel';

  const sectors: SectorCheckpoint[] = [
    { id: 'hero', name: 'COVER', code: 'SEC-01' },
    { id: 'origin', name: 'ORIGIN', code: 'SEC-02' },
    { id: 'superpowers', name: 'POWERS', code: 'SEC-03' },
    { id: 'quests', name: 'MISSIONS', code: 'SEC-04' },
    { id: 'arcade', name: 'MINI-GAME', code: 'SEC-05' },
    { id: 'experience', name: 'TCS EXP', code: 'SEC-06' },
    { id: 'education', name: 'ACADEMICS', code: 'SEC-07' },
    { id: 'certifications', name: 'PATENT & HONORS', code: 'SEC-08' },
    { id: 'comms', name: 'COMMS BASE', code: 'SEC-09' },
  ];

  // Calculate scroll percentage and active sector
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)) : 0;
      setScrollPercent(progress);

      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 250);

      // Detect active sector by section offset
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sectors.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectors[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentSector(sectors[i].name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleWaypointClick = (id: string, name: string) => {
    const el = document.getElementById(id);
    if (el) {
      soundFx.playClick();
      onTriggerDecal(`WARPING TO ${name}!`);
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, clickY / rect.height));
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * totalHeight, behavior: 'smooth' });
    soundFx.playToken();
  };

  return (
    <aside
      aria-label="Tactical Battleship Scroll Tracker"
      className="fixed right-2 sm:right-3 lg:right-5 top-20 sm:top-24 bottom-8 sm:bottom-12 z-30 flex items-center select-none pointer-events-none"
    >
      {/* Outer Tactical Rail Container */}
      <div
        className="relative h-full flex flex-col items-center pointer-events-auto cursor-pointer group"
        onClick={handleTrackClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Background Flight Rail Track */}
        <div className={`w-2.5 sm:w-3.5 h-full rounded-full border-2 border-comic-ink shadow-comic-sm overflow-hidden relative ${
          isMarvel ? 'bg-amber-100' : 'bg-dc-dark'
        }`}>
          {/* Active Flight Progress Trail */}
          <div
            className={`w-full transition-all duration-150 rounded-full ${
              isMarvel
                ? 'bg-gradient-to-b from-marvel-yellow via-amber-500 to-marvel-red'
                : 'bg-gradient-to-b from-dc-gold via-dc-cyan to-blue-600'
            }`}
            style={{ height: `${scrollPercent}%` }}
          />

          {/* Rail Hash Altitude Ticks */}
          <div className="absolute inset-0 flex flex-col justify-between py-2 opacity-30 pointer-events-none">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="w-full h-0.5 bg-black" />
            ))}
          </div>
        </div>

        {/* Sector Waypoint Dots along the Rail */}
        <div className="absolute inset-y-0 w-full flex flex-col justify-between py-1 pointer-events-none">
          {sectors.map((s, idx) => {
            const isPassed = (idx / (sectors.length - 1)) * 100 <= scrollPercent;
            return (
              <div
                key={s.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleWaypointClick(s.id, s.name);
                }}
                className={`w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full border-2 border-comic-ink pointer-events-auto transition-transform hover:scale-125 ${
                  isPassed
                    ? isMarvel
                      ? 'bg-marvel-red'
                      : 'bg-dc-gold'
                    : isMarvel
                      ? 'bg-white'
                      : 'bg-gray-600'
                }`}
                title={`Sector: ${s.name}`}
              />
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* THE ANIMATED BATTLESHIP (Cruises Top to Down)                   */}
        {/* ============================================================== */}
        <div
          className="absolute -translate-x-1/2 left-1/2 transition-all duration-150 pointer-events-auto"
          style={{
            top: `calc(${scrollPercent}% - 24px)`,
          }}
        >
          {/* Telemetry HUD Tooltip on Hover */}
          {(isHovered || isScrolling) && (
            <div className="absolute right-12 sm:right-14 top-1/2 -translate-y-1/2 whitespace-nowrap z-40 animate-comic-bounce">
              <div className={`comic-panel px-3 py-1.5 rounded-lg border-2 border-comic-ink shadow-comic font-arcade text-[9px] sm:text-[10px] ${
                isMarvel ? 'bg-marvel-yellow text-comic-ink' : 'bg-dc-card text-dc-gold'
              }`}>
                <div className="flex items-center gap-1 font-bold">
                  <Crosshair className="w-3 h-3 text-marvel-red animate-spin" />
                  <span>{currentSector}</span>
                  <span className="text-marvel-red">• {Math.round(scrollPercent)}%</span>
                </div>
                <div className="text-[7px] text-gray-700 font-comic">
                  CLICK RAIL TO GLIDE
                </div>
              </div>
            </div>
          )}

          {/* Battleship Vector Craft */}
          <div className="relative flex flex-col items-center">
            
            {/* Plasma Thruster Engine Flames (Pointing upward trailing behind downward ship) */}
            <div className="relative -mb-1 flex items-center justify-center gap-1">
              <div
                className={`w-1.5 rounded-full transition-all duration-100 ${
                  isScrolling
                    ? 'h-4 bg-gradient-to-t from-red-600 via-yellow-400 to-transparent scale-125 animate-pulse'
                    : 'h-2 bg-gradient-to-t from-amber-500 to-transparent'
                }`}
              />
              <div
                className={`w-2 rounded-full transition-all duration-100 ${
                  isScrolling
                    ? 'h-6 bg-gradient-to-t from-yellow-300 via-marvel-red to-transparent scale-150 animate-pulse'
                    : 'h-3 bg-gradient-to-t from-yellow-400 to-transparent'
                }`}
              />
              <div
                className={`w-1.5 rounded-full transition-all duration-100 ${
                  isScrolling
                    ? 'h-4 bg-gradient-to-t from-red-600 via-yellow-400 to-transparent scale-125 animate-pulse'
                    : 'h-2 bg-gradient-to-t from-amber-500 to-transparent'
                }`}
              />
            </div>

            {/* Battleship SVG Model (Nose Downward Cruising Down) */}
            <svg
              className={`w-8 h-10 sm:w-11 sm:h-12 filter drop-shadow-[2px_2px_0px_#111111] transition-transform duration-200 ${
                isScrolling ? 'scale-110' : 'scale-100'
              }`}
              viewBox="0 0 60 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left Wing & Cannon */}
              <path
                d="M18 18L4 32L10 38L18 30V18Z"
                fill={isMarvel ? '#0266B3' : '#1E293B'}
                stroke="#111111"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <rect x="2" y="32" width="4" height="12" fill="#111111" stroke="#111111" rx="1" />

              {/* Right Wing & Cannon */}
              <path
                d="M42 18L56 32L50 38L42 30V18Z"
                fill={isMarvel ? '#0266B3' : '#1E293B'}
                stroke="#111111"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <rect x="54" y="32" width="4" height="12" fill="#111111" stroke="#111111" rx="1" />

              {/* Main Battleship Fuselage Hull */}
              <path
                d="M30 68L18 42L20 12L30 4L40 12L42 42L30 68Z"
                fill={isMarvel ? '#E62429' : '#161B26'}
                stroke="#111111"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* Forward Armor Plating / Nose Cone */}
              <polygon
                points="30,68 24,50 36,50"
                fill={isMarvel ? '#FFD200' : '#F5A623'}
                stroke="#111111"
                strokeWidth="2"
              />

              {/* Command Bridge / Cockpit Glass Canopy */}
              <ellipse
                cx="30"
                cy="32"
                rx="5"
                ry="9"
                fill={isMarvel ? '#00D2FF' : '#FFD200'}
                stroke="#111111"
                strokeWidth="2"
              />

              {/* High-Tech Glow Reflection */}
              <line x1="29" y1="26" x2="31" y2="36" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

              {/* Rear Twin Engine Nacelles */}
              <rect x="20" y="8" width="6" height="6" fill="#111111" stroke="#111111" rx="1" />
              <rect x="34" y="8" width="6" height="6" fill="#111111" stroke="#111111" rx="1" />

              {/* Hero Inked Crest */}
              <circle cx="30" cy="46" r="2.5" fill="#FFFFFF" stroke="#111111" strokeWidth="1" />
            </svg>

          </div>
        </div>

      </div>
    </aside>
  );
};
