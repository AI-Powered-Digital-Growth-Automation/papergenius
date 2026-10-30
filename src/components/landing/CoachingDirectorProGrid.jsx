import React from 'react';
import {
  Layers, ShieldCheck, Zap, Smartphone, Printer,
  Building2, Award, Compass, FileText
} from 'lucide-react';

export default function CoachingDirectorProGrid() {
  const cards = [
    {
      icon: Layers,
      color: 'text-emerald-400 bg-emerald-500/20',
      title: 'Anti-Cheating Set A, B & C Shuffling',
      desc: 'Generate 3 parallel question sets with scrambled MCQs and balanced difficulty parity. Eliminates classroom copying during batch exams.',
      badge: 'Zero Class Cheating',
      badgeColor: 'text-emerald-400'
    },
    {
      icon: ShieldCheck,
      color: 'text-cyan-400 bg-cyan-500/20',
      title: '30° Diagonal Anti-Photocopy Watermark',
      desc: 'Embed your coaching academy brand diagonally across the background to protect proprietary test content from unauthorized xerox piracy.',
      badge: 'Content Copyright Shield',
      badgeColor: 'text-cyan-400'
    },
    {
      icon: Zap,
      color: 'text-[#8C78FF] bg-[#7C3CFF]/20',
      title: '150 Full Session Test Quota',
      desc: 'Run year-long testing for multiple batches across Class 10 & 12 with generous paper quotas and instant +25 booster top-up options.',
      badge: 'Full Session Coverage',
      badgeColor: 'text-purple-400'
    },
    {
      icon: Smartphone,
      color: 'text-emerald-400 bg-emerald-500/20',
      title: '1-Click WhatsApp Parent Scorecards',
      desc: 'Delight parents with instant formatted scorecards sent directly to WhatsApp with zero manual typing. Elevates institute retention.',
      badge: 'Instant Parent Reach',
      badgeColor: 'text-emerald-400'
    },
    {
      icon: Printer,
      color: 'text-purple-400 bg-purple-500/20',
      title: 'Camera-Scannable OMR Studio',
      desc: 'Generate clean 20, 40, 80, and 100 question bubble sheets for fast Sunday batch testing. Print on standard single-page A4 copy paper.',
      badge: 'Fast Batch Checking',
      badgeColor: 'text-purple-400'
    },
    {
      icon: Building2,
      color: 'text-cyan-400 bg-cyan-500/20',
      title: 'Multi-Faculty Batch Management',
      desc: 'Organize tests by subject teacher, batch morning/evening, and classroom branch. Save previous papers in a secure coaching cloud vault.',
      badge: 'Institutional Hierarchy',
      badgeColor: 'text-cyan-400'
    },
    {
      icon: Award,
      color: 'text-amber-400 bg-amber-500/20',
      title: 'Custom Branding & Institute Logo',
      desc: 'Add your coaching academy name, sub-branch, director details, and contact numbers right on the exam header for a prestigious presentation.',
      badge: 'Premium Academy Look',
      badgeColor: 'text-amber-400'
    },
    {
      icon: Compass,
      color: 'text-rose-400 bg-rose-500/20',
      title: 'CBSE NEP 2020 Competency Engine',
      desc: 'Generate papers adhering strictly to the official 50% competency quota: Section E Case Studies, Assertion-Reasoning, and Analytical Numericals.',
      badge: '100% Board Blueprint',
      badgeColor: 'text-rose-400'
    },
    {
      icon: FileText,
      color: 'text-emerald-400 bg-emerald-500/20',
      title: 'Instant Step-Wise Answer Keys',
      desc: 'Every generated paper comes with an official teacher marking scheme with formula points, calculation steps, and final value marks for faculty.',
      badge: 'Ready Marking Schemes',
      badgeColor: 'text-emerald-400'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          Director Pro • Coaching Centers & Academies
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Coaching Director Pro (3×3 Enterprise Suite)
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Institutional automation engineered to save 120+ hours each session and eliminate exam leakage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => {
          const IconComponent = c.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#0B1A1E] to-[#080D24] border border-emerald-500/30 hover:border-emerald-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">{c.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{c.desc}</p>
              </div>
              <div className={`mt-4 pt-3 border-t border-white/5 text-[11px] font-mono font-semibold ${c.badgeColor}`}>
                {c.badge}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
