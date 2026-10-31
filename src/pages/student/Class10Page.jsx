import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, CheckCircle2, ArrowRight, Download, Camera,
  BookOpen, Award, Layers, Zap, Clock, TrendingUp, Compass,
  ChevronRight, ShieldCheck, Check, X
} from 'lucide-react';

import Class10FreeFeatures from '../../components/class10/Class10FreeFeatures';
import Class10PremiumFeatures from '../../components/class10/Class10PremiumFeatures';
import Class10FaqSection from '../../components/class10/Class10FaqSection';
import Class10VisualShowcase from '../../components/class10/Class10VisualShowcase';

export default function Class10Page() {
  const coreSubjects = [
    {
      codeBadge: '80 Theory + 20 Internal',
      title: 'Science (086)',
      desc: 'Physics optics & electricity, Chemistry reactions & carbon, Biology life processes & genetics.',
      link: '/student?tab=pyq&subject=Science'
    },
    {
      codeBadge: 'Standard & Basic Formats',
      title: 'Mathematics (041 / 241)',
      desc: 'Triangles proofs, quadratic equations, trigonometry identities, surface areas and statistics.',
      link: '/student?tab=pyq&subject=Mathematics'
    },
    {
      codeBadge: 'History, Civics, Geo, Eco',
      title: 'Social Science (087)',
      desc: 'Nationalism in Europe & India, federalism, manufacturing industries, map work guarantees.',
      link: '/student?tab=pyq&subject=Social+Science'
    },
    {
      codeBadge: 'Reading, Writing & Literature',
      title: 'English Lit. (184)',
      desc: 'Analytical paragraphs, formal letters, First Flight and Footprints without Feet step answers.',
      link: '/student?tab=pyq&subject=English'
    }
  ];

  return (
    <div className="space-y-20 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* 1. HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#06B6D4] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#5EE7FF]" />
          <span>Official CBSE Class 10 Board Exam Portal 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          CBSE Class 10 Board Exam Preparation Hub
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Master Science, Mathematics Standard, Basic, Social Science, and English with authentic 5-year chapter-wise solved question banks, official marking schemes, and AI-powered step-marking answer sheet evaluation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/student"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white text-base font-bold shadow-xl shadow-[#7C3CFF]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2.5"
          >
            <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
            <span>Open Student Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/student?tab=bundles"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0F172A] border border-white/15 hover:border-cyan-400 text-white text-base font-bold transition-all flex items-center justify-center gap-2.5"
          >
            <Download className="w-5 h-5 text-cyan-400" />
            <span>Download 2022-2026 Papers</span>
          </Link>
        </div>
      </section>

      {/* 2. CORE 4 SUBJECTS QUICK-CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {coreSubjects.map((sub, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-[#080D24] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <span className="inline-block px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 font-bold uppercase">
                {sub.codeBadge}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {sub.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {sub.desc}
              </p>
            </div>
            <Link
              to={sub.link}
              className="mt-6 pt-3 border-t border-white/5 inline-flex items-center gap-1.5 text-xs font-bold text-[#06B6D4] hover:underline"
            >
              <span>Access Solved Papers</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </section>

      {/* 3. FREE PLAN FEATURES (2x2 GRID) */}
      <Class10VisualShowcase />

      <Class10FreeFeatures />

      {/* 4. PREMIUM PLAN FEATURES (2x4 GRID) */}
      <Class10PremiumFeatures />

      {/* 5. SIDE-BY-SIDE VALUE COMPARISON (CENTERED HEADER) */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B132B] to-[#080D24] border border-white/15 shadow-2xl space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
            Plan Comparison
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Free Student Tier vs Class 10 Board Pass
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Everything 100% transparent. No hidden charges or automatic recurring traps.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-xs">
                <th className="py-3.5 px-4">Feature / Capability</th>
                <th className="py-3.5 px-4 text-center">Free Student OS</th>
                <th className="py-3.5 px-4 text-center text-cyan-300 font-bold">Class 10 Board Pass (₹199)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-4 px-4 font-semibold text-white">5-Year Authentic Board ZIP Bundles (2022-2026)</td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold">Included (Free)</td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold">Included (Free)</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">AI Handwritten Step-Marking Checks</td>
                <td className="py-4 px-4 text-center text-slate-400">2 Lifetime Trial Checks</td>
                <td className="py-4 px-4 text-center text-cyan-400 font-bold">100 Checks / Month</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">CBSE 100/100 Topper Presentation Benchmarks</td>
                <td className="py-4 px-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto text-rose-500/60" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Printable 2-Page Formula & Equation Cheat Sheets</td>
                <td className="py-4 px-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto text-rose-500/60" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">3-Hour Timed Pre-Board Mock Exams</td>
                <td className="py-4 px-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto text-rose-500/60" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">CBSE Percentage Predictor Tool</td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold">100% Free Access</td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold">100% Free Access</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex justify-center">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white text-sm font-bold shadow-lg hover:opacity-95 transition-all"
          >
            <span>Upgrade to Class 10 Board Pass (₹199)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. ESSENTIAL CBSE BOARD NAVIGATION & RESOURCES (CENTERED HEADER) */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
            Quick Hub Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Essential CBSE Board Navigation & Resources
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Direct shortcuts to examination portals, revision vaults, and senior grade tools.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/student"
            className="p-5 rounded-2xl bg-[#080D24] border border-white/10 hover:border-cyan-400/50 flex items-center justify-between text-sm font-bold text-white transition-all group"
          >
            <span>Student Dashboard</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/pyq-vault"
            className="p-5 rounded-2xl bg-[#080D24] border border-white/10 hover:border-cyan-400/50 flex items-center justify-between text-sm font-bold text-white transition-all group"
          >
            <span>10-Year PYQ Vault</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/class-12"
            className="p-5 rounded-2xl bg-[#080D24] border border-white/10 hover:border-purple-400/50 flex items-center justify-between text-sm font-bold text-white transition-all group"
          >
            <span>Class 12 Board Hub</span>
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/pricing"
            className="p-5 rounded-2xl bg-[#080D24] border border-white/10 hover:border-emerald-400/50 flex items-center justify-between text-sm font-bold text-emerald-400 transition-all group"
          >
            <span>Board Pass Plans (₹199)</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 7. IN-DEPTH SEO ACADEMIC GUIDE (FULL WIDTH CONTAINER) */}
      <article className="p-8 sm:p-12 rounded-3xl bg-[#080D24] border border-white/10 shadow-2xl space-y-8">
        <header className="border-b border-white/10 pb-6 text-center max-w-4xl mx-auto space-y-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
            Pedagogical Blueprint 2025–2026
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 leading-tight">
            Understanding the Latest CBSE Class 10 Board Exam Pattern (2025 - 2026)
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            A comprehensive strategic manual for Class 10 board candidates aiming for 95%+ under revised NEP 2020 rubrics.
          </p>
        </header>

        <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          <p>
            The Central Board of Secondary Education (CBSE) has restructured the Class 10 examination under the National Education Policy (NEP 2020). Rote learning and mere memorization no longer yield top scores. Today, at least <strong>50% of the questions are competency-based</strong>, designed to evaluate application, real-world case analysis, and high-order thinking skills (HOTS).
          </p>
          <p>
            Students preparing for Class 10 board exams must understand the exact 80-mark blueprint. The question paper is divided into five distinct sections: Section A contains 20 Multiple Choice Questions (including Assertion-Reasoning); Section B features 6 Short Answer questions of 2 marks each; Section C has 7 Short Answer questions of 3 marks each; Section D comprises 3 Long Answer questions of 5 marks each; and Section E holds 3 Case-Based integrated assessment units carrying 4 marks each. Knowing this structure gives students a strategic advantage during the 15-minute question paper reading slot from 10:15 AM to 10:30 AM.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
            Official CBSE Step-Marking Scheme: How Examiners Award Marks
          </h3>
          <p>
            One of the greatest misconceptions among students is that only the final answer matters. In official CBSE evaluations, every single step carries allocated weightage:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-sm font-mono font-bold text-cyan-300">Step 1: Formula & Given Data</span>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">Stating the initial formula and writing given parameters with signs awards 0.5 to 1 full mark independently.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-sm font-mono font-bold text-purple-300">Step 2: Substitution & Logic</span>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">Accurate mathematical substitution without skipping lines secures step marks even if an arithmetic slip happens later.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-sm font-mono font-bold text-emerald-300">Step 3: Units & Conclusions</span>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">Never omit SI units (Joules, Amperes, cm²). Forgetting units leads to a direct deduction of 0.5 marks across Science and Maths.</p>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white pt-6">
            Subject-Specific Preparation Strategy for 95%+ in Class 10
          </h3>
          <p>
            <strong>Class 10 Science (Physics, Chemistry, Biology):</strong> Focus heavily on balanced chemical equations in Chapters 1 to 4. Ensure conditions such as sunlight, heat, and catalyst names are written above reaction arrows. In Physics, practice ray diagrams for concave and convex mirrors using a sharp pencil and ruler; directional arrows are strictly mandatory. For Biology, master labeled diagrams of the human heart, nephron, and reflex arc.
          </p>
          <p>
            <strong>Class 10 Mathematics Standard vs Basic:</strong> Basic Mathematics students should solve every single NCERT exercise and example twice. Standard Mathematics candidates must also complete NCERT Exemplar and 10-year past papers available in our CBSE PYQ Vault. High-weightage chapters include Triangles (Thales Theorem), Quadratic Equations, Surface Areas and Volumes, and Trigonometric Identities.
          </p>
          <p>
            <strong>Class 10 Social Science & English:</strong> Social Science demands structured sub-headings. Avoid continuous paragraph essays; write 3 numbered points for 3-mark questions and 5 numbered points for 5-mark questions. In English Language and Literature, practice formal letter formats and analytical paragraphs based on data charts to score full marks in the writing section.
          </p>
        </div>
      </article>

      {/* 8. 10 SUBJECT-WISE FAQS */}
      <Class10FaqSection />

    </div>
  );
}
