import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, Send } from 'lucide-react';

export default function ReviewModal() {
  const { isReviewModalOpen, setIsReviewModalOpen, submitFeedback } = useApp();

  const [formData, setFormData] = useState({
    customerName: '',
    city: 'Salem',
    tourTaken: '',
    travelDate: '',
    rating: 5,
    comment: ''
  });

  if (!isReviewModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.comment) {
      alert('Please enter your name and a brief review.');
      return;
    }

    submitFeedback(formData);
    setIsReviewModalOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsReviewModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>
              Share Your Travel Experience
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Help fellow Salem travellers by sharing your journey with SK Tours.
            </p>
          </div>
          <button className="modal-close-btn" onClick={() => setIsReviewModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. S. Jayakumar"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">City / Locality</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Salem (Fairlands), Erode"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Tour Package Taken</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Dubai 5-Day Tour, Kashmir"
                value={formData.tourTaken}
                onChange={(e) => setFormData({ ...formData, tourTaken: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Travel Date / Month</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. October 2025"
                value={formData.travelDate}
                onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Your Overall Rating</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.8rem',
                    color: star <= formData.rating ? '#f59e0b' : '#cbd5e1',
                    transition: 'transform 0.1s'
                  }}
                >
                  ★
                </button>
              ))}
              <span style={{ alignSelf: 'center', marginLeft: '0.5rem', fontWeight: 700, color: '#f59e0b' }}>
                {formData.rating} / 5 Stars
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Your Review & Feedback *</label>
            <textarea
              required
              className="form-textarea"
              rows={4}
              placeholder="Tell us about the hotel comfort, food arrangements, our tour manager, and your overall experience..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-gold btn-lg"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <Send size={16} />
            <span>Submit Verified Review</span>
          </button>
        </form>
      </div>
    </div>
  );
}
