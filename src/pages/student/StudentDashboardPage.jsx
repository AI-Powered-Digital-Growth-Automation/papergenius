import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Camera, FileText, Layers, Archive, 
  Lightbulb, User, ChevronDown, ChevronUp 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { pyqDatabase } from '../../data/pyqData';
import { previousYearsPapers } from '../../data/downloadPapersData';

// Modular Tabs
import TabBundles from './tabs/TabBundles';
import TabEvaluator from './tabs/TabEvaluator';
import TabFormulas from './tabs/TabFormulas';
import TabMocks from './tabs/TabMocks';
import TabPredictor from './tabs/TabPredictor';

const CLASS_10_SUBJECTS = [
  'Science',
  'Mathematics Standard',
  'Mathematics Basic',
  'Social Science',
  'English Language & Lit.',
  'Hindi Course A'
];

const CLASS_12_SUBJECTS = [
  'Physics',
  'Chemistry',
  'Mathematics',
  'Biology',
  'Computer Science (Python)',
  'Informatics Practices',
  'Accountancy',
  'Business Studies',
  'Economics',
  'Applied Mathematics',
  'History',
  'Political Science',
  'Geography',
  'Psychology',
  'English Core',
  'Physical Education'
];

export default function StudentDashboardPage() {
  const navigate = useNavigate();
    const { user, studentSubscription, hasSubjectAccess, consumeEvaluationQuota } = useAuth();
  
  // Strict Login Gatekeeper: If not logged in, redirect to register/login
  useEffect(() => {
    if (!user) {
      navigate('/auth', { replace: true });
    }
  }, [user, navigate]);
  
  // Grade: strictly Class 10 or Class 12
  const [selectedGrade, setSelectedGrade] = useState(studentSubscription?.grade || 'Class 10');
  const availableSubjects = selectedGrade === 'Class 10' ? CLASS_10_SUBJECTS : CLASS_12_SUBJECTS;
  const [selectedSubject, setSelectedSubject] = useState(availableSubjects[0]);
  const [activeTab, setActiveTab] = useState('pyq');
  const [showInstructions, setShowInstructions] = useState(true);

  // Sync subject when grade changes
  useEffect(() => {
    setSelectedSubject(availableSubjects[0]);
  }, [selectedGrade]);

  const isCurrentSubjectUnlocked = hasSubjectAccess(selectedSubject);

  // Filter 2022-2026 Papers
  const currentPapers = previousYearsPapers.filter(p => 
    p.grade === selectedGrade && 
    (p.subject.toLowerCase() === selectedSubject.toLowerCase() ||
     selectedSubject.toLowerCase().includes(p.subject.toLowerCase()))
  );

  // Filter Solved PYQs
  const currentPyqs = pyqDatabase.filter(p => 
    p.grade === selectedGrade && 
    (p.subject.toLowerCase() === selectedSubject.toLowerCase() ||
     selectedSubject.toLowerCase().includes(p.subject.toLowerCase()))
  );

  const studentName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';
  const studentEmail = user?.email || 'Registered Student';

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 pt-6 px-4 sm:px-6 lg:px-8 text-base">
      
      {/* 1. TOP HEADER: Profile & Subscription Status */}
      <div className="max-w-7xl mx-auto mb-6 p-6 sm:p-7 rounded-2xl bg-[#080D24] border border-[rgba(140,120,255,0.25)] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-xs sm:text-sm font-bold text-[#67E8F9] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#67E8F9]" />
              <span>{studentSubscription.plan}</span>
            </span>

            {/* Class Toggle */}
            <div className="flex bg-[#0C1330] p-1 rounded-xl border border-white/10 text-xs sm:text-sm font-bold">
              <button
                onClick={() => setSelectedGrade('Class 10')}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  selectedGrade === 'Class 10' ? 'bg-[#7C3CFF] text-white shadow' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Class 10
              </button>
              <button
                onClick={() => setSelectedGrade('Class 12')}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  selectedGrade === 'Class 12' ? 'bg-[#7C3CFF] text-white shadow' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Class 12
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <User className="w-7 h-7 text-[#67E8F9]" />
              <span>{studentName}</span>
            </h1>
            <p className="text-sm sm:text-base text-[#94A3B8] font-mono mt-0.5">{studentEmail}</p>
          </div>

          <p className="text-sm sm:text-base text-[#CBD5E1]">
            Active Subscribed Subjects: <strong className="text-[#67E8F9]">{studentSubscription.subscribedSubjects.join(', ')}</strong>
          </p>
        </div>

        {/* AI Checks Quota */}
        <div className="flex items-center gap-5 bg-[#0C1330] p-5 rounded-2xl border border-white/10 w-full md:w-auto justify-between md:justify-end shadow-inner">
          <div>
            <div className="text-xs sm:text-sm text-[#94A3B8] uppercase font-bold tracking-wider">Monthly AI Checking Quota</div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
              <span className="text-[#67E8F9]">{studentSubscription.evaluationsRemaining}</span>
              <span className="text-sm sm:text-base text-[#94A3B8] font-normal"> / {studentSubscription.maxEvaluations} Left</span>
            </div>
          </div>
          <Link to="/pricing" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-sm font-bold text-white shadow-md hover:opacity-90">
            Upgrade / Renew
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">

        {/* 2. TABS BAR & STRICT CLASS SUBJECT DROPDOWN */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-[#080D24] border border-[rgba(140,120,255,0.2)]">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'pyq', label: '1. 2022-2026 Board Bundles', icon: Archive },
              { id: 'evaluator', label: '2. AI Answer Evaluator', icon: Camera },
              { id: 'formulas', label: '3. Revision Formula Kits', icon: FileText },
              { id: 'mocks', label: '4. 3-Hour Board Mocks', icon: Layers },
              { id: 'predictor', label: '5. Percentage Predictor', icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-lg'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Strictly Filtered Subject Dropdown */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[#0C1330] rounded-xl border border-white/10 text-sm sm:text-base">
            <span className="text-[#94A3B8] font-semibold">{selectedGrade} Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub} className="bg-[#0C1330] text-white">
                  {sub} {hasSubjectAccess(sub) ? '✓ Unlocked' : '🔒 Locked'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. PERMANENT INSTRUCTIONS BOX ON EVERY TAB */}
        <div className="p-6 rounded-2xl bg-[#080D24] border border-[#06B6D4]/30 shadow-lg space-y-3">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-white">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <span>
                {activeTab === 'pyq' && `User Guide: ${selectedGrade} 2022-2026 Board Bundles & Solved PYQs`}
                {activeTab === 'evaluator' && `User Guide: AI Answer Sheet Evaluator (CBSE Step-Marking)`}
                {activeTab === 'formulas' && `User Guide: Quick-Revision 2-Page Formula & Proof Sheets`}
                {activeTab === 'mocks' && `User Guide: 3-Hour Timed CBSE Pre-Board Simulation`}
              </span>
            </div>
            {showInstructions ? <ChevronUp className="w-5 h-5 text-[#94A3B8]" /> : <ChevronDown className="w-5 h-5 text-[#94A3B8]" />}
          </button>

          {showInstructions && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:text-base text-[#CBD5E1] pt-2 leading-relaxed">
              {activeTab === 'pyq' && (
                <>
                  <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                    <strong className="text-white block">1. Download All Sets (ZIP):</strong>
                    1-Click mein Delhi + All India (Set 1, 2, 3) complete bundle local download karein.
                  </div>
                  <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                    <strong className="text-white block">2. Official Marking Scheme:</strong>
                    Button dabane par direct verified CBSE portal par examiner solutions open honge.
                  </div>
                  <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                    <strong className="text-white block">3. Solved Bank Se Practice:</strong>
                    High-frequency questions ko step-by-step likh kar practice karein.
                  </div>
                </>
              )}
              {activeTab === 'evaluator' && (
                <>
                  <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                    <strong className="text-white block">1. Flat Mobile Photo:</strong>
                    Phone ko paper ke seedha upar rakhein. Dark blue ya black pen se likhein.
                  </div>
                  <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                    <strong className="text-white block">2. Target Marks Set Karein:</strong>
                    Question 2M, 3M ya 5M ka hai, wahi button select karein rubric match ke liye.
                  </div>
                  <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                    <strong className="text-white block">3. Red Deduction Box:</strong>
                    Check karein ki number kahan kate (formula, unit, diagram) aur model answer padhein.
                  </div>
                </>
              )}
              {activeTab === 'formulas' && (
                <>
                  <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                    <strong className="text-white block">1. Morning of Exam Recap:</strong>
                    Exam hall mein entry se pehle 60 minute ke rapid revision ke liye concise sheets hain.
                  </div>
                  <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                    <strong className="text-white block">2. Subscribed Subject Only:</strong>
                    Aapne jis subject ka pass liya hai, sirf wahi high-yield kit screen par aayega.
                  </div>
                  <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                    <strong className="text-white block">3. Clean Print to PDF:</strong>
                    Open & Print dabane par dedicated white A4 modal khulega jise direct save karein.
                  </div>
                </>
              )}
              {activeTab === 'mocks' && (
                <>
                  <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                    <strong className="text-white block">1. 3-Hour Stopwatch Start:</strong>
                    "Start Exam" dabayein aur 10:30 AM slot ki tarah table-chair par baith kar solve karein.
                  </div>
                  <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                    <strong className="text-white block">2. 80-Mark Real CBSE Paper:</strong>
                    Real Section A, B, C, D aur Section E Case Studies notebook par solve karein.
                  </div>
                  <div className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                    <strong className="text-white block">3. AI Checking Sync:</strong>
                    Exam khatam hote hi "Submit to AI Evaluator" daba kar copy check karein.
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* 4. MODULAR TAB CONTENT RENDERING */}
        {activeTab === 'pyq' && (
          <TabBundles
            selectedGrade={selectedGrade}
            selectedSubject={selectedSubject}
            isUnlocked={isCurrentSubjectUnlocked}
            subscribedSubjects={studentSubscription.subscribedSubjects}
            papers={currentPapers}
            pyqs={currentPyqs}
          />
        )}

        {activeTab === 'evaluator' && (
          <TabEvaluator
            selectedGrade={selectedGrade}
            selectedSubject={selectedSubject}
            isUnlocked={isCurrentSubjectUnlocked}
            subscribedSubjects={studentSubscription.subscribedSubjects}
            evaluationsRemaining={studentSubscription.evaluationsRemaining}
            consumeEvaluationQuota={consumeEvaluationQuota}
          />
        )}

        {activeTab === 'formulas' && (
          <TabFormulas
            selectedSubject={selectedSubject}
            isUnlocked={isCurrentSubjectUnlocked}
          />
        )}

        {activeTab === 'mocks' && (
          <TabMocks
            selectedGrade={selectedGrade}
            selectedSubject={selectedSubject}
            isUnlocked={isCurrentSubjectUnlocked}
            onGoToEvaluator={() => setActiveTab('evaluator')}
          />
        )}

        {activeTab === 'predictor' && (
          <TabPredictor selectedGrade={selectedGrade} />
        )}

      </div>
    </div>
  );
}



