import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TourCard from '../components/TourCard';
import { 
  Users, Compass, Filter, Search, Calendar, MapPin, 
  Utensils, Shield, CheckCircle, Sparkles, Phone, ArrowRight 
} from 'lucide-react';

const CATEGORIES = [
  "All", 
  "Kashmir", 
  "Himachal", 
  "Rajasthan", 
  "Leh-Ladakh", 
  "Kerala", 
  "Delhi & Agra", 
  "Meghalaya", 
  "Hyderabad"
];

export default function GroupToursPage() {
  const { tours, navigate, setIsCustomTripOpen, openEnquiryWithDestination } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(150000);

  // Filter tours for group packages
  const groupTours = tours.filter(t => {
    // Basic tourType filter
    const isGroup = t.tourType === 'group' || !t.tourType || t.category !== 'Private';
    if (!isGroup) return false;

    // Category filter
    if (selectedCategory !== "All") {
      const target = selectedCategory.toLowerCase();
      const matchCat = (t.category || '').toLowerCase().includes(target) ||
                       (t.destination || '').toLowerCase().includes(target) ||
                       (t.name || '').toLowerCase().includes(target) ||
                       (t.subCategory || '').toLowerCase().includes(target);
      if (!matchCat) return false;
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = (t.name || '').toLowerCase().includes(q);
      const matchDest = (t.destination || '').toLowerCase().includes(q);
      if (!matchName && !matchDest) return false;
    }

    // Price filter
    if (t.price && t.price > maxPrice) return false;

    return true;
  });

  return (
    <div className="page-root">
      {/* Page Hero Header */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumb">
            <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Group Tours</span>
          </div>
          <div className="page-hero-content">
            <div className="section-badge">
              <Users size={14} />
              <span>Fixed Departures & Escorted Groups</span>
            </div>
            <h1 className="page-hero-title">
              Guaranteed <span>Group Tours</span> From Salem
            </h1>
            <p className="page-hero-desc">
              Experience the joy of traveling with friendly Salem families, accompanied by our caring tour managers, vetted 3/4-star hotels, and delicious South Indian meals.
            </p>
          </div>
        </div>
      </section>

      {/* Group Tour Benefits Banner */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--color-border)', padding: '2rem 0' }}>
        <div className="container">
          <div className="group-benefits-strip">
            <div className="group-benefit-item">
              <div className="benefit-icon-box">
                <Users size={20} color="var(--color-gold-dark)" />
              </div>
              <div>
                <strong>Salem Boarding Points</strong>
                <span>New Bus Stand, AVR Roundana, Kondalampatti</span>
              </div>
            </div>
            <div className="group-benefit-item">
              <div className="benefit-icon-box">
                <Utensils size={20} color="var(--color-gold-dark)" />
              </div>
              <div>
                <strong>Authentic South Indian Meals</strong>
                <span>Hygienic vegetarian breakfasts, lunches & dinners</span>
              </div>
            </div>
            <div className="group-benefit-item">
              <div className="benefit-icon-box">
                <Shield size={20} color="var(--color-gold-dark)" />
              </div>
              <div>
                <strong>Experienced Tour Leader</strong>
                <span>Dedicated Tamil & English speaking guide throughout</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter & Tours Listing Section */}
      <section style={{ padding: '4rem 0', background: 'var(--color-bg-base)' }}>
        <div className="container">
          {/* Controls Bar */}
          <div className="tours-filter-bar">
            {/* Category Pills */}
            <div className="category-tabs-scroll">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`category-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search and Budget Filters */}
            <div className="tours-filter-inputs">
              <div className="search-input-box">
                <Search size={16} color="var(--color-text-muted)" />
                <input
                  type="text"
                  placeholder="Search group tour packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="budget-slider-box">
                <label>Max Budget: ₹{maxPrice.toLocaleString('en-IN')}</label>
                <input
                  type="range"
                  min={5000}
                  max={200000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Tours Count Indicator */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Showing <strong style={{ color: 'var(--color-primary)' }}>{groupTours.length}</strong> group packages
            </div>
            {(selectedCategory !== 'All' || searchQuery || maxPrice < 200000) && (
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setMaxPrice(200000);
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Tours Grid */}
          {groupTours.length > 0 ? (
            <div className="tours-grid">
              {groupTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="empty-results-box">
              <Compass size={48} color="var(--color-gold)" style={{ margin: '0 auto 1rem' }} />
              <h3>No group tours match your criteria</h3>
              <p>Try adjusting your category filter or budget limit to discover available packages.</p>
              <button 
                className="btn btn-gold btn-sm" 
                style={{ marginTop: '1rem' }}
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setMaxPrice(200000);
                }}
              >
                Show All Tours
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Group Booking Special Banner */}
      <section style={{ padding: '4rem 0', background: '#0b132b', color: '#ffffff' }}>
        <div className="container">
          <div className="group-custom-banner">
            <div style={{ maxWidth: '650px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Travelling with 10+ Family Members or Colleagues?
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: '#ffffff', margin: '0.6rem 0 1rem' }}>
                Book An Exclusive Private Group Coach
              </h2>
              <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Enjoy dedicated pickup directly from your doorstep in Salem, fully customized meal menus, and tailor-made sightseeing schedules with special volume discounts.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-gold"
                  onClick={() => setIsCustomTripOpen(true)}
                >
                  <Sparkles size={16} />
                  <span>Request Group Quote</span>
                </button>
                <a 
                  href="tel:+919994644744"
                  className="btn btn-outline-gold"
                >
                  <Phone size={16} />
                  <span>Call Group Desk: +91 99946 44744</span>
                </a>
              </div>
            </div>
            <div className="group-custom-badge-box">
              <div className="special-discount-card">
                <span className="disc-percent">10% OFF</span>
                <span className="disc-text">On Group Bookings of 12+ Passengers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
