import React, { useState } from 'react';
import { MultiverseTheme, ProjectMission } from '../types';
import { soundFx } from '../utils/soundFx';
import { ShieldAlert, ExternalLink, GitBranch, Terminal, Sparkles, Award, CheckCircle2, Flame } from 'lucide-react';

interface QuestArchiveProps {
  theme: MultiverseTheme;
  onTriggerDecal: (text: string) => void;
}

export const QuestArchive: React.FC<QuestArchiveProps> = ({ theme, onTriggerDecal }) => {
  const [filter, setFilter] = useState<string>('all');
  const isMarvel = theme === 'marvel';

  const missions: ProjectMission[] = [
    {
      id: "mission-1",
      codeName: "OPERATION DEPENDENCY INTELLIGENCE",
      title: "API Dependency Intelligence — Breaking-Change Detection",
      status: "In Development",
      brief: "Enterprise microservice intelligence system that registers OpenAPI specs, builds live dependency graphs, and runs diffs to classify changes as breaking/non-breaking with blast-radius cycle detection and org-scoped multi-tenant isolation.",
      techStack: ["Java", "Spring Boot", "React", "PostgreSQL", "REST", "OpenAPI 3.x", "Graph Traversal"],
      repoUrl: "https://github.com/mohammedkaif777/API-Dependency.git",
      impact: "Per-consumer impact reporting with severity classification and zero silent breaking changes.",
      badge: "ENTERPRISE MICROSERVICES"
    },
    {
      id: "mission-2",
      codeName: "OPERATION ANNAMRITA (PATENTED)",
      title: "AnnaMrita — IoT Food Spoilage Detection System",
      status: "Patented",
      brief: "Patented IoT hardware apparatus utilizing ESP32 with calibrated gas, temperature, and moisture sensors transmitting real-time telemetry into a machine learning model to predict food shelf life accurately.",
      techStack: ["IoT Hardware", "ESP32", "Arduino C++", "Machine Learning", "PHP", "JavaScript", "MySQL"],
      repoUrl: "https://github.com/mohammedkaif777/AnnamritaNew.git",
      impact: "Commercial-grade food preservation telemetry with patent protection.",
      badge: "★ GOVT OF INDIA PATENT ★",
      patentNotice: "Design Patent Granted by Government of India (Jul 2026)"
    },
    {
      id: "mission-3",
      codeName: "OPERATION ADLOOP",
      title: "Paytm-AdLoop Campaign Orchestrator",
      status: "Deployed",
      brief: "High-throughput fintech advertising loop engine orchestrating automated campaign cycles, transactional tracking, and programmatic conversion pipelines at scale.",
      techStack: ["Python", "Fintech APIs", "Cloud Architecture", "Distributed Data", "Automated Pipelines"],
      repoUrl: "https://github.com/mohammedkaif777/Paytm-AdLoop.git",
      impact: "High-volume transactional campaign execution with zero financial drift.",
      badge: "FINTECH CORE"
    },
    {
      id: "mission-4",
      codeName: "GUARDIAN OF THE PORCH",
      title: "PorchPiracy-AI Real-Time CV Shield",
      status: "Active Mission",
      brief: "Intelligent edge-based Computer Vision surveillance system that detects, classifies, and neutralizes package theft threats in real-time using deep neural networks.",
      techStack: ["Computer Vision", "AI & Deep Learning", "IoT / Edge Hardware", "Python", "Real-Time Inference"],
      repoUrl: "https://github.com/mohammedkaif777/porchPiracy-AI.git",
      impact: "Autonomous physical perimeter defense with instant alert telemetry.",
      badge: "AI VISION AGENT"
    }
  ];

  const filteredMissions = filter === 'all'
    ? missions
    : missions.filter(m => {
        if (filter === 'patented') return m.status === 'Patented';
        if (filter === 'microservices') return m.techStack.some(t => t.toLowerCase().includes('java') || t.toLowerCase().includes('spring') || t.toLowerCase().includes('microservices'));
        if (filter === 'ai') return m.techStack.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('vision') || t.toLowerCase().includes('learning'));
        return true;
      });

  return (
    <section id="quests" className="py-12">
      
      {/* Chapter Title Bar */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-comic-ink pb-4">
        <div>
          <div className="inline-flex items-center gap-2 border-2 border-comic-ink bg-marvel-red text-white font-bangers text-sm px-3 py-0.5 shadow-comic-sm uppercase">
            <Flame className="w-4 h-4" />
            <span>CHAPTER THREE • CLASSIFIED CASE FILES</span>
          </div>
          <h2 className="font-bangers text-4xl sm:text-6xl tracking-wide mt-2">
            QUEST ARCHIVE: 4 ACTIVE MISSIONS
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Dossiers' },
            { id: 'patented', label: '★ Patented IoT ★' },
            { id: 'microservices', label: 'Java / Microservices' },
            { id: 'ai', label: 'AI & Vision' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setFilter(f.id);
                soundFx.playClick();
              }}
              className={`comic-btn px-3 py-1 font-bangers text-sm border-2 border-comic-ink rounded shadow-comic-sm uppercase ${
                filter === f.id
                  ? 'bg-marvel-yellow text-comic-ink'
                  : 'bg-comic-paper text-comic-ink hover:bg-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mission Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredMissions.map((mission, idx) => (
          <div
            key={mission.id}
            className={`comic-panel relative rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-comic-lg ${
              isMarvel ? 'bg-white text-comic-ink' : 'bg-dc-card text-dc-chalk'
            }`}
            onMouseEnter={() => {
              soundFx.playToken();
              onTriggerDecal(mission.badge);
            }}
          >
            
            {/* Top Classified Stamp */}
            <div>
              <div className="flex items-center justify-between mb-4 border-b-3 border-comic-ink pb-2">
                <div className="flex items-center gap-2">
                  <span className={`border-2 border-comic-ink font-arcade text-[10px] px-2 py-0.5 font-bold shadow-comic-sm ${
                    mission.status === 'Patented' ? 'bg-amber-400 text-comic-ink' : 'bg-red-600 text-white'
                  }`}>
                    {mission.badge}
                  </span>
                  <span className="font-arcade text-[9px] opacity-75">
                    REF: 00{idx + 1}-LOTC
                  </span>
                </div>
                
                <span className={`font-bangers text-xs px-2.5 py-0.5 border-2 border-comic-ink rounded ${
                  mission.status === 'Patented'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-comic-ink font-bold animate-pulse'
                    : mission.status === 'In Development'
                      ? 'bg-amber-400 text-comic-ink'
                      : 'bg-emerald-400 text-comic-ink'
                }`}>
                  ● {mission.status}
                </span>
              </div>

              {/* Patent Callout Banner if applicable */}
              {mission.patentNotice && (
                <div className="border-2 border-comic-ink bg-gradient-to-r from-amber-300 to-yellow-100 text-comic-ink p-2 rounded-lg font-comic text-xs font-bold mb-3 flex items-center gap-2 shadow-comic-sm">
                  <Award className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>★ {mission.patentNotice} ★</span>
                </div>
              )}

              {/* Code Name & Mission Title */}
              <div className="mb-3">
                <span className="font-arcade text-[10px] text-amber-500 block tracking-widest uppercase">
                  {mission.codeName}
                </span>
                <h3 className="font-bangers text-3xl tracking-wide flex items-center gap-2 mt-0.5">
                  <span className={isMarvel ? 'text-marvel-red' : 'text-dc-gold'}>
                    {mission.title}
                  </span>
                </h3>
              </div>

              {/* Mission Briefing Box */}
              <div className="border-2 border-comic-ink bg-comic-paper text-comic-ink p-3.5 rounded-xl shadow-comic mb-4">
                <span className="font-bangers text-xs text-marvel-red block tracking-wider">
                  MISSION BRIEFING:
                </span>
                <p className="font-comic font-semibold text-sm leading-snug">
                  {mission.brief}
                </p>
              </div>

              {/* Impact Callout */}
              <div className={`border-2 border-comic-ink p-2.5 rounded-lg mb-4 text-xs font-comic flex items-start gap-2 ${
                isMarvel ? 'bg-amber-50' : 'bg-black/40'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-600">Battle Impact: </span>
                  <span className="opacity-90">{mission.impact}</span>
                </div>
              </div>

              {/* Weapons Deployed (Tech Stack) */}
              <div className="mb-6">
                <span className="font-bangers text-xs tracking-wider block opacity-75 mb-1.5 uppercase">
                  Tech Weapons Deployed:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {mission.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="border-2 border-comic-ink bg-comic-paper/60 text-comic-ink text-xs font-comic font-bold px-2 py-0.5 rounded shadow-comic-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Bar with GitHub Link */}
            <div className="pt-4 border-t-3 border-comic-ink flex items-center justify-between gap-3">
              <a
                href={mission.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="comic-btn w-full flex items-center justify-center gap-2 py-2.5 px-4 border-3 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-lg shadow-comic hover:bg-white transition-all"
              >
                <GitBranch className="w-5 h-5 text-marvel-red" />
                <span>ACCESS GITHUB REPOSITORY</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
