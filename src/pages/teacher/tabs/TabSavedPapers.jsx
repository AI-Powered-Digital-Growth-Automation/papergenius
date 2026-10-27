import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Copy, Check } from 'lucide-react';

export default function TabSavedPapers({ paperHistory }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyLink = (id) => {
    navigator.clipboard.writeText(`https://papergenius.in/verify/paper/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4 print:hidden">
      <div className="flex items-center justify-between text-sm text-[#94A3B8]">
        <span>Generated papers saved to your cloud coaching vault</span>
        <span className="text-[#67E8F9] font-mono">100% CBSE 2026 Aligned</span>
      </div>

      <div className="space-y-4">
        {paperHistory.map((paper) => (
          <div
            key={paper.id}
            className="p-6 rounded-2xl bg-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#7C3CFF]/20 text-[#C4B5FD] text-xs font-mono font-bold">
                  {paper.grade} • {paper.subject}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#06B6D4]/15 text-[#67E8F9] text-xs font-mono font-bold">
                  {paper.marks} Marks • {paper.duration}
                </span>
                <span className="text-xs text-[#94A3B8] flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{paper.date}</span>
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">{paper.title}</h3>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#CBD5E1]">
                <span>Shuffled Sets:</span>
                {paper.sets.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white/5 font-mono text-white border border-white/10">
                    {s}
                  </span>
                ))}
                <span className="text-[#10B981] ml-2 font-semibold">✓ Branded Watermark Embedded</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <Link
                to="/teacher/create-paper"
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-bold border border-white/10 flex items-center gap-1.5 transition-all"
              >
                <Eye className="w-4 h-4 text-[#67E8F9]" />
                <span>View & Print</span>
              </Link>

              <button
                onClick={() => handleCopyLink(paper.id)}
                className="px-4 py-2.5 rounded-xl bg-[#7C3CFF]/20 hover:bg-[#7C3CFF]/30 text-[#C4B5FD] text-xs sm:text-sm font-bold border border-[#7C3CFF]/30 flex items-center gap-1.5 transition-all"
              >
                {copiedId === paper.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === paper.id ? 'Copied' : 'Share Key'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
