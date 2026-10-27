import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, 
  FileText, Award, BookOpen, Layers, Camera, Users, Building2,
  HelpCircle, Compass, Star, ChevronDown, ChevronUp, Printer,
  Clock, Calendar, TrendingUp, Send, Lock, QrCode
} from 'lucide-react';
import { initialBlogPosts } from '../../data/blogData';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "What is PaperGenius.in and how is it different from traditional question banks?",
      a: "PaperGenius.in is India's first unified CBSE Board Exam Operating System powered by Google Gemini AI. Traditional question banks only give static questions and answers. PaperGenius provides an end-to-end ecosystem: instant CBSE-blueprint test papers with Set A/B/C anti-cheat shuffling, printable 20-100Q OMR sheets, 2022-2026 authentic board bundles (100% free for registered students), instant WhatsApp marksheet reporting for parents, and multimodal AI that evaluates handwritten student answer sheets with topper presentation rubrics."
    },
    {
      q: "How does the Free CBSE Percentage Predictor work?",
      a: "School pre-board checking is notoriously strict. By entering your pre-board theory marks (out of 80) across 5 subjects in our /predictor tool, our algorithm analyzes 5-year historic CBSE conversion data to project your expected final board percentage range, highlights your weakest subject, and gives an actionable plan to reach 95%+."
    },
    {
      q: "How does the AI Answer Sheet Evaluator check student handwriting?",
      a: "Using advanced multimodal vision models tuned to official CBSE head examiner guidelines, PaperGenius reads handwritten answers from photos snapped on any mobile phone. It transcribes the text, breaks down marks by step (formula identification, intermediate substitution, final magnitude with SI units), pinpoints exact reasons for lost marks, and contrasts your attempt with official 100/100 topper presentation benchmarks."
    },
    {
      q: "What is the Instant WhatsApp Marksheet Generator for coaching institutes?",
      a: "Coaching directors can enter test marks, student name, and parent phone number to generate an official branded performance card. With 1 click on 'Share to Parents (WhatsApp)', a formatted, professional progress report opens directly in WhatsApp with zero manual typing."
    },
    {
      q: "Can coaching centers add their own institute logo and watermark?",
      a: "Yes. Tuition Master and Coaching Director Pro plans allow institutes to customize their header with their coaching name, sub-header, batch details, and contact numbers. The platform also embeds a 30-degree diagonal anti-photocopy watermark across all question papers to prevent unauthorized xerox distribution."
    },
    {
      q: "How do you protect student and coaching accounts from friend-sharing abuse?",
      a: "PaperGenius incorporates single-device active session fingerprinting and strict monthly quota allocation (100-150 evaluations). If an account is shared across multiple unauthorized devices, active sessions auto-lock to preserve customer quotas."
    },
    {
      q: "How can I pay without credit cards or gateway approval delays?",
      a: "We support direct 1-click UPI QR checkout (GPay, PhonePe, Paytm, BHIM) with 0% extra transaction fees. Pay directly to our registered business UPI ID, submit your 12-digit UTR/Ref number, and your subscription activates instantly."
    },
    {
      q: "Can I download full previous 5 years' CBSE board papers with official marking schemes for free?",
      a: "Yes! Every registered student receives 100% free access to authentic 5-year board paper ZIP archives (2022 to 2026) covering all regional sets (Delhi, All India, Foreign) alongside direct links to the official CBSE Academic Portal marking schemes."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 text-base selection:bg-[#7C3CFF] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-100px] left-1/3 w-[600px] h-[600px] bg-[#7C3CFF]/15 blur-[160px] rounded-full" />
          <div className="absolute top-[50px] right-1/4 w-[450px] h-[450px] bg-[#06B6D4]/15 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 text-xs sm:text-sm font-bold text-[#C4B5FD]">
            <Sparkles className="w-4 h-4 text-[#C4B5FD]" />
            <span>The Complete CBSE Board Exam Operating System for 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Generate Board Papers in 10s.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5EE7FF] via-[#8C78FF] to-[#EC4899]">
              Evaluate Copies with CBSE AI.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            The all-in-one AI platform for CBSE Teachers, Coaching Centers, and Class 10 & 12 Aspirants. Auto-generate anti-cheat Set A/B/C tests, print 20-100Q OMR sheets, send 1-click WhatsApp marksheets, predict board percentiles, and check handwriting against CBSE rubrics.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/teacher/create-paper"
              className="btn-gradient px-8 py-4 rounded-2xl text-base sm:text-lg font-bold text-white shadow-xl hover:shadow-[#06B6D4]/30 flex items-center gap-2"
            >
              <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <span>Create Question Paper Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/predictor"
              className="px-8 py-4 rounded-2xl bg-[#0C1330] hover:bg-[#111A3D] text-[#67E8F9] border border-[#06B6D4]/40 text-base sm:text-lg font-bold transition-all shadow-md flex items-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Predict Board Percentage (Free)</span>
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>100% CBSE 2026 Pattern Aligned</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Instant WhatsApp Marksheets</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>5-Year Board Bundles Free</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Instant UPI QR (0% Fee)</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. NEW FEATURE HIGHLIGHT STRIP (PREDICTOR & WHATSAPP REPORT CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Highlight 1: Percentage Predictor */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-[#080D24] to-[#0D2438] border border-[#06B6D4]/40 shadow-xl flex items-center justify-between gap-4 group">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#06B6D4]/15 text-[#67E8F9] text-xs font-mono font-bold">
                100% FREE DIAGNOSTIC
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#67E8F9] transition-colors">
                CBSE Board Percentage Predictor
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Enter your pre-board theory marks. Our algorithm projects your final board percentile based on 5-year conversion trends.
              </p>
              <Link to="/predictor" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#67E8F9] hover:underline pt-1">
                <span>Calculate My Score Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#06B6D4]/20 text-[#67E8F9] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>

          {/* Highlight 2: WhatsApp Marksheets */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-[#080D24] to-[#0A2E20] border border-emerald-500/40 shadow-xl flex items-center justify-between gap-4 group">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 text-xs font-mono font-bold">
                COACHING DIRECTORS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
                Instant WhatsApp Marksheet Engine
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Send branded student performance reports directly to parents' WhatsApp with 1 click. Eliminates manual report card typing.
              </p>
              <Link to="/teacher/report-cards" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-400 hover:underline pt-1">
                <span>Generate Test Marksheet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Send className="w-8 h-8" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. DUAL PILLAR HIGHLIGHT: TEACHER VS STUDENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pillar 1: For Teachers / Coaching */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#080D24] border border-[rgba(140,120,255,0.25)] hover:border-[#7C3CFF]/50 transition-all space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#7C3CFF]/20 flex items-center justify-center text-[#C4B5FD]">
                <Building2 className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold text-[#C4B5FD] uppercase tracking-wider">
                For Coaching Directors & Private Tutors
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Coaching OS & AI Paper Setter Studio
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Save 10 hours every week. Create unit tests (20M), periodic assessments (40M), and full pre-boards (80M) with your institute name, address, and anti-copy watermark in 10 seconds.
              </p>
              <ul className="space-y-2.5 text-sm text-[#CBD5E1]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>Anti-Cheating Set A, B & C Shuffling:</strong> Prevent copying in full classrooms.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>Instant WhatsApp Marksheet Engine:</strong> 1-Click score updates to parents.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>Institute Header & 30° Watermark:</strong> Prevent unauthorized xeroxing.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>1-Click OMR Sheets (20 to 100Q):</strong> Print clean single-page response sheets.</span>
                </li>
              </ul>
            </div>
            <Link
              to="/teacher/dashboard"
              className="btn-gradient w-full py-3.5 rounded-xl font-bold text-white text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Explore Coaching Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 2: For Students */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#080D24] border border-[rgba(6,182,212,0.25)] hover:border-[#06B6D4]/50 transition-all space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#06B6D4]/20 flex items-center justify-center text-[#67E8F9]">
                <Users className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold text-[#67E8F9] uppercase tracking-wider">
                For Class 10 & 12 Board Aspirants
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Student AI Answer Sheet Evaluator
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Snap a photo of your handwritten notebook copy. Our multimodal CBSE examiner checks your derivation, calculation, and final answer according to official board step-marking guidelines.
              </p>
              <ul className="space-y-2.5 text-sm text-[#CBD5E1]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>Step-Wise CBSE Marks Allocation:</strong> See marks awarded per line.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>CBSE 100/100 Topper Presentation Benchmarks:</strong> Formula boxing & margins.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>Single-Device Protection:</strong> Account integrity & quota security.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>2022-2026 Board Bundles (ZIP):</strong> 100% Free 5-year official paper series.</span>
                </li>
              </ul>
            </div>
            <Link
              to="/student"
              className="btn-gradient w-full py-3.5 rounded-xl font-bold text-white text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Explore Student OS Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. 1000+ WORDS IN-DEPTH EDUCATIONAL SEO CONTENT */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#080D24] p-8 sm:p-12 rounded-3xl border border-[rgba(140,120,255,0.25)] shadow-2xl space-y-10">
          
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              1. The Evolution of CBSE Board Examination (2022 to 2026): Why 5-Year Pattern is Mandatory
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              Over the last five academic cycles, the Central Board of Secondary Education (CBSE) has orchestrated the most profound curriculum overhaul in Indian school education history. Spearheaded by the National Education Policy (NEP 2020), rote memorization has been systematically phased out. Today, over <strong>50% of the aggregate marks in both Class 10 and Class 12 board examinations are strictly allocated to competency-focused questions</strong> (MCQs, assertion-reasoning, and Section E integrated case studies).
            </p>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              PaperGenius.in bridges this gap by providing authentic 2022-2026 board paper archives, instant AI evaluation matching official head examiner rubrics, and direct tools like the free CBSE Percentage Predictor.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              2. The Anatomy of CBSE Step-Marking & Topper Presentation Standards
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              Examiners evaluate subjective copies under rigid step-marking rubrics. Formula statements carry 0.5 to 1.0 mark independently; mathematical manipulations earn intermediate credit; and concluding magnitudes require correct SI units (omitting units loses 0.5 mark). Toppers visually separate calculations by boxing formulas, maintaining dedicated 2-inch right margins for rough arithmetic, and underlining final answers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              3. Institutional Automation for Coaching Centers & Tutors
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              Coaching proprietors reclaim 120+ instructional hours each session with PaperGenius: Set A/B/C question shuffling eliminates classroom copying, custom 30-degree diagonal watermarks safeguard proprietary tests, and our WhatsApp marksheet generator eliminates tedious weekend reporting to parents.
            </p>
          </section>

          {/* Internal Links Grid */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#67E8F9]" />
              <span>Explore the PaperGenius CBSE Ecosystem</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 text-xs font-semibold">
              <Link to="/class-10" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-[#67E8F9] border border-white/5 text-center">Class 10 Hub</Link>
              <Link to="/class-12" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-[#C4B5FD] border border-white/5 text-center">Class 12 Hub</Link>
              <Link to="/predictor" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-cyan-300 border border-white/5 text-center">Percentage Predictor</Link>
              <Link to="/teacher/report-cards" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-emerald-300 border border-white/5 text-center">WhatsApp Marksheets</Link>
              <Link to="/pyq-vault" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-amber-300 border border-white/5 text-center">5-Yr PYQs</Link>
              <Link to="/teacher/dashboard" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-pink-300 border border-white/5 text-center">Coaching OS</Link>
              <Link to="/pricing" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-white border border-white/5 text-center">Pricing Plans</Link>
            </div>
          </section>

          {/* FAQs */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
              <span>Frequently Asked Questions (CBSE Board Exam OS)</span>
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="rounded-2xl bg-[#0C1330] border border-white/5 overflow-hidden transition-all">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-white text-sm sm:text-base hover:text-[#67E8F9] transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#67E8F9] shrink-0 ml-2" /> : <ChevronDown className="w-4 h-4 text-[#94A3B8] shrink-0 ml-2" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </article>

      {/* 5. FEATURED BLOG SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3CFF]/15 text-[#C4B5FD] text-xs font-mono font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Academic Knowledge Hub</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Latest CBSE Board Exam Strategy & Insights
            </h2>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#67E8F9] hover:underline shrink-0"
          >
            <span>Explore All Strategy Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initialBlogPosts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="rounded-3xl bg-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all p-6 flex flex-col justify-between space-y-4 shadow-xl group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#7C3CFF]/20 text-[#C4B5FD] font-mono font-bold">
                    {post.category}
                  </span>
                  <span className="text-[#94A3B8] flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#67E8F9] transition-colors leading-snug">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-[#94A3B8] line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[#64748B] font-mono">{post.date}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-bold text-[#C4B5FD] group-hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
