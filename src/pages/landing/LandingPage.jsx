import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Building2, CheckCircle2, ArrowRight, Zap,
  FileText, Award, BookOpen, Camera,
  ChevronDown, ChevronUp, Printer, Clock, TrendingUp, Send, Download,
  Flame
} from 'lucide-react';

import EcosystemStrip from '../../components/landing/EcosystemStrip';
import HomeHeroVisualShowcase from '../../components/landing/HomeHeroVisualShowcase';
import SubjectCatalog from '../../components/landing/SubjectCatalog';
import CoachingDirectorProGrid from '../../components/landing/CoachingDirectorProGrid';
import CbseInsights from '../../components/landing/CbseInsights';
import SEO from '../../components/common/SEO';


export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "What is PaperGenius.in and how is it different from traditional question banks?",
      a: "PaperGenius.in is India's dedicated CBSE Board Exam Operating System powered by Gemini AI. Unlike static PDF banks, PaperGenius provides an end-to-end testing and evaluation engine: instant CBSE-blueprint question papers with Set A/B/C anti-cheating shuffling, printable 20 to 100Q OMR sheets, 5-year authentic board archives (2022-2026), instant 1-click WhatsApp marksheets for coaching parents, and AI vision handwriting evaluation matching official head-examiner step rubrics."
    },
    {
      q: "How does the Free CBSE Percentage Predictor work?",
      a: "School pre-board evaluations are intentionally strict. By submitting your pre-board theory marks across 5 main subjects in our /predictor tool, our algorithm maps 5-year authentic CBSE conversion data to estimate your actual final board percentage range, highlights your critical weak areas, and gives actionable subject recommendations."
    },
    {
      q: "How does the AI Answer Sheet Evaluator grade student handwriting?",
      a: "Using multimodal vision models tuned to official CBSE head examiner guidelines, PaperGenius inspects photos of your handwritten notebook copy. It transcribes equations and text, breaks down marks step-by-step (formula identification, step substitution, final magnitude with SI units), identifies lost half-marks, and compares your attempt against 100/100 topper presentation benchmarks."
    },
    {
      q: "What is the Instant WhatsApp Marksheet Generator for coaching institutes?",
      a: "Coaching directors and tutors can enter student marks, institute name, and parent phone numbers to generate an official branded report card. With a single click on 'Share to Parents (WhatsApp)', a formatted progress message opens directly in WhatsApp with zero manual typing required."
    },
    {
      q: "Can coaching centers add their own institute logo and watermark?",
      a: "Yes. Tuition Master and Coaching Director Pro tiers allow institutes to customize headers with institute brand name, address, batch details, and contact numbers. The platform also applies a 30-degree diagonal anti-photocopy watermark across all question papers to prevent unauthorized xerox distribution."
    },
    {
      q: "How do you protect student and coaching accounts from friend-sharing abuse?",
      a: "PaperGenius incorporates single-device active session fingerprinting and strict monthly quota allocation (100-150 evaluations). If an account is shared across multiple unauthorized devices, active sessions auto-lock to preserve customer quotas."
    },
    {
      q: "How can I pay without credit cards or gateway approval delays?",
      a: "We support direct 1-click UPI QR checkout (GPay, PhonePe, Paytm, BHIM) with 0% extra transaction fees. Pay directly to our registered business UPI ID, submit your 12-digit UTR/Ref number, and your subscription activates instantly."
    }
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      <SEO 
  title="PaperGenius | CBSE Board Exam OS & AI Question Paper Generator 2026"
  description="India's #1 CBSE Board Exam OS. Instant AI question paper generator with Set A/B/C shuffling for coaching centers, 5-year authentic board PYQ bundles (2022-2026), and AI step-marking answer sheet evaluator."
/>

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-[#7C3CFF]/20 to-[#06B6D4]/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#080D24] border border-[#7C3CFF]/30 text-xs sm:text-sm font-semibold text-slate-200 shadow-inner mb-6">
          <Sparkles className="w-4 h-4 text-[#06B6D4] animate-pulse" />
          <span>CBSE 2026 Examination Operating System</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="text-emerald-400 font-mono text-xs font-bold">NEP 2020 Aligned</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-5xl mx-auto leading-tight sm:leading-none">
          India's Most Advanced <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5EE7FF] via-[#7C3CFF] to-[#EC4899]">
            AI Question Paper Studio
          </span>{' '}
          & CBSE Step Evaluator
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Designed for Coaching Directors, Private Tutors, and Class 10 & 12 Board Aspirants. 
          Generate Set A/B/C scrambled test papers, predict board percentiles, download 5-year authentic archives, 
          and check handwriting against official head-examiner step rubrics.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/teacher/portal"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white text-base font-bold shadow-xl shadow-[#7C3CFF]/25 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
          >
            <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
            <span>Create Question Paper Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/predictor"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0F172A] border border-white/15 hover:border-[#06B6D4]/50 text-white text-base font-bold shadow-lg hover:bg-[#131E36] transition-all flex items-center justify-center gap-2.5"
          >
            <TrendingUp className="w-5 h-5 text-[#06B6D4]" />
            <span>Predict Board Percentage (Free)</span>
          </Link>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm font-semibold text-slate-400">
          <div className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>100% CBSE 2026 Aligned</span></div>
          <div className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>Instant WhatsApp Marksheets</span></div>
          <div className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>5-Year Board Bundles Free</span></div>
          <div className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>Direct UPI QR (0% Fee)</span></div>
        </div>
      </section>

      {/* 2. ECOSYSTEM QUICK-NAV STRIP */}
      <HomeHeroVisualShowcase />

      <EcosystemStrip />

      {/* 3. DUAL UTILITY HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B132B] to-[#080D24] border border-[#06B6D4]/30 shadow-2xl flex flex-col justify-between group hover:border-[#06B6D4] transition-all">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[#06B6D4]/20">100% Free Diagnostic Tool</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#5EE7FF] transition-colors">CBSE Board Percentage & Percentile Predictor</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Enter your pre-board theory marks out of 80 across all 5 subjects. Our machine model cross-references 5 years of historical board conversions to predict your final percentile range.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Takes 60 seconds • No signup</span>
              <Link to="/predictor" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#06B6D4]/15 hover:bg-[#06B6D4]/25 text-[#5EE7FF] text-xs sm:text-sm font-bold transition-all"><span>Calculate My Score</span><ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B1A1E] to-[#080D24] border border-emerald-500/30 shadow-2xl flex flex-col justify-between group hover:border-emerald-500 transition-all">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-emerald-500/20">Coaching Directors & Tutors</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">Instant WhatsApp Marksheet Engine for Parents</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Stop spending 4 hours every weekend typing student test marks. Enter score cards, hit 1-click share, and send an official branded performance marksheet directly to parents on WhatsApp.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Zero parent portal friction</span>
              <Link to="/teacher/report-cards" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 text-xs sm:text-sm font-bold transition-all"><span>Generate Test Marksheet</span><Send className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OFFICIAL CBSE SUBJECT CATALOGS */}
      <SubjectCatalog />

      {/* 5. FREE STUDENT FEATURES (2x2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">100% Free Tier • Class 10 & 12</div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Free Student OS Features</h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">Essential board preparation tools available to every student without payment.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#080D24] border border-white/10 hover:border-cyan-500/40 transition-all flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0"><Download className="w-6 h-6" /></div>
            <div><h3 className="text-lg font-bold text-white mb-1.5">5-Year Authentic Board Archives (2022–2026)</h3><p className="text-sm text-slate-300 leading-relaxed">Download verified complete ZIP archives covering All India and Delhi sets for all major Class 10 & 12 subjects without paywalls.</p></div>
          </div>
          <div className="p-6 sm:p-7 rounded-2xl bg-[#080D24] border border-white/10 hover:border-cyan-500/40 transition-all flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7C3CFF]/15 text-[#7C3CFF] flex items-center justify-center shrink-0"><Camera className="w-6 h-6" /></div>
            <div><h3 className="text-lg font-bold text-white mb-1.5">2 Free AI Vision Answer Checks</h3><p className="text-sm text-slate-300 leading-relaxed">Snap a photo of your handwritten notebook copy. Experience CBSE step-wise mark deductions, formula recognition, and presentation critique.</p></div>
          </div>
          <div className="p-6 sm:p-7 rounded-2xl bg-[#080D24] border border-white/10 hover:border-cyan-500/40 transition-all flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0"><BookOpen className="w-6 h-6" /></div>
            <div><h3 className="text-lg font-bold text-white mb-1.5">Official CBSE SQP & Marking Schemes</h3><p className="text-sm text-slate-300 leading-relaxed">Direct verified links to official CBSE Sample Question Papers and official head-examiner Marking Schemes for accurate marking benchmarks.</p></div>
          </div>
          <div className="p-6 sm:p-7 rounded-2xl bg-[#080D24] border border-white/10 hover:border-cyan-500/40 transition-all flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0"><TrendingUp className="w-6 h-6" /></div>
            <div><h3 className="text-lg font-bold text-white mb-1.5">CBSE Pre-Board Percentile Predictor</h3><p className="text-sm text-slate-300 leading-relaxed">Calculate your board trajectory from tough pre-board marks, discover historical conversion ratios, and get a tailored preparation strategy.</p></div>
          </div>
        </div>
      </section>

      {/* 6. FREE COACHING (2x2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">Starter Trial • Private Tutors & Institutes</div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Free Coaching OS Features</h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">Try our AI test creator and assessment workflows with zero financial commitment.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#080D24] border border-white/10 hover:border-emerald-500/40 transition-all flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0"><Zap className="w-6 h-6" /></div>
            <div><h3 className="text-lg font-bold text-white mb-1.5">2 Lifetime Full-Length AI Test Papers</h3><p className="text-sm text-slate-300 leading-relaxed">Generate 2 complete unit tests or board-style question papers with standard blueprints (MCQs, Case Studies, Long Questions).</p></div>
          </div>
          <div className="p-6 sm:p-7 rounded-2xl bg-[#080D24] border border-white/10 hover:border-emerald-500/40 transition-all flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0"><Building2 className="w-6 h-6" /></div>
            <div><h3 className="text-lg font-bold text-white mb-1.5">Custom Institute Name & Header</h3><p className="text-sm text-slate-300 leading-relaxed">Brand every test paper with your coaching institute name and address. Download ready-to-print single-page A4 master sheets.</p></div>
          </div>
          <div className="p-6 sm:p-7 rounded-2xl bg-[#080D24] border border-white/10 hover:border-emerald-500/40 transition-all flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0"><Printer className="w-6 h-6" /></div>
            <div><h3 className="text-lg font-bold text-white mb-1.5">Printable OMR Sheet Studio (20Q–100Q)</h3><p className="text-sm text-slate-300 leading-relaxed">Generate cleanly formatted 20, 40, 80, and 100 question bubble sheets for fast Sunday batch testing.</p></div>
          </div>
          <div className="p-6 sm:p-7 rounded-2xl bg-[#080D24] border border-white/10 hover:border-emerald-500/40 transition-all flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0"><Send className="w-6 h-6" /></div>
            <div><h3 className="text-lg font-bold text-white mb-1.5">Instant WhatsApp Progress Reports</h3><p className="text-sm text-slate-300 leading-relaxed">Send test performance messages straight to parents on WhatsApp without entering complex portals.</p></div>
          </div>
        </div>
      </section>

      {/* 7. PREMIUM STUDENT (2x3 = 6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 text-[#8C78FF] text-xs font-bold uppercase tracking-wider mb-3">Board Pass • Class 10 & 12</div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Premium Student Board Pass Features</h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">The complete 100/100 score booster suite designed for serious board exam aspirants.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#7C3CFF]/20 text-[#8C78FF] flex items-center justify-center mb-4"><Camera className="w-5 h-5" /></div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">100–150 AI Step-Marking Checks</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Upload handwritten copy photos. Multimodal vision evaluates every derivation step, formula, and calculation with exact board mark rubrics.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 text-[#5EE7FF] flex items-center justify-center mb-4"><Award className="w-5 h-5" /></div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">100/100 Topper Benchmarks</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Learn topper presentation secrets: dedicated 2-inch right rough margins, formula boxing, and SI unit underlining that save 5-8 marks per paper.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4"><BookOpen className="w-5 h-5" /></div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">28 Physics Derivations Toolkit</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Step-by-step verified solutions for all 28 mandatory Class 12 Physics board derivations with point-by-point head-examiner marks distribution.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4"><Flame className="w-5 h-5" /></div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">32 Named Reactions Booklet</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Visual roadmap covering all 32 Organic Chemistry named reactions with temperature, catalysts, reagents, and mechanism notes for Class 12.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4"><FileText className="w-5 h-5" /></div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">Rapid Formula Cheat Sheets</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Printable high-density 2-page rapid revision cheat sheets with formulas, balanced equations, and SI conversions for morning exam revision.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4"><Clock className="w-5 h-5" /></div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">3-Hour Timed Pre-Board Mocks</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Simulate authentic exam conditions with real-time countdown stopwatches and auto-grading against full 80-mark board blueprints.</p>
          </div>
        </div>
      </section>

      {/* 8. COACHING DIRECTOR PRO 3x3 (POINT 1) */}
      <CoachingDirectorProGrid />

      {/* 9. CBSE INSIGHTS (POINT 3) */}
      <CbseInsights />

      {/* 10. IN-DEPTH ACADEMIC & TECHNICAL SEO GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="p-8 sm:p-12 rounded-3xl bg-[#080D24] border border-white/10 shadow-2xl space-y-10">
          <header className="border-b border-white/10 pb-8 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C3CFF]/15 text-[#8C78FF] text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[#7C3CFF]/30">
              Comprehensive CBSE Examination Guide • NEP 2020 Framework
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Mastering the CBSE Board Examination (2022 to 2026): Blueprint Shifts, AI Question Paper Generation, and Head-Examiner Step Marking
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              A comprehensive technical and pedagogical analysis for School Principals, Coaching Directors, and Board Aspirants navigating India's revised secondary education curriculum.
            </p>
          </header>

          <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-8 font-normal">
            <section className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#7C3CFF]/20 text-[#8C78FF] flex items-center justify-center text-sm font-bold">1</span>
                The Transformation of CBSE Examination Architecture (2022 to 2026)
              </h3>
              <p>
                Over the past five academic sessions, the Central Board of Secondary Education (CBSE) has systematically reformed board examinations from rote memory recall into rigorous competency-based evaluation. In strict alignment with the National Education Policy (NEP 2020) and the National Curriculum Framework (NCF), rote memorization of textbook paragraphs no longer guarantees an 80+ score. Today, <strong>over 50% of aggregate marks in Class 10 and Class 12</strong> are explicitly distributed into Section E Case-Based Integrated Assessments, assertion-reasoning matrices, and application-level conceptual problems.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#06B6D4]/20 text-[#5EE7FF] flex items-center justify-center text-sm font-bold">2</span>
                The Science of CBSE Step-Marking & Topper Presentation Rubrics
              </h3>
              <p>
                In CBSE official evaluation centers, answer papers are graded strictly against <strong>Head Examiner Marking Schemes (MS)</strong>, where marks are split across formula identification, step-by-step intermediate substitutions, final magnitudes with mandatory SI units, and visual rough margins. PaperGenius incorporates multimodal vision checkpoints tuned specifically to these official rubrics to save students from losing 5 to 10 marks per paper.
              </p>
            </section>
          </div>

          <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div>Authored by PaperGenius Academic Board Research Cell</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400"></span><span>Updated for CBSE 2025–2026 Academic Session</span></div>
          </footer>
        </article>
      </section>

      {/* 11. FAQ ACCORDION & CONVERSION CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">Got Questions?</div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">Everything you need to know about PaperGenius CBSE Exam OS.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-[#080D24] border border-white/10 overflow-hidden transition-all">
              <button onClick={() => toggleFaq(idx)} className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                <span className="font-bold text-sm sm:text-base text-white">{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-[#06B6D4] shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#7C3CFF]/20 via-[#06B6D4]/20 to-[#EC4899]/20 border border-white/15 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black text-white">Ready to Supercharge Your CBSE 2026 Preparation?</h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">Join thousands of smart teachers and serious board exam aspirants. Start creating papers and evaluating answer sheets right now.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/teacher/portal" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white text-sm font-bold shadow-lg hover:opacity-95 transition-all">Start Free as Coaching / Tutor</Link>
            <Link to="/auth" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0F172A] border border-white/10 hover:border-cyan-400/50 text-white text-sm font-bold transition-all">Student 100% Free Signup</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
