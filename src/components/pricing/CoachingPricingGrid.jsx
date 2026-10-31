import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, X, QrCode } from 'lucide-react';

export default function CoachingPricingGrid({ onSelectPlan }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Starter Trial */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#080D24] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase mb-4">
            Evaluation Pass
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Starter Trial</h3>
          <div className="flex items-baseline gap-1 my-4">
            <span className="text-4xl font-black text-white">₹0</span>
            <span className="text-xs font-medium text-slate-400">/ forever free</span>
          </div>
          <p className="text-xs text-slate-300 mb-6">
            Test question generator quality on authentic CBSE pattern.
          </p>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>2 Test Papers Total</strong> (Lifetime Quota)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Class 10 & 12 Formats (20 & 40 Marks)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Basic Teacher Answer Key</span>
            </li>
            <li className="flex items-center gap-2 text-slate-500">
              <X className="w-4 h-4 text-rose-500/60 shrink-0" />
              <span>Custom Institute Header & Logo</span>
            </li>
            <li className="flex items-center gap-2 text-slate-500">
              <X className="w-4 h-4 text-rose-500/60 shrink-0" />
              <span>Anti-Cheating Set A/B/C Shuffling</span>
            </li>
          </ul>
        </div>

        <Link
          to="/teacher/portal"
          className="mt-8 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-bold transition-all text-center"
        >
          Start Generating Free
        </Link>
      </div>

      {/* Tuition Master */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0B1A1E] to-[#080D24] border border-emerald-500/40 hover:border-emerald-500 transition-all flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-4">
            Monthly Batch Plan
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Tuition Master</h3>
          <div className="flex items-baseline gap-1 my-4">
            <span className="text-4xl font-black text-white">₹799</span>
            <span className="text-xs font-medium text-slate-400">/ month</span>
          </div>
          <p className="text-xs text-slate-300 mb-6">
            Ideal for private tutors running weekly test batches.
          </p>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>12 Test Papers / Month</strong> (Active Quota)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant 1-Click WhatsApp Marksheets to Parents</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Your Coaching Logo & Address on Header</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Complete Step-Wise Teacher Marking Keys</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Auto-Generated 20-100Q OMR Sheets</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>Dynamic QR Code on Question Paper</strong> (Instant Solutions)</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => onSelectPlan('Tuition Master (Monthly)', 799, 'coachingMonthly')}
          className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-[#06B6D4] text-white text-xs font-bold shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          <span>Get Monthly Pass (₹799/mo)</span>
        </button>
      </div>

      {/* Coaching Director Pro */}
      <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0F2228] to-[#080D24] border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20 flex flex-col justify-between">
        <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-[#06B6D4] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
          Most Popular - Highest Value
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-4">
            Annual Institutional Pass
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Coaching Director Pro</h3>
          <div className="flex items-baseline gap-1 my-4">
            <span className="text-4xl font-black text-white">₹4,999</span>
            <span className="text-xs font-medium text-slate-400">/ full year (₹416/mo)</span>
          </div>
          <p className="text-xs text-slate-300 mb-6">
            Complete board exam operating system for coaching institutes.
          </p>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>150 Papers / Year Quota</strong> (Full Session)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Anti-Cheating Set A, B & C Shuffling</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant 1-Click WhatsApp Marksheet Engine</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Diagonal 30° Watermark & Custom Header</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multi-Faculty Batch Vault & Printable OMR Sheets</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>Dynamic QR Code on Question Paper</strong> (Anti-Cheat Set A/B/C)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Top-Up Booster available anytime (+25 for ₹599)</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => onSelectPlan('Coaching Director Pro (Annual)', 4999, 'coachingAnnual')}
          className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-[#06B6D4] text-white text-xs font-bold shadow-lg shadow-emerald-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          <span>Get Annual Pass (₹4,999/yr)</span>
        </button>
      </div>

    </div>
  );
}
