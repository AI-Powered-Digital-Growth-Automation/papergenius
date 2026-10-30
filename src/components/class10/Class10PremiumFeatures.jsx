import React from 'react';
import { Camera, Award, FileText, Clock, Layers, Sparkles, RefreshCw, ShieldCheck } from 'lucide-react';

export default function Class10PremiumFeatures() {
  const premiumItems = [
    {
      icon: Camera,
      title: '100 AI Step-Marking Checks / Month',
      desc: 'Snap and upload handwritten answers. Multimodal vision evaluates every step, formula, and calculation according to CBSE examiner rubrics.'
    },
    {
      icon: Award,
      title: 'CBSE 100/100 Topper Presentation Standards',
      desc: 'Learn topper secrets: dedicated 2-inch right rough margins, formula boxing, and SI unit underlining that save 5 to 8 marks per paper.'
    },
    {
      icon: FileText,
      title: 'Printable 2-Page Rapid Formula & Equation Sheet',
      desc: 'High-density printable cheat sheets with all NCERT Class 10 formulas, balanced chemical equations, and SI conversions for morning exam revision.'
    },
    {
      icon: Clock,
      title: '3-Hour Timed Pre-Board Mock Exams',
      desc: 'Simulate authentic board exam hall conditions with real-time countdown stopwatches and auto-grading against full 80-mark blueprints.'
    },
    {
      icon: Layers,
      title: 'High-Yield Solved PYQ Vault with Marks Allocation',
      desc: 'Complete decade-long chapter-wise solved question bank broken down by 1-mark MCQs, 2-mark, 3-mark, and 5-mark answer keys.'
    },
    {
      icon: Sparkles,
      title: 'Section E Competency-Based Case Study Bank',
      desc: '50+ solved case-based integrated real-world assessment questions aligned strictly with the revised CBSE NEP 2020 syllabus pattern.'
    },
    {
      icon: RefreshCw,
      title: 'Modular Subject Switch Flexibility',
      desc: 'Target Science during pre-boards, then switch to Mathematics Standard or Social Science whenever your revision focus shifts.'
    },
    {
      icon: ShieldCheck,
      title: 'Single-Device Active Account Protection',
      desc: 'Guaranteed quota integrity with device-level session locking, ensuring your 100 evaluation checks remain 100% yours.'
    }
  ];

  return (
    <section className="space-y-8">
      {/* Centered Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/20 border border-[#7C3CFF]/35 text-[#A78BFA] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          ₹199 / Subject Monthly • 100/100 Score Booster
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Class 10 Board Pass Benefits (2×4 Grid)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          The comprehensive evaluation and preparation suite designed to turn your 80% marks into 95%+ in official board examinations.
        </p>
      </div>

      {/* 2x4 Grid with Larger Typography */}
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
