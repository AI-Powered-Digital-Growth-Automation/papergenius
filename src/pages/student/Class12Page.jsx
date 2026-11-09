import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, CheckCircle2, ArrowRight, Download, Camera,
  BookOpen, Award, Layers, Zap, Clock, TrendingUp, Compass,
  ChevronRight, ShieldCheck, Check, X, Flame
} from 'lucide-react';

import Class12FreeFeatures from '../../components/class12/Class12FreeFeatures';
import Class12PremiumFeatures from '../../components/class12/Class12PremiumFeatures';
import Class12FaqSection from '../../components/class12/Class12FaqSection';
import Class12VisualShowcase from '../../components/class12/Class12VisualShowcase';
import SEO from '../../components/common/SEO';


export default function Class12Page() {
  const streamSubjects = [
    {
      codeBadge: 'Theory 70 + Practical 30',
      title: 'Physics (042)',
      desc: '28 Mandatory derivations, electrostatics, optics ray diagrams, electromagnetic induction.',
      link: '/student?tab=pyq&subject=Physics'
    },
    {
      codeBadge: 'Theory 70 + Practical 30',
      title: 'Chemistry (043)',
      desc: '32 Organic named reactions, coordination compounds, electrochemistry, chemical kinetics.',
      link: '/student?tab=pyq&subject=Chemistry'
    },
    {
      codeBadge: 'Theory 80 + Internal 20',
      title: 'Mathematics (041)',
      desc: 'Calculus master proofs, vectors & 3D geometry skew-lines, probability distributions.',
      link: '/student?tab=pyq&subject=Mathematics'
    },
    {
      codeBadge: 'Theory 70 + Practical 30',
      title: 'Biology (044)',
      desc: 'Genetics, human reproduction, biotechnology principles, ecology biodiversity conservation.',
      link: '/student?tab=pyq&subject=Biology'
    },
    {
      codeBadge: 'Theory 80 + Project 20',
      title: 'Accountancy (055)',
      desc: 'Partnership reconstitution, share capital journal entries, cash flow statements.',
      link: '/student?tab=pyq&subject=Accountancy'
    },
    {
      codeBadge: 'Theory 80 + Project 20',
      title: 'Economics (030)',
      desc: 'Macroeconomics national income numericals, money & banking, Indian economic development.',
      link: '/student?tab=pyq&subject=Economics'
    }
  ];
  const class12FaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do head examiners evaluate 5-mark Physics derivations like AC Generator and Prism Formula?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 5-mark derivation is strictly split into: 1 mark for a properly labeled neat diagram (with arrows), 1 mark for core principle, 2.5 marks for intermediate algebraic steps without skipping logic, and 0.5 mark for the final boxed formula with standard SI units."
        }
      },
      {
        "@type": "Question",
        "name": "Are mechanisms mandatory for all 32 Organic Chemistry named reactions in Class 12?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. CBSE only tests mechanisms for specific syllabus-marked reactions: Hydration of ethene, Dehydration of ethanol, and Nucleophilic addition to aldehydes/ketones. For all other named reactions, balanced equations with reagents suffice."
        }
      },
      {
        "@type": "Question",
        "name": "In Class 12 Calculus, if the integration constant (+C) is forgotten, how many marks are lost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Omitting the arbitrary integration constant (+C) in indefinite integrals results in a mandatory 0.5-mark deduction by the examiner, even if the integrand substitution is accurate."
        }
      }
    ]
  };


  return (
    <div className="space-y-20 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <SEO
        title="CBSE Class 12 Board Exam Hub 2026 | Physics Derivations & AI Evaluator"
        description="Master CBSE Class 12 Physics derivations, Chemistry named reactions, Maths calculus PYQs (2022-2026), and evaluate handwritten answer sheets with AI step-marking."
        schema={class12FaqSchema}
      />

      {/* 1. HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 text-[#A78BFA] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#C4B5FD]" />
          <span>Official CBSE Class 12 Senior Secondary Portal 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          CBSE Class 12 Board Exam Preparation Hub
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Master Science, Commerce, and Humanities with 28 Physics derivations, 32 Organic Chemistry reactions, 
          authentic 5-year board bundles, and AI multimodal step-marking answer sheet evaluation.
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

      {/* 2. CORE STREAM SUBJECT CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {streamSubjects.map((sub, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-[#080D24] border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <span className="inline-block px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-purple-300 font-bold uppercase">
                {sub.codeBadge}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {sub.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {sub.desc}
              </p>
            </div>
            <Link
              to={sub.link}
              className="mt-6 pt-3 border-t border-white/5 inline-flex items-center gap-1.5 text-xs font-bold text-[#A78BFA] hover:underline"
            >
              <span>Access Solved Papers</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </section>

      {/* 3. FREE PLAN FEATURES (2x2 GRID) */}
      <Class12VisualShowcase />

      <Class12FreeFeatures />

      {/* 4. PREMIUM PLAN FEATURES (2x4 GRID) */}
      <Class12PremiumFeatures />

      {/* 5. SIDE-BY-SIDE VALUE COMPARISON */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B132B] to-[#080D24] border border-white/15 shadow-2xl space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
            Plan Comparison
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Free Student Tier vs Class 12 Board Pass
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Direct transparent features designed to maximize your board percentage and college admission rank.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-xs">
                <th className="py-3.5 px-4">Feature / Senior Capability</th>
                <th className="py-3.5 px-4 text-center">Free Student OS</th>
                <th className="py-3.5 px-4 text-center text-purple-300 font-bold">Class 12 Board Pass (₹499)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-4 px-4 font-semibold text-white">5-Year Authentic Board Bundles (2022-2026)</td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold">Included (Free)</td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold">Included (Free)</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">AI Derivation & Numerical Checks</td>
                <td className="py-4 px-4 text-center text-slate-400">2 Lifetime Trial Checks</td>
                <td className="py-4 px-4 text-center text-purple-300 font-bold">150 Checks / Month</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">All 28 Mandatory Physics Derivations with Marks</td>
                <td className="py-4 px-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto text-rose-500/60" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">32 Organic Chemistry Named Reactions Roadmap</td>
                <td className="py-4 px-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto text-rose-500/60" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Section E Competency-Based Case Study Bank</td>
                <td className="py-4 px-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto text-rose-500/60" /></td>
                <td className="py-4 px-4 text-center text-emerald-400 font-bold"><Check className="w-4 h-4 mx-auto text-emerald-400" /></td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">CBSE Percentage & Percentile Predictor</td>
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
            <span>Upgrade to Class 12 Board Pass (₹499)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. ESSENTIAL CBSE BOARD NAVIGATION & RESOURCES */}
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
            to="/class-10"
            className="p-5 rounded-2xl bg-[#080D24] border border-white/10 hover:border-purple-400/50 flex items-center justify-between text-sm font-bold text-white transition-all group"
          >
            <span>Class 10 Board Hub</span>
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/pricing"
            className="p-5 rounded-2xl bg-[#080D24] border border-white/10 hover:border-emerald-400/50 flex items-center justify-between text-sm font-bold text-emerald-400 transition-all group"
          >
            <span>Board Pass Plans (₹499)</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 7. IN-DEPTH SEO ACADEMIC GUIDE (1200+ WORDS, FULL WIDTH) */}
      <article className="p-8 sm:p-12 rounded-3xl bg-[#080D24] border border-white/10 shadow-2xl space-y-8">
        <header className="border-b border-white/10 pb-6 text-center max-w-4xl mx-auto space-y-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
            Senior Secondary Academic Framework 2025–2026
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 leading-tight">
            Mastering the CBSE Class 12 Examination: Derivations, Reaction Roadmaps, and Calculus Rubrics
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            A comprehensive strategic handbook for Class 12 aspirants targeting 95%+ across Science, Commerce, and Humanities.
          </p>
        </header>

        <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          <p>
            The CBSE Class 12 Board Examination represents the most critical academic milestone in Indian secondary education. With college admissions and national competitive benchmarks (CUET, JEE, NEET) hinged on conceptual rigor, the revised CBSE syllabus mandates that over <strong>50% of the questions be application-oriented, competency-based, and analytical</strong>.
          </p>
          <p>
            In Science streams, students must navigate a dual challenge: theoretical depth and mathematical accuracy. In Physics (042), 28 mandatory derivations account for nearly 20 to 25 marks across 3-mark and 5-mark sections. Stating the governing physical law, drawing directional field/ray diagrams with neat arrowheads, and expressing intermediate algebraic substitutions without logical gaps are strictly inspected by examiners.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
            Organic Chemistry & Physical Chemistry Scoring Secrets
          </h3>
          <p>
            In Chemistry (043), Organic Chemistry constitutes over 33 marks. Students frequently memorize reactions in isolation, leading to confusion during multi-step conversion questions in Section C. Mastering the 32 Organic Named Reactions as a connected roadmap—understanding which reagent acts as an oxidizing agent (PCC vs alkaline KMnO4) and which facilitates nucleophilic addition—enables students to solve 3-step synthesis questions in under two minutes.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
            Mathematics Calculus & Commerce Ledger Rigor
          </h3>
          <p>
            In Mathematics (041), Calculus (Continuity, Differentiability, Integrals, and Differential Equations) carries the highest single weightage. Stating initial conditions, declaring integration constants (+C), and clearly boxing final answers prevent unnecessary deductions. In Commerce, Accountancy (055) and Economics (030) demand structured working notes and formula statements before numerical computation.
          </p>
        </div>
      </article>

      {/* 8. 16 SUBJECT-WISE FAQS */}
      <Class12FaqSection />

    </div>
  );
}
