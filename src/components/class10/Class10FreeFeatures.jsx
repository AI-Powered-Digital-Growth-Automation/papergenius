import React from 'react';
import { Download, Camera, BookOpen, TrendingUp } from 'lucide-react';

export default function Class10FreeFeatures() {
  const freeItems = [
    {
      icon: Download,
      title: '5-Year Authentic Board Archives (2022–2026)',
      desc: 'Download verified complete ZIP archives covering All India and Delhi sets for Science, Maths, SST, English, and Hindi without registration paywalls.',
      badge: '100% Free'
    },
    {
      icon: Camera,
      title: '2 Free AI Vision Answer Checks',
      desc: 'Upload handwritten notebook copy photos. Experience CBSE step-wise mark deductions, formula recognition, and presentation critique.',
      badge: 'AI Trial'
    },
    {
      icon: BookOpen,
      title: 'Official CBSE SQP & Marking Schemes',
      desc: 'Direct verified links to official CBSE Sample Question Papers and official head-examiner Marking Schemes for accurate marking benchmarks.',
      badge: 'Official Links'
    },
    {
      icon: TrendingUp,
      title: 'CBSE Pre-Board Percentile Predictor',
      desc: 'Calculate your board trajectory from tough pre-board theory marks, discover historical conversion ratios, and get a tailored preparation plan.',
      badge: 'Diagnostic Tool'
    }
  ];

  return (
    <section className="space-y-8">
      {/* Centered Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          Zero Cost • Instant Student Access
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Free Class 10 OS Benefits (2×2 Grid)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Essential board examination tools and verified official archives available without payment or credit card.
        </p>
      </div>

      {/* 2x2 Grid with Larger Typography */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {freeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-[#080D24] border border-white/10 hover:border-cyan-500/40 transition-all flex gap-5 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 font-bold shrink-0">
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
