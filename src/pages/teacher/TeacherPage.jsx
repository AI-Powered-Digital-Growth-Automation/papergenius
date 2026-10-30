import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Sparkles, CheckCircle2, ArrowRight, ShieldCheck,
  Printer, Layers, FileText, Award, Compass, Zap, Clock,
  Smartphone, ChevronRight, Check, X
} from 'lucide-react';

import CoachingFreeFeatures from '../../components/coaching/CoachingFreeFeatures';
import CoachingPremiumFeatures from '../../components/coaching/CoachingPremiumFeatures';
import CoachingFaqSection from '../../components/coaching/CoachingFaqSection';

export default function TeacherPage() {
  const quickPillars = [
    {
      badge: 'Speed & Accuracy',
      title: '10-Second Test Paper Studio',
      desc: 'Set chapter-wise unit tests (20M/40M) or full pre-board mocks (80M) adhering strictly to CBSE NEP 2020 blueprints.',
      link: '/teacher/create-paper'
    },
    {
      badge: 'Zero Classroom Copying',
      title: 'Set A, B & C Shuffling Engine',
      desc: 'Scramble MCQs and parallel numerical variables while maintaining identical overall difficulty parity across all sets.',
      link: '/pricing'
    },
    {
      badge: 'Delight Parents',
      title: '1-Click WhatsApp Marksheet Engine',
      desc: 'Dispatch branded test scorecards directly to parents on WhatsApp without manual typing or complicated portals.',
      link: '/teacher/report-cards'
    },
    {
      badge: 'Protect Coaching IP',
      title: 'Anti-Photocopy Watermark',
      desc: 'Embed your coaching academy brand and 30-degree diagonal watermark across every page to prevent unauthorized xerox piracy.',
      link: '/pricing'
    }
  ];

  return (
    <div className="space-y-20 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* 1. HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-emerald-400" />
          <span>Coaching Operating System • CBSE 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          AI Question Paper Studio & Coaching Management OS
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Designed specifically for coaching directors, academy principals, and independent tutors. 
          Generate CBSE Set A/B/C question papers in 10 seconds, eliminate classroom cheating, and dispatch branded WhatsApp marksheets to parents.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/teacher/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-[#06B6D4] text-white text-base font-bold shadow-xl shadow-emerald-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2.5"
          >
            <Building2 className="w-5 h-5" />
            <span>Open Coaching Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/teacher/create-paper"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0F172A] border border-white/15 hover:border-emerald-400 text-white text-base font-bold transition-all flex items-center justify-center gap-2.5"
          >
            <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
            <span>Create Test Paper Free</span>
          </Link>
        </div>
      </section>

      {/* 2. QUICK PILLARS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickPillars.map((p, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-[#080D24] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <span className="inline-block px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 font-bold uppercase">
                {p.badge}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {p.desc}
              </p>
            </div>
            <Link
              to={p.link}
              className="mt-6 pt-3 border-t border-white/5 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
            >
              <span>Explore Capability</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </section>

      {/* 3. FREE COACHING FEATURES (2x3 GRID) */}
      <CoachingFreeFeatures />

      {/* 4. PREMIUM COACHING FEATURES (2x4 GRID) */}
      <CoachingPremiumFeatures />

      {/* 5. SIDE-BY-SIDE VALUE COMPARISON */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B1A1E] to-[#080D24] border border-white/15 shadow-2xl space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
            Institutional Pricing Comparison
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Starter Trial vs Tuition Master vs Coaching Director Pro
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Transparent institutional pricing with direct PhonePe / UPI activation.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-xs">
                <th className="py-3.5 px-4">Feature / Capability</th>
                <th className="py-3.5 px-4 text-center">Starter Trial (₹0)</th>
                <th className="py-3.5 px-4 text-center text-cyan-300">Tuition Master (₹799/mo)</th>
                <th className="py-3.5 px-4 text-center text-emerald-400 font-bold">Director Pro (₹4,999/yr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Full-Length Test Papers Quota</td>
                <td className="py-4 px-4 text-center text-slate-400">2 Lifetime Papers</td>
                <td className="py-4 px-4 text-center text-cyan-300 font-bold">12 Papers / Month</td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold">150 Papers / Year</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Anti-Cheating Set A, B & C Shuffling</td>
                <td className="py-4 px-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto text-rose-500/60" /></td>
                <td className="py-4 px-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto text-rose-500/60" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Custom Institute Header & Branding</td>
                <td className="py-4 px-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto text-rose-500/60" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">30° Diagonal Anti-Photocopy Watermark</td>
                <td className="py-4 px-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto text-rose-500/60" /></td>
                <td className="py-4 px-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto text-rose-500/60" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">1-Click WhatsApp Marksheet Engine</td>
                <td className="py-4 px-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto text-rose-500/60" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Camera-Scannable OMR Bubble Sheets</td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex justify-center">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-[#06B6D4] text-white text-sm font-bold shadow-lg hover:opacity-95 transition-all"
          >
            <span>Explore Coaching Plans (From ₹799/mo)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. ESSENTIAL COACHING NAVIGATION & RESOURCES */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
            Quick Coaching Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Essential CBSE Board Navigation & Resources
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Direct shortcuts to paper generation studios, OMR sheets, parent marksheets, and pricing.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/teacher/dashboard"
            className="p-5 rounded-2xl bg-[#080D24] border border-white/10 hover:border-emerald-400/50 flex items-center justify-between text-sm font-bold text-white transition-all group"
          >
            <span>Coaching Dashboard</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/teacher/create-paper"
            className="p-5 rounded-2xl bg-[#080D24] border border-white/10 hover:border-cyan-400/50 flex items-center justify-between text-sm font-bold text-white transition-all group"
          >
            <span>AI Paper Studio</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/teacher/report-cards"
            className="p-5 rounded-2xl bg-[#080D24] border border-white/10 hover:border-emerald-400/50 flex items-center justify-between text-sm font-bold text-white transition-all group"
          >
            <span>WhatsApp Marksheets</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/pricing"
            className="p-5 rounded-2xl bg-[#080D24] border border-white/10 hover:border-purple-400/50 flex items-center justify-between text-sm font-bold text-purple-300 transition-all group"
          >
            <span>Director Pro (₹4,999)</span>
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 7. IN-DEPTH SEO ACADEMIC GUIDE (1200+ WORDS, FULL WIDTH) */}
      <article className="p-8 sm:p-12 rounded-3xl bg-[#080D24] border border-white/10 shadow-2xl space-y-8">
        <header className="border-b border-white/10 pb-6 text-center max-w-4xl mx-auto space-y-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
            Institutional Efficiency & Pedagogy 2026
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 leading-tight">
            The Economics of Institutional Exam Automation: Reclaiming 120+ Teaching Hours
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Why leading coaching centers and tuition academies are shifting from manual drafting to AI-assisted assessment infrastructure.
          </p>
        </header>

        <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          <p>
            For private coaching centers, tuition academies, and independent educators, maintaining a weekly test series is the single most vital driver of student board results and parent trust. However, the operational reality of running a test series is fraught with hidden resource drains. Senior faculty members routinely spend 3 to 4 hours every weekend manually typing questions, cross-checking marks distributions, drawing ray or circuit diagrams, and drafting step-wise answer keys. Across an entire academic session of 40 weeks, this represents over <strong>120 lost teaching hours per batch</strong>.
          </p>
          <p>
            PaperGenius solves this operational crisis by pairing official CBSE blueprints with state-of-the-art AI. Within 10 seconds, educators can select a specific chapter, customize marks allocation (20M for periodic unit tests, 40M for mid-terms, or 80M for full pre-board mocks), and receive a camera-ready, single-page printable exam paper complete with step-by-step marking rubrics.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
            Solving the High-Density Classroom Cheating Crisis
          </h3>
          <p>
            In densely packed coaching classrooms, students seated side-by-side frequently glance at adjacent test copies, particularly during Multiple Choice Questions (Section A) and brief numerical steps. This dilutes the diagnostic authenticity of coaching tests. PaperGenius incorporates a parallel question scrambling algorithm that creates <strong>Set A, Set B, and Set C</strong> in parallel. MCQs are reordered, question positions are shuffled, and numerical variables are modified while maintaining strict conceptual parity.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
            Safeguarding Institute Intellectual Property & Parent Communication
          </h3>
          <p>
            Coaching centers frequently suffer from unauthorized photocopy piracy, where competitor institutes or rogue students photocopy proprietary test papers. PaperGenius embeds a subtle 30-degree diagonal anti-photocopy security watermark alongside the institute brand header. Furthermore, with our 1-click WhatsApp marksheet engine, test results can be dispatched directly to parent phone numbers, eliminating cumbersome SMS gateways and manual parent calls.
          </p>
        </div>
      </article>

      {/* 8. 6 AUTHORITATIVE COACHING FAQS */}
      <CoachingFaqSection />

    </div>
  );
}
