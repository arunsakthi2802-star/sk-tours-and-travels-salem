import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, MessageSquarePlus, Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReviewsSection() {
  const { feedback, setIsReviewModalOpen } = useApp();
  const approvedReviews = feedback.filter(f => f.status === 'Approved');

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % approvedReviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + approvedReviews.length) % approvedReviews.length);
  };

  return (
    <section className="reviews-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Star size={14} />
            <span>Verified Traveller Stories</span>
          </div>
          <h2 className="section-title">
            Words From Our <span>Salem Travellers</span>
          </h2>
          <p className="section-desc">
            Read authentic stories from local families, couples, and seniors who experienced the world with SK Tours & Travels.
          </p>

          <div style={{ marginTop: '1.5rem' }}>
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => setIsReviewModalOpen(true)}
            >
              <MessageSquarePlus size={15} />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        {approvedReviews.length > 0 ? (
          <div className="reviews-grid">
            {approvedReviews.slice(0, 6).map((rev) => (
              <div key={rev.id} className="review-card">
                <div className="review-header">
                  <img
                    src={rev.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
                    alt={rev.customerName}
                    className="review-avatar"
                  />
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                      {rev.customerName}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>{rev.city}</span> • <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="review-stars">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-gold-dark)', marginBottom: '0.6rem' }}>
                  Tour: {rev.tourTaken} ({rev.travelDate})
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: 1.6, fontStyle: 'italic', flexGrow: 1 }}>
                  "{rev.comment}"
                </p>
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
            <Star size={38} color="#d4af37" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              Share Your Journey With SK Tours
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Traveled with us recently? We would love to feature your review and travel memories on our wall of stories.
            </p>
            <button
              className="btn btn-gold btn-sm"
              onClick={() => setIsReviewModalOpen(true)}
            >
              <MessageSquarePlus size={14} /> Write the First Review
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
