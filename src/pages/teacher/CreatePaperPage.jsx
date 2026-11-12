import { supabase } from '../../services/supabaseClient';
﻿import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Printer, RefreshCw, AlertCircle, FileText, ShieldAlert, Award, 
  Building2, ChevronRight, CheckSquare, Zap, Check, FileCheck, BookCheck,
  CheckCircle2, BarChart3, Grid3X3
} from 'lucide-react';
import { generateQuestionPaper } from '../../services/geminiService';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import PaperCanvas from './PaperCanvas';
import TabInstructions from './TabInstructions';


const SAMPLE_PAPER = {
  examDetails: {
    instituteName: "Bright Future Classes",
    title: "Class 10 Board Assessment - Science",
    subject: "Science",
    grade: "Class 10",
    chapter: "Chemical Reactions and Equations",
    maxMarks: 40,
    duration: "90 Minutes",
    generalInstructions: [
      "All questions are compulsory.",
      "Section A contains 10 objective questions of 1 mark each.",
      "Section B contains 4 short answer questions of 2 marks each.",
      "Section C contains 4 short answer questions of 3 marks each.",
      "Use of calculators is strictly prohibited."
    ]
  },
  sections: [
    {
      sectionName: "SECTION A (Objective / MCQs - 1 Mark Each)",
      type: "MCQ",
      questions: [
        {
          qNumber: 1,
          questionText: "Which of the following is a chemical displacement reaction?",
          options: [
            "A) MgO + H2O -> Mg(OH)2",
            "B) Fe + CuSO4 -> FeSO4 + Cu",
            "C) 2KClO3 -> 2KCl + 3O2",
            "D) 2H2 + O2 -> 2H2O"
          ],
          marks: 1,
          correctAnswer: "B) Fe + CuSO4 -> FeSO4 + Cu",
          markingScheme: "1 mark for correct identification of single displacement."
        },
        {
          qNumber: 2,
          questionText: "What gas is evolved when dilute hydrochloric acid is added to reactive iron metal?",
          options: [
            "A) Hydrogen gas",
            "B) Chlorine gas",
            "C) Nitrogen dioxide",
            "D) Carbon dioxide"
          ],
          marks: 1,
          correctAnswer: "A) Hydrogen gas",
          markingScheme: "1 mark for correct deduction."
        }
      ]
    },
    {
      sectionName: "SECTION B (Short Answer - 2 Marks Each)",
      type: "Short",
      questions: [
        {
          qNumber: 3,
          questionText: "Why do we apply oil or paint on iron articles? Explain the chemistry of rust prevention.",
          options: [],
          marks: 2,
          correctAnswer: "Paint acts as an impermeable barrier against atmospheric oxygen and moisture, preventing redox corrosion.",
          markingScheme: "1 mark for barrier explanation, 1 mark for chemical redox prevention."
        },
        {
          qNumber: 4,
          questionText: "Write balanced chemical equations with state symbols for thermal decomposition of limestone.",
          options: [],
          marks: 2,
          correctAnswer: "CaCO3 (s) --(Heat)--> CaO (s) + CO2 (g)",
          markingScheme: "1 mark for correct formula, 1 mark for state symbols and balancing."
        }
      ]
    }
  ]
};

// Deterministic Anti-Cheating Set Shuffling Algorithm
function getShuffledPaper(basePaper, setCode) {
  if (!basePaper || !basePaper.sections || setCode === 'Set A') {
    return basePaper;
  }

  // Clone deeply to prevent mutating original Set A
  const cloned = JSON.parse(JSON.stringify(basePaper));

  let globalQuestionCounter = 1;

  cloned.sections = cloned.sections.map((section) => {
    let qList = [...(section.questions || [])];
    const len = qList.length;

    if (len > 1) {
      if (setCode === 'Set B') {
        // Shift questions: Move first half to end
        const mid = Math.floor(len / 2);
        const firstHalf = qList.slice(0, mid);
        const secondHalf = qList.slice(mid);
        qList = [...secondHalf, ...firstHalf];
      } else if (setCode === 'Set C') {
        // Reverse questions order for Set C
        qList = qList.reverse();
      }
    }

    // Helper: strip option label (e.g., "A) 25 cm" -> "25 cm")
    const cleanText = (txt) => (txt || '').toString().replace(/^[A-D]\)\s*/i, '').trim();

    // Shuffle MCQ Options and accurately remap answerKey
    qList = qList.map((q) => {
      let opts = q.options ? [...q.options] : [];
      let updatedAnswerKey = q.answerKey;

      if (opts.length >= 4) {
        // Find clean target text of current correct answer
        const rawKeyText = cleanText(q.answerKey);

        const optTexts = opts.map(o => cleanText(o));

        if (setCode === 'Set B') {
          // Permutation for Set B: indices [2, 3, 0, 1]
          opts = [
            `A) ${optTexts[2] || optTexts[0]}`,
            `B) ${optTexts[3] || optTexts[1]}`,
            `C) ${optTexts[0] || optTexts[2]}`,
            `D) ${optTexts[1] || optTexts[3]}`
          ];
        } else if (setCode === 'Set C') {
          // Permutation for Set C: indices [1, 3, 0, 2]
          opts = [
            `A) ${optTexts[1] || optTexts[0]}`,
            `B) ${optTexts[3] || optTexts[1]}`,
            `C) ${optTexts[0] || optTexts[2]}`,
            `D) ${optTexts[2] || optTexts[3]}`
          ];
        }

        // Accurately remap answerKey to point to the new shuffled option
        if (rawKeyText) {
          const matchedOpt = opts.find(o => cleanText(o).toLowerCase() === rawKeyText.toLowerCase());
          if (matchedOpt) {
            updatedAnswerKey = matchedOpt;
          }
        }
      }

      return {
        ...q,
        qNumber: globalQuestionCounter++,
        options: opts,
        answerKey: updatedAnswerKey
      };
    });

    return {
      ...section,
      questions: qList
    };
  });

  return cloned;
}

export default function CreatePaperPage() {
  const { user, coachingSubscription } = useAuth();
  

  const instituteTitle = user?.user_metadata?.full_name 
    ? `${user.user_metadata.full_name}'s Academy` 
    : 'Bright Future Classes';

  const [activeTab, setActiveTab] = useState('generator');

  const [formData, setFormData] = useState({
    coachingName: instituteTitle,
    subHeader: 'CBSE Excellence Test Series 2025-26',
    contactInfo: 'Ph: +91 98765 43210 | Main Campus',
    watermarkText: 'BRIGHT FUTURE',
    grade: 'Class 10',
    subject: 'Science',
    chapter: 'Chemical Reactions and Equations',
    maxMarks: 40,
    duration: '90 Minutes',
    difficulty: 'Moderate (Board Standard)',
  });

  const [loading, setLoading] = useState(false);
  const [paperData, setPaperData] = useState(null);
  const [error, setError] = useState('');
  const [activeSet, setActiveSet] = useState('Set A');

  // Dynamically compute real shuffled paper based on Set A, B, or C
  const currentSetPaperData = useMemo(() => {
    return getShuffledPaper(paperData, activeSet);
  }, [paperData, activeSet]);
  const [copied, setCopied] = useState(false);

  const subjectsByGrade = {
    'Class 10': ['Science', 'Mathematics (Standard)', 'Mathematics (Basic)', 'Social Science', 'English Language & Lit.'],
    'Class 12': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Accountancy', 'Economics', 'Business Studies']
  };

  const applyPreset = (marks, duration, diff) => {
    setFormData(prev => ({
      ...prev,
      maxMarks: marks,
      duration: duration,
      difficulty: diff
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxMarks' ? Number(value) : value,
      ...(name === 'grade' ? { subject: (subjectsByGrade[value] || subjectsByGrade['Class 10'] || [])[0] || 'Science' } : {})
    }));
  };

  const handleGenerate = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');

    try {
      const generated = await generateQuestionPaper(formData);
      setPaperData(generated);

      // 1. SAVE TO COACHING PRIVATE VAULT (localStorage + Supabase)
      const storageKey = `pg_papers_${user?.id || user?.email || 'guest'}`;
      const paperRecord = {
        id: 'pg_' + Date.now(),
        title: `${formData.grade} ${formData.subject} - ${formData.chapter || 'Assessment'}`,
        grade: formData.grade,
        subject: formData.subject,
        chapter: formData.chapter,
        maxMarks: formData.maxMarks,
        createdAt: new Date().toISOString(),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        paperData: generated,
        formData: formData
      };

      try {
        const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
        localStorage.setItem(storageKey, JSON.stringify([paperRecord, ...existing]));
      } catch (saveErr) {
        console.warn('LocalStorage save warning:', saveErr);
      }

      // 2. STORE ANSWER KEY FOR INSTANT SMARTPHONE QR CODE VERIFICATION
      const paperSlug = `${(formData.subject || 'cbse-paper').toLowerCase().replace(/\s+/g, '-')}-${(formData.grade || '10').replace(/\s+/g, '')}`;
      try {
        localStorage.setItem('pg_verify_' + paperSlug, JSON.stringify({
          title: paperRecord.title,
          grade: formData.grade,
          subject: formData.subject,
          activeSet: activeSet || 'Set A',
          sections: generated.sections || [],
          examDetails: generated.examDetails || {}
        }));
      } catch (qrErr) {}

      // 3. DEDUCT QUOTA (Atomic Supabase RPC or User Quotas Table)
      if (user?.email) {
        try {
          await supabase.rpc('consume_user_quota', { p_user_id: user.id });
        } catch (rpcErr) {
          try {
            const { data: qData } = await supabase
              .from('user_quotas')
              .select('quota_remaining, papers_generated_this_month')
              .eq('email', user.email.toLowerCase())
              .maybeSingle();

            if (qData) {
              await supabase
                .from('user_quotas')
                .update({
                  quota_remaining: Math.max(0, (qData.quota_remaining ?? 2) - 1),
                  papers_generated_this_month: (qData.papers_generated_this_month ?? 0) + 1,
                  updated_at: new Date().toISOString()
                })
                .eq('email', user.email.toLowerCase());
            }
          } catch (qErr) {
            console.warn('Quota update sync warning:', qErr);
          }
        }
      }

    } catch (err) {
      setError(err.message || 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    setPaperData(SAMPLE_PAPER);
    setError('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    if (!paperData) return;
    let text = `${formData.coachingName}\n${formData.subHeader}\n${paperData.examDetails.title} (${activeSet})\nMax Marks: ${paperData.examDetails.maxMarks} | Time: ${paperData.examDetails.duration}\n\n`;
    (currentSetPaperData || paperData).sections.forEach(sec => {
      text += `\n--- ${sec.sectionName} ---\n`;
      sec.questions.forEach(q => {
        text += `\nQ${q.qNumber}. ${q.questionText} [${q.marks} Mark]\n`;
        if (q.options?.length) {
          text += q.options.join('\n') + '\n';
        }
      });
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] py-8 px-4 sm:px-6 lg:px-8">
      
      {/* 1. TOP DASHBOARD CONTROL BAR */}
      <div className="max-w-7xl mx-auto mb-8 print:hidden">
        <div className="bg-[#0B1020] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-mono text-[#94A3B8]">
                <Link to="/" className="hover:text-white transition">Home</Link>
                <ChevronRight className="w-4 h-4 text-[#7C3CFF]" />
                <span className="text-[#5EE7FF] font-semibold">Coaching Command Center</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {formData.coachingName}
                </h1>

                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#7C3CFF]/20 text-[#C4B5FD] border border-[#7C3CFF]/40 shadow-sm">
                  <Building2 className="w-4 h-4 text-[#C4B5FD]" />
                  <span>Verified Coaching Institute</span>
                </span>

                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>CBSE AI Engine: Ready</span>
                </span>
              </div>
            </div>

            {paperData && (
              <div className="flex items-center gap-3 lg:self-center">
                <button
                  onClick={handlePrint}
                  className="px-6 py-3.5 rounded-xl text-base font-bold bg-gradient-to-r from-[#5EE7FF] to-[#22D3EE] hover:opacity-95 text-[#050814] flex items-center justify-center gap-2.5 shadow-xl shadow-[#5EE7FF]/25 transition-all cursor-pointer"
                >
                  <Printer className="w-5 h-5" />
                  <span>Print Clean A4 PDF</span>
                </button>
              </div>
            )}
          </div>

          {/* 6 Feature Badges */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2.5">
            {[
              { label: 'CBSE 2025-26 Pattern', color: 'text-[#5EE7FF] border-[#5EE7FF]/30 bg-[#5EE7FF]/5' },
              { label: 'Anti-Cheat Sets (A/B/C)', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5' },
              { label: 'Watermark & White-Label', color: 'text-amber-400 border-amber-500/30 bg-amber-500/5' },
              { label: 'Step-Wise Marking Rubric', color: 'text-pink-400 border-pink-500/30 bg-pink-500/5' },
              { label: 'NCERT Curriculum Strict', color: 'text-[#C4B5FD] border-[#7C3CFF]/30 bg-[#7C3CFF]/5' },
              { label: '1-Click A4 Print PDF', color: 'text-white border-white/20 bg-white/5' }
            ].map((tag, idx) => (
              <span
                key={idx}
                className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl border flex items-center gap-2 ${tag.color}`}
              >
                <Check className="w-4 h-4 shrink-0" />
                <span>{tag.label}</span>
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* 2. MAIN WORKSPACE */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT SIDEBAR */}
        <div className="lg:col-span-5 print:hidden space-y-6">

          {/* Tabs */}
          <div className="bg-[#0B1020] border border-white/10 rounded-2xl p-3 shadow-xl space-y-2">
            <button
              onClick={() => setActiveTab('generator')}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-base font-bold transition-all text-left cursor-pointer ${
                activeTab === 'generator'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#2563EB] text-white shadow-lg shadow-[#7C3CFF]/30'
                  : 'text-[#A8B0C8] hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-6 h-6 shrink-0 text-[#5EE7FF]" />
              <div className="flex-1">
                <div className="text-base font-bold text-white">AI Paper Generator</div>
                <div className="text-xs font-normal opacity-85 mt-0.5">Class, chapters & exam pattern setup</div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('branding')}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-base font-bold transition-all text-left cursor-pointer ${
                activeTab === 'branding'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#2563EB] text-white shadow-lg shadow-[#7C3CFF]/30'
                  : 'text-[#A8B0C8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-6 h-6 shrink-0 text-amber-400" />
              <div className="flex-1">
                <div className="text-base font-bold text-white">Coaching Branding</div>
                <div className="text-xs font-normal opacity-85 mt-0.5">Custom header, watermark & contacts</div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('anticheat')}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-base font-bold transition-all text-left cursor-pointer ${
                activeTab === 'anticheat'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#2563EB] text-white shadow-lg shadow-[#7C3CFF]/30'
                  : 'text-[#A8B0C8] hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldAlert className="w-6 h-6 shrink-0 text-emerald-400" />
              <div className="flex-1">
                <div className="text-base font-bold text-white">Anti-Cheat Sets (A/B/C)</div>
                <div className="text-xs font-normal opacity-85 mt-0.5">Instant question shuffling & leak prevention</div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('solutions')}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-base font-bold transition-all text-left cursor-pointer ${
                activeTab === 'solutions'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#2563EB] text-white shadow-lg shadow-[#7C3CFF]/30'
                  : 'text-[#A8B0C8] hover:text-white hover:bg-white/5'
              }`}
            >
              <CheckSquare className="w-6 h-6 shrink-0 text-pink-400" />
              <div className="flex-1">
                <div className="text-base font-bold text-white">Marking Rubric & Key</div>
                <div className="text-xs font-normal opacity-85 mt-0.5">Step-by-step CBSE marking points</div>
              </div>
            </button>
                        <button
              onClick={() => setActiveTab('blueprint')}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-base font-bold transition-all text-left cursor-pointer ${
                activeTab === 'blueprint'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#2563EB] text-white shadow-lg shadow-[#7C3CFF]/30'
                  : 'text-[#A8B0C8] hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-6 h-6 shrink-0 text-cyan-400" />
              <div className="flex-1">
                <div className="text-base font-bold text-white">CBSE Blueprint</div>
                <div className="text-xs font-normal opacity-85 mt-0.5">Marks weightage & question typology</div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('omr')}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-base font-bold transition-all text-left cursor-pointer ${
                activeTab === 'omr'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#2563EB] text-white shadow-lg shadow-[#7C3CFF]/30'
                  : 'text-[#A8B0C8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Grid3X3 className="w-6 h-6 shrink-0 text-indigo-400" />
              <div className="flex-1">
                <div className="text-base font-bold text-white">OMR Sheet Generator</div>
                <div className="text-xs font-normal opacity-85 mt-0.5">Printable bubble response sheet</div>
              </div>
            </button>

          </div>

          {/* Active Tab Panel */}
          <div className="bg-[#0B1020] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-xl">

            {activeTab === 'generator' && (
              <form onSubmit={handleGenerate} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A8B0C8] mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" /> 1-Click Exam Presets
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => applyPreset(20, '45 Minutes', 'Easy (Revision Focus)')}
                      className="px-3 py-2.5 rounded-xl bg-[#050814] border border-white/10 hover:border-[#7C3CFF] text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer text-center"
                    >
                      Unit Test<br/><span className="text-amber-400 font-bold text-sm">20M</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(40, '90 Minutes', 'Moderate (Board Standard)')}
                      className="px-3 py-2.5 rounded-xl bg-[#050814] border border-white/10 hover:border-[#7C3CFF] text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer text-center"
                    >
                      Periodic<br/><span className="text-[#5EE7FF] font-bold text-sm">40M</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(80, '180 Minutes', 'Tough / Topper Level')}
                      className="px-3 py-2.5 rounded-xl bg-[#050814] border border-white/10 hover:border-[#7C3CFF] text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer text-center"
                    >
                      Pre-Board<br/><span className="text-emerald-400 font-bold text-sm">80M</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-1.5">Class</label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#7C3CFF] outline-none"
                    >
                      <option value="Class 10">Class 10</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-1.5">Max Marks</label>
                    <select
                      name="maxMarks"
                      value={formData.maxMarks}
                      onChange={handleInputChange}
                      className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#7C3CFF] outline-none"
                    >
                      <option value={20}>20 Marks (Unit Test)</option>
                      <option value={40}>40 Marks (Periodic Test)</option>
                      <option value={80}>80 Marks (Pre-Board Full)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-1.5">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#7C3CFF] outline-none"
                  >
                    {(subjectsByGrade[formData.grade] || subjectsByGrade['Class 10'] || []).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-1.5">Chapter / Topics</label>
                  <input
                    type="text"
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleInputChange}
                    placeholder="e.g. Chemical Reactions and Equations"
                    required
                    className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#7C3CFF] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-1.5">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#7C3CFF] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-1.5">Difficulty</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#7C3CFF] outline-none"
                    >
                      <option value="Moderate (Board Standard)">Board Standard</option>
                      <option value="Tough / Topper Level">Tough (HOTS)</option>
                      <option value="Easy (Revision Focus)">Easy (Revision)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#7C3CFF] via-[#2563EB] to-[#06B6D4] hover:opacity-90 disabled:opacity-50 text-white font-extrabold py-4 px-5 rounded-xl shadow-xl shadow-[#7C3CFF]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer text-base mt-4"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Generating CBSE Paper via AI Engine...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-[#5EE7FF]" />
                      <span>1-Click Generate Question Paper</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {activeTab === 'branding' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 pb-2 border-b border-white/10">
                  <Award className="w-5 h-5" /> Coaching Identity & Header
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-1.5">Coaching Center Name</label>
                  <input
                    type="text"
                    name="coachingName"
                    value={formData.coachingName}
                    onChange={handleInputChange}
                    className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#7C3CFF] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-1.5">Sub-Header / Tagline</label>
                  <input
                    type="text"
                    name="subHeader"
                    value={formData.subHeader}
                    onChange={handleInputChange}
                    className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#7C3CFF] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-1.5">Contact / Address Info</label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#7C3CFF] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-1.5">Paper Background Watermark</label>
                  <input
                    type="text"
                    name="watermarkText"
                    value={formData.watermarkText}
                    onChange={handleInputChange}
                    className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#7C3CFF] outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'anticheat' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 pb-2 border-b border-white/10">
                  <ShieldAlert className="w-5 h-5" /> Anti-Cheating Technology
                </h3>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  PaperGenius generates synchronized sets (Set A, B, C) with shuffled question order so adjacent students cannot copy answers.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  {['Set A', 'Set B', 'Set C'].map((set) => (
                    <button
                      key={set}
                      type="button"
                      onClick={() => setActiveSet(set)}
                      className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border cursor-pointer ${
                        activeSet === set
                          ? 'bg-[#7C3CFF] text-white border-[#7C3CFF] shadow-lg shadow-[#7C3CFF]/30'
                          : 'bg-[#050814] text-[#94A3B8] border-white/10 hover:text-white'
                      }`}
                    >
                      {set}
                    </button>
                  ))}
                </div>

                <div className="bg-[#050814] border border-emerald-500/20 p-4 rounded-xl text-sm space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Dynamic Cloud Anti-Leak Active</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Active Print Mode: <strong className="text-white">{activeSet}</strong>. Options and question indices are mathematically tracked for fast evaluation.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'solutions' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-pink-400 flex items-center gap-2 pb-2 border-b border-white/10">
                  <CheckSquare className="w-5 h-5" /> CBSE Step Marking Scheme
                </h3>

                {paperData ? (
                  <div className="max-h-[420px] overflow-y-auto space-y-3 pr-1 text-sm">
                    {paperData.sections?.map((sec, sIdx) => (
                      <div key={sIdx} className="bg-[#050814] border border-white/10 p-4 rounded-xl space-y-2.5">
                        <span className="font-bold text-[#5EE7FF] text-sm">{sec.sectionName}</span>
                        {sec.questions?.map((q, qIdx) => (
                          <div key={qIdx} className="border-t border-white/5 pt-2 text-xs">
                            <p className="font-semibold text-white">
                              Q{q.qNumber}. Ans: <span className="text-emerald-400">{q.correctAnswer || q.answerKey || q.answer || 'Refer to model solution'}</span>
                            </p>
                            <p className="text-[#94A3B8] mt-0.5">Scheme: {q.markingScheme || q.stepMarking || (`Full ${q.marks || 1} mark(s) awarded for accurate step derivation/option.`)}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-[#94A3B8] py-12 text-center bg-[#050814] rounded-xl border border-dashed border-white/10">
                    Generate a paper first to view step-wise answer key and marking rubric.
                  </div>
                )}
              </div>
            )}
                        {activeTab === 'blueprint' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 pb-2 border-b border-white/10">
                  <BarChart3 className="w-5 h-5" /> CBSE Exam Blueprint & Typology
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-[#050814] p-3.5 rounded-xl border border-white/10 flex justify-between items-center">
                    <span className="text-slate-300">Remembering & Understanding</span>
                    <span className="font-bold text-[#5EE7FF]">~35% (Direct NCERT)</span>
                  </div>
                  <div className="bg-[#050814] p-3.5 rounded-xl border border-white/10 flex justify-between items-center">
                    <span className="text-slate-300">Applying & Numerical Analysis</span>
                    <span className="font-bold text-amber-400">~40% (Application)</span>
                  </div>
                  <div className="bg-[#050814] p-3.5 rounded-xl border border-white/10 flex justify-between items-center">
                    <span className="text-slate-300">HOTS / Evaluating & Creating</span>
                    <span className="font-bold text-emerald-400">~25% (Topper Level)</span>
                  </div>
                </div>

                <div className="p-3 bg-[#050814] rounded-xl border border-cyan-500/20 text-xs text-[#94A3B8]">
                  Target Exam: <strong className="text-white">{formData.grade} {formData.subject}</strong> | Total Marks: <strong className="text-white">{formData.maxMarks}</strong>
                </div>
              </div>
            )}

            {activeTab === 'omr' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2 pb-2 border-b border-white/10">
                  <Grid3X3 className="w-5 h-5" /> 1-Click Printable OMR Response Sheet
                </h3>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Generate matching 4-option (A, B, C, D) bubble response sheets formatted for your coaching tests.
                </p>

                <div className="p-4 bg-[#050814] rounded-xl border border-indigo-500/30 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Target Questions:</span>
                    <span className="font-bold text-white">{formData.maxMarks <= 20 ? '10 Questions' : formData.maxMarks <= 40 ? '20 Questions' : '40 Questions'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Sheet Format:</span>
                    <span className="font-bold text-[#5EE7FF]">Compact Half A4 / Full A4</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="w-full mt-2 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Matching OMR Sheet</span>
                  </button>
                </div>
              </div>
            )}


          </div>

        {/* Dynamic Tab-Specific Instructions Card */}
<TabInstructions activeTab={activeTab} />


          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Error</p>
                <p className="text-xs opacity-85 mt-0.5">{error}</p>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: LIVE CANVAS */}
        <div className="lg:col-span-7">
          {paperData ? (
            <PaperCanvas
              paperData={currentSetPaperData}
              formData={formData}
              activeSet={activeSet}
              copied={copied}
              onCopyText={handleCopyText}
              onPrint={handlePrint}
            />
          ) : (
            <div className="h-full min-h-[520px] rounded-2xl border-2 border-dashed border-white/10 bg-[#0B1020]/40 flex flex-col items-center justify-center p-8 sm:p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#7C3CFF]/20 to-[#5EE7FF]/20 border border-[#5EE7FF]/30 text-[#5EE7FF] flex items-center justify-center mb-5 shadow-2xl">
                <FileText className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white">PaperGenius Coaching Command Center</h3>
              <p className="text-sm text-[#94A3B8] max-w-lg mt-2 leading-relaxed">
                Select your Class, Subject, and Exam Pattern on the left sidebar to generate a fresh CBSE paper with AI. Or load an instant pre-cached sample below.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold bg-[#7C3CFF] hover:bg-[#6D28D9] text-white flex items-center gap-2 shadow-xl shadow-[#7C3CFF]/30 transition-all cursor-pointer"
                >
                  <FileCheck className="w-5 h-5 text-[#5EE7FF]" />
                  <span>⚡ Load Instant Sample Paper (0s Preview)</span>
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5 justify-center">
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#A8B0C8]">
                  Class 10 & 12 Pre-Board
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#A8B0C8]">
                  Set A/B/C Shuffling
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#A8B0C8]">
                  Clean A4 White PDF
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

