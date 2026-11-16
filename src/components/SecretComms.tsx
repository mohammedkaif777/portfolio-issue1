import React, { useState } from 'react';
import { MultiverseTheme } from '../types';
import { soundFx } from '../utils/soundFx';
import confetti from 'canvas-confetti';
import { Send, Mail, MapPin, Terminal, CheckCircle2, Sparkles, Radio, Phone, ExternalLink } from 'lucide-react';

interface SecretCommsProps {
  theme: MultiverseTheme;
  onTriggerDecal: (text: string) => void;
  onOpenResume: () => void;
}

export const SecretComms: React.FC<SecretCommsProps> = ({ theme, onTriggerDecal, onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Gen AI & LLM Systems',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const isMarvel = theme === 'marvel';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playVictory();
    onTriggerDecal('TRANSMISSION SENT!');
    setSubmitted(true);

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#E62429', '#FFD200', '#0266B3'],
    });

    // Create fallback mailto link to mohammedkaift@gmail.com
    const subject = encodeURIComponent(`[LOTC Comms] ${formData.category} from ${formData.name}`);
    const body = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\nMission Category: ${formData.category}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:mohammedkaift@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="comms" className="py-12">
      
      {/* Chapter Title Bar */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-comic-ink pb-4">
        <div>
          <div className="inline-flex items-center gap-2 border-2 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-sm px-3 py-0.5 shadow-comic-sm uppercase">
            <Radio className="w-4 h-4" />
            <span>CHAPTER FIVE • SECRET COMMS FREQUENCY</span>
          </div>
          <h2 className="font-bangers text-4xl sm:text-6xl tracking-wide mt-2">
            DISPATCH ENCRYPTED TRANSMISSION
          </h2>
        </div>
        <div className="font-comic text-sm opacity-80 max-w-md">
          Ready to engineer resilient AI architectures, enterprise microservices, or high-scale systems? Open direct comms below.
        </div>
      </div>

      {/* Main Grid: Form & Dossier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Comic Dispatch Form (7 Cols) */}
        <div className={`comic-panel lg:col-span-7 p-6 sm:p-8 rounded-xl ${
          isMarvel ? 'bg-white text-comic-ink' : 'bg-dc-card text-dc-chalk'
        }`}>
          
          <div className="border-b-3 border-comic-ink pb-3 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-arcade text-xs text-amber-500">DIRECT FREQUENCY</span>
              <span className="font-bangers text-2xl">mohammedkaift@gmail.com</span>
            </div>
            <span className="font-arcade text-[9px] px-2 py-0.5 border-2 border-comic-ink bg-emerald-400 text-comic-ink font-bold">
              ● ONLINE
            </span>
          </div>

          {submitted ? (
            <div className="border-4 border-comic-ink bg-comic-paper text-comic-ink p-6 rounded-xl shadow-comic text-center space-y-4 animate-comic-bounce">
              <div className="w-16 h-16 mx-auto rounded-full border-3 border-comic-ink bg-marvel-yellow flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-comic-ink" />
              </div>
              <h3 className="font-bangers text-4xl text-marvel-red leading-none">
                TRANSMISSION DISPATCHED!
              </h3>
              <p className="font-comic font-bold text-base text-gray-800 max-w-md mx-auto">
                Your encrypted signal has been beamed directly to Mohammed Kaif at <strong>mohammedkaift@gmail.com</strong>. Expect response telemetry shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', category: 'Gen AI & LLM Systems', message: '' });
                }}
                className="comic-btn px-6 py-2 border-3 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-lg shadow-comic"
              >
                SEND ANOTHER TRANSMISSION
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Field */}
              <div>
                <label className="block font-bangers text-base tracking-wider mb-1 uppercase opacity-90">
                  Your Codename / Recruiter Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Commander Sarah / Tech Lead Alex"
                  className="w-full border-3 border-comic-ink bg-comic-paper text-comic-ink p-3 rounded-lg font-comic font-bold text-base shadow-comic-sm focus:outline-none focus:ring-2 focus:ring-marvel-red"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block font-bangers text-base tracking-wider mb-1 uppercase opacity-90">
                  Return Frequency / Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@enterprise.com"
                  className="w-full border-3 border-comic-ink bg-comic-paper text-comic-ink p-3 rounded-lg font-comic font-bold text-base shadow-comic-sm focus:outline-none focus:ring-2 focus:ring-marvel-red"
                />
              </div>

              {/* Category Field */}
              <div>
                <label className="block font-bangers text-base tracking-wider mb-1 uppercase opacity-90">
                  Mission Classification
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border-3 border-comic-ink bg-comic-paper text-comic-ink p-3 rounded-lg font-comic font-bold text-base shadow-comic-sm focus:outline-none focus:ring-2 focus:ring-marvel-red"
                >
                  <option value="Java & Spring Boot Microservices">Java & Spring Boot Microservices (AWS)</option>
                  <option value="Gen AI & LLM Systems">Generative AI & LLM Agentic Workflows</option>
                  <option value="IoT & Hardware Prototyping">IoT & Hardware Prototyping (Patented Systems)</option>
                  <option value="Full-Stack Web Development">Full-Stack Web Architecture</option>
                  <option value="Enterprise Career Opportunity">Enterprise Career Opportunity</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block font-bangers text-base tracking-wider mb-1 uppercase opacity-90">
                  Encrypted Transmission (Your Message) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your project goals, architectural challenge, or role briefing..."
                  className="w-full border-3 border-comic-ink bg-comic-paper text-comic-ink p-3 rounded-lg font-comic font-bold text-base shadow-comic-sm focus:outline-none focus:ring-2 focus:ring-marvel-red"
                />
              </div>

              {/* Transmit Button */}
              <button
                type="submit"
                className="comic-btn w-full py-3.5 border-4 border-comic-ink bg-marvel-red text-white font-bangers text-2xl shadow-comic hover:bg-marvel-yellow hover:text-comic-ink transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-6 h-6" />
                <span>BEAM ENCRYPTED TRANSMISSION [ENTER]</span>
              </button>

            </form>
          )}

        </div>

        {/* Right Column: Base of Operations Dossier (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Base of Operations Card */}
          <div className={`comic-panel p-6 rounded-xl ${
            isMarvel ? 'bg-white text-comic-ink' : 'bg-dc-card text-dc-chalk'
          }`}>
            <div className="border-b-3 border-comic-ink pb-2 mb-4">
              <span className="font-arcade text-[10px] text-amber-500">BASE OF OPERATIONS</span>
              <h3 className="font-bangers text-3xl">HEADQUARTERS</h3>
            </div>

            <div className="space-y-3 font-comic text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-marvel-red shrink-0" />
                <div>
                  <span className="font-bold block">Base of Operations:</span>
                  <span className="opacity-80">Borivali, Mumbai, India</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <span className="font-bold block">Direct Transmission:</span>
                  <a href="mailto:mohammedkaift@gmail.com" className="text-marvel-red font-bold hover:underline">
                    mohammedkaift@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <span className="font-bold block">Comms Hotline:</span>
                  <span className="opacity-80">+91 9820293676</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-purple-600 shrink-0" />
                <div>
                  <span className="font-bold block">Digital Underworld:</span>
                  <span className="opacity-80">Global Remote Availability</span>
                </div>
              </div>
            </div>

            {/* Direct LinkedIn & GitHub Portal Buttons */}
            <div className="mt-6 pt-4 border-t-3 border-comic-ink space-y-2">
              <a
                href="https://www.linkedin.com/in/mohammedkaiftungekar/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playToken()}
                className="comic-btn flex items-center justify-center gap-2 w-full py-2.5 border-3 border-comic-ink bg-blue-600 text-white font-bangers text-lg shadow-comic hover:bg-blue-700"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LINKEDIN FREQUENCY PORTAL</span>
              </a>

              <a
                href="https://github.com/mohammedkaif777"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playToken()}
                className="comic-btn flex items-center justify-center gap-2 w-full py-2.5 border-3 border-comic-ink bg-comic-paper text-comic-ink font-bangers text-lg shadow-comic hover:bg-white"
              >
                <svg className="w-4 h-4 fill-current text-marvel-red" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GITHUB HEADQUARTERS</span>
              </a>

              <button
                onClick={onOpenResume}
                className="comic-btn flex items-center justify-center gap-2 w-full py-2.5 border-3 border-comic-ink bg-marvel-yellow text-comic-ink font-bangers text-lg shadow-comic hover:bg-white"
              >
                <span>CLASSIFIED RESUME DOSSIER</span>
              </button>
            </div>
          </div>

          {/* Comic Code Authority Assurance Box */}
          <div className="comic-panel p-5 rounded-xl bg-comic-paper text-comic-ink">
            <div className="font-bangers text-xl text-marvel-red mb-1">
              ENGINEERING GUARANTEE:
            </div>
            <p className="font-comic font-bold text-sm leading-snug">
              "Every line of code delivered is tested, resilient, and architected for enduring scale. Zero false promises, zero technical debt."
            </p>
            <div className="mt-2 text-right font-bangers text-sm text-gray-700">
              — Lords of the Codes
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
