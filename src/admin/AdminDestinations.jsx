import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Trash2, MapPin, Sparkles, X } from 'lucide-react';

export default function AdminDestinations() {
  const { destinations, addDestination, deleteDestination } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    addDestination({
      name: form.name.value,
      country: form.country.value,
      region: form.region.value,
      startingPrice: Number(form.startingPrice.value),
      bestSeason: form.bestSeason.value,
      tagline: form.tagline.value,
      image: form.image.value || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      popularAttractions: form.attractions.value.split(',').map(s => s.trim())
    });
    setShowAddModal(false);
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
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--color-primary)' }}>
            Destination Management
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Configure global and domestic destination hubs shown on customer portal
          </p>
        </div>

        <button className="btn btn-gold btn-sm" onClick={() => setShowAddModal(true)}>
          <Plus size={15} /> Add Destination
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {destinations.map((dest) => (
          <div
            key={dest.id}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ height: '160px', position: 'relative' }}>
              <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(212, 175, 55, 0.9)',
                color: '#0b132b',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                {dest.region}
              </span>
            </div>

            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>{dest.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{dest.country}</span>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete destination ${dest.name}?`)) {
                      deleteDestination(dest.id);
                    }
                  }}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                  title="Delete Destination"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: '0.5rem 0', lineHeight: 1.4 }}>
                {dest.tagline}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.82rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--color-border-subtle)',
                marginTop: '0.75rem'
              }}>
                <span>Season: <strong>{dest.bestSeason}</strong></span>
                <span style={{ fontWeight: 700, color: 'var(--color-gold-dark)' }}>From {formatINR(dest.startingPrice)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Add New Destination</h3>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleAdd} className="modal-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Destination Name *</label>
                  <input type="text" name="name" required className="form-input" placeholder="e.g. Switzerland" />
                </div>
                <div className="form-group">
                  <label className="form-label">Country *</label>
                  <input type="text" name="country" required className="form-input" placeholder="e.g. Switzerland" />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Region</label>
                  <select name="region" className="form-select">
                    <option value="International">International</option>
                    <option value="Domestic">Domestic</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Starting Price (INR)</label>
                  <input type="number" name="startingPrice" required defaultValue={45000} className="form-input" />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Best Season</label>
                  <input type="text" name="bestSeason" defaultValue="All Year" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Photo URL</label>
                  <input type="text" name="image" className="form-input" placeholder="https://images.unsplash.com/..." />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Tagline</label>
                <input type="text" name="tagline" className="form-input" placeholder="e.g. Alpine peaks & crystal lakes" />
              </div>
              <div className="form-group">
                <label className="form-label">Top Attractions (comma separated)</label>
                <input type="text" name="attractions" className="form-input" placeholder="Mount Titlis, Jungfraujoch, Zurich" />
              </div>
              <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
                Save Destination
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
