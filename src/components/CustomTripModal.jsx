import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Compass, Calendar, Users, Clock, DollarSign, Sparkles, Send } from 'lucide-react';

export default function CustomTripModal() {
  const { isCustomTripOpen, setIsCustomTripOpen, createLead } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    durationDays: '5',
    adults: '2',
    children: '0',
    budget: '50000',
    preferences: '',
    hotelType: '4-Star Premium'
  });

  if (!isCustomTripOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and phone number so our travel expert can reach you.');
      return;
    }

    createLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      destination: formData.destination || 'Custom Tailored Itinerary',
      travelDate: formData.travelDate,
      adults: formData.adults,
      children: formData.children,
      budget: formData.budget,
      tourType: 'private',
      source: 'Plan My Trip Modal',
      specialRequirements: `Custom Trip Request: ${formData.durationDays} Days, ${formData.hotelType} preference. Notes: ${formData.preferences || 'None provided'}.`
    });

    setIsCustomTripOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsCustomTripOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-icon-wrapper" style={{ width: '38px', height: '38px' }}>
              <Compass size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>
                Plan My Dream Trip
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Tell us where and how you love to travel — we'll tailor every detail.
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setIsCustomTripOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          {/* Contact Details */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Ramesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <input
                type="tel"
                required
                className="form-input"
                placeholder="e.g. +91 98427 00000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="ramesh@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Destination *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Dubai, Bali, Kashmir, Switzerland..."
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </div>
          </div>

          {/* Trip Specifications */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Tentative Travel Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.travelDate}
                onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Number of Days</label>
              <select
                className="form-select"
                value={formData.durationDays}
                onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
              >
                <option value="3">3 Days (Weekend Break)</option>
                <option value="5">5 Days (Standard Holiday)</option>
                <option value="7">7 Days (Full Explorer)</option>
                <option value="10">10+ Days (Extended Grand Tour)</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Adults (12+ yrs)</label>
              <input
                type="number"
                min="1"
                max="50"
                className="form-input"
                value={formData.adults}
                onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Children (Below 12)</label>
              <input
                type="number"
                min="0"
                max="20"
                className="form-input"
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Approx Budget (Total or per person)</label>
              <select
                className="form-select"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              >
                <option value="25000">₹25,000 - ₹40,000</option>
                <option value="50000">₹50,000 - ₹75,000</option>
                <option value="100000">₹1,00,000 - ₹1,50,000</option>
                <option value="200000">₹2,00,000+ (Luxury Private)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Hotel Preference</label>
              <select
                className="form-select"
                value={formData.hotelType}
                onChange={(e) => setFormData({ ...formData, hotelType: e.target.value })}
              >
                <option value="3-Star Comfort">3-Star Comfort & Pure Veg Dining</option>
                <option value="4-Star Premium">4-Star Premium Deluxe</option>
                <option value="5-Star Luxury Resort">5-Star Luxury Palace / Overwater Villa</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Any Special Preferences or Requirements?</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="e.g. South Indian pure vegetarian meals required, senior citizen travel pace, anniversary celebration setup..."
              value={formData.preferences}
              onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-gold btn-lg"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            <Send size={18} />
            <span>Generate My Customized Trip Plan</span>
          </button>
        </form>
      </div>
    </div>
  );
}
