import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, 
  Printer, Layers, FileText, Award, HelpCircle, Compass, 
  Zap, Clock, Users, ChevronDown, ChevronUp, Star
} from 'lucide-react';

export default function TeacherPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const teacherFaqs = [
    {
      q: "How does PaperGenius create CBSE-standard test papers in under 10 seconds?",
      a: "Our system combines official CBSE curriculum blueprints with Google Gemini 3.8 Flash AI. When you select a class, subject, chapter, and marks (20M, 40M, or 80M), the AI generates strictly balanced questions conforming to NEP 50% competency guidelines, including MCQs, assertion-reasoning, numericals, and Section E case studies."
    },
    {
      q: "How does the Anti-Cheating Set A, B, and C shuffling work?",
      a: "For dense coaching classrooms, PaperGenius shuffles both question sequences and multiple-choice options across Sets A, B, and C in parallel. The conceptual difficulty and marks allocation remain identical across all sets, making peer copying impossible during periodic assessments."
    },
    {
      q: "Can I print test papers with my institute's custom branding?",
      a: "Yes. Under the Tuition Master and Coaching Director Pro plans, your institute's name, sub-header, batch title, and contact number appear in the official exam header. A 30-degree diagonal anti-photocopy watermark is also stamped across the pages to protect your test materials."
    },
    {
      q: "Does PaperGenius provide answer keys and teacher marking rubrics?",
      a: "Every generated paper comes with an official CBSE-style step-by-step marking scheme. Sub-points show exactly where to award 0.5M, 1M, or 2M marks, ensuring transparent and consistent evaluation by your checking staff."
    },
    {
      q: "What types of OMR response sheets can I generate?",
      a: "You can generate printable single-page OMR bubble sheets formatted for 20, 40, 80, or 100 questions. Each sheet includes a standard CBSE candidate roll number grid, candidate signature box, and invigilator signature line."
    },
    {
      q: "Which subjects are supported for question paper generation?",
      a: "We support all primary CBSE subjects across Class 10 (Science, Mathematics Standard, Mathematics Basic, Social Science, English Literature, Hindi Course A) and Class 12 (Physics, Chemistry, Mathematics, Biology, Computer Science, Informatics Practices, Accountancy, Business Studies, Economics, Applied Mathematics, English Core, Physical Education)."
    },
    {
      q: "Can multiple faculty members use a single coaching subscription?",
      a: "Yes. The Coaching Director Pro plan is designed for multi-faculty coaching centers. Teachers across different batches can generate and store papers under the central institute account."
    },
    {
      q: "How does the printing engine ensure clean A4 output without web navigation clutter?",
      a: "Our platform incorporates dedicated print-specific CSS (@media print). When you click Print or Save to PDF, all web navigation, buttons, and sidebars are automatically hidden, leaving only the pure, high-DPI A4 exam canvas."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 pt-8 px-4 sm:px-6 lg:px-8 text-base">
      
      {/* 1. HERO HEADER */}
      <div className="max-w-6xl mx-auto mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 text-xs sm:text-sm font-bold text-[#C4B5FD]">
          <Building2 className="w-4 h-4 text-[#C4B5FD]" />
          <span>The Institutional CBSE Exam OS for Coaching Centers & Tutors</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Create Board Exam Papers in 10 Seconds.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5EE7FF] to-[#8C78FF]">
            Branded with Your Institute Logo.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
          Stop spending 3 hours every week drafting test papers. Auto-generate CBSE-blueprint assessments with anti-cheat Set A/B/C shuffling, custom 30° watermarks, step-wise teacher marking schemes, and printable 20-100Q OMR bubble sheets.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/teacher/create-paper"
            className="btn-gradient px-8 py-4 rounded-2xl text-base sm:text-lg font-bold text-white shadow-xl hover:shadow-[#06B6D4]/30 flex items-center gap-2"
          >
            <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            <span>Launch AI Paper Generator Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/teacher/dashboard"
            className="px-8 py-4 rounded-2xl bg-[#0C1330] hover:bg-[#111A3D] text-[#67E8F9] border border-[#06B6D4]/40 text-base sm:text-lg font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Building2 className="w-5 h-5" />
            <span>Open Coaching Dashboard</span>
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-[#94A3B8]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Set A/B/C Anti-Cheat Shuffling</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Institute Watermark & Contact Header</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>20 to 100Q OMR Sheet Generator</span>
          </span>
        </div>
      </div>

      {/* 2. 3 PRESET CARDS: UNIT TEST, PERIODIC, PRE-BOARD */}
      <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Unit Test (20 Marks)',
            time: '45 Minutes',
            desc: 'Quick weekly chapter check. 5 MCQs, 3 Short Answer questions, and 1 Long application numerical.',
            badge: 'Weekly Batch'
          },
          {
            title: 'Periodic Test (40 Marks)',
            time: '90 Minutes',
            desc: 'Multi-chapter assessment. 10 MCQs, 5 Short Answer, 2 Long Answer, and 1 integrated Case Study.',
            badge: 'Monthly Assessment'
          },
          {
            title: 'Full Pre-Board (80 Marks)',
            time: '3 Hours (180 Mins)',
            desc: 'Authentic board simulation. Section A to E complete structure aligned with 50% NEP competency pattern.',
            badge: 'Final Board Mock'
          }
        ].map((p, idx) => (
          <div key={idx} className="p-7 rounded-3xl bg-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded bg-[#7C3CFF]/20 text-[#C4B5FD] text-xs font-mono font-bold">
                {p.badge}
              </span>
              <h3 className="text-xl font-bold text-white">{p.title}</h3>
              <div className="text-xs font-mono text-[#67E8F9] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Duration: {p.time}</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{p.desc}</p>
            </div>
            <Link
              to="/teacher/create-paper"
              className="btn-gradient w-full py-2.5 rounded-xl font-bold text-white text-center text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow"
            >
              <span>Generate This Format</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* 3. 1000+ WORDS IN-DEPTH EDUCATIONAL SEO CONTENT & AUTHORITY GUIDE */}
      <article className="max-w-5xl mx-auto space-y-10 bg-[#080D24] p-8 sm:p-12 rounded-3xl border border-[rgba(140,120,255,0.25)] shadow-2xl">
        
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            1. The Testing Dilemma for Modern Coaching Institutes: Why Manual Paper Setting is Obsolete
          </h2>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            In competitive coaching hubs across India, test series are the primary differentiator that determines student retention and board pass percentages. However, running a rigorous weekly assessment cycle places immense operational pressure on teaching staff. Manually assembling a 40-mark or 80-mark test paper requires selecting questions from multiple reference guides, ensuring balanced mark distributions, drawing custom diagrams, and formatting a step-wise answer key for evaluators.
          </p>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            Faculty members spend between 2 and 4 hours per paper on manual drafting. When multiplied across three weekly batches over an academic year, a coaching center loses over 120 hours of valuable instructional time to administrative formatting. PaperGenius eliminates this bottleneck completely. By combining official CBSE blueprints with high-speed AI, teachers generate complete, print-ready question papers in under 10 seconds.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            2. Anti-Cheating Technology: Parallel Set A, B, and C Shuffling
          </h2>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            Classroom seating density in coaching institutes often makes invigilation difficult. When adjacent students receive identical test papers, answer sharing on multiple-choice and short-answer questions skews diagnostic results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1.5">
              <h4 className="font-bold text-[#C4B5FD] text-base">Question Shuffling</h4>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Questions are re-ordered across Sets A, B, and C so that Question 1 on Set A appears as Question 5 on Set B, preventing direct peer copying.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1.5">
              <h4 className="font-bold text-[#67E8F9] text-base">Option Permutation</h4>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Multiple-choice option letters (A, B, C, D) are scrambled while preserving the correct conceptual key for each student.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1.5">
              <h4 className="font-bold text-emerald-400 text-base">Difficulty Parity</h4>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Unlike random question generators, PaperGenius ensures that all sets maintain identical chapter weightage and difficulty calibrations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            3. Protecting Institute Intellectual Property: Custom Branding & Anti-Copy Watermarks
          </h2>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            Coaching centers invest years developing proprietary question curation strategies. When test papers are printed without branding, students frequently share xerox copies with competing institutes.
          </p>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            PaperGenius embeds complete institutional branding on every generated page:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-[#CBD5E1] pl-2">
            <li><strong>Official Header:</strong> Institute name, sub-header (e.g., "Premier Medical & Engineering Foundation"), batch name, and contact details.</li>
            <li><strong>30-Degree Diagonal Watermark:</strong> A high-transparency diagonal watermark with your coaching name rendered across the background to deter unauthorized photocopying.</li>
            <li><strong>Dynamic QR Verification:</strong> Students and parents can scan a generated QR code to verify solutions online without requiring teachers to distribute separate printed keys.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            4. Streamlined Evaluation: Printable OMR Sheets (20 to 100 Questions)
          </h2>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            Objective testing is essential for building student speed ahead of board MCQs and competitive entrance exams. PaperGenius includes an integrated OMR sheet generator capable of printing single-page bubble answer sheets formatted for 20, 40, 80, or 100 questions.
          </p>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            Each sheet includes a standardized CBSE candidate roll number grid, candidate name line, subject code, and invigilator signature box. The layout is optimized for standard desktop printers, ensuring clean A4 margins with zero extra blank pages.
          </p>
        </section>

        {/* Section 5: Internal Links */}
        <section className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#67E8F9]" />
            <span>Coaching Tools & Navigation</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs sm:text-sm font-semibold">
            <Link to="/teacher/create-paper" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-[#67E8F9] border border-white/5 text-center">
              Paper Studio
            </Link>
            <Link to="/teacher/dashboard" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-[#C4B5FD] border border-white/5 text-center">
              Coaching OS
            </Link>
            <Link to="/pricing" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-emerald-300 border border-white/5 text-center">
              Coaching Plans
            </Link>
            <Link to="/class-10" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-amber-300 border border-white/5 text-center">
              Class 10 Hub
            </Link>
            <Link to="/class-12" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-white border border-white/5 text-center">
              Class 12 Hub
            </Link>
          </div>
        </section>

        {/* Section 6: FAQs */}
        <section className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-yellow-400" />
            <span>Coaching Center & Paper Setting FAQs</span>
          </h2>

          <div className="space-y-3">
            {teacherFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0C1330] border border-white/5 overflow-hidden transition-all"
                >
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

    </div>
  );
}
