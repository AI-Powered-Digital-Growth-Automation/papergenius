import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function CoachingFaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      badge: 'CBSE AI Architecture',
      q: 'How does PaperGenius generate CBSE-standard question papers in under 10 seconds?',
      a: 'Our engine pairs official CBSE curriculum blueprints with Google Gemini 3.8 Flash AI. When you select class, subject, chapter, and marks (20M, 40M, or 80M), the AI generates strictly balanced papers conforming to NEP 50% competency guidelines, including MCQs, Assertion-Reasoning, numericals, and Section E case studies.'
    },
    {
      badge: 'Anti-Cheating Shuffling',
      q: 'How does Set A, B, and C anti-cheating shuffling work in high-density coaching rooms?',
      a: 'For tight classroom seating, PaperGenius generates three parallel sets where MCQs and question sequences are scrambled, while keeping identical difficulty parity and marks allocation. Students sitting adjacent to each other cannot copy answers, ensuring authentic evaluation.'
    },
    {
      badge: 'Custom Branding & Watermark',
      q: 'Can coaching institutes print their own brand logo, address, and anti-copy watermark?',
      a: 'Yes. Under Tuition Master (₹799/mo) and Coaching Director Pro (₹4,999/yr), your institute name, branch subtitle, director name, and contact phone appear on the header. A 30-degree diagonal anti-photocopy watermark is also stamped across the page background to protect your proprietary test content.'
    },
    {
      badge: 'Teacher Marking Keys',
      q: 'Does PaperGenius provide step-wise answer keys and marking rubrics for checking staff?',
      a: 'Every generated test paper includes an authoritative CBSE-style marking scheme. Marks are split step-by-step (formula identification, intermediate algebraic calculation, and final value with SI units) so your faculty and checking staff can grade transparently and uniformly.'
    },
    {
      badge: 'Printable OMR Studio',
      q: 'What types of OMR response sheets can coaching centers print?',
      a: 'You can generate printable single-page OMR bubble sheets formatted for 20, 40, 80, or 100 questions. Each sheet includes standard CBSE candidate roll number grids, candidate signature boxes, and invigilator signature lines for rapid Sunday testing.'
    },
    {
      badge: 'WhatsApp Parent Reporting',
      q: 'How does the Instant WhatsApp Marksheet Generator improve coaching parent retention?',
      a: 'Instead of spending hours manually typing SMS or calling parents, faculty enter student marks and hit 1-click share. A formatted, branded scorecard opens directly in WhatsApp for instant delivery to parents, significantly increasing institutional trust and admission retention.'
    }
  ];

  return (
    <section className="space-y-8">
      {/* Centered Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
          Coaching Knowledge Hub
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          6 Frequently Asked Questions (Coaching & CBSE Exam OS)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Clear answers on institutional paper generation, anti-cheating shuffling, and automated parent communication.
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
                <span className="inline-block px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 font-bold uppercase">
                  {faq.badge}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-white leading-snug">{faq.q}</h3>
              </div>
              {openIdx === idx ? (
                <ChevronUp className="w-5 h-5 text-emerald-400 shrink-0" />
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
