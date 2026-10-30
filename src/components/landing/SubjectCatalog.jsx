import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SubjectCatalog() {
  const [activeGrade, setActiveGrade] = useState('class10');

  const class10 = [
    { name: 'Science', code: 'SCI_10', chapters: '13 Chapters', grade: 'CLASS 10', link: '/class-10' },
    { name: 'Mathematics Standard', code: 'MATH_STD_10', chapters: '14 Chapters', grade: 'CLASS 10', link: '/class-10' },
    { name: 'Mathematics Basic', code: 'MATH_BSC_10', chapters: '14 Chapters', grade: 'CLASS 10', link: '/class-10' },
    { name: 'Social Science', code: 'SST_10', chapters: '21 Chapters', grade: 'CLASS 10', link: '/class-10' },
    { name: 'English Language and Literature', code: 'ENG_10', chapters: '18 Chapters', grade: 'CLASS 10', link: '/class-10' },
    { name: 'Hindi Course A', code: 'HIN_A_10', chapters: '16 Chapters', grade: 'CLASS 10', link: '/class-10' }
  ];

  const class12 = [
    { name: 'Physics', code: 'PHY_12', chapters: '14 Chapters', grade: 'CLASS 12', link: '/class-12' },
    { name: 'Chemistry', code: 'CHEM_12', chapters: '10 Chapters', grade: 'CLASS 12', link: '/class-12' },
    { name: 'Mathematics', code: 'MATH_12', chapters: '13 Chapters', grade: 'CLASS 12', link: '/class-12' },
    { name: 'Biology', code: 'BIO_12', chapters: '13 Chapters', grade: 'CLASS 12', link: '/class-12' },
    { name: 'Accountancy', code: 'ACC_12', chapters: '11 Chapters', grade: 'CLASS 12', link: '/class-12' },
    { name: 'Business Studies', code: 'BST_12', chapters: '12 Chapters', grade: 'CLASS 12', link: '/class-12' },
    { name: 'Economics', code: 'ECO_12', chapters: '10 Chapters', grade: 'CLASS 12', link: '/class-12' },
    { name: 'Computer Science', code: 'CS_12', chapters: '13 Chapters', grade: 'CLASS 12', link: '/class-12' },
    { name: 'English Core', code: 'ENG_12', chapters: '14 Chapters', grade: 'CLASS 12', link: '/class-12' }
  ];

  const currentList = activeGrade === 'class10' ? class10 : class12;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Official CBSE Subject Catalogs
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Strictly normalized subject trees. No fuzzy matching or unsafe entitlement cross-unlocks.
          </p>
        </div>

        <div className="inline-flex p-1.5 rounded-2xl bg-[#080D24] border border-white/10 shrink-0">
          <button
            onClick={() => setActiveGrade('class10')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeGrade === 'class10'
                ? 'bg-[#06B6D4] text-black shadow-lg shadow-[#06B6D4]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Class 10 (6 Core Subjects)
          </button>
          <button
            onClick={() => setActiveGrade('class12')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeGrade === 'class12'
                ? 'bg-[#7C3CFF] text-white shadow-lg shadow-[#7C3CFF]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Class 12 (16 Core Subjects)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentList.map((sub) => (
          <div
            key={sub.code}
            className="p-6 rounded-2xl bg-[#080D24] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-bold uppercase">
                  {sub.grade}
                </span>
                <span className="text-slate-400">{sub.chapters}</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#5EE7FF] transition-colors mb-1.5">
                {sub.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Code: <span className="text-[#06B6D4] font-semibold">{sub.code}</span> • Solved PYQs & Blueprint Ready
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold">
              <Link to={sub.link} className="inline-flex items-center gap-1 text-[#06B6D4] hover:underline">
                <span>View 2022-26 Papers</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/pricing" className="text-slate-400 hover:text-white transition-colors">
                Pass Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
