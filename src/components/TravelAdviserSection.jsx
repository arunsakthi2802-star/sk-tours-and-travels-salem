import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Sparkles, Send, PhoneCall, CheckCircle, ShieldCheck } from 'lucide-react';

export default function TravelAdviserSection() {
  const { createLead } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    travellers: '2 Travellers',
    budget: '₹50,000 - ₹1,00,000',
    travelStyle: 'Leisure & Sightseeing',
    specialRequirements: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number so our travel expert can advise you.');
      return;
    }

    createLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      destination: formData.destination || 'Open to Expert Recommendations',
      travelDate: formData.travelDate,
      adults: parseInt(formData.travellers) || 2,
      budget: formData.budget,
      tourType: 'group',
      source: 'Travel Adviser Wizard',
      specialRequirements: `Travel Adviser Request: Style: ${formData.travelStyle}. Details: ${formData.specialRequirements || 'Adviser consultation requested.'}`
    });

    setFormData({
      name: '',
      phone: '',
      email: '',
      destination: '',
      travelDate: '',
      travellers: '2 Travellers',
      budget: '₹50,000 - ₹1,00,000',
      travelStyle: 'Leisure & Sightseeing',
      specialRequirements: ''
    });
  };

  return (
    <section id="adviser" style={{ padding: '6rem 0', background: 'radial-gradient(circle at 10% 20%, #101d3f 0%, #0b132b 90%)', color: '#ffffff' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Story & Value Column */}
          <div>
            <div className="section-badge" style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#f3c64f', borderColor: 'rgba(212, 175, 55, 0.4)' }}>
              <UserCheck size={14} />
              <span>Personalized Holiday Advisory</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', color: '#ffffff', lineHeight: 1.2, marginBottom: '1.25rem' }}>
              Not sure where to travel? <br />
              <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Let our travel experts design the perfect trip for you.</span>
            </h2>

            <p style={{ color: '#cbd5e1', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Every traveller is unique. Whether you crave the crisp pine mountain breezes of Kashmir, the shimmering skyline of Dubai, a sacred family pilgrimage, or a secluded private overwater villa, our Salem holiday advisors craft custom itineraries that match your exact style and budget.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#e2e8f0', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={18} color="#d4af37" />
                <span>Zero service consultation fee — 100% complimentary advice</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={18} color="#d4af37" />
                <span>Tailored hotel recommendations matching South Indian food preferences</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={18} color="#d4af37" />
                <span>Flight connections and door-to-door transit from Salem & Coimbatore</span>
              </div>
            </div>

            <div style={{
              marginTop: '2.5rem',
              padding: '1.25rem',
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'var(--color-gold)',
                color: '#0b132b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PhoneCall size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Speak Directly With Head Travel Consultant
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                  +91 99946 44744 (Salem Office)
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
            color: 'var(--color-text-main)'
          }}>
            <h3 style={{ fontSize: '1.45rem', color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
              Request A Travel Consultation
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Fill in your thoughts and our specialist will reach out with curated options.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Anandha Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
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
                  <label className="form-label">Email ID</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="name@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Destination</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Dubai or Suggest Best Season"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Tentative Travel Month/Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Travel Style</label>
                  <select
                    className="form-select"
                    value={formData.travelStyle}
                    onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
                  >
                    <option value="Family Holiday">Family Holiday with Kids</option>
                    <option value="Romantic Honeymoon">Romantic Honeymoon Couple</option>
                    <option value="Spiritual / Pilgrim Yatra">Spiritual / Pilgrim Yatra</option>
                    <option value="Senior Citizen Leisure">Senior Citizen Leisure Tour</option>
                    <option value="Adventure & Nature">Adventure & Nature Trails</option>
                    <option value="Friends Group Tour">Friends Escapade</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Approximate Budget Per Person</label>
                <select
                  className="form-select"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="₹15,000 - ₹30,000">₹15,000 - ₹30,000 (Domestic Hills / Kerala)</option>
                  <option value="₹30,000 - ₹50,000">₹30,000 - ₹50,000 (Kashmir / Rajasthan)</option>
                  <option value="₹50,000 - ₹80,000">₹50,000 - ₹80,000 (Dubai / Bali / Singapore)</option>
                  <option value="₹1,00,000+">₹1,00,000+ (Maldives / Europe Luxury)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Special Requirements (Optional)</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="e.g. Vegetarian food, wheelchair assistance, anniversary surprise..."
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-gold btn-lg"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                <Sparkles size={18} />
                <span>Talk to a Travel Expert</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
