import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Star, MapPin, CheckCircle2, ArrowUpRight, MessageSquareText } from 'lucide-react';

export default function TourCard({ tour }) {
  const { setSelectedTour, openEnquiryWithDestination } = useApp();

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="tour-card">
      {/* Media Header */}
      <div className="tour-card-media" onClick={() => setSelectedTour(tour)} style={{ cursor: 'pointer' }}>
        <img
          src={tour.image}
          alt={tour.name}
          className="tour-card-img"
          loading="lazy"
        />
        <div className="tour-card-badges">
          {tour.isPremium ? (
            <span className="badge-premium">Luxury Tour</span>
          ) : (
            <span style={{
              background: 'rgba(11, 19, 43, 0.85)',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px'
            }}>
              {tour.category}
            </span>
          )}

          <span className="badge-rating">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span>{tour.rating}</span>
            <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>({tour.reviewsCount})</span>
          </span>
        </div>

        <div className="badge-duration">
          <Clock size={13} color="#0b132b" />
          <span>{tour.durationDays}D / {tour.durationNights}N</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="tour-card-body">
        <div className="tour-card-destination">
          <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
          {tour.destination}, {tour.country}
        </div>

        <h3
          className="tour-card-title font-serif"
          onClick={() => setSelectedTour(tour)}
          style={{ cursor: 'pointer' }}
          title={tour.name}
        >
          {tour.name}
        </h3>

        <p className="tour-card-desc">
          {tour.shortDesc}
        </p>

        {/* Highlights Preview */}
        <ul className="tour-highlights-list">
          {tour.highlights && tour.highlights.slice(0, 2).map((h, idx) => (
            <li key={idx} className="tour-highlight-item">
              <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h}</span>
            </li>
          ))}
        </ul>

        {/* Card Footer: Price & CTAs */}
        <div className="tour-card-footer">
          <div className="tour-price-box">
            <span className="price-label">Starting From</span>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="price-amount">{formatINR(tour.price)}</span>
              {tour.originalPrice && (
                <span className="price-original">{formatINR(tour.originalPrice)}</span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => setSelectedTour(tour)}
              title="View Detailed Day-by-Day Itinerary"
            >
              Details
              <ArrowUpRight size={14} />
            </button>

            <button
              className="btn btn-gold btn-sm"
              onClick={() => openEnquiryWithDestination(tour.destination)}
              title="Enquire about this tour package"
            >
              <MessageSquareText size={14} />
              Enquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
