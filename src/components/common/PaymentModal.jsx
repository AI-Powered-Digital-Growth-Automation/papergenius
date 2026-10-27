import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, CheckCircle2, Copy, Check, Smartphone, 
  ShieldCheck, ArrowRight, AlertCircle, Sparkles, QrCode
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PaymentModal({ isOpen, onClose, plan }) {
  const { upgradeToPremium } = useAuth();
  const navigate = useNavigate();

  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !plan) return null;

  // Business UPI Details
  const BUSINESS_UPI_ID = "7737356386@ybl"; // Digital Gulzar PhonePe/GPay UPI ID
  const PAYEE_NAME = "Digital Gulzar Marketing Services";

  // Dynamic UPI URL for QR Code & Mobile App Launch
  const upiIntentUrl = `upi://pay?pa=${BUSINESS_UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${plan.priceNumeric}&cu=INR&tn=${encodeURIComponent(plan.name)}`;
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiIntentUrl)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(BUSINESS_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleVerifyAndActivate = (e) => {
    e.preventDefault();
    const cleanUtr = utrNumber.trim().replace(/[^0-9a-zA-Z]/g, '');

    if (cleanUtr.length < 8) {
      setError('Kripya valid 12-digit UPI Reference / UTR Number enter karein (Jo aapke GPay / PhonePe payment receipt par likha hota hai).');
      return;
    }

    setLoading(true);
    setError(null);

    // Record transaction & Activate plan
    setTimeout(() => {
      upgradeToPremium(
        plan.name,
        plan.targetGrade === 'Class 12' 
          ? ['Physics', 'Chemistry', 'Mathematics', 'Biology'] 
          : ['Science', 'Mathematics Standard']
      );

      // Save UTR record in local storage for Admin Panel tracking
      try {
        const stored = JSON.parse(localStorage.getItem('pg_pending_utrs') || '[]');
        stored.unshift({
          utr: cleanUtr,
          plan: plan.name,
          amount: `₹${plan.priceNumeric}`,
          date: new Date().toLocaleString(),
          status: 'Active (Verified)'
        });
        localStorage.setItem('pg_pending_utrs', JSON.stringify(stored));
      } catch (err) {
        console.warn(err);
      }

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        onClose();
        navigate(plan.type === 'coaching' ? '/teacher/dashboard' : '/student');
      }, 1800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#080D24] text-white w-full max-w-lg rounded-3xl border border-[rgba(140,120,255,0.4)] shadow-2xl p-6 sm:p-8 space-y-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">Payment Verified & Activated!</h3>
            <p className="text-sm text-[#94A3B8] max-w-sm mx-auto">
              Aapka <strong className="text-[#67E8F9]">{plan.name}</strong> 100% unlock ho chuka hai. Redirecting to your dashboard...
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06B6D4]/15 text-[#67E8F9] text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Direct UPI Checkout (0% Extra Fees)</span>
              </div>
              <h2 className="text-2xl font-black text-white">{plan.name}</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5EE7FF] to-[#8C78FF]">
                  ₹{plan.priceNumeric}
                </span>
                <span className="text-xs text-[#94A3B8] font-mono">One-Time / Direct Bank Credit</span>
              </div>
            </div>

            {/* Step 1: Scan QR or Open App */}
            <div className="p-4 rounded-2xl bg-[#0C1330] border border-white/5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="bg-white p-2 rounded-xl shrink-0 shadow-md">
                <img
                  src={qrCodeApiUrl}
                  alt="UPI QR Code"
                  className="w-32 h-32 object-contain"
                />
              </div>

              <div className="space-y-2 text-xs">
                <strong className="text-white block text-sm">Step 1: Scan & Pay with Any App</strong>
                <p className="text-[#94A3B8] leading-relaxed">
                  GPay, PhonePe, Paytm ya BHIM se QR scan karein ya UPI ID copy karein:
                </p>

                {/* Copy UPI ID */}
                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#080D24] border border-white/10 font-mono text-xs">
                  <span className="text-[#67E8F9] truncate">{BUSINESS_UPI_ID}</span>
                  <button
                    onClick={handleCopyUpi}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-white shrink-0 flex items-center gap-1 text-[11px]"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Mobile Direct Pay Button */}
                <a
                  href={upiIntentUrl}
                  className="sm:hidden w-full py-2 rounded-lg bg-emerald-600 text-white font-bold text-center block text-xs"
                >
                  Pay via GPay / PhonePe / Paytm App
                </a>
              </div>
            </div>

            {/* Step 2: Enter UTR */}
            <form onSubmit={handleVerifyAndActivate} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="text-[#CBD5E1] font-semibold block mb-1 flex items-center justify-between">
                  <span>Step 2: Enter 12-Digit UTR / Ref Number <span className="text-red-400">*</span></span>
                  <span className="text-[11px] text-[#94A3B8] font-mono">From Payment Receipt</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 429812345678"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 text-white rounded-xl px-3.5 py-3 font-mono font-bold text-center tracking-widest placeholder-slate-600 focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-gradient w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Verifying Transaction...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>Verify & Unlock Instant Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center text-[11px] text-[#94A3B8] font-mono">
              Payee: <strong className="text-white">{PAYEE_NAME}</strong> • 100% Direct Bank Settlement
            </div>
          </>
        )}

      </div>
    </div>
  );
}
