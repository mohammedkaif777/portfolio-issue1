import React, { useState } from 'react';
import { MultiverseTheme } from '../types';
import { soundFx } from '../utils/soundFx';
import { Brain, Shield, Wrench, Zap, Cpu, Server, Database, Cloud, Radio, Sparkles, Terminal, Award } from 'lucide-react';

interface SuperpowersProps {
  theme: MultiverseTheme;
  onTriggerDecal: (text: string) => void;
}

export const Superpowers: React.FC<SuperpowersProps> = ({ theme, onTriggerDecal }) => {
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const isMarvel = theme === 'marvel';

  const tiers = [
    {
      id: 1,
      title: "OFFENSIVE ARSENAL",
      subtitle: "AI, LLMs, JAVA & PYTHON SYSTEMS",
      icon: Brain,
      description: "Core intelligence and backend frameworks powering autonomous agents, enterprise microservices, and AI reasoning pipelines.",
      skills: [
        { name: "Java & Spring Boot", level: 98, status: "TCS Enterprise Apex", desc: "Production microservices, REST APIs, high-volume data streams" },
        { name: "LLM APIs & Prompt Engineering", level: 99, status: "Claude Certified", desc: "Anthropic Claude, OpenAI, conversational intent parsing, multi-agent loops" },
        { name: "Python & FastAPI", level: 97, status: "Master Tier", desc: "Asynchronous backend microservices, Pydantic, data pipelines" },
        { name: "RAG & Vector Search", level: 96, status: "Master Tier", desc: "Semantic chunking, multimodal/vision extraction, hybrid retrieval" },
      ]
    },
    {
      id: 2,
      title: "DEFENSIVE MATRIX",
      subtitle: "AWS, ARCHITECTURE & ENTERPRISE SCALE",
      icon: Shield,
      description: "High-availability cloud infrastructure and architectural governance ensuring zero downtime and reliable multi-tenant isolation.",
      skills: [
        { name: "AWS Cloud & Deployment", level: 95, status: "Cloud Pro", desc: "EC2, ECS, S3, IAM, microservices deployment for US client at TCS" },
        { name: "Software Architecture & Microservices", level: 97, status: "Master Tier", desc: "Domain-driven design, blast-radius analysis, cycle detection" },
        { name: "OpenAPI 3.x & Spec Diffing", level: 96, status: "Apex Power", desc: "Automated breaking-change classification and dependency mapping" },
        { name: "Multi-Tenant Data Isolation", level: 94, status: "Enterprise Shield", desc: "Org-scoped query enforcement at repository layer" },
      ]
    },
    {
      id: 3,
      title: "TACTICAL ARSENAL",
      subtitle: "IOT HARDWARE, DATABASES & TOOLS",
      icon: Wrench,
      description: "Hardware telemetry, patent-granted embedded sensors, database query tuning, and automated delivery pipelines.",
      skills: [
        { name: "IoT & Embedded Sensors", level: 96, status: "★ Patent Granted ★", desc: "ESP32 firmware, gas/temp/moisture sensor calibration, edge telemetry" },
        { name: "Relational DBs (PostgreSQL & MySQL)", level: 95, status: "Master Tier", desc: "Complex indexing, schema composition, multi-tenant isolation" },
        { name: "Frontend (React JS & Tailwind CSS)", level: 92, status: "Expert Tier", desc: "Component architecture, interactive comic UI, state management" },
        { name: "DevOps (Docker, Git, Linux, Postman)", level: 94, status: "Master Tier", desc: "CI/CD automation, API testing, containerized workloads" },
      ]
    }
  ];

  const currentTierData = tiers.find(t => t.id === selectedTier) || tiers[0];

  return (
    <section id="superpowers" className="py-12">
      
      {/* Chapter Title Bar */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-comic-ink pb-4">
        <div>
          <div className="inline-flex items-center gap-2 border-2 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-sm px-3 py-0.5 shadow-comic-sm uppercase">
            <Zap className="w-4 h-4" />
            <span>CHAPTER TWO • THE POWER MATRIX</span>
          </div>
          <h2 className="font-bangers text-4xl sm:text-6xl tracking-wide mt-2">
            SUPERPOWERS & TECHNICAL ARSENAL
          </h2>
        </div>
        <div className="font-comic text-sm opacity-80 max-w-md">
          Calibrated power meters showcasing enterprise Java/AWS mastery, Generative AI capabilities, and patented IoT innovation.
        </div>
      </div>

      {/* Accreditations Ribbon */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-3 border-comic-ink p-3 rounded-xl bg-gradient-to-r from-amber-200 to-yellow-100 text-comic-ink shadow-comic flex items-center gap-3">
          <Award className="w-8 h-8 text-amber-700 shrink-0" />
          <div>
            <span className="font-bangers text-xs text-red-600 block">GOVERNMENT OF INDIA DESIGN PATENT (JUL 2026)</span>
            <span className="font-comic font-bold text-sm block">AnnaMrita: IoT Food Spoilage Detection System</span>
          </div>
        </div>

        <div className="border-3 border-comic-ink p-3 rounded-xl bg-gradient-to-r from-blue-200 to-indigo-100 text-comic-ink shadow-comic flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-blue-700 shrink-0" />
          <div>
            <span className="font-bangers text-xs text-blue-800 block">OFFICIAL ANTHROPIC ACCREDITATION (2026)</span>
            <span className="font-comic font-bold text-sm block">Claude Certified Developer — Foundations (CCDV-F)</span>
          </div>
        </div>
      </div>

      {/* Tier Selection Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {tiers.map((t) => {
          const Icon = t.icon;
          const isSelected = t.id === selectedTier;
          return (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTier(t.id);
                soundFx.playToken();
                onTriggerDecal(`${t.title}!`);
              }}
              className={`comic-btn p-4 rounded-xl border-4 border-comic-ink text-left transition-all ${
                isSelected
                  ? isMarvel
                    ? 'bg-marvel-red text-white shadow-comic-lg transform -translate-y-1'
                    : 'bg-dc-gold text-comic-ink shadow-comic-lg transform -translate-y-1'
                  : isMarvel
                    ? 'bg-white text-gray-800 shadow-comic hover:bg-gray-100'
                    : 'bg-dc-card text-gray-300 shadow-comic hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-arcade text-[10px] uppercase font-bold opacity-80">
                  TIER {t.id}
                </span>
                <Icon className="w-6 h-6" />
              </div>
              <div className="font-bangers text-2xl tracking-wide">
                {t.title}
              </div>
              <div className="font-comic text-xs opacity-90 line-clamp-1">
                {t.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Tier Power Console */}
      <div className={`comic-panel p-6 sm:p-8 rounded-xl ${
        isMarvel ? 'bg-white text-comic-ink' : 'bg-dc-card text-dc-chalk'
      }`}>
        
        {/* Tier Header Summary */}
        <div className="border-b-3 border-comic-ink pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="border-2 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-xs px-2.5 py-0.5 shadow-comic-sm">
                ACTIVATED MATRIX
              </span>
              <h3 className="font-bangers text-3xl text-marvel-red">
                {currentTierData.title}: {currentTierData.subtitle}
              </h3>
            </div>
            <p className="font-comic text-sm opacity-90 mt-1 max-w-2xl">
              {currentTierData.description}
            </p>
          </div>

          <div className="border-2 border-comic-ink bg-comic-paper text-comic-ink px-4 py-2 rounded font-arcade text-xs text-center shadow-comic-sm">
            <span className="block text-[9px] text-gray-600">AVG POWER LEVEL</span>
            <span className="text-base text-marvel-red font-bold">96.8% MASTER</span>
          </div>
        </div>

        {/* Skill Power Meters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentTierData.skills.map((skill) => (
            <div
              key={skill.name}
              className={`border-3 border-comic-ink p-4 rounded-xl shadow-comic transition-all group ${
                isMarvel ? 'bg-comic-paper/50 hover:bg-amber-50' : 'bg-black/40 hover:bg-black/60'
              }`}
              onMouseEnter={() => soundFx.playClick()}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bangers text-xl tracking-wide flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-marvel-red" />
                  <span>{skill.name}</span>
                </span>
                <span className="border-2 border-comic-ink bg-marvel-yellow text-comic-ink font-arcade text-[9px] px-2 py-0.5 rounded shadow-comic-sm">
                  {skill.status}
                </span>
              </div>

              <p className="font-comic text-xs opacity-75 mb-3 line-clamp-1">
                {skill.desc}
              </p>

              {/* Comic Power Bar Meter */}
              <div className="relative">
                <div className="w-full bg-black/80 border-2 border-comic-ink h-6 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2 text-[10px] font-arcade font-bold ${
                      isMarvel
                        ? 'bg-gradient-to-r from-marvel-yellow via-amber-500 to-marvel-red text-white'
                        : 'bg-gradient-to-r from-amber-600 to-dc-gold text-comic-ink'
                    }`}
                    style={{ width: `${skill.level}%` }}
                  >
                    <span>{skill.level}%</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
