import React from 'react';
import { Sparkles, Award, Flame } from 'lucide-react';

export default function Class12VisualShowcase() {
  return (
    <section className="space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#C4B5FD]" />
          <span>Senior Secondary Visual Roadmaps</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          28 Physics Derivations & 32 Named Reactions Toolkit
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-normal">
          Designed specifically for Class 12 board aspirants targeting 95%+ in theoretical and derivation sections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Card 1: Physics Derivations Mockup */}
        <div className="relative group overflow-hidden rounded-3xl bg-[#080D24] border border-white/10 hover:border-purple-500/50 shadow-2xl transition-all p-3">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/class12-physics-derivations.png"
              alt="CBSE Class 12 Physics 28 Mandatory Derivations with Step-Marking Scoring"
              loading="lazy"
              className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="p-4 flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-purple-300 font-bold">
              <Award className="w-4 h-4" />
              <span>28 Physics Derivations Notebook & AI Scoring</span>
            </span>
            <span className="text-emerald-400 font-bold">20+ Marks Guaranteed</span>
          </div>
        </div>

        {/* Card 2: Organic Chemistry Roadmap */}
        <div className="relative group overflow-hidden rounded-3xl bg-[#080D24] border border-white/10 hover:border-cyan-500/50 shadow-2xl transition-all p-3">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/class12-organic-reactions.png"
              alt="CBSE Class 12 Organic Chemistry 32 Named Reactions Roadmap Desk Laminated"
              loading="lazy"
              className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="p-4 flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Flame className="w-4 h-4" />
              <span>32 Organic Named Reactions Desk Roadmap</span>
            </span>
            <span className="text-cyan-400 font-bold">Reagents & Mechanisms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
