import React from 'react';
import { MultiverseTheme } from '../types';
import { soundFx } from '../utils/soundFx';
import { BookOpen, Sparkles, Building2, Brain, ShieldCheck, Award } from 'lucide-react';

interface OriginStoryProps {
  theme: MultiverseTheme;
  onTriggerDecal: (text: string) => void;
}

export const OriginStory: React.FC<OriginStoryProps> = ({ theme, onTriggerDecal }) => {
  const isMarvel = theme === 'marvel';

  const panels = [
    {
      panelNum: "01",
      title: "THE GENESIS & FOUNDATIONS",
      badge: "B.E. INFORMATION TECHNOLOGY • 8.7 CGPA",
      narrator: "IN THE ACADEMIC HALLS OF MUMBAI...",
      story: "Graduating with an 8.7 / 10 CGPA in Information Technology from Shree L.R. Tiwari College of Engineering, Kaif refused to accept technology at surface level. He explored compilers, network protocols, hardware circuits, and enterprise architectures.",
      quote: "Curiosity isn't just a trait — it's the catalyst for genuine engineering mastery.",
      icon: BookOpen,
      accent: isMarvel ? "text-marvel-blue" : "text-dc-cyan",
      decal: "ACADEMIC DISTINCTION!"
    },
    {
      panelNum: "02",
      title: "THE TCS ENTERPRISE CRUCIBLE",
      badge: "SYSTEMS ENGINEER • AWS MICROSERVICES",
      narrator: "FORGING CLOUD SCALE AT TCS...",
      story: "Stepping into Tata Consultancy Services (TCS) as a Systems Engineer (Java Full Stack Developer), he builds and maintains data-intensive laboratory applications deployed globally on AWS for a leading US client, engineering resilient Spring Boot services under strict uptime mandates.",
      quote: "Enterprise scale demands unwavering discipline: build resilient, build testable, and build to endure.",
      icon: Building2,
      accent: isMarvel ? "text-marvel-red" : "text-dc-gold",
      decal: "ENTERPRISE PROVEN!"
    },
    {
      panelNum: "03",
      title: "THE PATENTED HARDWARE INVENTOR",
      badge: "GOVT OF INDIA DESIGN PATENT (JUL 2026)",
      narrator: "FUSING IOT SENSORS & MACHINE LEARNING...",
      story: "Invented 'AnnaMrita', an IoT-based food spoilage detection system integrating ESP32, temperature, moisture, and gas sensors with ML models to predict food shelf life. His breakthrough was awarded an official Design Patent by the Government of India in July 2026.",
      quote: "True innovation bridges physical sensors with intelligent cloud algorithms to protect human lives.",
      icon: Award,
      accent: "text-amber-500",
      decal: "PATENT GRANTED!"
    },
    {
      panelNum: "04",
      title: "THE MODERN AI SENTINEL",
      badge: "CLAUDE CERTIFIED DEVELOPER • 2026",
      narrator: "TODAY, AT THE BLEEDING-EDGE AI FRONTIER...",
      story: "Certified as a Claude Developer by Anthropic, Kaif builds autonomous agentic workflows, API dependency intelligence engines, and generative AI systems. Today, as 'Lords of the Codes', he empowers intelligence for the systems of tomorrow.",
      quote: "From writing code to empowering intelligence — building the systems of tomorrow.",
      icon: ShieldCheck,
      accent: "text-emerald-500",
      decal: "CLAUDE CERTIFIED!"
    }
  ];

  return (
    <section id="origin" className="py-12">
      
      {/* Chapter Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-comic-ink pb-4">
        <div>
          <div className="inline-flex items-center gap-2 border-2 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-sm px-3 py-0.5 shadow-comic-sm uppercase">
            <Sparkles className="w-4 h-4" />
            <span>CHAPTER ONE • THE NARRATIVE ARC</span>
          </div>
          <h2 className="font-bangers text-4xl sm:text-6xl tracking-wide mt-2">
            ORIGIN STORY: THE ARCHITECT'S GENESIS
          </h2>
        </div>
        <div className="font-comic text-sm opacity-80 max-w-md">
          Every hero has a journey. Read the multi-panel story that forged the engineer behind 
          <span className="font-bold text-marvel-red"> Lords of the Codes</span>.
        </div>
      </div>

      {/* 4-Panel Comic Strip Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {panels.map((p) => {
          const IconComponent = p.icon;
          return (
            <div
              key={p.panelNum}
              className={`comic-panel relative rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-comic-lg ${
                isMarvel ? 'bg-white text-comic-ink' : 'bg-dc-card text-dc-chalk'
              }`}
              onMouseEnter={() => {
                soundFx.playToken();
                onTriggerDecal(p.decal);
              }}
            >
              
              {/* Top Panel Banner */}
              <div>
                <div className="flex items-center justify-between mb-4 border-b-3 border-comic-ink pb-2">
                  <div className="flex items-center gap-2">
                    <span className="border-2 border-comic-ink bg-comic-paper text-comic-ink font-arcade text-xs px-2 py-0.5 font-bold shadow-comic-sm">
                      PANEL #{p.panelNum}
                    </span>
                    <span className="font-bangers text-xs tracking-wider uppercase opacity-75">
                      {p.badge}
                    </span>
                  </div>
                  <IconComponent className={`w-6 h-6 ${p.accent}`} />
                </div>

                {/* Narrator Caption Box */}
                <div className="border-2 border-comic-ink bg-marvel-yellow text-comic-ink p-2 font-bangers text-sm tracking-wider shadow-comic-sm mb-4 transform -rotate-1">
                  ★ {p.narrator} ★
                </div>

                {/* Panel Title */}
                <h3 className="font-bangers text-3xl tracking-wide mb-3 flex items-center gap-2">
                  <span className={p.accent}>{p.title}</span>
                </h3>

                {/* Narrative Text */}
                <p className="font-comic text-base leading-relaxed opacity-90 mb-6">
                  {p.story}
                </p>
              </div>

              {/* Comic Speech Balloon Quote */}
              <div className="mt-auto">
                <div className="speech-bubble bg-comic-paper text-comic-ink border-3 border-comic-ink p-3.5 rounded-xl shadow-comic">
                  <p className="font-comic font-bold text-sm leading-snug">
                    "{p.quote}"
                  </p>
                  <div className="text-[10px] font-bold text-gray-600 mt-1 uppercase text-right">
                    — Kaif's Codex
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
