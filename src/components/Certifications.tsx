import React from 'react';
import { MultiverseTheme } from '../types';
import { soundFx } from '../utils/soundFx';
import { Award, Sparkles, CheckCircle2, Shield, ExternalLink, Cpu } from 'lucide-react';

interface CertificationsProps {
  theme: MultiverseTheme;
  onTriggerDecal: (text: string) => void;
  onOpenResume: () => void;
}

export const Certifications: React.FC<CertificationsProps> = ({ theme, onTriggerDecal, onOpenResume }) => {
  const isMarvel = theme === 'marvel';

  return (
    <section id="certifications" className="py-12">
      
      {/* Chapter Title Bar */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-comic-ink pb-4">
        <div>
          <div className="inline-flex items-center gap-2 border-2 border-comic-ink bg-amber-400 text-comic-ink font-bangers text-sm px-3 py-0.5 shadow-comic-sm uppercase">
            <Award className="w-4 h-4" />
            <span>CHAPTER SIX • PATENTS & CREDENTIALS</span>
          </div>
          <h2 className="font-bangers text-4xl sm:text-6xl tracking-wide mt-2">
            INTELLECTUAL PROPERTY & CERTIFICATIONS
          </h2>
        </div>
        <div className="font-comic text-sm opacity-80 max-w-md">
          Official government intellectual property grants and validated artificial intelligence certifications.
        </div>
      </div>

      {/* Grid of Two Distinct Accreditations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Government of India Design Patent */}
        <div
          className={`comic-panel relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-comic-lg ${
            isMarvel ? 'bg-white text-comic-ink' : 'bg-dc-card text-dc-chalk'
          }`}
          onMouseEnter={() => {
            soundFx.playToken();
            onTriggerDecal('PATENT GRANTED!');
          }}
        >
          <div>
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4 border-b-3 border-comic-ink pb-2">
              <span className="border-2 border-comic-ink bg-gradient-to-r from-amber-400 to-yellow-300 text-comic-ink font-arcade text-[10px] px-2.5 py-1 font-bold shadow-comic-sm">
                ★ INTELLECTUAL PROPERTY ★
              </span>
              <span className="font-arcade text-[10px] text-gray-600 font-bold">
                JUL 2026
              </span>
            </div>

            <div className="flex items-start gap-3 mb-3">
              <div className="p-3 rounded-xl border-3 border-comic-ink bg-gradient-to-tr from-amber-500 to-yellow-300 text-comic-ink shadow-comic shrink-0">
                <Award className="w-8 h-8 text-amber-900" />
              </div>
              <div>
                <span className="font-arcade text-[10px] text-red-600 font-bold uppercase tracking-wider block">
                  GOVERNMENT OF INDIA
                </span>
                <h3 className="font-bangers text-3xl leading-tight text-marvel-red">
                  Design Patent Granted
                </h3>
              </div>
            </div>

            <div className="border-2 border-comic-ink bg-amber-50 text-comic-ink p-3 rounded-lg mb-4 shadow-comic-sm font-comic">
              <div className="font-bold text-sm text-amber-900">
                Apparatus: “AnnaMrita” IoT-Based Food Spoilage Detection System
              </div>
              <div className="text-xs text-gray-700 mt-0.5">
                Issued by The Patent Office, Controller General of Patents, Designs & Trade Marks, Govt of India.
              </div>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm font-comic opacity-95 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Patented sensory hardware apparatus combining ESP32 with calibrated gas, temperature, and moisture telemetry.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Integrated machine learning inference models to accurately predict perishable food shelf-life and prevent spoilage waste.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Full hardware prototype engineered and validated with real sensor telemetry curves.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t-3 border-comic-ink flex items-center justify-between">
            <span className="font-bangers text-sm text-amber-600">OFFICIAL GOVERNMENT IP</span>
            <button
              onClick={() => {
                soundFx.playToken();
                onOpenResume();
              }}
              className="comic-btn text-xs font-bangers px-3 py-1.5 border-2 border-comic-ink bg-amber-400 text-comic-ink shadow-comic-sm hover:bg-white"
            >
              VIEW PATENT CITATION
            </button>
          </div>
        </div>

        {/* Card 2: Claude Certified Developer — Foundations (CCDV-F) */}
        <div
          className={`comic-panel relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-comic-lg ${
            isMarvel ? 'bg-white text-comic-ink' : 'bg-dc-card text-dc-chalk'
          }`}
          onMouseEnter={() => {
            soundFx.playToken();
            onTriggerDecal('CLAUDE CERTIFIED!');
          }}
        >
          <div>
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4 border-b-3 border-comic-ink pb-2">
              <span className="border-2 border-comic-ink bg-blue-600 text-white font-arcade text-[10px] px-2.5 py-1 font-bold shadow-comic-sm">
                OFFICIAL CERTIFICATION
              </span>
              <span className="font-arcade text-[10px] text-gray-600 font-bold">
                2026
              </span>
            </div>

            <div className="flex items-start gap-3 mb-3">
              <div className="p-3 rounded-xl border-3 border-comic-ink bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-comic shrink-0">
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </div>
              <div>
                <span className="font-arcade text-[10px] text-blue-600 font-bold uppercase tracking-wider block">
                  ANTHROPIC OFFICIAL CREDENTIAL
                </span>
                <h3 className="font-bangers text-3xl leading-tight text-blue-700">
                  Claude Certified Developer — Foundations (CCDV-F)
                </h3>
              </div>
            </div>

            <div className="border-2 border-comic-ink bg-blue-50 text-comic-ink p-3 rounded-lg mb-4 shadow-comic-sm font-comic">
              <div className="font-bold text-sm text-blue-950">
                Validated in Next-Gen LLM Architectures & Tool Use
              </div>
              <div className="text-xs text-gray-700 mt-0.5">
                Issued by Anthropic to validate developers in production Claude API engineering.
              </div>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm font-comic opacity-95 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Mastery over advanced prompt engineering, XML structural framing, and chain-of-thought system prompts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Lightweight Retrieval-Augmented Generation (RAG) pipelines, multimodal/vision document parsing, and embeddings.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Autonomous multi-agent planning loops and tool execution with deterministic schema enforcement.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t-3 border-comic-ink flex items-center justify-between">
            <span className="font-bangers text-sm text-blue-600">VERIFIED ANTHROPIC CREDENTIAL</span>
            <button
              onClick={() => {
                soundFx.playToken();
                onOpenResume();
              }}
              className="comic-btn text-xs font-bangers px-3 py-1.5 border-2 border-comic-ink bg-blue-600 text-white shadow-comic-sm hover:bg-black"
            >
              VIEW CREDENTIAL
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
