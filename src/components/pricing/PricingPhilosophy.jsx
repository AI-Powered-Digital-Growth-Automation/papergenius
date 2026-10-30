import React from 'react';
import { TrendingUp, Clock, ShieldCheck, Zap, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PricingPhilosophy() {
  return (
    <section className="space-y-8 pt-4">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
          Transparent Academic Economics
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Why PaperGenius Delivers 10x ROI Compared to Question Banks
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Built on pedagogical data: solve exact grade vulnerabilities without paying for useless paper bulk.
        </p>
      </div>

      {/* Dual High-Impact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Card 1: Student Economics */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#10142C] to-[#080D24] border border-[#7C3CFF]/30 hover:border-[#7C3CFF]/70 shadow-2xl transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#7C3CFF]/20 text-[#8C78FF] text-xs font-mono font-bold">
                Student Economics
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Save ~85% Prep Cost</span>
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-[#5EE7FF] transition-colors">
              Single-Subject Passes vs Forced 5-Subject Book Bundles
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Publishing houses force families to buy ₹2,500 to ₹4,000 question bank guides. Yet 82% of students only struggle in 1 or 2 technical subjects (Maths, Physics, or Chemistry). PaperGenius lets you target strictly where your marks are vulnerable.
            </p>

            {/* Comparison pill */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-black/40 border border-white/5 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block font-mono">Traditional Guides</span>
                <span className="text-rose-400 font-bold block line-through">₹3,500 / year</span>
                <span className="text-[11px] text-slate-400">Static answers, zero feedback</span>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-3">
                <span className="text-slate-400 block font-mono">PaperGenius Pass</span>
                <span className="text-emerald-400 font-bold block">₹199 / subject</span>
                <span className="text-[11px] text-slate-300">100 AI step checks + Topper secrets</span>
              </div>
            </div>

            <ul className="space-y-2 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Pay only for what you need—switch subjects anytime</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Step-marking AI identifies exact half-mark leakages</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Coaching Economics */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0B1E22] to-[#080D24] border border-emerald-500/30 hover:border-emerald-500/70 shadow-2xl transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                Coaching Institutional ROI
              </span>
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Reclaim 120+ Hours / Year</span>
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
              Zero Sunday Mock Leakage & Automated Parent Reporting
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Senior faculty spend 3-4 hours every weekend manually typing test papers, generating answer keys, and messaging parents. PaperGenius turns manual drafting into a 60-second automated operation.
            </p>

            {/* Comparison pill */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-black/40 border border-white/5 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block font-mono">Manual Weekend Work</span>
                <span className="text-rose-400 font-bold block">4 Hours / Test</span>
                <span className="text-[11px] text-slate-400">Classroom cheating risk on same sets</span>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-3">
                <span className="text-slate-400 block font-mono">PaperGenius OS</span>
                <span className="text-emerald-400 font-bold block">60 Seconds</span>
                <span className="text-[11px] text-slate-300">Set A/B/C scrambling + WhatsApp cards</span>
              </div>
            </div>

            <ul className="space-y-2 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Anti-photocopy 30° watermark safeguards coaching IP</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Instant parent scorecards elevate institute retention</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
