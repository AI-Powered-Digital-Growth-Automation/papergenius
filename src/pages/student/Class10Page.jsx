import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Sparkles, BookOpen, Award, FileText, ArrowRight, 
  HelpCircle, ShieldCheck, Flame, Download, Compass, Zap, Target
} from 'lucide-react';

export default function Class10Page() {
  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 pt-8 px-4 sm:px-6 lg:px-8">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-6xl mx-auto mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-xs sm:text-sm font-bold text-[#67E8F9]">
          <Sparkles className="w-4 h-4 text-[#67E8F9]" />
          <span>Official CBSE Class 10 Board Exam Portal 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          CBSE Class 10 Board Exam Preparation Hub
        </h1>

        <p className="text-base sm:text-xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
          Master Science, Mathematics Standard, Basic, Social Science, and English with authentic 10-year chapter-wise solved question banks, official marking schemes, and AI-powered step-marking answer sheet evaluation.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/student"
            className="btn-gradient px-8 py-4 rounded-2xl text-base sm:text-lg font-bold text-white shadow-xl hover:shadow-[#06B6D4]/30 flex items-center gap-2"
          >
            <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            <span>Open Student Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/pyq-vault"
            className="px-8 py-4 rounded-2xl bg-[#0C1330] hover:bg-[#111A3D] text-[#67E8F9] border border-[#06B6D4]/40 text-base sm:text-lg font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>Download 2022-2026 Papers</span>
          </Link>
        </div>
      </div>

      {/* 2. SUBJECT-WISE BREAKDOWN CARDS */}
      <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Science (086)',
            marks: '80 Theory + 20 Internal',
            desc: 'Physics optics & electricity, Chemistry reactions & carbon, Biology life processes & genetics.',
            link: '/student'
          },
          {
            title: 'Mathematics (041 / 241)',
            marks: 'Standard & Basic Formats',
            desc: 'Triangles proofs, quadratic equations, trigonometry identities, surface areas and statistics.',
            link: '/student'
          },
          {
            title: 'Social Science (087)',
            marks: 'History, Civics, Geo, Eco',
            desc: 'Nationalism in Europe & India, federalism, manufacturing industries, map work guarantees.',
            link: '/student'
          },
          {
            title: 'English Lit. (184)',
            marks: 'Reading, Writing & Literature',
            desc: 'Analytical paragraphs, formal letters, First Flight and Footprints without Feet step answers.',
            link: '/student'
          }
        ].map((sub, i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#080D24] border border-white/10 hover:border-[#06B6D4]/40 transition-all space-y-3 flex flex-col justify-between shadow-lg">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#67E8F9] bg-[#06B6D4]/15 px-2.5 py-1 rounded">
                {sub.marks}
              </span>
              <h3 className="text-xl font-bold text-white">{sub.title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{sub.desc}</p>
            </div>
            <Link to={sub.link} className="text-xs font-bold text-[#C4B5FD] hover:text-white flex items-center gap-1 pt-2">
              <span>Access Solved Papers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {/* 3. 1000+ WORDS IN-DEPTH EDUCATIONAL SEO CONTENT & GUIDE */}
      <article className="max-w-5xl mx-auto space-y-10 bg-[#080D24] p-8 sm:p-12 rounded-3xl border border-[rgba(140,120,255,0.25)] shadow-2xl">
        
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            1. Understanding the Latest CBSE Class 10 Board Exam Pattern (2025 - 2026)
          </h2>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            The Central Board of Secondary Education (CBSE) has restructured the Class 10 examination under the National Education Policy (NEP). Rote learning and mere memorization no longer yield top scores. Today, at least <strong>50% of the questions are competency-based</strong>, designed to evaluate application, real-world case analysis, and high-order thinking skills (HOTS).
          </p>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            Students preparing for Class 10 board exams must understand the exact 80-mark blueprint. The question paper is divided into five distinct sections: Section A contains 20 Multiple Choice Questions (including Assertion-Reasoning); Section B features 6 Short Answer questions of 2 marks each; Section C has 7 Short Answer questions of 3 marks each; Section D comprises 3 Long Answer questions of 5 marks each; and Section E holds 3 Case-Based integrated assessment units carrying 4 marks each. Knowing this structure gives students a strategic advantage during the 15-minute question paper reading slot from 10:15 AM to 10:30 AM.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            2. Official CBSE Step-Marking Scheme: How Examiners Award Marks
          </h2>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            One of the greatest misconceptions among students is that only the final answer matters. In official CBSE evaluations, every single step carries allocated weightage:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1.5">
              <h4 className="font-bold text-[#67E8F9] text-base">Step 1: Formula & Given Data</h4>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Stating the initial formula (e.g. 1/f = 1/v - 1/u) and writing given parameters with signs awards 0.5 to 1 full mark independently.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1.5">
              <h4 className="font-bold text-[#67E8F9] text-base">Step 2: Substitution & Logic</h4>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Accurate mathematical substitution without skipping lines secures step marks even if an arithmetic slip happens later.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1.5">
              <h4 className="font-bold text-[#67E8F9] text-base">Step 3: Units & Conclusions</h4>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Never omit SI units (Joules, Amperes, cm²). Forgetting units leads to a direct deduction of 0.5 marks across Science and Maths.
              </p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            With PaperGenius's <Link to="/student" className="text-[#67E8F9] underline font-semibold">AI Answer Sheet Evaluator</Link>, students can upload photos of their handwritten notebooks to discover exactly where step marks are lost according to official CBSE marking guidelines before appearing in the board hall.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            3. Subject-Specific Preparation Strategy for 95%+ in Class 10
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            <div>
              <strong className="text-white text-base block mb-1">Class 10 Science (Physics, Chemistry, Biology):</strong>
              Focus heavily on balanced chemical equations in Chapters 1 to 4. Ensure conditions such as sunlight, heat, and catalyst names are written above reaction arrows. In Physics, practice ray diagrams for concave and convex mirrors using a sharp pencil and ruler; directional arrows are strictly mandatory. For Biology, master labeled diagrams of the human heart, nephron, and reflex arc.
            </div>
            <div>
              <strong className="text-white text-base block mb-1">Class 10 Mathematics Standard vs Basic:</strong>
              Basic Mathematics students should solve every single NCERT exercise and example twice. Standard Mathematics candidates must also complete NCERT Exemplar and 10-year past papers available in our <Link to="/pyq-vault" className="text-[#C4B5FD] underline font-semibold">CBSE PYQ Vault</Link>. High-weightage chapters include Triangles (Thales Theorem), Quadratic Equations, Surface Areas and Volumes, and Trigonometric Identities.
            </div>
            <div>
              <strong className="text-white text-base block mb-1">Class 10 Social Science & English:</strong>
              Social Science demands structured sub-headings. Avoid continuous paragraph essays; write 3 numbered points for 3-mark questions and 5 numbered points for 5-mark questions. In English Language and Literature, practice formal letter formats and analytical paragraphs based on data charts to score full marks in the writing section.
            </div>
          </div>
        </section>

        {/* Section 4: Internal Linking Grid */}
        <section className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#67E8F9]" />
            <span>Essential CBSE Board Navigation & Resources</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs sm:text-sm">
            <Link to="/student" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-[#67E8F9] border border-white/5 font-semibold flex items-center justify-between">
              <span>Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pyq-vault" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-[#C4B5FD] border border-white/5 font-semibold flex items-center justify-between">
              <span>10-Year PYQ Vault</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/class-12" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-white border border-white/5 font-semibold flex items-center justify-between">
              <span>Class 12 Board Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pricing" className="p-3 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-emerald-300 border border-white/5 font-semibold flex items-center justify-between">
              <span>Board Pass Plans (₹199)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section 5: SEO FAQs */}
        <section className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-yellow-400" />
            <span>Frequently Asked Questions (CBSE Class 10 Board Exam)</span>
          </h2>
          <div className="space-y-3">
            {[
              {
                q: 'How many years of previous year question papers should I solve for Class 10?',
                a: 'Solving the last 5 years of authentic board question papers (2022 to 2026) gives you 90% syllabus coverage. CBSE frequently repeats core question formats and numerical frameworks.'
              },
              {
                q: 'Where can I download authentic CBSE Class 10 papers with marking schemes?',
                a: 'You can download complete 5-year official ZIP bundles directly from our CBSE PYQ Vault and verify against official CBSE academic marking schemes.'
              },
              {
                q: 'How does PaperGenius AI evaluate student answer sheets?',
                a: 'Our multimodal Gemini AI vision model scans your handwritten answer photograph, matches your derivation or numerical with the official CBSE step rubric, calculates exact step marks, and highlights missing keywords or units.'
              },
              {
                q: 'Is NCERT sufficient to score 95% in Class 10 Board exams?',
                a: 'Yes, NCERT textbooks along with NCERT Exemplar and past board papers are more than sufficient. Every single question in the CBSE board exam is framed strictly within the NCERT syllabus boundaries.'
              }
            ].map((faq, idx) => (
              <details key={idx} className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-2 cursor-pointer group">
                <summary className="font-bold text-white text-sm sm:text-base group-hover:text-[#67E8F9]">
                  {faq.q}
                </summary>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed pt-2">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

      </article>

    </div>
  );
}
