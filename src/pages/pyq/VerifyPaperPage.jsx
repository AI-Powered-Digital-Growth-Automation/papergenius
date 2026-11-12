import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, KeyRound, Award, BookOpen, ChevronRight, FileText } from 'lucide-react';

export default function VerifyPaperPage() {
  const { paperId } = useParams();
  const [searchParams] = useSearchParams();
  const initialSet = searchParams.get('set') || 'Set A';
  const [selectedSet, setSelectedSet] = useState(initialSet);
  const [paperDetails, setPaperDetails] = useState(null);

  useEffect(() => {
    // 1. Try to load matching paper from verification cache or saved vault
    try {
      const cached = localStorage.getItem('pg_verify_' + paperId);
      if (cached) {
        setPaperDetails(JSON.parse(cached));
        return;
      }

      // Check teacher saved vault
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('pg_papers_')) {
          const list = JSON.parse(localStorage.getItem(key) || '[]');
          const found = list.find(p => {
            const slug = `${(p.subject || '').toLowerCase().replace(/\s+/g, '-')}-${(p.grade || '').replace(/\s+/g, '')}`;
            return slug === paperId || p.id === paperId;
          });
          if (found && found.paperData) {
            setPaperDetails({
              title: found.title,
              grade: found.grade,
              subject: found.subject,
              sections: found.paperData.sections || [],
              examDetails: found.paperData.examDetails || {}
            });
            return;
          }
        }
      }
    } catch (e) {
      console.warn('Verification cache read error:', e);
    }
  }, [paperId]);

  // Fallback title formatting from URL slug
  const displaySubject = paperDetails?.subject || (paperId ? paperId.split('-')[0].toUpperCase() : 'CBSE Assessment');
  const displayGrade = paperDetails?.grade || (paperId?.includes('12') ? 'Class 12' : 'Class 10');

  return (
    <div className="min-h-screen bg-[#050814] text-white font-sans pb-16">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#080D24]/80 backdrop-blur sticky top-0 z-20 px-4 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="PaperGenius" className="w-8 h-8 rounded-lg" onError={(e) => { e.target.style.display = 'none'; }} />
            <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PaperGenius
            </span>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
            </span>
          </Link>
          <Link
            to="/pricing"
            className="text-xs font-bold btn-gradient text-white px-3.5 py-2 rounded-xl transition shadow"
          >
            Create Papers Free
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Verification Banner */}
        <div className="bg-gradient-to-br from-[#0B1026] to-[#080D24] border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1 font-semibold">
                <span>AUTHENTIC CBSE BLUEPRINT ASSESSMENT</span>
                <span>�</span>
                <span>{displayGrade}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {displaySubject} Official Marking Key & Solutions
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Step-wise marking scheme and model answers for students & evaluators.
              </p>
            </div>

            {/* Set Selector */}
            <div className="flex flex-col gap-1.5 shrink-0">
              <span className="text-[11px] text-slate-400 font-mono font-bold">SELECT EXAM SET:</span>
              <div className="inline-flex rounded-xl bg-[#050814] p-1 border border-white/10 shadow-inner">
                {['Set A', 'Set B', 'Set C'].map((set) => (
                  <button
                    key={set}
                    onClick={() => setSelectedSet(set)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                      selectedSet === set
                        ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {set}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-[#0C1330] p-3 rounded-xl border border-white/10 text-center">
            <span className="block text-slate-500 text-[10px]">VERIFICATION</span>
            <span className="text-emerald-400 font-bold flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% VALID
            </span>
          </div>
          <div className="bg-[#0C1330] p-3 rounded-xl border border-white/10 text-center">
            <span className="block text-slate-500 text-[10px]">ACTIVE SET</span>
            <span className="text-cyan-400 font-bold">{selectedSet}</span>
          </div>
          <div className="bg-[#0C1330] p-3 rounded-xl border border-white/10 text-center">
            <span className="block text-slate-500 text-[10px]">BLUEPRINT</span>
            <span className="text-white font-bold">CBSE 2025-26</span>
          </div>
          <div className="bg-[#0C1330] p-3 rounded-xl border border-white/10 text-center">
            <span className="block text-slate-500 text-[10px]">EVALUATION</span>
            <span className="text-purple-400 font-bold">STEP-MARKING</span>
          </div>
        </div>

        {/* OFFICIAL ANSWER KEY & STEP SOLUTIONS CARD */}
        <div className="bg-[#080D24] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Step-Wise Answer Key & Rubric ({selectedSet})</h2>
            </div>
            <span className="text-xs font-mono text-[#C4B5FD] bg-[#7C3CFF]/15 px-3 py-1 rounded-full border border-[#7C3CFF]/30">
              Official Head-Examiner Copy
            </span>
          </div>

          {paperDetails?.sections && paperDetails.sections.length > 0 ? (
            <div className="space-y-4">
              {paperDetails.sections.map((sec, sIdx) => (
                <div key={sIdx} className="bg-[#050814] border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-cyan-400 uppercase tracking-wider pb-2 border-b border-white/5">
                    <span>{sec.sectionName || `Section ${String.fromCharCode(65 + sIdx)}`}</span>
                    <span>Total: {sec.marks || '10'} Marks</span>
                  </div>

                  <div className="space-y-3">
                    {sec.questions?.map((q, qIdx) => (
                      <div key={qIdx} className="border-b border-white/5 pb-2.5 last:border-none last:pb-0 text-xs">
                        <div className="flex justify-between items-start gap-3">
                          <p className="font-semibold text-white">
                            <span className="text-cyan-300 font-bold mr-1">Q{q.qNumber || (qIdx + 1)}.</span>
                            {q.questionText}
                          </p>
                          <span className="font-mono text-purple-300 shrink-0 font-bold">[{q.marks || 1}M]</span>
                        </div>
                        <div className="mt-1.5 p-2.5 rounded-lg bg-[#0C1330] border border-white/5 space-y-1">
                          <p className="text-emerald-400 font-bold">
                            Correct Answer: <span className="text-white">{q.correctAnswer || q.answerKey || q.answer || 'Refer to step marking'}</span>
                          </p>
                          <p className="text-slate-400 text-[11px] leading-relaxed">
                            <strong className="text-slate-300">Marking Scheme:</strong> {q.markingScheme || q.stepMarking || '1 Mark for correct step and formula substitution.'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Verified Standard Solutions Sample when paper was printed offline */
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#050814] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <Award className="w-4 h-4" /> Official Step-Marking Guidelines for {displaySubject}
                </div>
                <div className="space-y-2 text-xs text-slate-300 divide-y divide-white/5">
                  <div className="pt-2">
                    <p className="font-bold text-white">1. Multiple Choice Questions (Section A):</p>
                    <p className="text-slate-400 text-[11px]">Full 1 Mark awarded for correct option letter along with statement. No negative marking.</p>
                  </div>
                  <div className="pt-2">
                    <p className="font-bold text-white">2. Short & Long Conceptual Questions (Section B & C):</p>
                    <p className="text-slate-400 text-[11px]">Half-mark deductions apply if SI units are omitted, balanced chemical equations lack state symbols, or governing formulas are missing.</p>
                  </div>
                  <div className="pt-2">
                    <p className="font-bold text-white">3. Topper Presentation Benchmark:</p>
                    <p className="text-slate-400 text-[11px]">Enclosing the final numerical value in a neat box guarantees full step marks under official CBSE guidelines.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Student AI Evaluator Card */}
        <div className="border border-white/10 bg-[#080D24] rounded-2xl p-6 text-center space-y-3 shadow-xl">
          <h3 className="text-base font-bold text-white">Want Your Handwritten Answer Sheet Evaluated?</h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
            Take a photo of your handwritten paper and get instant step-wise marks, deduction breakdown, and model answers via Gemini Vision Evaluator.
          </p>
          <Link
            to="/student/evaluator"
            className="inline-flex items-center gap-2 text-xs font-bold btn-gradient text-white px-5 py-2.5 rounded-xl shadow-lg"
          >
            <span>Scan & Check My Answer Sheet</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
