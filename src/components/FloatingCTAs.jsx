import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, ArrowUp, MessageSquareText } from 'lucide-react';

export default function FloatingCTAs() {
  const { getWhatsAppLink } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Quick Actions" className="floating-actions-container">
      {/* WhatsApp CTA */}
      <a
        href={getWhatsAppLink("a Memorable Holiday")}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-whatsapp"
        title="Chat with Salem Agent on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquareText size={28} />
      </a>

      {/* Direct Call Button */}
      <a
        href="tel:+919994644744"
        className="floating-btn floating-call"
        title="Call Salem Office (+91 99946 44744)"
        aria-label="Call Salem Office"
      >
        <Phone size={24} />
      </a>

      {/* Back to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="floating-btn"
          style={{ background: '#0b132b', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff' }}
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </aside>
  );
}
