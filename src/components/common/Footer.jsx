import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Award, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-[rgba(140,120,255,0.15)] bg-[#030612] text-[#A8B0C8] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[rgba(140,120,255,0.15)]">
          
          {/* Brand & Authority */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3CFF] to-[#06B6D4] p-0.5">
                <div className="w-full h-full bg-[#070B1E] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#5EE7FF]" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white font-mono tracking-tight">
                Paper<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5EE7FF] to-[#8C78FF]">Genius</span>.in
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-[#94A3B8] max-w-sm">
              India's premier AI Operating System for CBSE Board Exams (Class 10 & 12). Empowering tuition teachers, coaching institutes, and board aspirants with 1-click test generation and AI-evaluated step marking.
            </p>

            <div className="pt-2 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>Udyam Registered Enterprise: <span className="font-mono text-[#5EE7FF]">UDYAM-RJ-32-0002216</span></span>
              </div>
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <MapPin className="w-4 h-4 text-[#8C78FF]" />
                <span>Headquartered in Rajasthan, Serving Pan-India</span>
              </div>
            </div>
          </div>

          {/* Teacher & Coaching Suite */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#8C78FF]" />
              Coaching Suite
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/teacher" className="hover:text-[#5EE7FF] transition-colors">AI Test Paper Maker</Link></li>
              <li><Link to="/teacher" className="hover:text-[#5EE7FF] transition-colors">Custom Logo Branding</Link></li>
              <li><Link to="/teacher" className="hover:text-[#5EE7FF] transition-colors">Step Marking Scheme</Link></li>
              <li><Link to="/teacher" className="hover:text-[#5EE7FF] transition-colors">OMR Sheet Generator</Link></li>
              <li><Link to="/pricing" className="hover:text-[#5EE7FF] transition-colors">Coaching Annual Pass</Link></li>
            </ul>
          </div>

          {/* Student Mastery Suite */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#5EE7FF]" />
              Student Suite
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/student" className="hover:text-[#5EE7FF] transition-colors">AI Board Examiner</Link></li>
              <li><Link to="/student" className="hover:text-[#5EE7FF] transition-colors">Answer Step Evaluator</Link></li>
              <li><Link to="/pyq-vault" className="hover:text-[#5EE7FF] transition-colors">Class 10 Solved PYQs</Link></li>
              <li><Link to="/pyq-vault" className="hover:text-[#5EE7FF] transition-colors">Class 12 Science/Maths PYQs</Link></li>
              <li><Link to="/student" className="hover:text-[#5EE7FF] transition-colors">Formula Cheat Sheets</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund & Cancellation</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white transition-colors">CBSE Disclaimer</Link></li>
              <li><a href="mailto:contact@papergenius.in" className="hover:text-white transition-colors">contact@papergenius.in</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#64748B] text-center sm:text-left">
            © {new Date().getFullYear()} PaperGenius. Owned & operated by <strong className="text-white/80">Digital Gulzar Marketing Services</strong>.
          </p>
          <p className="text-[11px] text-[#64748B] text-center">
            Disclaimer: PaperGenius is an independent educational platform and is not officially affiliated with or endorsed by the CBSE Board.
          </p>
        </div>

      </div>
    </footer>
  );
}
