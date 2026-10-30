import React from 'react';
import { Zap, FileText, Printer, CheckCircle2, Award, Smartphone } from 'lucide-react';

export default function CoachingFreeFeatures() {
  const freeItems = [
    {
      icon: Zap,
      title: '2 Full-Length AI Test Papers (Lifetime)',
      desc: 'Generate 2 complete unit tests or periodic assessments with balanced sections (MCQs, Case Studies, Short & Long questions) on official CBSE patterns.',
      badge: 'Lifetime Free'
    },
    {
      icon: FileText,
      title: 'Class 10 & 12 Formats (20 & 40 Marks)',
      desc: 'Access standard blueprint formats suitable for weekly batch tests, weekend chapter diagnostics, and foundational syllabus checks.',
      badge: 'Standard Formats'
    },
    {
      icon: Award,
      title: 'Step-Wise Teacher Marking Keys',
      desc: 'Every generated test paper includes an authoritative answer key with formula allocation, derivation points, and intermediate marks for checking staff.',
      badge: 'Answer Keys'
    },
    {
      icon: Printer,
      title: 'Printable Single-Page OMR Bubble Sheets',
      desc: 'Download cleanly formatted 20, 40, 80, and 100 question OMR bubble sheets with roll number grid and invigilator signature boxes.',
      badge: 'OMR Studio'
    },
    {
      icon: CheckCircle2,
      title: 'NEP 2020 50% Competency Compliance',
      desc: 'Experience questions locked strictly to revised CBSE standards, including Assertion-Reasoning matrices and Section E integrated case studies.',
      badge: 'NEP Aligned'
    },
    {
      icon: Smartphone,
      title: '1-Click WhatsApp Parent Marksheet Demo',
      desc: 'Test our instant WhatsApp report card generator with custom student marks and parent numbers with zero manual typing required.',
      badge: 'WhatsApp Engine'
    }
  ];

  return (
    <section className="space-y-8">
      {/* Centered Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          Zero Commitment • Instant Trial
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Free Coaching OS Benefits (2×3 Grid)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Test our AI question paper studio and parent reporting workflows with zero credit card or upfront investment.
        </p>
      </div>

      {/* 2x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {freeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-[#080D24] border border-white/10 hover:border-emerald-500/40 transition-all flex gap-5 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 font-bold shrink-0">
                    {item.badge}
                  </span>
                </div>
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
