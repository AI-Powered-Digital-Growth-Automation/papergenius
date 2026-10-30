import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function EcosystemStrip() {
  const items = [
    { label: 'Class 10 Hub', path: '/class-10', color: 'text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10' },
    { label: 'Class 12 Hub', path: '/class-12', color: 'text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/10' },
    { label: 'Percentage Predictor', path: '/predictor', color: 'text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10' },
    { label: 'WhatsApp Marksheets', path: '/teacher/report-cards', color: 'text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10' },
    { label: '5-Yr PYQs', path: '/pyq-vault', color: 'text-amber-300 hover:border-amber-500/50 hover:bg-amber-500/10' },
    { label: 'Coaching OS', path: '/teacher/portal', color: 'text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/10' },
    { label: 'Pricing Plans', path: '/pricing', color: 'text-white hover:border-white/30 hover:bg-white/10' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-[#080D24] border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base shrink-0">
          <Compass className="w-5 h-5 text-[#06B6D4]" />
          <span>Explore the PaperGenius CBSE Ecosystem</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {items.map((it) => (
            <Link
              key={it.label}
              to={it.path}
              className={`px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold transition-all ${it.color}`}
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
