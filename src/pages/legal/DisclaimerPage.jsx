import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#A8B0C8] hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-[#EC4899]/40 bg-[#0C1330]/90 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EC4899]/20 flex items-center justify-center text-[#F472B6]">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">CBSE Legal & Trademark Disclaimer</h1>
              <p className="text-xs text-[#94A3B8] font-mono">Last Updated: October 2026 • Statutory Disclosure</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#EC4899]/10 border border-[#EC4899]/30 text-sm text-[#FBCFE8] space-y-1">
            <div className="font-bold flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Non-Affiliation Statutory Declaration</div>
            <p className="text-xs leading-relaxed">
              PaperGenius.in is an independent, proprietary educational SaaS platform owned and operated exclusively by <strong>Digital Gulzar Marketing Services (UDYAM-RJ-32-0002216)</strong>. PaperGenius is strictly NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with the Central Board of Secondary Education (CBSE), the National Council of Educational Research and Training (NCERT), the Ministry of Education, or any State Government Board in India.
            </p>
          </div>

          <div className="space-y-4 text-sm text-[#CBD5E1] leading-relaxed">
            <h3 className="text-lg font-bold text-white">1. Nominative Fair Use of Trademarks</h3>
            <p>
              The acronym "CBSE", name "Central Board of Secondary Education", and references to "NCERT" are registered trademarks of their respective statutory government authorities. References to these names and acronyms on PaperGenius are made strictly for descriptive, identification, and curriculum-referencing purposes under the Nominative Fair Use doctrine of the Indian Trade Marks Act, 1999.
            </p>

            <h3 className="text-lg font-bold text-white">2. Educational & Pedagogical Purpose</h3>
            <p>
              All test papers, model questions, solutions, and AI evaluations generated via PaperGenius are designed independently for classroom testing, practice, and educational revision purposes. PaperGenius does NOT claim to possess, predict, or leak any official board examination question papers. Any similarity between practice questions and actual examination papers is purely coincidental and an outcome of curriculum alignment.
            </p>

            <h3 className="text-lg font-bold text-white">3. Public Domain Syllabus References</h3>
            <p>
              All syllabus topics, marking schemes, and question topologies referenced on PaperGenius conform to publicly published educational guidelines released by CBSE for academic scrutiny.
            </p>

            <h3 className="text-lg font-bold text-white">4. No Representation or Warranties</h3>
            <p>
              While our AI models and curriculum engines strive for 100% precision, PaperGenius makes no official representation regarding actual examination performance or guaranteed grades. Academic success remains solely dependent on the individual student's comprehensive preparation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}