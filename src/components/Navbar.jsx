import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Menu, X, Sparkles, Play } from 'lucide-react';

export default function Navbar() {
  const { 
    currentPath, 
    navigate, 
    setIsCustomTripOpen,
    replayIntroLoader
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container-wide navbar-inner">
          {/* Brand Logo with Custom Logo Image */}
          <div className="brand-logo" onClick={() => handleNavClick('/')} style={{ cursor: 'pointer' }}>
            <img 
              src="/sk-logo.png" 
              alt="SK Tours & Travels Salem" 
              className="navbar-brand-logo-img" 
            />
            <div className="brand-text">
              <div className="brand-title">
                SK <span>TOURS</span>
              </div>
              <div className="brand-subtitle">Salem • Est. 2012</div>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <ul className="nav-menu">
            <li>
              <a 
                className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                onClick={() => handleNavClick('/')}
              >
                HOME
              </a>
            </li>
            <li>
              <a 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`} 
                onClick={() => handleNavClick('/about')}
              >
                ABOUT US
              </a>
            </li>
            <li>
              <a 
                className={`nav-link ${isActive('/group-tours') ? 'active' : ''}`} 
                onClick={() => handleNavClick('/group-tours')}
              >
                GROUP TOURS
              </a>
            </li>
            <li>
              <a 
                className={`nav-link ${isActive('/private-tours') ? 'active' : ''}`} 
                onClick={() => handleNavClick('/private-tours')}
              >
                PRIVATE TOURS
              </a>
            </li>
            <li>
              <a 
                className={`nav-link ${isActive('/destinations') ? 'active' : ''}`} 
                onClick={() => handleNavClick('/destinations')}
              >
                DESTINATIONS
              </a>
            </li>
            <li>
              <a 
                className={`nav-link ${isActive('/adviser') ? 'active' : ''}`} 
                onClick={() => handleNavClick('/adviser')}
              >
                TRAVEL ADVISER
              </a>
            </li>
            <li>
              <a 
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`} 
                onClick={() => handleNavClick('/contact')}
              >
                CONTACT
              </a>
            </li>
          </ul>

          {/* Nav Actions */}
          <div className="nav-actions">
            {/* Quick Phone Call */}
            <a 
              href="tel:+919994644744" 
              className="btn btn-outline-gold btn-sm nav-phone-desktop"
              title="Call Salem Headquarters (+91 99946 44744)"
            >
              <Phone size={15} />
              <span>+91 99946 44744</span>
            </a>

            {/* Plan My Trip CTA */}
            <button 
              className="btn btn-gold btn-sm"
              onClick={() => setIsCustomTripOpen(true)}
            >
              <Sparkles size={15} />
              <span>Plan My Trip</span>
            </button>

            {/* Replay Video Intro Button */}
            <button
              onClick={() => replayIntroLoader()}
              className="btn btn-sm nav-phone-desktop"
              style={{
                background: 'rgba(212, 175, 55, 0.14)',
                color: 'var(--color-gold)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                fontWeight: 700,
                padding: '0.45rem 0.85rem',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Watch SK Tours Intro Video"
            >
              <Play size={13} fill="currentColor" />
              <span>Intro Video</span>
            </button>

            {/* Mobile Hamburger */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <img 
            src="/sk-logo.png" 
            alt="SK Tours Salem" 
            style={{ width: '42px', height: '42px', objectFit: 'contain' }} 
          />
          <div>
            <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1rem' }}>
              SK <span style={{ color: 'var(--color-gold)' }}>TOURS</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Salem • Est. 2012</div>
          </div>
        </div>

        <a className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => handleNavClick('/')}>
          Home
        </a>
        <a className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => handleNavClick('/about')}>
          About Us
        </a>
        <a className={`mobile-nav-link ${isActive('/group-tours') ? 'active' : ''}`} onClick={() => handleNavClick('/group-tours')}>
          Group Tours
        </a>
        <a className={`mobile-nav-link ${isActive('/private-tours') ? 'active' : ''}`} onClick={() => handleNavClick('/private-tours')}>
          Private Tours
        </a>
        <a className={`mobile-nav-link ${isActive('/destinations') ? 'active' : ''}`} onClick={() => handleNavClick('/destinations')}>
          Destinations
        </a>
        <a className={`mobile-nav-link ${isActive('/adviser') ? 'active' : ''}`} onClick={() => handleNavClick('/adviser')}>
          Travel Adviser
        </a>
        <a className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={() => handleNavClick('/contact')}>
          Contact
        </a>

        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button 
            className="btn btn-gold btn-sm" 
            style={{ width: '100%' }}
            onClick={() => { setMobileMenuOpen(false); setIsCustomTripOpen(true); }}
          >
            <Sparkles size={15} />
            <span>Plan My Trip</span>
          </button>
          <button 
            className="btn btn-outline-gold btn-sm" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onClick={() => { setMobileMenuOpen(false); replayIntroLoader(); }}
          >
            <Play size={14} fill="currentColor" />
            <span>Watch Intro Video</span>
          </button>
          <a 
            href="tel:+919994644744" 
            className="btn btn-outline-gold btn-sm"
            style={{ width: '100%' }}
          >
            <Phone size={15} />
            <span>Call: +91 99946 44744</span>
          </a>
        </div>
      </div>
    </>
  );
}
