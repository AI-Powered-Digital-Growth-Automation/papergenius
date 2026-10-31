import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Flame, CheckCircle2, ChevronDown, ChevronUp, 
  Sparkles, Award, Copy, Check, Printer, BookOpen, ArrowRight, Zap,
  Download, FileText, Calendar, CheckSquare, ExternalLink
} from 'lucide-react';
import { pyqDatabase } from '../../data/pyqData';
import { previousYearsPapers, OFFICIAL_CBSE_PORTAL } from '../../data/downloadPapersData';


export default function PyqVaultPage() {
  const [activeTab, setActiveTab] = useState('solved-bank'); // 'solved-bank' | 'full-papers'
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(pyqDatabase[0]?.id || null);
  const [copiedId, setCopiedId] = useState(null);

  // Available subjects for filter
  const availableSubjects = useMemo(() => {
    const dataSource = activeTab === 'solved-bank' ? pyqDatabase : previousYearsPapers;
    const list = selectedGrade === 'All' 
      ? dataSource.map(p => p.subject)
      : dataSource.filter(p => p.grade === selectedGrade).map(p => p.subject);
    return ['All', ...Array.from(new Set(list))];
  }, [selectedGrade, activeTab]);

  // Solved Bank Filtering
  const filteredQuestions = useMemo(() => {
    return pyqDatabase.filter((q) => {
      const matchGrade = selectedGrade === 'All' || q.grade === selectedGrade;
      const matchSubject = selectedSubject === 'All' || q.subject === selectedSubject;
      const matchSearch = searchQuery === '' || 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.chapter.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGrade && matchSubject && matchSearch;
    });
  }, [selectedGrade, selectedSubject, searchQuery]);

  // Full Papers Filtering
  const filteredPapers = useMemo(() => {
    return previousYearsPapers.filter((p) => {
      const matchGrade = selectedGrade === 'All' || p.grade === selectedGrade;
      const matchSubject = selectedSubject === 'All' || p.subject === selectedSubject;
      const matchYear = selectedYear === 'All' || p.year === selectedYear;
      return matchGrade && matchSubject && matchYear;
    });
  }, [selectedGrade, selectedSubject, selectedYear]);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 pt-8 px-4 sm:px-6 lg:px-8 selection:bg-[#7C3CFF] selection:text-white">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-80px] left-1/3 w-[550px] h-[550px] bg-[#7C3CFF]/15 blur-[150px] rounded-full" />
      </div>

      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 text-xs sm:text-sm font-bold text-[#C4B5FD]">
          <Flame className="w-4 h-4 text-[#F472B6]" />
          <span>CBSE 10-Year Solved Question Vault & Official PDF Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
          CBSE Board PYQ Vault
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto">
          Access high-recurrence solved board questions with step-by-step rubrics or download complete previous 10-year board question papers with official marking schemes.
        </p>

        {/* Evaluation CTA */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            to="/student"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0C1330] hover:bg-[#111A3D] text-[#67E8F9] border border-[#06B6D4]/40 text-xs sm:text-sm font-bold transition-all shadow-md"
          >
            <Zap className="w-4 h-4 text-[#67E8F9]" />
            <span>AI Answer Copy Evaluator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">

        {/* MAIN MODE SWITCHER TABS */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#080D24] border border-[rgba(140,120,255,0.3)] shadow-xl">
            <button
              onClick={() => setActiveTab('solved-bank')}
              className={`flex items-center gap-2 px-5 sm:px-8 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'solved-bank'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-lg'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Solved Questions Bank</span>
            </button>
            <button
              onClick={() => setActiveTab('full-papers')}
              className={`flex items-center gap-2 px-5 sm:px-8 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'full-papers'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-lg'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Download Full Board Papers (PDF)</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#080D24] border border-[rgba(140,120,255,0.25)] shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Grade Selector Tabs */}
          <div className="flex bg-[#0C1330] p-1 rounded-xl border border-white/10 w-full md:w-auto">
            {['All', 'Class 10', 'Class 12'].map((g) => (
              <button
                key={g}
                onClick={() => {
                  setSelectedGrade(g);
                  setSelectedSubject('All');
                }}
                className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  selectedGrade === g
                    ? 'bg-[#7C3CFF] text-white shadow-md shadow-[#7C3CFF]/30'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Subject & Search Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            
            {/* Subject Selector */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full sm:w-auto bg-[#0C1330] border border-white/10 text-white rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#7C3CFF]"
            >
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>{sub === 'All' ? 'All Subjects' : sub}</option>
              ))}
            </select>

            {/* Year filter for Full Papers */}
            {activeTab === 'full-papers' ? (
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full sm:w-auto bg-[#0C1330] border border-white/10 text-white rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#7C3CFF]"
              >
                <option value="All">All Years (2022-2026)</option>
                <option value="2026">2026 Board Exam Series</option>
                <option value="2025">2025 Board Exam Series</option>
                <option value="2024">2024 Board Exam Series</option>
                <option value="2023">2023 Board Exam Series</option>
                <option value="2022">2022 Board Exam Series</option>
              </select>
            ) : (
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search chapter or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 text-white text-xs sm:text-sm rounded-xl pl-9 pr-3 py-2 placeholder-slate-500 focus:outline-none focus:border-[#7C3CFF]"
                />
              </div>
            )}
          </div>

        </div>

        {/* VIEW 1: Solved Questions Bank */}
        {activeTab === 'solved-bank' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#94A3B8] px-1 font-mono">
              <span>Showing {filteredQuestions.length} High-Yield Solved PYQs</span>
              <span className="text-[#67E8F9]">Updated with Official CBSE Step Marking</span>
            </div>

            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-[#080D24] border border-[rgba(140,120,255,0.2)] hover:border-[#7C3CFF]/60 transition-all overflow-hidden shadow-lg"
                  >
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-[#7C3CFF]/20 text-[#C4B5FD] text-xs font-mono font-bold">
                            {item.grade} • {item.subject}
                          </span>
                          <span className="text-xs text-[#94A3B8] font-medium">
                            {item.chapter}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-[#EC4899]/15 border border-[#EC4899]/30 text-[#F472B6] text-xs font-bold flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5" />
                            <span>{item.frequencyBadge}</span>
                          </span>
                          <span className="px-2 py-1 rounded-md bg-white/5 text-white text-xs font-mono font-bold">
                            {item.marks} Marks
                          </span>
                        </div>
                      </div>

                      <div className="text-base sm:text-lg font-semibold text-white leading-relaxed pt-1">
                        {item.question}
                      </div>

                      <div className="text-xs text-[#67E8F9] font-mono">
                        Board History: {item.frequency}
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-white/5">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C4B5FD] hover:text-white transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4 text-[#7C3CFF]" />
                              <span>Hide Official CBSE Solution</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 text-[#7C3CFF]" />
                              <span>View Step-Wise Solution & Marking Key</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleCopy(item.id, `${item.question}\n\nOfficial CBSE Solution:\n${item.answerKey.join('\n')}`)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-all text-xs flex items-center gap-1"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-green-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-5 sm:p-6 bg-[#0C1330] border-t border-[rgba(140,120,255,0.2)] space-y-4">
                        <div className="space-y-2">
                          <div className="text-xs font-mono uppercase tracking-widest text-[#5EE7FF] font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                            <span>Official Step-by-Step Marking Allocation</span>
                          </div>
                          <div className="space-y-2 pt-1">
                            {item.answerKey.map((step, sIdx) => (
                              <div
                                key={sIdx}
                                className="p-3 rounded-xl bg-[#080D24] border border-white/5 text-xs sm:text-sm text-[#E2E8F0] leading-relaxed"
                              >
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>

                        {item.cbseTip && (
                          <div className="p-3.5 rounded-xl bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 flex items-start gap-2.5">
                            <Award className="w-4 h-4 text-[#C4B5FD] shrink-0 mt-0.5" />
                            <div className="text-xs text-[#DDD6FE]">
                              <strong className="text-white">CBSE Examiner Tip: </strong>
                              {item.cbseTip}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-12 rounded-2xl bg-[#080D24] border border-white/10 text-center space-y-3">
                <BookOpen className="w-10 h-10 text-[#94A3B8] mx-auto" />
                <h3 className="text-base font-bold text-white">No Questions Found</h3>
                <p className="text-xs text-[#94A3B8]">Try adjusting your search query or subject filter.</p>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: Full Board Papers PDF Download Center */}
        {activeTab === 'full-papers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#94A3B8] px-1 font-mono">
              <span>Showing {filteredPapers.length} Official CBSE Board Question Papers</span>
              <span className="text-[#67E8F9]">Direct PDF Download • Verified Papers</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#080D24] border border-[rgba(140,120,255,0.25)] hover:border-[#06B6D4]/50 transition-all shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#67E8F9] text-xs font-mono font-bold">
                        {paper.grade} • {paper.year}
                      </span>
                      <span className="text-xs text-[#94A3B8] font-mono">
                        {paper.fileSize}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {paper.subject} ({paper.paperType})
                      </h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        {paper.set} • Official CBSE Board Exam
                      </p>
                    </div>
                  </div>

                  {/* Download Action Buttons */}
                                      <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-2">
                      <a
                        href={OFFICIAL_CBSE_PORTAL?.mainPapers || "https://www.cbse.gov.in/cbsenew/question-paper.html"}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Access authentic official board question papers on CBSE portal"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition-all hover:border-cyan-400/50"
                      >
                        <ExternalLink className="w-4 h-4 text-[#67E8F9]" />
                        <span>Question Paper</span>
                      </a>

                      <a
                        href={paper.grade === 'Class 10' ? (OFFICIAL_CBSE_PORTAL?.class10Sqp || "https://cbseacademic.nic.in/sqp_classx_2024-25.html") : (OFFICIAL_CBSE_PORTAL?.class12Sqp || "https://cbseacademic.nic.in/sqp_classxii_2024-25.html")}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Access official verified sample question papers and marking scheme"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#06B6D4]/20 hover:bg-[#06B6D4]/30 text-[#67E8F9] text-xs font-bold border border-[#06B6D4]/40 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#67E8F9]" />
                        <span>Marking Scheme</span>
                      </a>
                    </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
