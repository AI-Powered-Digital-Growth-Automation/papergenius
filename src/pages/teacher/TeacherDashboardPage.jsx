import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, PlusCircle, Printer, Layers, ShieldCheck, 
  Building2, Award, Lightbulb, ChevronDown, ChevronUp 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Modular Tabs
import TabSavedPapers from './tabs/TabSavedPapers';
import TabOmrStudio from './tabs/TabOmrStudio';
import TabReportCards from './tabs/TabReportCards';

export default function TeacherDashboardPage() {
  const { user, coachingSubscription } = useAuth();
  const [activeTab, setActiveTab] = useState('saved-papers'); // 'saved-papers' | 'omr-studio' | 'report-cards'
  const [showInstructions, setShowInstructions] = useState(true);

  const instituteName = coachingSubscription?.instituteName || 'Apex Science Academy & Coaching';
  const directorName = user?.user_metadata?.full_name || 'Gulzar Ahmed (Director)';
  const directorEmail = user?.email || 'digitalgulzarservices@gmail.com';

  const quotaUsed = coachingSubscription?.papersGeneratedThisMonth || 14;
  const quotaTotal = coachingSubscription?.papersQuota || 150;
  const quotaRemaining = Math.max(0, quotaTotal - quotaUsed);
  const progressPercent = Math.min(100, Math.round((quotaUsed / quotaTotal) * 100));

  // Saved Papers History List
  const [paperHistory] = useState([
    {
      id: 'paper-001',
      title: 'Class 10 Science Pre-Board Assessment',
      subject: 'Science',
      grade: 'Class 10',
      marks: 80,
      duration: '3 Hours',
      date: '24 Oct 2026',
      sets: ['Set A', 'Set B', 'Set C']
    },
    {
      id: 'paper-002',
      title: 'Class 12 Physics Periodic Test - Optics & Modern Physics',
      subject: 'Physics',
      grade: 'Class 12',
      marks: 40,
      duration: '90 Minutes',
      date: '22 Oct 2026',
      sets: ['Set A', 'Set B']
    },
    {
      id: 'paper-003',
      title: 'Class 10 Mathematics Standard Unit Test',
      subject: 'Mathematics',
      grade: 'Class 10',
      marks: 20,
      duration: '45 Minutes',
      date: '18 Oct 2026',
      sets: ['Set A']
    }
  ]);

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 pt-6 px-4 sm:px-6 lg:px-8 text-base">
      
      {/* 1. TOP HEADER: Institute Profile & Plan Quota Tracker */}
      <div className="max-w-7xl mx-auto mb-6 p-6 sm:p-7 rounded-2xl bg-[#080D24] border border-[rgba(140,120,255,0.25)] shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 print:hidden">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-[#7C3CFF]/20 border border-[#7C3CFF]/40 text-xs sm:text-sm font-bold text-[#C4B5FD] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C4B5FD]" />
              <span>{coachingSubscription?.plan || 'Coaching Director Pro'}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Coaching Account</span>
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
              <Building2 className="w-7 h-7 text-[#67E8F9]" />
              <span>{instituteName}</span>
            </h1>
            <p className="text-sm sm:text-base text-[#94A3B8] font-mono mt-0.5">
              {directorName} • {directorEmail}
            </p>
          </div>
        </div>

        {/* Quota Progress Card */}
        <div className="bg-[#0C1330] p-5 rounded-2xl border border-white/10 w-full lg:w-96 space-y-3 shadow-inner">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-[#94A3B8] font-semibold uppercase tracking-wider">Annual Papers Quota</span>
            <span className="font-mono font-bold text-[#67E8F9]">{quotaRemaining} Papers Left</span>
          </div>

          <div className="w-full bg-[#080D24] h-3 rounded-full overflow-hidden border border-white/5">
            <div 
              className="bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-[#94A3B8]">
            <span>{quotaUsed} Generated</span>
            <span>Total Limit: {quotaTotal} Papers</span>
          </div>

          <div className="pt-1 flex gap-2">
            <Link
              to="/teacher/create-paper"
              className="btn-gradient flex-1 py-2.5 rounded-xl font-bold text-white text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:opacity-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Paper</span>
            </Link>
            <Link
              to="/pricing"
              className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-[#C4B5FD]"
            >
              Top-Up (+25)
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">

        {/* 2. THREE DEDICATED COACHING TABS */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2.5 rounded-2xl bg-[#080D24] border border-[rgba(140,120,255,0.2)] print:hidden">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('saved-papers')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'saved-papers'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>1. Saved Papers Vault ({paperHistory.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('omr-studio')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'omr-studio'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>2. 1-Click Printable OMR Generator</span>
            </button>

            <button
              onClick={() => setActiveTab('report-cards')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'report-cards'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>3. WhatsApp Marksheet Generator</span>
            </button>
          </div>

          <Link
            to="/teacher/create-paper"
            className="btn-gradient px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New AI Paper</span>
          </Link>
        </div>

        {/* 3. PERMANENT COACHING GUIDE BANNER */}
        <div className="p-6 rounded-2xl bg-[#080D24] border border-[#7C3CFF]/30 shadow-lg space-y-3 print:hidden">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-white">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <span>
                {activeTab === 'saved-papers' && 'Coaching Guide: Anti-Cheat Sets & Intellectual Property'}
                {activeTab === 'omr-studio' && 'Coaching Guide: Printable High-Density OMR Bubble Sheets'}
                {activeTab === 'report-cards' && 'Coaching Guide: 1-Click WhatsApp Parent Score Updates'}
              </span>
            </div>
            {showInstructions ? <ChevronUp className="w-5 h-5 text-[#94A3B8]" /> : <ChevronDown className="w-5 h-5 text-[#94A3B8]" />}
          </button>

          {showInstructions && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-[#CBD5E1] pt-2 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                <strong className="text-white block font-semibold">1. Anti-Cheat Set Shuffling:</strong>
                Generate Set A, B, and C in parallel to eliminate peer copying in dense classrooms.
              </div>
              <div className="p-3.5 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                <strong className="text-white block font-semibold">2. Institute 30° Watermark:</strong>
                Stamped automatically across every test page to prevent unauthorized xerox distribution.
              </div>
              <div className="p-3.5 rounded-xl bg-[#0C1330] border border-white/5 space-y-1">
                <strong className="text-white block font-semibold">3. Fast WhatsApp Reporting:</strong>
                Directly ping parents with formatted scorecards in Tab 3 after evaluating tests.
              </div>
            </div>
          )}
        </div>

        {/* 4. RENDER ACTIVE TAB */}
        {activeTab === 'saved-papers' && (
          <TabSavedPapers paperHistory={paperHistory} />
        )}

        {activeTab === 'omr-studio' && (
          <TabOmrStudio instituteName={instituteName} />
        )}

        {activeTab === 'report-cards' && (
          <TabReportCards instituteName={instituteName} />
        )}

      </div>
    </div>
  );
}
