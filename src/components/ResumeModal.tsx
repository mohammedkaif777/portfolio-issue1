import React, { useState } from 'react';
import { MultiverseTheme } from '../types';
import { soundFx } from '../utils/soundFx';
import { printProfessionalResume } from '../utils/printProfessionalResume';
import { X, Printer, Award, ExternalLink, Mail, Phone, MapPin, Briefcase, FileText, Download } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: MultiverseTheme;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, theme }) => {
  const [viewMode, setViewMode] = useState<'comic' | 'professional'>('professional');

  if (!isOpen) return null;

  const isMarvel = theme === 'marvel';

  const handlePrintProfessional = () => {
    soundFx.playVictory();
    printProfessionalResume();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      
      {/* Modal Container */}
      <div className={`comic-panel relative w-full max-w-4xl rounded-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto ${
        isMarvel ? 'bg-comic-paper text-comic-ink' : 'bg-dc-dark text-dc-chalk'
      }`}>
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b-4 border-comic-ink">
          
          <div className="flex items-center gap-2">
            <span className="border-2 border-comic-ink bg-red-600 text-white font-arcade text-xs px-2.5 py-1 font-bold shadow-comic-sm">
              VERIFIED
            </span>
            <span className="font-bangers text-2xl tracking-wide">
              MOHAMMED KAIF • RESUME & DOSSIER
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* View Mode Switcher */}
            <div className="flex items-center border-2 border-comic-ink rounded-lg overflow-hidden font-bangers text-sm shadow-comic-sm">
              <button
                onClick={() => {
                  setViewMode('professional');
                  soundFx.playClick();
                }}
                className={`px-3 py-1 transition-colors ${
                  viewMode === 'professional' ? 'bg-marvel-yellow text-comic-ink font-bold' : 'bg-gray-200 text-gray-700'
                }`}
              >
                PROFESSIONAL ATS
              </button>
              <button
                onClick={() => {
                  setViewMode('comic');
                  soundFx.playClick();
                }}
                className={`px-3 py-1 transition-colors ${
                  viewMode === 'comic' ? 'bg-marvel-red text-white font-bold' : 'bg-gray-200 text-gray-700'
                }`}
              >
                COMIC DOSSIER
              </button>
            </div>

            {/* Dedicated Professional PDF Button */}
            <button
              onClick={handlePrintProfessional}
              className="comic-btn flex items-center gap-1.5 px-4 py-1.5 border-3 border-comic-ink bg-gradient-to-r from-amber-400 via-marvel-yellow to-yellow-300 text-comic-ink font-bangers text-base shadow-comic-sm hover:bg-white animate-pulse"
              title="Print or Save as Pristine Professional PDF"
            >
              <Download className="w-4 h-4 text-marvel-red" />
              <span>PROFESSIONAL PDF</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="comic-btn p-1.5 border-3 border-comic-ink bg-red-500 text-white shadow-comic-sm hover:bg-black"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: EXACT PROFESSIONAL RESUME FORMAT (ATS CLEAN VIEW)       */}
        {/* ============================================================== */}
        {viewMode === 'professional' ? (
          <div className="bg-white text-gray-900 p-6 sm:p-10 rounded-xl border-3 border-comic-ink shadow-comic font-sans leading-relaxed text-sm space-y-5">
            
            {/* Professional Header */}
            <div className="text-center border-b-2 border-gray-800 pb-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-black mb-1">
                MOHAMMED KAIF ABDUL SALAM TUNGEKAR
              </h1>
              <div className="text-xs sm:text-sm text-gray-700 flex flex-wrap justify-center gap-2">
                <span>+91 9820293676</span>
                <span>|</span>
                <span>Borivali, Mumbai, India</span>
                <span>|</span>
                <a href="mailto:mohammedkaift@gmail.com" className="text-blue-700 hover:underline">
                  mohammedkaift@gmail.com
                </a>
                <span>|</span>
                <a href="https://www.linkedin.com/in/mohammedkaiftungekar/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-semibold">
                  LinkedIn
                </a>
                <span>|</span>
                <a href="https://github.com/mohammedkaif777" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-semibold">
                  GitHub
                </a>
              </div>
            </div>

            {/* EXPERIENCE */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-2">
                EXPERIENCE
              </h2>
              <div className="flex flex-col sm:flex-row sm:justify-between items-baseline mb-1">
                <span className="font-bold text-gray-900">Systems Engineer, Tata Consultancy Services (TCS)</span>
                <span className="text-xs font-semibold text-gray-700">Mumbai, India | Apr 2026 – Present</span>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-[13px] text-gray-800 space-y-1 ml-1">
                <li>Working as a Java Full Stack Developer on a data-intensive lab application used globally by a leading US-based client (client name withheld per NDA/confidentiality policy).</li>
                <li>Building and maintaining backend services using Java, Spring Boot, and a microservices architecture deployed on AWS.</li>
                <li>Contributing to a system that handles continuous, high-volume data flow, focusing on reliability, scalability, and performance of services.</li>
                <li>Collaborating with a distributed, cross-functional team following Agile practices to deliver features and bug fixes for a globally-used platform.</li>
              </ul>
            </div>

            {/* PROJECTS */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-2">
                PROJECTS
              </h2>
              
              {/* Project 1 */}
              <div className="mb-3">
                <div className="font-bold text-gray-900">
                  API Dependency Intelligence — Breaking-Change Detection for Microservices
                </div>
                <ul className="list-disc list-inside text-xs sm:text-[13px] text-gray-800 space-y-0.5 ml-1 mt-0.5">
                  <li>Built a system to register services’ OpenAPI specs, construct a live API dependency graph, and diff specs to classify changes as breaking or non-breaking (with schema composition changes flagged for review).</li>
                  <li>Combined graph traversal (blast-radius analysis, cycle detection) with spec diffs to generate per-consumer impact reports with severity classification.</li>
                  <li>Architected multi-tenant data isolation at the repository layer, enforcing org-scoped queries structurally.</li>
                  <li className="list-none text-xs text-gray-700 font-medium mt-0.5">
                    <strong>Tech stack:</strong> Java, Spring Boot, React, PostgreSQL, REST, OpenAPI 3.x.
                  </li>
                </ul>
              </div>

              {/* Project 2 */}
              <div>
                <div className="font-bold text-gray-900 flex items-center justify-between">
                  <span>AnnaMrita — IoT-based Food Spoilage Detection System</span>
                  <span className="text-xs text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-300">
                    ★ Patent Granted ★
                  </span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-[13px] text-gray-800 space-y-0.5 ml-1 mt-0.5">
                  <li>Built an IoT-based food spoilage detection system (ESP32 with gas, temperature, and moisture sensors) that transmits real-time data to a server and uses a machine learning model to predict food shelf life.</li>
                  <li>Implemented Arduino firmware for sensor data acquisition and calibrated spoilage thresholds from fresh-to-spoiled sample data.</li>
                  <li className="list-none text-xs text-gray-700 font-medium mt-0.5">
                    <strong>Tech stack:</strong> HTML/CSS, JavaScript, PHP, XAMPP, MySQL, Arduino IDE, Machine Learning.
                  </li>
                </ul>
              </div>

            </div>

            {/* SKILLS */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-2">
                SKILLS
              </h2>
              <div className="text-xs sm:text-[13px] space-y-1 text-gray-800">
                <div><strong>AI/ML:</strong> LLM APIs, Prompt Engineering, Multimodal/Vision Extraction, Lightweight RAG, Conversational Intent Parsing</div>
                <div><strong>Programming Languages:</strong> Java, Python, JavaScript, HTML/CSS, MySQL, PostgreSQL</div>
                <div><strong>Frameworks:</strong> Spring Boot, React JS, Node.js/Express, Tailwind CSS</div>
                <div><strong>Cloud & Architecture:</strong> AWS, Microservices</div>
                <div><strong>Tools:</strong> Git, GitHub, VS Code, Postman, Linux</div>
                <div><strong>Languages & Soft Skills:</strong> English, Hindi, Marathi; Collaboration, Communication, Planning, Teamwork, Time Management, Leadership, Quick Learner</div>
              </div>
            </div>

            {/* EDUCATION */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-2">
                EDUCATION
              </h2>
              <div className="space-y-1 text-xs sm:text-[13px]">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>B.E. in Information Technology, Shree L.R. Tiwari College of Engineering</span>
                  <span>2021 – 2025 | CGPA: 8.7 / 10</span>
                </div>
                <div className="flex justify-between text-gray-800">
                  <span>HSC (Science), Bi-focal Computer Science, Elphinstone College</span>
                  <span>2019 – 2021 | Percentage: 80.6%</span>
                </div>
                <div className="flex justify-between text-gray-800">
                  <span>SSC, St. Francis D'Assisi High School</span>
                  <span>2018 – 2019 | Percentage: 82.6%</span>
                </div>
              </div>
            </div>

            {/* CERTIFICATIONS */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
                CERTIFICATIONS
              </h2>
              <div className="text-xs sm:text-[13px] text-gray-800">
                <strong>Claude Certified Developer — Foundations (CCDV-F)</strong>, Anthropic (2026)
              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
                ACHIEVEMENTS
              </h2>
              <div className="text-xs sm:text-[13px] text-gray-800">
                <strong>Design Patent Granted</strong>, Government of India (Jul 2026) — for “AnnaMrita,” an IoT-based food spoilage detection system.
              </div>
            </div>

          </div>
        ) : (
          /* ============================================================== */
          /* VIEW 2: COMIC BOOK RETRO DOSSIER VIEW                          */
          /* ============================================================== */
          <div className="space-y-6 font-comic">
            
            {/* Header Section */}
            <div className="border-b-3 border-comic-ink pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-bangers text-4xl sm:text-5xl tracking-tight text-marvel-red leading-none">
                  MOHAMMED KAIF ABDUL SALAM TUNGEKAR
                </h1>
                <div className="font-bangers text-xl text-gray-700 tracking-wide mt-1">
                  Lords of the Codes • Systems Engineer & AI Architect
                </div>
              </div>

              <div className="text-xs sm:text-sm space-y-1 font-bold opacity-90 sm:text-right">
                <div className="flex items-center gap-1.5 sm:justify-end">
                  <MapPin className="w-4 h-4 text-marvel-red shrink-0" />
                  <span>Borivali, Mumbai, India</span>
                </div>
                <div className="flex items-center gap-1.5 sm:justify-end">
                  <Phone className="w-4 h-4 text-marvel-red shrink-0" />
                  <span>+91 9820293676</span>
                </div>
                <div className="flex items-center gap-1.5 sm:justify-end">
                  <Mail className="w-4 h-4 text-marvel-red shrink-0" />
                  <a href="mailto:mohammedkaift@gmail.com" className="hover:underline">mohammedkaift@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Key Accreditations & Patent Box */}
            <div className="border-3 border-comic-ink bg-gradient-to-r from-amber-100 to-yellow-50 text-comic-ink p-4 rounded-xl shadow-comic-sm space-y-2">
              <div className="font-bangers text-lg text-amber-800 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <span>MAJOR HONORS, PATENTS & CERTIFICATIONS</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="border-2 border-comic-ink bg-white p-2.5 rounded shadow-comic-sm">
                  <span className="font-bangers text-xs text-red-600 block">★ GOVERNMENT OF INDIA DESIGN PATENT (JUL 2026)</span>
                  <span className="font-bold block">AnnaMrita: IoT-Based Food Spoilage Detection System</span>
                  <span className="text-[11px] text-gray-700">Granted by the Patent Office, Government of India.</span>
                </div>
                <div className="border-2 border-comic-ink bg-white p-2.5 rounded shadow-comic-sm">
                  <span className="font-bangers text-xs text-blue-600 block">★ ANTHROPIC OFFICIAL CERTIFICATION (2026)</span>
                  <span className="font-bold block">Claude Certified Developer — Foundations (CCDV-F)</span>
                  <span className="text-[11px] text-gray-700">Validated in advanced Claude API architecture, prompt engineering & RAG.</span>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div>
              <div className="font-bangers text-2xl text-marvel-red border-b-2 border-comic-ink pb-1 mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                <span>PROFESSIONAL EXPERIENCE</span>
              </div>

              <div className="border-2 border-comic-ink p-4 rounded-xl bg-comic-paper/40 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-base">Systems Engineer (Java Full Stack Developer)</h3>
                    <div className="text-xs text-gray-700 font-bold">Tata Consultancy Services (TCS) • Mumbai, India</div>
                  </div>
                  <div className="font-arcade text-[10px] bg-comic-paper border border-comic-ink px-2 py-0.5 rounded self-start">
                    Apr 2026 – Present
                  </div>
                </div>

                <ul className="list-disc list-inside text-xs sm:text-sm space-y-1.5 text-gray-800 opacity-95 pt-1">
                  <li>Working as a Java Full Stack Developer on a data-intensive lab application used globally by a leading US-based client.</li>
                  <li>Building and maintaining backend microservices using <strong>Java, Spring Boot</strong>, and distributed architecture deployed on <strong>AWS</strong>.</li>
                  <li>Contributing to high-throughput systems handling continuous, high-volume data streams with strict uptime SLAs.</li>
                  <li>Collaborating within distributed Agile teams delivering features, performance tuning, and zero-defect deployments.</li>
                </ul>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
