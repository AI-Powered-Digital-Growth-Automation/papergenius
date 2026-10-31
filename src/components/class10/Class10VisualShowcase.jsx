import React from 'react';
import { Sparkles, FileText, BookOpen } from 'lucide-react';

export default function Class10VisualShowcase() {
  return (
    <section className="space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#5EE7FF]" />
          <span>Visual Board Preparation Assets</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Printable Rapid Formula Sheets & Solved PYQ Banks
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-normal">
          Every pass includes high-density morning revision formula kits and authentic chapter-wise solved question banks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Card 1: Formula Sheet Mockup */}
        <div className="relative group overflow-hidden rounded-3xl bg-[#080D24] border border-white/10 hover:border-cyan-500/50 shadow-2xl transition-all p-3">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/class10-formula-cards.png"
              alt="CBSE Class 10 Science and Mathematics Formula & Quick Revision Sheets"
              loading="lazy"
              className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="p-4 flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <FileText className="w-4 h-4" />
              <span>Science & Maths Laminated Revision Sheets</span>
            </span>
            <span className="text-emerald-400 font-bold">Printable A4 Format</span>
          </div>
        </div>

        {/* Card 2: 10-Year PYQ Bank Mockup */}
        <div className="relative group overflow-hidden rounded-3xl bg-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 shadow-2xl transition-all p-3">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/class10-pyq-vault.png"
              alt="CBSE Class 10 Past 10 Years Question Bank with Step-Wise Solutions"
              loading="lazy"
              className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="p-4 flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-purple-300 font-bold">
              <BookOpen className="w-4 h-4" />
              <span>Chapter-Wise Solved PYQ Vault with App Sync</span>
            </span>
            <span className="text-cyan-400 font-bold">All 6 Core Subjects</span>
          </div>
        </div>
      </div>
    </section>
  );
}
