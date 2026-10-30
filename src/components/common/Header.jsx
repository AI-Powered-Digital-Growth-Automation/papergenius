import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles, Menu, X, ArrowRight, User,
  Building2, BookOpen, LogOut, CheckCircle2, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, signOut } = useAuth();

  // Exactly Aligned Navigation Links
  const navLinks = [
    { name: 'Class 10 OS', path: '/class-10' },
    { name: 'Class 12 OS', path: '/class-12' },
    { name: 'Coaching OS', path: '/teacher/portal' },
    { name: '5-Year PYQ', path: '/pyq-vault' },
    { name: 'Price', path: '/pricing' },
    { name: 'CBSE Insights', path: '/blog' }
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#050814]/90 backdrop-blur-md border-b border-white/10 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3CFF] to-[#06B6D4] flex items-center justify-center text-white shadow-lg shadow-[#7C3CFF]/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Paper<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5EE7FF] to-[#8C78FF]">Genius</span>
            </span>
            <span className="block text-[10px] font-mono text-[#06B6D4] -mt-1 tracking-wider uppercase font-bold">
              CBSE Exam OS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#080D24] px-2 py-1.5 rounded-2xl border border-white/5">
          {navLinks.map((link) => {
            const isActive = link.path === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Auth Buttons */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to={role === 'teacher' ? '/teacher/dashboard' : '/student'}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F172A] border border-white/10 hover:border-[#7C3CFF]/50 text-white text-xs font-semibold transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="capitalize">{role === 'teacher' ? 'Coaching OS' : 'Student OS'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-2 rounded-xl bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-white/5 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Sign In */}
              <Link
                to="/auth"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/5 transition-all"
              >
                Sign In
              </Link>

              {/* Student Register */}
              <Link
                to="/auth"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white text-xs font-bold shadow-md shadow-[#7C3CFF]/20 hover:opacity-95 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Student Register</span>
              </Link>

              {/* For Coaching */}
              <Link
                to="/teacher/portal"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>For Coaching</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#080D24] text-slate-300 hover:text-white border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#050814]/98 px-4 pt-4 pb-6 space-y-3">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = link.path === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/10 space-y-2">
            {user ? (
              <div className="space-y-2">
                <Link
                  to={role === 'teacher' ? '/teacher/dashboard' : '/student'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white text-sm font-bold"
                >
                  Open {role === 'teacher' ? 'Coaching OS' : 'Student OS'}
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 text-red-400 text-sm font-semibold border border-white/5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center py-2.5 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white text-xs font-bold"
                >
                  Student Register
                </Link>
                <Link
                  to="/teacher/portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="col-span-2 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold"
                >
                  <Building2 className="w-4 h-4" />
                  <span>For Coaching Centers & Private Tutors</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
