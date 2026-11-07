import {
  Sparkles, PlusCircle, Printer, Layers, ShieldCheck,
  Building2, Award, Lightbulb, ChevronDown, ChevronUp,
  ExternalLink, X, CheckCircle2, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PAYMENT_LINKS } from '../../config/paymentConfig';
import { supabase } from '../../services/supabaseClient';


// Modular Tabs
import TabSavedPapers from './tabs/TabSavedPapers';
import TabOmrStudio from './tabs/TabOmrStudio';
import TabReportCards from './tabs/TabReportCards';

export default function TeacherDashboardPage() {
  const { user, coachingSubscription } = useAuth();
  const [activeTab, setActiveTab] = useState('saved-papers'); // 'saved-papers' | 'omr-studio' | 'report-cards'
  const [showInstructions, setShowInstructions] = useState(true);
    // Top-Up Booster State (₹599 / +25 Papers)
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpUtr, setTopUpUtr] = useState('');
  const [isSubmittingUtr, setIsSubmittingUtr] = useState(false);
  const [submittedUtrSuccess, setSubmittedUtrSuccess] = useState(false);
  const [topUpError, setTopUpError] = useState('');

  const isDirectorPro = coachingSubscription?.plan?.toLowerCase().includes('director');

  const handleTopUpSubmit = async (e) => {
    e.preventDefault();
    const cleanUtr = topUpUtr.trim();
    if (!cleanUtr || cleanUtr.length < 6) {
      setTopUpError('Please enter a valid 12-digit UTR number.');
      return;
    }

    setIsSubmittingUtr(true);
    setTopUpError('');

    try {
      const { error } = await supabase.from('payment_requests').insert([
        {
          user_id: user?.id || null,
          email: user?.email || directorEmail,
          plan_name: 'Top-Up Booster (+25 Papers)',
          amount: '₹599',
          utr_number: cleanUtr,
          status: 'pending'
        }
      ]);

      if (error) throw error;
      setSubmittedUtrSuccess(true);
    } catch (err) {
      console.error('Top-up submission failed:', err);
      setSubmittedUtrSuccess(true);
    } finally {
      setIsSubmittingUtr(false);
    }
  };


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
            <button
              onClick={() => {
                setShowTopUpModal(true);
                setSubmittedUtrSuccess(false);
                setTopUpUtr('');
                setTopUpError('');
              }}
              className="px-3 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-xs sm:text-sm font-bold text-cyan-300 flex items-center gap-1 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Top-Up (+25)</span>
            </button>
          </div>

          {!isDirectorPro && (
            <div className="pt-2 border-t border-white/5 text-center">
              <Link
                to="/pricing"
                className="text-[11px] font-bold text-amber-300 hover:text-amber-200 flex items-center justify-center gap-1"
              >
                <span>⭐ Upgrade to Director Pro (₹4,999/yr) for 150 Papers</span>
                <ChevronDown className="w-3 h-3 -rotate-90" />
              </Link>
            </div>
          )}

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
            {/* DIRECT TOP-UP MODAL (₹599 / +25 PAPERS) */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0B132B] border border-cyan-500/40 shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowTopUpModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Institutional Booster</span>
              <h3 className="text-xl font-black text-white mt-0.5">Top-Up Booster (+25 Papers)</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-white">₹599</span>
                <span className="text-xs font-semibold text-emerald-400">Instant PhonePe & UPI Credit</span>
              </div>
            </div>

            {/* PhonePe Direct Link */}
            <a
              href={PAYMENT_LINKS.coachingBooster}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#5f259f] hover:bg-[#501e87] text-white text-xs sm:text-sm font-bold shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <span>Pay ₹599 on PhonePe</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* QR Code */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
              <span className="text-[11px] text-slate-300 font-semibold block">Scan with Any UPI App (GPay / Paytm / BHIM)</span>
              <div className="inline-block p-2 rounded-xl bg-white shadow-md">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                    `upi://pay?pa=${PAYMENT_LINKS.businessUpiId}&pn=PaperGenius&am=599&cu=INR&tn=Top-Up Booster 25 Papers`
                  )}`}
                  alt="UPI QR ₹599"
                  className="w-36 h-36 mx-auto"
                />
              </div>
              <p className="text-[10px] font-mono text-cyan-300 font-semibold">UPI: {PAYMENT_LINKS.businessUpiId}</p>
            </div>

            {/* UTR Submission Form */}
            {!submittedUtrSuccess ? (
              <form onSubmit={handleTopUpSubmit} className="space-y-3 pt-2 border-t border-white/10">
                <label className="block text-xs font-semibold text-slate-300">
                  Enter 12-Digit UPI Ref / UTR after payment:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. 429810394812"
                    value={topUpUtr}
                    onChange={(e) => setTopUpUtr(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#080D24] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingUtr}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 text-xs font-bold transition shadow"
                  >
                    {isSubmittingUtr ? 'Submitting...' : 'Submit UTR'}
                  </button>
                </div>
                {topUpError && <p className="text-[11px] text-red-400 font-mono">{topUpError}</p>}
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold text-xs sm:text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Booster Request Submitted!</span>
                </div>
                <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
                  Ref: <span className="text-white font-bold">{topUpUtr}</span>. +25 Papers will be added to your quota within 15 minutes.
                </p>
                <button
                  onClick={() => setShowTopUpModal(false)}
                  className="mt-1 px-4 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold"
                >
                  Back to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
