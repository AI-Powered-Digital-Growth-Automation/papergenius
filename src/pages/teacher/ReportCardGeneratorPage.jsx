import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, Printer, Share2, Send, CheckCircle2, Building2, 
  User, Calendar, Sparkles, ArrowLeft, RefreshCw, FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ReportCardGeneratorPage() {
  const { coachingSubscription } = useAuth();
  const instituteName = coachingSubscription?.instituteName || 'Apex Science Academy & Coaching';

  const [studentName, setStudentName] = useState('Rahul Sharma');
  const [rollNo, setRollNo] = useState('CBSE-2026-042');
  const [grade, setGrade] = useState('Class 10');
  const [testTitle, setTestTitle] = useState('Periodic Test 2 - Science & Mathematics');
  const [testDate, setTestDate] = useState('24 Oct 2026');
  const [parentPhone, setParentPhone] = useState('9876543210');

  // Subjects and Marks
  const [subjectsList, setSubjectsList] = useState([
    { name: 'Physics / Mechanics', marksObtained: 34, maxMarks: 40 },
    { name: 'Chemistry / Reactions', marksObtained: 31, maxMarks: 40 },
    { name: 'Biology / Life Processes', marksObtained: 36, maxMarks: 40 },
    { name: 'Mathematics Standard', marksObtained: 32, maxMarks: 40 }
  ]);

  const [teacherRemarks, setTeacherRemarks] = useState('Excellent grasp of concepts. Needs minor improvement in final calculation units.');

  // Computations
  const totalObtained = subjectsList.reduce((acc, s) => acc + Number(s.marksObtained), 0);
  const totalMax = subjectsList.reduce((acc, s) => acc + Number(s.maxMarks), 0);
  const percentage = Math.round((totalObtained / totalMax) * 100);

  const getGradeLetter = (pct) => {
    if (pct >= 90) return 'A1 (Outstanding)';
    if (pct >= 80) return 'A2 (Excellent)';
    if (pct >= 70) return 'B1 (Very Good)';
    if (pct >= 60) return 'B2 (Good)';
    if (pct >= 50) return 'C1 (Average)';
    return 'D (Needs Intensive Practice)';
  };

  const handleMarksChange = (idx, field, val) => {
    setSubjectsList(prev => {
      const updated = [...prev];
      updated[idx][field] = val;
      return updated;
    });
  };

  // WhatsApp Share URL Builder
  const handleWhatsAppShare = () => {
    const cleanPhone = parentPhone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone;

    const message = `*${instituteName.toUpperCase()}*
*Official Student Performance Report*

*Candidate:* ${studentName} (Roll: ${rollNo})
*Grade:* ${grade} | *Date:* ${testDate}
*Assessment:* ${testTitle}

*Scores Breakdown:*
${subjectsList.map(s => `• ${s.name}: ${s.marksObtained}/${s.maxMarks}`).join('\n')}

*Total Score:* ${totalObtained} / ${totalMax} (${percentage}%)
*Performance Grade:* ${getGradeLetter(percentage)}
*Faculty Remarks:* "${teacherRemarks}"

_Verified by PaperGenius.in CBSE Exam OS_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneWithCountry}?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 pt-6 px-4 sm:px-6 lg:px-8 text-base">
      
      {/* Top Header */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <Link
            to="/teacher/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-[#67E8F9] hover:underline font-bold mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Coaching Dashboard</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Award className="w-7 h-7 text-[#C4B5FD]" />
            <span>Instant WhatsApp Marksheet Generator</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Generate branded performance cards and send direct score updates to parents on WhatsApp in 1 click.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-bold border border-white/10 flex items-center gap-2 shadow"
          >
            <Printer className="w-4 h-4 text-[#67E8F9]" />
            <span>Print Marksheet</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition-all"
          >
            <Send className="w-4 h-4 fill-white" />
            <span>Share to Parents (WhatsApp)</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Data Entry Controls (Hidden in Print) */}
        <div className="lg:col-span-5 space-y-5 print:hidden">
          <div className="p-6 rounded-3xl bg-[#080D24] border border-white/10 space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-base border-b border-white/10 pb-3">
              1. Student & Assessment Details
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <label className="text-[#94A3B8] block mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#7C3CFF]"
                />
              </div>

              <div>
                <label className="text-[#94A3B8] block mb-1">Roll / Batch No.</label>
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#7C3CFF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <label className="text-[#94A3B8] block mb-1">Grade / Class</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#7C3CFF]"
                >
                  <option value="Class 10">Class 10 (CBSE)</option>
                  <option value="Class 12">Class 12 (CBSE)</option>
                </select>
              </div>

              <div>
                <label className="text-[#94A3B8] block mb-1">Parent WhatsApp No.</label>
                <input
                  type="text"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#94A3B8] block mb-1">Test Title</label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#7C3CFF]"
              />
            </div>

            {/* Subject Marks Inputs */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-xs font-bold text-[#67E8F9] uppercase tracking-wider block">
                2. Subject Scores (Obtained / Max)
              </label>

              {subjectsList.map((sub, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <input
                    type="text"
                    value={sub.name}
                    onChange={(e) => handleMarksChange(idx, 'name', e.target.value)}
                    className="flex-1 bg-[#0C1330] border border-white/10 rounded-lg p-2 text-white font-medium"
                  />
                  <input
                    type="number"
                    value={sub.marksObtained}
                    onChange={(e) => handleMarksChange(idx, 'marksObtained', e.target.value)}
                    className="w-16 bg-[#0C1330] border border-white/10 rounded-lg p-2 text-center text-white font-mono font-bold"
                  />
                  <span className="text-slate-500">/</span>
                  <input
                    type="number"
                    value={sub.maxMarks}
                    onChange={(e) => handleMarksChange(idx, 'maxMarks', e.target.value)}
                    className="w-16 bg-[#0C1330] border border-white/10 rounded-lg p-2 text-center text-slate-400 font-mono"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs text-[#94A3B8] block mb-1">Faculty Remarks for Parents</label>
              <textarea
                rows={2}
                value={teacherRemarks}
                onChange={(e) => setTeacherRemarks(e.target.value)}
                className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#7C3CFF]"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Official Branded Marksheet Canvas (Print Ready) */}
        <div className="lg:col-span-7">
          <div className="bg-white text-black p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 font-sans border-2 border-black/10">
            
            {/* Institute Header */}
            <div className="text-center border-b-2 border-black pb-4 space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-black">
                {instituteName}
              </h2>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                OFFICIAL CANDIDATE PERIODIC PERFORMANCE MARKSHEET
              </div>
              <div className="text-[11px] font-mono text-gray-500">
                AFFILIATED CBSE BOARD CURRICULUM TEST SERIES
              </div>
            </div>

            {/* Student & Test Meta Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs font-mono">
              <div>
                <span className="text-gray-500 block text-[10px]">CANDIDATE NAME</span>
                <strong className="text-black text-sm">{studentName}</strong>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">ROLL NUMBER</span>
                <strong className="text-black">{rollNo}</strong>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">CLASS / STREAM</span>
                <strong className="text-black">{grade}</strong>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">TEST DATE</span>
                <strong className="text-black">{testDate}</strong>
              </div>
            </div>

            {/* Test Title Banner */}
            <div className="bg-gray-100 p-2.5 rounded-lg text-center font-bold text-xs uppercase tracking-wider text-gray-800">
              {testTitle}
            </div>

            {/* Subject Marks Table */}
            <div className="border border-gray-300 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-gray-100 border-b border-gray-300 font-bold text-gray-700">
                  <tr>
                    <th className="p-3">Subject / Paper</th>
                    <th className="p-3 text-center">Marks Obtained</th>
                    <th className="p-3 text-center">Maximum Marks</th>
                    <th className="p-3 text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subjectsList.map((sub, idx) => {
                    const subPct = Math.round((sub.marksObtained / sub.maxMarks) * 100);
                    return (
                      <tr key={idx}>
                        <td className="p-3 font-semibold text-gray-900">{sub.name}</td>
                        <td className="p-3 text-center font-mono font-bold text-black">{sub.marksObtained}</td>
                        <td className="p-3 text-center font-mono text-gray-600">{sub.maxMarks}</td>
                        <td className="p-3 text-right font-mono font-semibold text-gray-800">{subPct}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Aggregate Score & Grade Summary */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="space-y-0.5">
                <span className="text-xs text-gray-500 uppercase font-mono">Total Aggregate Score</span>
                <div className="text-2xl sm:text-3xl font-black text-black">
                  {totalObtained} <span className="text-base text-gray-500 font-normal">/ {totalMax}</span>
                </div>
              </div>

              <div className="space-y-0.5 text-right">
                <span className="text-xs text-gray-500 uppercase font-mono">Performance Grade</span>
                <div className="text-lg sm:text-xl font-black text-purple-800">
                  {percentage}% • {getGradeLetter(percentage).split(' ')[0]}
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div className="border-l-4 border-black pl-3 py-1 text-xs text-gray-800 italic">
              <strong>Faculty Remarks:</strong> "{teacherRemarks}"
            </div>

            {/* Signatures Footer */}
            <div className="pt-6 border-t border-gray-300 flex items-center justify-between text-xs font-mono text-gray-700">
              <div>Academic Director: __________________</div>
              <div>Parent / Guardian Acknowledgment: __________________</div>
            </div>

            <div className="text-center text-[10px] text-gray-400 font-mono pt-2">
              Generated via PaperGenius.in | Certified Institutional Test OS
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
