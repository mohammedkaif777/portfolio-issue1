import React, { useState } from 'react';
import { MultiverseTheme } from '../types';
import { soundFx } from '../utils/soundFx';
import { GraduationCap, School, BookOpen, Sparkles, ArrowRight, ArrowDown } from 'lucide-react';

interface EducationFlowProps {
  theme: MultiverseTheme;
  onTriggerDecal: (text: string) => void;
}

export const EducationFlow: React.FC<EducationFlowProps> = ({ theme, onTriggerDecal }) => {
  const [activeStep, setActiveStep] = useState<number>(3);
  const isMarvel = theme === 'marvel';

  const steps = [
    {
      step: 1,
      stage: "STAGE 01 • HIGH SCHOOL",
      institution: "St. Francis D'Assisi High School",
      affiliation: "SSC Board, Mumbai",
      degree: "Secondary School Certificate (SSC)",
      grade: "82.6%",
      gradeLabel: "DISTINCTION",
      period: "2018 – 2019",
      icon: School,
      tagline: "The Foundational Spark",
      summary: "First exposure to computer fundamentals, mathematics, and science principles that sparked a lifelong obsession with programming.",
      color: isMarvel ? "bg-marvel-yellow text-comic-ink" : "bg-dc-gold text-comic-ink",
      decal: "SSC: 82.6% CONQUERED!"
    },
    {
      step: 2,
      stage: "STAGE 02 • JR COLLEGE",
      institution: "Elphinstone College",
      affiliation: "Maharashtra State Board, Mumbai",
      degree: "HSC (Science) — Bi-focal Computer Science",
      grade: "80.6%",
      gradeLabel: "FIRST CLASS DISTINCTION",
      period: "2019 – 2021",
      icon: BookOpen,
      tagline: "Algorithmic Awakening",
      summary: "Specialized in Bi-focal Computer Science, delving into C++, data structures, digital electronics, microprocessors, and computational problem-solving.",
      color: isMarvel ? "bg-marvel-blue text-white" : "bg-dc-cyan text-comic-ink",
      decal: "HSC: 80.6% ACHIEVED!"
    },
    {
      step: 3,
      stage: "STAGE 03 • GRADUATION",
      institution: "Shree L.R. Tiwari College of Engineering",
      affiliation: "University of Mumbai",
      degree: "Bachelor of Engineering (B.E.) in Information Technology",
      grade: "8.7 GPA / CGPA",
      gradeLabel: "APEX DISTINCTION",
      period: "2021 – 2025",
      icon: GraduationCap,
      tagline: "Engineering Mastery & Innovation",
      summary: "Graduated with an 8.7 CGPA, mastering distributed systems, cloud computing, database internals, and inventing the patent-granted AnnaMrita IoT system.",
      color: isMarvel ? "bg-marvel-red text-white" : "bg-amber-400 text-comic-ink",
      decal: "8.7 CGPA • UNIVERSITY OF MUMBAI!"
    }
  ];

  return (
    <section id="education" className="py-8 sm:py-12">
      
      {/* Chapter Title Bar */}
      <div className="mb-6 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 border-b-4 border-comic-ink pb-3 sm:pb-4">
        <div>
          <div className="inline-flex items-center gap-2 border-2 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 shadow-comic-sm uppercase">
            <GraduationCap className="w-4 h-4" />
            <span>ACADEMIC ODYSSEY • LINEAR TIMELINE</span>
          </div>
          <h2 className="font-bangers text-3xl sm:text-5xl md:text-6xl tracking-wide mt-1.5 leading-tight">
            EDUCATIONAL EVOLUTION FLOW
          </h2>
        </div>
        <div className="font-comic text-xs sm:text-sm opacity-80 max-w-md">
          A continuous linear progression tracing the academic milestones that forged Kaif's software engineering foundation.
        </div>
      </div>

      {/* Main Linear Animated Flow Container */}
      <div className={`comic-panel relative rounded-2xl p-4 sm:p-8 lg:p-10 ${
        isMarvel ? 'bg-white text-comic-ink' : 'bg-dc-card text-dc-chalk'
      }`}>
        
        {/* Animated Connecting Track (Desktop Horizontal Beam) */}
        <div className="hidden lg:block relative mb-12">
          <div className="h-4 w-full bg-black/80 rounded-full border-2 border-comic-ink overflow-hidden p-0.5 relative">
            <div className={`h-full rounded-full animate-pulse transition-all duration-700 ${
              isMarvel 
                ? 'bg-gradient-to-r from-marvel-yellow via-marvel-blue to-marvel-red' 
                : 'bg-gradient-to-r from-dc-gold via-dc-cyan to-amber-400'
            }`} style={{ width: '100%' }} />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-marvel-yellow border-2 border-black shadow-[0_0_12px_#FFD200] animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] left-1/2" />
        </div>

        {/* 3 Steps Linear Grid (Desktop Horizontal, Mobile/Tablet Vertical with connecting arrows) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === s.step;

            return (
              <React.Fragment key={s.step}>
                <div
                  onClick={() => {
                    setActiveStep(s.step);
                    soundFx.playToken();
                    onTriggerDecal(s.decal);
                  }}
                  onMouseEnter={() => {
                    soundFx.playClick();
                    onTriggerDecal(s.decal);
                  }}
                  className={`comic-panel relative rounded-xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'ring-4 ring-marvel-red transform -translate-y-1.5 shadow-comic-lg'
                      : 'hover:-translate-y-1 hover:shadow-comic opacity-95'
                  } ${
                    isMarvel ? 'bg-comic-paper' : 'bg-dc-dark'
                  }`}
                >
                  
                  {/* Desktop Step Connector Arrow */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-20">
                      <div className="w-8 h-8 rounded-full border-2 border-comic-ink bg-marvel-yellow text-comic-ink flex items-center justify-center font-bold shadow-comic-sm">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  <div>
                    {/* Step Header Badge */}
                    <div className="flex items-center justify-between mb-3 border-b-2 border-comic-ink pb-2">
                      <span className="font-arcade text-[9px] sm:text-[10px] uppercase font-bold text-gray-600">
                        {s.stage}
                      </span>
                      <span className="font-arcade text-[9px] sm:text-[10px] bg-comic-paper border border-comic-ink px-2 py-0.5 rounded text-comic-ink font-semibold">
                        {s.period}
                      </span>
                    </div>

                    {/* Institution & Degree */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-lg border-2 border-comic-ink shrink-0 shadow-comic-sm ${s.color}`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <h3 className="font-bangers text-xl sm:text-2xl leading-tight">
                          {s.institution}
                        </h3>
                        <div className="font-comic text-xs opacity-75">
                          {s.affiliation}
                        </div>
                      </div>
                    </div>

                    {/* Degree Badge */}
                    <div className="border-2 border-comic-ink bg-white/80 text-comic-ink p-2 rounded-lg mb-3 sm:mb-4 shadow-comic-sm">
                      <div className="font-bold text-xs">
                        {s.degree}
                      </div>
                    </div>

                    {/* Score Highlight Box */}
                    <div className="border-2 sm:border-3 border-comic-ink bg-gradient-to-r from-amber-200 via-marvel-yellow to-yellow-100 text-comic-ink p-2.5 sm:p-3 rounded-xl mb-3 sm:mb-4 shadow-comic-sm flex items-center justify-between">
                      <div>
                        <span className="text-[8px] sm:text-[9px] font-arcade text-gray-700 block">FINAL SCORE</span>
                        <span className="font-bangers text-2xl sm:text-3xl leading-none text-marvel-red font-bold">
                          {s.grade}
                        </span>
                      </div>
                      <span className="font-arcade text-[8px] sm:text-[9px] bg-white border border-comic-ink px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-bold">
                        {s.gradeLabel}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="font-comic text-xs sm:text-sm leading-relaxed opacity-90 mb-4">
                      {s.summary}
                    </p>
                  </div>

                  {/* Bottom Tag */}
                  <div className="pt-3 border-t-2 border-comic-ink flex items-center gap-2 text-xs font-bold text-gray-700">
                    <Sparkles className="w-3.5 h-3.5 text-marvel-red shrink-0" />
                    <span>{s.tagline}</span>
                  </div>

                </div>

                {/* Mobile / Tablet Vertical Connector Arrow */}
                {idx < steps.length - 1 && (
                  <div className="flex lg:hidden justify-center my-1">
                    <div className="w-8 h-8 rounded-full border-2 border-comic-ink bg-marvel-yellow text-comic-ink flex items-center justify-center font-bold shadow-comic-sm animate-bounce">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>

    </section>
  );
};
