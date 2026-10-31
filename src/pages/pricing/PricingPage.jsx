import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ShieldCheck, CheckCircle2, ArrowRight, X,
  ExternalLink, Mail, Phone, QrCode, Building2, User
} from 'lucide-react';

import StudentPricingGrid from '../../components/pricing/StudentPricingGrid';
import CoachingPricingGrid from '../../components/pricing/CoachingPricingGrid';
import PricingPhilosophy from '../../components/pricing/PricingPhilosophy';
import PricingVisualShowcase from '../../components/pricing/PricingVisualShowcase';
import { PAYMENT_LINKS } from '../../config/paymentConfig';

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'coaching'
  const [selectedPlan, setSelectedPlan] = useState(null); // { name, price, key }
  const [utrNumber, setUtrNumber] = useState('');
  const [submittedUtr, setSubmittedUtr] = useState(false);

  const handleOpenPlan = (name, price, key) => {
    setSelectedPlan({ name, price, key });
    setSubmittedUtr(false);
    setUtrNumber('');
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  const handleUtrSubmit = (e) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.trim().length < 6) return;
    setSubmittedUtr(true);
  };

  // Dynamic UPI Deep Link & QR Data
  const upiUrl = selectedPlan
    ? `upi://pay?pa=${PAYMENT_LINKS.businessUpiId}&pn=PaperGenius&am=${selectedPlan.price}&cu=INR&tn=${encodeURIComponent(selectedPlan.name)}`
    : '';

  const phonePeDirectLink = selectedPlan && PAYMENT_LINKS[selectedPlan.key]
    ? PAYMENT_LINKS[selectedPlan.key]
    : null;

  const qrImageUrl = selectedPlan
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUrl)}`
    : '';

  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 text-[#8C78FF] text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#06B6D4]" />
          <span>Transparent CBSE Pricing • 0% Commission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Invest in High-Yield Scores, Not Bloated Question Banks
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Choose a targeted single-subject pass or institutional test factory. Instant PhonePe & UPI activation with zero platform fees.
        </p>

        {/* Tab Switcher */}
        <div className="pt-4 flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#080D24] border border-white/10">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'student'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>For Class 10 & 12 Students</span>
            </button>
            <button
              onClick={() => setActiveTab('coaching')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'coaching'
                  ? 'bg-gradient-to-r from-emerald-500 to-[#06B6D4] text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>For Coaching & Private Tutors</span>
            </button>
          </div>
        </div>
      </div>

      {/* Support / Invoicing Strip */}
      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 text-center">
        <span className="flex items-center gap-1.5 font-medium">
          <Mail className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>Need instant payment receipt or institute quotation?</span>
        </span>
        <a href="mailto:contact@papergenius.in" className="text-white font-bold hover:underline">contact@papergenius.in</a>
        <span className="text-slate-500">•</span>
        <a href="tel:+919530230354" className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
          <Phone className="w-3.5 h-3.5" />
          <span>+91 95302 30354</span>
        </a>
      </div>

      {/* Active Grid (3 Cards) */}
      <div className="w-full">
        {activeTab === 'student' ? (
          <StudentPricingGrid onSelectPlan={handleOpenPlan} />
        ) : (
          <CoachingPricingGrid onSelectPlan={handleOpenPlan} />
        )}
      </div>

      {/* FULL WIDTH IN-DEPTH PRICING PHILOSOPHY & SEO ANALYSIS */}
      <PricingVisualShowcase activeTab={activeTab} />

      <PricingPhilosophy />

      {/* CHECKOUT MODAL: PHONEPE LINK + UPI QR */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0B132B] border border-[#7C3CFF]/40 shadow-2xl p-6 sm:p-8 space-y-6">

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Direct Instant Activation</span>
              <h3 className="text-xl font-black text-white mt-1">{selectedPlan.name}</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-white">₹{selectedPlan.price}</span>
                <span className="text-xs font-semibold text-emerald-400">0% Commission • All UPI Apps</span>
              </div>
            </div>

            {/* PhonePe Direct Link Button */}
            {phonePeDirectLink && (
              <div>
                <a
                  href={phonePeDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#5f259f] hover:bg-[#501e87] text-white text-sm font-bold shadow-lg shadow-[#5f259f]/30 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Pay with PhonePe Link</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-[11px] text-center text-slate-400 mt-1.5 font-mono">
                  Opens PhonePe web gateway / app directly
                </p>
              </div>
            )}

            {/* QR Code Block */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
              <div className="text-xs font-bold text-slate-300">Or Scan with Any UPI App (GPay / Paytm / BHIM)</div>
              <div className="inline-block p-2 rounded-xl bg-white shadow-md">
                <img src={qrImageUrl} alt="UPI QR" className="w-44 h-44 mx-auto" />
              </div>
              <div className="text-[11px] font-mono text-cyan-300 select-all font-semibold">
                UPI ID: {PAYMENT_LINKS.businessUpiId}
              </div>
            </div>

            {/* UTR Verification Form */}
            {!submittedUtr ? (
              <form onSubmit={handleUtrSubmit} className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300">
                  Enter 12-Digit UPI Ref / UTR Number after payment:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. 429810394812"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#080D24] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs transition-all"
                  >
                    Verify
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
                <div className="text-xs font-bold text-emerald-400">UTR {utrNumber} Submitted!</div>
                <p className="text-[11px] text-slate-300">Your plan will unlock instantly. Support desk notified.</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
