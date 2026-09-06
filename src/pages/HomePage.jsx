import React from 'react';
import { useApp } from '../context/AppContext';
import Hero from '../components/Hero';
import SearchPanel from '../components/SearchPanel';
import TourResultsSection from '../components/TourResultsSection';
import TourCard from '../components/TourCard';
import WhyChooseUs from '../components/WhyChooseUs';
import { Compass, ArrowRight, Sparkles, MapPin, Users, Car, Phone, Calendar, Star, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const { 
    tours, 
    destinations, 
    feedback, 
    navigate, 
    setFilters, 
    setSelectedTour, 
    openEnquiryWithDestination,
    setIsCustomTripOpen 
  } = useApp();

  // Top 4 Featured Destinations
  const topDestinations = destinations.slice(0, 4);

  // Curated Group Tours (top 3)
  const groupTours = tours.filter(t => t.tourType === 'group' || !t.tourType).slice(0, 3);

  // Curated Private Tours (top 3)
  const privateTours = tours.filter(t => t.tourType === 'private' || t.isPremium).slice(0, 3);

  // Featured Reviews
  const featuredReviews = feedback.filter(f => f.status === 'Approved').slice(0, 3);

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="home-page-root">
      {/* Hero Banner */}
      <Hero />

      {/* Global Search & Filter Panel */}
      <SearchPanel />

      {/* Search Filtered Results (if user searched in hero) */}
      <TourResultsSection />

      {/* 1. TOP DESTINATIONS OVERVIEW */}
      <section className="home-overview-section" style={{ padding: '4.5rem 0', background: 'var(--color-bg-base)' }}>
        <div className="container">
          <div className="home-section-header-flex">
            <div>
              <div className="section-badge">
                <Compass size={14} />
                <span>Curated Escapes</span>
              </div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Featured <span>Destinations</span>
              </h2>
              <p className="section-desc" style={{ textAlign: 'left', margin: 0 }}>
                Handpicked global escapes, hill stations and coastal retreats popular with Salem families.
              </p>
            </div>
            <button 
              className="btn btn-outline-gold"
              onClick={() => navigate('/destinations')}
            >
              <span>Explore All Destinations</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="destinations-grid" style={{ marginTop: '2.5rem' }}>
            {topDestinations.map((dest) => (
              <div
                key={dest.id}
                className="destination-card"
                onClick={() => {
                  setFilters(prev => ({ ...prev, search: dest.name, category: 'All' }));
                  navigate('/destinations');
                }}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="destination-img"
                  loading="lazy"
                />
                <div className="destination-tag">
                  {dest.region || dest.country || "Explore"}
                </div>
                <div className="destination-overlay">
                  <div className="destination-name">{dest.name}</div>
                  <div className="destination-meta">
                    <span>From {formatINR(dest.startingPrice || 15000)}</span>
                    <span style={{ color: 'var(--color-gold)' }}>View Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. GROUP TOURS OVERVIEW */}
      <section style={{ padding: '4.5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="home-section-header-flex">
            <div>
              <div className="section-badge">
                <Users size={14} />
                <span>Fixed Departures</span>
              </div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Upcoming <span>Group Tours</span>
              </h2>
              <p className="section-desc" style={{ textAlign: 'left', margin: 0 }}>
                Guaranteed departures from Salem with experienced tour managers and South Indian meals.
              </p>
            </div>
            <button 
              className="btn btn-outline-gold"
              onClick={() => navigate('/group-tours')}
            >
              <span>Browse All Group Tours</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="tours-grid" style={{ marginTop: '2.5rem' }}>
            {groupTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRIVATE & LUXURY TOURS OVERVIEW */}
      <section style={{ padding: '4.5rem 0', background: 'var(--color-bg-base)' }}>
        <div className="container">
          <div className="home-section-header-flex">
            <div>
              <div className="section-badge">
                <Car size={14} />
                <span>Bespoke Journeys</span>
              </div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Private & <span>Luxury Tours</span>
              </h2>
              <p className="section-desc" style={{ textAlign: 'left', margin: 0 }}>
                Customized circuits with dedicated chauffeurs, Innova Crysta / Tempo Travellers and VIP stays.
              </p>
            </div>
            <button 
              className="btn btn-outline-gold"
              onClick={() => navigate('/private-tours')}
            >
              <span>Explore Private Circuits</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="tours-grid" style={{ marginTop: '2.5rem' }}>
            {privateTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US VALUE STRIP */}
      <WhyChooseUs />

      {/* 5. TRAVEL ADVISER TEASER BANNER */}
      <section style={{ padding: '3.5rem 0', background: '#0b132b', color: '#ffffff' }}>
        <div className="container">
          <div className="home-adviser-banner">
            <div className="home-adviser-content">
              <span className="home-adviser-badge">
                <Sparkles size={14} color="#d4af37" /> AI Trip Planner & Travel Advisers
              </span>
              <h3 className="home-adviser-title">
                Not sure where to travel? Let our Salem experts design your dream vacation.
              </h3>
              <p className="home-adviser-desc">
                Tell us your preferred season, group size, and budget. We provide tailored recommendations with transparent costs and complimentary visa guidance.
              </p>
              <div className="home-adviser-actions">
                <button 
                  className="btn btn-gold"
                  onClick={() => navigate('/adviser')}
                >
                  <Sparkles size={16} />
                  <span>Launch Travel Adviser</span>
                </button>
                <button 
                  className="btn btn-outline-gold"
                  onClick={() => setIsCustomTripOpen(true)}
                >
                  <span>Build Custom Itinerary</span>
                </button>
              </div>
            </div>
            <div className="home-adviser-stats">
              <div className="home-adviser-stat-card">
                <div className="stat-num">12+</div>
                <div className="stat-lbl">Years Salem Heritage</div>
              </div>
              <div className="home-adviser-stat-card">
                <div className="stat-num">25,000+</div>
                <div className="stat-lbl">Happy Travellers</div>
              </div>
              <div className="home-adviser-stat-card">
                <div className="stat-num">4.9/5</div>
                <div className="stat-lbl">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS OVERVIEW */}
      <section style={{ padding: '4.5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Star size={14} />
              <span>Real Traveller Stories</span>
            </div>
            <h2 className="section-title">
              Loved By <span>Families Across Salem</span>
            </h2>
            <p className="section-desc">
              Discover why thousands of travellers trust SK Tours for their international holidays, domestic vacations, and pilgrimage yatras.
            </p>
          </div>

          <div className="reviews-grid" style={{ marginTop: '2.5rem' }}>
            {featuredReviews.map((rev) => (
              <div key={rev.id} className="review-card">
                <div className="review-stars">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="review-comment">
                  "{rev.comment}"
                </p>
                <div className="review-author">
                  <img src={rev.avatar} alt={rev.customerName} className="review-avatar" />
                  <div>
                    <div className="review-name">{rev.customerName}</div>
                    <div className="review-city">{rev.city} • {rev.tourTaken}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ABOUT US SALEM STORY TEASER */}
      <section style={{ padding: '4.5rem 0', background: 'var(--color-bg-base)' }}>
        <div className="container">
          <div className="home-about-teaser">
            <div className="home-about-text">
              <div className="section-badge">
                <Compass size={14} />
                <span>About SK Tours</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--color-primary)', margin: '0.75rem 0 1rem' }}>
                Salem's Most Trusted Travel Companion Since 2012
              </h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Headquartered at L_4, Staff Quarters, Periyar University, Salem, SK Tours & Travels is committed to bringing luxury travel, spiritual yatras, and family holidays within reach, backed by professional fleet operations and dedicated tour captains.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-navy"
                  onClick={() => navigate('/about')}
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight size={16} />
                </button>
                <button 
                  className="btn btn-outline-gold"
                  onClick={() => navigate('/contact')}
                >
                  <Phone size={15} />
                  <span>Visit Salem Office</span>
                </button>
              </div>
            </div>
            <div className="home-about-img-box">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80" 
                alt="SK Tours Luxury Travel Fleet" 
                className="home-about-img"
              />
              <div className="home-about-floating-badge">
                <ShieldCheck size={20} color="#d4af37" />
                <div>
                  <strong>Government Approved</strong>
                  <span>Tourism Operations Agency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
