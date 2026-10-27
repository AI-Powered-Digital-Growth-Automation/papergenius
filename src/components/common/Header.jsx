import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, Menu, X, ArrowRight, User, 
  Building2, BookOpen, Layers, Award, LogOut, ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, role, signOut, coachingSubscription } = useAuth();

  // Navigation Links including Blog
  const navLinks = [
    { name: 'Student OS', path: '/student' },
    { name: 'Coaching OS', path: '/teacher/dashboard' },
    { name: '5-Yr PYQs', path: '/pyq-vault' },
    { name: 'Class 10', path: '/class-10' },
    { name: 'Class 12', path: '/class-12' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#050814]/90 backdrop-blur-md border-b border-white/10 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3CFF] to-[#06B6D4] flex items-center justify-center text-white shadow-lg shadow-[#7C3CFF]/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Paper<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5EE7FF] to-[#8C78FF]">Genius</span>
            </span>
            <span className="block text-[10px] font-mono text-[#94A3B8] -mt-1 tracking-wider uppercase">
              CBSE Exam OS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#080D24] p-1.5 rounded-2xl border border-white/5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-md'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action / Profile Button */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Admin shortcut */}
          <Link
            to="/admin"
            className="px-3 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-[#C4B5FD] border border-purple-500/30 text-xs font-bold flex items-center gap-1.5"
            title="Founder Admin Control Panel"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#C4B5FD]" />
            <span>Admin Panel</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to={role === 'teacher' ? '/teacher/dashboard' : '/student'}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0C1330] border border-white/10 text-xs font-bold text-white hover:border-[#06B6D4]/50"
              >
                {role === 'teacher' ? (
                  <>
                    <Building2 className="w-4 h-4 text-[#C4B5FD]" />
                    <span>{coachingSubscription?.instituteName ? coachingSubscription.instituteName.slice(0, 15) + '...' : 'Coaching OS'}</span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 text-[#67E8F9]" />
                    <span>Student Portal</span>
                  </>
                )}
              </Link>
              <button
                onClick={signOut}
                className="p-2 rounded-xl bg-white/5 hover:bg-red-950/40 hover:text-red-300 text-[#94A3B8] border border-white/10"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth"
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#CBD5E1] hover:text-white"
              >
                Log In
              </Link>
              <Link
                to="/teacher/create-paper"
                className="btn-gradient px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg hover:shadow-[#06B6D4]/30 flex items-center gap-1.5"
              >
                <span>Create Paper Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-[#080D24] border border-white/10 text-[#94A3B8] hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080D24] border-b border-white/10 p-5 space-y-3 animate-in fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl text-sm font-semibold text-white hover:bg-white/5"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-2.5 rounded-xl text-xs font-bold text-[#C4B5FD] bg-purple-950/40 border border-purple-500/30"
            >
              Founder Admin Control Panel
            </Link>
            <Link
              to="/teacher/create-paper"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gradient block text-center py-3 rounded-xl text-sm font-bold text-white"
            >
              Create Question Paper Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
