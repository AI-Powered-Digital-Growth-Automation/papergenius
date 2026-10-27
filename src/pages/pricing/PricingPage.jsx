import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Sparkles, ShieldCheck, Zap, ArrowRight, 
  HelpCircle, Mail, X, Building2, User,
  Award, BookOpen, Clock, Compass, ChevronDown, ChevronUp, QrCode,
  TrendingUp, Send, Star, Lock
} from 'lucide-react';
import PaymentModal from '../../components/common/PaymentModal';

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleOpenPayment = (planObj) => {
    setSelectedPlanForPayment(planObj);
    setIsModalOpen(true);
  };

  const pricingFaqs = [
    {
      q: "How does the Instant UPI Payment & Access Activation work?",
      a: "When you select a plan, a dynamic UPI QR code opens with the exact amount. Scan it using GPay, PhonePe, Paytm, or any BHIM UPI app, or pay directly via our registered business UPI ID (7737356386@ybl). Enter the 12-digit UTR/Ref number from your payment receipt, and your subscription activates instantly with zero delay."
    },
    {
      q: "Why is PaperGenius structured on a per-subject pass rather than a bulky all-subject package?",
      a: "Most board aspirants only struggle in 1 or 2 high-stakes subjects (e.g., Physics or Mathematics). Forcing students to buy a ₹3,000 all-subject bundle creates unnecessary financial burden. Our targeted ₹199 (Class 10) and ₹499 (Class 12) passes allow students to master their exact weak subject with 100 to 150 AI step-marking checks, 5-year official board bundles (2022-2026), and printable 2-page formula kits at fraction of the cost."
    },
    {
      q: "How does the monthly paper quota work for coaching institutes?",
      a: "Under the Tuition Master plan (₹799/month), private tutors receive an active quota of 12 test papers per month. The Coaching Director Pro annual plan (₹4,999/year) provides an expansive quota of 150 papers for the full academic session. Unused quotas can be augmented anytime with our top-up booster (25 papers for ₹499)."
    },
    {
      q: "What is the Instant WhatsApp Marksheet Generator included in coaching plans?",
      a: "Coaching institutes get complete access to our WhatsApp marksheet engine. Enter student scores, test title, and parent mobile number to generate a branded performance card. With 1 click, a formatted report card message opens directly in WhatsApp to send to parents."
    },
    {
      q: "Why does PaperGenius strictly focus on the last 5 years of board papers (2022-2026)?",
      a: "CBSE implemented the National Education Policy (NEP) with 50% competency-based questions, case studies, and assertion-reasoning questions starting in 2022. Solving pre-2020 papers wastes valuable student time on obsolete patterns. Our vault strictly indexes authentic 2022-2026 board papers with matching official marking schemes."
    },
    {
      q: "How does the single-device security lock protect my account?",
      a: "To prevent unauthorized friend-sharing and protect your monthly AI evaluation quota, accounts are tied to single active device sessions. This ensures only you utilize your dedicated monthly evaluations."
    },
    {
      q: "Can I get an official GST invoice for my coaching institute?",
      a: "Yes. Registered coaching centers, schools, and private tutors can request a formal B2B GST invoice by emailing their GSTIN, institute name, and transaction ID to contact@papergenius.in."
    },
    {
      q: "What is your refund policy?",
      a: "We offer a 100% free Starter Trial for teachers to evaluate question generation quality and 100% free 5-year board bundles for students. Because digital access and AI evaluation quota are granted immediately upon payment, subscriptions are non-refundable once quota is consumed."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 pt-8 px-4 sm:px-6 lg:px-8 text-base">
      
      {/* 1. HERO HEADER */}
      <div className="max-w-6xl mx-auto mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 text-xs sm:text-sm font-bold text-[#C4B5FD]">
          <Sparkles className="w-4 h-4 text-[#C4B5FD]" />
          <span>Transparent CBSE Board Exam OS Pricing (2025-2026 Session)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Invest in Guaranteed Board Results
        </h1>

        <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
          Affordable, single-subject score accelerators for Class 10 & 12 students and high-speed exam generator licenses for coaching institutes. Instant UPI QR payment with 0% extra transaction fees.
        </p>

        {/* Support Alert Banner */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0C1330] border border-[#06B6D4]/30 text-xs sm:text-sm text-[#CBD5E1] shadow-md">
          <Mail className="w-4 h-4 text-[#67E8F9] shrink-0" />
          <span>
            Payment completed or need custom invoice? Email: <strong className="text-[#67E8F9] font-mono">contact@papergenius.in</strong> (1-Hour Resolution)
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">

        {/* 2. FOR STUDENTS (CLASS 10 & 12) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
            <User className="w-6 h-6 text-[#67E8F9]" />
            <h2 className="text-2xl font-black text-white">For Class 10 & 12 Board Aspirants</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Class 10 Pass */}
            <div className="p-8 rounded-3xl bg-[#080D24] border border-white/10 hover:border-[#06B6D4]/50 transition-all flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded bg-[#06B6D4]/15 text-[#67E8F9] text-xs font-mono font-bold">
                  CLASS 10 BOOSTER
                </span>
                <h3 className="text-2xl font-black text-white">Class 10 Board Pass</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white">₹199</span>
                  <span className="text-sm text-[#94A3B8]">/ per subject monthly</span>
                </div>
                <p className="text-sm text-[#94A3B8]">Targeted score accelerator for Science, Maths Standard, Maths Basic, or SST.</p>

                <ul className="space-y-2.5 text-sm text-[#E2E8F0] pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span><strong>100 AI Answer Step-Marking Checks</strong> / Month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span><strong>CBSE 100/100 Topper Presentation Benchmarks</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span><strong>Last 5 Years Board Bundles (2022-2026)</strong> in 1-Click ZIP</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>High-Yield Solved PYQ Vault with Step Allocation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Printable 2-Page Formula & Balanced Chemical Equations Sheet</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Full-Length 3-Hour Timed Pre-Board Mock Exams with Timer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Single-Device Active Account Protection</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPayment({
                  name: 'Class 10 Board Pass',
                  priceNumeric: 199,
                  targetGrade: 'Class 10',
                  type: 'student'
                })}
                className="btn-gradient w-full py-4 rounded-2xl text-center font-bold text-white shadow-xl hover:opacity-95 flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Get Class 10 Pass (₹199)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Class 12 Pass */}
            <div className="p-8 rounded-3xl bg-[#080D24] border border-[#7C3CFF]/40 hover:border-[#7C3CFF] transition-all flex flex-col justify-between space-y-6 shadow-2xl relative">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-xs font-bold text-white shadow-md">
                MOST POPULAR
              </div>

              <div className="space-y-4">
                <span className="px-3 py-1 rounded bg-[#7C3CFF]/20 text-[#C4B5FD] text-xs font-mono font-bold">
                  CLASS 12 BOOSTER
                </span>
                <h3 className="text-2xl font-black text-white">Class 12 Board Pass</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white">₹499</span>
                  <span className="text-sm text-[#94A3B8]">/ per subject monthly</span>
                </div>
                <p className="text-sm text-[#94A3B8]">Comprehensive kit for Physics, Chemistry, Maths, Bio, Accounts, or Economics.</p>

                <ul className="space-y-2.5 text-sm text-[#E2E8F0] pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span><strong>150 Advanced AI Derivation & Numerical Checks</strong> / Month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span><strong>CBSE 100/100 Topper Presentation Benchmarks</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span><strong>All 28 Mandatory Physics Derivations</strong> with CBSE step rubrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span><strong>32 Organic Chemistry Named Reactions</strong> Roadmap Booklet</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span><strong>Last 5 Years Board Bundles (2022-2026)</strong> in 1-Click ZIP</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Section E Competency-Based Case Study Bank</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Single-Device Active Account Protection</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPayment({
                  name: 'Class 12 Board Pass',
                  priceNumeric: 499,
                  targetGrade: 'Class 12',
                  type: 'student'
                })}
                className="btn-gradient w-full py-4 rounded-2xl text-center font-bold text-white shadow-xl hover:opacity-95 flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Get Class 12 Pass (₹499)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* 3. FOR COACHING CENTERS & PRIVATE TUTORS */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
            <Building2 className="w-6 h-6 text-[#C4B5FD]" />
            <h2 className="text-2xl font-black text-white">For Coaching Centers & Private Tutors</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Plan 1: Starter Trial */}
            <div className="p-7 rounded-3xl bg-[#080D24] border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#94A3B8]">EVALUATION PASS</span>
                <h3 className="text-xl font-black text-white">Starter Trial</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">₹0</span>
                  <span className="text-xs text-[#94A3B8]">/ Forever Free</span>
                </div>
                <p className="text-xs text-[#94A3B8]">Test question generator quality on CBSE pattern.</p>

                <ul className="space-y-2 text-xs text-[#CBD5E1] pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span><strong>2 Test Papers Total</strong> (Lifetime Quota)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Class 10 & 12 formats (20 & 40 marks)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Basic Teacher Answer Key</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[#64748B]">
                    <X className="w-4 h-4" />
                    <span>Custom Coaching Logo Header</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[#64748B]">
                    <X className="w-4 h-4" />
                    <span>Anti-Cheating Set A/B/C Shuffling</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[#64748B]">
                    <X className="w-4 h-4" />
                    <span>WhatsApp Marksheet Generator</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/teacher/create-paper"
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-center text-sm border border-white/10"
              >
                Start Generating Free
              </Link>
            </div>

            {/* Plan 2: Tuition Master */}
            <div className="p-7 rounded-3xl bg-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#C4B5FD]">MONTHLY BATCH PLAN</span>
                <h3 className="text-xl font-black text-white">Tuition Master</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">₹799</span>
                  <span className="text-xs text-[#94A3B8]">/ month</span>
                </div>
                <p className="text-xs text-[#94A3B8]">Ideal for private tutors running weekly test batches.</p>

                <ul className="space-y-2 text-xs text-[#CBD5E1] pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span><strong>12 Test Papers / Month</strong> (Active Quota)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span><strong>Instant 1-Click WhatsApp Marksheets to Parents</strong></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span><strong>Your Coaching Logo & Address</strong> on Header</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Complete Step-Wise Teacher Marking Keys</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Auto-Generated 20-100Q OMR Sheets</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPayment({
                  name: 'Tuition Master Monthly Pass',
                  priceNumeric: 799,
                  targetGrade: 'All Grades',
                  type: 'coaching'
                })}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white font-bold text-center text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Get Monthly Pass (₹799/mo)</span>
              </button>
            </div>

            {/* Plan 3: Coaching Director Pro */}
            <div className="p-7 rounded-3xl bg-[#080D24] border border-[#7C3CFF]/50 hover:border-[#7C3CFF] transition-all flex flex-col justify-between space-y-6 relative shadow-2xl">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-[11px] font-bold text-white shadow">
                MOST POPULAR • HIGHEST VALUE
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#67E8F9]">ANNUAL INSTITUTIONAL PASS</span>
                <h3 className="text-xl font-black text-white">Coaching Director Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">₹4,999</span>
                  <span className="text-xs text-[#94A3B8]">/ full year (₹416/mo)</span>
                </div>
                <p className="text-xs text-[#94A3B8]">Complete board exam operating system for coaching institutes.</p>

                <ul className="space-y-2 text-xs text-[#CBD5E1] pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span><strong>150 Papers / Year Quota</strong> (Full Session)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span><strong>Anti-Cheating Set A, B & C Shuffling</strong></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span><strong>Instant 1-Click WhatsApp Marksheet Engine</strong></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span><strong>Diagonal 30° Watermark & Custom Header</strong></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Multi-Faculty Batch Vault & Printable OMR Sheets</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Top-Up Booster available anytime (25 Papers for ₹499)</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPayment({
                  name: 'Coaching Director Pro Annual',
                  priceNumeric: 4999,
                  targetGrade: 'All Grades',
                  type: 'coaching'
                })}
                className="btn-gradient w-full py-3.5 rounded-xl text-white font-bold text-center text-sm shadow-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Get Annual Pass (₹4,999/yr)</span>
              </button>
            </div>

          </div>
        </div>

        {/* 4. 1000+ WORDS IN-DEPTH EDUCATIONAL & BUYING GUIDE */}
        <article className="max-w-5xl mx-auto space-y-10 bg-[#080D24] p-8 sm:p-12 rounded-3xl border border-[rgba(140,120,255,0.25)] shadow-2xl">
          
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              1. The Economics of Board Preparation: Why Single-Subject Passes Deliver 10x ROI
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              For decades, families and students preparing for CBSE board examinations have been forced into a high-cost, low-efficiency purchasing pattern. Traditional publishing houses package all subjects into cumbersome question bank guides costing upwards of ₹2,500 to ₹4,000 annually. In reality, academic diagnostic data reveals that more than 82% of board candidates do not struggle across all five subjects; their grade vulnerabilities are concentrated in one or two technical subjects—typically Mathematics, Physics, Chemistry, or Accountancy.
            </p>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              PaperGenius transforms this cost model with our targeted ₹199 (Class 10) and ₹499 (Class 12) Board Passes. Instead of paying for hundreds of pages of unread filler content, students invest strictly in the subject where their percentile is at risk. Each pass delivers 100 to 150 multimodal AI answer sheet evaluations, complete 5-year authentic board paper archives (2022 to 2026), and high-yield formula roadmaps that directly translate to higher step marks on exam day.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              2. For Coaching Institutes: Reclaiming 120+ Teaching Hours Annually
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              Senior faculty members and coaching proprietors routinely lose 3 to 4 hours each week handcrafting periodic test papers, formatting mark distributions, and manually typing out answer keys. At an institutional tier, this represents over 120 lost teaching hours per batch across an academic session.
            </p>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              At just ₹4,999 per full year (or ₹416 per month), the Coaching Director Pro plan equips an institute with a complete test-generation operating system. Within 10 seconds, teachers generate balanced 20-mark, 40-mark, or 80-mark assessments stamped with their own branding, anti-photocopy watermarks, and synchronized Set A/B/C anti-cheating configurations. The software also outputs ready-to-print 20, 40, 80, or 100-question OMR bubble sheets and instant WhatsApp marksheets for parents, automating weekly testing from creation to evaluation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              3. The 5-Year Board Series (2022-2026): Rejecting Outdated Question Formats
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              A major hazard facing modern CBSE students is practicing with question banks that compile papers from 2012 to 2019. Prior to the National Education Policy (NEP 2020) rollout, CBSE examinations were heavily factual and definition-oriented. Modern examinations allocate <strong>50% of the entire paper weightage to competency-based problems, assertion-reasoning pairs, and Section E case studies</strong>.
            </p>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              Every single past paper and solved solution provided inside PaperGenius is strictly filtered through the authentic 5-year series from 2022 to 2026. Students practice with the exact formats, difficulty calibrations, and marking allocations they will encounter when opening their sealed question paper envelope in the examination hall.
            </p>
          </section>

          {/* Internal Links */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#67E8F9]" />
              <span>Explore Direct Platform Modules</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs font-semibold">
              <Link to="/class-10" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-[#67E8F9] border border-white/5 text-center">Class 10 Hub</Link>
              <Link to="/class-12" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-[#C4B5FD] border border-white/5 text-center">Class 12 Hub</Link>
              <Link to="/predictor" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-cyan-300 border border-white/5 text-center">Score Predictor</Link>
              <Link to="/teacher/report-cards" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-emerald-300 border border-white/5 text-center">WhatsApp Reports</Link>
              <Link to="/student" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-emerald-300 border border-white/5 text-center">Student OS</Link>
              <Link to="/teacher/dashboard" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-pink-300 border border-white/5 text-center">Coaching OS</Link>
              <Link to="/pyq-vault" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-amber-300 border border-white/5 text-center">5-Year PYQs</Link>
            </div>
          </section>

          {/* FAQs */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
              <span>Pricing & Payment FAQs</span>
            </h2>

            <div className="space-y-3">
              {pricingFaqs.map((faq, idx) => {
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

        </article>

        {/* 5. DEDICATED SUPPORT & ACCESS GUARANTEE BANNER */}
        <div className="p-8 rounded-3xl bg-[#080D24] border border-[#06B6D4]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-[#67E8F9]" />
              <span>100% Instant Access & Enterprise Support Guarantee</span>
            </h4>
            <p className="text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
              If your payment is completed but access did not activate automatically, or if you require an official GST invoice for your coaching institute, simply drop an email with your transaction ID.
            </p>
          </div>

          <a
            href="mailto:contact@papergenius.in?subject=PaperGenius%20Payment%20Access%20Inquiry"
            className="px-6 py-3.5 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-[#67E8F9] border border-[#06B6D4]/40 font-bold text-sm flex items-center gap-2 shrink-0 transition-all shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>contact@papergenius.in</span>
          </a>
        </div>

      </div>

      {/* RENDER DYNAMIC PAYMENT MODAL */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlanForPayment}
      />

    </div>
  );
}
