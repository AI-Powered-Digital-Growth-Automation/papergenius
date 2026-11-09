import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles, Mail, Lock, User, Phone, Building2,
  ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Eye, EyeOff
} from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../context/AuthContext';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'login';
  const initialRole = searchParams.get('role') === 'teacher' ? 'teacher' : 'student';

  const [isLogin, setIsLogin] = useState(initialMode);
  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [grade, setGrade] = useState('Class 10');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { setRole: setGlobalRole } = useAuth();

  // URL query params change hone par mode update karein
  useEffect(() => {
    const mode = searchParams.get('mode');
    const roleParam = searchParams.get('role');
    if (mode === 'login') {
      setIsLogin(true);
    } else if (mode === 'register') {
      setIsLogin(false);
    }
    if (roleParam === 'teacher' || roleParam === 'student') {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Strict Phone Validation for Sign Up (Must be valid 10-digit Indian number)
    if (!isLogin) {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        setError('Kripya valid 10-digit mobile/WhatsApp number enter karein. Bina mobile number ke registration possible nahi hai.');
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Sign In Flow
        const { data, error: signInErr } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password
        });
        if (signInErr) throw signInErr;

        const userRole = data.user?.user_metadata?.role || 'student';
        if (setGlobalRole) setGlobalRole(userRole);

        if (userRole === 'teacher') {
          navigate('/teacher/dashboard');
        } else {
          navigate('/student');
        }
      } else {
        // Sign Up Flow
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        const { data, error: signUpErr } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            data: {
              full_name: name,
              phone: cleanPhone,
              role: role,
              institute_name: role === 'teacher' ? instituteName : null,
              grade: role === 'student' ? grade : null
            }
          }
        });

        if (signUpErr) throw signUpErr;

        // Auto-create initial user_quota record if session created
        if (data?.user) {
          await supabase.from('user_quotas').upsert({
            user_id: data.user.id,
            email: email.trim().toLowerCase(),
            role: role,
            plan_name: role === 'teacher' ? 'Starter Free Trial' : 'Free Trial Student',
            is_premium: false,
            quota_remaining: 2,
            quota_max: 2,
            subscribed_subjects: role === 'student' ? ['Science', 'Mathematics Standard'] : ['General Syllabus']
          }, { onConflict: 'email' }).catch(err => console.warn('Auto quota record init notice:', err));
        }

        setSuccessMsg('Registration successful! Please check your email to confirm your account, or sign in.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || 'Authentication error. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 bg-[#080D24] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#7C3CFF]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 text-[#C4B5FD] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PaperGenius Official Access</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            {isLogin
              ? 'Enter your registered credentials to access your dashboard'
              : 'Both Email & Mobile required for Free Plan activation'}
          </p>
        </div>

        {/* Role Switcher (Sign Up only) */}
        {!isLogin && (
          <div className="flex p-1 rounded-xl bg-[#0C1330] border border-white/10">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                role === 'student'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student (Free)</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                role === 'teacher'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Coaching / Tutor</span>
            </button>
          </div>
        )}

        {/* Error / Success Notifications */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4 text-xs sm:text-sm">
          {!isLogin && (
            <div>
              <label className="text-[#94A3B8] block mb-1 font-semibold">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3CFF]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[#94A3B8] block mb-1 font-semibold">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0C1330] border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3CFF]"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[#94A3B8] font-semibold">Mobile / WhatsApp Number *</label>
                <span className="text-[10px] text-[#06B6D4] font-mono">Required for Free Access</span>
              </div>
              <div className="relative">
                <span className="text-slate-400 text-xs absolute left-3.5 top-1/2 -translate-y-1/2 font-mono">+91</span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl pl-12 pr-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3CFF] font-mono"
                />
              </div>
            </div>
          )}

          {!isLogin && role === 'student' && (
            <div>
              <label className="text-[#94A3B8] block mb-1 font-semibold">Your Class / Target Board</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-[#0C1330] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#7C3CFF]"
              >
                <option value="Class 10">Class 10 Board Exam 2026</option>
                <option value="Class 12">Class 12 Board Exam 2026</option>
              </select>
            </div>
          )}

          {!isLogin && role === 'teacher' && (
            <div>
              <label className="text-[#94A3B8] block mb-1 font-semibold">Coaching / Academy Name *</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Science Institute"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3CFF]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[#94A3B8] block mb-1 font-semibold">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0C1330] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3CFF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gradient py-3 rounded-xl font-bold text-white text-sm shadow-xl flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-50 transition-all mt-2"
          >
            <span>{loading ? 'Processing...' : isLogin ? 'Sign In to Dashboard' : 'Register & Unlock Free Access'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="pt-2 text-center text-xs text-[#94A3B8]">
          {isLogin ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-[#67E8F9] font-bold hover:underline"
              >
                Create Account (Free)
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-[#67E8F9] font-bold hover:underline"
              >
                Sign In Here
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
