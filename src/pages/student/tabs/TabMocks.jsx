import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, FileText, CheckCircle2, Lock, ArrowRight, Camera } from 'lucide-react';

export default function TabMocks({ selectedGrade, selectedSubject, isUnlocked, onGoToEvaluator }) {
  const [mockRunning, setMockRunning] = useState(false);
  const [mockTimeLeft, setMockTimeLeft] = useState(3 * 60 * 60); // 3 Hours in seconds
  const [activePaper, setActivePaper] = useState(null);

  // 3-Hour Timer Countdown
  useEffect(() => {
    let timer = null;
    if (mockRunning && mockTimeLeft > 0) {
      timer = setInterval(() => setMockTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [mockRunning, mockTimeLeft]);

  const formatTimer = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Curated 80-Mark Real CBSE Mock Papers based on selected subject
  const getSubjectMockPaper = (subj) => {
    const s = subj.toLowerCase();
    if (s.includes('science')) {
      return {
        title: `${selectedGrade} Science Full-Length Pre-Board Mock 1`,
        duration: '3 Hours',
        maxMarks: 80,
        instructions: [
          'Question paper consists of 39 questions in 5 sections.',
          'Section A: Q1 to Q20 are MCQs carrying 1 mark each.',
          'Section B: Q21 to Q26 are Short Answer (SA-I) type carrying 2 marks each.',
          'Section C: Q27 to Q33 are Short Answer (SA-II) type carrying 3 marks each.',
          'Section D: Q34 to Q36 are Long Answer (LA) type carrying 5 marks each.',
          'Section E: Q37 to Q39 are 3 Case-Based units of assessment of 4 marks each.'
        ],
        sections: [
          {
            sectionName: 'SECTION A (Objective Questions - 1 Mark each)',
            questions: [
              'Q1. An aqueous solution turns red litmus solution blue. Excess addition of which solution would reverse the change? (A) Baking powder (B) Lime (C) Ammonium hydroxide (D) Hydrochloric acid',
              'Q2. Identify the reducing agent in the reaction: Fe2O3 + 3 CO -> 2 Fe + 3 CO2.',
              'Q3. Which of the following is an endothermic process? (A) Dilution of sulphuric acid (B) Sublimation of dry ice (C) Condensation of water vapours (D) Respiration in human body'
            ]
          },
          {
            sectionName: 'SECTION B (Short Answer I - 2 Marks each)',
            questions: [
              'Q21. Why does the flow of acid rain water into a river make the survival of aquatic life in the river difficult?',
              'Q22. Name the plant hormone responsible for: (i) elongation of cells (ii) wilting of leaves.'
            ]
          },
          {
            sectionName: 'SECTION C (Short Answer II - 3 Marks each)',
            questions: [
              'Q27. Write balanced chemical equations for: (i) Dilute hydrochloric acid reacts with calcium carbonate (ii) Lead nitrate is heated (iii) Zinc reacts with sodium hydroxide.',
              'Q28. State Snell\'s Law of refraction. If refractive index of water is 4/3 and glass is 3/2, find refractive index of glass with respect to water.'
            ]
          },
          {
            sectionName: 'SECTION D (Long Answer - 5 Marks each)',
            questions: [
              'Q34. (a) Draw ray diagram showing refraction through a convex lens when object is between F1 and 2F1. (b) A 4 cm tall object is placed perpendicular to the principal axis of a convex lens of focal length 20 cm. If distance of object from lens is 15 cm, find position, nature, and size of the image.'
            ]
          },
          {
            sectionName: 'SECTION E (Case-Based Integrated Assessment - 4 Marks)',
            questions: [
              'Q37. Case Study (Electricity & Resistance): A copper wire of length L and uniform cross-sectional area A has resistance R. Answer: (i) How will resistance change if wire is stretched to double its length? (ii) What happens to resistivity? (iii) Name two factors on which resistivity depends.'
            ]
          }
        ]
      };
    } else if (s.includes('math')) {
      return {
        title: `${selectedGrade} Mathematics Standard Full-Length Mock 1`,
        duration: '3 Hours',
        maxMarks: 80,
        instructions: [
          'Section A: 20 Multiple Choice Questions (MCQs) of 1 mark each.',
          'Section B: 5 Short Answer Questions (SA-I) of 2 marks each.',
          'Section C: 6 Short Answer Questions (SA-II) of 3 marks each.',
          'Section D: 4 Long Answer Questions (LA) of 5 marks each.',
          'Section E: 3 Case Based integrated units of 4 marks each with sub-parts.'
        ],
        sections: [
          {
            sectionName: 'SECTION A (MCQs - 1 Mark each)',
            questions: [
              'Q1. If two positive integers a and b are written as a = x³y² and b = xy³, where x, y are prime numbers, then HCF(a, b) is: (A) xy (B) xy² (C) x³y³ (D) x²y²',
              'Q2. The discriminant of quadratic equation 2x² - 4x + 3 = 0 is: (A) -8 (B) 10 (C) -16 (D) 8'
            ]
          },
          {
            sectionName: 'SECTION B & C (2M & 3M Questions)',
            questions: [
              'Q21. Prove that 3 + 2√5 is an irrational number.',
              'Q26. Find the zeroes of quadratic polynomial 6x² - 3 - 7x and verify the relationship between zeroes and coefficients.'
            ]
          },
          {
            sectionName: 'SECTION D (5 Marks - Derivations & Proofs)',
            questions: [
              'Q32. State and prove Basic Proportionality Theorem (Thales Theorem).'
            ]
          }
        ]
      };
    } else {
      return {
        title: `${selectedGrade} ${subj} Official Pre-Board Mock 1`,
        duration: '3 Hours',
        maxMarks: 80,
        instructions: [
          'Read all questions carefully.',
          'All sections are compulsory as per latest CBSE Board Blueprint.'
        ],
        sections: [
          {
            sectionName: 'SECTION A & B (Objective & Short Answers)',
            questions: [
              `Q1. Define core principles and state the fundamental law applicable to ${subj}.`,
              `Q2. Differentiate between primary and secondary classifications in ${subj}.`
            ]
          },
          {
            sectionName: 'SECTION C & D (Detailed Analysis & Case Studies)',
            questions: [
              `Q3. Explain the full step-by-step mechanism and provide diagrams/derivations for ${subj}.`,
              `Q4. Analyze the board case study problem and evaluate the final outcome.`
            ]
          }
        ]
      };
    }
  };

  const handleStartExam = (mockObj) => {
    setActivePaper(mockObj);
    setMockRunning(true);
    setMockTimeLeft(3 * 60 * 60);
  };

  if (!isUnlocked) {
    return (
      <div className="p-10 rounded-2xl bg-[#080D24] border border-red-500/30 text-center space-y-4">
        <Lock className="w-12 h-12 text-red-400 mx-auto" />
        <h3 className="text-xl font-bold text-white">Mock Exam Simulator Locked for {selectedSubject}</h3>
        <p className="text-base text-[#94A3B8]">
          Upgrade your Board Pass to access full-length 80-mark timed mock exam simulations for this subject.
        </p>
      </div>
    );
  }

  const currentSubjectPaper = getSubjectMockPaper(selectedSubject);

  return (
    <div className="space-y-6">
      
      {/* 3-Hour Stopwatch Simulator Bar */}
      <div className="p-6 rounded-2xl bg-[#080D24] border border-[#06B6D4]/40 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-mono text-[#67E8F9] uppercase font-bold tracking-wider">
            Official 3-Hour CBSE Board Simulation (10:30 AM to 1:30 PM)
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">Full-Length Pre-Board Mock Exam</h3>
          <p className="text-sm text-[#94A3B8]">Subscribed Subject: <strong className="text-white">{selectedSubject}</strong></p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 rounded-2xl bg-[#0C1330] border border-white/10 font-mono text-2xl sm:text-3xl font-black text-[#5EE7FF] flex items-center gap-2">
            <Clock className="w-6 h-6 text-[#67E8F9]" />
            <span>{formatTimer(mockTimeLeft)}</span>
          </div>

          <button
            onClick={() => setMockRunning(!mockRunning)}
            className={`px-5 py-3 rounded-xl font-bold text-white flex items-center gap-2 text-sm sm:text-base transition-all ${
              mockRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {mockRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{mockRunning ? 'Pause' : 'Start Timer'}</span>
          </button>

          <button
            onClick={() => {
              setMockRunning(false);
              setMockTimeLeft(3 * 60 * 60);
            }}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-all"
            title="Reset 3-Hour Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* If an active mock exam is open */}
      {activePaper ? (
        <div className="p-8 rounded-2xl bg-[#080D24] border border-[#06B6D4]/50 shadow-2xl space-y-6 animate-in fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="px-3 py-1 rounded bg-[#06B6D4]/15 text-[#67E8F9] text-xs font-mono font-bold">
                {selectedGrade} • {selectedSubject}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">{activePaper.title}</h2>
              <p className="text-sm text-[#94A3B8] mt-1">Time: {activePaper.duration} | Maximum Marks: {activePaper.maxMarks}</p>
            </div>

            <button
              onClick={onGoToEvaluator}
              className="btn-gradient px-5 py-3 rounded-xl font-bold text-white text-sm flex items-center gap-2 shadow-lg"
            >
              <Camera className="w-4 h-4" />
              <span>Finished? Check Copy with AI Evaluator</span>
            </button>
          </div>

          {/* General Instructions */}
          <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-2 text-xs sm:text-sm text-[#CBD5E1]">
            <h4 className="font-bold text-white">General Instructions:</h4>
            <ul className="list-disc list-inside space-y-1">
              {activePaper.instructions.map((ins, i) => (
                <li key={i}>{ins}</li>
              ))}
            </ul>
          </div>

          {/* Exam Questions */}
          <div className="space-y-6">
            {activePaper.sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-[#67E8F9] bg-[#0C1330] p-3 rounded-xl border border-white/5">
                  {sec.sectionName}
                </h3>
                <div className="space-y-3 pl-2">
                  {sec.questions.map((q, qIdx) => (
                    <div key={qIdx} className="p-4 rounded-xl bg-[#080D24] border border-white/5 text-sm sm:text-base text-white leading-relaxed font-sans">
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-end">
            <button
              onClick={onGoToEvaluator}
              className="btn-gradient px-6 py-3.5 rounded-xl font-bold text-white text-base flex items-center gap-2 shadow-xl"
            >
              <Camera className="w-5 h-5" />
              <span>Submit Handwritten Copy to AI Examiner</span>
            </button>
          </div>

        </div>
      ) : (
        /* Mock Papers List Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { title: `${selectedGrade} Pre-Board Mock 1`, marks: 80, time: '3 Hours', difficulty: 'Official Sample Standard' },
            { title: `${selectedGrade} Pre-Board Mock 2`, marks: 80, time: '3 Hours', difficulty: 'Moderate High-Yield' },
            { title: `${selectedGrade} Pre-Board Mock 3`, marks: 80, time: '3 Hours', difficulty: 'Challenging HOTS' },
            { title: `${selectedGrade} Pre-Board Mock 4`, marks: 80, time: '3 Hours', difficulty: 'Formula & Numerical Intensive' }
          ].map((mock, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#080D24] border border-white/10 hover:border-[#06B6D4]/40 transition-all flex items-center justify-between shadow-xl">
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-[#67E8F9] font-bold">{mock.time} • {mock.marks} Marks</span>
                <h4 className="text-lg sm:text-xl font-bold text-white">{mock.title} ({selectedSubject})</h4>
                <p className="text-xs sm:text-sm text-[#94A3B8]">Difficulty Pattern: {mock.difficulty}</p>
              </div>

              <button
                onClick={() => handleStartExam(currentSubjectPaper)}
                className="btn-gradient px-5 py-3 rounded-xl font-bold text-white text-sm sm:text-base flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Exam</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
