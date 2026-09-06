import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Plus, Edit, Trash2, Copy, Eye, EyeOff, Search, Star,
  Calendar, Check, X, Hotel, Plane, Clock, DollarSign
} from 'lucide-react';

export default function AdminTours() {
  const { tours, addTour, updateTour, deleteTour, duplicateTour, togglePublishTour, setSelectedTour } = useApp();
  const [search, setSearch] = useState('');
  const [editingTour, setEditingTour] = useState(null); // tour object or 'new'

  const filteredTours = tours.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.destination.toLowerCase().includes(search.toLowerCase())
  );

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSaveTour = (e) => {
    e.preventDefault();
    const form = e.target;
    const tourData = {
      name: form.name.value,
      destination: form.destination.value,
      country: form.country.value,
      category: form.category.value,
      subCategory: form.subCategory.value,
      tourType: form.tourType.value,
      durationDays: Number(form.durationDays.value),
      durationNights: Number(form.durationNights.value),
      price: Number(form.price.value),
      originalPrice: Number(form.originalPrice.value || form.price.value),
      isPremium: form.isPremium.checked,
      isFeatured: form.isFeatured.checked,
      availableSeats: Number(form.availableSeats.value),
      maxTravellers: Number(form.maxTravellers.value),
      tourLeader: form.tourLeader.value,
      hotelStars: form.hotelStars.value,
      meals: form.meals.value,
      transport: form.transport.value,
      image: form.image.value || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      shortDesc: form.shortDesc.value,
      overview: form.overview.value,
      highlights: form.highlights.value.split('\n').filter(Boolean),
      inclusions: form.inclusions.value.split('\n').filter(Boolean),
      exclusions: form.exclusions.value.split('\n').filter(Boolean),
      published: true
    };

    if (editingTour && editingTour.id) {
      updateTour({ ...editingTour, ...tourData });
    } else {
      addTour(tourData);
    }

    setEditingTour(null);
  };

  return (
    <div>
      {/* Header Bar */}
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
            Tour Packages Management (CMS)
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Manage {tours.length} public and private itineraries, pricing and seat allocations
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="search-input-box" style={{ padding: '0.4rem 0.8rem' }}>
            <Search size={14} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search tours..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ fontSize: '0.85rem' }}
            />
          </div>

          <button
            className="btn btn-gold btn-sm"
            onClick={() => setEditingTour({})}
          >
            <Plus size={15} /> Add New Tour
          </button>
        </div>
      </div>

      {/* Tours Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredTours.map((tour) => (
          <div
            key={tour.id}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Image Preview & Status Badges */}
            <div style={{ position: 'relative', height: '180px' }}>
              <img
                src={tour.image}
                alt={tour.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                display: 'flex',
                gap: '6px'
              }}>
                <span style={{
                  background: tour.published ? '#10b981' : '#64748b',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '9999px'
                }}>
                  {tour.published ? 'Live On Site' : 'Draft'}
                </span>
                {tour.isPremium && (
                  <span className="badge-premium" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
                    Luxury
                  </span>
                )}
              </div>

              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                background: 'rgba(11, 19, 43, 0.85)',
                color: '#ffffff',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                {tour.durationDays}D / {tour.durationNights}N
              </div>
            </div>

            {/* Tour Info */}
            <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 700, textTransform: 'uppercase' }}>
                {tour.destination}, {tour.country} • {tour.category}
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', margin: '0.35rem 0 0.5rem 0', lineHeight: 1.3 }}>
                {tour.name}
              </h3>

              <div style={{
                background: 'var(--color-bg-base)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.65rem',
                fontSize: '0.8rem',
                marginBottom: '1rem'
              }}>
                <div>Seats Left: <strong>{tour.availableSeats}</strong> / {tour.maxTravellers}</div>
                <div>Tour Leader: <strong>{tour.tourLeader || "Salem Director"}</strong></div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Price per pax</span>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {formatINR(tour.price)}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button
                    onClick={() => togglePublishTour(tour.id)}
                    className="btn btn-outline-dark btn-sm"
                    style={{ padding: '0.35rem' }}
                    title={tour.published ? 'Unpublish' : 'Publish'}
                  >
                    {tour.published ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    onClick={() => setEditingTour(tour)}
                    className="btn btn-outline-dark btn-sm"
                    style={{ padding: '0.35rem' }}
                    title="Edit Tour"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => duplicateTour(tour.id)}
                    className="btn btn-outline-dark btn-sm"
                    style={{ padding: '0.35rem' }}
                    title="Duplicate Tour"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete tour "${tour.name}"?`)) {
                        deleteTour(tour.id);
                      }
                    }}
                    className="btn btn-outline-dark btn-sm"
                    style={{ padding: '0.35rem', color: '#ef4444' }}
                    title="Delete Tour"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tour Add/Edit Modal */}
      {editingTour !== null && (
        <div className="modal-backdrop" onClick={() => setEditingTour(null)}>
          <div
            className="modal-content modal-content-lg"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: 0 }}
          >
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>
                {editingTour.id ? `Edit Tour: ${editingTour.name}` : 'Create New Tour Package'}
              </h3>
              <button className="modal-close-btn" onClick={() => setEditingTour(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTour} style={{ padding: '2rem', maxHeight: '70vh', overflowY: 'auto' }}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Tour Title *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={editingTour.name || ''}
                    className="form-input"
                    placeholder="e.g. Majestic Dubai & Desert Dunes"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Destination City *</label>
                  <input
                    type="text"
                    name="destination"
                    required
                    defaultValue={editingTour.destination || ''}
                    className="form-input"
                    placeholder="e.g. Dubai"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    name="country"
                    defaultValue={editingTour.country || ''}
                    className="form-input"
                    placeholder="e.g. United Arab Emirates"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Category</label>
                  <select name="category" defaultValue={editingTour.category || 'International'} className="form-select">
                    <option value="International">International</option>
                    <option value="Domestic">Domestic</option>
                    <option value="Pilgrimage">Pilgrimage</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Sub-Category</label>
                  <select name="subCategory" defaultValue={editingTour.subCategory || 'Premium Group Tours'} className="form-select">
                    <option value="Domestic Group Tours">Domestic Group Tours</option>
                    <option value="International Group Tours">International Group Tours</option>
                    <option value="Pilgrim Group Tours">Pilgrim Group Tours</option>
                    <option value="Premium Group Tours">Premium Group Tours</option>
                    <option value="Couple Tours">Couple Tours</option>
                    <option value="Family Tours">Family Tours</option>
                    <option value="Honeymoon Tours">Honeymoon Tours</option>
                    <option value="Luxury Tours">Luxury Tours</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Tour Type</label>
                  <select name="tourType" defaultValue={editingTour.tourType || 'group'} className="form-select">
                    <option value="group">Group Tour</option>
                    <option value="private">Private Tour</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Duration Days</label>
                  <input type="number" name="durationDays" defaultValue={editingTour.durationDays || 5} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Duration Nights</label>
                  <input type="number" name="durationNights" defaultValue={editingTour.durationNights || 4} className="form-input" />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Starting Price (INR) *</label>
                  <input type="number" name="price" required defaultValue={editingTour.price || 45000} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Original Strike Price (INR)</label>
                  <input type="number" name="originalPrice" defaultValue={editingTour.originalPrice || 55000} className="form-input" />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Available Seats</label>
                  <input type="number" name="availableSeats" defaultValue={editingTour.availableSeats || 10} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Max Group Size</label>
                  <input type="number" name="maxTravellers" defaultValue={editingTour.maxTravellers || 25} className="form-input" />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Tour Leader Name</label>
                  <input type="text" name="tourLeader" defaultValue={editingTour.tourLeader || 'Mr. S. Karthikeyan (Salem Director)'} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Hotel Rating</label>
                  <input type="text" name="hotelStars" defaultValue={editingTour.hotelStars || '4-Star Premium'} className="form-input" />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Meal Plan</label>
                  <input type="text" name="meals" defaultValue={editingTour.meals || 'Breakfast & Dinners Included (South Indian Available)'} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Transport Included</label>
                  <input type="text" name="transport" defaultValue={editingTour.transport || 'AC Pushback Luxury Coach & Transfers'} className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Hero Image URL</label>
                <input type="text" name="image" defaultValue={editingTour.image || ''} className="form-input" placeholder="https://images.unsplash.com/..." />
              </div>

              <div className="form-group">
                <label className="form-label">Short Description</label>
                <input type="text" name="shortDesc" defaultValue={editingTour.shortDesc || ''} className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Full Tour Overview</label>
                <textarea name="overview" rows={3} defaultValue={editingTour.overview || ''} className="form-textarea"></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Highlights (One item per line)</label>
                <textarea name="highlights" rows={3} defaultValue={editingTour.highlights ? editingTour.highlights.join('\n') : ''} className="form-textarea"></textarea>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Inclusions (One per line)</label>
                  <textarea name="inclusions" rows={3} defaultValue={editingTour.inclusions ? editingTour.inclusions.join('\n') : ''} className="form-textarea"></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Exclusions (One per line)</label>
                  <textarea name="exclusions" rows={3} defaultValue={editingTour.exclusions ? editingTour.exclusions.join('\n') : ''} className="form-textarea"></textarea>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 600 }}>
                  <input type="checkbox" name="isPremium" defaultChecked={editingTour.isPremium || false} />
                  Mark as Luxury / Premium
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 600 }}>
                  <input type="checkbox" name="isFeatured" defaultChecked={editingTour.isFeatured || false} />
                  Feature on Homepage
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-gold btn-lg" style={{ flex: 1 }}>
                  Save Tour Package
                </button>
                <button type="button" className="btn btn-outline-dark btn-lg" onClick={() => setEditingTour(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
