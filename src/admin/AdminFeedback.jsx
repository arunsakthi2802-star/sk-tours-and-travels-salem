import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, CheckCircle, XCircle, Sparkles, Trash2, Plus, X, MessageSquareText } from 'lucide-react';

export default function AdminFeedback() {
  const { feedback, approveFeedback, rejectFeedback, toggleFeatureFeedback, deleteFeedback, submitFeedback } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReview, setNewReview] = useState({
    customerName: '',
    city: 'Salem',
    rating: 5,
    tourTaken: 'Ooty & Kodaikanal Holiday',
    travelDate: 'Recently',
    comment: ''
  });

  const handleCreateReview = (e) => {
    e.preventDefault();
    if (!newReview.customerName || !newReview.comment) return;
    submitFeedback(newReview);
    setShowAddModal(false);
    setNewReview({
      customerName: '',
      city: 'Salem',
      rating: 5,
      tourTaken: 'Ooty & Kodaikanal Holiday',
      travelDate: 'Recently',
      comment: ''
    });
  };

  return (
    <div>
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        border: '1px solid var(--color-border)',
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--color-primary)' }}>
            Customer Reviews & Testimonial Moderation
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Review submissions from travellers ({feedback.length} total). Approved reviews are displayed on the public website.
          </p>
        </div>

        <button 
          className="btn btn-gold btn-sm"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {feedback.map((item) => (
          <div
            key={item.id}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              border: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1.5rem',
              boxShadow: 'var(--shadow-sm)',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', flexGrow: 1, minWidth: '280px' }}>
              <img
                src={item.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
                alt={item.customerName}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-gold)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                    {item.customerName}
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    ({item.city})
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px',
                    background: item.status === 'Approved' ? '#dcfce7' : item.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                    color: item.status === 'Approved' ? '#15803d' : item.status === 'Pending' ? '#b45309' : '#b91c1c'
                  }}>
                    {item.status}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '3px', margin: '0.35rem 0', alignItems: 'center', flexWrap: 'wrap' }}>
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginLeft: '6px' }}>
                    Tour: {item.tourTaken} ({item.travelDate})
                  </span>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: 1.5, marginTop: '0.4rem' }}>
                  "{item.comment}"
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, flexWrap: 'wrap' }}>
              {item.status !== 'Approved' && (
                <button
                  onClick={() => approveFeedback(item.id)}
                  className="btn btn-sm"
                  style={{ background: '#10b981', color: '#ffffff' }}
                >
                  <CheckCircle size={14} /> Approve
                </button>
              )}

              {item.status !== 'Rejected' && (
                <button
                  onClick={() => rejectFeedback(item.id)}
                  className="btn btn-outline-dark btn-sm"
                  style={{ color: '#ef4444' }}
                >
                  <XCircle size={14} /> Reject
                </button>
              )}

              <button
                onClick={() => toggleFeatureFeedback(item.id)}
                className={`btn btn-sm ${item.featured ? 'btn-gold' : 'btn-outline-dark'}`}
                title={item.featured ? 'Featured on homepage' : 'Mark as featured'}
              >
                <Sparkles size={14} /> {item.featured ? 'Featured' : 'Feature'}
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete review from ${item.customerName}?`)) {
                    deleteFeedback(item.id);
                  }
                }}
                className="btn btn-sm"
                style={{ background: '#fee2e2', color: '#dc2626' }}
                title="Delete review"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="modal-overlay active">
          <div className="modal-container" style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>Add Customer Testimonial</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateReview} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newReview.customerName}
                  onChange={(e) => setNewReview({ ...newReview, customerName: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>City</label>
                  <input
                    type="text"
                    value={newReview.city}
                    onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Rating (1-5)</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Tour Taken</label>
                <input
                  type="text"
                  value={newReview.tourTaken}
                  onChange={(e) => setNewReview({ ...newReview, tourTaken: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Review Comment</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe traveller's experience with SK Tours..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--color-border)', resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold btn-sm">
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
