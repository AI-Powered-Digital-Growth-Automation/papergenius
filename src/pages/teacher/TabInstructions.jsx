import React from 'react';
import { BookCheck, FileText, Award, ShieldAlert, CheckSquare, BarChart3, Grid3X3 } from 'lucide-react';

const TAB_GUIDELINES = {
  generator: {
    title: 'AI Paper Generation Guide',
    icon: FileText,
    iconColor: 'text-[#5EE7FF]',
    badge: 'Step 1 of 6',
    badgeColor: 'bg-[#5EE7FF]/10 text-[#5EE7FF] border-[#5EE7FF]/30',
    steps: [
      {
        num: '1',
        title: 'Class & Exam Preset Chunein',
        desc: 'Class 10 ya 12 select karein, aur 1-Click Preset (20M Unit Test, 40M Periodic, ya 80M Pre-Board) par click karein taaki time aur marks automatically set ho jayein.'
      },
      {
        num: '2',
        title: 'Subject & Chapters Enter Karein',
        desc: 'Apna target subject chunein aur specific chapter ka naam likhein (e.g. Chemical Reactions, Electricity). AI strictly NCERT curriculum se questions pick karega.'
      },
      {
        num: '3',
        title: '1-Click Generate Dabayein',
        desc: 'Neela "Generate Question Paper" button dabayein. 10-15 seconds mein complete Section A (MCQs) aur Section B board pattern paper taiyar ho jayega.'
      }
    ]
  },
  branding: {
    title: 'Coaching White-Label Branding Guide',
    icon: Award,
    iconColor: 'text-amber-400',
    badge: 'Step 2 of 6',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    steps: [
      {
        num: '1',
        title: 'Institute Ka Naam Likhein',
        desc: 'Apni coaching ya tuition classes ka exact naam likhein. Yeh print hone wale test paper ke top header par sabse bada aur bold print hoga.'
      },
      {
        num: '2',
        title: 'Sub-Header & Contact Info',
        desc: 'Sub-header me "CBSE Weekly Test Series" ya batch name daalein, aur phone number/branch address add karein taaki parents aur students tak branding pahuche.'
      },
      {
        num: '3',
        title: 'Anti-Copy Watermark Set Karein',
        desc: 'Watermark field me apna short institute name likhein. Paper ke background me 30-degree diagonal watermark automatically lag jayega jo photocopy me clean dikhta hai.'
      }
    ]
  },
  anticheat: {
    title: 'Anti-Cheat Sets & Shuffling Guide',
    icon: ShieldAlert,
    iconColor: 'text-emerald-400',
    badge: 'Step 3 of 6',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    steps: [
      {
        num: '1',
        title: 'Synchronized Sets (A, B, C)',
        desc: 'PaperGenius automatically same syllabus ke 3 alag-alag sets taiyar karta hai jisme questions aur options ka sequence shuffle ho jata hai.'
      },
      {
        num: '2',
        title: 'Classroom Exam Seating Tip',
        desc: 'Adjacent (paas-paas baithe) students ko alternate sets baantein: Student 1 = Set A, Student 2 = Set B, Student 3 = Set C. Isse cross-bench copying 100% rukti hai.'
      },
      {
        num: '3',
        title: 'Set Selection & Print',
        desc: 'Upar "Set A", "Set B" ya "Set C" buttons par click karke preview switch karein aur individual sets ko A4 PDF export karein.'
      }
    ]
  },
  solutions: {
    title: 'CBSE Step Marking Scheme Guide',
    icon: CheckSquare,
    iconColor: 'text-pink-400',
    badge: 'Step 4 of 6',
    badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    steps: [
      {
        num: '1',
        title: 'Official CBSE Step-Wise Rubric',
        desc: 'Har subjective question ke saath detailed point-wise breakdown diya gaya hai ki kis step ke kitne marks student ko dene hain (e.g. 1M for formula, 1M for calculation).'
      },
      {
        num: '2',
        title: 'Fast Copy Evaluation',
        desc: 'Teacher answer key ko side me khol kar copies 3x tez speed se check kar sakte hain bina answer sheet solution khud solve kiye.'
      },
      {
        num: '3',
        title: 'Student Discussion Sheet',
        desc: 'Exam ke baad students ko discussion ke liye yeh marking rubric dikhayein taaki unhe board exam me marks score karne ki correct presentation samajh aaye.'
      }
    ]
  },
  blueprint: {
    title: 'CBSE Blueprint & Weightage Guide',
    icon: BarChart3,
    iconColor: 'text-cyan-400',
    badge: 'Step 5 of 6',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    steps: [
      {
        num: '1',
        title: 'Marks & Section Balance Review',
        desc: 'CBSE guidelines ke anusar Knowledge (30%), Application (40%), aur HOTS / Evaluation (30%) questions ka balanced distribution check karein.'
      },
      {
        num: '2',
        title: 'Internal Choice Verification',
        desc: 'Section C aur Section D ke subjective questions mein Board rule ke hisaab se equivalent difficulty ka internal choice provide kiya gaya hai.'
      },
      {
        num: '3',
        title: 'Time Allocation Per Question',
        desc: 'MCQ ke liye 1.5 min, 2-mark question ke liye 3 min, aur 5-mark question ke liye 8 min ka standard exam pacing target students ko guide karein.'
      }
    ]
  },
  omr: {
    title: 'Printable OMR Sheet Generator Guide',
    icon: Grid3X3,
    iconColor: 'text-indigo-400',
    badge: 'Step 6 of 6',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    steps: [
      {
        num: '1',
        title: 'Auto-Matched Question Count',
        desc: 'OMR Sheet generator aapke paper ke exact MCQ count (10, 20 ya 40 bubbles) ke hisaab se customized response sheet render karta hai.'
      },
      {
        num: '2',
        title: 'Coaching Header on OMR',
        desc: 'OMR Sheet ke top par bhi aapki coaching ka naam aur Roll Number grid automatically print hoti hai.'
      },
      {
        num: '3',
        title: 'Bulk Print for Test Day',
        desc: '"Print OMR Sheet" dabakar batch ke sabhi students ke liye 1-page compact A4 sheet nikaalein. Board exam jaisi practice ensure hoti hai.'
      }
    ]
  }
};

export default function TabInstructions({ activeTab }) {
  const current = TAB_GUIDELINES[activeTab] || TAB_GUIDELINES.generator;
  const IconComponent = current.icon;

  return (
    <div className="bg-[#0B1020] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${current.iconColor}`} />
          <h4 className="text-sm sm:text-base font-extrabold text-white tracking-normal">
            {current.title}
          </h4>
        </div>
        <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${current.badgeColor}`}>
          {current.badge}
        </span>
      </div>

      {/* Dynamic Steps with Spaced Out Typography */}
      <div className="space-y-4">
        {current.steps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3.5">
            <span className="w-6 h-6 rounded-full bg-[#7C3CFF]/30 text-[#C4B5FD] font-bold flex items-center justify-center shrink-0 text-xs mt-0.5 border border-[#7C3CFF]/40">
              {step.num}
            </span>
            <div className="space-y-1 flex-1">
              <p className="text-sm font-bold text-white tracking-normal">
                {step.title}
              </p>
              <p className="text-xs sm:text-sm text-[#A8B0C8] leading-relaxed tracking-normal">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
