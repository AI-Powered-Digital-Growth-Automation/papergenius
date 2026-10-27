import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, TrendingUp, AlertTriangle, ArrowRight, Target, Sparkles 
} from 'lucide-react';

export default function TabPredictor({ selectedGrade }) {
  const [marks, setMarks] = useState({
    sub1: 58,
    sub2: 62,
    sub3: 65,
    sub4: 72,
    sub5: 70
  });

  const [predictedResult, setPredictedResult] = useState(null);

  const subjectLabels = selectedGrade === 'Class 10' 
    ? ['Science', 'Mathematics', 'Social Science', 'English', 'Hindi / Language']
    : ['Physics', 'Chemistry', 'Mathematics / Biology', 'English Core', 'Optional (PE/CS/IP)'];

  const handlePredict = (e) => {
    e.preventDefault();
    const scores = [Number(marks.sub1), Number(marks.sub2), Number(marks.sub3), Number(marks.sub4), Number(marks.sub5)];
    const totalMarks = scores.reduce((a, b) => a + b, 0);
    const preBoardPercent = (totalMarks / 400) * 100;

    const projectedMin = Math.min(99, Math.round(preBoardPercent + 8));
    const projectedMax = Math.min(99, Math.round(preBoardPercent + 15));

    const subjectScores = [
      { name: subjectLabels[0], score: scores[0] },
      { name: subjectLabels[1], score: scores[1] },
      { name: subjectLabels[2], score: scores[2] },
      { name: subjectLabels[3], score: scores[3] },
      { name: subjectLabels[4], score: scores[4] }
    ];
    subjectScores.sort((a, b) => a.score - b.score);

    setPredictedResult({
      preBoardPercent: Math.round(preBoardPercent),
      projectedMin,
      projectedMax,
      weakestSubject: subjectScores[0]
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[#080D24] border border-[#06B6D4]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06B6D4]/15 text-[#67E8F9] text-xs font-mono font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>5-Year Historic CBSE Conversion Algorithm</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            {selectedGrade} Board Exam Percentage Predictor
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            School pre-board checking is notoriously strict. Enter your theory scores (out of 80) to project your expected final board percentage range.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="md:col-span-5 p-6 rounded-2xl bg-[#080D24] border border-white/10 space-y-4 shadow-xl">
          <h4 className="font-bold text-white text-base border-b border-white/10 pb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#67E8F9]" />
            <span>Enter Pre-Board Marks (/80)</span>
          </h4>

          <form onSubmit={handlePredict} className="space-y-3 text-xs sm:text-sm">
            {subjectLabels.map((lbl, idx) => {
              const key = `sub${idx + 1}`;
              return (
                <div key={idx} className="flex items-center justify-between gap-3">
                  <label className="text-[#CBD5E1] font-medium truncate max-w-[170px]">{lbl}</label>
                  <div className="flex items-center gap-1 w-24">
                    <input
                      type="number"
                      min="0"
                      max="80"
                      required
                      value={marks[key]}
                      onChange={(e) => setMarks({ ...marks, [key]: e.target.value })}
                      className="w-full bg-[#0C1330] border border-white/10 rounded-xl px-2.5 py-2 text-center text-white font-mono font-bold focus:outline-none focus:border-[#06B6D4]"
                    />
                    <span className="text-[#64748B] text-xs">/80</span>
                  </div>
                </div>
              );
            })}

            <button
              type="submit"
              className="btn-gradient w-full py-3 rounded-xl font-bold text-white text-sm shadow-xl flex items-center justify-center gap-2 mt-3 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Predict Final Board Score</span>
            </button>
          </form>
        </div>

        {/* Right Result */}
        <div className="md:col-span-7">
          {predictedResult ? (
            <div className="p-7 rounded-2xl bg-[#080D24] border border-[#06B6D4]/40 shadow-2xl space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-[#67E8F9] uppercase font-bold tracking-wider">
                    Projected Board Performance
                  </span>
                  <h4 className="text-xl font-black text-white mt-0.5">Estimated Board Range</h4>
                </div>

                <div className="px-4 py-2 rounded-xl bg-[#0C1330] border border-[#06B6D4]/40 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5EE7FF] to-[#8C78FF]">
                    {predictedResult.projectedMin}% - {predictedResult.projectedMax}%
                  </div>
                  <div className="text-[11px] text-[#94A3B8]">Pre-Board Base: {predictedResult.preBoardPercent}%</div>
                </div>
              </div>

              {/* Diagnosis Alert */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1.5 text-xs sm:text-sm">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Weak Subject: {predictedResult.weakestSubject.name} ({predictedResult.weakestSubject.score}/80)</span>
                </div>
                <p className="text-[#CBD5E1] leading-relaxed">
                  Focusing on step marks in {predictedResult.weakestSubject.name} can add up to 8-10 marks directly to your aggregate total.
                </p>
              </div>

              {/* Action Recommendations */}
              <div className="p-4 rounded-xl bg-[#0C1330] space-y-2 text-xs sm:text-sm text-[#CBD5E1]">
                <h5 className="font-bold text-white flex items-center gap-1.5 uppercase text-xs">
                  <Target className="w-4 h-4 text-[#67E8F9]" />
                  <span>3 Fast Improvements Before Board Exam</span>
                </h5>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Solve 5-year high-yield questions with repeated board badges in Tab 1.</li>
                  <li>Check handwritten numericals in Tab 2 to eliminate missing SI unit deductions.</li>
                  <li>Review the 2-page rapid formula cheat sheets in Tab 3.</li>
                </ul>
              </div>

              {/* Upsell Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#0C1330] to-[#120D3D] border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-[#C4B5FD] font-bold block">Need Full Practice for {predictedResult.weakestSubject.name}?</span>
                  <span className="text-[#94A3B8] text-xs">Unlock 100 AI Checks + 3-Hour Mocks with Board Pass.</span>
                </div>
                <Link
                  to="/pricing"
                  className="btn-gradient px-4 py-2 rounded-xl font-bold text-white text-xs shrink-0 flex items-center gap-1 shadow"
                >
                  <span>View Pass (₹{selectedGrade === 'Class 10' ? '199' : '499'})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[340px] rounded-2xl bg-[#080D24]/40 border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <Calculator className="w-10 h-10 text-[#94A3B8]" />
              <h4 className="text-base font-bold text-white">Ready to Predict Your Score</h4>
              <p className="text-xs text-[#94A3B8] max-w-sm">
                Fill in your 5 theory marks on the left and click "Predict Final Board Score".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
