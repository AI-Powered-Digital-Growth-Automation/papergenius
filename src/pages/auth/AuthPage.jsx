import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Sparkles, Mail, Lock, User, Phone, Building2, 
  ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Eye, EyeOff
} from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../context/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false); // Default to Sign Up for new users
  const [role, setRole] = useState('student'); // 'student' | 'teacher'
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
      if (!email || !email.includes('@')) {
        setError('Kripya valid email address enter karein.');
        return;
      }
      if (password.length < 6) {
        setError('Password kam se kam 6 characters ka hona chahiye.');
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Sign In
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });
        if (signInError) throw signInError;

        const userRole = data?.user?.user_metadata?.role || role;
        setGlobalRole(userRole);
        navigate(userRole === 'teacher' ? '/teacher/dashboard' : '/student', { replace: true });
      } else {
        // Strict Sign Up with Mandatory Phone & Metadata
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
              phone_number: phone.trim(),
              role: role,
              institute_name: role === 'teacher' ? instituteName.trim() : null,
              grade: role === 'student' ? grade : null,
              is_premium: false,
              registered_at: new Date().toISOString()
            }
          }
        });
        if (signUpError) throw signUpError;

        setGlobalRole(role);
        setSuccessMsg('Account safaltapoorvak ban gaya hai! Redirecting to your dashboard...');
        setTimeout(() => {
          navigate(role === 'teacher' ? '/teacher/dashboard' : '/student', { replace: true });
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Authentication error. Kripya details check karein.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 sm:p-9 rounded-3xl bg-[#080D24] border border-[rgba(140,120,255,0.3)] shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3CFF]/20 border border-[#7C3CFF]/40 text-xs font-mono font-bold text-[#C4B5FD]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PaperGenius Official Access</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {isLogin ? 'Welcome Back!' : 'Create Your Account'}
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            {isLogin 
              ? 'Enter your credentials to access your portal' 
              : 'Both Email & Mobile required for Free Plan activation'}
          </p>
        </div>

        {/* Role Toggle for Sign Up */}
        {!isLogin && (
          <div className="flex bg-[#0C1330] p-1.5 rounded-2xl border border-white/10 text-xs sm:text-sm font-bold">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                role === 'student'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Student (Free)</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                role === 'teacher'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Coaching / Tutor</span>
            </button>
          </div>
        )}

        {/* Error / Success Alerts */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-4 text-xs sm:text-sm">
          
          {/* Full Name (Sign Up only) */}
          {!isLogin && (
            <div>
              <label className="text-[#CBD5E1] block mb-1 font-semibold">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 text-white rounded-xl pl-10 pr-3.5 py-3 placeholder-slate-500 focus:outline-none focus:border-[#06B6D4]"
                />
              </div>
            </div>
          )}

          {/* Email Address (MANDATORY) */}
          <div>
            <label className="text-[#CBD5E1] block mb-1 font-semibold">
              Email Address <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0C1330] border border-white/10 text-white rounded-xl pl-10 pr-3.5 py-3 placeholder-slate-500 focus:outline-none focus:border-[#06B6D4]"
              />
            </div>
          </div>

          {/* Mobile / WhatsApp Number (STRICTLY MANDATORY FOR SIGN UP) */}
          {!isLogin && (
            <div>
              <label className="text-[#CBD5E1] block mb-1 font-semibold flex items-center justify-between">
                <span>Mobile / WhatsApp Number <span className="text-red-400">*</span></span>
                <span className="text-[11px] text-[#67E8F9] font-mono">Required for Free Access</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[#94A3B8] font-mono text-xs">
                  <Phone className="w-4 h-4" />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 text-white rounded-xl pl-16 pr-3.5 py-3 font-mono placeholder-slate-500 focus:outline-none focus:border-[#06B6D4]"
                />
              </div>
            </div>
          )}

          {/* Role-Specific Fields (Sign Up only) */}
          {!isLogin && role === 'student' && (
            <div>
              <label className="text-[#CBD5E1] block mb-1 font-semibold">Your Class / Target Board</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-[#0C1330] border border-white/10 text-white rounded-xl p-3 focus:outline-none focus:border-[#06B6D4]"
              >
                <option value="Class 10">Class 10 Board Exam 2026</option>
                <option value="Class 12">Class 12 Board Exam 2026</option>
              </select>
            </div>
          )}

          {!isLogin && role === 'teacher' && (
            <div>
              <label className="text-[#CBD5E1] block mb-1 font-semibold">Institute / Coaching Name</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Science Academy"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 text-white rounded-xl pl-10 pr-3.5 py-3 placeholder-slate-500 focus:outline-none focus:border-[#7C3CFF]"
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="text-[#CBD5E1] block mb-1 font-semibold">
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0C1330] border border-white/10 text-white rounded-xl pl-10 pr-10 py-3 placeholder-slate-500 focus:outline-none focus:border-[#06B6D4]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gradient w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 mt-2 cursor-pointer"
          >
            {loading ? (
              <span>Verifying Credentials...</span>
            ) : (
              <>
                <span>{isLogin ? 'Sign In to Portal' : 'Register & Unlock Free Access'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Switch Login / Sign Up */}
        <div className="pt-2 text-center text-xs text-[#94A3B8] border-t border-white/10">
          {isLogin ? (
            <div>
              New to PaperGenius?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="font-bold text-[#67E8F9] hover:underline cursor-pointer"
              >
                Create Account (Free 5-Yr Papers)
              </button>
            </div>
          ) : (
            <div>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="font-bold text-[#67E8F9] hover:underline cursor-pointer"
              >
                Sign In Here
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
