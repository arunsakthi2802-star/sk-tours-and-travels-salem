import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, Menu, X, Sparkles, Play, 
  Home, Info, Users, Shield, MapPin, Compass, PhoneCall 
} from 'lucide-react';

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
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container-wide navbar-inner">
          {/* Brand Logo */}
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

          {/* Desktop & Laptop Navigation Menu */}
          <nav className="nav-menu-wrapper" aria-label="Main Navigation">
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
          </nav>

          {/* Top Bar Actions */}
          <div className="nav-actions">
            {/* Quick Phone Call Pill (Visible on Desktop / Compact on Laptop) */}
            <a 
              href="tel:+919994644744" 
              className="btn btn-outline-gold btn-sm nav-phone-desktop"
              title="Call Salem Headquarters (+91 99946 44744)"
            >
              <Phone size={14} />
              <span className="nav-phone-number">+91 99946 44744</span>
            </a>

            {/* Plan My Trip CTA */}
            <button 
              className="btn btn-gold btn-sm nav-plan-btn"
              onClick={() => setIsCustomTripOpen(true)}
              title="Design your custom holiday itinerary"
            >
              <Sparkles size={14} />
              <span className="nav-plan-text-desktop">Plan My Trip</span>
              <span className="nav-plan-text-mobile">Plan</span>
            </button>

            {/* Replay Video Intro Button (Desktop Only) */}
            <button
              onClick={() => replayIntroLoader()}
              className="btn btn-sm nav-intro-btn"
              title="Watch SK Tours Cinema Intro Video"
            >
              <Play size={13} fill="currentColor" />
              <span>Intro Video</span>
            </button>

            {/* Mobile / Tablet Hamburger Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      <div 
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Off-canvas Right Slide-Over Mobile Drawer */}
      <aside 
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img 
              src="/sk-logo.png" 
              alt="SK Tours Salem" 
              className="mobile-drawer-logo-img" 
            />
            <div>
              <div className="mobile-drawer-brand-name">
                SK <span>TOURS</span>
              </div>
              <div className="mobile-drawer-brand-sub">Salem • Est. 2012</div>
            </div>
          </div>
          <button 
            className="mobile-drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <nav className="mobile-drawer-nav">
          <a className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => handleNavClick('/')}>
            <Home size={18} className="mobile-nav-icon" />
            <span>Home</span>
          </a>
          <a className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => handleNavClick('/about')}>
            <Info size={18} className="mobile-nav-icon" />
            <span>About Us</span>
          </a>
          <a className={`mobile-nav-link ${isActive('/group-tours') ? 'active' : ''}`} onClick={() => handleNavClick('/group-tours')}>
            <Users size={18} className="mobile-nav-icon" />
            <span>Group Tours</span>
          </a>
          <a className={`mobile-nav-link ${isActive('/private-tours') ? 'active' : ''}`} onClick={() => handleNavClick('/private-tours')}>
            <Shield size={18} className="mobile-nav-icon" />
            <span>Private Tours</span>
          </a>
          <a className={`mobile-nav-link ${isActive('/destinations') ? 'active' : ''}`} onClick={() => handleNavClick('/destinations')}>
            <MapPin size={18} className="mobile-nav-icon" />
            <span>Destinations</span>
          </a>
          <a className={`mobile-nav-link ${isActive('/adviser') ? 'active' : ''}`} onClick={() => handleNavClick('/adviser')}>
            <Compass size={18} className="mobile-nav-icon" />
            <span>Travel Adviser</span>
          </a>
          <a className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={() => handleNavClick('/contact')}>
            <PhoneCall size={18} className="mobile-nav-icon" />
            <span>Contact Us</span>
          </a>
        </nav>

        {/* Drawer Action CTAs & Salem Contact */}
        <div className="mobile-drawer-footer">
          <button 
            className="btn btn-gold btn-sm" 
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => { setMobileMenuOpen(false); setIsCustomTripOpen(true); }}
          >
            <Sparkles size={16} />
            <span>Plan My Trip</span>
          </button>

          <button 
            className="btn btn-outline-gold btn-sm" 
            style={{ width: '100%', justifyContent: 'center', gap: '6px' }}
            onClick={() => { setMobileMenuOpen(false); replayIntroLoader(); }}
          >
            <Play size={14} fill="currentColor" />
            <span>Watch Intro Video</span>
          </button>

          <a 
            href="tel:+919994644744" 
            className="btn btn-outline-gold btn-sm"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Phone size={15} />
            <span>Call: +91 99946 44744</span>
          </a>

          <div className="mobile-drawer-location-badge">
            <div style={{ fontWeight: 700, color: 'var(--color-gold-light)', marginBottom: '2px' }}>
              Salem Headquarters
            </div>
            <div>AVR Roundana, Salem - 636004</div>
            <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '2px' }}>
              Mon - Sat: 9:00 AM - 8:30 PM
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
