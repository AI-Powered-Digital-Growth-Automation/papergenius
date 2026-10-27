import React from 'react';
import { RefreshCw, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#A8B0C8] hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-[rgba(16,185,129,0.35)] bg-[#0C1330]/90 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 flex items-center justify-center text-[#6EE7B7]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">Refund & Cancellation Policy</h1>
              <p className="text-xs text-[#94A3B8] font-mono">Compliant with Consumer Protection (E-Commerce) Rules, 2020</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[#CBD5E1] leading-relaxed">
            <h3 className="text-lg font-bold text-white">1. Free Evaluation Before Purchase</h3>
            <p>
              PaperGenius offers a completely free Starter Pass (allowing 2 full test paper generations) so coaching institutes and students can thoroughly verify generation speed, layout quality, and CBSE compliance prior to making any financial payment.
            </p>

            <h3 className="text-lg font-bold text-white">2. 7-Day Technical Refund Guarantee</h3>
            <p>
              If you purchase a Monthly or Annual subscription and encounter an unresolvable technical fault (such as system inability to generate papers or failed PDF downloads) that our support team cannot fix within 72 hours of receiving a written complaint, you are eligible for a <strong>100% full refund within 7 days</strong> of purchase.
            </p>

            <h3 className="text-lg font-bold text-white">3. Non-Refundable Scenarios</h3>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Where a subscriber has already utilized more than 20% of their subscription paper quota.</li>
              <li>Change of mind after generating and downloading multiple test papers.</li>
              <li>Top-Up Boosters once credited to an active account.</li>
            </ul>

            <h3 className="text-lg font-bold text-white">4. Refund Processing Time</h3>
            <p>
              Approved refunds are credited back to the original source payment method (UPI, Bank, Card) within <strong>5 to 7 business days</strong> as per banking network turnaround times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}