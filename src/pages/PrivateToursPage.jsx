import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TourCard from '../components/TourCard';
import { 
  Car, Compass, Sparkles, ShieldCheck, Heart, Award, 
  CheckCircle2, Phone, MessageSquare, ArrowRight, DollarSign, Users 
} from 'lucide-react';

const PRIVATE_VEHICLES = [
  {
    name: "Toyota Innova Crysta",
    category: "Luxury Family MPV",
    seats: "6 - 7 Seater",
    rate: "₹18 - ₹22 / KM",
    perDay: "₹4,500 / day base (300 km included)",
    features: "Captain Seats, Dual Climate AC, Leather Upholstery, Hill Assist",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Force Urbania Executive",
    category: "Ultra-Luxury Mini Coach",
    seats: "12 - 16 Seater",
    rate: "₹28 - ₹34 / KM",
    perDay: "₹7,500 / day base (300 km included)",
    features: "Individual Recliners, Ambient Mood Lighting, Panoramic Windows, USB Ports",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Maruti Dzire / Toyota Etios",
    category: "Comfort Sedan",
    seats: "4 Seater",
    rate: "₹13 - ₹15 / KM",
    perDay: "₹3,200 / day base (300 km included)",
    features: "Chilled AC, High Fuel Efficiency, Smooth City & Hill Navigation",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80"
  }
];

export default function PrivateToursPage() {
  const { tours, navigate, setIsCustomTripOpen, getWhatsAppLink } = useApp();

  // Filter for private & premium tours
  const privateTours = tours.filter(t => t.tourType === 'private' || t.isPremium);

  return (
    <div className="page-root">
      {/* Page Hero Header */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumb">
            <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Private Tours</span>
          </div>
          <div className="page-hero-content">
            <div className="section-badge">
              <Car size={14} />
              <span>Bespoke Private Journeys</span>
            </div>
            <h1 className="page-hero-title">
              Private & <span>Luxury Holidays</span>
            </h1>
            <p className="page-hero-desc">
              Your vacation, on your terms. Travel with your personal chauffeur, choose your departure time, handpick boutique heritage resorts, and explore at your own unhurried pace.
            </p>
          </div>
        </div>
      </section>

      {/* Private Tour Highlights Strip */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--color-border)', padding: '2.5rem 0' }}>
        <div className="container">
          <div className="private-perks-grid">
            <div className="private-perk-card">
              <div className="perk-icon-wrapper">
                <Car size={22} color="var(--color-gold-dark)" />
              </div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--color-primary)', margin: '0.6rem 0 0.3rem' }}>
                Doorstep Salem Pickup
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Your private vehicle arrives at your residence anywhere in Salem, Namakkal or Erode on time.
              </p>
            </div>

            <div className="private-perk-card">
              <div className="perk-icon-wrapper">
                <Heart size={22} color="var(--color-gold-dark)" />
              </div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--color-primary)', margin: '0.6rem 0 0.3rem' }}>
                Complete Itinerary Freedom
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Stop whenever you like, spend more time where you love, and customize daily sightseeing effortlessly.
              </p>
            </div>

            <div className="private-perk-card">
              <div className="perk-icon-wrapper">
                <Sparkles size={22} color="var(--color-gold-dark)" />
              </div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--color-primary)', margin: '0.6rem 0 0.3rem' }}>
                Handpicked 4★ & 5★ Stays
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Verified heritage bungalows, tea estate villas, luxury pool villas, and beachfront resorts.
              </p>
            </div>

            <div className="private-perk-card">
              <div className="perk-icon-wrapper">
                <ShieldCheck size={22} color="var(--color-gold-dark)" />
              </div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--color-primary)', margin: '0.6rem 0 0.3rem' }}>
                Vetted Senior Chauffeurs
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Experienced drivers with extensive hill station and ghat road mastery, non-smoking and courteous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Private Fleet & Transparent Tariffs */}
      <section style={{ padding: '5rem 0', background: 'var(--color-bg-base)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Car size={14} />
              <span>Chauffeur-Driven Rentals</span>
            </div>
            <h2 className="section-title">
              Our Private <span>Vehicle Tariff</span>
            </h2>
            <p className="section-desc">
              Transparent per-km and per-day packages for family vacations, business travel, outstation pilgrimage, and airport drops from Salem.
            </p>
          </div>

          <div className="private-vehicles-grid" style={{ marginTop: '3rem' }}>
            {PRIVATE_VEHICLES.map((v, i) => (
              <div key={i} className="private-vehicle-card">
                <div className="vehicle-card-img-wrap">
                  <img src={v.image} alt={v.name} className="vehicle-card-img" />
                  <span className="vehicle-card-badge">{v.seats}</span>
                </div>
                <div className="vehicle-card-content">
                  <span className="vehicle-card-cat">{v.category}</span>
                  <h3 className="vehicle-card-title">{v.name}</h3>
                  <div className="vehicle-rate-box">
                    <span className="rate-main">{v.rate}</span>
                    <span className="rate-sub">{v.perDay}</span>
                  </div>
                  <p className="vehicle-features-text">{v.features}</p>
                  <button 
                    className="btn btn-gold btn-sm"
                    style={{ width: '100%', marginTop: '1.25rem' }}
                    onClick={() => setIsCustomTripOpen(true)}
                  >
                    <span>Reserve This Vehicle</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Private Tour Packages */}
      <section style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Sparkles size={14} />
              <span>Tailor-Made Packages</span>
            </div>
            <h2 className="section-title">
              Featured <span>Private Circuits</span>
            </h2>
            <p className="section-desc">
              All-inclusive private packages including private vehicle, luxury accommodation, daily breakfast, and customized sightseeing.
            </p>
          </div>

          <div className="tours-grid" style={{ marginTop: '3rem' }}>
            {privateTours.length > 0 ? (
              privateTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))
            ) : (
              tours.slice(0, 6).map((tour) => (
                <TourCard key={tour.id} tour={{ ...tour, tourType: 'private' }} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Direct WhatsApp Quote Section */}
      <section style={{ padding: '4rem 0', background: '#0b132b', color: '#ffffff' }}>
        <div className="container">
          <div className="private-custom-cta">
            <div style={{ maxWidth: '640px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Need a Custom Itinerary For Your Family?
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: '#ffffff', margin: '0.6rem 0 1rem' }}>
                Speak Directly With Our Salem Tour Architect
              </h2>
              <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                Share your desired destination, travel dates, and preferences. We will prepare a customized day-by-day itinerary and competitive quote within 2 hours.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href={getWhatsAppLink("Private Customized Tour")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                  style={{ background: '#25d366', color: '#ffffff', border: 'none' }}
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Travel Architect</span>
                </a>
                <button 
                  className="btn btn-outline-gold"
                  onClick={() => setIsCustomTripOpen(true)}
                >
                  <Sparkles size={16} />
                  <span>Custom Trip Form</span>
                </button>
              </div>
            </div>
            <div className="private-custom-contact-card">
              <div className="contact-card-label">Salem Headquarters Hotline</div>
              <a href="tel:+919994644744" className="contact-card-phone">+91 99946 44744</a>
              <div className="contact-card-note">Available Mon - Sat • 9:00 AM - 9:00 PM</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
