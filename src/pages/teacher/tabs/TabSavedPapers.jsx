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

      {paperHistory.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#080D24] border border-white/10 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7C3CFF]/20 to-[#06B6D4]/20 border border-white/10 flex items-center justify-center mx-auto text-[#67E8F9]">
            📄
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Your Question Paper Vault is Empty</h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto">
              You haven't generated any question papers yet. Click below to create your first CBSE aligned test with Set A/B/C shuffling.
            </p>
          </div>
          <Link
            to="/teacher/create-paper"
            className="inline-flex items-center gap-2 btn-gradient px-6 py-3 rounded-xl font-bold text-white text-xs sm:text-sm shadow-lg hover:opacity-95"
          >
            <span>+ Create Your First Paper</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {paperHistory.map((paper) => (
            <div
              key={paper.id}
              className="p-6 rounded-2xl bg-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#7C3CFF]/20 text-[#C4B5FD] font-mono font-bold">
                    {paper.grade} • {paper.subject}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-950/40 text-cyan-300 font-mono font-bold border border-cyan-500/20">
                    {paper.marks} Marks • {paper.duration}
                  </span>
                  <span className="text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{paper.date}</span>
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">{paper.title}</h4>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/teacher/create-paper"
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View & Print</span>
                </Link>
                <button
                  onClick={() => handleCopyLink(paper.id)}
                  className="px-4 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 text-xs font-semibold border border-purple-500/30 flex items-center gap-1.5"
                >
                  {copiedId === paper.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === paper.id ? 'Copied!' : 'Share Key'}</span>
                  </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

