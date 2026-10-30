import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Sparkles, QrCode } from 'lucide-react';

export default function StudentPricingGrid({ onSelectPlan }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Card 1: Free Starter Pass */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#080D24] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase mb-4">
            Forever Free
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Student Free Pass</h3>
          <div className="flex items-baseline gap-1 my-4">
            <span className="text-4xl font-black text-white">₹0</span>
            <span className="text-xs font-medium text-slate-400">/ lifetime</span>
          </div>
          <p className="text-xs text-slate-300 mb-6">
            Essential board diagnostics and authentic previous year papers.
          </p>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>5-Year Authentic Board Archives (2022-2026)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>2 Free AI Step-Marking Evaluations</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct Official CBSE SQP & Marking Schemes</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Pre-Board Percentage Predictor Access</span>
            </li>
          </ul>
        </div>

        <Link
          to="/auth"
          className="mt-8 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-bold transition-all text-center"
        >
          Start Free Now
        </Link>
      </div>

      {/* Card 2: Class 10 Board Pass */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#080D24] border border-[#7C3CFF]/40 hover:border-[#7C3CFF] transition-all flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3CFF]/20 border border-[#7C3CFF]/30 text-[#8C78FF] text-xs font-mono font-bold uppercase mb-4">
            Class 10 Booster
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Class 10 Board Pass</h3>
          <div className="flex items-baseline gap-1 my-4">
            <span className="text-4xl font-black text-white">₹199</span>
            <span className="text-xs font-medium text-slate-400">/ per subject monthly</span>
          </div>
          <p className="text-xs text-slate-300 mb-6">
            Targeted score accelerator for Science, Maths Standard, Basic, or SST.
          </p>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>100 AI Answer Checks</strong> / Month</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>CBSE 100/100 Topper Benchmarks</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Printable Rapid Formula & Equation Sheet</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>3-Hour Timed Pre-Board Mock Exams</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Single-Device Active Account Protection</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => onSelectPlan('Class 10 Board Pass', 199, 'studentClass10')}
          className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white text-xs font-bold shadow-lg shadow-[#7C3CFF]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          <span>Get Class 10 Pass (₹199)</span>
        </button>
      </div>

      {/* Card 3: Class 12 Board Pass (Most Popular) */}
      <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#131030] to-[#080D24] border-2 border-[#7C3CFF] shadow-2xl shadow-[#7C3CFF]/20 flex flex-col justify-between">
        <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
          Most Popular
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3CFF]/20 border border-[#7C3CFF]/30 text-[#8C78FF] text-xs font-mono font-bold uppercase mb-4">
            Class 12 Booster
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Class 12 Board Pass</h3>
          <div className="flex items-baseline gap-1 my-4">
            <span className="text-4xl font-black text-white">₹499</span>
            <span className="text-xs font-medium text-slate-400">/ per subject monthly</span>
          </div>
          <p className="text-xs text-slate-300 mb-6">
            Comprehensive kit for Physics, Chemistry, Maths, Bio, or Commerce.
          </p>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>150 AI Checks</strong> (Derivations & Numericals)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All 28 Mandatory Physics Derivations</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>32 Organic Chemistry Named Reactions Booklet</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Section E Competency-Based Case Study Bank</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Single-Device Anti-Abuse Lock</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => onSelectPlan('Class 12 Board Pass', 499, 'studentClass12')}
          className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white text-xs font-bold shadow-lg shadow-[#7C3CFF]/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          <span>Get Class 12 Pass (₹499)</span>
        </button>
      </div>

    </div>
  );
}
