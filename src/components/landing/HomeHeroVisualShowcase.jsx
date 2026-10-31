import React from 'react';
import { Sparkles, Camera, BookOpen } from 'lucide-react';

export default function HomeHeroVisualShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: AI Exam Evaluator Tablet Mockup */}
        <div className="relative group overflow-hidden rounded-3xl bg-[#080D24] border border-[#7C3CFF]/40 hover:border-[#7C3CFF] shadow-2xl p-3 transition-all">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/ai-answer-evaluator.png"
              alt="CBSE AI Answer Sheet Evaluator Multimodal Handwriting Step Marking"
              loading="lazy"
              className="w-full h-72 sm:h-80 object-cover object-top rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="p-3.5 flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-purple-300 font-bold">
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>AI Multimodal Vision Answer Sheet Evaluator</span>
            </span>
            <span className="text-emerald-400 font-bold">95/100 Step Marks</span>
          </div>
        </div>

        {/* Right: Solved Question Bank with Mobile */}
        <div className="relative group overflow-hidden rounded-3xl bg-[#080D24] border border-cyan-500/40 hover:border-cyan-500 shadow-2xl p-3 transition-all">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/class10-pyq-vault.png"
              alt="CBSE Past 10 Years Question Bank with Step-Wise Solutions and Mobile App"
              loading="lazy"
              className="w-full h-72 sm:h-80 object-cover object-top rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="p-3.5 flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <BookOpen className="w-4 h-4 text-[#7C3CFF]" />
              <span>Chapter-Wise Solved Board Questions</span>
            </span>
            <span className="text-cyan-400 font-bold">Topper Standards</span>
          </div>
        </div>
      </div>
    </section>
  );
}
