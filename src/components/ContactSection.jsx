import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, MessageSquareText } from 'lucide-react';

export default function ContactSection() {
  const { createLead, getWhatsAppLink } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill out your name and phone number.');
      return;
    }

    createLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      destination: formData.subject || 'Salem Office Inquiry',
      travelDate: 'Upcoming',
      budget: 'Flexible',
      tourType: 'group',
      source: 'Contact Page Form',
      specialRequirements: `Message: ${formData.message}`
    });

    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <MapPin size={14} />
            <span>Connect With Us</span>
          </div>
          <h2 className="section-title">
            Visit Our <span>Salem Headquarters</span>
          </h2>
          <p className="section-desc">
            Conveniently located near Salem Five Roads Junction. Drop in for a warm cup of coffee and plan your next dream vacation with our tour architects.
          </p>
        </div>

        <div className="contact-layout">
          {/* Office Details & Map Card */}
          <div className="contact-info-card">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#ffffff', marginBottom: '1rem' }}>
              SK Tours & Travels
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Your journey to unforgettable memories begins right here in Salem. Contact us via phone, WhatsApp, or schedule an in-person appointment.
            </p>

            <div className="contact-item">
              <div className="contact-item-icon">
                <MapPin size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Salem Head Office
                </strong>
                <span style={{ fontSize: '0.95rem', color: '#ffffff' }}>
                  L_4, Staff Quaters, Periyar University,<br />
                  Salem, Tamil Nadu — 636011, India.
                </span>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <Phone size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Telephone Hotline
                </strong>
                <a href="tel:+919994644744" style={{ fontSize: '0.95rem', color: '#ffffff', display: 'block' }}>
                  +91 99946 44744
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <Mail size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Official Email
                </strong>
                <a href="mailto:contact@sktourssalem.com" style={{ fontSize: '0.95rem', color: '#ffffff' }}>
                  contact@sktourssalem.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <Clock size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Office Hours
                </strong>
                <span style={{ fontSize: '0.95rem', color: '#ffffff' }}>
                  Monday – Saturday: 9:30 AM – 8:00 PM<br />
                  Sunday: 10:00 AM – 2:00 PM (By Appointment)
                </span>
              </div>
            </div>

            {/* Embedded Google Map Preview */}
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              height: '180px',
              marginTop: '1.5rem',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              <iframe
                title="SK Tours Salem Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.3626244670233!2d78.1345479748182!3d11.668583488539744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf04e13589b27%3A0x6b4478148b8bbcb7!2sFive%20Roads%2C%20Salem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Direct Message Form Card */}
          <div className="contact-form-card">
            <h3 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', marginBottom: '0.4rem' }}>
              Send Us A Message
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              Have questions about international visas, flight bookings, or special group departures? Leave a message below.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. S. Murugesan"
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
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="murugesan@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject / Tour of Interest</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Dubai Tour in November"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Message</label>
                <textarea
                  required
                  rows={4}
                  className="form-textarea"
                  placeholder="Tell us your travel plans, number of family members, or specific queries..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <button
                  type="submit"
                  className="btn btn-gold btn-lg"
                  style={{ flex: 1 }}
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </button>

                <a
                  href={getWhatsAppLink("General Salem Inquiry")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm"
                  style={{ background: '#25d366', color: '#ffffff', fontWeight: 700, padding: '0.8rem 1.25rem' }}
                >
                  <MessageSquareText size={18} />
                  <span>WhatsApp Directly</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
