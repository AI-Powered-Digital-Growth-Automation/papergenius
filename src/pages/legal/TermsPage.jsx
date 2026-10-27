import React from 'react';
import { FileText, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#A8B0C8] hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-[rgba(140,120,255,0.35)] bg-[#0C1330]/90 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#7C3CFF]/20 flex items-center justify-center text-[#C4B5FD]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">Terms of Service</h1>
              <p className="text-xs text-[#94A3B8] font-mono">Governed by Digital Gulzar Marketing Services (UDYAM-RJ-32-0002216)</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[#CBD5E1] leading-relaxed">
            <h3 className="text-lg font-bold text-white">1. Agreement & Acceptance</h3>
            <p>
              By accessing PaperGenius.in ("Platform"), you agree to abide by these Terms of Service. If you are registering on behalf of a coaching institute, school, or tuition academy, you represent that you have the authority to bind such legal entity.
            </p>

            <h3 className="text-lg font-bold text-white">2. Fair Usage Quotas & Anti-Abuse Policy</h3>
            <p>
              Subscriptions provide defined paper quotas to maintain high-speed cloud operations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Starter Trial:</strong> 2 test papers total (lifetime evaluation).</li>
              <li><strong>Tuition Master (Monthly):</strong> 12 test papers per monthly billing cycle. Quota resets every 30 days without rollover.</li>
              <li><strong>Coaching Director Pro (Annual):</strong> 150 test papers per 365-day academic cycle. Top-Up Boosters (25 papers for ₹499) may be purchased as needed.</li>
              <li>Automated scraping, batch mass downloading, or programmatic reverse engineering of the question bank is strictly prohibited and results in immediate account termination.</li>
            </ul>

            <h3 className="text-lg font-bold text-white">3. White-Label Branding & Trademark Ownership</h3>
            <p>
              Subscribers retain full proprietary rights over their uploaded coaching logos and institute names. By uploading an institute logo, you warrant that you possess the lawful right and trademark authority to print such logo on examination papers.
            </p>

            <h3 className="text-lg font-bold text-white">4. Dynamic QR Cloud Solutions</h3>
            <p>
              Dynamic QR codes printed on test papers provide live digital solution access. These cloud links remain active for students and parents during the currency of your subscription. Upon subscription expiry, verification links are archived.
            </p>

            <h3 className="text-lg font-bold text-white">5. Governing Law & Jurisdiction</h3>
            <p>
              These Terms are governed by and construed in accordance with the laws of the Republic of India. Any legal disputes arising out of the platform shall be subject to the exclusive jurisdiction of the competent courts in Rajasthan, India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}