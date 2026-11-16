import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MultiverseTheme } from '../types';
import { soundFx } from '../utils/soundFx';
import confetti from 'canvas-confetti';
import { Gamepad2, Trophy, RotateCcw, Zap, Sparkles, Coffee, ShieldAlert, Award, Play } from 'lucide-react';

interface CyberRunnerProps {
  theme: MultiverseTheme;
  onTriggerDecal: (text: string) => void;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color: string;
}

interface Collectible {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'token' | 'gem' | 'coffee';
  value: number;
  label: string;
  color: string;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  vy: number;
}

export const CyberRunner: React.FC<CyberRunnerProps> = ({ theme, onTriggerDecal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [unlockedGoldBadge, setUnlockedGoldBadge] = useState<boolean>(false);
  const [invincibleLeft, setInvincibleLeft] = useState<number>(0);

  const isMarvel = theme === 'marvel';

  // Load High Score on Mount
  useEffect(() => {
    const saved = localStorage.getItem('lotc_high_score');
    if (saved) {
      const parsed = parseInt(saved, 10);
      setHighScore(parsed);
      if (parsed >= 300) {
        setUnlockedGoldBadge(true);
      }
    }
  }, []);

  // Game Engine Mutable State
  const engineRef = useRef({
    heroY: 180,
    heroVY: 0,
    heroWidth: 36,
    heroHeight: 46,
    isGrounded: true,
    canDoubleJump: true,
    capeWave: 0,
    groundY: 240,
    speed: 4.5,
    obstacles: [] as Obstacle[],
    collectibles: [] as Collectible[],
    floatingTexts: [] as FloatingText[],
    spawnTimer: 0,
    collectibleTimer: 0,
    invincibleTimer: 0,
    currentScore: 0,
    scoreTicker: 0,
    bgOffset: 0,
    animFrameId: 0,
    lastTime: 0,
  });

  // Jump Action
  const handleJump = useCallback(() => {
    const e = engineRef.current;
    if (gameState !== 'playing') {
      if (gameState === 'idle' || gameState === 'gameover') {
        startGame();
      }
      return;
    }

    if (e.isGrounded) {
      e.heroVY = -12;
      e.isGrounded = false;
      e.canDoubleJump = true;
      soundFx.playJump();
      onTriggerDecal('JUMP!');
    } else if (e.canDoubleJump) {
      e.heroVY = -10.5;
      e.canDoubleJump = false;
      soundFx.playDoubleJump();
      onTriggerDecal('AIR LIFT!');
      e.floatingTexts.push({
        x: 80,
        y: e.heroY - 10,
        text: 'DOUBLE JUMP!',
        color: '#00F0FF',
        alpha: 1,
        vy: -2,
      });
    }
  }, [gameState, onTriggerDecal]);

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === 'Space' || evt.code === 'ArrowUp') {
        evt.preventDefault();
        handleJump();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleJump]);

  // Start Game
  const startGame = () => {
    const e = engineRef.current;
    e.heroY = 180;
    e.heroVY = 0;
    e.isGrounded = true;
    e.canDoubleJump = true;
    e.speed = 4.8;
    e.obstacles = [];
    e.collectibles = [];
    e.floatingTexts = [];
    e.spawnTimer = 60;
    e.collectibleTimer = 30;
    e.invincibleTimer = 0;
    e.currentScore = 0;
    e.scoreTicker = 0;
    e.bgOffset = 0;
    setScore(0);
    setInvincibleLeft(0);
    setGameState('playing');
    soundFx.playClick();
    onTriggerDecal('MISSION START!');
  };

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const loop = (timestamp: number) => {
      if (!isRunning) return;

      const e = engineRef.current;
      const width = canvas.width;
      const height = canvas.height;
      e.groundY = height - 55;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Parallax Background (Cyber Mumbai Underworld)
      e.bgOffset = (e.bgOffset + (gameState === 'playing' ? e.speed * 0.4 : 0.8)) % width;

      // Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (isMarvel) {
        skyGrad.addColorStop(0, '#1E3A8A');
        skyGrad.addColorStop(0.6, '#3B82F6');
        skyGrad.addColorStop(1, '#FFFDF8');
      } else {
        skyGrad.addColorStop(0, '#08080C');
        skyGrad.addColorStop(0.7, '#161622');
        skyGrad.addColorStop(1, '#111118');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Halftone Stars / Cyber Grid
      ctx.fillStyle = isMarvel ? 'rgba(230, 36, 41, 0.15)' : 'rgba(245, 166, 35, 0.12)';
      for (let x = 0; x < width; x += 30) {
        for (let y = 10; y < e.groundY - 30; y += 30) {
          ctx.fillRect((x - (e.bgOffset * 0.2) + width) % width, y, 2, 2);
        }
      }

      // Distant City Skyline Silhouettes
      ctx.fillStyle = isMarvel ? '#1E293B' : '#101018';
      const buildingWidth = 60;
      for (let i = -1; i < Math.ceil(width / buildingWidth) + 1; i++) {
        const bx = i * buildingWidth - (e.bgOffset * 0.3);
        const bHeight = 70 + ((Math.sin(i * 3) + 1) * 35);
        ctx.fillRect(bx, e.groundY - bHeight, buildingWidth - 6, bHeight);
        
        // Window dots
        ctx.fillStyle = isMarvel ? 'rgba(255, 210, 0, 0.4)' : 'rgba(245, 166, 35, 0.25)';
        for (let wy = e.groundY - bHeight + 10; wy < e.groundY - 10; wy += 16) {
          ctx.fillRect(bx + 10, wy, 4, 6);
          ctx.fillRect(bx + 24, wy, 4, 6);
        }
        ctx.fillStyle = isMarvel ? '#1E293B' : '#101018';
      }

      // Ground Line (Solid Inked Comic Track)
      ctx.fillStyle = '#08080C';
      ctx.fillRect(0, e.groundY, width, height - e.groundY);
      
      // Ground Comic Border
      ctx.strokeStyle = isMarvel ? '#E62429' : '#F5A623';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, e.groundY);
      ctx.lineTo(width, e.groundY);
      ctx.stroke();

      // Ground Dashes (Track Motion)
      ctx.fillStyle = isMarvel ? '#FFD200' : '#00D2FF';
      for (let x = -e.bgOffset % 40; x < width; x += 40) {
        ctx.fillRect(x, e.groundY + 14, 20, 4);
      }

      // 2. Physics & State Update (If Playing)
      if (gameState === 'playing') {
        // Hero Physics
        e.heroVY += 0.65; // Gravity
        e.heroY += e.heroVY;

        if (e.heroY >= e.groundY - e.heroHeight) {
          e.heroY = e.groundY - e.heroHeight;
          e.heroVY = 0;
          e.isGrounded = true;
          e.canDoubleJump = true;
        }

        // Score Progression
        e.scoreTicker += 1;
        if (e.scoreTicker >= 6) {
          e.scoreTicker = 0;
          e.currentScore += 1;
          setScore(e.currentScore);

          // Speed scaling
          if (e.currentScore % 100 === 0 && e.speed < 8.5) {
            e.speed += 0.4;
          }

          // Achievement Trigger
          if (e.currentScore >= 300 && !unlockedGoldBadge) {
            setUnlockedGoldBadge(true);
            soundFx.playVictory();
            onTriggerDecal('🏆 GOLD BADGE UNLOCKED!');
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#FF007F', '#00F0FF', '#FFE600', '#F59E0B'],
            });
          }
        }

        // Invincibility countdown
        if (e.invincibleTimer > 0) {
          e.invincibleTimer -= 1;
          setInvincibleLeft(Math.ceil(e.invincibleTimer / 60));
        }

        // Spawn Obstacles
        e.spawnTimer -= 1;
        if (e.spawnTimer <= 0) {
          e.spawnTimer = Math.floor(Math.random() * 45) + 65;
          const obstacleTypes = [
            { label: '404 SPIKE', w: 30, h: 42, color: '#EF4444' },
            { label: 'MERGE CONFLICT', w: 34, h: 48, color: '#F97316' },
            { label: 'NULL POINTER', w: 28, h: 38, color: '#DC2626' },
          ];
          const choice = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
          e.obstacles.push({
            x: width + 20,
            y: e.groundY - choice.h,
            width: choice.w,
            height: choice.h,
            label: choice.label,
            color: choice.color,
          });
        }

        // Spawn Collectibles
        e.collectibleTimer -= 1;
        if (e.collectibleTimer <= 0) {
          e.collectibleTimer = Math.floor(Math.random() * 60) + 70;
          const collectibleTypes = [
            { type: 'token' as const, value: 50, label: '+50 AI TOKEN', color: '#00F0FF', w: 22, h: 22 },
            { type: 'gem' as const, value: 100, label: '+100 CLEAN CODE', color: '#FFE600', w: 22, h: 22 },
            { type: 'coffee' as const, value: 0, label: 'COFFEE SHIELD!', color: '#F59E0B', w: 24, h: 24 },
          ];
          const choice = collectibleTypes[Math.floor(Math.random() * collectibleTypes.length)];
          // Float height (high or mid)
          const floatY = e.groundY - (Math.random() > 0.5 ? 90 : 50);
          e.collectibles.push({
            x: width + 30,
            y: floatY,
            width: choice.w,
            height: choice.h,
            type: choice.type,
            value: choice.value,
            label: choice.label,
            color: choice.color,
          });
        }

        // Move Obstacles & Check Collisions
        for (let i = e.obstacles.length - 1; i >= 0; i--) {
          const obs = e.obstacles[i];
          obs.x -= e.speed;

          // Hero Hitbox
          const heroBox = { x: 80, y: e.heroY, w: e.heroWidth, h: e.heroHeight };
          const obsBox = { x: obs.x, y: obs.y, w: obs.width, h: obs.height };

          const isColliding =
            heroBox.x < obsBox.x + obsBox.w &&
            heroBox.x + heroBox.w > obsBox.x &&
            heroBox.y < obsBox.y + obsBox.h &&
            heroBox.y + heroBox.h > obsBox.y;

          if (isColliding) {
            if (e.invincibleTimer > 0) {
              // Destroy obstacle during invincibility
              soundFx.playHit();
              e.floatingTexts.push({
                x: obs.x,
                y: obs.y - 15,
                text: 'CRUSHED!',
                color: '#FFE600',
                alpha: 1,
                vy: -2,
              });
              e.obstacles.splice(i, 1);
              continue;
            } else {
              // Game Over
              soundFx.playHit();
              setGameState('gameover');
              onTriggerDecal('CRASH! GAME OVER');

              // Update High Score
              const finalScore = e.currentScore;
              const savedHS = parseInt(localStorage.getItem('lotc_high_score') || '0', 10);
              if (finalScore > savedHS) {
                localStorage.setItem('lotc_high_score', String(finalScore));
                setHighScore(finalScore);
              }
              break;
            }
          }

          // Remove offscreen
          if (obs.x + obs.width < -30) {
            e.obstacles.splice(i, 1);
          }
        }

        // Move Collectibles & Check Pickups
        for (let i = e.collectibles.length - 1; i >= 0; i--) {
          const col = e.collectibles[i];
          col.x -= e.speed;

          const heroBox = { x: 80, y: e.heroY, w: e.heroWidth, h: e.heroHeight };
          const colBox = { x: col.x, y: col.y, w: col.width, h: col.height };

          const isCollected =
            heroBox.x < colBox.x + colBox.w &&
            heroBox.x + heroBox.w > colBox.x &&
            heroBox.y < colBox.y + colBox.h &&
            heroBox.y + heroBox.h > colBox.y;

          if (isCollected) {
            if (col.type === 'coffee') {
              e.invincibleTimer = 300; // 5 seconds at 60fps
              soundFx.playBoost();
              onTriggerDecal('SUPERCHARGED!');
            } else {
              e.currentScore += col.value;
              setScore(e.currentScore);
              soundFx.playToken();
              onTriggerDecal(col.label);
            }

            e.floatingTexts.push({
              x: col.x,
              y: col.y - 10,
              text: col.label,
              color: col.color,
              alpha: 1,
              vy: -2,
            });

            e.collectibles.splice(i, 1);
            continue;
          }

          if (col.x + col.width < -30) {
            e.collectibles.splice(i, 1);
          }
        }
      }

      // 3. Render Collectibles
      e.collectibles.forEach((col) => {
        ctx.save();
        ctx.translate(col.x + col.width / 2, col.y + col.height / 2);
        
        // Glow
        ctx.shadowColor = col.color;
        ctx.shadowBlur = 10;

        if (col.type === 'token') {
          // AI Token / GPU Diamond
          ctx.fillStyle = col.color;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, -col.height / 2);
          ctx.lineTo(col.width / 2, 0);
          ctx.lineTo(0, col.height / 2);
          ctx.lineTo(-col.width / 2, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Symbol
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 9px "Press Start 2P"';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('AI', 0, 1);
        } else if (col.type === 'gem') {
          // Clean Code Gem
          ctx.fillStyle = col.color;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, col.width / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#000000';
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('⚡', 0, 1);
        } else if (col.type === 'coffee') {
          // Coffee Cup
          ctx.fillStyle = col.color;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.fillRect(-8, -8, 16, 16);
          ctx.strokeRect(-8, -8, 16, 16);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('☕', 0, 1);
        }
        ctx.restore();
      });

      // 4. Render Obstacles
      e.obstacles.forEach((obs) => {
        ctx.save();
        ctx.fillStyle = obs.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;

        // Spikes shape
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y + obs.height);
        ctx.lineTo(obs.x + obs.width / 2, obs.y);
        ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Label Tag
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 8px "Comic Neue", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(obs.label, obs.x + obs.width / 2, obs.y - 4);
        ctx.restore();
      });

      // 5. Render Hero ("Lords of the Codes")
      const heroX = 80;
      const heroY = e.heroY;
      e.capeWave += 0.2;

      ctx.save();

      // Invincible Energy Shield Bubble
      if (e.invincibleTimer > 0) {
        ctx.strokeStyle = isMarvel ? '#FFD200' : '#00D2FF';
        ctx.lineWidth = 3;
        ctx.fillStyle = isMarvel ? 'rgba(255, 210, 0, 0.25)' : 'rgba(0, 210, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(heroX + e.heroWidth / 2, heroY + e.heroHeight / 2, 34, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Flowing Cape
      ctx.fillStyle = isMarvel ? '#E62429' : '#F5A623';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(heroX + 10, heroY + 14);
      const capeWaveOffset = Math.sin(e.capeWave) * 6;
      ctx.quadraticCurveTo(
        heroX - 16,
        heroY + 22 + capeWaveOffset,
        heroX - 26,
        heroY + 36 + capeWaveOffset
      );
      ctx.lineTo(heroX + 12, heroY + 32);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Hero Body (Inked Suit)
      ctx.fillStyle = isMarvel ? '#0266B3' : '#111111';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.fillRect(heroX + 8, heroY + 16, 20, 20);
      ctx.strokeRect(heroX + 8, heroY + 16, 20, 20);

      // Hero Head / Mask
      ctx.fillStyle = isMarvel ? '#FFD200' : '#F5A623';
      ctx.fillRect(heroX + 10, heroY + 2, 16, 14);
      ctx.strokeRect(heroX + 10, heroY + 2, 16, 14);

      // Glowing Eye Visor
      ctx.fillStyle = isMarvel ? '#E62429' : '#00D2FF';
      ctx.fillRect(heroX + 18, heroY + 6, 8, 4);

      // Legs / Stride Animation
      const legStride = gameState === 'playing' && e.isGrounded ? Math.sin(e.capeWave * 2) * 6 : 0;
      ctx.fillStyle = '#000000';
      ctx.fillRect(heroX + 10, heroY + 36, 6, 10 + legStride);
      ctx.fillRect(heroX + 20, heroY + 36, 6, 10 - legStride);

      ctx.restore();

      // 6. Floating Action Texts ("+50", "POW!", "DOUBLE JUMP!")
      for (let i = e.floatingTexts.length - 1; i >= 0; i--) {
        const ft = e.floatingTexts[i];
        ft.y += ft.vy;
        ft.alpha -= 0.025;

        ctx.save();
        ctx.globalAlpha = Math.max(0, ft.alpha);
        ctx.font = 'bold 13px "Bangers", cursive';
        ctx.fillStyle = ft.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.strokeText(ft.text, ft.x, ft.y);
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();

        if (ft.alpha <= 0) {
          e.floatingTexts.splice(i, 1);
        }
      }

      // Next Animation Frame
      e.animFrameId = requestAnimationFrame(loop);
    };

    engineRef.current.animFrameId = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      cancelAnimationFrame(engineRef.current.animFrameId);
    };
  }, [gameState, isMarvel, unlockedGoldBadge, onTriggerDecal]);

  return (
    <section id="arcade" className="py-12">
      
      {/* Title Bar */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-comic-ink pb-4">
        <div>
          <div className="inline-flex items-center gap-2 border-2 border-comic-ink bg-emerald-400 text-comic-ink font-bangers text-sm px-3 py-0.5 shadow-comic-sm uppercase">
            <Gamepad2 className="w-4 h-4" />
            <span>CHAPTER FOUR • THE ARCADE PAVILION</span>
          </div>
          <h2 className="font-bangers text-4xl sm:text-6xl tracking-wide mt-2">
            CYBER-RUNNER: LORDS OF THE CODES
          </h2>
        </div>

        {/* Live Scoreboard HUD */}
        <div className="flex items-center gap-3">
          <div className="border-3 border-comic-ink bg-comic-paper text-comic-ink px-4 py-1.5 rounded-lg shadow-comic-sm font-arcade text-xs">
            <span className="block text-[9px] text-gray-600">CURRENT SCORE</span>
            <span className="text-xl text-marvel-red font-bold">{score}</span>
          </div>

          <div className="border-3 border-comic-ink bg-marvel-yellow text-comic-ink px-4 py-1.5 rounded-lg shadow-comic-sm font-arcade text-xs">
            <span className="block text-[9px] text-gray-700">RECORD HIGH</span>
            <span className="text-xl text-comic-ink font-bold">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Main Canvas Frame */}
      <div
        ref={containerRef}
        className={`comic-panel relative rounded-2xl overflow-hidden p-2 sm:p-4 transition-colors ${
          isMarvel ? 'bg-white' : 'bg-dc-card'
        }`}
      >
        {/* Game Canvas */}
        <canvas
          ref={canvasRef}
          width={800}
          height={320}
          onClick={handleJump}
          className="w-full h-auto max-h-[360px] rounded-xl border-4 border-comic-ink bg-black block cursor-pointer select-none"
        />

        {/* Invincibility HUD Badge */}
        {invincibleLeft > 0 && (
          <div className="absolute top-6 left-6 z-10 border-3 border-comic-ink bg-neon-yellow text-comic-ink font-bangers text-lg px-4 py-1 shadow-comic animate-bounce">
            ☕ COFFEE SHIELD ACTIVE: {invincibleLeft}s
          </div>
        )}

        {/* Overlay Screen: Idle / Start */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="border-4 border-comic-ink bg-comic-paper text-comic-ink p-6 rounded-2xl shadow-comic-lg max-w-md space-y-4">
              <span className="font-arcade text-xs text-neon-magenta block">
                RETRO 2D COMIC RUNNER
              </span>
              <h3 className="font-bangers text-4xl leading-none">
                CYBER-RUNNER: LORDS OF THE CODES
              </h3>
              <p className="font-comic font-bold text-sm text-gray-700">
                Sprint across Mumbai's digital underworld! Dodge 404/500 bugs, collect AI compute units, and grab coffee boosts.
              </p>
              
              <div className="bg-gray-100 border-2 border-comic-ink p-2.5 rounded font-comic text-xs space-y-1">
                <div>⌨️ <span className="font-bold">SPACEBAR / UP ARROW</span> or <span className="font-bold">TAP</span> = Jump & Double-Jump</div>
                <div>🏆 <span className="font-bold">Reach 300+ Points</span> to unlock the Supreme Code Lord Badge!</div>
              </div>

              <button
                onClick={startGame}
                className="comic-btn w-full py-3 border-4 border-comic-ink bg-neon-cyan text-comic-ink font-bangers text-2xl shadow-comic hover:bg-neon-yellow transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-6 h-6 fill-current" />
                <span>START SPRINT [SPACE]</span>
              </button>
            </div>
          </div>
        )}

        {/* Overlay Screen: Game Over */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="border-4 border-comic-ink bg-comic-paper text-comic-ink p-6 rounded-2xl shadow-comic-lg max-w-md space-y-4">
              <div className="border-2 border-comic-ink bg-red-500 text-white font-bangers text-lg px-3 py-0.5 shadow-comic-sm inline-block">
                💥 PRODUCTION OUTAGE! 💥
              </div>
              <h3 className="font-bangers text-5xl text-comic-ink leading-none">
                MISSION FAILED
              </h3>
              
              <div className="grid grid-cols-2 gap-3 py-1 font-arcade">
                <div className="border-2 border-comic-ink p-2 rounded bg-gray-100">
                  <span className="text-[9px] text-gray-600 block">SCORE</span>
                  <span className="text-xl text-neon-magenta font-bold">{score}</span>
                </div>
                <div className="border-2 border-comic-ink p-2 rounded bg-gray-100">
                  <span className="text-[9px] text-gray-600 block">RECORD</span>
                  <span className="text-xl text-comic-ink font-bold">{Math.max(score, highScore)}</span>
                </div>
              </div>

              {score >= 300 && (
                <div className="border-2 border-comic-ink bg-neon-yellow p-2 rounded font-bangers text-lg text-comic-ink shadow-comic-sm">
                  ★ SUPREME CODE LORD BADGE ACHIEVED! ★
                </div>
              )}

              <button
                onClick={startGame}
                className="comic-btn w-full py-3 border-4 border-comic-ink bg-neon-magenta text-white font-bangers text-2xl shadow-comic hover:bg-neon-yellow hover:text-comic-ink transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-6 h-6" />
                <span>TRY AGAIN [ENTER]</span>
              </button>
            </div>
          </div>
        )}

        {/* Mobile / Screen Tap Control Bar */}
        <div className="mt-4 flex sm:hidden items-center justify-between gap-3">
          <button
            onClick={handleJump}
            className="comic-btn w-full py-3 border-3 border-comic-ink bg-neon-cyan text-comic-ink font-bangers text-2xl shadow-comic flex items-center justify-center gap-2"
          >
            <Zap className="w-6 h-6" />
            <span>TAP TO JUMP / DOUBLE-JUMP</span>
          </button>
        </div>

      </div>

      {/* Unlockable Easter Egg Award Banner */}
      {unlockedGoldBadge && (
        <div className="mt-8 comic-panel p-6 rounded-2xl bg-gradient-to-r from-amber-500 via-neon-yellow to-amber-600 text-comic-ink border-4 border-comic-ink shadow-comic-lg flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="border-4 border-comic-ink p-3 rounded-full bg-comic-paper shadow-comic">
              <Trophy className="w-10 h-10 text-amber-600" />
            </div>
            <div>
              <div className="font-arcade text-xs text-gray-900 uppercase">
                SECRET EASTER EGG UNLOCKED!
              </div>
              <h3 className="font-bangers text-3xl sm:text-4xl leading-none">
                ★ SUPREME CODE LORD: GOLDEN COMIC BADGE ★
              </h3>
              <p className="font-comic font-bold text-sm text-gray-800">
                You successfully crushed technical debt and scored 300+ points in Cyber-Runner!
              </p>
            </div>
          </div>

          <a
            href="https://github.com/mohammedkaif777"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playVictory()}
            className="comic-btn px-6 py-3 border-3 border-comic-ink bg-comic-paper text-comic-ink font-bangers text-xl shadow-comic hover:bg-white whitespace-nowrap"
          >
            CLAIM TROPHY ON GITHUB
          </a>
        </div>
      )}

    </section>
  );
};
