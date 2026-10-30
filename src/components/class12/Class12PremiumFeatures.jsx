import React from 'react';
import { Camera, Award, Flame, BookOpen, Layers, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export default function Class12PremiumFeatures() {
  const premiumItems = [
    {
      icon: Camera,
      title: '150 AI Derivation & Numerical Checks / Month',
      desc: 'Multimodal vision checks complex calculus steps, physics derivations, accounting balance sheets, and organic synthesis pathways against head-examiner rubrics.'
    },
    {
      icon: Award,
      title: 'All 28 Mandatory Physics Derivations with Marks',
      desc: 'Step-by-step verified solutions for all 28 core Class 12 Physics board derivations with point-by-point head-examiner marks distribution.'
    },
    {
      icon: Flame,
      title: '32 Organic Chemistry Named Reactions Booklet',
      desc: 'Visual roadmap covering all 32 mandatory named reactions with temperature, reagents, catalysts, and mechanism step notes for Chemistry (043).'
    },
    {
      icon: BookOpen,
      title: 'Calculus & Vector-3D Master Toolkit',
      desc: 'Complete proofs, integration standard forms, differential equations, and 3D geometry skew-line algorithms with step-by-step scoring rules.'
    },
    {
      icon: Layers,
      title: 'Section E Competency-Based Case Study Bank',
      desc: '100+ solved real-world case study assessments strictly aligned with the revised CBSE 50% competency evaluation quota.'
    },
    {
      icon: Sparkles,
      title: 'Printable High-Density Rapid Formula Cheat Sheets',
      desc: 'Compact 2-page morning revision sheets with all physical chemistry equations, physics constants, and accounting ratios for exam day morning.'
    },
    {
      icon: Clock,
      title: '3-Hour Timed Pre-Board Mock Exams with Stopwatch',
      desc: 'Full-length 70/80-mark mock examinations with live countdown stopwatches and auto-grading to master time allocation before official boards.'
    },
    {
      icon: ShieldCheck,
      title: 'Single-Device Anti-Abuse Account Protection',
      desc: 'Advanced session fingerprinting preserves your active quotas (150 checks), preventing unauthorized multi-user account lockouts.'
    }
  ];

  return (
    <section className="space-y-8">
      {/* Centered Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/20 border border-[#7C3CFF]/35 text-[#A78BFA] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          ₹499 / Subject Monthly • Most Popular Senior Pass
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Class 12 Board Pass Benefits (2×4 Grid)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          The ultimate 100/100 score booster engineered for competitive board percentiles and college admission cutoffs.
        </p>
      </div>

      {/* 2x4 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {premiumItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#080D24] border border-[#7C3CFF]/30 hover:border-[#7C3CFF] transition-all flex gap-5 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#7C3CFF]/20 text-[#8C78FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
