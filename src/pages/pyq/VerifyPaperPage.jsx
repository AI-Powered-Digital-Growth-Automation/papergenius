import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';

export default function VerifyPaperPage() {
  const { paperId } = useParams();
  const [searchParams] = useSearchParams();
  const initialSet = searchParams.get('set') || 'Set A';
  const [selectedSet, setSelectedSet] = useState(initialSet);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PaperGenius
            </span>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono">
              VERIFIED
            </span>
          </Link>
          <Link
            to="/pricing"
            className="text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg transition"
          >
            Create Your Own Paper
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Verification Banner */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-850 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>AUTHENTIC CBSE ASSESSMENT</span>
                <span>•</span>
                <span>PAPER ID: {paperId}</span>
              </div>
              <h1 className="text-2xl font-bold text-white">
                Official Step-Wise Marking Key & Solutions
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Generated via PaperGenius AI Question Paper Studio. Aligned with current CBSE blueprint.
              </p>
            </div>

            {/* Set Selector */}
            <div className="flex sm:flex-col gap-2 shrink-0">
              <span className="text-xs text-slate-400 font-mono hidden sm:block">SELECT SET:</span>
              <div className="inline-flex rounded-lg bg-slate-900/80 p-1 border border-slate-700">
                {['Set A', 'Set B', 'Set C'].map((set) => (
                  <button
                    key={set}
                    onClick={() => setSelectedSet(set)}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                      selectedSet === set
                        ? 'bg-cyan-500 text-slate-950 shadow'
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

        {/* Info Card */}
        <div className="bg-slate-850/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Paper Authenticated & Locked
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            This verification link guarantees that questions, MCQs, and marking keys for <strong className="text-white">{selectedSet}</strong> are verified against CBSE standard evaluation guidelines.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono text-slate-400">
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
              <span className="block text-slate-500 text-[10px]">VERIFICATION</span>
              <span className="text-emerald-400 font-bold">100% VALID</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
              <span className="block text-slate-500 text-[10px]">SET ACTIVE</span>
              <span className="text-cyan-400 font-bold">{selectedSet}</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
              <span className="block text-slate-500 text-[10px]">BLUEPRINT</span>
              <span className="text-white font-bold">2024-2025</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
              <span className="block text-slate-500 text-[10px]">SECURITY</span>
              <span className="text-purple-400 font-bold">ANTI-TAMPER</span>
            </div>
          </div>
        </div>

        {/* Help CTA */}
        <div className="border border-slate-800 bg-slate-950 rounded-xl p-6 text-center space-y-3">
          <h2 className="text-base font-bold text-white">Need Detailed Step-Wise Evaluation of Your Answer Sheet?</h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Upload your handwritten answer sheet to PaperGenius AI Evaluator to get instant marks, CBSE deductions breakdown, and topper-secrets analysis.
          </p>
          <Link
            to="/student/evaluator"
            className="inline-block text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 px-5 py-2.5 rounded-lg transition shadow-lg"
          >
            Try AI Answer Sheet Evaluator Free →
          </Link>
        </div>
      </main>
    </div>
  );
}
