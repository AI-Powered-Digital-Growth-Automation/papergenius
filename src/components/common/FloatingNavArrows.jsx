import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function FloatingNavArrows() {
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowUp(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* Scroll to Top */}
      {showUp && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-xl glass-panel-glow flex items-center justify-center text-[#5EE7FF] hover:text-white hover:bg-[#7C3CFF] border border-[#5EE7FF]/40 shadow-xl transition-all hover:scale-110 active:scale-95 group"
          aria-label="Scroll to top"
          title="Top par jayein"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Scroll to Bottom */}
      <button
        onClick={scrollToBottom}
        className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-[#A8B0C8] hover:text-white hover:bg-[#0C1330] border border-[rgba(140,120,255,0.3)] shadow-xl transition-all hover:scale-110 active:scale-95 group"
        aria-label="Scroll to bottom"
        title="Bottom par jayein"
      >
        <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}