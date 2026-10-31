import React from 'react';
import { Sparkles, Building2, User, FileText, ShieldCheck } from 'lucide-react';

export default function PricingVisualShowcase({ activeTab }) {
  if (activeTab === 'student') {
    return (
      <section className="space-y-6 pt-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 text-[#A78BFA] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Student Board Pass Deliverables</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Included in Student Pass: Printable Formula Sheets & Solved PYQs
          </h2>
          <p className="text-sm text-slate-300 font-normal">
            Physical-grade high-density morning revision sheets and comprehensive solved board banks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="rounded-3xl bg-[#080D24] border border-white/10 hover:border-cyan-500/50 shadow-2xl p-3 transition-all">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/class10-formula-cards.png"
                alt="Student Deliverable: Printable Formula Sheets"
                loading="lazy"
                className="w-full h-64 sm:h-72 object-cover rounded-2xl"
              />
            </div>
            <div className="p-3.5 flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <FileText className="w-4 h-4" />
                <span>Science & Maths Laminated Formula Sheets</span>
              </span>
              <span className="text-emerald-400 font-bold">Print Ready</span>
            </div>
          </div>

          <div className="rounded-3xl bg-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 shadow-2xl p-3 transition-all">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/class10-pyq-vault.png"
                alt="Student Deliverable: Solved Past 10 Years Question Bank"
                loading="lazy"
                className="w-full h-64 sm:h-72 object-cover rounded-2xl"
              />
            </div>
            <div className="p-3.5 flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 text-purple-300 font-bold">
                <User className="w-4 h-4" />
                <span>Decade-Long Solved Board PYQ Vault</span>
              </span>
              <span className="text-cyan-400 font-bold">Step Rubrics</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Coaching Tab Active
  return (
    <section className="space-y-6 pt-6">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-emerald-400" />
          <span>Institutional Print & Security Output</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Included in Coaching Pass: Custom Branding & OMR Sheets
        </h2>
        <p className="text-sm text-slate-300 font-normal">
          Safeguard your academy test series from xerox piracy and print camera-scannable OMR sheets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="rounded-3xl bg-[#080D24] border border-white/10 hover:border-emerald-500/50 shadow-2xl p-3 transition-all">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/coaching-branding-mockup.png"
              alt="Coaching Deliverable: Custom Institute Header & Watermark"
              loading="lazy"
              className="w-full h-64 sm:h-72 object-cover rounded-2xl"
            />
          </div>
          <div className="p-3.5 flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Institute Header Branding & 30° Watermark</span>
            </span>
            <span className="text-cyan-400 font-bold">Single-Page A4</span>
          </div>
        </div>

        <div className="rounded-3xl bg-[#080D24] border border-white/10 hover:border-cyan-500/50 shadow-2xl p-3 transition-all">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/omr-sheet-scanner.png"
              alt="Coaching Deliverable: Printable OMR Bubble Sheets"
              loading="lazy"
              className="w-full h-64 sm:h-72 object-cover rounded-2xl"
            />
          </div>
          <div className="p-3.5 flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Building2 className="w-4 h-4" />
              <span>Camera-Scannable 20Q-100Q OMR Studio</span>
            </span>
            <span className="text-emerald-400 font-bold">Sunday Mocks</span>
          </div>
        </div>
      </div>
    </section>
  );
}
