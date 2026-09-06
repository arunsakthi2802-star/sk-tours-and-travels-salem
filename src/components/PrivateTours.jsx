import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TourCard from './TourCard';
import { Heart, Sparkles, Compass, ShieldCheck, Clock, Users } from 'lucide-react';

const PRIVATE_CATS = [
  "All Private Tours",
  "Couple Tours",
  "Family Tours",
  "Honeymoon Tours",
  "Luxury Tours"
];

export default function PrivateTours() {
  const { tours, setIsCustomTripOpen } = useApp();
  const [selectedCat, setSelectedCat] = useState("All Private Tours");

  const privateTours = tours.filter(t => {
    if (!t.published) return false;
    if (t.tourType !== 'private') return false;
    if (selectedCat === "All Private Tours") return true;
    return t.subCategory === selectedCat;
  });

  return (
    <section id="private-tours" className="private-tours-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Heart size={14} />
            <span>Tailor-Made Luxury</span>
          </div>
          <h2 className="section-title">
            Exclusive <span>Private Tours</span>
          </h2>
          <p className="section-desc">
            Travel at your own rhythm with private chauffeurs, handpicked 5-star villas, customized itineraries and dedicated 24/7 concierge assistance.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {PRIVATE_CATS.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedCat === cat ? 'active' : ''}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Private Tours Grid */}
        {privateTours.length > 0 && (
          <div className="tours-grid" style={{ marginBottom: '3rem' }}>
            {privateTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}

        {/* "Create Your Own Trip" Interactive Banner */}
        <div className="custom-trip-banner">
          <div style={{ maxWidth: '640px', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#f3c64f', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Sparkles size={16} />
              <span>Bespoke Travel Engineering</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: '#ffffff', marginBottom: '1rem', lineHeight: 1.2 }}>
              Can't find your exact itinerary? <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Create Your Own Trip.</span>
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Choose your destination, preferred departure dates, group size, and hotel rating. Our Salem travel designers will craft a day-by-day blueprint and transparent quote within 4 hours.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: '#e2e8f0', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#d4af37" /> 100% Custom Dates
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} color="#d4af37" /> Quick 4-Hour Turnaround
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} color="#d4af37" /> Private Car & Chauffeur
              </span>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}>
            <button
              className="btn btn-gold btn-lg"
              onClick={() => setIsCustomTripOpen(true)}
              style={{ boxShadow: '0 8px 30px rgba(212, 175, 55, 0.4)' }}
            >
              <Compass size={20} />
              <span>Create Your Own Trip</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
