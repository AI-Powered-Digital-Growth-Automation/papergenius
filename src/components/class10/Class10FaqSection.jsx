import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Class10FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      subject: 'Science (086)',
      q: 'How are marks deducted for chemical reactions and ray diagrams in Class 10 Science?',
      a: 'CBSE head-examiner guidelines mandate that all chemical equations must be balanced, and reaction conditions (temperature, sunlight, catalysts) must be written above the reaction arrow. In Physics, ray diagrams must have arrowheads showing the path of light; omission of directional arrows results in an immediate 0.5-mark penalty even if the image position is correct.'
    },
    {
      subject: 'Science (086)',
      q: 'Is it necessary to write complete sentences in Science Section A MCQs and Assertion-Reasoning?',
      a: 'In Section A, write both the option letter and the exact corresponding phrase (e.g., Option (B) Concave Mirror). For Assertion-Reasoning, clearly state whether Reason is the correct explanation for Assertion to avoid any examiner ambiguity.'
    },
    {
      subject: 'Mathematics (041 / 241)',
      q: 'What is the exact difference in difficulty between Mathematics Standard (041) and Basic (241)?',
      a: 'Mathematics Basic questions directly mirror standard NCERT textbook examples and end-of-chapter exercises. Mathematics Standard requires deeper conceptual application, including NCERT Exemplar problems, HOTS questions, and Section E multi-step real-world case studies.'
    },
    {
      subject: 'Mathematics (041 / 241)',
      q: 'If my final numerical calculation in Maths is wrong, do I lose all 5 marks?',
      a: 'No. CBSE evaluates on strict step-marking. Stating the formula awards 0.5 to 1 mark; correct step substitutions earn intermediate marks. You only forfeit the final 0.5 to 1 mark for the erroneous arithmetic conclusion, provided previous steps are algebraically sound.'
    },
    {
      subject: 'Social Science (087)',
      q: 'How should long answers (3-mark and 5-mark) be structured in Class 10 SST?',
      a: 'Always write answers in distinct numbered bullet points with bold sub-headings. For a 3-mark question, provide exactly 3 well-explained points; for a 5-mark question, provide 5 analytical points. Never write continuous monolithic paragraphs, as examiners look for specific key terms and dates.'
    },
    {
      subject: 'Social Science (087)',
      q: 'How are map-pointing questions evaluated in Class 10 Social Science?',
      a: 'Map work carries 5 fixed marks (History: 2 marks, Geography: 3 marks). Identification must be pinpoint accurate with clean labels. PaperGenius includes verified map guarantee sheets covering all 2026 syllabus locations (Dandi, Champaran, major dams, iron & steel plants).'
    },
    {
      subject: 'English Lit. (184)',
      q: 'How can students secure full marks in the English Analytical Paragraph and Formal Letter?',
      a: 'Follow the prescribed CBSE format strictly (sender address, date, receiver designation, subject, salutation, 3-paragraph body, sign-off). The analytical paragraph requires comparison verbs (e.g., in contrast, peaked at, whereas) and data citation without personal opinion.'
    },
    {
      subject: 'English Lit. (184)',
      q: 'In Literature extract-based questions, do examiners penalize minor spelling errors?',
      a: 'Minor spelling slips that do not alter the literary meaning are tolerated, but character names and author references must be spelled correctly. Answers should directly quote or paraphrase key textual evidence from First Flight and Footprints Without Feet.'
    },
    {
      subject: 'General Board Strategy',
      q: 'How many years of previous year question papers (PYQs) should a Class 10 student solve?',
      a: 'Solving the last 5 academic years (2022 to 2026) is mandatory because over 50% of the blueprint was revised toward competency-based questions under NEP 2020. PaperGenius provides all sets (Delhi + Outside Delhi) in organized 1-click ZIP bundles.'
    },
    {
      subject: 'PaperGenius AI',
      q: 'How does PaperGenius AI evaluate student handwritten copies?',
      a: 'Our multimodal AI reads handwritten answer photos, transcribes text and math equations, matches steps against official head-examiner marking schemes, flags missing SI units or unboxed formulas, and gives actionable advice to achieve 100/100 presentation standards.'
    }
  ];

  return (
    <section className="space-y-8">
      {/* Centered Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          Subject-Wise Master Guide
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          10 Frequently Asked Questions (Class 10 Board Exam)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Direct expert answers covering official marking schemes across Science, Mathematics, Social Science, and English.
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
