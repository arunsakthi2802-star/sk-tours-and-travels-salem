import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Sparkles, MapPin, Users, Award, ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  const { setIsCustomTripOpen } = useApp();

  // Animated counters on mount
  const [toursCount, setToursCount] = useState(0);
  const [destCount, setDestCount] = useState(0);
  const [travellersCount, setTravellersCount] = useState(0);

  useEffect(() => {
    const duration = 1600;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setToursCount(Math.floor(progress * 500));
      setDestCount(Math.floor(progress * 50));
      setTravellersCount(Math.floor(progress * 1000));

      if (step >= steps) {
        clearInterval(timer);
        setToursCount(500);
        setDestCount(50);
        setTravellersCount(1000);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const scrollToSearch = () => {
    const el = document.getElementById('search-panel');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header id="hero" className="hero-section">
      {/* Cinematic High-Resolution Travel Imagery */}
      <img
        src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=85"
        alt="Luxury Travel Destination"
        className="hero-bg-media"
      />
      <div className="hero-overlay"></div>

      <div className="container hero-content animate-slide-up">
        {/* Floating Luxury Tag */}
        <div className="hero-badge">
          <Sparkles size={16} color="#d4af37" />
          <span>Salem's Trusted International & Domestic Travel Partner</span>
        </div>

        {/* Hero Heading */}
        <h1 className="hero-title">
          Your Journey <span>Begins Here.</span>
        </h1>

        {/* Supporting Subtext */}
        <p className="hero-subtitle">
          Discover unforgettable destinations, curated travel experiences and journeys designed around you. From the snow-capped valleys of Kashmir to the skyline of Dubai and tranquil overwater villas in Maldives.
        </p>

        {/* Action CTAs */}
        <div className="hero-buttons">
          <button 
            className="btn btn-gold btn-lg"
            onClick={() => setIsCustomTripOpen(true)}
          >
            <Compass size={20} />
            <span>Plan My Trip</span>
          </button>

          <button 
            className="btn btn-outline-gold btn-lg"
            onClick={scrollToSearch}
          >
            <span>Explore Tours</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Floating Travel Statistics */}
        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <div className="stat-number">{toursCount}+</div>
            <div className="stat-label">Curated Tours</div>
          </div>

          <div className="hero-stat-item">
            <div className="stat-number">{destCount}+</div>
            <div className="stat-label">Global Destinations</div>
          </div>

          <div className="hero-stat-item">
            <div className="stat-number">{travellersCount.toLocaleString()}+</div>
            <div className="stat-label">Happy Salem Travellers</div>
          </div>

          <div className="hero-stat-item" style={{ display: 'none', md: 'flex' }}>
            <div className="stat-number" style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              4.9 <span style={{ color: '#f59e0b', fontSize: '1.4rem' }}>★</span>
            </div>
            <div className="stat-label">Customer Rating</div>
          </div>
        </div>
      </div>
    </header>
  );
}
