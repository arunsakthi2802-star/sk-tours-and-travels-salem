import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Calendar, UserCheck, Utensils, Hotel, ArrowUpRight, MessageSquareText, ShieldAlert } from 'lucide-react';

const SUB_CATEGORIES = [
  "All Group Tours",
  "Domestic Group Tours",
  "International Group Tours",
  "Pilgrim Group Tours",
  "Premium Group Tours"
];

export default function GroupTours() {
  const { tours, setSelectedTour, openEnquiryWithDestination } = useApp();
  const [selectedSubCat, setSelectedSubCat] = useState("All Group Tours");

  const groupTours = tours.filter(t => {
    if (!t.published) return false;
    if (t.tourType !== 'group') return false;
    if (selectedSubCat === "All Group Tours") return true;
    return t.subCategory === selectedSubCat;
  });

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="group-tours" className="group-tours-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Users size={14} />
            <span>Escorted Journeys</span>
          </div>
          <h2 className="section-title">
            Curated <span>Group Tours</span>
          </h2>
          <p className="section-desc">
            Travel with like-minded explorers from Salem and across Tamil Nadu. Escorted by experienced bilingual tour managers with authentic meals and handpicked hotels.
          </p>

          {/* Subcategory Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {SUB_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedSubCat === cat ? 'active' : ''}`}
                onClick={() => setSelectedSubCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Group Tours Cards */}
        {groupTours.length > 0 ? (
          <div className="tours-grid">
            {groupTours.map((tour) => (
              <div key={tour.id} className="tour-card" style={{ borderTop: '4px solid var(--color-gold)' }}>
                {/* Media */}
                <div className="tour-card-media" onClick={() => setSelectedTour(tour)} style={{ cursor: 'pointer' }}>
                  <img src={tour.image} alt={tour.name} className="tour-card-img" loading="lazy" />
                  <div className="tour-card-badges">
                    <span style={{
                      background: 'var(--color-primary)',
                      color: 'var(--color-gold)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(212, 175, 55, 0.4)'
                    }}>
                      {tour.subCategory || 'Group Tour'}
                    </span>
                    {tour.availableSeats && (
                      <span style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        <ShieldAlert size={12} />
                        Only {tour.availableSeats} Seats Left!
                      </span>
                    )}
                  </div>
                  <div className="badge-duration">
                    <span>{tour.durationDays ? `${tour.durationDays} Days / ${tour.durationNights} Nights` : (tour.duration || 'Flexible')}</span>
                  </div>
                </div>

                {/* Group Tour Specifications Body */}
                <div className="tour-card-body">
                  <div className="tour-card-destination">{tour.destination || 'Salem Departure'}{tour.country ? `, ${tour.country}` : ''}</div>
                  <h3 
                    className="tour-card-title font-serif" 
                    onClick={() => setSelectedTour(tour)} 
                    style={{ cursor: 'pointer' }}
                  >
                    {tour.name}
                  </h3>

                  {/* Group Details Metadata Box */}
                  <div style={{
                    background: 'var(--color-bg-base)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                    fontSize: '0.82rem',
                    margin: '0.5rem 0 1rem 0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-main)' }}>
                      <Calendar size={14} color="#d4af37" />
                      <span><strong>Departure:</strong> {tour.availableDates ? tour.availableDates[0] : (tour.departures?.[0] || 'On Request')}</span>
                    </div>
                    {tour.tourLeader && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-main)' }}>
                        <UserCheck size={14} color="#d4af37" />
                        <span><strong>Tour Leader:</strong> {tour.tourLeader}</span>
                      </div>
                    )}
                    {tour.hotelStars && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-main)' }}>
                        <Hotel size={14} color="#d4af37" />
                        <span><strong>Stays:</strong> {tour.hotelStars}</span>
                      </div>
                    )}
                    {tour.meals && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-main)' }}>
                        <Utensils size={14} color="#d4af37" />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <strong>Meals:</strong> {tour.meals}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="tour-card-footer">
                    <div className="tour-price-box">
                      <span className="price-label">All-Inclusive Starting</span>
                      <span className="price-amount">{formatINR(tour.price)}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => setSelectedTour(tour)}
                      >
                        Itinerary <ArrowUpRight size={13} />
                      </button>
                      <button
                        className="btn btn-gold btn-sm"
                        onClick={() => openEnquiryWithDestination(tour.destination || tour.name)}
                      >
                        <MessageSquareText size={13} />
                        Enquire
                      </button>
                    </div>
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
            <Users size={38} color="#d4af37" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              Custom Group Departures Available
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              We design custom group tours for families, colleges, institutions, and corporate teams departing directly from Salem and Tamil Nadu.
            </p>
            <button
              className="btn btn-gold btn-sm"
              onClick={() => openEnquiryWithDestination('Group Tour')}
            >
              <MessageSquareText size={14} /> Plan a Custom Group Tour
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
