import React from 'react';
import { Copy, Printer, CheckCircle2 } from 'lucide-react';

export default function PaperCanvas({ 
  paperData, 
  formData, 
  activeSet, 
  copied, 
  onCopyText, 
  onPrint 
}) {
  return (
    <div className="space-y-4">
      {/* Top Action Toolbar (Hidden on Print) */}
      <div className="print:hidden bg-[#0B1020] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#94A3B8] font-mono">Active Set:</span>
          <span className="px-3.5 py-1.5 rounded-lg text-sm font-bold bg-[#7C3CFF]/20 text-[#C4B5FD] border border-[#7C3CFF]/40">
            {activeSet}
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-sm text-slate-300 font-semibold">
            {paperData.examDetails.subject} ({paperData.examDetails.maxMarks} Marks)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCopyText}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#050814] hover:bg-[#111A3D] border border-white/10 text-white flex items-center gap-2 transition-all cursor-pointer"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            onClick={onPrint}
            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#5EE7FF] text-[#050814] hover:bg-[#22D3EE] flex items-center gap-2 cursor-pointer shadow-lg shadow-[#5EE7FF]/20"
          >
            <Printer className="w-4 h-4" />
            <span>Print Clean A4 PDF</span>
          </button>
        </div>
      </div>

      {/* White A4 Print-ready Canvas */}
      <div className="relative bg-white text-black p-8 sm:p-14 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden print:shadow-none print:border-none print:p-0">
        
        {/* Background Watermark */}
        {formData.watermarkText && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04] select-none rotate-[-30deg]">
            <span className="text-6xl sm:text-8xl font-black uppercase tracking-widest text-black whitespace-nowrap">
              {formData.watermarkText}
            </span>
          </div>
        )}

        {/* Coaching Header */}
        <div className="border-b-2 border-black pb-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-wider">{formData.coachingName}</h2>
          {formData.subHeader && (
            <p className="text-sm font-semibold text-slate-700 mt-1">{formData.subHeader}</p>
          )}
          {formData.contactInfo && (
            <p className="text-xs text-slate-500 font-mono mt-0.5">{formData.contactInfo}</p>
          )}

          <div className="mt-4 pt-2 border-t border-slate-400 flex flex-wrap justify-between items-center text-xs sm:text-sm font-bold text-slate-800">
            <span>{paperData.examDetails.title}</span>
            <span className="px-2.5 py-0.5 bg-black text-white rounded text-xs uppercase font-mono">{activeSet}</span>
          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm font-bold mt-2 pt-1 border-t border-dashed border-slate-300">
            <span>Subject: {paperData.examDetails.subject}</span>
            <span>Max Marks: {paperData.examDetails.maxMarks}</span>
            <span>Time: {paperData.examDetails.duration}</span>
          </div>
        </div>

        {/* General Instructions */}
        {paperData.examDetails.generalInstructions?.length > 0 && (
          <div className="my-4 p-3 bg-slate-50 border border-slate-200 rounded text-xs relative z-10">
            <p className="font-bold underline mb-1">General Instructions:</p>
            <ol className="list-decimal pl-5 space-y-0.5 text-slate-700">
              {paperData.examDetails.generalInstructions.map((ins, i) => (
                <li key={i}>{ins}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Questions Sections */}
        <div className="space-y-6 mt-5 relative z-10">
          {paperData.sections?.map((sec, secIdx) => (
            <div key={secIdx} className="section-break">
              <div className="text-center font-bold text-sm tracking-wider uppercase border-b border-black pb-1 mb-3">
                {sec.sectionName}
              </div>

              <div className="space-y-4">
                {sec.questions?.map((q, qIdx) => (
                  <div key={qIdx} className="question-item text-sm leading-relaxed">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <span className="font-bold mr-2">Q{q.qNumber}.</span>
                        <span>{q.questionText}</span>
                      </div>
                      <span className="font-bold text-xs shrink-0">[{q.marks}]</span>
                    </div>

                    {q.options && q.options.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pl-6 text-xs text-slate-800">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx}>{opt}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

                {/* Verification Footer with Dynamic QR Code */}
        <div className="mt-8 pt-4 border-t-2 border-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono relative z-10 print:mt-6 print:pt-3">
          <div className="space-y-1 text-slate-700 text-left">
            <div className="font-bold text-black uppercase tracking-wider flex items-center gap-2">
              <span>Set: {activeSet}</span>
              <span>•</span>
              <span className="text-emerald-700">CBSE Blueprint Aligned</span>
            </div>
            <p className="text-[11px] text-slate-600">Scan QR code using any smartphone camera for step-wise marking key & model solutions.</p>
            <p className="text-[10px] text-slate-400">Powered by PaperGenius CBSE Exam OS • {formData.coachingName || 'Coaching Institute'}</p>
          </div>

          {/* Real Dynamic QR Verification Code */}
          <div className="flex items-center gap-2.5 shrink-0 border border-slate-300 p-2 rounded-xl bg-slate-50 print:bg-white print:border-slate-400">
            <div className="text-right">
              <span className="block text-[10px] font-bold text-black uppercase leading-tight">Scan for</span>
              <span className="block text-[10px] font-black text-cyan-700 uppercase leading-tight">Answer Key</span>
            </div>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(`https://papergenius.in/pyq-vault?ref=paper_${activeSet}`)}`}
              alt="Scan for Answer Key QR Code"
              className="w-14 h-14 object-contain print:w-14 print:h-14"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
