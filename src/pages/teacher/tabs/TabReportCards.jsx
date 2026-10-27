import React, { useState } from 'react';
import { Award, Printer, Send } from 'lucide-react';

export default function TabReportCards({ instituteName }) {
  const [studentName, setStudentName] = useState('Rahul Sharma');
  const [rollNo, setRollNo] = useState('CBSE-2026-042');
  const [marksheetGrade, setMarksheetGrade] = useState('Class 10');
  const [testTitle, setTestTitle] = useState('Periodic Test 2 - Science & Mathematics');
  const [testDate, setTestDate] = useState('24 Oct 2026');
  const [parentPhone, setParentPhone] = useState('9876543210');
  const [teacherRemarks, setTeacherRemarks] = useState('Excellent grasp of concepts. Needs minor improvement in final calculation units.');

  const [subjectsList, setSubjectsList] = useState([
    { name: 'Physics / Mechanics', marksObtained: 34, maxMarks: 40 },
    { name: 'Chemistry / Reactions', marksObtained: 31, maxMarks: 40 },
    { name: 'Biology / Life Processes', marksObtained: 36, maxMarks: 40 },
    { name: 'Mathematics Standard', marksObtained: 32, maxMarks: 40 }
  ]);

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

  const handleWhatsAppShare = () => {
    const cleanPhone = parentPhone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone;

    const message = `*${instituteName.toUpperCase()}*
*Official Student Performance Report*

*Candidate:* ${studentName} (Roll: ${rollNo})
*Grade:* ${marksheetGrade} | *Date:* ${testDate}
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
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[#080D24] border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>Instant WhatsApp Marksheet Engine</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Fill student scores and click "Share to Parents (WhatsApp)" to send branded test report instantly.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 flex items-center gap-1.5 shadow"
          >
            <Printer className="w-4 h-4 text-[#67E8F9]" />
            <span>Print Marksheet</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg"
          >
            <Send className="w-4 h-4 fill-white" />
            <span>Share (WhatsApp)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-5 space-y-4 print:hidden">
          <div className="p-6 rounded-2xl bg-[#080D24] border border-white/10 space-y-3.5 shadow-xl text-xs sm:text-sm">
            <h4 className="font-bold text-white border-b border-white/10 pb-2">Student Information</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#94A3B8] block mb-1">Student Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[#94A3B8] block mb-1">Roll / Batch No.</label>
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#94A3B8] block mb-1">Class / Grade</label>
                <select
                  value={marksheetGrade}
                  onChange={(e) => setMarksheetGrade(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Class 10">Class 10</option>
                  <option value="Class 12">Class 12</option>
                </select>
              </div>
              <div>
                <label className="text-[#94A3B8] block mb-1">Parent WhatsApp No.</label>
                <input
                  type="text"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[#94A3B8] block mb-1">Test Title</label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Marks Inputs */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="font-bold text-emerald-400 block uppercase tracking-wider text-xs">
                Subject Scores (Obtained / Max)
              </label>
              {subjectsList.map((sub, idx) => (
                <div key={idx} className="flex items-center gap-2">
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
              <label className="text-[#94A3B8] block mb-1">Faculty Remarks</label>
              <textarea
                rows={2}
                value={teacherRemarks}
                onChange={(e) => setTeacherRemarks(e.target.value)}
                className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Right Marksheet Canvas */}
        <div className="lg:col-span-7">
          <div className="bg-white text-black p-8 rounded-3xl shadow-2xl space-y-5 font-sans border-2 border-black/10">
            <div className="text-center border-b-2 border-black pb-3 space-y-0.5">
              <h2 className="text-2xl font-black uppercase tracking-wide text-black">{instituteName}</h2>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                CANDIDATE PERIODIC PERFORMANCE REPORT
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs font-mono">
              <div><span className="text-gray-500 block text-[10px]">CANDIDATE</span><strong className="text-black">{studentName}</strong></div>
              <div><span className="text-gray-500 block text-[10px]">ROLL NO</span><strong className="text-black">{rollNo}</strong></div>
              <div><span className="text-gray-500 block text-[10px]">GRADE</span><strong className="text-black">{marksheetGrade}</strong></div>
              <div><span className="text-gray-500 block text-[10px]">DATE</span><strong className="text-black">{testDate}</strong></div>
            </div>

            <div className="bg-gray-100 p-2 rounded text-center font-bold text-xs uppercase text-gray-800">
              {testTitle}
            </div>

            <div className="border border-gray-300 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-gray-100 border-b border-gray-300 font-bold text-gray-700">
                  <tr>
                    <th className="p-2.5">Subject</th>
                    <th className="p-2.5 text-center">Marks</th>
                    <th className="p-2.5 text-center">Max</th>
                    <th className="p-2.5 text-right">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subjectsList.map((sub, idx) => {
                    const subPct = Math.round((sub.marksObtained / sub.maxMarks) * 100);
                    return (
                      <tr key={idx}>
                        <td className="p-2.5 font-semibold text-gray-900">{sub.name}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-black">{sub.marksObtained}</td>
                        <td className="p-2.5 text-center font-mono text-gray-600">{sub.maxMarks}</td>
                        <td className="p-2.5 text-right font-mono font-semibold text-gray-800">{subPct}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-mono block">Aggregate Score</span>
                <div className="text-2xl font-black text-black">
                  {totalObtained} <span className="text-xs text-gray-500 font-normal">/ {totalMax}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-gray-500 uppercase font-mono block">Grade</span>
                <div className="text-base font-black text-purple-800">
                  {percentage}% • {getGradeLetter(percentage).split(' ')[0]}
                </div>
              </div>
            </div>

            <div className="border-l-4 border-black pl-3 py-1 text-xs text-gray-800 italic">
              <strong>Remarks:</strong> "{teacherRemarks}"
            </div>

            <div className="pt-4 border-t border-gray-300 flex items-center justify-between text-xs font-mono text-gray-700">
              <div>Director: __________________</div>
              <div>Parent Sign: __________________</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
