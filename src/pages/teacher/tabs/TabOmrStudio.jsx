import React, { useState } from 'react';
import { Printer } from 'lucide-react';

export default function TabOmrStudio({ instituteName }) {
  const [omrQuestionsCount, setOmrQuestionsCount] = useState(40);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[#080D24] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h3 className="text-xl font-bold text-white">Printable CBSE OMR Sheet Engine</h3>
          <p className="text-sm text-[#94A3B8]">High-density bubble answer sheet with custom institute branding</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-[#94A3B8] font-semibold">Bubble Count:</span>
          {[20, 40, 60, 80, 100].map((count) => (
            <button
              key={count}
              onClick={() => setOmrQuestionsCount(count)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                omrQuestionsCount === count
                  ? 'bg-[#06B6D4] text-black font-extrabold shadow-md'
                  : 'bg-[#0C1330] text-[#94A3B8] border border-white/10 hover:text-white'
              }`}
            >
              {count} Q
            </button>
          ))}

          <button
            onClick={() => window.print()}
            className="btn-gradient px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 shadow-md ml-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print 1-Page OMR</span>
          </button>
        </div>
      </div>

      {/* Clean White A4 OMR Sheet */}
      <div className="bg-white text-black p-8 sm:p-10 rounded-2xl shadow-2xl max-w-4xl mx-auto space-y-4 font-sans">
        <div className="text-center border-b-2 border-black pb-3 space-y-0.5">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider">{instituteName}</h2>
          <div className="text-xs font-bold text-gray-700 uppercase tracking-widest">
            CBSE BOARD PATTERN CANDIDATE OMR RESPONSE SHEET
          </div>
          <div className="text-[10px] text-gray-600 font-mono">
            USE BLACK / BLUE BALL POINT PEN ONLY • DARKEN CIRCLES COMPLETELY
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border border-black p-2.5 font-mono">
          <div><strong>CANDIDATE:</strong> __________________</div>
          <div><strong>ROLL NO:</strong> [ _ _ _ _ _ _ _ ]</div>
          <div><strong>SUBJECT:</strong> ____________________</div>
          <div><strong>DATE:</strong> ____/____/2026</div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
          {Array.from({ length: 4 }).map((_, colIdx) => {
            const perCol = Math.ceil(omrQuestionsCount / 4);
            const startQ = colIdx * perCol + 1;
            const endQ = Math.min(omrQuestionsCount, (colIdx + 1) * perCol);

            if (startQ > omrQuestionsCount) return null;

            return (
              <div key={colIdx} className="space-y-1.5 border-r border-gray-200 last:border-none pr-2">
                {Array.from({ length: endQ - startQ + 1 }).map((__, qIdx) => {
                  const qNum = startQ + qIdx;
                  return (
                    <div key={qNum} className="flex items-center justify-between text-xs font-mono py-0.5">
                      <span className="font-bold w-6">{qNum.toString().padStart(2, '0')}.</span>
                      <div className="flex gap-1">
                        {['A', 'B', 'C', 'D'].map((opt) => (
                          <span
                            key={opt}
                            className="w-4 h-4 rounded-full border border-black flex items-center justify-center text-[9px] font-bold"
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-black flex items-center justify-between text-xs font-mono text-gray-700">
          <div>Candidate's Signature: __________________</div>
          <div>Invigilator's Signature: __________________</div>
        </div>
      </div>
    </div>
  );
}
