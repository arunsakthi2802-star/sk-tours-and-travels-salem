import React from 'react';
import { useApp } from '../context/AppContext';
import TourCard from './TourCard';
import { Sparkles, Crown } from 'lucide-react';

export default function PremiumTours() {
  const { tours } = useApp();
  const premiumTours = tours.filter(t => t.isPremium && t.published);

  if (premiumTours.length === 0) {
    return null;
  }

  return (
    <section className="premium-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge" style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#f3c64f', borderColor: 'rgba(212, 175, 55, 0.4)' }}>
            <Crown size={14} />
            <span>Signature Collection</span>
          </div>
          <h2 className="section-title">
            Travel Beyond <span>Ordinary</span>
          </h2>
          <p className="section-desc" style={{ color: '#cbd5e1' }}>
            Indulge in ultra-luxury overwater villas, 5-star desert safaris, private palace retreats, and elite experiences crafted for discerning travellers.
          </p>
        </div>

        <div className="tours-grid">
          {premiumTours.slice(0, 6).map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
