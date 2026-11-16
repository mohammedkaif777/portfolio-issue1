import React from 'react';
import { MultiverseTheme } from '../types';
import { soundFx } from '../utils/soundFx';
import { Briefcase, Building2, Calendar, MapPin, CheckCircle, ShieldAlert, Cpu, ArrowUpRight, Terminal } from 'lucide-react';

interface ExperienceProps {
  theme: MultiverseTheme;
  onTriggerDecal: (text: string) => void;
  onOpenResume: () => void;
}

export const Experience: React.FC<ExperienceProps> = ({ theme, onTriggerDecal, onOpenResume }) => {
  const isMarvel = theme === 'marvel';

  return (
    <section id="experience" className="py-12">
      
      {/* Chapter Title Bar */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-comic-ink pb-4">
        <div>
          <div className="inline-flex items-center gap-2 border-2 border-comic-ink bg-marvel-red text-white font-bangers text-sm px-3 py-0.5 shadow-comic-sm uppercase">
            <Briefcase className="w-4 h-4" />
            <span>CHAPTER FIVE • ENTERPRISE EXPEDITION</span>
          </div>
          <h2 className="font-bangers text-4xl sm:text-6xl tracking-wide mt-2">
            PROFESSIONAL EXPERIENCE
          </h2>
        </div>

        <button
          onClick={() => {
            soundFx.playToken();
            onOpenResume();
          }}
          className="comic-btn px-4 py-2 border-3 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-base shadow-comic-sm hover:bg-white"
        >
          VIEW COMPLETE DOSSIER
        </button>
      </div>

      {/* Main Experience Hero Panel */}
      <div className={`comic-panel relative rounded-2xl p-6 sm:p-10 transition-all ${
        isMarvel ? 'bg-white text-comic-ink' : 'bg-dc-card text-dc-chalk'
      }`}>
        
        {/* Top Header Card */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-3 border-comic-ink pb-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl border-3 border-comic-ink bg-marvel-red text-white shadow-comic shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-arcade text-[10px] bg-marvel-yellow border border-comic-ink px-2 py-0.5 rounded text-comic-ink font-bold">
                  ACTIVE ROLE
                </span>
                <span className="font-bangers text-sm text-gray-500 uppercase tracking-wide">
                  TATA CONSULTANCY SERVICES (TCS)
                </span>
              </div>
              <h3 className="font-bangers text-3xl sm:text-4xl text-marvel-red leading-tight mt-1">
                Systems Engineer (Java Full Stack Developer)
              </h3>
              <div className="font-comic font-bold text-sm text-gray-700 flex flex-wrap items-center gap-3 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-marvel-red" />
                  <span>Mumbai, India</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-marvel-red" />
                  <span>Apr 2026 – Present</span>
                </span>
              </div>
            </div>
          </div>

          <div className="border-3 border-comic-ink bg-comic-paper text-comic-ink p-3 rounded-xl shadow-comic text-center self-start lg:self-center">
            <span className="font-arcade text-[9px] text-gray-600 block">GLOBAL SCALE</span>
            <span className="font-bangers text-xl text-blue-700 font-bold block">US CLIENT LAB APP</span>
            <span className="font-comic text-[10px] text-gray-600">Enterprise High-Throughput System</span>
          </div>
        </div>

        {/* Core Pillars & Bullet Points */}
        <div className="space-y-4 font-comic text-sm sm:text-base leading-relaxed mb-8">
          <div className="border-2 border-comic-ink p-4 rounded-xl bg-comic-paper/40 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
            <div>
              <strong className="text-gray-900 block mb-0.5">High-Volume Global Lab Application:</strong>
              <span>
                Working as a Java Full Stack Developer on a data-intensive laboratory application deployed globally for a leading US-based client (client name withheld per confidentiality policy).
              </span>
            </div>
          </div>

          <div className="border-2 border-comic-ink p-4 rounded-xl bg-comic-paper/40 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
            <div>
              <strong className="text-gray-900 block mb-0.5">AWS Cloud & Microservices Engineering:</strong>
              <span>
                Building and maintaining resilient backend services using <strong>Java, Spring Boot</strong>, and distributed microservices architecture running at scale on <strong>AWS</strong>.
              </span>
            </div>
          </div>

          <div className="border-2 border-comic-ink p-4 rounded-xl bg-comic-paper/40 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
            <div>
              <strong className="text-gray-900 block mb-0.5">Continuous Data Streams & High Availability:</strong>
              <span>
                Contributing to a system that handles continuous, high-volume data streams with strict requirements for low latency, zero data loss, fault tolerance, and performance.
              </span>
            </div>
          </div>

          <div className="border-2 border-comic-ink p-4 rounded-xl bg-comic-paper/40 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
            <div>
              <strong className="text-gray-900 block mb-0.5">Agile & Distributed Engineering Discipline:</strong>
              <span>
                Collaborating with a distributed cross-functional team following strict Agile methodologies to deliver features, performance optimizations, and zero-defect deployments.
              </span>
            </div>
          </div>
        </div>

        {/* Tech Weapons Strip */}
        <div className="pt-4 border-t-3 border-comic-ink flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bangers text-sm text-gray-600 uppercase">Enterprise Weapons:</span>
            <div className="flex flex-wrap gap-1.5">
              {['Java', 'Spring Boot', 'AWS Cloud', 'Microservices', 'PostgreSQL', 'REST APIs', 'Agile'].map((tech) => (
                <span
                  key={tech}
                  className="border-2 border-comic-ink bg-marvel-yellow/30 text-xs font-comic font-bold px-2.5 py-0.5 rounded shadow-comic-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <span className="font-arcade text-[10px] text-emerald-600 font-bold">
            ● ZERO REGRESSION PRODUCTION RECORD
          </span>
        </div>

      </div>

    </section>
  );
};
