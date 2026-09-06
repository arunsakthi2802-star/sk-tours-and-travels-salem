import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, Calendar, Users, DollarSign, Sparkles, Compass } from 'lucide-react';

export default function EnquiryModal() {
  const { isEnquiryModalOpen, setIsEnquiryModalOpen, enquiryInitialDestination, createLead } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    returnDate: '',
    adults: '2',
    children: '0',
    budget: '50000',
    tourType: 'group',
    specialRequirements: ''
  });

  useEffect(() => {
    if (enquiryInitialDestination) {
      setFormData(prev => ({ ...prev, destination: enquiryInitialDestination }));
    }
  }, [enquiryInitialDestination]);

  if (!isEnquiryModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and mobile number.');
      return;
    }

    createLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      destination: formData.destination || 'Salem Enquiry',
      travelDate: formData.travelDate,
      returnDate: formData.returnDate,
      adults: formData.adults,
      children: formData.children,
      budget: formData.budget,
      tourType: formData.tourType,
      source: 'Website Enquiry',
      specialRequirements: formData.specialRequirements
    });

    setIsEnquiryModalOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsEnquiryModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-icon-wrapper" style={{ width: '38px', height: '38px' }}>
              <Compass size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>
                Enquire About Tour Package
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Guaranteed response from Salem travel experts within 2 business hours.
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setIsEnquiryModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. S. Karthik"
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
                placeholder="+91 94432 00000"
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
                placeholder="karthik@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Destination of Interest *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Dubai, Kashmir, Maldives"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Tentative Departure Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.travelDate}
                onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Return Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Number of Adults (12+ yrs)</label>
              <input
                type="number"
                min="1"
                max="100"
                className="form-input"
                value={formData.adults}
                onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Number of Children (Below 12)</label>
              <input
                type="number"
                min="0"
                max="50"
                className="form-input"
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Budget Per Person (INR)</label>
              <select
                className="form-select"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              >
                <option value="25000">₹20,000 - ₹35,000</option>
                <option value="50000">₹35,000 - ₹60,000</option>
                <option value="75000">₹60,000 - ₹90,000</option>
                <option value="120000">₹1,00,000+ (Luxury Escapes)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tour Type</label>
              <select
                className="form-select"
                value={formData.tourType}
                onChange={(e) => setFormData({ ...formData, tourType: e.target.value })}
              >
                <option value="group">Escorted Group Tour</option>
                <option value="private">Private Family / Couple Tour</option>
                <option value="honeymoon">Romantic Honeymoon Package</option>
                <option value="pilgrimage">Pilgrimage / Spiritual Yatra</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Special Requirements (Diet, Hotel tier, Flight requests)</label>
            <textarea
              className="form-textarea"
              rows={2}
              placeholder="e.g. Vegetarian food, Coimbatore flight pick up, senior citizen friendly pace..."
              value={formData.specialRequirements}
              onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-gold btn-lg"
            style={{ width: '100%', marginTop: '0.75rem' }}
          >
            <Send size={18} />
            <span>Submit Enquiry</span>
          </button>
        </form>
      </div>
    </div>
  );
}
