import React from 'react';
import { Building2, ShieldCheck, Printer } from 'lucide-react';

export default function CoachingVisualShowcase() {
  return (
    <section className="space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-emerald-400" />
          <span>Institutional Print & Security Assets</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Custom Academy Branding & Printable OMR Studio
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-normal">
          Safeguard your proprietary test questions with 30-degree diagonal watermarks and print camera-scannable OMR sheets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Card 1: Coaching Header & Watermark Mockup */}
        <div className="relative group overflow-hidden rounded-3xl bg-[#080D24] border border-white/10 hover:border-emerald-500/50 shadow-2xl transition-all p-3">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/coaching-branding-mockup.png"
              alt="Coaching Custom Header Branding and Anti-Photocopy Watermark Test Paper Preview"
              loading="lazy"
              className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="p-4 flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Institute Header & 30° Anti-Photocopy Watermark</span>
            </span>
            <span className="text-cyan-400 font-bold">A4 Single-Page</span>
          </div>
        </div>

        {/* Card 2: OMR Sheet Studio Mockup */}
        <div className="relative group overflow-hidden rounded-3xl bg-[#080D24] border border-white/10 hover:border-cyan-500/50 shadow-2xl transition-all p-3">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/omr-sheet-scanner.png"
              alt="Camera Scannable OMR Bubble Sheets Studio for Coaching Centers"
              loading="lazy"
              className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="p-4 flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Printer className="w-4 h-4" />
              <span>Camera-Scannable 20Q-100Q OMR Sheet Studio</span>
            </span>
            <span className="text-emerald-400 font-bold">Sunday Mocks</span>
          </div>
        </div>
      </div>
    </section>
  );
}
