import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Archive, Download, ExternalLink, Flame, Lock, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { OFFICIAL_CBSE_LINKS } from '../../../data/downloadPapersData';

export default function TabBundles({
  selectedGrade,
  selectedSubject,
  isUnlocked,
  subscribedSubjects,
  papers,
  pyqs
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const officialLink = selectedGrade === 'Class 10' ? OFFICIAL_CBSE_LINKS.class10 : OFFICIAL_CBSE_LINKS.class12;

  return (
    <div className="space-y-8">
      {/* 1. 2022-2026 OFFICIAL BOARD BUNDLES (100% FREE FOR ALL STUDENTS) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Archive className="w-6 h-6 text-[#67E8F9]" />
                <span>2022 to 2026 Official Board Bundles ({selectedSubject})</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                100% Free Access
              </span>
            </div>
            <p className="text-sm text-[#94A3B8] mt-1">
              Complete Official CBSE Archives (All Sets, Delhi + All India Regions in 1-Click ZIP) + Verified Marking Schemes.
            </p>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#67E8F9] px-4 py-1.5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 font-bold">
            {selectedGrade} Series Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="p-6 rounded-2xl bg-[#080D24] border border-white/10 hover:border-[#06B6D4]/40 transition-all shadow-xl space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#67E8F9] text-xs font-bold font-mono">
                    {paper.year} Board Exam
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Free Download</span>
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-[#67E8F9] transition-colors">
                  {paper.subject}
                </h4>
                <p className="text-xs text-[#94A3B8]">{paper.paperType}</p>
                <div className="text-[11px] font-mono text-slate-500">{paper.fileSize}</div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-white/5">
                <a
                  href={paper.paperUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download All Sets (ZIP)</span>
                </a>
                <a
                  href={officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#67E8F9] text-xs font-semibold border border-white/10"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Official CBSE Marking Scheme (SQP/MS)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. HIGH-YIELD SOLVED PYQ BANK (FREEMIUM / LOCKED GATEWAY) */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-[#F472B6]" />
              <span>High-Yield Solved PYQ Bank ({selectedSubject})</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Step-by-step examiner solutions with CBSE marks allocation.
            </p>
          </div>

          {!isUnlocked && (
            <span className="px-3 py-1 rounded-full bg-purple-950/60 text-[#C4B5FD] border border-purple-500/40 text-xs font-bold">
              Sample Preview Mode
            </span>
          )}
        </div>

        <div className="space-y-3">
          {pyqs.map((q, idx) => {
            const isExpanded = expandedId === q.id;
            const isItemLocked = !isUnlocked && idx >= 2; // Allow first 2 questions free preview

            if (isItemLocked) {
              return (
                <div key={q.id} className="rounded-xl bg-[#080D24]/60 border border-purple-500/20 p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-[#94A3B8] font-mono">{q.chapter}</span>
                    <h5 className="text-sm font-semibold text-slate-400 blur-[2px] select-none">
                      {q.question.slice(0, 60)}... (Locked Question)
                    </h5>
                    <p className="text-xs text-purple-300">Unlock with Board Pass (₹199 / ₹499)</p>
                  </div>
                  <Link
                    to="/pricing"
                    className="btn-gradient px-4 py-2 rounded-xl text-xs font-bold text-white shrink-0 shadow flex items-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock Full Bank</span>
                  </Link>
                </div>
              );
            }

            return (
              <div key={q.id} className="rounded-xl bg-[#080D24] border border-white/10 overflow-hidden p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#94A3B8]">{q.chapter}</span>
                  <span className="px-2 py-0.5 rounded-full bg-pink-950 text-pink-300 font-bold">{q.frequencyBadge}</span>
                </div>
                <p className="text-base font-semibold text-white">{q.question}</p>
                <div className="flex justify-between items-center pt-2 text-xs border-t border-white/5">
                  <button onClick={() => setExpandedId(isExpanded ? null : q.id)} className="font-bold text-[#C4B5FD] hover:text-white">
                    {isExpanded ? 'Hide CBSE Solution' : 'View Step Solution & Marking Key'}
                  </button>
                  <button onClick={() => handleCopy(q.id, `${q.question}\n\n${q.answerKey.join('\n')}`)} className="text-[#94A3B8] hover:text-white">
                    {copiedId === q.id ? 'Copied' : 'Copy'}
                  </button>
                </div>
                {isExpanded && (
                  <div className="p-3 bg-[#0C1330] rounded-lg space-y-2 text-xs mt-2 border border-white/5">
                    {q.answerKey.map((step, sIdx) => (
                      <div key={sIdx} className="p-2 rounded bg-[#080D24] text-[#E2E8F0]">{step}</div>
                    ))}
                    {q.cbseTip && (
                      <div className="p-2.5 rounded bg-[#7C3CFF]/15 text-[#DDD6FE]">
                        <strong className="text-white">CBSE Examiner Tip: </strong>{q.cbseTip}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
