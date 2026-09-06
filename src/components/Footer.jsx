import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Phone, Mail, MapPin, MessageSquareText, Shield, X } from 'lucide-react';

// Inline Social SVGs
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

export default function Footer() {
  const { setFilters, openEnquiryWithDestination, getWhatsAppLink, setCurrentView, navigate, replayIntroLoader } = useApp();
  const [legalModalContent, setLegalModalContent] = useState(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDestinationClick = (destName) => {
    setFilters(prev => ({ ...prev, search: destName, category: 'All' }));
    scrollTo('tour-results');
  };

  const openPolicy = (title, content) => {
    setLegalModalContent({ title, content });
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img 
                  src="/sk-logo.png" 
                  alt="SK Tours Logo" 
                  style={{ width: '45px', height: '45px', objectFit: 'contain' }} 
                />
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                    SK <span style={{ color: 'var(--color-gold)' }}>TOURS & TRAVELS</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    Salem, Tamil Nadu • Est. 2012
                  </div>
                </div>
              </div>

              <p>
                Salem's premier luxury and family travel partner. Crafting unforgettable memories across Dubai, Singapore, Kashmir, Maldives, Bali, Kerala, and sacred Indian yatras with authentic South Indian comfort.
              </p>

              {/* Social Media Links */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold)'
                  }}
                  title="Follow on Instagram"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold)'
                  }}
                  title="Connect on Facebook"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold)'
                  }}
                  title="Subscribe on YouTube"
                >
                  <YoutubeIcon />
                </a>

                <a
                  href={getWhatsAppLink("Salem Website Footer")}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#25d366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}
                  title="Chat on WhatsApp"
                >
                  <MessageSquareText size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-title">Quick Modules</h4>
              <ul className="footer-links">
                <li><a onClick={() => navigate('/')}>Home</a></li>
                <li><a onClick={() => navigate('/about')}>About Us</a></li>
                <li><a onClick={() => navigate('/group-tours')}>Group Tours</a></li>
                <li><a onClick={() => navigate('/private-tours')}>Private Tours</a></li>
                <li><a onClick={() => navigate('/destinations')}>Destinations</a></li>
                <li><a onClick={() => navigate('/adviser')}>Travel Adviser</a></li>
                <li><a onClick={() => navigate('/contact')}>Salem Headquarters</a></li>
                <li><a onClick={() => navigate('/admin')}>Admin Operations CRM</a></li>
              </ul>
            </div>

            {/* Popular Destinations */}
            <div>
              <h4 className="footer-title">Top Destinations</h4>
              <ul className="footer-links">
                <li><a onClick={() => { setFilters(prev => ({ ...prev, search: 'Dubai', category: 'All' })); navigate('/destinations'); }}>Dubai Holidays</a></li>
                <li><a onClick={() => { setFilters(prev => ({ ...prev, search: 'Kashmir', category: 'All' })); navigate('/destinations'); }}>Kashmir & Gulmarg</a></li>
                <li><a onClick={() => { setFilters(prev => ({ ...prev, search: 'Maldives', category: 'All' })); navigate('/destinations'); }}>Maldives Water Villas</a></li>
                <li><a onClick={() => { setFilters(prev => ({ ...prev, search: 'Singapore', category: 'All' })); navigate('/destinations'); }}>Singapore & Malaysia</a></li>
                <li><a onClick={() => { setFilters(prev => ({ ...prev, search: 'Bali', category: 'All' })); navigate('/destinations'); }}>Bali Tropical Retreat</a></li>
                <li><a onClick={() => { setFilters(prev => ({ ...prev, search: 'Kashi', category: 'All' })); navigate('/destinations'); }}>Kashi & Ayodhya Yatra</a></li>
                <li><a onClick={() => { setFilters(prev => ({ ...prev, search: 'Kerala', category: 'All' })); navigate('/destinations'); }}>Kerala Backwaters</a></li>
                <li><a onClick={() => { setFilters(prev => ({ ...prev, search: 'Ooty', category: 'All' })); navigate('/destinations'); }}>Ooty & Nilgiris</a></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="footer-title">Salem Headquarters</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MapPin size={18} color="#d4af37" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>L_4, Staff Quarters, Periyar University, Salem - 636011, Tamil Nadu</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Phone size={18} color="#d4af37" style={{ flexShrink: 0 }} />
                  <a href="tel:+919994644744" style={{ color: '#ffffff' }}>+91 99946 44744</a>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Mail size={18} color="#d4af37" style={{ flexShrink: 0 }} />
                  <a href="mailto:contact@sktourssalem.com" style={{ color: '#cbd5e1' }}>contact@sktourssalem.com</a>
                </div>
                <div style={{ paddingTop: '0.5rem' }}>
                  <button
                    className="btn btn-gold btn-sm"
                    onClick={() => openEnquiryWithDestination('Quick Footer Inquiry')}
                    style={{ width: '100%' }}
                  >
                    Quick Tour Enquiry
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal Bar */}
          <div className="footer-bottom">
            <div>
              © {new Date().getFullYear()} SK TOURS & TRAVELS (Salem). All Rights Reserved.
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a onClick={() => openPolicy('Privacy Policy', 'SK Tours & Travels Salem respects your personal privacy. We never sell or share your contact info with third-party marketers. All passport and visa details provided are processed strictly via official embassy protocols.')}>
                Privacy Policy
              </a>
              <a onClick={() => openPolicy('Terms & Conditions', 'Bookings are subject to seat availability. Airfare tickets are subject to airline fare conditions. Valid Indian passport with at least 6 months validity from travel date is mandatory for international tours.')}>
                Terms & Conditions
              </a>
              <a onClick={() => openPolicy('Cancellation Policy', 'Cancellations 30+ days prior to departure qualify for 85% refund. 15-29 days prior: 50% refund. Within 14 days of departure: non-refundable as hotel and flight bookings are pre-committed.')}>
                Cancellation Policy
              </a>
              <a onClick={() => openPolicy('Refund Policy', 'Approved refunds are credited to the original bank account/payment source within 7-10 working days after deduction of applicable airline or hotel penalties.')}>
                Refund Policy
              </a>
              <a 
                onClick={() => replayIntroLoader()} 
                style={{ cursor: 'pointer', color: 'var(--color-gold)', display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}
                title="Watch SK Tours brand intro video"
              >
                🎬 Watch Intro Video
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {legalModalContent && (
        <div className="modal-backdrop" onClick={() => setLegalModalContent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>
                {legalModalContent.title}
              </h3>
              <button className="modal-close-btn" onClick={() => setLegalModalContent(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', lineHeight: 1.7 }}>
                {legalModalContent.content}
              </p>
              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button className="btn btn-navy btn-sm" onClick={() => setLegalModalContent(null)}>
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
