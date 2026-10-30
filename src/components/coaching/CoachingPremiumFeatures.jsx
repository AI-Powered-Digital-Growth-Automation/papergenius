import React from 'react';
import { Layers, ShieldCheck, Zap, Smartphone, Building2, PlusCircle, Printer, Award } from 'lucide-react';

export default function CoachingPremiumFeatures() {
  const premiumItems = [
    {
      icon: Layers,
      title: 'Anti-Cheating Set A, B & C Shuffling',
      desc: 'Generate 3 parallel question papers with scrambled MCQs and parallel numerical variables. Eliminates classroom copying in high-density batches.'
    },
    {
      icon: ShieldCheck,
      title: '30° Diagonal Anti-Photocopy Watermark',
      desc: 'Stamp your coaching academy brand across all paper pages to safeguard proprietary test questions from unauthorized xerox distribution.'
    },
    {
      icon: Zap,
      title: '150 Papers / Full Session Quota',
      desc: 'Run year-long testing series across Class 10 & 12 batches without worrying about test quotas. Saves 120+ faculty hours every academic year.'
    },
    {
      icon: Smartphone,
      title: 'Instant 1-Click WhatsApp Parent Marksheets',
      desc: 'Dispatch official branded performance reports directly to parents on WhatsApp. Elevates coaching reputation and parent retention.'
    },
    {
      icon: Building2,
      title: 'Multi-Faculty & Batch Management Vault',
      desc: 'Organize question papers by faculty member, subject, and batch timing (Morning/Evening). Centralized cloud storage for previous test series.'
    },
    {
      icon: PlusCircle,
      title: 'Instant Top-Up Booster (+25 for ₹599)',
      desc: 'Never run out of test papers during peak pre-board exam months. Add 25 extra papers anytime with instant PhonePe activation.'
    },
    {
      icon: Award,
      title: 'Custom Institute Name, Logo & Header',
      desc: 'Add your coaching center name, sub-branch, director designation, and contact numbers right on the exam header for a prestigious presentation.'
    },
    {
      icon: Printer,
      title: 'Clean Single-Page A4 Print Engine',
      desc: 'Optimized print engine with auto-paginated typography, ensuring single-page test papers without awkward page breaks or blank margins.'
    }
  ];

  return (
    <section className="space-y-8">
      {/* Centered Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/35 text-emerald-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          Institutional Grade • Reclaim 120+ Hours
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Coaching Premium Director Benefits (2×4 Grid)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Enterprise examination automation built specifically for coaching directors, academy principals, and professional tutors.
        </p>
      </div>

      {/* 2x4 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {premiumItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0B1A1E] to-[#080D24] border border-emerald-500/30 hover:border-emerald-500 transition-all flex gap-5 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
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
