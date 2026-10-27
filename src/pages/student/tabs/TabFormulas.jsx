import React, { useState } from 'react';
import { FileText, Printer, CheckCircle2, Lock, X, Download } from 'lucide-react';

export default function TabFormulas({ selectedSubject, isUnlocked }) {
  const [activePrintKit, setActivePrintKit] = useState(null);

  // Curated formula content mapping based strictly on selected subject
  const getSubjectKit = (subj) => {
    const s = subj.toLowerCase();
    if (s.includes('science')) {
      return {
        title: 'Class 10 Science: 2-Page All Formula & Chemical Equations',
        tag: 'Class 10 Science',
        desc: 'Complete balanced reactions (Ch 1-4) + Electricity formulas (Ohm Law, Joule Law) + Light mirror & lens formulas.',
        sections: [
          {
            heading: '1. Important Balanced Chemical Equations (Ch 1-4)',
            points: [
              'Combination: CaO(s) + H2O(l) -> Ca(OH)2(aq) + Heat (Slaked lime)',
              'Decomposition: 2 FeSO4(s) --[Heat]--> Fe2O3(s) + SO2(g) + SO3(g) (Green to Brown)',
              'Displacement: Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s) (Blue to Pale Green)',
              'Double Displacement (Precipitation): Na2SO4(aq) + BaCl2(aq) -> BaSO4(s)↓ [White ppt] + 2NaCl(aq)',
              'Bleaching Powder: Ca(OH)2 + Cl2 -> CaOCl2 + H2O',
              'Plaster of Paris: CaSO4.2H2O --[373 K]--> CaSO4.1/2H2O + 1.5 H2O'
            ]
          },
          {
            heading: '2. Electricity & Magnetism Key Formulas (Ch 11-12)',
            points: [
              'Current: I = Q / t  (1 Ampere = 1 Coulomb / 1 sec)',
              'Potential Difference: V = W / Q  (1 Volt = 1 Joule / 1 Coulomb)',
              'Ohm\'s Law: V = I * R  =>  R = ρ * (l / A)',
              'Series Resistors: R_eq = R1 + R2 + R3 (Current remains SAME)',
              'Parallel Resistors: 1/R_eq = 1/R1 + 1/R2 + 1/R3 (Voltage remains SAME)',
              'Joule\'s Heating Law: H = I² * R * t = V * I * t = (V² / R) * t',
              'Electric Power: P = V * I = I² * R = V² / R (1 kWh = 3.6 × 10⁶ Joules)'
            ]
          },
          {
            heading: '3. Light - Reflection & Refraction (Ch 9-10)',
            points: [
              'Mirror Formula: 1/f = 1/v + 1/u  |  Magnification: m = -v/u = h\'/h',
              'Lens Formula: 1/f = 1/v - 1/u  |  Magnification: m = +v/u = h\'/h',
              'Power of Lens: P = 1 / f (in metres)  [SI unit: Dioptre (D)]',
              'Refractive Index: n_21 = Speed of light in medium 1 / Speed in medium 2 = sin(i) / sin(r)'
            ]
          }
        ]
      };
    } else if (s.includes('math')) {
      return {
        title: 'Class 10 Mathematics: Complete Chapter-Wise Formulas',
        tag: 'Class 10 Maths',
        desc: 'Quadratic equation, AP, Trigonometry identities, Surface area & volume, and Statistics formulas.',
        sections: [
          {
            heading: '1. Algebra, Quadratic & Arithmetic Progression',
            points: [
              'Quadratic Formula: x = [-b ± √(b² - 4ac)] / (2a)',
              'Discriminant D = b² - 4ac  (D>0: real & distinct, D=0: real & equal, D<0: no real roots)',
              'AP nth term: a_n = a + (n - 1)d',
              'AP Sum of n terms: S_n = n/2 * [2a + (n - 1)d]  OR  S_n = n/2 * [a + l]'
            ]
          },
          {
            heading: '2. Trigonometry & Coordinate Geometry',
            points: [
              'Identities: sin²θ + cos²θ = 1  |  1 + tan²θ = sec²θ  |  1 + cot²θ = cosec²θ',
              'Distance Formula: d = √[(x2 - x1)² + (y2 - y1)²]',
              'Section Formula: (x, y) = [(m1*x2 + m2*x1)/(m1+m2), (m1*y2 + m2*y1)/(m1+m2)]',
              'Midpoint Formula: (x, y) = [(x1 + x2)/2, (y1 + y2)/2]'
            ]
          },
          {
            heading: '3. Surface Areas, Volumes & Statistics',
            points: [
              'Cylinder: CSA = 2πrh, TSA = 2πr(r+h), Volume = πr²h',
              'Cone: CSA = πrl (where l = √(r²+h²)), TSA = πr(l+r), Volume = (1/3)πr²h',
              'Sphere: Surface Area = 4πr², Volume = (4/3)πr³',
              'Empirical Relationship: Mode = 3 Median - 2 Mean'
            ]
          }
        ]
      };
    } else if (s.includes('physics')) {
      return {
        title: 'Class 12 Physics: All 28 Mandatory Board Derivations & Formulas',
        tag: 'Class 12 Physics',
        desc: 'Gauss Law derivations, Lens Maker formula, Astronomical Telescope, and AC resonance.',
        sections: [
          {
            heading: '1. Electrostatics & Magnetism Derivations',
            points: [
              'Electric Field due to infinite wire: E = λ / (2πε0r)',
              'Field due to uniformly charged thin sheet: E = σ / (2ε0)',
              'Torque on electric dipole in uniform field: τ = p × E = pE sinθ',
              'Biot-Savart Law on circular loop axis: B = (μ0 * I * R²) / [2(R² + x²)^(3/2)]'
            ]
          },
          {
            heading: '2. Optics & Wave Optics',
            points: [
              'Lens Maker\'s Formula: 1/f = (μ - 1) * (1/R1 - 1/R2)',
              'Refraction at single spherical surface: μ2/v - μ1/u = (μ2 - μ1)/R',
              'Prism Formula: μ = sin[(A + δm)/2] / sin(A/2)',
              'Astronomical Telescope Magnification: m = -f_o / f_e (Normal adjustment)'
            ]
          }
        ]
      };
    } else {
      return {
        title: `${subj} Quick-Revision Key Concepts`,
        tag: subj,
        desc: `High-yield definitions, key laws, and exam presentation summaries for ${subj}.`,
        sections: [
          {
            heading: `Core Scoring Topics for ${subj}`,
            points: [
              'Review NCERT exemplar questions and summary boxes.',
              'Memorize all standard definitions with keyword precision.',
              'Use point-wise answers with underlined subheadings in board presentation.'
            ]
          }
        ]
      };
    }
  };

  const currentKit = getSubjectKit(selectedSubject);

  if (!isUnlocked) {
    return (
      <div className="p-10 rounded-2xl bg-[#080D24] border border-red-500/30 text-center space-y-4">
        <Lock className="w-12 h-12 text-red-400 mx-auto" />
        <h3 className="text-xl font-bold text-white">Revision Kit Locked for {selectedSubject}</h3>
        <p className="text-base text-[#94A3B8]">
          Upgrade your Board Pass to access printable revision formula sheets for this subject.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#67E8F9]" />
            <span>Printable Revision Kit ({selectedSubject})</span>
          </h3>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-1">
            Exclusively for your subscribed subject: <strong>{selectedSubject}</strong>. Designed for exam morning rapid revision.
          </p>
        </div>
      </div>

      {/* Subject Formula Card */}
      <div className="p-7 rounded-2xl bg-[#080D24] border border-[rgba(140,120,255,0.3)] shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <span className="px-3.5 py-1.5 rounded-md bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#67E8F9] text-sm font-bold font-mono">
            {currentKit.tag}
          </span>
          <span className="text-xs sm:text-sm text-[#10B981] font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Included in Your Board Pass</span>
          </span>
        </div>

        <div>
          <h4 className="text-xl sm:text-2xl font-black text-white">{currentKit.title}</h4>
          <p className="text-sm sm:text-base text-[#CBD5E1] mt-1.5 leading-relaxed">{currentKit.desc}</p>
        </div>

        {/* Preview of key sections */}
        <div className="space-y-4 pt-2">
          {currentKit.sections.map((sec, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#0C1330] border border-white/5 space-y-2">
              <h5 className="text-base font-bold text-[#67E8F9]">{sec.heading}</h5>
              <ul className="text-sm text-[#E2E8F0] space-y-1.5 list-disc list-inside">
                {sec.points.slice(0, 3).map((pt, pIdx) => (
                  <li key={pIdx}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Print / Save Action */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setActivePrintKit(currentKit)}
            className="btn-gradient flex-1 py-3.5 rounded-xl font-bold text-white shadow-xl hover:opacity-95 flex items-center justify-center gap-2 text-base cursor-pointer"
          >
            <Printer className="w-5 h-5" />
            <span>Open & Print 2-Page Clean PDF</span>
          </button>
        </div>
      </div>

      {/* DEDICATED CLEAN WHITE A4 PRINT MODAL */}
      {activePrintKit && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-black w-full max-w-4xl rounded-2xl shadow-2xl p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Modal Actions */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300 print:hidden">
              <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
                PaperGenius.in Official Revision Cheat-Sheet
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-lg bg-black text-white text-sm font-bold flex items-center gap-1.5 hover:bg-gray-800"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print to PDF Now</span>
                </button>
                <button
                  onClick={() => setActivePrintKit(null)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable A4 Content */}
            <div className="space-y-6 font-sans">
              <div className="border-b-2 border-black pb-3">
                <div className="text-xs uppercase font-bold text-gray-600">CBSE Board Exam 2025/2026 Revision Guide</div>
                <h1 className="text-2xl font-black text-black">{activePrintKit.title}</h1>
                <p className="text-xs text-gray-600 mt-0.5">Verified Step-by-Step Formulas for 100/100 Presentation</p>
              </div>

              {activePrintKit.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-base font-bold bg-gray-100 p-2 border-l-4 border-black text-black">
                    {sec.heading}
                  </h3>
                  <div className="space-y-1.5 pl-3 text-xs sm:text-sm text-gray-900 leading-relaxed font-mono">
                    {sec.points.map((pt, pIdx) => (
                      <div key={pIdx} className="p-1 border-b border-gray-100">
                        • {pt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-300 text-center text-[11px] text-gray-500 font-mono">
                Generated via PaperGenius.in | Certified CBSE Board Exam Operating System
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
