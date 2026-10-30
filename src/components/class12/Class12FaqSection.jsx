import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Class12FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      subject: 'Physics (042)',
      q: 'How do head examiners evaluate 5-mark Physics derivations like AC Generator and Prism Formula?',
      a: 'A 5-mark derivation is strictly split into: 1 mark for a properly labeled neat diagram (with ray/magnetic field arrows), 1 mark for stating the core principle/law, 2.5 marks for intermediate algebraic steps without skipping logic, and 0.5 mark for the final boxed formula with standard SI notation.'
    },
    {
      subject: 'Chemistry (043)',
      q: 'Are mechanisms mandatory for all 32 Organic Chemistry named reactions in Class 12?',
      a: 'No. CBSE only tests mechanisms for specific syllabus-marked reactions: Hydration of ethene, Dehydration of ethanol to ethene/ethoxyethane, and Nucleophilic addition to aldehydes/ketones. For all other named reactions (Reimer-Tiemann, Kolbe, Aldol), balanced equations with reagents and conditions suffice.'
    },
    {
      subject: 'Mathematics (041)',
      q: 'In Class 12 Calculus, if the integration constant (+C) is forgotten, how many marks are lost?',
      a: 'Omitting the arbitrary integration constant (+C) in indefinite integrals results in a mandatory 0.5-mark deduction by the examiner, even if the integrand substitution and anti-derivative are 100% accurate.'
    },
    {
      subject: 'Applied Mathematics (241)',
      q: 'How is Applied Mathematics different from Core Mathematics in board scoring?',
      a: 'Applied Mathematics (241) focuses heavily on Financial Mathematics (perpetuity, sinking funds, EMI, CAGR), Linear Programming, and Inferential Statistics. Step marks are awarded strictly for formula declaration and accurate financial tables.'
    },
    {
      subject: 'Biology (044)',
      q: 'Do diagrams in Class 12 Biology need color or shading to secure full marks?',
      a: 'Never use colored pens or artistic shading. CBSE examiners require clean, proportionate pencil diagrams with horizontal, non-overlapping label pointer lines. All labels must be spelled correctly according to official NCERT terminology.'
    },
    {
      subject: 'Computer Science (083)',
      q: 'In Python programming questions, does incorrect indentation cost full marks?',
      a: 'Python syntax relies fundamentally on indentation. While minor indentation slips in Section B may only lose 0.5 marks, syntax errors that alter the logic block or loop structure will cost up to 1.5 marks. Always leave consistent 4-space indents.'
    },
    {
      subject: 'Informatics Practices (065)',
      q: 'How are SQL queries and Pandas DataFrame questions evaluated in Class 12 IP?',
      a: 'In SQL questions, keywords like SELECT, WHERE, GROUP BY, and HAVING are case-insensitive, but clause sequencing must be correct. In Pandas, dataframe slicing and matplotlib plot commands earn marks for precise function parameter usage.'
    },
    {
      subject: 'Accountancy (055)',
      q: 'In Partnership and Share Capital questions, do examiners award marks if the Balance Sheet does not tally?',
      a: 'Yes! CBSE Accountancy is graded on working notes and journal entry steps. Stating journal entries with proper narration awards independent marks. If an arithmetic error causes the balance sheet to fail to tally, you only forfeit 0.5 to 1 mark.'
    },
    {
      subject: 'Business Studies (054)',
      q: 'How must case study questions be answered in Class 12 Business Studies?',
      a: 'Always adopt the 3-tier answering format: 1. Identification of the concept/principle, 2. Quoting the exact line from the case paragraph within quotation marks, and 3. Explanation of the concept in 2-3 structured points.'
    },
    {
      subject: 'Economics (030)',
      q: 'In Macroeconomics, are numerical steps in National Income and Multiplier awarded partial marks?',
      a: 'Yes. Formula statement (e.g., Value Added Method or K = 1/(1-MPC)) carries 1 mark. Intermediate calculation earns 1.5 marks. Omitting currency units (e.g., ₹ in Crores) incurs a 0.5-mark deduction.'
    },
    {
      subject: 'History (027)',
      q: 'How should 8-mark long essay questions be presented in Class 12 History?',
      a: 'Structure long answers with an Introduction (2-3 lines), 5-6 distinct thematic sub-headings with supporting historical evidence/inscriptions, and a Conclusion summarizing historical significance. Avoid unstructured narrative blocks.'
    },
    {
      subject: 'Geography (029)',
      q: 'How are map work and data-based questions evaluated in Class 12 Geography?',
      a: 'Map work carries 5 marks for India and 5 marks for World. Identification must be precise using standard symbols (ports, airports, mineral belts). In data questions, citing exact percentages from the given table is mandatory.'
    },
    {
      subject: 'Political Science (028)',
      q: 'What is the required strategy for cartoon-based and passage-based questions in Political Science?',
      a: 'Passage questions demand concise, objective responses directly referencing the extract. In cartoon questions, first identify the political event or personality depicted, followed by an explanation of the underlying political satire or crisis.'
    },
    {
      subject: 'Psychology (037)',
      q: 'How are psychological disorders and therapeutic approaches graded in Class 12 Psychology?',
      a: 'Examiners look for exact DSM-5 diagnostic criteria and structured technical terms (e.g., negative triad, systematic desensitization). Definitions must match NCERT phrasing without colloquial approximations.'
    },
    {
      subject: 'English Core (301)',
      q: 'How can students secure full marks in the Reading Comprehension and Writing Section of English Core?',
      a: 'In Section A, answer with precise textual quotes without beating around the bush. In Section B (Notice, Invitations, Letters, Articles), memorize the official CBSE layout boxes; formatting errors lose 1 mark instantly.'
    },
    {
      subject: 'Physical Education (048)',
      q: 'How are tournament fixtures (Knock-out & League) evaluated in Physical Education?',
      a: 'Fixtures must show complete mathematical calculations: total matches [N - 1], number of teams in upper/lower half, and exact Bye calculations [2^n - N]. A clean, ruler-drawn bracket fixture earns full 5/5 marks.'
    }
  ];

  return (
    <section className="space-y-8">
      {/* Centered Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          Complete 16-Subject Master Archive
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          16 Frequently Asked Questions (Class 12 Board Exam)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Direct expert answers covering official head-examiner marking rubrics for every single Class 12 core subject.
        </p>
      </div>

      <div className="space-y-3.5 max-w-4xl mx-auto">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-[#080D24] border border-white/10 overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="space-y-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#06B6D4] font-bold uppercase">
                  {faq.subject}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-white leading-snug">{faq.q}</h3>
              </div>
              {openIdx === idx ? (
                <ChevronUp className="w-5 h-5 text-[#06B6D4] shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>
            {openIdx === idx && (
              <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/5 pt-4 font-normal">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
