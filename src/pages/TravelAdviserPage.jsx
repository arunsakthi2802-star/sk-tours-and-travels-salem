import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TourCard from '../components/TourCard';
import { 
  Sparkles, Compass, Calendar, Users, DollarSign, MapPin, 
  CheckCircle2, ArrowRight, Phone, MessageSquare, Heart, Shield, RefreshCw 
} from 'lucide-react';

const SEASONS_GUIDE = [
  { month: "Jan - Feb", highlight: "Kashmir Snowfall, Kanyakumari, Goa Beaches, Rameshwaram", type: "Winter Escapes" },
  { month: "Mar - May", highlight: "Ooty Flower Show, Kodaikanal Hills, Munnar Tea Gardens, Manali", type: "Summer Escapes" },
  { month: "Jun - Aug", highlight: "Wayanad Rain Holidays, Coorg Waterfalls, Valley of Flowers", type: "Monsoon Magic" },
  { month: "Sep - Dec", highlight: "Dubai Shopping Festival, Singapore, Bali, Char Dham, Andaman", type: "Festive & International" }
];

export default function TravelAdviserPage() {
  const { tours, navigate, openEnquiryWithDestination, createLead, getWhatsAppLink } = useApp();

  // Interactive Wizard State
  const [step, setStep] = useState(1);
  const [travelType, setTravelType] = useState('Family');
  const [preference, setPreference] = useState('Hills');
  const [duration, setDuration] = useState('3-5');
  const [budget, setBudget] = useState('Moderate');
  const [wizardSubmitted, setWizardSubmitted] = useState(false);

  // Consultation Form State
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultDest, setConsultDest] = useState('Ooty & Kodaikanal');
  const [consultMessage, setConsultMessage] = useState('');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // Filter recommendations based on wizard
  const recommendations = tours.filter((t) => {
    if (preference === 'Hills') {
      return (t.destination || '').toLowerCase().includes('ooty') ||
             (t.destination || '').toLowerCase().includes('kodai') ||
             (t.destination || '').toLowerCase().includes('munnar') ||
             (t.category || '').toLowerCase().includes('hill');
    }
    if (preference === 'Spiritual') {
      return (t.category || '').toLowerCase().includes('pilgrim') ||
             (t.destination || '').toLowerCase().includes('kashi') ||
             (t.destination || '').toLowerCase().includes('temple');
    }
    if (preference === 'Beaches') {
      return (t.destination || '').toLowerCase().includes('goa') ||
             (t.destination || '').toLowerCase().includes('andaman') ||
             (t.destination || '').toLowerCase().includes('kerala') ||
             (t.destination || '').toLowerCase().includes('bali');
    }
    if (preference === 'International') {
      return (t.category || '').toLowerCase().includes('international') ||
             (t.country || '').toLowerCase() !== 'india';
    }
    return true;
  }).slice(0, 3);

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    if (!consultName || !consultPhone) return;
    await createLead({
      name: consultName,
      phone: consultPhone,
      destination: consultDest,
      source: "Travel Adviser Page Consultation",
      specialRequirements: consultMessage || "Requested free 1-on-1 itinerary consultation from Travel Adviser page."
    });
    setConsultSubmitted(true);
  };

  return (
    <div className="page-root">
      {/* Page Hero Header */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumb">
            <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Travel Adviser</span>
          </div>
          <div className="page-hero-content">
            <div className="section-badge">
              <Sparkles size={14} />
              <span>Smart Itinerary Planner</span>
            </div>
            <h1 className="page-hero-title">
              Your Personal <span>Salem Travel Adviser</span>
            </h1>
            <p className="page-hero-desc">
              Not sure where to go, which season is best, or how to budget your next holiday? Use our interactive planner or connect with our senior travel specialists for free advice.
            </p>
          </div>
        </div>
      </section>

      {/* 1. INTERACTIVE WIZARD SECTION */}
      <section style={{ padding: '4.5rem 0', background: 'var(--color-bg-base)' }}>
        <div className="container">
          <div className="adviser-wizard-card">
            <div className="adviser-wizard-header">
              <div className="wizard-icon-box">
                <Sparkles size={24} color="#d4af37" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--color-primary)' }}>
                  Interactive Trip Advisor Wizard
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Answer 4 quick questions to unlock handpicked vacation circuits tailored for your party.
                </p>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="wizard-steps-indicator">
              <div className={`wizard-step-node ${step >= 1 ? 'active' : ''}`}>1. Who is Traveling</div>
              <div className={`wizard-step-node ${step >= 2 ? 'active' : ''}`}>2. Holiday Style</div>
              <div className={`wizard-step-node ${step >= 3 ? 'active' : ''}`}>3. Duration</div>
              <div className={`wizard-step-node ${step >= 4 ? 'active' : ''}`}>4. Budget Level</div>
            </div>

            {/* Step Content */}
            <div className="wizard-step-body">
              {step === 1 && (
                <div>
                  <h3 className="wizard-question-title">Who is traveling with you from Salem?</h3>
                  <div className="wizard-options-grid">
                    {[
                      { id: 'Family', label: 'Family with Children', desc: 'Child-friendly spots, relaxed paces and safe stays' },
                      { id: 'Couple', label: 'Couple / Honeymoon', desc: 'Romantic scenic spots, privacy, luxury candlelit dinners' },
                      { id: 'Seniors', label: 'Senior Citizens', desc: 'Gentle terrains, easy ground transfers, traditional meals' },
                      { id: 'Friends', label: 'Friends / Group', desc: 'Adventure, trekking, nightlife, group bonding activities' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`wizard-choice-btn ${travelType === opt.id ? 'selected' : ''}`}
                        onClick={() => setTravelType(opt.id)}
                      >
                        <strong>{opt.label}</strong>
                        <span>{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="wizard-question-title">What type of holiday experience do you desire?</h3>
                  <div className="wizard-options-grid">
                    {[
                      { id: 'Hills', label: 'Hill Stations & Tea Estates', desc: 'Ooty, Kodaikanal, Munnar, Coorg, Manali' },
                      { id: 'Spiritual', label: 'Sacred Pilgrimages & Temples', desc: 'Kashi, Rameshwaram, Madurai, Char Dham' },
                      { id: 'Beaches', label: 'Beaches, Islands & Coastal', desc: 'Goa, Andaman, Kerala Backwaters, Bali' },
                      { id: 'International', label: 'World Cities & Shopping', desc: 'Dubai, Singapore, Malaysia, Thailand' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`wizard-choice-btn ${preference === opt.id ? 'selected' : ''}`}
                        onClick={() => setPreference(opt.id)}
                      >
                        <strong>{opt.label}</strong>
                        <span>{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="wizard-question-title">How many days can you dedicate to this journey?</h3>
                  <div className="wizard-options-grid">
                    {[
                      { id: '2-3', label: 'Weekend Getaway (2 - 3 Days)', desc: 'Quick rejuvenating recharge nearby' },
                      { id: '3-5', label: 'Short Holiday (4 - 5 Days)', desc: 'Comprehensive exploration of 1 or 2 destinations' },
                      { id: '6-8', label: 'Grand Vacation (6 - 8 Days)', desc: 'Complete multi-city holiday with leisure days' },
                      { id: '9+', label: 'Extended Odyssey (9+ Days)', desc: 'In-depth international or North India circuit' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`wizard-choice-btn ${duration === opt.id ? 'selected' : ''}`}
                        onClick={() => setDuration(opt.id)}
                      >
                        <strong>{opt.label}</strong>
                        <span>{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="wizard-question-title">What is your planned budget per person?</h3>
                  <div className="wizard-options-grid">
                    {[
                      { id: 'Budget', label: 'Budget Friendly', desc: 'Under ₹15,000 per person • Essential comforts' },
                      { id: 'Moderate', label: 'Comfort & Quality', desc: '₹15,000 - ₹35,000 per person • 3★ hotels & AC transport' },
                      { id: 'Premium', label: 'Luxury & Private', desc: '₹35,000 - ₹75,000 per person • 4★ / 5★ boutique resorts' },
                      { id: 'International', label: 'Grand International', desc: '₹75,000+ per person • Flights & luxury inclusion' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`wizard-choice-btn ${budget === opt.id ? 'selected' : ''}`}
                        onClick={() => setBudget(opt.id)}
                      >
                        <strong>{opt.label}</strong>
                        <span>{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="wizard-actions-bar">
              {step > 1 && (
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
              )}
              {step < 4 ? (
                <button
                  className="btn btn-gold btn-sm"
                  onClick={() => setStep(step + 1)}
                >
                  <span>Continue</span>
                  <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  className="btn btn-gold btn-sm"
                  onClick={() => setWizardSubmitted(true)}
                >
                  <Sparkles size={15} />
                  <span>Reveal Matching Packages</span>
                </button>
              )}
            </div>

            {/* Results output if wizard completed */}
            {wizardSubmitted && (
              <div className="wizard-results-box" style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '2px dashed var(--color-border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <span className="section-badge">
                    <Sparkles size={13} /> Matches for {travelType} • {preference}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginTop: '0.5rem' }}>
                    Top Curated Recommendations For You
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Based on your preference for {preference} ({duration} days, {budget} tier):
                  </p>
                </div>

                <div className="tours-grid">
                  {recommendations.length > 0 ? (
                    recommendations.map((t) => <TourCard key={t.id} tour={t} />)
                  ) : (
                    tours.slice(0, 3).map((t) => <TourCard key={t.id} tour={t} />)
                  )}
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button 
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => {
                      setStep(1);
                      setWizardSubmitted(false);
                    }}
                  >
                    <RefreshCw size={14} />
                    <span>Change Preferences & Recalculate</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. SEASONAL DESTINATION CALENDAR GUIDE */}
      <section style={{ padding: '4.5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Calendar size={14} />
              <span>When To Go</span>
            </div>
            <h2 className="section-title">
              Salem Traveller's <span>Season Guide</span>
            </h2>
            <p className="section-desc">
              Unsure which month matches which destination? Here is our veteran travel planners' annual calendar for the ideal climate and festivals.
            </p>
          </div>

          <div className="season-guide-grid" style={{ marginTop: '3rem' }}>
            {SEASONS_GUIDE.map((sg, i) => (
              <div key={i} className="season-guide-card">
                <div className="season-guide-month">{sg.month}</div>
                <div className="season-guide-type">{sg.type}</div>
                <p className="season-guide-highlight">{sg.highlight}</p>
                <button
                  className="btn btn-outline-gold btn-sm"
                  style={{ width: '100%', marginTop: '1rem' }}
                  onClick={() => openEnquiryWithDestination(`Vacation in ${sg.month}`)}
                >
                  <span>Plan for {sg.month}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FREE 1-ON-1 ADVISOR CONSULTATION FORM */}
      <section style={{ padding: '4.5rem 0', background: '#0b132b', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Complimentary Expert Advice
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.3rem', color: '#ffffff', margin: '0.5rem 0 1rem' }}>
              Request A Free Itinerary Consultation
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Speak with Mr. Karthikeyan or our senior destination architects. We will analyze your dates, budget, flight options, and craft the best itinerary at zero extra cost.
            </p>
          </div>

          {consultSubmitted ? (
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', textAlign: 'center', border: '1px solid rgba(212,175,55,0.4)' }}>
              <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.5rem' }}>Consultation Request Received!</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Thank you, {consultName}. One of our Salem travel advisers will call you shortly on {consultPhone} with customized recommendations.
              </p>
            </div>
          ) : (
            <form onSubmit={handleConsultSubmit} className="adviser-consult-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label>Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senthil Nathan"
                    value={consultName}
                    onChange={(e) => setConsultName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94432 00000"
                    value={consultPhone}
                    onChange={(e) => setConsultPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label>Destination You Are Considering</label>
                <input
                  type="text"
                  placeholder="e.g. Kashmir, Dubai, Ooty, Kashi Pilgrimage"
                  value={consultDest}
                  onChange={(e) => setConsultDest(e.target.value)}
                />
              </div>

              <div>
                <label>Specific Questions / Desired Travel Dates</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your group size, travel dates, and any specific preferences..."
                  value={consultMessage}
                  onChange={(e) => setConsultMessage(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                <a
                  href={getWhatsAppLink("Travel Advice & Planning")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm"
                  style={{ background: '#25d366', color: '#ffffff', border: 'none' }}
                >
                  <MessageSquare size={15} />
                  <span>Instant WhatsApp Chat</span>
                </a>

                <button type="submit" className="btn btn-gold">
                  <span>Schedule My Free Consultation</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
