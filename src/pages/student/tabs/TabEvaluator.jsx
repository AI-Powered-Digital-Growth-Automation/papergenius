import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Upload, RefreshCw, Zap, AlertCircle, FileText, 
  Award, CheckCircle2, BookmarkCheck, Star, X, ExternalLink, Sparkles 
} from 'lucide-react';
import { evaluateAnswerSheet } from '../../../services/geminiService';
import { PAYMENT_LINKS } from '../../../config/paymentConfig';

export default function TabEvaluator({
  selectedGrade,
  selectedSubject,
  isUnlocked,
  subscribedSubjects,
  evaluationsRemaining,
  consumeEvaluationQuota
}) {
  const [evalQuestion, setEvalQuestion] = useState('');
  const [evalMarks, setEvalMarks] = useState(5);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMimeType, setImageMimeType] = useState('image/jpeg');
  const [loading, setLoading] = useState(false);
  const [evalError, setEvalError] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [showTopperComparison, setShowTopperComparison] = useState(false);
  const fileInputRef = useRef(null);
  const [showPaywallModal, setShowPaywallModal] = useState(false);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setEvalError('Kripya valid image file (JPG, PNG) upload karein.');
      return;
    }
    setEvalError(null);
    setImageMimeType(file.type);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

    const handleRunEvaluation = async () => {
    if (!isUnlocked) {
      setEvalError(`Aapke pass mein ${selectedSubject} shamil nahi hai. Subscribed: ${subscribedSubjects.join(', ')}`);
      return;
    }
        if (evaluationsRemaining <= 0) {
      setShowPaywallModal(true);
      return;
    }

    if (!imageBase64) {
      setEvalError('Kripya pehle handwritten answer ki photo upload karein.');
      return;
    }

    setLoading(true);
    setEvalError(null);

    try {
      const rawResult = await evaluateAnswerSheet({
        imageBase64,
        mimeType: imageMimeType,
        grade: selectedGrade,
        subject: selectedSubject,
        questionContext: evalQuestion,
        maxMarks: Number(evalMarks)
      });

      if (!rawResult) {
        throw new Error('AI Engine did not return a valid scorecard. Please retry.');
      }

      // Safe Normalizer: Map API fields to UI component fields
      const normalized = {
        overallVerdict: rawResult.overallVerdict || rawResult.presentationRating || 'CBSE Evaluation Completed',
        totalMarksAwarded: typeof rawResult.totalMarksAwarded === 'number' 
          ? rawResult.totalMarksAwarded 
          : (rawResult.marksAwarded ?? evalMarks),
        maxMarks: rawResult.maxMarks || evalMarks,
        transcribedText: rawResult.transcribedText || '',
        stepBreakdown: (rawResult.stepBreakdown || []).map(st => ({
          stepTitle: st.stepTitle || st.step || 'Step Evaluation',
          marksAwarded: st.marksAwarded ?? (typeof st.marks === 'string' ? st.marks.split('/')[0] : 1),
          maxMarksForStep: st.maxMarksForStep ?? (typeof st.marks === 'string' ? st.marks.split('/')[1] : 1),
          feedback: st.feedback || st.status || 'Verified against rubric'
        })),
        deductionsAndMistakes: rawResult.deductionsAndMistakes || rawResult.deductions || [],
        modelAnswer: rawResult.modelAnswer || 'Refer to NCERT model answer.',
        topperSecretsCheck: rawResult.topperSecretsCheck || {}
      };

      setEvaluation(normalized);

      // Consume Quota ONLY after successful evaluation
      if (consumeEvaluationQuota) {
        await consumeEvaluationQuota();
      }
    } catch (err) {
      console.error('Evaluation Error:', err);
      setEvalError(err.message || 'Evaluation me dikkat aayi. Clear photo upload karein.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Form */}
      <div className="lg:col-span-5 p-6 rounded-2xl bg-[#080D24] border border-white/10 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#67E8F9]" />
          <span>Upload Answer Copy ({selectedSubject})</span>
        </h3>

        <div>
          <label className="text-xs text-[#94A3B8] block mb-1">Question Statement (Optional if written on copy)</label>
          <textarea
            value={evalQuestion}
            onChange={(e) => setEvalQuestion(e.target.value)}
            placeholder="e.g. State Snell's law of refraction and derive..."
            rows={2}
            className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#06B6D4]"
          />
        </div>

        <div>
          <label className="text-xs text-[#94A3B8] block mb-1">Maximum Marks for this Question</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setEvalMarks(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold ${
                  evalMarks === m ? 'bg-[#06B6D4] text-black font-extrabold' : 'bg-[#0C1330] text-[#94A3B8] border border-white/10'
                }`}
              >
                {m}M
              </button>
            ))}
          </div>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#06B6D4]/30 hover:border-[#06B6D4] bg-[#0C1330]/40 rounded-xl p-6 text-center cursor-pointer transition-all"
        >
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          {imagePreview ? (
            <div className="space-y-2">
              <img src={imagePreview} alt="Preview" className="max-h-52 mx-auto rounded border border-white/10 object-contain" />
              <p className="text-xs text-[#67E8F9]">Click to change photo</p>
            </div>
          ) : (
            <div className="space-y-2 py-4">
              <Upload className="w-9 h-9 mx-auto text-[#67E8F9]" />
              <p className="text-sm font-bold text-white">Click to snap/upload answer photo</p>
              <p className="text-xs text-[#94A3B8]">Supports JPG, PNG mobile photos</p>
            </div>
          )}
        </div>

        {evalError && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{evalError}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleRunEvaluation}
          disabled={loading || !isUnlocked}
          className="w-full btn-gradient py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 text-yellow-300" />}
          <span>{loading ? 'Evaluating...' : 'Check My Answer Copy (-1 Quota)'}</span>
        </button>
      </div>

      {/* Right Result */}
      <div className="lg:col-span-7">
        {evaluation ? (
          <div className="p-6 sm:p-7 rounded-2xl bg-[#080D24] border border-[rgba(140,120,255,0.3)] shadow-xl space-y-5">
            
            {/* Header Score */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#67E8F9]">CBSE Scorecard</span>
                <h4 className="text-xl font-bold text-white">{evaluation.overallVerdict}</h4>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#0C1330] border border-[#06B6D4]/40 text-center">
                <span className="text-3xl font-black text-[#5EE7FF]">{evaluation.totalMarksAwarded}</span>
                <span className="text-sm text-[#94A3B8]"> / {evaluation.maxMarks}</span>
              </div>
            </div>

            {/* Step-by-step breakdown */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Step-Wise Mark Breakdown</div>
              {evaluation.stepBreakdown?.map((st, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#0C1330] text-xs sm:text-sm space-y-1">
                  <div className="flex justify-between font-semibold text-white">
                    <span>{st.stepTitle}</span>
                    <span className="text-[#67E8F9] font-mono">{st.marksAwarded} / {st.maxMarksForStep} M</span>
                  </div>
                  <p className="text-[#94A3B8]">{st.feedback}</p>
                </div>
              ))}
            </div>

            {/* Deductions Alert */}
            {evaluation.deductionsAndMistakes?.length > 0 && (
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-xs sm:text-sm text-red-200">
                <div className="font-bold text-red-400 mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Deduction Reason (Lost Marks in Board Checking):</span>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {evaluation.deductionsAndMistakes.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ideal Model Answer */}
            <div className="p-4 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-xs sm:text-sm text-[#E2E8F0]">
              <div className="font-bold text-[#67E8F9] mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>100/100 Ideal CBSE Model Answer:</span>
              </div>
              <p className="leading-relaxed whitespace-pre-line">{evaluation.cbseModelAnswer}</p>
            </div>

            {/* NEW FEATURE: TOPPER PRESENTATION BENCHMARK ACCORDION */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#0C1330] to-[#140D33] border border-purple-500/30 space-y-2">
              <button
                type="button"
                onClick={() => setShowTopperComparison(!showTopperComparison)}
                className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-[#C4B5FD] hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>CBSE 100/100 Topper Presentation Secrets for this Question</span>
                </div>
                <span className="text-xs text-[#94A3B8]">{showTopperComparison ? 'Hide' : 'View Standards'}</span>
              </button>

              {showTopperComparison && (
                <div className="pt-2 border-t border-white/5 space-y-2 text-xs text-[#CBD5E1] leading-relaxed">
                  <div className="p-2.5 rounded-lg bg-[#080D24]">
                    <strong className="text-white block mb-0.5">1. Formula Box Presentation:</strong>
                    Always write the primary equation centered on the page and draw a clean pencil box around it. Examiners spot the formula instantly.
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#080D24]">
                    <strong className="text-white block mb-0.5">2. Dedicated Calculation Margin:</strong>
                    Draw a 2-inch right margin for rough arithmetic work so your main answer column remains scratch-free and pristine.
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#080D24]">
                    <strong className="text-white block mb-0.5">3. Final Statement Underline:</strong>
                    State: <em>"Hence, the required focal length is +15 cm (Convex Lens)."</em> Double-underline the concluding magnitude and unit.
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="h-full min-h-[440px] rounded-2xl bg-[#080D24]/40 border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-3">
            <FileText className="w-12 h-12 text-[#94A3B8]" />
            <h4 className="text-lg font-bold text-white">No Evaluation Report Yet</h4>
            <p className="text-sm text-[#94A3B8] max-w-sm">
              Upload photo of your written copy to see CBSE step-wise marks, deduction alerts, and 100/100 topper benchmark secrets.
            </p>
          </div>
        )}
      </div>

            {/* 0-QUOTA STUDENT PAYWALL LOCK MODAL */}
      {showPaywallModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0B132B] border border-cyan-500/40 shadow-2xl p-6 sm:p-8 space-y-6 text-center animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setShowPaywallModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon & Title */}
            <div className="space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7C3CFF] to-[#06B6D4] flex items-center justify-center mx-auto shadow-xl shadow-[#7C3CFF]/30">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono font-bold text-cyan-300 inline-block uppercase">
                Free Trial Credits Exhausted (0/2)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Unlock 100/100 CBSE Board Pass
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                You've used your 2 free AI answer sheet evaluations. Upgrade to continue checking unlimited handwritten answers with official step-marking rubrics.
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
              <span className="text-xs text-slate-400 font-mono">Instant Unlimited Access</span>
              <div className="text-3xl font-black text-white">
                {selectedGrade === 'Class 12' ? '₹499' : '₹199'}
                <span className="text-xs font-semibold text-emerald-400 ml-2">Full 2026 Session</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">All Core Subjects • Model Answers • Deduction Alerts</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <Link
                to="/pricing"
                onClick={() => setShowPaywallModal(false)}
                className="w-full btn-gradient py-3.5 rounded-xl font-bold text-white text-sm shadow-xl flex items-center justify-center gap-2 hover:opacity-95 transition-all block text-center"
              >
                <span>Upgrade Board Pass ({selectedGrade === 'Class 12' ? '₹499' : '₹199'})</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setShowPaywallModal(false)}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-white font-mono"
              >
                Continue Browsing Solved PYQ Vault Free
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  );
}
