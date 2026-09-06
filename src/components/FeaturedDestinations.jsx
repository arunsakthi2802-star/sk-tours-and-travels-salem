import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, ArrowRight, Sparkles, MapPin } from 'lucide-react';

export default function FeaturedDestinations() {
  const { destinations, setFilters, openEnquiryWithDestination } = useApp();

  const handleDestinationClick = (destName) => {
    setFilters(prev => ({ ...prev, search: destName, category: 'All' }));
    const el = document.getElementById('tour-results');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="destinations" className="destinations-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Compass size={14} />
            <span>Curated Escapes</span>
          </div>
          <h2 className="section-title">
            Featured <span>Destinations</span>
          </h2>
          <p className="section-desc">
            From idyllic tropical beaches and snow-covered Himalayan peaks to bustling futuristic metropolises, explore our handpicked top destinations for Salem travellers.
          </p>
        </div>

        {/* Destination Cards Grid */}
        {destinations.length > 0 ? (
          <div className="destinations-grid">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="destination-card"
                onClick={() => handleDestinationClick(dest.name)}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="destination-img"
                  loading="lazy"
                />
                <div className="destination-tag">
                  {dest.region || dest.tag}
                </div>

                <div className="destination-overlay">
                  <div className="destination-country">
                    <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    {dest.country || 'Destination'}
                  </div>
                  <h3 className="destination-name font-serif">{dest.name}</h3>
                  <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    {dest.tagline || dest.description}
                  </p>

                  <div className="destination-meta">
                    {dest.bestSeason && <span>Best: {dest.bestSeason}</span>}
                    <span className="destination-price">From {formatINR(dest.startingPrice || 0)}</span>
                  </div>

                  <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#f3c64f', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={13} /> {dest.toursCount || 0} Available Packages
                    </span>
                    <span className="btn btn-gold btn-sm" style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }}>
                      Explore <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            border: '1px dashed var(--color-border)',
            maxWidth: '640px',
            margin: '0 auto'
          }}>
            <Compass size={38} color="#d4af37" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              Where Do You Dream of Travelling?
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Tell us your preferred destination — from Tamil Nadu hill stations to exotic international getaways — and our Salem travel specialists will arrange your perfect package.
            </p>
            <button
              className="btn btn-gold btn-sm"
              onClick={() => openEnquiryWithDestination('')}
            >
              <Sparkles size={14} /> Request Custom Destination Quote
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
