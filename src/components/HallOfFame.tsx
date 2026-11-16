import React from 'react';
import { MultiverseTheme } from '../types';
import { soundFx } from '../utils/soundFx';
import { Award, Briefcase, GraduationCap, Building2, Calendar, MapPin, CheckCircle, Sparkles } from 'lucide-react';

interface HallOfFameProps {
  theme: MultiverseTheme;
  onTriggerDecal: (text: string) => void;
  onOpenResume: () => void;
}

export const HallOfFame: React.FC<HallOfFameProps> = ({ theme, onTriggerDecal, onOpenResume }) => {
  const isMarvel = theme === 'marvel';

  const milestones = [
    {
      period: "JUL 2026",
      role: "Design Patent Granted — Government of India",
      organization: "The Patent Office, Government of India",
      location: "New Delhi / Mumbai, India",
      badge: "★ INTELLECTUAL PROPERTY ★",
      badgeColor: "bg-amber-400 text-comic-ink",
      icon: Award,
      achievements: [
        "Officially granted an Indian Design Patent for 'AnnaMrita' — an IoT-based food spoilage detection system.",
        "Calibrated multisensory arrays (gas, temperature, moisture) feeding real-time telemetry into ML models to predict food shelf life accurately."
      ]
    },
    {
      period: "2026",
      role: "Claude Certified Developer — Foundations (CCDV-F)",
      organization: "Anthropic",
      location: "Global Credential",
      badge: "OFFICIAL CERTIFICATION",
      badgeColor: "bg-blue-600 text-white",
      icon: Sparkles,
      achievements: [
        "Accredited in Anthropic Claude API architecture, prompt engineering techniques, and lightweight RAG systems.",
        "Engineered autonomous conversational intent parsing and agentic tool-use loops."
      ]
    },
    {
      period: "APR 2026 – PRESENT",
      role: "Systems Engineer (Java Full Stack Developer)",
      organization: "Tata Consultancy Services (TCS)",
      location: "Mumbai, India",
      badge: "ENTERPRISE PROVEN",
      badgeColor: "bg-marvel-red text-white",
      icon: Briefcase,
      achievements: [
        "Working as a Java Full Stack Developer on a data-intensive lab application used globally by a leading US-based client.",
        "Building and maintaining resilient backend microservices using Java, Spring Boot, and cloud architecture deployed on AWS.",
        "Contributing to high-throughput systems handling continuous, high-volume data streams with strict performance SLAs.",
        "Collaborating with a distributed, cross-functional team following Agile practices to deliver zero-defect features."
      ]
    },
    {
      period: "2021 – 2025",
      role: "B.E. in Information Technology (CGPA: 8.7 / 10)",
      organization: "Shree L.R. Tiwari College of Engineering",
      location: "Mumbai, India",
      badge: "DISTINCTION GRADUATE",
      badgeColor: "bg-marvel-yellow text-comic-ink",
      icon: GraduationCap,
      achievements: [
        "Graduated with distinction (8.7 / 10 CGPA), mastering data structures, distributed systems, network security, and database design.",
        "HSC (Science) in Bi-focal Computer Science from Elphinstone College (80.6%) & SSC from St. Francis D'Assisi High School (82.6%)."
      ]
    }
  ];

  return (
    <section className="py-12">
      
      {/* Title Bar */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-comic-ink pb-4">
        <div>
          <div className="inline-flex items-center gap-2 border-2 border-comic-ink bg-amber-400 text-comic-ink font-bangers text-sm px-3 py-0.5 shadow-comic-sm uppercase">
            <Award className="w-4 h-4" />
            <span>HALL OF FAME • CHRONICLES OF VICTORY</span>
          </div>
          <h2 className="font-bangers text-4xl sm:text-6xl tracking-wide mt-2">
            EXPERIENCE, PATENTS & CERTIFICATIONS
          </h2>
        </div>

        <button
          onClick={() => {
            soundFx.playToken();
            onOpenResume();
          }}
          className="comic-btn px-4 py-2 border-3 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-lg shadow-comic hover:bg-white"
        >
          VIEW COMPLETE RESUME DOSSIER
        </button>
      </div>

      {/* Timeline Stream */}
      <div className="space-y-6">
        {milestones.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.role}
              className={`comic-panel p-6 sm:p-7 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-comic-lg ${
                isMarvel ? 'bg-white text-comic-ink' : 'bg-dc-card text-dc-chalk'
              }`}
              onMouseEnter={() => {
                soundFx.playToken();
                onTriggerDecal(m.badge);
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b-3 border-comic-ink pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="border-3 border-comic-ink p-2 rounded-lg bg-comic-paper text-comic-ink shadow-comic-sm">
                    <Icon className="w-6 h-6 text-marvel-red" />
                  </div>
                  <div>
                    <h3 className="font-bangers text-2xl sm:text-3xl tracking-wide flex items-center gap-2">
                      <span className={isMarvel ? 'text-marvel-red' : 'text-dc-gold'}>
                        {m.role}
                      </span>
                    </h3>
                    <div className="font-comic font-bold text-sm opacity-90">
                      {m.organization} • <span className="opacity-75">{m.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`border-2 border-comic-ink font-bangers text-xs px-2.5 py-0.5 rounded shadow-comic-sm ${m.badgeColor}`}>
                    {m.badge}
                  </span>
                  <div className="flex items-center gap-1 font-arcade text-[10px] opacity-75 border-2 border-comic-ink px-2 py-0.5 rounded bg-comic-paper/40 text-comic-ink">
                    <Calendar className="w-3 h-3" />
                    <span>{m.period}</span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-2 font-comic text-sm">
                {m.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="opacity-90">{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
