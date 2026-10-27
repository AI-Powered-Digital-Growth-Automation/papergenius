import React, { useState, useRef } from 'react';
import { 
  Upload, Camera, CheckCircle2, AlertCircle, Sparkles, RefreshCw, 
  FileText, ArrowRight, Award, Zap, HelpCircle, Download, Info,
  Check, Lightbulb, Smartphone, ShieldCheck
} from 'lucide-react';
import { evaluateAnswerSheet } from '../../services/geminiService';

export default function StudentEvaluatorPage() {
  const [grade, setGrade] = useState('Class 10');
  const [subject, setSubject] = useState('Science');
  const [questionText, setQuestionText] = useState('');
  const [maxMarks, setMaxMarks] = useState(5);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMimeType, setImageMimeType] = useState('image/jpeg');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    setError(null);
    setImageMimeType(file.type);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEvaluate = async () => {
    if (!imageBase64) {
      setError('Please upload or snap a photo of your handwritten answer sheet first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await evaluateAnswerSheet({
        imageBase64,
        mimeType: imageMimeType,
        grade,
        subject,
        questionText,
        maxMarks: Number(maxMarks)
      });
      setEvaluation(result);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to evaluate answer copy. Please try again with a clearer photo.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    setGrade('Class 10');
    setSubject('Science');
    setQuestionText('Explain the mechanism of transport of water and minerals in plants (Xylem).');
    setMaxMarks(3);
    setEvaluation({
      studentTranscription: "Water and minerals are absorbed by roots from soil. Xylem tissue transports it upward due to transpiration pull.",
      totalMarksAwarded: 2,
      maxMarks: 3,
      overallVerdict: "Fair attempt, but key CBSE terminology (root pressure & tracheids) missing.",
      stepBreakdown: [
        {
          stepTitle: "Absorption by Root Hairs & Active Transport",
          marksAwarded: 0.5,
          maxMarksForStep: 1,
          feedback: "Mentioned roots, but missed osmotic gradient & active ion uptake."
        },
        {
          stepTitle: "Ascent of Sap & Transpiration Pull mechanism",
          marksAwarded: 1,
          maxMarksForStep: 1,
          feedback: "Correctly identified transpiration suction pull."
        },
        {
          stepTitle: "Vessels and Tracheids role & Continuous Column",
          marksAwarded: 0.5,
          maxMarksForStep: 1,
          feedback: "Did not mention xylem vessels and tracheids forming continuous water column."
        }
      ],
      strengths: [
        "Correct identification of transpiration pull.",
        "Clear and legible handwriting."
      ],
      deductionsAndMistakes: [
        "0.5 marks deducted: Omitted role of Tracheids & Vessels.",
        "0.5 marks deducted: Root osmotic pressure not explained."
      ],
      cbseModelAnswer: "1. Roots actively take up ions, creating an osmotic concentration gradient. 2. Water moves into root xylem creating a column. 3. Transpiration creates suction pull that lifts water through vessels & tracheids.",
      examinerProTip: "Always write 3 numbered bullet points for a 3-mark CBSE Science question to make it effortless for the examiner to award full 3/3."
    });
  };

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 pt-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner */}
      <div className="max-w-6xl mx-auto mb-6 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-xs sm:text-sm font-bold text-[#67E8F9]">
          <Sparkles className="w-4 h-4 text-[#67E8F9]" />
          <span>Multimodal CBSE Step-Marking AI Examiner</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          AI Answer Sheet Evaluator
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto">
          Upload photo of your handwritten answer copy. Our AI acts like a Senior CBSE Examiner giving step marks, pinpointing mark deductions, and writing the model 100/100 answer.
        </p>
        
        {/* Help & Guide Toggle Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-[#67E8F9] transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showGuide ? 'Hide Evaluation Guide' : '📖 How to take photos & get 100% accurate checking'}</span>
          </button>
        </div>
      </div>

      {/* STEP-BY-STEP USER INSTRUCTION ACCORDION / GUIDE */}
      {showGuide && (
        <div className="max-w-6xl mx-auto mb-8 p-6 rounded-2xl bg-[#080D24] border border-[#06B6D4]/40 shadow-2xl space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <span>Student Guide: How to Get Maximum Evaluation Accuracy</span>
            </h3>
            <span className="text-xs font-mono text-[#67E8F9]">3 Simple Steps</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-[#06B6D4]/20 text-[#67E8F9] flex items-center justify-center font-bold">1</div>
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#67E8F9]" />
                <span>Snap Flat & Well-Lit</span>
              </h4>
              <p className="text-[#94A3B8] leading-relaxed">
                Hold phone parallel to the paper. Avoid dark shadows or tilted angles. Blue or black ballpoint/gel pen gives best OCR clarity.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-[#7C3CFF]/20 text-[#C4B5FD] flex items-center justify-center font-bold">2</div>
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C4B5FD]" />
                <span>Select Target Marks</span>
              </h4>
              <p className="text-[#94A3B8] leading-relaxed">
                Choose the exact CBSE question marks (1M, 2M, 3M, or 5M). The AI examiner applies official CBSE step-breakdown rubrics matching those marks.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-[#10B981]/20 text-[#6EE7B7] flex items-center justify-center font-bold">3</div>
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#6EE7B7]" />
                <span>Read Examiner Deductions</span>
              </h4>
              <p className="text-[#94A3B8] leading-relaxed">
                Check the red box for lost marks (e.g., missing units or theorems) and compare your copy with the 100/100 CBSE Model Answer.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls & Image Uploader */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#080D24] border border-[rgba(140,120,255,0.25)] shadow-xl space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#67E8F9]" />
              <span>1. Upload Answer Copy</span>
            </h3>

            {/* Config Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#94A3B8] block mb-1 font-medium">Class / Grade</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#06B6D4]"
                >
                  <option value="Class 10">Class 10 (CBSE)</option>
                  <option value="Class 12">Class 12 (CBSE)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[#94A3B8] block mb-1 font-medium">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#06B6D4]"
                >
                  <option value="Science">Science (Physics/Chem/Bio)</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics (Class 12)</option>
                  <option value="Chemistry">Chemistry (Class 12)</option>
                  <option value="Social Science">Social Science</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>

            {/* Question Text */}
            <div>
              <label className="text-xs text-[#94A3B8] block mb-1 font-medium">
                Question Statement (Optional if clearly written in photo)
              </label>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="e.g. State Snell's law of refraction and derive expression..."
                rows={2}
                className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#06B6D4]"
              />
            </div>

            {/* Marks Selector */}
            <div>
              <label className="text-xs text-[#94A3B8] block mb-1 font-medium">Maximum Marks for this Question</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMaxMarks(m)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                      maxMarks === m
                        ? 'bg-[#06B6D4] text-black shadow-lg shadow-[#06B6D4]/30'
                        : 'bg-[#0C1330] text-[#94A3B8] hover:text-white border border-white/10'
                    }`}
                  >
                    {m}M
                  </button>
                ))}
              </div>
            </div>

            {/* Image Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#06B6D4]/40 hover:border-[#06B6D4] bg-[#0C1330]/50 hover:bg-[#0C1330] rounded-2xl p-6 text-center cursor-pointer transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {imagePreview ? (
                <div className="space-y-3">
                  <img
                    src={imagePreview}
                    alt="Uploaded Answer"
                    className="max-h-56 mx-auto rounded-lg border border-white/10 object-contain shadow-md"
                  />
                  <p className="text-xs text-[#67E8F9] font-medium group-hover:underline">Click to change photo</p>
                </div>
              ) : (
                <div className="space-y-3 py-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#06B6D4]/20 flex items-center justify-center text-[#67E8F9]">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Click to upload answer photo</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">Mobile camera snap or image file (JPG / PNG)</p>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleEvaluate}
                disabled={loading}
                className="w-full btn-gradient py-3.5 rounded-xl font-bold text-white shadow-xl hover:shadow-[#06B6D4]/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Evaluating Against CBSE Rubric...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                    <span>Evaluate My Answer Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleLoadSample}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-[#C4B5FD] transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C4B5FD]" />
                <span>Try Instant Sample Evaluation (0s)</span>
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Evaluation Report */}
        <div className="lg:col-span-7">
          {evaluation ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#080D24] border border-[rgba(140,120,255,0.3)] shadow-2xl space-y-6">
              
              {/* Score Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#67E8F9]">
                    CBSE Examiner Scorecard
                  </span>
                  <h3 className="text-2xl font-black text-white mt-0.5">
                    Evaluation Result
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1">{evaluation.overallVerdict}</p>
                </div>
                <div className="px-5 py-3 rounded-2xl bg-[#0C1330] border border-[#06B6D4]/40 flex items-baseline gap-1 text-center shrink-0">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5EE7FF] to-[#8C78FF]">
                    {evaluation.totalMarksAwarded}
                  </span>
                  <span className="text-base text-[#94A3B8] font-bold">/ {evaluation.maxMarks}</span>
                </div>
              </div>

              {/* Step-by-step breakdown */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#67E8F9]" />
                  <span>Step-Wise Mark Breakdown (CBSE Rubric)</span>
                </h4>
                <div className="space-y-2.5">
                  {evaluation.stepBreakdown?.map((step, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{step.stepTitle}</span>
                        <span className="font-mono font-bold text-[#67E8F9]">
                          {step.marksAwarded} / {step.maxMarksForStep} Marks
                        </span>
                      </div>
                      <p className="text-xs text-[#94A3B8]">{step.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deductions & Mistakes */}
              {evaluation.deductionsAndMistakes?.length > 0 && (
                <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>Where You Lost Marks (CBSE Examiner Deduction)</span>
                  </h4>
                  <ul className="text-xs text-red-200/90 space-y-1 list-disc list-inside">
                    {evaluation.deductionsAndMistakes.map((ded, i) => (
                      <li key={i}>{ded}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ideal Model Answer */}
              <div className="p-4 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/30 space-y-2">
                <h4 className="text-xs font-bold text-[#67E8F9] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Official 100/100 CBSE Model Answer</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed whitespace-pre-line">
                  {evaluation.cbseModelAnswer}
                </p>
              </div>

              {/* Examiner Pro Tip */}
              {evaluation.examinerProTip && (
                <div className="p-4 rounded-xl bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 space-y-1">
                  <span className="text-xs font-bold font-mono text-[#C4B5FD] uppercase tracking-wider">
                    Examiner Secret Pro-Tip
                  </span>
                  <p className="text-xs text-[#DDD6FE] leading-relaxed">
                    {evaluation.examinerProTip}
                  </p>
                </div>
              )}

              {/* Student Transcription Accordion */}
              {evaluation.studentTranscription && (
                <div className="pt-2 border-t border-white/10">
                  <details className="text-xs text-[#94A3B8] cursor-pointer">
                    <summary className="font-semibold hover:text-white">View Detected Handwritten Text</summary>
                    <p className="mt-2 p-3 rounded-lg bg-[#0C1330] text-[#CBD5E1] font-mono leading-relaxed">
                      {evaluation.studentTranscription}
                    </p>
                  </details>
                </div>
              )}

            </div>
          ) : (
            <div className="h-full min-h-[460px] rounded-2xl bg-[#080D24]/50 border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#94A3B8]">
                <FileText className="w-8 h-8" />
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-lg font-bold text-white">No Evaluation Report Yet</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8]">
                  Upload a photo of your handwritten board answer sheet on the left or click <strong className="text-[#67E8F9]">"Try Instant Sample Evaluation"</strong> to see how step-marking works.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
