import React from 'react';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#A8B0C8] hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-[rgba(6,182,212,0.35)] bg-[#0C1330]/90 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#06B6D4]/20 flex items-center justify-center text-[#67E8F9]">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
              <p className="text-xs text-[#94A3B8] font-mono">Compliant with Information Technology Act, 2000 & SPDI Rules</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[#CBD5E1] leading-relaxed">
            <h3 className="text-lg font-bold text-white">1. Commitment to Student & Educator Privacy</h3>
            <p>
              At PaperGenius, operated by Digital Gulzar Marketing Services, we consider user data confidentiality paramount. We DO NOT sell, rent, or monetize personal student or teacher data to third-party advertising brokers.
            </p>

            <h3 className="text-lg font-bold text-white">2. Information We Collect</h3>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Educator Profile:</strong> Name, work email, phone number, and coaching institute branding details (logo, address).</li>
              <li><strong>Student Profile:</strong> Name, email/phone, class grade (10th/12th), and uploaded answers for AI evaluation.</li>
              <li><strong>Billing Information:</strong> Processed securely through RBI-authorized payment aggregators (Cashfree/Razorpay). PaperGenius never stores credit card or bank credentials on its servers.</li>
            </ul>

            <h3 className="text-lg font-bold text-white">3. Usage of AI Models</h3>
            <p>
              Student answer sheets submitted for AI evaluation are analyzed solely for generating scoring feedback and pedagogical advice. Uploaded answer photos are stored in encrypted form and not used to train generic open public models.
            </p>

            <h3 className="text-lg font-bold text-white">4. Grievance Officer</h3>
            <p>
              In accordance with Information Technology Act 2000, for any privacy concerns or data erasure requests, contact: <br />
              <strong>Grievance Officer:</strong> Gulzar Ahmed (Founder) <br />
              <strong>Email:</strong> contact@papergenius.in <br />
              <strong>Entity:</strong> Digital Gulzar Marketing Services, Rajasthan, India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
