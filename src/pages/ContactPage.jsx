import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, 
  MessageSquare, Compass, ShieldCheck, CreditCard, HelpCircle, ChevronDown, Sparkles 
} from 'lucide-react';

const FAQS = [
  {
    q: "Where are your main boarding points in Salem for group tours?",
    a: "Our primary group tour boarding points in Salem are: (1) SK Tours Office opposite New Bus Stand, (2) AVR Roundana, (3) Five Roads Junction, and (4) Kondalampatti Bypass. Doorstep pickup is also provided for private tours and full coach charters."
  },
  {
    q: "Is authentic South Indian food guaranteed on your international tours?",
    a: "Yes, absolutely! On all our signature group departures to Dubai, Singapore, Malaysia, and Bali, we arrange dedicated Indian chefs or dine at verified authentic South Indian restaurants offering hot sambar, rasam, dosas, and filter coffee."
  },
  {
    q: "What is the advance booking amount required to confirm a package?",
    a: "For domestic tours, a token advance of 25% confirms your seats and vehicle. For international packages requiring flight tickets and visa processing, an advance of 50% is required, with the balance payable 7 days prior to departure."
  },
  {
    q: "Can I customize the departure date and itinerary for my family?",
    a: "Yes! Every destination in our catalogue can be converted into a bespoke private holiday with your choice of dates, vehicle (Innova Crysta, Urbania, etc.), and accommodation tier."
  }
];

export default function ContactPage() {
  const { navigate, createLead, getWhatsAppLink } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    adults: 2,
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    await createLead({
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      destination: formData.destination || 'Salem Enquiry',
      travelDate: formData.travelDate,
      adults: formData.adults,
      source: 'Contact Page Direct Form',
      specialRequirements: formData.message || 'Direct customer message from Salem contact page.'
    });
    setIsSubmitted(true);
  };

  return (
    <div className="page-root">
      {/* Page Hero Header */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumb">
            <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Contact Us</span>
          </div>
          <div className="page-hero-content">
            <div className="section-badge">
              <Phone size={14} />
              <span>Salem Headquarters</span>
            </div>
            <h1 className="page-hero-title">
              Visit Or Connect With <span>SK Tours Salem</span>
            </h1>
            <p className="page-hero-desc">
              Have questions about an upcoming tour or need a custom holiday quotation? Our experienced Salem team is here to assist you 7 days a week.
            </p>
          </div>
        </div>
      </section>

      {/* Headquarters Contact Cards */}
      <section style={{ padding: '4rem 0', background: '#ffffff', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="contact-cards-grid">
            {/* Address */}
            <div className="contact-info-card">
              <div className="info-card-icon">
                <MapPin size={22} color="var(--color-gold-dark)" />
              </div>
              <h3>Salem Headquarters</h3>
              <p>
                L_4, Staff Quaters,<br />
                Periyar University,<br />
                Salem - 636011, Tamil Nadu, India
              </p>
              <span className="info-card-note">Periyar University Campus, Salem</span>
            </div>

            {/* Telephone */}
            <div className="contact-info-card">
              <div className="info-card-icon">
                <Phone size={22} color="var(--color-gold-dark)" />
              </div>
              <h3>Call & Helpline</h3>
              <p>
                <strong>Main Office:</strong> <a href="tel:+919994644744">+91 99946 44744</a><br />
                <strong>24/7 Helpline:</strong> <a href="tel:+919994644744">+91 99946 44744</a>
              </p>
              <a 
                href={getWhatsAppLink("Contact Page Query")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-gold btn-sm"
                style={{ marginTop: '0.75rem', width: '100%' }}
              >
                <MessageSquare size={14} /> WhatsApp Us
              </a>
            </div>

            {/* Working Hours */}
            <div className="contact-info-card">
              <div className="info-card-icon">
                <Clock size={22} color="var(--color-gold-dark)" />
              </div>
              <h3>Office Timings</h3>
              <p>
                <strong>Monday - Saturday:</strong><br />
                9:00 AM - 8:30 PM (IST)<br />
                <strong>Sunday:</strong><br />
                10:00 AM - 4:00 PM (IST)
              </p>
              <span className="info-card-note">Appointments recommended for custom international tours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Bank Details Layout */}
      <section style={{ padding: '5rem 0', background: 'var(--color-bg-base)' }}>
        <div className="container">
          <div className="contact-layout-split">
            {/* Contact Inquiry Form */}
            <div className="contact-form-panel">
              <div className="section-badge">
                <Send size={13} />
                <span>Send An Inquiry</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-primary)', margin: '0.6rem 0 1rem' }}>
                Plan Your Journey With Salem Experts
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
                Fill in your details below and our senior travel consultant will call you back with verified itineraries and discounted rates.
              </p>

              {isSubmitted ? (
                <div style={{ background: '#ecfdf5', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center', border: '1px solid #10b981' }}>
                  <CheckCircle2 size={42} color="#10b981" style={{ margin: '0 auto 0.75rem' }} />
                  <h3 style={{ color: '#065f46', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Thank You, {formData.name}!</h3>
                  <p style={{ color: '#047857', fontSize: '0.9rem' }}>
                    Your travel inquiry has been received by our Salem office. We will call you back on <strong>{formData.phone}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-actual-form">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label>Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shanmugam M."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 94432 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="name@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Destination of Interest</label>
                      <input
                        type="text"
                        placeholder="e.g. Ooty, Kashmir, Dubai, Kashi"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label>Approximate Travel Date</label>
                      <input
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Number of Travellers</label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={formData.adults}
                        onChange={(e) => setFormData({ ...formData, adults: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div>
                    <label>Additional Notes / Preferences</label>
                    <textarea
                      rows={3}
                      placeholder="Specify hotel preferences, vehicle choice (Innova/Tempo), vegetarian meal requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '0.5rem' }}>
                    <span>Send Travel Inquiry</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Side Panel: Official Bank Details & Assurances */}
            <div className="contact-side-panel">
              {/* Official Bank Accounts */}
              <div className="bank-details-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                  <CreditCard size={20} color="var(--color-gold-dark)" />
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', margin: 0 }}>
                    Official Bank Account Details
                  </h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                  Please use only the official verified corporate accounts of SK Tours & Travels for booking advances and package payments.
                </p>

                <div className="bank-account-box">
                  <div className="bank-account-name">SK TOURS AND TRAVELS</div>
                  <div className="bank-field"><strong>Bank:</strong> HDFC Bank Limited</div>
                  <div className="bank-field"><strong>Branch:</strong> Omalur Main Road, Salem</div>
                  <div className="bank-field"><strong>Current A/C:</strong> 50200084729103</div>
                  <div className="bank-field"><strong>IFSC Code:</strong> HDFC0001284</div>
                  <div className="bank-field"><strong>UPI ID:</strong> sktours.salem@hdfcbank</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.78rem', color: '#15803d' }}>
                  <ShieldCheck size={16} />
                  <span>GST Registered: 33AAAFS1284Q1Z8</span>
                </div>
              </div>

              {/* Salem Office Map Card */}
              <div className="contact-map-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <Compass size={20} color="var(--color-gold-dark)" />
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', margin: 0 }}>
                    Easy Access In Salem
                  </h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Our Salem office is situated at L_4, Staff Quaters, Periyar University, Salem - 636011, easily accessible with dedicated customer parking for cars and tourist vehicles.
                </p>
                <div className="map-visual-placeholder">
                  <MapPin size={32} color="#dc2626" />
                  <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginTop: '0.5rem' }}>
                    SK Tours & Travels HQ
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    L_4, Staff Quaters, Periyar University, Salem - 636011
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div className="section-header">
            <div className="section-badge">
              <HelpCircle size={14} />
              <span>Got Questions?</span>
            </div>
            <h2 className="section-title">
              Frequently Asked <span>Questions</span>
            </h2>
            <p className="section-desc">
              Answers to the most common queries asked by travellers from Salem and neighboring districts.
            </p>
          </div>

          <div className="faq-list" style={{ marginTop: '2.5rem' }}>
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${activeFaq === idx ? 'open' : ''}`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className="faq-chevron" />
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
